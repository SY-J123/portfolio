/**
 * 레거시 시드 스크립트 — 과거 수집한 리뷰 CSV + 분류 JSON을 Supabase에 초기 import
 * (데이터 경로는 프로젝트 이전 단계의 쿠팡 분석 산출물을 참조)
 *
 * 실행: npx tsx scripts/seed.ts
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import fs from "fs";
import path from "path";

config({ path: path.resolve(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const db = createClient(SUPABASE_URL, SERVICE_KEY);

// 기존 분석에서 사용한 스코어링 로직
const VERY_NEGATIVE_KW =
  /탈[퇴팡회]|삭제|해지|안\s*쓴다|안\s*씀|못\s*믿|사기|거짓말|최악|극혐|역[겹겨]|꺼져|망[해하]|지움|사라져|불매|신고/;
const REPEAT_KW =
  /또|계속|자꾸|몇\s*번째|매번|맨날|항상|반복|여러\s*번|몇\s*번/;
const VERY_POSITIVE_KW =
  /좋아요|최고|만족|편리|편해|사랑|감사|응원|화이팅|잘\s*쓰|잘\s*사용/;

function calcSentiment(
  score: number,
  text: string
): { level: string; score: number } {
  if (score >= 5 && VERY_POSITIVE_KW.test(text))
    return { level: "매우 긍정", score: 20 };
  if (score >= 4) return { level: "긍정", score: 10 };
  if (score === 3) return { level: "중립", score: 0 };
  if (score === 1 && VERY_NEGATIVE_KW.test(text))
    return { level: "매우 부정", score: -20 };
  return { level: "부정", score: -10 };
}

function calcSeverity(text: string): { level: string; multiplier: number } {
  const hasRepeat = REPEAT_KW.test(text);
  const hasExtreme = VERY_NEGATIVE_KW.test(text);
  if (hasRepeat && hasExtreme) return { level: "반복+이탈", multiplier: 2.5 };
  if (hasExtreme) return { level: "이탈/강한 부정", multiplier: 2.0 };
  if (hasRepeat) return { level: "반복/누적", multiplier: 1.5 };
  return { level: "일반", multiplier: 1.0 };
}

async function main() {
  // 1. CSV 읽기
  const csvPath = path.resolve(
    __dirname,
    "../../analyses/hotel-cancellation/data/coupang_reviews_2026_q1.csv"
  );
  const raw = fs.readFileSync(csvPath, "utf-8");
  const lines = raw.split("\n").slice(1); // header 제거

  // 2. 분류 JSON 읽기
  const classPath = path.resolve(
    __dirname,
    "../../analyses/hotel-cancellation/data/voc_classification_claude.json"
  );
  const classifications: Record<string, string[]> = JSON.parse(
    fs.readFileSync(classPath, "utf-8")
  );

  // 3. 파싱 + 변환
  const rows = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // CSV 파싱 (쉼표가 텍스트 안에 있을 수 있음)
    const match = line.match(
      /^(\d{4}-\d{2}-\d{2}),(\d),("(?:[^"]|"")*"|[^,]*),([^,]*),(\d+),("(?:[^"]|"")*"|[^,]*),("(?:[^"]|"")*"|[^,]*)$/
    );
    if (!match) continue;

    const date = match[1];
    const score = parseInt(match[2]);
    const text = match[3].replace(/^"|"$/g, "").replace(/""/g, '"');
    const version = match[4] || null;
    const thumbsUp = parseInt(match[5]) || 0;
    const userName = match[7]?.replace(/^"|"$/g, "") || "";

    if (!text || text.length < 2) continue;

    const sent = calcSentiment(score, text);
    const sev = calcSeverity(text);
    const scoreReality = Math.max(
      0,
      Math.min(100, 80 + sent.score * sev.multiplier)
    );

    const cats = classifications[String(i)] || ["X"];
    const validCats = cats.filter((c) => c !== "X");

    rows.push({
      source: "google_play",
      external_id: `legacy_${i}`,
      author: userName,
      score,
      text,
      posted_at: `${date}T00:00:00Z`,
      app_version: version,
      thumbs_up: thumbsUp,
      extra: {},
      sentiment: sent.level,
      sentiment_score: sent.score,
      severity: sev.level,
      severity_multiplier: sev.multiplier,
      score_reality: scoreReality,
      categories: validCats.length > 0 ? validCats : null,
      classified_at: new Date().toISOString(),
    });
  }

  console.log(`파싱 완료: ${rows.length}건`);

  // 4. Supabase에 배치 insert
  const BATCH = 100;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await db.from("reviews").upsert(batch, {
      onConflict: "source,external_id",
      ignoreDuplicates: true,
    });
    if (error) {
      console.error(`배치 ${i} 에러:`, error.message);
    } else {
      inserted += batch.length;
    }
  }

  console.log(`Supabase insert 완료: ${inserted}건`);
}

main().catch(console.error);
