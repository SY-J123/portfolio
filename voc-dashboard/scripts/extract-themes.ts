/**
 * 분류된 리뷰에서 범주별 공통 주제 추출 (프로토타입)
 *
 * 실행:
 *   npx tsx scripts/extract-themes.ts
 *
 * 입력: data/sample.maalej.json (분류 완료 리뷰)
 * 출력: data/sample.themes.json
 *
 * 처리:
 * - 3개 범주(bug_report, feature_request, user_experience)만 대상
 * - 각 범주의 전체 리뷰를 LLM에 전달해 상위 5개 주제 + 대표 리뷰 추출
 * - rating은 정보 가치 낮아 제외
 */
import fs from "node:fs/promises";
import path from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.resolve(process.cwd(), ".env.local"), override: true });

const ROOT = process.cwd();
const INPUT_PATH = path.resolve(ROOT, "data/classified.maalej.json");
const OUTPUT_PATH = path.resolve(ROOT, "data/category-themes.json");
const MODEL = "claude-haiku-4-5-20251001";
const API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = "https://api.anthropic.com/v1/messages";

const TARGET_CATEGORIES = [
  "bug_report",
  "feature_request",
  "user_experience",
] as const;
type Category = (typeof TARGET_CATEGORIES)[number];

const CATEGORY_KR: Record<Category, string> = {
  bug_report: "버그 리포트",
  feature_request: "기능 요청",
  user_experience: "사용자 경험",
};

interface ClassifiedReview {
  external_id: string;
  text: string;
  score: number | null;
  posted_at: string;
  classification: { types: string[] };
}

interface Theme {
  theme: string;
  count: number;
  review_ids: string[];
  examples: string[];
}

interface ThemeResponse {
  theme: string;
  review_indices: number[];
  examples: string[];
}

async function extractThemesForCategory(
  category: Category,
  reviews: ClassifiedReview[]
): Promise<Theme[]> {
  if (reviews.length === 0) return [];

  const indexed = reviews.map((r, i) => ({
    index: i + 1,
    text: r.text,
  }));

  const systemPrompt = [
    `당신은 토스 앱의 ${CATEGORY_KR[category]} 리뷰에서 공통 주제를 뽑는 분석가다.`,
    "입력으로 주어진 리뷰 배열을 읽고, 반복적으로 언급되는 주제를 상위 5개까지 도출한다.",
    "각 주제마다 해당되는 리뷰의 index 목록과 대표 리뷰 원문 2~3건을 반환한다.",
    "",
    "주제 작성 규칙:",
    "- 주제 이름은 10자 내외의 명사구 (예: '광고·알림 과다', '로그인 오류').",
    "- 하나의 리뷰가 여러 주제에 걸칠 수 있음 (중복 포함 허용).",
    "- 최소 2건 이상 언급된 주제만 포함. 단발성 주제는 제외.",
    "- 주제 수가 적으면 5개보다 적게 반환해도 됨.",
    "",
    "응답 형식 (JSON 배열만, 마크다운·설명 없이):",
    `[{ "theme": "...", "review_indices": [1, 3, 5], "examples": ["원문1", "원문2"] }, ...]`,
  ].join("\n");

  const userPrompt = [
    `다음은 ${CATEGORY_KR[category]}로 분류된 리뷰 ${reviews.length}건이다. 공통 주제를 뽑아라.`,
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
    `  [${category}] 토큰: input ${data.usage?.input_tokens} / output ${data.usage?.output_tokens}`
  );

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1) {
    throw new Error(`JSON 배열을 찾지 못함: ${text.slice(0, 300)}`);
  }
  const parsed = JSON.parse(text.slice(start, end + 1)) as ThemeResponse[];

  return parsed.map((t) => {
    const indices = Array.isArray(t.review_indices) ? t.review_indices : [];
    const review_ids = indices
      .map((idx) => reviews[idx - 1]?.external_id)
      .filter((id): id is string => typeof id === "string");
    return {
      theme: t.theme,
      count: indices.length,
      review_ids,
      examples: Array.isArray(t.examples) ? t.examples.slice(0, 3) : [],
    };
  });
}

async function main() {
  if (!API_KEY) throw new Error("ANTHROPIC_API_KEY 환경변수가 필요합니다.");

  const all = JSON.parse(
    await fs.readFile(INPUT_PATH, "utf8")
  ) as ClassifiedReview[];

  console.log(`입력: ${all.length}건 분류 완료 리뷰\n`);

  const result: Record<Category, Theme[]> = {
    bug_report: [],
    feature_request: [],
    user_experience: [],
  };

  for (const category of TARGET_CATEGORIES) {
    const reviews = all.filter((r) => r.classification.types.includes(category));
    console.log(`${CATEGORY_KR[category]} (${category}): ${reviews.length}건`);

    if (reviews.length === 0) {
      console.log(`  스킵 (리뷰 없음)\n`);
      continue;
    }

    const themes = await extractThemesForCategory(category, reviews);
    result[category] = themes;

    console.log(`  → ${themes.length}개 주제 추출`);
    themes.forEach((t) => {
      console.log(`    · ${t.theme} (${t.count}건)`);
    });
    console.log();

    // 주마다 저장 + rate limit 회피
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(result, null, 2), "utf8");
    console.log(`  [대기 30초 — rate limit 여유]`);
    await new Promise((r) => setTimeout(r, 30000));
  }

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(result, null, 2), "utf8");
  console.log(`저장: ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
