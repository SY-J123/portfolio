"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import sampleData from "@/data/classified.maalej.json";

type ReviewType = "bug_report" | "feature_request" | "user_experience" | "rating";

type Sentiment = "positive" | "negative" | "neutral";

interface ClassifiedReview {
  source: string;
  external_id: string;
  author: string;
  score: number | null;
  text: string;
  posted_at: string;
  app_version: string | null;
  classification: { types: string[]; sentiment?: Sentiment };
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
    kr: "단순 소감",
    emoji: "💬",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    bar: "bg-amber-400",
  },
};

const SOURCES: Array<{ key: string; label: string }> = [
  { key: "google_play", label: "구글 플레이" },
  { key: "app_store", label: "앱스토어 iOS" },
];

const SENTIMENTS: Array<{ key: Sentiment; label: string; color: string }> = [
  { key: "positive", label: "긍정", color: "text-emerald-600" },
  { key: "neutral", label: "중립", color: "text-slate-500" },
  { key: "negative", label: "부정", color: "text-red-600" },
];

const TYPE_TABS: Array<{ key: ReviewType | "all"; label: string }> = [
  { key: "all", label: "전체" },
  { key: "bug_report", label: "버그" },
  { key: "feature_request", label: "요청" },
  { key: "user_experience", label: "UX" },
  { key: "rating", label: "소감" },
];

const PAGE_SIZE = 30;

