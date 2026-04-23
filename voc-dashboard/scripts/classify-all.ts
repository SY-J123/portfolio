/**
 * Maalej 4분류 전수 실행 (Google Play + App Store)
 *
 * 실행:
 *   npx tsx scripts/classify-all.ts
 *
 * 입력:
 *   - data/google-play.march-plus.json (3월 한 달 필터)
 *   - data/app-store.march-plus.json (3월 한 달 필터)
 * 출력: data/classified.maalej.json
 * 가이드: scripts/classification.md
 *
 * 특징:
 * - 기존 출력 파일이 있으면 이어서 처리 (external_id 기준)
 * - 배치별로 저장 → 중단되어도 누적 보존
 */
import fs from "node:fs/promises";
import path from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.resolve(process.cwd(), ".env.local"), override: true });

const ROOT = process.cwd();
const GP_PATH = path.resolve(ROOT, "data/google-play.march-plus.json");
const AS_PATH = path.resolve(ROOT, "data/app-store.march-plus.json");
const GUIDE_PATH = path.resolve(ROOT, "scripts/classification.md");
const OUTPUT_PATH = path.resolve(ROOT, "data/classified.maalej.json");
const MODEL = "claude-haiku-4-5-20251001";
const BATCH_SIZE = 20;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = "https://api.anthropic.com/v1/messages";
const MARCH_START = "2026-03-01T00:00:00.000Z";
const MARCH_END = "2026-04-01T00:00:00.000Z";

const VALID_TYPES = [
  "bug_report",
  "feature_request",
  "user_experience",
  "rating",
] as const;
type ReviewType = (typeof VALID_TYPES)[number];

interface Review {
  source: string;
  external_id: string;
  author: string;
  score: number | null;
  text: string;
  posted_at: string;
  app_version: string | null;
  [key: string]: unknown;
}

interface ClassifiedReview extends Review {
  classification: { types: ReviewType[] };
}

async function readExisting(): Promise<ClassifiedReview[]> {
  try {
    return JSON.parse(
      await fs.readFile(OUTPUT_PATH, "utf8")
    ) as ClassifiedReview[];
  } catch {
    return [];
  }
}

async function main() {
  if (!API_KEY) throw new Error("ANTHROPIC_API_KEY 환경변수가 필요합니다.");

  const guide = await fs.readFile(GUIDE_PATH, "utf8");
  const gp = JSON.parse(await fs.readFile(GP_PATH, "utf8")) as Review[];
  const as = JSON.parse(await fs.readFile(AS_PATH, "utf8")) as Review[];

  const inMarch = (r: Review) =>
    r.posted_at >= MARCH_START && r.posted_at < MARCH_END;
  const gpMarch = gp.filter(inMarch);
  const asMarch = as.filter(inMarch);
  const all = [...gpMarch, ...asMarch];

  const existing = await readExisting();
  const existingIds = new Set(existing.map((r) => r.external_id));
  const remaining = all.filter((r) => !existingIds.has(r.external_id));

  console.log(
    `전체 대상: ${all.length}건 (Google Play ${gpMarch.length} + App Store ${asMarch.length})`
  );
  console.log(`이미 분류됨: ${existing.length}건`);
  console.log(`처리 예정: ${remaining.length}건`);

  if (remaining.length === 0) {
    console.log("처리할 리뷰 없음.");
    return;
  }

  const systemPrompt = [
    guide,
    "",
    "---",
    "응답 규칙:",
    "- 위 가이드를 엄격히 따라 분류한다.",
    '- 응답은 JSON 배열로만 반환. 각 원소는 { "external_id": "...", "types": [...] } 형식.',
    "- types의 값은 bug_report, feature_request, user_experience, rating 중에서만 선택.",
    "- 해당되는 유형이 없으면 types는 빈 배열 [].",
    "- 설명, 마크다운 코드블록, 추가 텍스트 없이 JSON 배열만 반환.",
  ].join("\n");

  let merged = [...existing];
  let processed = 0;
  const totalUsage = { input: 0, output: 0 };
  const totalBatches = Math.ceil(remaining.length / BATCH_SIZE);

  for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
    const batch = remaining.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;

    console.log(
      `\n배치 ${batchNum}/${totalBatches} 분류 중... (${batch.length}건)`
    );

    const userPrompt = [
      "다음 리뷰 배열을 분류하라.",
      "입력:",
      JSON.stringify(
        batch.map((r) => ({ external_id: r.external_id, text: r.text }))
      ),
    ].join("\n");

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: Math.max(1500, batch.length * 120),
        temperature: 0,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API 오류 (${res.status}): ${text}`);
    }

    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
      usage?: { input_tokens?: number; output_tokens?: number };
    };
    const text =
      data.content
        ?.filter((c) => c.type === "text" && typeof c.text === "string")
        .map((c) => c.text)
        .join("\n")
        .trim() ?? "";

    if (data.usage) {
      totalUsage.input += data.usage.input_tokens ?? 0;
      totalUsage.output += data.usage.output_tokens ?? 0;
    }

    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    if (start === -1 || end === -1 || end < start) {
      throw new Error(`JSON 배열을 찾지 못함: ${text.slice(0, 300)}`);
    }
    const parsed = JSON.parse(text.slice(start, end + 1)) as Array<{
      external_id: string;
      types: string[];
    }>;

    const byId = new Map(batch.map((r) => [r.external_id, r]));
    for (const p of parsed) {
      const orig = byId.get(p.external_id);
      if (!orig) {
        console.warn(`  ! 알 수 없는 external_id: ${p.external_id}`);
        continue;
      }
      const validTypes = Array.isArray(p.types)
        ? p.types.filter((t): t is ReviewType =>
            (VALID_TYPES as readonly string[]).includes(t)
          )
        : [];
      merged.push({ ...orig, classification: { types: validTypes } });
      processed++;
    }

    // 배치마다 저장 (중단 대비)
    await fs.writeFile(
      OUTPUT_PATH,
      JSON.stringify(merged, null, 2),
      "utf8"
    );

    console.log(
      `  완료 (${processed}건 누적) — input ${data.usage?.input_tokens} / output ${data.usage?.output_tokens}`
    );
  }

  // 분포 집계
  const dist: Record<string, number> = {};
  let empty = 0;
  for (const r of merged) {
    if (r.classification.types.length === 0) empty++;
    for (const t of r.classification.types) {
      dist[t] = (dist[t] ?? 0) + 1;
    }
  }

  console.log(`\n완료`);
  console.log(`저장: ${path.relative(ROOT, OUTPUT_PATH)}`);
  console.log(`총 분류: ${merged.length}건 / 이번 실행 +${processed}`);
  console.log(
    `토큰 사용 (이번 실행): input ${totalUsage.input} / output ${totalUsage.output}`
  );
  console.log(`\n라벨 분포:`);
  for (const [k, v] of Object.entries(dist).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k}: ${v}`);
  }
  if (empty > 0) console.log(`  (빈 배열): ${empty}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
