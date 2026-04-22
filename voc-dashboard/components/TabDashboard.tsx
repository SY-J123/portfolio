"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ATTRIBUTES,
  CATEGORIES,
  SENTIMENT_ORDER,
  SENTIMENT_COLORS,
  CAT_COLORS,
  CAT_HEX,
  findAttribute,
  type Category,
  type Sentiment,
} from "@/lib/attributes";
import classifiedSample from "@/data/google-play.classified.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const SOURCE_LABELS: Record<string, string> = {
  google_play: "Google Play",
  app_store: "App Store",
  ppomppu: "뽐뿌",
  naver_cafe: "네이버 카페",
};

const PLANNED_SOURCES = ["google_play", "app_store", "ppomppu", "naver_cafe"] as const;

type DateRange = "1w" | "4w" | "12w" | "all";

const DATE_RANGE_LABEL: Record<DateRange, string> = {
  "1w": "최근 1주",
  "4w": "최근 4주",
  "12w": "최근 12주",
  all: "전체",
};

const DATE_RANGE_DAYS: Record<DateRange, number | null> = {
  "1w": 7,
  "4w": 28,
  "12w": 84,
  all: null,
};

interface Classification {
  quality_attributes: string[];
  sentiment: Sentiment;
  sentiment_score: number;
  severity: string;
  severity_multiplier: number;
  score_reality: number;
}

interface ClassifiedReview {
  source: string;
  external_id: string;
  author: string;
  score: number | null;
  text: string;
  posted_at: string;
  app_version: string | null;
  thumbs_up: number;
  classification: Classification;
}

const DATA = classifiedSample as ClassifiedReview[];

