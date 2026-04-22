/**
 * Google Play 리뷰 수집 (스탠드얼론, JSON 출력)
 *
 * 실행:
 *   npx tsx scripts/collect-google-play.ts [건수]
 *
 * 기본 300건, 최대 google-play-scraper가 허용하는 한도.
 * 결과: data/google-play.json
 */
import gplay from "google-play-scraper";
import fs from "node:fs/promises";
import path from "node:path";

const APP_ID = "viva.republica.toss"; // 토스 Android
const DEFAULT_COUNT = 300;
const OUT_PATH = path.resolve(process.cwd(), "data/google-play.json");

interface Review {
  source: "google_play";
  external_id: string;
  author: string;
  score: number | null;
  text: string;
  posted_at: string;
  app_version: string | null;
  thumbs_up: number;
  reply: string | null;
  reply_date: string | null;
}

async function main() {
  const count = Number(process.argv[2]) || DEFAULT_COUNT;

  console.log(`[google_play] appId=${APP_ID} count=${count}`);
  const start = Date.now();

  const result = await gplay.reviews({
    appId: APP_ID,
    lang: "ko",
    country: "kr",
    sort: gplay.sort.NEWEST,
    num: count,
  });

  const reviews: Review[] = result.data.map((r) => ({
    source: "google_play",
    external_id: r.id,
    author: r.userName || "",
    score: r.score ?? null,
    text: r.text || "",
    posted_at: r.date ? new Date(r.date).toISOString() : new Date().toISOString(),
    app_version: r.version || null,
    thumbs_up: r.thumbsUp ?? 0,
    reply: r.replyText || null,
    reply_date: r.replyDate ? new Date(r.replyDate).toISOString() : null,
  }));

  // 기존 파일 병합
  const existing: Review[] = await fs
    .readFile(OUT_PATH, "utf8")
    .then((s) => JSON.parse(s) as Review[])
    .catch(() => []);
  const byId = new Map<string, Review>(existing.map((r) => [r.external_id, r]));
  const before = byId.size;
  for (const r of reviews) byId.set(r.external_id, r);
  const merged = Array.from(byId.values()).sort((a, b) =>
    a.posted_at < b.posted_at ? 1 : -1
  );

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(merged, null, 2), "utf8");

  const scored = merged.filter((r) => r.score !== null);
  const avg = scored.length
    ? scored.reduce((s, r) => s + (r.score || 0), 0) / scored.length
    : 0;
  const oldest = merged.reduce((a, b) => (a.posted_at < b.posted_at ? a : b));
  const newest = merged.reduce((a, b) => (a.posted_at > b.posted_at ? a : b));

  console.log(
    `[google_play] 누적 ${merged.length}건 (이번 실행 +${merged.length - before}) · ${Date.now() - start}ms`
  );
  console.log(`  평균 별점: ${avg.toFixed(2)} (${scored.length}건 기준)`);
  console.log(`  기간: ${oldest.posted_at.slice(0, 10)} ~ ${newest.posted_at.slice(0, 10)}`);
  console.log(`  저장: ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
