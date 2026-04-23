/**
 * 전처리된 리뷰에서 2026-03-01 이후만 필터링
 *
 * 실행: npx tsx scripts/filter-march.ts [input] [output]
 * 기본: data/google-play.preprocessed.json → data/google-play.march-plus.json
 */
import fs from "node:fs/promises";
import path from "node:path";

const IN_PATH = path.resolve(
  process.cwd(),
  process.argv[2] || "data/google-play.preprocessed.json"
);
const OUT_PATH = path.resolve(
  process.cwd(),
  process.argv[3] || "data/google-play.march-plus.json"
);
const CUTOFF = "2026-03-01T00:00:00.000Z";

async function main() {
  const raw = await fs.readFile(IN_PATH, "utf8");
  const reviews = JSON.parse(raw) as { posted_at: string }[];

  const filtered = reviews
    .filter((r) => r.posted_at >= CUTOFF)
    .sort((a, b) => a.posted_at.localeCompare(b.posted_at));

  await fs.writeFile(OUT_PATH, JSON.stringify(filtered, null, 2), "utf8");

  console.log(`입력: ${reviews.length}건`);
  console.log(`필터(≥ ${CUTOFF.slice(0, 10)}): ${filtered.length}건`);
  console.log(`저장: ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
