/**
 * 수동 크롤링 + 분류 실행
 * 실행: npx tsx scripts/crawl-now.ts
 *
 * lib/crawlers/index.ts의 CRAWLERS registry를 순회해 모든 소스 수집 후
 * lib/classify.ts의 규칙 기반 분류를 돌린다. (Vercel cron과 동일 경로)
 */
import { config } from "dotenv";
import path from "path";

// 모든 supabase 관련 import보다 먼저 env 로딩
config({ path: path.resolve(__dirname, "../.env.local") });

async function main() {
  // 동적 import: env 로딩 후에 supabase 클라이언트가 초기화되도록
  const { createClient } = await import("@supabase/supabase-js");
  const { CRAWLERS } = await import("../lib/crawlers");
  const { classifyUnclassified } = await import("../lib/classify");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log("=== 크롤링 시작 ===\n");

  for (const [source, crawl] of Object.entries(CRAWLERS)) {
    console.log(`[${source}] 크롤링...`);
    try {
      const reviews = await crawl();
      console.log(`  수집: ${reviews.length}건`);

      let inserted = 0;
      for (const review of reviews) {
        const { data, error } = await db
          .from("reviews")
          .upsert(
            {
              source: review.source,
              external_id: review.external_id,
              author: review.author,
              score: review.score,
              text: review.text,
              posted_at: review.posted_at,
              app_version: review.app_version,
              thumbs_up: review.thumbs_up,
              extra: review.extra,
            },
            { onConflict: "source,external_id", ignoreDuplicates: true }
          )
          .select("id");
        // ignoreDuplicates + .select → 실제 신규 insert된 행만 반환, 중복은 []
        if (!error && data && data.length > 0) inserted++;
      }
      console.log(`  신규 저장: ${inserted}건 (중복 제외)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`  실패: ${msg}`);
    }
  }

  console.log("\n=== 분류 시작 ===");
  const classified = await classifyUnclassified(500);
  console.log(`  분류 완료: ${classified}건\n`);

  console.log("=== 소스별 누적 건수 ===");
  for (const src of Object.keys(CRAWLERS)) {
    const { count } = await db
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("source", src);
    console.log(`  ${src}: ${count || 0}건`);
  }
}

main().catch(console.error);
