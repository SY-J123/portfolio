/**
 * reviews 테이블 전체 초기화
 *   npx tsx scripts/truncate-reviews.ts --execute
 *
 * 기본값은 dry-run (삭제 안 함). 반드시 --execute 플래그 필요.
 */
import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(__dirname, "../.env.local") });

import { createClient } from "@supabase/supabase-js";

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const EXECUTE = process.argv.includes("--execute");

async function main() {
  const { count: before } = await db
    .from("reviews")
    .select("*", { count: "exact", head: true });
  console.log(`현재 reviews 건수: ${before ?? "?"}`);

  if (!EXECUTE) {
    console.log("※ dry-run. --execute 플래그로 실제 삭제");
    return;
  }

  console.log("전체 삭제 실행 중...");
  const { error } = await db.from("reviews").delete().gt("id", -1);
  if (error) {
    console.error("삭제 실패:", error.message);
    process.exit(1);
  }

  const { count: after } = await db
    .from("reviews")
    .select("*", { count: "exact", head: true });
  console.log(`삭제 후 건수: ${after ?? 0}`);

  // daily_scores도 함께 초기화 (리뷰 원본과 연동되므로)
  const { error: dsErr } = await db.from("daily_scores").delete().gt("id", -1);
  if (dsErr) console.warn("daily_scores 삭제 경고:", dsErr.message);
  else console.log("daily_scores 초기화 완료");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
