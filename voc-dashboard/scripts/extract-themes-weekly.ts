/**
 * 주별 상위 주제 추출
 *
 * 실행: npx tsx scripts/extract-themes-weekly.ts
 * 입력: data/classified.maalej.json
 * 출력: data/weekly-themes.json
 *
 * 처리:
 * - 3월을 7일 버킷으로 분할 (5주)
 * - 각 주의 리뷰 중 rating만 있는 것 제외
 * - 주별 LLM 호출 → 상위 5개 주제 + review_ids
 */
import fs from "node:fs/promises";
import path from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.resolve(process.cwd(), ".env.local"), override: true });

const ROOT = process.cwd();
const INPUT_PATH = path.resolve(ROOT, "data/classified.maalej.json");
const OUTPUT_PATH = path.resolve(ROOT, "data/weekly-themes.json");
const MODEL = "claude-haiku-4-5-20251001";
const API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = "https://api.anthropic.com/v1/messages";

const WEEKS = [
  { label: "1주차 (3/1–7)", start: "2026-03-01", end: "2026-03-08" },
  { label: "2주차 (3/8–14)", start: "2026-03-08", end: "2026-03-15" },
  { label: "3주차 (3/15–21)", start: "2026-03-15", end: "2026-03-22" },
  { label: "4주차 (3/22–28)", start: "2026-03-22", end: "2026-03-29" },
  { label: "5주차 (3/29–31)", start: "2026-03-29", end: "2026-04-01" },
];

interface ClassifiedReview {
  external_id: string;
  text: string;
  score: number | null;
  posted_at: string;
  source: string;
  classification: { types: string[] };
}

interface WeeklyTheme {
  theme: string;
  count: number;
  review_ids: string[];
}

interface WeeklyResult {
  week: string;
  start: string;
  end: string;
  review_count: number;
  themes: WeeklyTheme[];
}

async function extractWeekly(
  reviews: ClassifiedReview[]
): Promise<WeeklyTheme[]> {
  if (reviews.length === 0) return [];

  const indexed = reviews.map((r, i) => ({
    index: i + 1,
    text: r.text,
  }));

  const systemPrompt = [
    "당신은 토스 앱의 주간 VOC에서 공통 주제를 뽑는 분석가다.",
    "입력 리뷰에서 가장 많이 언급되는 주제 상위 5개를 도출한다.",
    "각 주제마다 해당되는 리뷰의 index 목록을 반환한다.",
    "",
    "주제 작성 규칙:",
    "- 주제 이름은 10자 내외의 명사구 (예: '광고·알림 과다', '로그인 오류').",
    "- 하나의 리뷰가 여러 주제에 걸칠 수 있음.",
    "- 최소 2건 이상 언급된 주제만 포함. 단발성 주제는 제외.",
    "- 상위 5개까지. 데이터가 적으면 5개보다 적어도 됨.",
    "",
    "응답 형식 (JSON 배열만, 마크다운·설명 없이):",
    `[{ "theme": "...", "review_indices": [1, 3, 5] }, ...]`,
  ].join("\n");

  const userPrompt = [
    `다음은 해당 주의 리뷰 ${reviews.length}건이다. 공통 주제 상위 5개를 뽑아라.`,
    "",
    "입력:",
    JSON.stringify(indexed, null, 2),
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
      max_tokens: 2500,
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

  console.log(
    `  토큰: input ${data.usage?.input_tokens} / output ${data.usage?.output_tokens}`
  );

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1) {
    throw new Error(`JSON 배열 못찾음: ${text.slice(0, 300)}`);
  }
  const parsed = JSON.parse(text.slice(start, end + 1)) as Array<{
    theme: string;
    review_indices: number[];
  }>;

  return parsed.map((t) => {
    const indices = Array.isArray(t.review_indices) ? t.review_indices : [];
    const review_ids = indices
      .map((idx) => reviews[idx - 1]?.external_id)
      .filter((id): id is string => typeof id === "string");
    return {
      theme: t.theme,
      count: indices.length,
      review_ids,
    };
  });
}

async function main() {
  if (!API_KEY) throw new Error("ANTHROPIC_API_KEY 환경변수가 필요합니다.");

  const all = JSON.parse(
    await fs.readFile(INPUT_PATH, "utf8")
  ) as ClassifiedReview[];

  // rating만 있는 리뷰 제외 (정보 가치 낮음)
  const targetReviews = all.filter((r) => {
    const types = r.classification.types;
    if (types.length === 0) return false;
    return types.some((t) => t !== "rating");
  });

  console.log(`전체 분류 완료 리뷰: ${all.length}건`);
  console.log(`rating-only/빈 배열 제외 후: ${targetReviews.length}건\n`);

  // 기존 결과 로드 (resume 지원)
  let results: WeeklyResult[] = [];
  try {
    results = JSON.parse(
      await fs.readFile(OUTPUT_PATH, "utf8")
    ) as WeeklyResult[];
    console.log(`이미 처리된 주: ${results.length}개\n`);
  } catch {
    results = [];
  }
  const doneLabels = new Set(results.map((r) => r.week));

  for (const week of WEEKS) {
    if (doneLabels.has(week.label)) {
      console.log(`${week.label}: 건너뜀 (이미 처리)`);
      continue;
    }
    const weekReviews = targetReviews.filter(
      (r) => r.posted_at >= week.start && r.posted_at < week.end
    );
    console.log(`${week.label}: ${weekReviews.length}건`);

    const themes = await extractWeekly(weekReviews);
    results.push({
      week: week.label,
      start: week.start,
      end: week.end,
      review_count: weekReviews.length,
      themes,
    });

    themes.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.theme} (${t.count}건)`);
    });
    console.log();

    // 주마다 저장 (중단 대비)
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(results, null, 2), "utf8");

    // Rate limit 회피 (50K tokens/min 제약)
    console.log(`  [대기 30초 — rate limit 여유]`);
    await new Promise((resolve) => setTimeout(resolve, 30000));
  }

  console.log(`저장: ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
