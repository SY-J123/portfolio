/**
 * JSON 기반 전처리 — 스탠드얼론
 *
 * 실행:
 *   npx tsx scripts/preprocess-json.ts [input] [output]
 *
 * 기본: data/google-play.json → data/google-play.preprocessed.json
 *
 * 기준:
 *   1) 실질 문자(한글·영문·숫자)만 카운트해 10자 이하면 제외
 *   2) (source, author, text) 완전 동일 중복 → 1건만 유지
 */
import fs from "node:fs/promises";
import path from "node:path";

const IN_PATH = path.resolve(process.cwd(), process.argv[2] || "data/google-play.json");
const OUT_PATH = path.resolve(
  process.cwd(),
  process.argv[3] || "data/google-play.preprocessed.json"
);

interface Review {
  source: string;
  external_id: string;
  author: string;
  score: number | null;
  text: string;
  posted_at: string;
  app_version: string | null;
  thumbs_up: number;
  reply?: string | null;
  reply_date?: string | null;
}

function extractMeaningful(text: string): string {
  return text.replace(/[^가-힣A-Za-z0-9]/g, "");
}

function isTooShortOrNoise(text: string): boolean {
  return extractMeaningful(text).length <= 10;
}

async function main() {
  const raw = await fs.readFile(IN_PATH, "utf8");
  const reviews: Review[] = JSON.parse(raw);

  console.log(`입력: ${IN_PATH}`);
  console.log(`전체: ${reviews.length}건\n`);

  // 1) 너무 짧거나 노이즈
  const shortOrNoise = reviews.filter((r) => isTooShortOrNoise(r.text));
  const shortKeys = new Set(shortOrNoise.map((r) => `${r.source}|${r.external_id}`));

  // 2) 중복 — 첫 등장만 유지
  const seen = new Set<string>();
  const duplicates: Review[] = [];
  for (const r of reviews) {
    const key = `${r.source}|${r.author}|${r.text}`;
    if (seen.has(key)) duplicates.push(r);
    else seen.add(key);
  }
  const dedupOnly = duplicates.filter(
    (r) => !shortKeys.has(`${r.source}|${r.external_id}`)
  );

  const removeKeys = new Set([
    ...shortOrNoise.map((r) => `${r.source}|${r.external_id}`),
    ...dedupOnly.map((r) => `${r.source}|${r.external_id}`),
  ]);

  const kept = reviews.filter(
    (r) => !removeKeys.has(`${r.source}|${r.external_id}`)
  );

  console.log("─ 제거 대상 ─");
  console.log(`  1) 짧거나 노이즈 (≤10자): ${shortOrNoise.length}건`);
  console.log(`  2) 중복 (첫 1건만 유지):   ${dedupOnly.length}건`);
  console.log(
    `  합계: ${removeKeys.size}건 (${((removeKeys.size / reviews.length) * 100).toFixed(1)}%)\n`
  );

  console.log("─ 샘플 (각 기준 최대 5건) ─");
  console.log("\n[1) 짧거나 노이즈]");
  shortOrNoise.slice(0, 5).forEach((r) => {
    console.log(`  "${r.text.slice(0, 60).replace(/\n/g, " ")}"`);
  });
  console.log("\n[2) 중복]");
  dedupOnly.slice(0, 5).forEach((r) => {
    console.log(`  "${r.text.slice(0, 60).replace(/\n/g, " ")}"`);
  });

  console.log(`\n─ 보존 ─`);
  console.log(`  ${kept.length}건 (${((kept.length / reviews.length) * 100).toFixed(1)}%)`);

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(kept, null, 2), "utf8");
  console.log(`\n저장: ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