function gradeOf(score: number) {
  if (score >= 75) return { label: "양호", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  if (score >= 60) return { label: "보통", cls: "bg-amber-50 text-amber-700 border-amber-200" };
  if (score >= 45) return { label: "주의", cls: "bg-orange-50 text-orange-700 border-orange-200" };
  return { label: "위험", cls: "bg-red-50 text-red-700 border-red-200" };
}

function scoreColor(score: number) {
  if (score >= 75) return "#22c55e";
  if (score >= 60) return "#eab308";
  if (score >= 45) return "#f97316";
  return "#ef4444";
}

/** 해당 날짜가 속한 주의 일요일(UTC) 을 YYYY-MM-DD 로 반환 */
function weekStart(iso: string): string {
  const d = new Date(iso);
  const day = d.getUTCDay(); // 일=0..토=6
  d.setUTCDate(d.getUTCDate() - day);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

const ROLLING_WINDOW = 4;

export default function TabDashboard() {
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>("4w");

  // 데이터 최신 posted_at 을 기준으로 필터 윈도우 산정 (프로토타입 스냅샷 특성상 today 대신 max 사용)
  const maxPostedAt = useMemo<string>(() => {
    if (DATA.length === 0) return new Date().toISOString();
    return DATA.reduce(
      (max, r) => (r.posted_at > max ? r.posted_at : max),
      DATA[0].posted_at
    );
  }, []);

  const filteredData = useMemo(() => {
    const days = DATE_RANGE_DAYS[dateRange];
    if (days === null) return DATA;
    const anchor = new Date(maxPostedAt).getTime();
    const threshold = anchor - days * 24 * 60 * 60 * 1000;
    return DATA.filter((r) => new Date(r.posted_at).getTime() >= threshold);
  }, [dateRange, maxPostedAt]);

  const summary = useMemo(() => {
    const total = filteredData.length;
    const avgScore = total
      ? filteredData.reduce((s, r) => s + r.classification.score_reality, 0) / total
      : 0;
    const negative = filteredData.filter(
      (r) => r.classification.sentiment === "부정" || r.classification.sentiment === "매우 부정"
    ).length;
    return { total, avgScore, negative };
  }, [filteredData]);

  // 채널 × 감정 분포 — 리뷰 단위. 미수집 채널도 placeholder로 표시
  const sourceDist = useMemo(() => {
    const dist = new Map<string, Record<Sentiment, number>>();
    for (const src of PLANNED_SOURCES) {
      dist.set(src, { "매우 긍정": 0, 긍정: 0, 중립: 0, 부정: 0, "매우 부정": 0 });
    }
    for (const r of filteredData) {
      if (!dist.has(r.source)) {
        dist.set(r.source, { "매우 긍정": 0, 긍정: 0, 중립: 0, 부정: 0, "매우 부정": 0 });
      }
      dist.get(r.source)![r.classification.sentiment]++;
    }
    return Array.from(dist.entries()).map(([source, d]) => ({
      source,
      dist: d,
      total: SENTIMENT_ORDER.reduce((s, sent) => s + d[sent], 0),
    }));
  }, [filteredData]);
  const maxSourceTotal = Math.max(...sourceDist.map((s) => s.total), 1);

  // 카테고리별 점수 (attribute-match 단위 집계)
  const catScores = useMemo(() => {
    type Stat = { cat: Category; sum: number; count: number; negative: number };
    const init: Record<Category, Stat> = {
      전략: { cat: "전략", sum: 0, count: 0, negative: 0 },
      UX: { cat: "UX", sum: 0, count: 0, negative: 0 },
      운영: { cat: "운영", sum: 0, count: 0, negative: 0 },
      기술: { cat: "기술", sum: 0, count: 0, negative: 0 },
    };
    const attrNeg: Record<Category, Map<string, number>> = {
      전략: new Map(), UX: new Map(), 운영: new Map(), 기술: new Map(),
    };
    for (const r of filteredData) {
      const cats = new Set<Category>();
      for (const a of r.classification.quality_attributes) {
        const attr = findAttribute(a);
        if (attr) cats.add(attr.category);
      }
      const isNeg = r.classification.sentiment === "부정" || r.classification.sentiment === "매우 부정";
      for (const c of cats) {
        init[c].sum += r.classification.score_reality;
        init[c].count++;
        if (isNeg) init[c].negative++;
      }
      if (isNeg) {
        for (const a of r.classification.quality_attributes) {
          const attr = findAttribute(a);
          if (!attr) continue;
          attrNeg[attr.category].set(a, (attrNeg[attr.category].get(a) ?? 0) + 1);
        }
      }
    }
    return CATEGORIES.map((c) => {
      const s = init[c];
      let topAttr: { name: string; neg: number } | null = null;
      for (const [name, neg] of attrNeg[c]) {
        if (!topAttr || neg > topAttr.neg) topAttr = { name, neg };
      }
      return {
        cat: c,
        avgScore: s.count ? s.sum / s.count : 0,
        count: s.count,
        negative: s.negative,
        topAttr,
      };
    });
  }, [filteredData]);

  // 주간 카테고리 점수 추이 — rolling 4주 평균
  const weeklyTrend = useMemo(() => {
    type Entry = { week: string; cat: Category; score: number };
    const entries: Entry[] = [];
    for (const r of filteredData) {
      const w = weekStart(r.posted_at);
      const cats = new Set<Category>();
      for (const a of r.classification.quality_attributes) {
        const attr = findAttribute(a);
        if (attr) cats.add(attr.category);
      }
      for (const c of cats) {
        entries.push({ week: w, cat: c, score: r.classification.score_reality });
      }
    }
    const weeks = Array.from(new Set(entries.map((e) => e.week))).sort();
    return weeks.map((w, i) => {
      const windowStart = Math.max(0, i - ROLLING_WINDOW + 1);
      const windowSet = new Set(weeks.slice(windowStart, i + 1));
      const relevant = entries.filter((e) => windowSet.has(e.week));
      const row: Record<string, number | string> = { week: w.slice(5) };
      for (const c of CATEGORIES) {
        const forCat = relevant.filter((e) => e.cat === c);
        if (forCat.length === 0) continue;
        row[c] =
          Math.round(
            (forCat.reduce((s, e) => s + e.score, 0) / forCat.length) * 10
          ) / 10;
      }
      return row;
    });
  }, [filteredData]);

  // 선택된 카테고리 상세 — 속성별 집계 + 매칭 원문
  const detail = useMemo(() => {
    if (!selectedCat) return null;
    const attrsInCat = ATTRIBUTES.filter((a) => a.category === selectedCat);

    type AttrStat = { name: string; total: number; negative: number };
    const attrMap = new Map<string, AttrStat>();
    for (const a of attrsInCat) attrMap.set(a.name, { name: a.name, total: 0, negative: 0 });

    const reviews: ClassifiedReview[] = [];
    for (const r of filteredData) {
      const hit = r.classification.quality_attributes.some((a) => {
        const attr = findAttribute(a);
        return attr?.category === selectedCat;
      });
      if (!hit) continue;
      reviews.push(r);
      const isNeg = r.classification.sentiment === "부정" || r.classification.sentiment === "매우 부정";
      for (const a of r.classification.quality_attributes) {
        const s = attrMap.get(a);
        if (!s) continue;
        s.total++;
        if (isNeg) s.negative++;
      }
    }
    const attrStats = Array.from(attrMap.values())
      .sort((a, b) => b.negative - a.negative || b.total - a.total);
    const maxAttrTotal = Math.max(...attrStats.map((s) => s.total), 1);
    reviews.sort((a, b) => a.classification.score_reality - b.classification.score_reality);
    return { cat: selectedCat, attrStats, maxAttrTotal, reviews };
  }, [selectedCat, filteredData]);

  const grade = gradeOf(summary.avgScore);
  const negPct = summary.total ? Math.round((summary.negative / summary.total) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-10">
      <header>
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
          Dashboard · Google Play · {DATA.length}건 분류 완료
        </p>
        <h1 className="text-2xl font-bold tracking-tight">VOC 분석 대시보드</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          2026년 3월 이후 토스 Google Play 리뷰를 수기 LLM 분류한 결과.
        </p>
      </header>

      <Separator />

      {/* 기간 필터 */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-xs font-semibold text-muted-foreground mr-1">기간</span>
        {(Object.keys(DATE_RANGE_LABEL) as DateRange[]).map((r) => {
          const active = dateRange === r;
          return (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className={`px-3 py-1 rounded-md transition ${
                active
                  ? "font-semibold bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {DATE_RANGE_LABEL[r]}
            </button>
          );
        })}
        <span className="ml-2 text-xs text-muted-foreground">
          기준일: {maxPostedAt.slice(0, 10)}
        </span>
      </div>

      {/* 3.1 요약 카드 */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">3.1 요약</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-5">
            <p className="text-xs text-muted-foreground mb-2">총 VOC</p>
            <p className="text-3xl font-bold tabular-nums">{summary.total}</p>
            <p className="text-xs text-muted-foreground mt-2">전처리 후 보존 건수</p>
          </div>
          <div className="border rounded-lg p-5">
            <p className="text-xs text-muted-foreground mb-2">평균 만족도</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold tabular-nums" style={{ color: scoreColor(summary.avgScore) }}>
                {summary.avgScore.toFixed(1)}
              </p>
              <span className="text-sm text-muted-foreground">/100</span>
              <Badge variant="outline" className={`text-[10px] ${grade.cls}`}>{grade.label}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">baseline 80에서 감정·심각도로 가감</p>
          </div>
          <div className="border rounded-lg p-5">
            <p className="text-xs text-muted-foreground mb-2">부정 VOC</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold tabular-nums text-red-600">{summary.negative}</p>
              <span className="text-sm text-muted-foreground">건 ({negPct}%)</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">부정 + 매우 부정 합계</p>
          </div>
        </div>
      </section>

      {/* 3.2 카테고리별 점수 */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">
          3.2 카테고리별 점수
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {catScores.map((s) => {
            const g = gradeOf(s.avgScore);
            const np = s.count ? Math.round((s.negative / s.count) * 100) : 0;
            const topLine = s.topAttr
              ? `${s.topAttr.name} 중심 불만 (${s.topAttr.neg}건)`
              : s.count
                ? "부정 신호 없음"
                : "매칭 없음";
            return (
              <div key={s.cat} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${CAT_COLORS[s.cat]}`} />
                    <span className="text-sm font-semibold">{s.cat}</span>
                  </span>
                  <Badge variant="outline" className={`text-[10px] ${g.cls}`}>
                    {g.label}
                  </Badge>
                </div>
                <p
                  className="text-3xl font-bold tabular-nums"
                  style={{ color: scoreColor(s.avgScore) }}
                >
                  {s.count ? s.avgScore.toFixed(1) : "—"}
                </p>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>{s.count}건</span>
                  <span>부정 {np}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted mt-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-red-400"
                    style={{ width: `${np}%` }}
                  />
                </div>
                <p className="text-xs text-foreground mt-3 line-clamp-2 min-h-[2.5rem]">
                  {topLine}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3.3 채널별 감정 분포 + 주간 추이 */}
      <section>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-4 items-stretch">
          {/* 좌: 채널별 감정 분포 */}
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">
              3.3 채널별 감정 분포
            </h2>
            <div className="border rounded-lg p-5 space-y-4 flex-1">
              {sourceDist.map(({ source, dist, total }) => {
                const isEmpty = total === 0;
                const widthPct = isEmpty ? 100 : (total / maxSourceTotal) * 100;
                const pos = isEmpty ? 0 : dist["매우 긍정"] + dist["긍정"];
                const neu = isEmpty ? 0 : dist["중립"];
                const neg = isEmpty ? 0 : dist["부정"] + dist["매우 부정"];
                const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);
                return (
                  <div key={source} className={isEmpty ? "opacity-50" : ""}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium">
                        {SOURCE_LABELS[source] || source}
                        {isEmpty && (
                          <span className="ml-2 text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                            수집 예정
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {isEmpty ? "—" : `${total}건`}
                      </span>
                    </div>
                    <div
                      className={`flex h-6 rounded overflow-hidden ${
                        isEmpty ? "bg-slate-50 border border-dashed border-slate-200" : "bg-slate-100"
                      }`}
                      style={{ width: `${Math.max(widthPct, 5)}%` }}
                    >
                      {!isEmpty &&
                        SENTIMENT_ORDER.map((sent) => {
                          const n = dist[sent];
                          if (n === 0) return null;
                          const w = (n / total) * 100;
                          return (
                            <div
                              key={sent}
                              className={SENTIMENT_COLORS[sent]}
                              style={{ width: `${w}%` }}
                              title={`${sent}: ${n}건 (${pct(n)}%)`}
                            />
                          );
                        })}
                    </div>
                    {!isEmpty && (
                      <div className="flex gap-3 mt-1.5 text-[11px] text-muted-foreground tabular-nums">
                        <span>
                          긍정 <strong className="text-emerald-600 font-semibold">{pct(pos)}%</strong>
                          <span className="ml-0.5">({pos})</span>
                        </span>
                        <span>
                          중립 <strong className="text-slate-500 font-semibold">{pct(neu)}%</strong>
                          <span className="ml-0.5">({neu})</span>
                        </span>
                        <span>
                          부정 <strong className="text-red-600 font-semibold">{pct(neg)}%</strong>
                          <span className="ml-0.5">({neg})</span>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="flex gap-3 pt-2 border-t text-[11px] text-muted-foreground">
                {SENTIMENT_ORDER.map((sent) => (
                  <div key={sent} className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-sm ${SENTIMENT_COLORS[sent]}`} />
                    <span>{sent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 우: 주간 추이 */}
          <div className="flex flex-col">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-sm font-semibold text-muted-foreground">
                카테고리별 점수 주간 추이
              </h2>
              <span className="text-[10px] text-muted-foreground">
                4주 이동평균 · MM-DD
              </span>
            </div>
            <div className="border rounded-lg p-4 flex-1 min-h-0">
              {weeklyTrend.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  데이터 없음
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyTrend}
                    margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                    <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 6 }}
                      cursor={{ stroke: "#cbd5e1" }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                      iconSize={10}
                    />
                    {CATEGORIES.map((cat) => (
                      <Line
                        key={cat}
                        type="monotone"
                        dataKey={cat}
                        stroke={CAT_HEX[cat]}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        connectNulls
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3.4 카테고리 상세 */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">
          3.4 카테고리 상세 — 속성 분포 및 원문
        </h2>

        {/* 칩 필터 (단일 선택) */}
        <div className="flex items-center gap-2 mb-3" role="radiogroup" aria-label="카테고리 선택">
          {CATEGORIES.map((c) => {
            const active = selectedCat === c;
            return (
              <button
                key={c}
                role="radio"
                aria-checked={active}
                onClick={() => setSelectedCat(active ? null : c)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border transition ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${CAT_COLORS[c]}`} />
                {c}
              </button>
            );
          })}
          {selectedCat && (
            <button
              onClick={() => setSelectedCat(null)}
              className="text-xs text-muted-foreground hover:text-foreground ml-1"
            >
              선택 해제
            </button>
          )}
        </div>

        {!detail ? (
          <div className="border rounded-lg p-10 text-center text-sm text-muted-foreground">
            위 칩에서 카테고리를 선택하세요.
          </div>
        ) : (
          <div className="border rounded-lg p-5 space-y-5">
            <div className="flex items-baseline gap-3">
              <span className={`w-2 h-2 rounded-full ${CAT_COLORS[detail.cat]}`} />
              <h3 className="text-lg font-bold">{detail.cat}</h3>
              <span className="text-xs text-muted-foreground ml-auto">
                매칭 {detail.reviews.length}건
              </span>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground">속성별 분포</p>
                <p className="text-[10px] text-muted-foreground">
                  <span className="inline-block w-2 h-2 rounded-sm bg-slate-300 mr-1 align-middle" />전체
                  <span className="inline-block w-2 h-2 rounded-sm bg-red-500 ml-3 mr-1 align-middle" />부정
                </p>
              </div>
              <div className="border rounded p-3 space-y-1">
                {detail.attrStats.map((s) => {
                  const empty = s.total === 0;
                  const totalPct = (s.total / detail.maxAttrTotal) * 100;
                  const negPct = (s.negative / detail.maxAttrTotal) * 100;
                  return (
                    <div
                      key={s.name}
                      className="grid grid-cols-[180px_1fr_56px_32px] items-center gap-3 py-1"
                    >
                      <span className={`text-sm truncate ${empty ? "text-muted-foreground" : "font-medium"}`}>
                        {s.name}
                      </span>
                      <div className="relative h-5 bg-slate-100 rounded-sm overflow-hidden">
                        {!empty && (
                          <>
                            <div
                              className="absolute inset-y-0 left-0 bg-slate-300"
                              style={{ width: `${totalPct}%` }}
                            />
                            <div
                              className="absolute inset-y-0 left-0 bg-red-500"
                              style={{ width: `${negPct}%` }}
                            />
                          </>
                        )}
                      </div>
                      <span className="text-sm tabular-nums text-right text-muted-foreground">
                        {empty ? "—" : `${s.total}건`}
                      </span>
                      <span
                        className={`text-sm tabular-nums text-right ${
                          empty
                            ? "text-muted-foreground"
                            : s.negative > 0
                            ? "font-bold text-red-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {empty ? "—" : s.negative}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">LLM 요약</p>
              <div className="bg-slate-50 border rounded p-3 text-sm text-muted-foreground italic">
                (프로토타입 단계 — 본격 분류 이후 LLM이 해당 카테고리의 공통 불만 패턴을 2–3줄로 요약해
                이 자리에 표시한다.)
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                매칭 원문 ({detail.reviews.length}건, 만족도 낮은 순)
              </p>
              <div className="space-y-3">
                {detail.reviews.map((r) => (
                  <div key={r.external_id} className="border rounded p-3 text-sm">
                    <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                      <span
                        className="font-bold tabular-nums"
                        style={{ color: scoreColor(r.classification.score_reality) }}
                      >
                        {r.classification.score_reality}
                      </span>
                      <span>· {r.classification.sentiment}</span>
                      <span>· {r.classification.severity}</span>
                      <span className="ml-auto">별점 {r.score ?? "-"}</span>
                    </div>
                    <p className="leading-relaxed">{r.text}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {r.classification.quality_attributes.map((a) => {
                        const attr = findAttribute(a);
                        const inCat = attr?.category === detail.cat;
                        return (
                          <Badge
                            key={a}
                            variant={inCat ? "default" : "secondary"}
                            className="text-[10px] px-1.5 py-0"
                          >
                            {a}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
