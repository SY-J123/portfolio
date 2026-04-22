/**
 * App Store 리뷰 수집 (스탠드얼론, JSON 출력)
 *
 * 실행:
 *   npx tsx scripts/collect-app-store.ts [페이지수]
 *
 * app-store-scraper 라이브러리 사용 (Apple RSS 피드 래핑).
 * Apple RSS 특성상 페이지가 불규칙하게 비어 오므로, 1~10 페이지 전수 조회 후
 * external_id 기준으로 중복 제거 + 기존 JSON과 병합한다.
 *
 * 결과: data/app-store.json
 */
import fs from "node:fs/promises";
import path from "node:path";
// @ts-expect-error no types
import store from "app-store-scraper";

const APP_ID = 839333328; // 토스 iOS (Viva Republica)
const DEFAULT_PAGES = 10;
const OUT_PATH = path.resolve(process.cwd(), "data/app-store.json");

interface Review {
  source: "app_store";
  external_id: string;
  author: string;
  score: number | null;
  text: string;
  title: string | null;
  posted_at: string;
  app_version: string | null;
  thumbs_up: number;
}

interface ScraperReview {
  id: string | number;
  userName?: string;
  version?: string;
  score?: number;
  title?: string;
  text?: string;
  updated?: string;
}

async function main() {
  const pages = Number(process.argv[2]) || DEFAULT_PAGES;
  console.log(`[app_store] appId=${APP_ID} pages=1..${pages}`);
  const start = Date.now();

  // 기존 파일 병합 기반
  const existing: Review[] = await fs
    .readFile(OUT_PATH, "utf8")
    .then((s) => JSON.parse(s) as Review[])
    .catch(() => []);
  const byId = new Map<string, Review>(existing.map((r) => [r.external_id, r]));
  const before = byId.size;

  for (let p = 1; p <= pages; p++) {
    try {
      const batch = (await store.reviews({
        id: APP_ID,
        country: "kr",
        page: p,
      })) as ScraperReview[];
      let added = 0;
      for (const r of batch) {
        const id = String(r.id);
        if (byId.has(id)) continue;
        byId.set(id, {
          source: "app_store",
          external_id: id,
          author: r.userName || "",
          score: typeof r.score === "number" ? r.score : null,
          title: r.title || null,
          text: (r.text || "").slice(0, 2000),
          posted_at: r.updated ? new Date(r.updated).toISOString() : new Date().toISOString(),
          app_version: r.version || null,
          thumbs_up: 0,
        });
        added++;
      }
      console.log(`  page ${p}: ${batch.length}건 수신 · 신규 ${added}`);
    } catch (err) {
      console.log(`  page ${p}: ${err instanceof Error ? err.message : err}`);
    }
  }

  const reviews = Array.from(byId.values()).sort((a, b) =>
    a.posted_at < b.posted_at ? 1 : -1
  );

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(reviews, null, 2), "utf8");

  if (reviews.length === 0) {
    console.log("수집된 리뷰가 없다.");
    process.exit(1);
  }

  const scored = reviews.filter((r) => r.score !== null);
  const avg = scored.length
    ? scored.reduce((s, r) => s + (r.score || 0), 0) / scored.length
    : 0;
  const oldest = reviews.reduce((a, b) => (a.posted_at < b.posted_at ? a : b));
  const newest = reviews.reduce((a, b) => (a.posted_at > b.posted_at ? a : b));

  console.log(
    `[app_store] 누적 ${reviews.length}건 (이번 실행 +${reviews.length - before}) · ${Date.now() - start}ms`
  );
  console.log(`  평균 별점: ${avg.toFixed(2)} (${scored.length}건 기준)`);
  console.log(`  기간: ${oldest.posted_at.slice(0, 10)} ~ ${newest.posted_at.slice(0, 10)}`);
  console.log(`  저장: ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
