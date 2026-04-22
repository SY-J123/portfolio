/**
 * LLM 수기 분류 결과를 march-plus에 병합해 classified.json 생성/누적
 *
 * 실행:
 *   npx tsx scripts/batch-classify.ts scripts/batch-data/batch-01.json
 *
 * 인자:
 *   - 분류 JSON 파일 경로 (배열: { external_id, classification })
 *
 * 동작:
 *   - data/google-play.march-plus.json 로드
 *   - data/google-play.classified.json 있으면 로드, 없으면 [] 시작
 *   - 분류 파일의 external_id를 march-plus와 매칭해 원본 + classification 병합
 *   - 이미 classified.json에 있는 external_id는 스킵 (중복 방지)
 *   - 제외 대상(광고/스팸)은 분류 파일에 classification: null로 표기 → 결과에서 제외
 *   - 결과를 classified.json에 덮어쓰기
 */
import fs from "node:fs/promises";
import path from "node:path";

interface Classification {
  quality_attributes: string[];
  sentiment: "매우 긍정" | "긍정" | "중립" | "부정" | "매우 부정";
  sentiment_score: number;
  severity: "일반" | "반복/누적" | "이탈/강한 부정" | "반복+이탈";
  severity_multiplier: number;
  score_reality: number;
}

interface BatchEntry {
  external_id: string;
  classification: Classification | null; // null = 광고/스팸 제외
}

const MARCH_PLUS = path.resolve(process.cwd(), "data/google-play.march-plus.json");
const CLASSIFIED = path.resolve(process.cwd(), "data/google-play.classified.json");

async function main() {
  const batchPath = process.argv[2];
  if (!batchPath) {
    console.error("사용법: npx tsx scripts/batch-classify.ts <batch-json-path>");
    process.exit(1);
  }

  const all = JSON.parse(await fs.readFile(MARCH_PLUS, "utf8")) as Array<{
    external_id: string;
    [k: string]: unknown;
  }>;

  const batch = JSON.parse(
    await fs.readFile(path.resolve(process.cwd(), batchPath), "utf8")
  ) as BatchEntry[];

  let existing: Array<{ external_id: string }> = [];
  try {
    existing = JSON.parse(await fs.readFile(CLASSIFIED, "utf8"));
  } catch {
    // 없으면 새로 생성
  }

  const existingIds = new Set(existing.map((r) => r.external_id));
  const byId = new Map(all.map((r) => [r.external_id, r]));

  let added = 0;
  let excluded = 0;
  let skipped = 0;
  const toAdd: unknown[] = [];

  for (const b of batch) {
    if (existingIds.has(b.external_id)) {
      skipped++;
      continue;
    }
    if (b.classification === null) {
      excluded++;
      continue;
    }
    const orig = byId.get(b.external_id);
    if (!orig) {
      console.warn(`⚠ march-plus에 없는 external_id: ${b.external_id}`);
      continue;
    }
    toAdd.push({ ...orig, classification: b.classification });
    added++;
  }

  const merged = [...existing, ...toAdd];
  await fs.writeFile(CLASSIFIED, JSON.stringify(merged, null, 2), "utf8");

  console.log(`─ Batch: ${path.basename(batchPath)} ─`);
  console.log(`  분류 항목: ${batch.length}건`);
  console.log(`  추가:      ${added}건`);
  console.log(`  제외:      ${excluded}건 (광고/스팸)`);
  console.log(`  스킵:      ${skipped}건 (이미 분류됨)`);
  console.log(`  누적 총계: ${merged.length}건 / ${all.length}건 (${((merged.length / all.length) * 100).toFixed(1)}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