export default function TabVocFeed() {
  const reviews = sampleData as ClassifiedReview[];

  const [sources, setSources] = useState<Set<string>>(
    () => new Set(SOURCES.map((s) => s.key))
  );
  const [sentiments, setSentiments] = useState<Set<Sentiment>>(
    () => new Set(SENTIMENTS.map((s) => s.key))
  );
  const [typeFilter, setTypeFilter] = useState<ReviewType | "all">("all");
  const [query, setQuery] = useState("");
  const [sortNewest, setSortNewest] = useState(true);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const baseFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reviews.filter((r) => {
      if (!sources.has(r.source)) return false;
      const s = r.classification.sentiment;
      if (!s || !sentiments.has(s)) return false;
      if (q && !r.text.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [reviews, sources, sentiments, query]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: baseFiltered.length };
    for (const k of ["bug_report", "feature_request", "user_experience", "rating"]) {
      counts[k] = 0;
    }
    for (const r of baseFiltered) {
      for (const t of r.classification.types) {
        if (t in counts) counts[t]++;
      }
    }
    return counts;
  }, [baseFiltered]);

  const filteredReviews = useMemo(() => {
    const arr =
      typeFilter === "all"
        ? baseFiltered
        : baseFiltered.filter((r) =>
            r.classification.types.includes(typeFilter)
          );
    return [...arr].sort((a, b) =>
      sortNewest
        ? b.posted_at.localeCompare(a.posted_at)
        : a.posted_at.localeCompare(b.posted_at)
    );
  }, [baseFiltered, typeFilter, sortNewest]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [sources, sentiments, typeFilter, query, sortNewest]);

  return (
    <div className="max-w-[1440px] mx-auto py-10 px-6 space-y-10">
      <header>
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
          VOC Feed
        </p>
        <h1 className="text-3xl font-bold tracking-tight leading-tight">
          VOC 피드
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          출처·감성·범주로 필터링하여 원문 리뷰를 탐색할 수 있습니다.
        </p>
      </header>

      <Separator />

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-semibold">리뷰 피드</h2>
          <span className="text-xs text-muted-foreground tabular-nums">
            총 {baseFiltered.length.toLocaleString()}건
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
          <aside className="space-y-6">
            <FilterGroup title="출처">
              <CheckItem
                label="전체"
                checked={sources.size === SOURCES.length}
                onChange={() =>
                  setSources(
                    sources.size === SOURCES.length
                      ? new Set()
                      : new Set(SOURCES.map((s) => s.key))
                  )
                }
              />
              {SOURCES.map((s) => (
                <CheckItem
                  key={s.key}
                  label={s.label}
                  checked={sources.has(s.key)}
                  onChange={() => {
                    const next = new Set(sources);
                    if (next.has(s.key)) next.delete(s.key);
                    else next.add(s.key);
                    setSources(next);
                  }}
                />
              ))}
            </FilterGroup>
            <FilterGroup title="감성">
              {SENTIMENTS.map((s) => (
                <CheckItem
                  key={s.key}
                  label={s.label}
                  labelClass={s.color}
                  checked={sentiments.has(s.key)}
                  onChange={() => {
                    const next = new Set(sentiments);
                    if (next.has(s.key)) next.delete(s.key);
                    else next.add(s.key);
                    setSentiments(next);
                  }}
                />
              ))}
            </FilterGroup>
          </aside>

          <div className="min-w-0 space-y-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="원문 검색..."
              className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
                {TYPE_TABS.map((tab) => {
                  const isActive = typeFilter === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setTypeFilter(tab.key)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive
                          ? "bg-background shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                      <span className="ml-1.5 text-xs tabular-nums text-muted-foreground">
                        {typeCounts[tab.key] ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="inline-flex items-center gap-1 shrink-0">
                <Button
                  variant={sortNewest ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortNewest(true)}
                >
                  최신순
                </Button>
                <Button
                  variant={!sortNewest ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortNewest(false)}
                >
                  오래된순
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredReviews.length === 0 ? (
                <p className="text-sm text-muted-foreground py-12 text-center">
                  조건에 맞는 리뷰가 없습니다.
                </p>
              ) : (
                filteredReviews
                  .slice(0, visible)
                  .map((r) => <ReviewCard key={r.external_id} review={r} />)
              )}
            </div>

            {visible < filteredReviews.length && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                >
                  더 보기 ({filteredReviews.length - visible}건 남음)
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {title}
      </p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function CheckItem({
  label,
  checked,
  onChange,
  labelClass,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  labelClass?: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 text-foreground focus:ring-2 focus:ring-ring"
      />
      <span className={labelClass ?? ""}>{label}</span>
    </label>
  );
}

function ReviewCard({ review }: { review: ClassifiedReview }) {
  const sourceLabel =
    SOURCES.find((s) => s.key === review.source)?.label ?? review.source;
  const sent = review.classification.sentiment;
  const sentMeta = sent ? SENTIMENTS.find((s) => s.key === sent) : null;
  return (
    <article className="border border-border rounded-lg p-4 bg-background">
      <div className="flex items-start justify-between gap-3 mb-2">
        <Badge
          variant="outline"
          className="text-[11px] font-medium text-muted-foreground bg-slate-50"
        >
          {sourceLabel}
        </Badge>
        <span className="text-[11px] text-muted-foreground tabular-nums shrink-0">
          {review.posted_at.slice(0, 10)}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap mb-3">
        {review.text}
      </p>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex flex-wrap items-center gap-1.5">
          {review.classification.types.length > 0 ? (
            review.classification.types.map((t) => {
              const l = LABELS[t as ReviewType];
              if (!l) return null;
              return (
                <Badge
                  key={t}
                  variant="outline"
                  className={`${l.color} text-[11px] px-1.5 py-0`}
                >
                  {l.emoji} {l.kr}
                </Badge>
              );
            })
          ) : (
            <Badge variant="outline" className="text-[11px] text-muted-foreground">
              미분류
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground shrink-0">
          {typeof review.score === "number" && (
            <span className="text-amber-500">
              {"★".repeat(review.score)}
              <span className="text-slate-300">
                {"☆".repeat(5 - review.score)}
              </span>
            </span>
          )}
          {sentMeta && (
            <>
              <span>·</span>
              <span className={`font-medium ${sentMeta.color}`}>
                {sentMeta.label}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
