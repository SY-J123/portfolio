/**
 * Maalej 4분류 기반 샘플 리뷰 분류 (프로토타입)
 *
 * 실행:
 *   npx tsx scripts/classify-maalej.ts [샘플크기]
 *
 * 기본 샘플크기: 30
 * 입력: data/google-play.march-plus.json (내부에서 3월 한 달로 필터링)
 * 출력: data/sample.maalej.json
 * 가이드: scripts/classification.md (시스템 프롬프트로 주입)
 *
 * 분류 체계 (classification.md 참조):
 *   - bug_report · feature_request · user_experience · rating
 *   - 다중 라벨 (최대 3개), 해당 없음은 빈 배열
 */
import fs from "node:fs/promises";
import path from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.resolve(process.cwd(), ".env.local"), override: true });

const ROOT = process.cwd();
const SAMPLE_SIZE = Number(process.argv[2]) || 30;
const INPUT_PATH = path.resolve(ROOT, "data/google-play.march-plus.json");
const GUIDE_PATH = path.resolve(ROOT, "scripts/classification.md");
const OUTPUT_PATH = path.resolve(ROOT, "data/sample.maalej.json");
const MODEL = "claude-haiku-4-5-20251001";
const BATCH_SIZE = 20;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = "https://api.anthropic.com/v1/messages";
const MARCH_START = "2026-03-01T00:00:00.000Z";
const MARCH_END = "2026-04-01T00:00:00.000Z";

const VALID_TYPES = ["bug_report", "feature_request", "user_experience", "rating"] as const;
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

function randomSample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

async function main() {
  if (!API_KEY) throw new Error("ANTHROPIC_API_KEY 환경변수가 필요합니다.");

  const guide = await fs.readFile(GUIDE_PATH, "utf8");
  const all = JSON.parse(await fs.readFile(INPUT_PATH, "utf8")) as Review[];
  const march = all.filter(
    (r) => r.posted_at >= MARCH_START && r.posted_at < MARCH_END
  );
  const samples = randomSample(march, SAMPLE_SIZE);

  console.log(`전체 3월 데이터: ${march.length}건`);
  console.log(`샘플 크기: ${samples.length}건`);
  console.log(`모델: ${MODEL}`);
  console.log(`배치 크기: ${BATCH_SIZE}`);

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

  const results: ClassifiedReview[] = [];
  const totalUsage = { input: 0, output: 0 };

  for (let i = 0; i < samples.length; i += BATCH_SIZE) {
    const batch = samples.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(samples.length / BATCH_SIZE);

    console.log(`\n배치 ${batchNum}/${totalBatches} 분류 중... (${batch.length}건)`);

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
        console.warn(`  ! 알 수 없는 external_id 응답: ${p.external_id}`);
        continue;
      }
      const validTypes = Array.isArray(p.types)
        ? p.types.filter((t): t is ReviewType =>
            (VALID_TYPES as readonly string[]).includes(t)
          )
        : [];
      const droppedTypes = Array.isArray(p.types)
        ? p.types.filter((t) => !(VALID_TYPES as readonly string[]).includes(t))
        : [];
      if (droppedTypes.length > 0) {
        console.warn(`  ! 허용 밖 라벨 드롭 (${p.external_id}): ${droppedTypes.join(", ")}`);
      }
      results.push({ ...orig, classification: { types: validTypes } });
    }

    console.log(
      `  완료 — input ${data.usage?.input_tokens ?? "?"} / output ${data.usage?.output_tokens ?? "?"} tokens`
    );
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(results, null, 2), "utf8");

  // 라벨 분포
  const dist: Record<string, number> = {};
  let empty = 0;
  for (const r of results) {
    if (r.classification.types.length === 0) empty++;
    for (const t of r.classification.types) {
      dist[t] = (dist[t] ?? 0) + 1;
    }
  }

  console.log(`\n완료`);
  console.log(`저장: ${path.relative(ROOT, OUTPUT_PATH)}`);
  console.log(`분류 완료: ${results.length}건`);
  console.log(`토큰 사용: input ${totalUsage.input} / output ${totalUsage.output}`);
  console.log(`\n라벨 분포 (다중 라벨이라 합계 > 리뷰 수):`);
  for (const [k, v] of Object.entries(dist).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k}: ${v}`);
  }
  if (empty > 0) console.log(`  (빈 배열): ${empty}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
