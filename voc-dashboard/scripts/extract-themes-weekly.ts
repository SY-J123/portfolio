/**
 * 주별 × 범주별 상위 주제 추출 (배타적 주제 이름)
 *
 * 실행: npx tsx scripts/extract-themes-weekly.ts
 * 입력: data/classified.maalej.json
 * 출력: data/weekly-themes.json
 *
 * 처리:
 * - 6주 × 3범주(bug_report / feature_request / user_experience) 반복
 * - 각 (주, 범주)마다 해당 리뷰만 LLM에 전달 → 상위 5개 주제 + review_ids
 * - 주제 이름 규칙:
 *   - 같은 범주의 직전 3주에 나온 주제는 재사용
 *   - 같은 주 내 다른 범주가 이미 쓴 이름은 피함 (배타적)
 * - 평가(rating)는 제외
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
const LOOKBACK = 3;
const SLEEP_MS = 10_000;

const WEEKS = [
  { label: "1주차 (3/1–7)", start: "2026-03-01", end: "2026-03-08" },
  { label: "2주차 (3/8–14)", start: "2026-03-08", end: "2026-03-15" },
  { label: "3주차 (3/15–21)", start: "2026-03-15", end: "2026-03-22" },
  { label: "4주차 (3/22–28)", start: "2026-03-22", end: "2026-03-29" },
  { label: "5주차 (3/29–4/4)", start: "2026-03-29", end: "2026-04-05" },
  { label: "6주차 (4/5–11)", start: "2026-04-05", end: "2026-04-12" },
];

type CategoryKey = "bug_report" | "feature_request" | "user_experience";

const CATEGORIES: Array<{ key: CategoryKey; label: string }> = [
  { key: "bug_report", label: "버그 리포트" },
  { key: "feature_request", label: "기능 요청" },
  { key: "user_experience", label: "사용자 경험" },
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

interface CategoryBucket {
  review_count: number;
  themes: WeeklyTheme[];
}

interface WeeklyResult {
  week: string;
  start: string;
  end: string;
  review_count: number;
  by_category: Record<CategoryKey, CategoryBucket>;
}

function collectPriorThemes(
  results: WeeklyResult[],
  catKey: CategoryKey,
  lookback: number
): string[] {
  const recent = results.slice(-lookback);
  const set = new Set<string>();
  for (const r of recent) {
    const bucket = r.by_category?.[catKey];
    if (bucket) {
      for (const t of bucket.themes) set.add(t.theme);
    }
  }
  return Array.from(set);
}

async function extractForCategoryWeek(
  reviews: ClassifiedReview[],
  catKey: CategoryKey,
  catLabel: string,
  priorThemesSameCat: string[],
  usedThemesOtherCatsThisWeek: string[]
): Promise<WeeklyTheme[]> {
  if (reviews.length === 0) return [];

  const indexed = reviews.map((r, i) => ({
    index: i + 1,
    text: r.text,
  }));

  const systemPrompt = [
    `당신은 토스 앱의 ${catLabel} 리뷰에서 공통 주제를 뽑는 분석가다.`,
    `입력된 리뷰는 모두 ${catLabel}(${catKey}) 범주로 이미 분류된 상태이며, 이 범주 내부의 공통 주제 상위 5개를 도출한다.`,
    "각 주제마다 해당되는 리뷰의 index 목록을 반환한다.",
    "",
    "주제 작성 규칙:",
    "- 주제 이름은 10자 내외의 명사구 (예: '로그인 오류', '광고 보상 미지급').",
    "- 하나의 리뷰가 여러 주제에 걸칠 수 있음.",
    "- 최소 2건 이상 언급된 주제만 포함. 단발성 주제는 제외.",
    "- 상위 5개까지. 데이터가 적으면 5개보다 적어도 됨.",
    `- 이 주제는 반드시 ${catLabel} 범주의 성격을 반영해야 한다.`,
    "",
    "기존 주제 재사용 규칙 (같은 범주 · 직전 3주):",
    "- 이번 주 주제의 의미가 기존 주제와 사실상 같으면, 반드시 기존 이름을 그대로 재사용한다.",
    "- 재사용 예시: 기존 '로그인 오류'가 있으면 '로그인 안됨'·'로그인 실패' 같은 동의 변형은 새로 만들지 말고 '로그인 오류'로 흡수한다.",
    "- 단어가 겹쳐도 문제의 성격이 다르면 새 이름을 쓴다. 성격 구분 예시:",
    "  - 버그 · 오작동 (예: '광고 보상 미지급', '결제 실패')",
    "  - 빈도 · 분량 불만 (예: '광고 과다', '알림 과다')",
    "  - UI · 경험 불만 (예: '인증 흐름 복잡')",
    "",
    "배타성 규칙 (같은 주 · 다른 범주):",
    "- 같은 주에 다른 범주에서 이미 사용된 주제 이름은 이 범주에서 쓰지 말 것.",
    "- 내용이 겹치더라도 이 범주 관점에서 다른 명사구로 기술한다.",
    "",
    "응답 형식 (JSON 배열만, 마크다운·설명 없이):",
    `[{ "theme": "...", "review_indices": [1, 3, 5] }, ...]`,
  ].join("\n");

  const priorBlock =
    priorThemesSameCat.length > 0
      ? `기존 주제 (같은 범주 · 직전 3주, ${priorThemesSameCat.length}개):\n${JSON.stringify(priorThemesSameCat)}\n\n`
      : "기존 주제 (같은 범주): 없음\n\n";

  const usedBlock =
    usedThemesOtherCatsThisWeek.length > 0
      ? `다른 범주가 이번 주에 이미 사용한 이름 (${usedThemesOtherCatsThisWeek.length}개 — 재사용 금지):\n${JSON.stringify(usedThemesOtherCatsThisWeek)}\n\n`
      : "";

  const userPrompt = [
    `다음은 이번 주 ${catLabel} 리뷰 ${reviews.length}건이다. 공통 주제 상위 5개를 뽑아라.`,
    "",
    priorBlock,
    usedBlock,
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
    const errTxt = await res.text();
    throw new Error(`API 오류 (${res.status}): ${errTxt}`);
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
    `    토큰: input ${data.usage?.input_tokens} / output ${data.usage?.output_tokens}`
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

  const targetReviews = all.filter((r) => {
    const types = r.classification.types;
    if (types.length === 0) return false;
    return types.some((t) => t !== "rating");
  });

  console.log(`전체 분류 완료 리뷰: ${all.length}건`);
  console.log(`rating-only/빈 배열 제외 후: ${targetReviews.length}건\n`);

  let results: WeeklyResult[] = [];
  try {
    results = JSON.parse(
      await fs.readFile(OUTPUT_PATH, "utf8")
    ) as WeeklyResult[];
    // 옛 구조 감지 (themes 배열 필드가 있으면 재시작)
    if (results[0] && (results[0] as any).themes) {
      console.log("이전 구조 감지 → 처음부터 재추출.\n");
      results = [];
    } else {
      console.log(`이미 처리된 주: ${results.length}개\n`);
    }
  } catch {
    results = [];
  }
  const doneLabels = new Set(results.map((r) => r.week));

  for (const week of WEEKS) {
    if (doneLabels.has(week.label)) {
      console.log(`${week.label}: 건너뜀 (이미 처리)`);
      continue;
    }
    const weekReviewsAll = targetReviews.filter(
      (r) => r.posted_at >= week.start && r.posted_at < week.end
    );
    console.log(`${week.label}: ${weekReviewsAll.length}건 (rating 제외)`);

    const by_category: Record<CategoryKey, CategoryBucket> = {
      bug_report: { review_count: 0, themes: [] },
      feature_request: { review_count: 0, themes: [] },
      user_experience: { review_count: 0, themes: [] },
    };
    const usedThisWeek = new Set<string>();

    for (const cat of CATEGORIES) {
      const catReviews = weekReviewsAll.filter((r) =>
        r.classification.types.includes(cat.key)
      );
      console.log(`  [${cat.label}] ${catReviews.length}건`);
      by_category[cat.key].review_count = catReviews.length;

      if (catReviews.length === 0) {
        console.log(`    스킵 (리뷰 없음)`);
        continue;
      }

      const priorSameCat = collectPriorThemes(results, cat.key, LOOKBACK);
      const usedOtherCats = Array.from(usedThisWeek);
      if (priorSameCat.length > 0) {
        console.log(
          `    기존 주제 ${priorSameCat.length}개 · 다른 범주 사용 ${usedOtherCats.length}개`
        );
      }

      const themes = await extractForCategoryWeek(
        catReviews,
        cat.key,
        cat.label,
        priorSameCat,
        usedOtherCats
      );

      by_category[cat.key].themes = themes;
      themes.forEach((t) => usedThisWeek.add(t.theme));

      themes.forEach((t, i) => {
        console.log(`    ${i + 1}. ${t.theme} (${t.count}건)`);
      });

      console.log(`    [대기 ${SLEEP_MS / 1000}초]`);
      await new Promise((resolve) => setTimeout(resolve, SLEEP_MS));
    }

    results.push({
      week: week.label,
      start: week.start,
      end: week.end,
      review_count: weekReviewsAll.length,
      by_category,
    });

    await fs.writeFile(OUTPUT_PATH, JSON.stringify(results, null, 2), "utf8");
    console.log();
  }

  console.log(`저장: ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
