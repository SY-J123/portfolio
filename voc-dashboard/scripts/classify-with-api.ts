import fs from "node:fs/promises";
import path from "node:path";

type Sentiment = "매우 긍정" | "긍정" | "중립" | "부정" | "매우 부정";
type Severity = "일반" | "반복/누적" | "이탈/강한 부정" | "반복+이탈";

interface Review {
  source: string;
  external_id: string;
  author: string;
  score: number | null;
  text: string;
  posted_at: string;
  app_version: string | null;
  thumbs_up: number;
  reply?: string;
  reply_date?: string;
}

interface Classification {
  quality_attributes: string[];
  sentiment: Sentiment;
  sentiment_score: number;
  severity: Severity;
  severity_multiplier: number;
  score_reality: number;
}

interface BatchEntry {
  external_id: string;
  classification: Classification | null;
}

const ROOT = process.cwd();
const INPUT_PATH = path.resolve(ROOT, "data/google-play.march-plus.json");
const OUTPUT_PATH = path.resolve(ROOT, "data/google-play.classified.json");
const BATCH_DIR = path.resolve(ROOT, "scripts/batch-data");

const MODEL = getArg("--model") ?? process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-latest";
const BATCH_SIZE = parseNumber(getArg("--batch-size"), 20);
const LIMIT = parseNumber(getArg("--limit"), Number.POSITIVE_INFINITY);
const MAX_TEXT_LENGTH = parseNumber(getArg("--max-text"), 900);
const START_INDEX = parseNumber(getArg("--start"), 0);
const API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = "https://api.anthropic.com/v1/messages";

const ATTRIBUTES = [
  "핵심가치전달력",
  "차별화 인식",
  "시장 적합성",
  "가격 대비 가치",
  "정책 투명성",
  "프로모션 체감",
  "타겟 적합성",
  "UI 일관성",
  "정보구조 적합성",
  "온보딩 경험",
  "검색 효율성",
  "접근성",
  "오류 메시지 품질",
  "이용 내역 접근성",
  "시각적 피로도",
  "고객지원 접근성",
  "응답 속도 체감",
  "처리 정확성",
  "공지·안내 명확성",
  "후기 신뢰도",
  "알림 적절성",
  "거래 상태 안내",
  "크래시 빈도",
  "앱 안정성",
  "배터리 영향",
  "로딩 속도",
  "로그인·인증",
  "보안·개인정보",
  "호환성",
] as const;

const SENTIMENT_VALUES: Sentiment[] = ["매우 긍정", "긍정", "중립", "부정", "매우 부정"];
const SENTIMENT_SCORES: Record<Sentiment, number> = {
  "매우 긍정": 20,
  긍정: 10,
  중립: 0,
  부정: -10,
  "매우 부정": -20,
};
const SEVERITY_VALUES: Severity[] = ["일반", "반복/누적", "이탈/강한 부정", "반복+이탈"];
const SEVERITY_MULTIPLIERS: Record<Severity, number> = {
  일반: 1.0,
  "반복/누적": 1.5,
  "이탈/강한 부정": 2.0,
  "반복+이탈": 2.5,
};

const SYSTEM_PROMPT = [
  "한국어 앱 리뷰 분류기다.",
  "입력 리뷰들을 지정 규칙대로 분류하고 JSON 배열만 반환한다.",
  "속성은 다음 29개만 사용: " + ATTRIBUTES.join(", "),
  "리뷰별 quality_attributes는 최대 3개, 없으면 []. 광고/스팸/무관 내용이면 classification:null.",
  "reply는 무시하고 text만 본다.",
  "sentiment는 매우 긍정/긍정/중립/부정/매우 부정 중 하나.",
  "별점 기본값: 5~4 긍정, 3 중립, 2~1 부정. 텍스트가 충돌하면 텍스트 우선.",
  "매우 긍정 트리거: 최고, 혁신, 없으면 안 됨, 대체 불가 등.",
  "매우 부정 트리거: 삭제, 사기, 최악, 해지, 다신 안 씀, 못 믿음, 금전 피해 등.",
  "severity는 일반/반복/이탈 신호로 판정한다. 반복 트리거: 또, 계속, 자꾸, 매번, 항상, 여러 번. 이탈 트리거: 삭제, 탈퇴, 해지, 안 씀, 불매, 신고, 사기, 최악, 다신 안.",
  "긍정 리뷰는 severity를 항상 일반으로 둔다.",
  "sentiment_score는 매우 긍정 20, 긍정 10, 중립 0, 부정 -10, 매우 부정 -20.",
  "severity_multiplier는 일반 1.0, 반복/누적 1.5, 이탈/강한 부정 2.0, 반복+이탈 2.5.",
  "score_reality는 80 + (sentiment_score * severity_multiplier) 후 0~100으로 잘라서 정수 또는 소수 첫째 자리까지 허용.",
  "설명, 마크다운, 코드펜스 없이 JSON 배열만 반환한다.",
].join(" ");

