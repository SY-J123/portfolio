"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import sampleData from "@/data/classified.maalej.json";
import themesData from "@/data/category-themes.json";
import weeklyThemesData from "@/data/weekly-themes.json";

type ReviewType = "bug_report" | "feature_request" | "user_experience" | "rating";

interface ClassifiedReview {
  source: string;
  external_id: string;
  author: string;
  score: number | null;
  text: string;
  posted_at: string;
  app_version: string | null;
  classification: { types: string[] };
}

const LABELS: Record<ReviewType, { kr: string; emoji: string; color: string; bar: string }> = {
  bug_report: {
    kr: "버그 리포트",
    emoji: "🐛",
    color: "bg-red-100 text-red-700 border-red-200",
    bar: "bg-red-400",
  },
  feature_request: {
    kr: "기능 요청",
    emoji: "✨",
    color: "bg-violet-100 text-violet-700 border-violet-200",
    bar: "bg-violet-400",
  },
  user_experience: {
    kr: "사용자 경험",
    emoji: "👤",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    bar: "bg-blue-400",
  },
  rating: {
    kr: "평가",
    emoji: "⭐",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    bar: "bg-amber-400",
  },
};

const LABEL_ORDER: ReviewType[] = [
  "bug_report",
  "feature_request",
  "user_experience",
  "rating",
];

type FilterValue = "all" | ReviewType;

