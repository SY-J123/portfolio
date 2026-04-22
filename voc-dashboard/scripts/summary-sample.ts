import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const INPUT = path.resolve(ROOT, "data/google-play.classified.json");
const API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5";

if (!API_KEY) throw new Error("ANTHROPIC_API_KEY 필요");

const SYSTEM = [
  "한국어 앱 리뷰 요약기다.",
  "각 리뷰를 한 문장(최대 40자)으로 핵심 불만/칭찬만 담아 요약한다.",
  "감탄사, 반복 표현, 인사말, 중복 내용은 제거한다.",
  "원문의 어조(부정/긍정)를 유지한다.",
  "JSON 배열만 반환한다. 형식: [{\"external_id\":\"...\",\"summary\":\"...\"}]",
].join(" ");

async function main() {
  const data = JSON.parse(await fs.readFile(INPUT, "utf8")) as Array<{
    external_id: string;
    text: string;
    score: number | null;
    classification: { sentiment: string; score_reality: number; quality_attributes: string[] };
  }>;

  const neg = data.filter((r) => r.classification.sentiment === "매우 부정" || r.classification.sentiment === "부정").slice(0, 5);
  const pos = data.filter((r) => r.classification.sentiment === "매우 긍정" || r.classification.sentiment === "긍정").slice(0, 5);
  const sample = [...neg, ...pos];

  const userPrompt = [
    "다음 리뷰들을 각각 한 문장으로 요약:",
    JSON.stringify(sample.map((r) => ({ external_id: r.external_id, text: r.text.slice(0, 600) }))),
  ].join("\n");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": API_KEY!, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, max_tokens: 2000, temperature: 0, system: SYSTEM, messages: [{ role: "user", content: userPrompt }] }),
  });

  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const body = (await res.json()) as { content: Array<{ type: string; text?: string }>; usage?: Record<string, number> };
  const text = body.content.filter((c) => c.type === "text").map((c) => c.text).join("\n").trim();
  const start = text.indexOf("["), end = text.lastIndexOf("]");
  const summaries = JSON.parse(text.slice(start, end + 1)) as Array<{ external_id: string; summary: string }>;
  const byId = new Map(summaries.map((s) => [s.external_id, s.summary]));

  console.log(`모델: ${MODEL} / usage:`, body.usage);
  console.log("");
  for (const r of sample) {
    console.log("---");
    console.log(`[${r.classification.sentiment}] score=${r.score} score_reality=${r.classification.score_reality}`);
    console.log(`속성: ${r.classification.quality_attributes.join(", ") || "-"}`);
    console.log(`원문: ${r.text.slice(0, 120)}${r.text.length > 120 ? "..." : ""}`);
    console.log(`요약: ${byId.get(r.external_id) ?? "(누락)"}`);
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
