import fs from "node:fs/promises";
import path from "node:path";
import { ATTRIBUTES, CATEGORIES, type Category } from "../lib/attributes.ts";

const API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5";
if (!API_KEY) throw new Error("ANTHROPIC_API_KEY 필요");

const INPUT = path.resolve(process.cwd(), "data/google-play.classified.json");
const ATTR_TO_CAT = new Map<string, Category>(ATTRIBUTES.map((a) => [a.name, a.category]));

interface Row {
  text: string;
  classification: {
    quality_attributes: string[];
    sentiment: string;
    score_reality: number;
  };
}

async function summarizeCategory(cat: Category, reviews: Row[]): Promise<string> {
  const system = [
    "한국어 앱 리뷰 요약 분석가다.",
    `카테고리 "${cat}"에 속한 부정 리뷰들을 읽고 공통된 불만 패턴을 2~3줄로 요약한다.`,
    "각 줄은 40자 이내, 구체적 현상·대상·반복 키워드 포함.",
    "개별 리뷰 인용 금지, 패턴만 서술. 줄바꿈으로 구분.",
    "응답은 요약 본문만, 불릿/번호/따옴표 없이.",
  ].join(" ");

  const picks = reviews
    .sort((a, b) => a.classification.score_reality - b.classification.score_reality)
    .slice(0, 40)
    .map((r, i) => `${i + 1}. [${r.classification.quality_attributes.join("/")}] ${r.text.replace(/\s+/g, " ").slice(0, 200)}`)
    .join("\n");

  const user = [`카테고리: ${cat}`, `리뷰 ${Math.min(40, reviews.length)}건:`, picks].join("\n");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": API_KEY!, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, max_tokens: 400, temperature: 0, system, messages: [{ role: "user", content: user }] }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const body = (await res.json()) as { content: Array<{ type: string; text?: string }> };
  return body.content.filter((c) => c.type === "text").map((c) => c.text).join("\n").trim();
}

async function main() {
  const data = JSON.parse(await fs.readFile(INPUT, "utf8")) as Row[];
  const negative = data.filter((r) => r.classification.sentiment === "부정" || r.classification.sentiment === "매우 부정");

  const byCat: Record<Category, Row[]> = { 전략: [], UX: [], 운영: [], 기술: [] };
  for (const r of negative) {
    const cats = new Set<Category>();
    for (const a of r.classification.quality_attributes) {
      const c = ATTR_TO_CAT.get(a);
      if (c) cats.add(c);
    }
    for (const c of cats) byCat[c].push(r);
  }

  for (const cat of CATEGORIES) {
    const n = byCat[cat].length;
    console.log(`\n=== ${cat} (부정 ${n}건) ===`);
    if (n === 0) {
      console.log("(리뷰 없음)");
      continue;
    }
    const summary = await summarizeCategory(cat, byCat[cat]);
    console.log(summary);
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