export default function TabDashboard() {
  const reviews = sampleData as ClassifiedReview[];
  const [filter, setFilter] = useState<FilterValue>("all");
  const themesRef = useRef<HTMLElement>(null);
  const [themesHeight, setThemesHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = themesRef.current;
    if (!el) return;
    const update = () => setThemesHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const stats = useMemo(() => {
    const counts: Record<ReviewType, number> = {
      bug_report: 0,
      feature_request: 0,
      user_experience: 0,
      rating: 0,
    };
    let multiLabel = 0;
    let empty = 0;
    for (const r of reviews) {
      if (r.classification.types.length === 0) empty++;
      if (r.classification.types.length > 1) multiLabel++;
      for (const t of r.classification.types) {
        if (t in counts) counts[t as ReviewType]++;
      }
    }
    const max = Math.max(...Object.values(counts));
    return { counts, max, multiLabel, empty, total: reviews.length };
  }, [reviews]);

  const [themeFilter, setThemeFilter] = useState<{
    category: ReviewType | null;
    theme: string;
    reviewIds: Set<string>;
  } | null>(null);

  const filtered = useMemo(() => {
    if (themeFilter) {
      return reviews.filter((r) => themeFilter.reviewIds.has(r.external_id));
    }
    if (filter === "all") return reviews;
    return reviews.filter((r) => r.classification.types.includes(filter));
  }, [reviews, filter, themeFilter]);

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-6 space-y-10">
      {/* 헤더 */}
      <header>
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
          Dashboard
        </p>
        <h1 className="text-3xl font-bold tracking-tight leading-tight">
          토스 VOC 분류·주제 분석
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Google Play · Apple App Store · 2026년 3월 · 전체 {stats.total}건 ·{" "}
          <code className="px-1 py-0.5 rounded bg-slate-100 text-xs font-mono">
            claude-haiku-4-5
          </code>
        </p>
      </header>

      <Separator />

      {/* 요약 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">요약</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="총 리뷰" value={stats.total} />
          <StatCard
            label="다중 라벨"
            value={stats.multiLabel}
            sublabel={`${((stats.multiLabel / stats.total) * 100).toFixed(0)}%`}
          />
          <StatCard
            label="빈 배열"
            value={stats.empty}
            sublabel="해당 유형 없음"
          />
          <StatCard
            label="총 라벨 수"
            value={Object.values(stats.counts).reduce((a, b) => a + b, 0)}
            sublabel="다중 라벨 반영"
          />
        </div>
      </section>

      {/* 분류 분포 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">분류 분포</h2>
        <div className="space-y-3 max-w-2xl">
          {LABEL_ORDER.map((t) => {
            const count = stats.counts[t];
            const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
            const barWidth = stats.max > 0 ? (count / stats.max) * 100 : 0;
            return (
              <div key={t} className="flex items-center gap-3">
                <div className="w-28 text-sm font-medium">
                  <span className="mr-1">{LABELS[t].emoji}</span>
                  {LABELS[t].kr}
                </div>
                <div className="flex-1 h-7 bg-slate-100 rounded overflow-hidden">
                  <div
                    className={`h-full ${LABELS[t].bar} transition-all`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <div className="w-28 text-sm text-right tabular-nums">
                  <span className="font-semibold">{count}</span>
                  <span className="text-muted-foreground ml-1">
                    ({pct.toFixed(0)}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          ※ 다중 라벨 구조이므로 합계가 총 리뷰 수와 일치하지 않음
        </p>
      </section>

      {/* 주별 상위 주제 */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-semibold">주별 상위 주제</h2>
          <span className="text-xs text-muted-foreground">
            주별 LLM 호출로 top 5 주제 추출 · rating 제외
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {(
            weeklyThemesData as Array<{
              week: string;
              start: string;
              end: string;
              review_count: number;
              themes: Array<{
                theme: string;
                count: number;
                review_ids: string[];
              }>;
            }>
          ).map((w) => (
            <div
              key={w.week}
              className="border border-border rounded-lg p-3 bg-slate-50/30"
            >
              <div className="mb-2">
                <p className="text-sm font-semibold">{w.week}</p>
                <p className="text-xs text-muted-foreground">
                  {w.review_count}건
                </p>
              </div>
              <ol className="space-y-1">
                {w.themes.map((t, i) => {
                  const isActive =
                    themeFilter?.theme === t.theme &&
                    themeFilter?.category === null;
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => {
                          if (isActive) {
                            setThemeFilter(null);
                          } else {
                            setThemeFilter({
                              category: null,
                              theme: `${w.week} · ${t.theme}`,
                              reviewIds: new Set(t.review_ids),
                            });
                          }
                        }}
                        className={`w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                          isActive
                            ? "bg-foreground text-background"
                            : "hover:bg-slate-100"
                        }`}
                      >
                        <span className="tabular-nums text-xs text-muted-foreground mr-1.5">
                          {i + 1}.
                        </span>
                        <span className="font-medium">{t.theme}</span>
                        <span className="text-xs text-muted-foreground ml-1 tabular-nums">
                          ({t.count})
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* 범주별 주제 + 리뷰 탐색 (2열) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <section ref={themesRef} className="lg:col-span-2">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-semibold">범주별 주제</h2>
          <span className="text-xs text-muted-foreground">
            LLM이 범주 내 리뷰에서 공통 주제를 추출 · 평가(rating) 제외
          </span>
        </div>
        <div className="space-y-6">
          {(["bug_report", "feature_request", "user_experience"] as const).map(
            (cat) => {
              const themes =
                (
                  themesData as Record<
                    string,
                    Array<{
                      theme: string;
                      count: number;
                      review_ids?: string[];
                      examples: string[];
                    }>
                  >
                )[cat] ?? [];
              const catCount = stats.counts[cat];
              const l = LABELS[cat];
              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className={`${l.color} font-medium`}
                    >
                      {l.emoji} {l.kr}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      총 {catCount}건 · 주제 {themes.length}개
                    </span>
                  </div>
                  {themes.length === 0 ? (
                    <p className="text-sm text-muted-foreground pl-2">
                      추출된 주제 없음
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {themes.map((t, i) => {
                        const isActive =
                          themeFilter?.category === cat &&
                          themeFilter?.theme === t.theme;
                        const reviewIds = t.review_ids ?? [];
                        return (
                        <li
                          key={i}
                          className={`border rounded-lg overflow-hidden transition-colors ${
                            isActive
                              ? "border-foreground ring-1 ring-foreground"
                              : "border-border"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              if (isActive) {
                                setThemeFilter(null);
                              } else {
                                setThemeFilter({
                                  category: cat,
                                  theme: t.theme,
                                  reviewIds: new Set(reviewIds),
                                });
                              }
                            }}
                            className={`w-full flex items-center justify-between gap-4 px-4 py-3 text-left transition-colors ${
                              isActive
                                ? "bg-slate-100"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground tabular-nums w-6">
                                #{i + 1}
                              </span>
                              <span className="font-medium">{t.theme}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <span className="tabular-nums">
                                <span className="font-semibold">{t.count}</span>
                                <span className="text-muted-foreground ml-1">
                                  건
                                </span>
                              </span>
                              <span
                                className={`text-xs ${
                                  isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {isActive ? "선택됨" : "필터"}
                              </span>
                            </div>
                          </button>
                          <details className="group border-t border-border">
                            <summary className="px-4 py-2 cursor-pointer list-none text-xs text-muted-foreground hover:bg-slate-50 flex items-center justify-between">
                              <span>대표 리뷰 {t.examples.length}건 보기</span>
                              <span className="group-open:rotate-90 transition-transform">
                                ▶
                              </span>
                            </summary>
                            <div className="px-4 py-3 bg-slate-50 border-t border-border">
                              <ul className="space-y-2">
                                {t.examples.map((ex, j) => (
                                  <li
                                    key={j}
                                    className="text-sm leading-relaxed pl-3 border-l-2 border-slate-300"
                                  >
                                    {ex}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </details>
                        </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* 리뷰 탐색 */}
      <section
        className="lg:col-span-3 lg:flex lg:flex-col lg:min-h-0"
        style={themesHeight ? { maxHeight: themesHeight } : undefined}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">리뷰 탐색</h2>
          <span className="text-sm text-muted-foreground">
            {filtered.length}건
          </span>
        </div>

        {/* 필터 */}
        {themeFilter ? (
          <div className="flex items-center justify-between gap-3 mb-4 px-3 py-2 rounded-lg border border-foreground bg-slate-100">
            <div className="flex items-center gap-2 text-sm">
              {themeFilter.category && (
                <Badge
                  variant="outline"
                  className={`${LABELS[themeFilter.category].color} font-medium`}
                >
                  {LABELS[themeFilter.category].emoji}{" "}
                  {LABELS[themeFilter.category].kr}
                </Badge>
              )}
              <span className="text-muted-foreground">주제:</span>
              <span className="font-semibold">{themeFilter.theme}</span>
              <span className="text-muted-foreground tabular-nums">
                ({themeFilter.reviewIds.size}건)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setThemeFilter(null)}
              className="text-sm text-muted-foreground hover:text-foreground px-2 py-0.5 rounded hover:bg-slate-200"
            >
              × 해제
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              전체 ({stats.total})
            </FilterChip>
            {LABEL_ORDER.map((t) => (
              <FilterChip
                key={t}
                active={filter === t}
                onClick={() => setFilter(t)}
              >
                {LABELS[t].emoji} {LABELS[t].kr} ({stats.counts[t]})
              </FilterChip>
            ))}
          </div>
        )}

        {/* 리뷰 리스트 (2열 레이아웃 시 좌측 컬럼 높이에 맞춰 스크롤) */}
        <ul className="space-y-3 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-2 lg:border lg:border-border lg:rounded-lg lg:p-3 lg:bg-slate-50/30">
          {filtered.map((r, i) => (
            <li
              key={r.external_id}
              className="border border-border rounded-lg p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    #{i + 1}
                  </span>
                  {r.classification.types.length > 0 ? (
                    r.classification.types.map((t) => {
                      const l = LABELS[t as ReviewType];
                      if (!l) return null;
                      return (
                        <Badge
                          key={t}
                          variant="outline"
                          className={`${l.color} font-medium`}
                        >
                          {l.emoji} {l.kr}
                        </Badge>
                      );
                    })
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      (빈 배열)
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                  <span className="text-amber-500">
                    {"★".repeat(r.score ?? 0)}
                    <span className="text-slate-300">
                      {"☆".repeat(5 - (r.score ?? 0))}
                    </span>
                  </span>
                  <span>·</span>
                  <span className="tabular-nums">{r.posted_at.slice(0, 10)}</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {r.text}
              </p>
            </li>
          ))}
        </ul>
      </section>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: number;
  sublabel?: string;
}) {
  return (
    <div className="border border-border rounded-lg p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      {sublabel && (
        <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-background text-foreground border-border hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}