async function main() {
  await fs.mkdir(BATCH_DIR, { recursive: true });

  const all = JSON.parse(await fs.readFile(INPUT_PATH, "utf8")) as Review[];
  const existing = await readExisting();
  const existingIds = new Set(existing.map((item) => item.external_id));
  const remaining = all.filter((review) => !existingIds.has(review.external_id));
  const target = remaining.slice(START_INDEX, Number.isFinite(LIMIT) ? START_INDEX + LIMIT : undefined);

  if (target.length === 0) {
    console.log("분류할 미처리 리뷰가 없습니다.");
    return;
  }

  if (!API_KEY) {
    throw new Error("ANTHROPIC_API_KEY 환경변수가 필요합니다.");
  }

  console.log(`모델: ${MODEL}`);
  console.log(`대상: ${target.length}건 (전체 미처리 ${remaining.length}건)`);
  console.log(`배치 크기: ${BATCH_SIZE}`);

  let merged = [...existing];
  let processed = 0;
  let excluded = 0;

  const runStamp = new Date().toISOString().replace(/[:.]/g, "-");
  const totalBatches = Math.ceil(target.length / BATCH_SIZE);

  for (let index = 0; index < target.length; index += BATCH_SIZE) {
    const batchNumber = Math.floor(index / BATCH_SIZE) + 1;
    const batch = target.slice(index, index + BATCH_SIZE);
    console.log(`배치 ${batchNumber}/${totalBatches} 분류 중... (${batch.length}건)`);

    const results = await classifyBatch(batch);
    const outPath = path.resolve(
      BATCH_DIR,
      `api-${runStamp}-batch-${String(batchNumber).padStart(2, "0")}.json`
    );
    await fs.writeFile(outPath, JSON.stringify(results, null, 2), "utf8");

    const byId = new Map(batch.map((review) => [review.external_id, review]));
    for (const item of results) {
      if (item.classification === null) {
        excluded++;
        continue;
      }
      const orig = byId.get(item.external_id);
      if (!orig) {
        throw new Error(`배치에 없는 external_id 응답: ${item.external_id}`);
      }
      merged.push({ ...orig, classification: item.classification });
      processed++;
    }

    await fs.writeFile(OUTPUT_PATH, JSON.stringify(merged, null, 2), "utf8");
    console.log(`저장 완료: ${path.relative(ROOT, outPath)} / 누적 ${processed}건, 제외 ${excluded}건`);
  }

  console.log("");
  console.log("완료");
  console.log(`분류 추가: ${processed}건`);
  console.log(`제외: ${excluded}건`);
  console.log(`누적 총계: ${merged.length}건`);
}

async function readExisting(): Promise<Array<Review & { classification: Classification }>> {
  try {
    return JSON.parse(await fs.readFile(OUTPUT_PATH, "utf8"));
  } catch {
    return [];
  }
}

