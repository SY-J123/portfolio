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
const EXAMPLES_PATH = path.resolve(ROOT, "scripts/classification-examples.md");
const OUTPUT_PATH = path.resolve(ROOT, "data/classified.maalej.json");
const MODEL = "claude-haiku-4-5-20251001";
const BATCH_SIZE = 20;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = "https://api.anthropic.com/v1/messages";
const RANGE_START = "2026-03-01T00:00:00.000Z";
const RANGE_END = "2026-04-12T00:00:00.000Z";

const VALID_TYPES = [
  "bug_report",
  "feature_request",
  "user_experience",
  "rating",
] as const;
type ReviewType = (typeof VALID_TYPES)[number];

const VALID_SENTIMENTS = ["positive", "negative", "neutral"] as const;
type Sentiment = (typeof VALID_SENTIMENTS)[number];

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
  classification: { types: ReviewType[]; sentiment: Sentiment };
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
  let examples = "";
  try {
    examples = await fs.readFile(EXAMPLES_PATH, "utf8");
  } catch {
    // 사례집이 없으면 1차 패스 (규칙만)로 진행
  }
  const gp = JSON.parse(await fs.readFile(GP_PATH, "utf8")) as Review[];
  const as = JSON.parse(await fs.readFile(AS_PATH, "utf8")) as Review[];

  const inRange = (r: Review) =>
    r.posted_at >= RANGE_START && r.posted_at < RANGE_END;
  const gpInRange = gp.filter(inRange);
  const asInRange = as.filter(inRange);
  const all = [...gpInRange, ...asInRange];

  const existing = await readExisting();
  const existingIds = new Set(existing.map((r) => r.external_id));
  const remaining = all.filter((r) => !existingIds.has(r.external_id));

  console.log(
    `전체 대상: ${all.length}건 (Google Play ${gpInRange.length} + App Store ${asInRange.length})`
  );
  console.log(`이미 분류됨: ${existing.length}건`);
  console.log(`처리 예정: ${remaining.length}건`);

  if (remaining.length === 0) {
    console.log("처리할 리뷰 없음.");
    return;
  }

  const examplesBlock = examples
    ? [
        "",
        "---",
        "## Few-shot 경계 사례 (classification-examples.md)",
        "",
        "아래 사례들은 규칙만으로 판정이 애매한 경계 케이스다. 이와 동일 패턴의 리뷰를 만나면 **같은 근거**로 동일하게 분류할 것.",
        "",
        examples,
      ].join("\n")
    : "";

  const systemPrompt = [
    guide,
    examplesBlock,
    "",
    "---",
    "응답 규칙:",
    "- 위 가이드와 사례집을 엄격히 따라 분류한다.",
    '- 응답은 JSON 배열로만 반환. 각 원소는 { "external_id": "...", "types": [...], "sentiment": "..." } 형식.',
    "- types의 값은 bug_report, feature_request, user_experience, rating 중에서만 선택.",
    "- 해당되는 유형이 없으면 types는 빈 배열 [].",
    "- sentiment는 positive, negative, neutral 중 하나. 가이드 §6의 규칙을 따른다(중립 지양, 혼재 시 부정 우선).",
    "- 설명, 마크다운 코드블록, 추가 텍스트 없이 JSON 배열만 반환.",
  ].join("\n");

  if (examples) {
    console.log(`사례집 주입: ${Math.round(examples.length / 1024)} KB\n`);
  }

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
      sentiment?: string;
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
      const sentiment: Sentiment =
        typeof p.sentiment === "string" &&
        (VALID_SENTIMENTS as readonly string[]).includes(p.sentiment)
          ? (p.sentiment as Sentiment)
          : "neutral";
      if (!(VALID_SENTIMENTS as readonly string[]).includes(p.sentiment ?? "")) {
        console.warn(
          `  ! 허용 밖 sentiment (${p.external_id}): "${p.sentiment}" → neutral 처리`
        );
      }
      merged.push({
        ...orig,
        classification: { types: validTypes, sentiment },
      });
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

    // Rate limit 회피 (Haiku 50K input/min 제약)
    if (i + BATCH_SIZE < remaining.length) {
      await new Promise((r) => setTimeout(r, 20000));
    }
  }

  // 분포 집계
  const dist: Record<string, number> = {};
  const sentDist: Record<string, number> = {};
  let empty = 0;
  for (const r of merged) {
    if (r.classification.types.length === 0) empty++;
    for (const t of r.classification.types) {
      dist[t] = (dist[t] ?? 0) + 1;
    }
    const s = r.classification.sentiment;
    sentDist[s] = (sentDist[s] ?? 0) + 1;
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
  console.log(`\n감정 분포:`);
  for (const [k, v] of Object.entries(sentDist).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k}: ${v} (${((v / merged.length) * 100).toFixed(1)}%)`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
