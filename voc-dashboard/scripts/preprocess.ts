/**
 * 리뷰 전처리 — 무의미 리뷰 제거
 *
 *   npx tsx scripts/preprocess.ts             # dry-run (미리보기)
 *   npx tsx scripts/preprocess.ts --execute   # 실제 삭제
 *
 * 삭제 기준:
 *   1) 한글·영문·숫자 실질 문자 수 ≤ 10 (의미 판정 불가)
 *   2) 실질 단어 없이 자모·이모지·특수문자만으로 구성
 *   3) (source, author, text) 완전 동일 중복 → 최신 1건만 유지
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

/** 실질 문자 (완성 한글 음절, 영문, 숫자)만 추출 */
function extractMeaningful(text: string): string {
  return text.replace(/[^가-힣A-Za-z0-9]/g, "");
}

/** 기준 1 + 2 통합: 실질 문자 10자 이하면 무의미 */
function isTooShortOrNoise(text: string): boolean {
  return extractMeaningful(text).length <= 10;
}

interface Review {
  id: number;
  source: string;
  author: string | null;
  text: string;
  crawled_at: string;
}

async function main() {
  console.log(`=== 전처리 ${EXECUTE ? "실행" : "미리보기 (dry-run)"} ===\n`);

  // 전체 리뷰 로드
  const all: Review[] = [];
  let from = 0;
  const PAGE = 1000;
  while (true) {
    const { data, error } = await db
      .from("reviews")
      .select("id, source, author, text, crawled_at")
      .order("crawled_at", { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE) break;
    from += PAGE;
  }

  console.log(`전체 리뷰: ${all.length}건\n`);

  // 기준 1+2: 너무 짧거나 노이즈
  const shortOrNoise = all.filter((r) => isTooShortOrNoise(r.text));

  // 기준 3: (source, author, text) 중복 — 가장 최신만 유지
  const seen = new Set<string>();
  const duplicates: Review[] = [];
  for (const r of all) {
    const key = `${r.source}|${r.author ?? ""}|${r.text}`;
    if (seen.has(key)) duplicates.push(r);
    else seen.add(key);
  }

  // 중복이 이미 short/noise 로 잡힌 건 제외 (이중 카운트 방지)
  const shortIds = new Set(shortOrNoise.map((r) => r.id));
  const dedupOnly = duplicates.filter((r) => !shortIds.has(r.id));

  const toDelete = [...shortOrNoise, ...dedupOnly];
  const toDeleteIds = toDelete.map((r) => r.id);

  console.log("─ 삭제 대상 ─");
  console.log(`  1+2) 너무 짧거나 노이즈: ${shortOrNoise.length}건`);
  console.log(`  3) 중복 (첫 1건은 유지):  ${dedupOnly.length}건`);
  console.log(`  합계: ${toDelete.length}건 (${((toDelete.length / all.length) * 100).toFixed(1)}%)\n`);

  // 샘플 출력
  console.log("─ 샘플 (각 기준 최대 5건) ─");
  console.log("\n[1+2) 짧거나 노이즈]");
  shortOrNoise.slice(0, 5).forEach((r) => {
    console.log(`  [${r.source}] "${r.text.slice(0, 60).replace(/\n/g, " ")}"`);
  });
  console.log("\n[3) 중복]");
  dedupOnly.slice(0, 5).forEach((r) => {
    console.log(`  [${r.source}] "${r.text.slice(0, 60).replace(/\n/g, " ")}"`);
  });

  console.log("\n─ 보존 후 현황 (예상) ─");
  const keptBySource: Record<string, number> = {};
  const deleteSet = new Set(toDeleteIds);
  for (const r of all) {
    if (deleteSet.has(r.id)) continue;
    keptBySource[r.source] = (keptBySource[r.source] || 0) + 1;
  }
  Object.entries(keptBySource).forEach(([src, n]) => {
    console.log(`  ${src}: ${n}건`);
  });
  console.log(`  총 보존: ${all.length - toDelete.length}건\n`);

  if (!EXECUTE) {
    console.log("※ dry-run 모드입니다. 실제 삭제하려면 --execute 플래그를 붙여 다시 실행하세요.");
    return;
  }

  // 실제 삭제 (1000건씩 배치)
  console.log("삭제 실행 중...");
  let deleted = 0;
  const BATCH = 500;
  for (let i = 0; i < toDeleteIds.length; i += BATCH) {
    const batch = toDeleteIds.slice(i, i + BATCH);
    const { error } = await db.from("reviews").delete().in("id", batch);
    if (error) {
      console.error(`  배치 ${i}~${i + batch.length} 실패:`, error.message);
      continue;
    }
    deleted += batch.length;
    console.log(`  ${deleted}/${toDeleteIds.length}`);
  }

  console.log(`\n완료: ${deleted}건 삭제`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