async function classifyBatch(batch: Review[]): Promise<BatchEntry[]> {
  const payload = batch.map((review) => ({
    external_id: review.external_id,
    score: review.score,
    text: normalizeText(review.text),
  }));

  const userPrompt = [
    "다음 리뷰 배열을 분류하라.",
    "응답 형식:",
    '[{"external_id":"...", "classification": {"quality_attributes":["..."], "sentiment":"부정", "sentiment_score":-10, "severity":"일반", "severity_multiplier":1.0, "score_reality":70}}]',
    "광고/스팸/무관 내용은 classification:null.",
    "입력:",
    JSON.stringify(payload),
  ].join("\n");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: Math.max(1200, batch.length * 140),
      temperature: 0,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Anthropic API 오류 (${response.status}): ${text}`);
  }

  const data = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
    usage?: { input_tokens?: number; output_tokens?: number };
  };

  const text = data.content
    ?.filter((item) => item.type === "text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n")
    .trim();

  if (!text) {
    throw new Error("API 응답에 텍스트 본문이 없습니다.");
  }

  const parsed = parseJsonArray(text);
  const expectedIds = new Set(batch.map((review) => review.external_id));
  const seen = new Set<string>();

  const validated = parsed.map((entry) => validateEntry(entry));
  for (const entry of validated) {
    if (!expectedIds.has(entry.external_id)) {
      throw new Error(`요청하지 않은 external_id 응답: ${entry.external_id}`);
    }
    seen.add(entry.external_id);
  }

  for (const review of batch) {
    if (!seen.has(review.external_id)) {
      throw new Error(`누락된 external_id 응답: ${review.external_id}`);
    }
  }

  const usageSuffix = data.usage
    ? ` (input ${data.usage.input_tokens ?? "?"}, output ${data.usage.output_tokens ?? "?"})`
    : "";
  console.log(`API 응답 검증 완료${usageSuffix}`);

  return validated;
}

function validateEntry(value: unknown): BatchEntry {
  if (!isObject(value) || typeof value.external_id !== "string" || !("classification" in value)) {
    throw new Error(`잘못된 엔트리 형식: ${JSON.stringify(value)}`);
  }

  if (value.classification === null) {
    return { external_id: value.external_id, classification: null };
  }

  if (!isObject(value.classification)) {
    throw new Error(`classification 형식 오류: ${JSON.stringify(value)}`);
  }

  const attrs = Array.isArray(value.classification.quality_attributes)
    ? value.classification.quality_attributes
    : [];

  const uniqueAttrs = [...new Set(attrs)];
  if (!uniqueAttrs.every((attr): attr is string => typeof attr === "string" && ATTRIBUTES.includes(attr as (typeof ATTRIBUTES)[number]))) {
    throw new Error(`허용되지 않은 quality_attributes: ${JSON.stringify(value.classification.quality_attributes)}`);
  }
  if (uniqueAttrs.length > 3) {
    throw new Error(`quality_attributes가 3개를 초과했습니다: ${JSON.stringify(uniqueAttrs)}`);
  }

  const sentiment = value.classification.sentiment;
  if (!SENTIMENT_VALUES.includes(sentiment as Sentiment)) {
    throw new Error(`sentiment 값 오류: ${JSON.stringify(sentiment)}`);
  }

  const severity = value.classification.severity;
  if (!SEVERITY_VALUES.includes(severity as Severity)) {
    throw new Error(`severity 값 오류: ${JSON.stringify(severity)}`);
  }

  const normalizedSentiment = sentiment as Sentiment;
  const normalizedSeverity = severity as Severity;
  const sentimentScore = SENTIMENT_SCORES[normalizedSentiment];
  const severityMultiplier = normalizedSentiment === "매우 긍정" || normalizedSentiment === "긍정"
    ? 1.0
    : SEVERITY_MULTIPLIERS[normalizedSeverity];
  const scoreReality = clipScore(80 + sentimentScore * severityMultiplier);

  return {
    external_id: value.external_id,
    classification: {
      quality_attributes: uniqueAttrs,
      sentiment: normalizedSentiment,
      sentiment_score: sentimentScore,
      severity: normalizedSentiment === "매우 긍정" || normalizedSentiment === "긍정" ? "일반" : normalizedSeverity,
      severity_multiplier: severityMultiplier,
      score_reality: scoreReality,
    },
  };
}

function parseJsonArray(text: string): unknown[] {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`JSON 배열을 찾지 못했습니다: ${text.slice(0, 300)}`);
  }
  return JSON.parse(text.slice(start, end + 1));
}

function clipScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value * 10) / 10));
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim().slice(0, MAX_TEXT_LENGTH);
}

function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function parseNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function isObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
