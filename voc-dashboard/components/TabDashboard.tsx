"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Separator } from "@/components/ui/separator";
import sampleData from "@/data/classified.maalej.json";
import weeklyThemesData from "@/data/weekly-themes.json";

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

type ThemeCategory = "bug_report" | "feature_request" | "user_experience";
const THEME_CATEGORIES: ThemeCategory[] = [
  "bug_report",
  "feature_request",
  "user_experience",
];

interface WeeklyTheme {
  theme: string;
  count: number;
  review_ids: string[];
}

interface CategoryBucket {
  review_count: number;
  themes: WeeklyTheme[];
}

interface WeeklyThemeData {
  week: string;
  start: string;
  end: string;
  review_count: number;
  by_category: Record<ThemeCategory, CategoryBucket>;
}


export default function TabDashboard() {
  const reviews = sampleData as ClassifiedReview[];

  const WEEKS = useMemo(
    () => [
      { label: "이번 주", sub: "4/5–11", start: "2026-04-05T00:00:00.000Z", end: "2026-04-12T00:00:00.000Z" },
      { label: "1주 전", sub: "3/29–4/4", start: "2026-03-29T00:00:00.000Z", end: "2026-04-05T00:00:00.000Z" },
      { label: "2주 전", sub: "3/22–28", start: "2026-03-22T00:00:00.000Z", end: "2026-03-29T00:00:00.000Z" },
      { label: "3주 전", sub: "3/15–21", start: "2026-03-15T00:00:00.000Z", end: "2026-03-22T00:00:00.000Z" },
      { label: "4주 전", sub: "3/8–14", start: "2026-03-08T00:00:00.000Z", end: "2026-03-15T00:00:00.000Z" },
      { label: "5주 전", sub: "3/1–7", start: "2026-03-01T00:00:00.000Z", end: "2026-03-08T00:00:00.000Z" },
    ],
    []
  );

  const sentByCategoryWeek = useMemo(() => {
    const rows: Array<{ key: "all" | ReviewType; label: string }> = [
      { key: "all", label: "전체" },
      { key: "bug_report", label: "버그" },
      { key: "feature_request", label: "요청" },
      { key: "user_experience", label: "UX" },
      { key: "rating", label: "소감" },
    ];
    return rows.map(({ key, label }) => ({
      key,
      label,
      weeks: WEEKS.map((w) => {
        const inWeek = reviews.filter(
          (r) => r.posted_at >= w.start && r.posted_at < w.end
        );
        const subset =
          key === "all"
            ? inWeek
            : inWeek.filter((r) => r.classification.types.includes(key));
        const sent = { positive: 0, negative: 0, neutral: 0 };
        for (const r of subset) {
          const s = r.classification.sentiment;
          if (s && s in sent) sent[s]++;
        }
        const sentTotal = sent.positive + sent.negative + sent.neutral;
        return {
          weekLabel: w.label,
          weekSub: w.sub,
          count: subset.length,
          negPct: sentTotal > 0 ? (sent.negative / sentTotal) * 100 : 0,
          neuPct: sentTotal > 0 ? (sent.neutral / sentTotal) * 100 : 0,
          posPct: sentTotal > 0 ? (sent.positive / sentTotal) * 100 : 0,
        };
      }),
    }));
  }, [reviews, WEEKS]);

  const stats = useMemo(() => {
    const counts: Record<ReviewType, number> = {
      bug_report: 0,
      feature_request: 0,
      user_experience: 0,
      rating: 0,
    };
    const sentCounts = { positive: 0, negative: 0, neutral: 0 };
    let scoreSum = 0;
    let scoreCount = 0;
    const LAST_WEEK_START = "2026-04-05T00:00:00.000Z";
    const LAST_WEEK_END = "2026-04-12T00:00:00.000Z";
    const PREV_WEEK_START = "2026-03-29T00:00:00.000Z";
    const PREV_WEEK_END = "2026-04-05T00:00:00.000Z";
    let lastWeekSum = 0,
      lastWeekCount = 0,
      prevWeekSum = 0,
      prevWeekCount = 0;
    for (const r of reviews) {
      for (const t of r.classification.types) {
        if (t in counts) counts[t as ReviewType]++;
      }
      const s = r.classification.sentiment;
      if (s && s in sentCounts) sentCounts[s]++;
      if (typeof r.score === "number") {
        scoreSum += r.score;
        scoreCount++;
        if (r.posted_at >= LAST_WEEK_START && r.posted_at < LAST_WEEK_END) {
          lastWeekSum += r.score;
          lastWeekCount++;
        } else if (
          r.posted_at >= PREV_WEEK_START &&
          r.posted_at < PREV_WEEK_END
        ) {
          prevWeekSum += r.score;
          prevWeekCount++;
        }
      }
    }
    const max = Math.max(...Object.values(counts));
    const avgScore = scoreCount > 0 ? scoreSum / scoreCount : 0;
    const lastWeekAvg = lastWeekCount > 0 ? lastWeekSum / lastWeekCount : null;
    const prevWeekAvg = prevWeekCount > 0 ? prevWeekSum / prevWeekCount : null;
    const weekDelta =
      lastWeekAvg !== null && prevWeekAvg !== null
        ? lastWeekAvg - prevWeekAvg
        : null;
    return {
      counts,
      max,
      total: reviews.length,
      sentCounts,
      avgScore,
      lastWeekAvg,
      lastWeekCount,
      weekDelta,
    };
  }, [reviews]);

  const weekReport = useMemo(() => {
    const weekly = weeklyThemesData as WeeklyThemeData[];
    const latest = [...weekly].sort((a, b) => b.start.localeCompare(a.start))[0];
    const allRow = sentByCategoryWeek.find((r) => r.key === "all");
    const latestSent = allRow?.weeks[0];

    const flat: Array<WeeklyTheme & { category: ThemeCategory }> = [];
    if (latest) {
      for (const cat of THEME_CATEGORIES) {
        const bucket = latest.by_category?.[cat];
        if (bucket) {
          for (const t of bucket.themes) {
            flat.push({ ...t, category: cat });
          }
        }
      }
    }
    const sorted = flat.sort((a, b) => b.count - a.count);
    const topTheme = sorted[0] ?? null;
    const topIssues = sorted.slice(0, 3);
    return { latest, latestSent, topTheme, topIssues };
  }, [sentByCategoryWeek]);

  const categoryReports = useMemo(() => {
    const weekly = weeklyThemesData as WeeklyThemeData[];
    const sortedWeekly = [...weekly].sort((a, b) =>
      b.start.localeCompare(a.start)
    );
    const latestWeekly = sortedWeekly[0] ?? null;
    const prior3Weekly = sortedWeekly.slice(1, 4);

    const priorByCategory: Record<ThemeCategory, Set<string>> = {
      bug_report: new Set(),
      feature_request: new Set(),
      user_experience: new Set(),
    };
    for (const w of prior3Weekly) {
      for (const cat of THEME_CATEGORIES) {
        const bucket = w.by_category?.[cat];
        if (bucket) {
          for (const t of bucket.themes) priorByCategory[cat].add(t.theme);
        }
      }
    }

    const thisWeek = WEEKS[0];
    const prevWeek = WEEKS[1] ?? null;
    const catCount = (week: typeof WEEKS[number], cat: ReviewType) =>
      reviews.filter(
        (r) =>
          r.posted_at >= week.start &&
          r.posted_at < week.end &&
          r.classification.types.includes(cat)
      ).length;

    return THEME_CATEGORIES.map((cat) => {
      const thisWeekCount = catCount(thisWeek, cat);
      const prevWeekCount = prevWeek ? catCount(prevWeek, cat) : null;
      const delta =
        prevWeekCount !== null ? thisWeekCount - prevWeekCount : null;
      const bucket = latestWeekly?.by_category?.[cat];
      const themes = bucket
        ? [...bucket.themes]
            .map((t) => ({
              theme: t.theme,
              count: t.count,
              isNew: !priorByCategory[cat].has(t.theme),
            }))
            .sort((a, b) => b.count - a.count)
        : [];
      return {
        cat,
        thisWeekCount,
        delta,
        top: themes.slice(0, 5),
        newThemes: themes.filter((t) => t.isNew).slice(0, 2),
      };
    });
  }, [reviews, WEEKS]);

  const negCountByWeek = useMemo(() => {
    const last4 = WEEKS.slice(0, 4).reverse();
    return last4.map((w) => {
      const inWeek = reviews.filter(
        (r) => r.posted_at >= w.start && r.posted_at < w.end
      );
      const countNeg = (cat: ReviewType) =>
        inWeek.filter(
          (r) =>
            r.classification.types.includes(cat) &&
            r.classification.sentiment === "negative"
        ).length;
      return {
        label: w.label,
        sub: w.sub,
        bug_report: countNeg("bug_report"),
        feature_request: countNeg("feature_request"),
        user_experience: countNeg("user_experience"),
      };
    });
  }, [reviews, WEEKS]);

  return (
    <div className="max-w-[1440px] mx-auto py-10 px-6 space-y-10">
      <header>
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
          Weekly Summary
        </p>
        <h1 className="text-3xl font-bold tracking-tight leading-tight">
          이번 주 요약
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Google Play · Apple App Store · 2026년 3월 1일 ~ 4월 11일 · 전체{" "}
          {stats.total}건 ·{" "}
          <code className="px-1 py-0.5 rounded bg-slate-100 text-xs font-mono">
            claude-haiku-4-5
          </code>
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-lg font-semibold mb-4">요약</h2>
        <SummaryTopStrip
          periodSub={weekReport.latest?.week ?? null}
          count={weekReport.latestSent?.count ?? 0}
          negPct={weekReport.latestSent?.negPct ?? null}
          posPct={weekReport.latestSent?.posPct ?? null}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          <RatingCard
            avg={stats.lastWeekAvg ?? stats.avgScore}
            overallAvg={stats.avgScore}
            delta={stats.weekDelta}
          />
          <PatternCard
            topTheme={weekReport.topTheme}
            weekLabel={weekReport.latest?.week ?? null}
            avgScore={stats.lastWeekAvg}
            delta={stats.weekDelta}
            negPct={weekReport.latestSent?.negPct ?? null}
          />
          <TopIssuesCard issues={weekReport.topIssues} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">범주별 요약</h2>
        <CategoryReportCard reports={categoryReports} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">감정 분포 추이</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <NegCountTrendLine data={negCountByWeek} />
          <SentimentTrendArea data={sentByCategoryWeek} />
        </div>
      </section>
    </div>
  );
}

function stripWeekPrefix(week: string): string {
  const m = week.match(/\(([^)]+)\)/);
  return m ? m[1] : week;
}

function SummaryTopStrip({
  periodSub,
  count,
  negPct,
  posPct,
}: {
  periodSub: string | null;
  count: number;
  negPct: number | null;
  posPct: number | null;
}) {
  const sub = periodSub ? stripWeekPrefix(periodSub) : "—";
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground border-b border-border pb-3 mb-4">
      <span>
        이번 주{" "}
        <span className="text-emerald-600 font-medium tabular-nums">{sub}</span>
      </span>
      <span className="text-slate-300">|</span>
      <span>
        수집 VOC{" "}
        <span className="text-foreground font-medium tabular-nums">
          {count}건
        </span>
      </span>
      {negPct !== null && (
        <>
          <span className="text-slate-300">|</span>
          <span>
            부정 반응{" "}
            <span className="text-red-600 font-medium tabular-nums">
              {negPct.toFixed(0)}%
            </span>
          </span>
        </>
      )}
      {posPct !== null && (
        <>
          <span className="text-slate-300">|</span>
          <span>
            긍정 반응{" "}
            <span className="text-emerald-600 font-medium tabular-nums">
              {posPct.toFixed(0)}%
            </span>
          </span>
        </>
      )}
    </div>
  );
}

function PatternCard({
  topTheme,
  weekLabel,
  avgScore,
  delta,
  negPct,
}: {
  topTheme: WeeklyTheme | null;
  weekLabel: string | null;
  avgScore: number | null;
  delta: number | null;
  negPct: number | null;
}) {
  const label = weekLabel ? stripWeekPrefix(weekLabel) : "최근 주";
  const deltaText =
    delta === null
      ? ""
      : delta > 0
      ? `전주 대비 별점 ${delta.toFixed(2)}점 상승`
      : delta < 0
      ? `전주 대비 별점 ${Math.abs(delta).toFixed(2)}점 하락`
      : "전주와 동일한 수준";
  return (
    <div className="border border-border rounded-lg p-5 h-full flex flex-col">
      <p className="text-xs text-muted-foreground mb-3">이번 주 리포트</p>
      {topTheme ? (
        <h3 className="text-lg font-bold leading-snug mb-3">
          {topTheme.theme}
        </h3>
      ) : (
        <h3 className="text-lg font-bold leading-snug mb-3 text-muted-foreground">
          대표 주제 없음
        </h3>
      )}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {topTheme
          ? `${label} 기간 "${topTheme.theme}" ${topTheme.count}건이 집중되었으며`
          : `${label} 기간 대표 이슈가 추출되지 않았으며`}
        {negPct !== null ? `, 부정 비중은 ${negPct.toFixed(0)}%` : ""}
        {avgScore !== null
          ? `, 평균 별점은 ${avgScore.toFixed(2)}점으로 ${deltaText}`
          : ""}
        .
      </p>
    </div>
  );
}

function TopIssuesCard({
  issues,
}: {
  issues: Array<{
    theme: string;
    count: number;
    category: ThemeCategory | null;
  }>;
}) {
  return (
    <div className="border border-border rounded-lg p-5 h-full flex flex-col">
      <p className="text-xs text-muted-foreground mb-3">주요 이슈</p>
      {issues.length === 0 ? (
        <p className="text-sm text-muted-foreground">추출된 이슈 없음</p>
      ) : (
        <ul className="space-y-2.5">
          {issues.map((it, i) => {
            const l = it.category ? LABELS[it.category] : null;
            return (
              <li key={i} className="flex items-center gap-2.5">
                {l ? (
                  <span
                    className={`text-[10px] leading-none px-1.5 py-1 rounded border shrink-0 font-medium ${l.color}`}
                  >
                    {l.kr}
                  </span>
                ) : (
                  <span className="text-[10px] leading-none px-1.5 py-1 rounded border shrink-0 text-muted-foreground bg-slate-50 border-slate-200">
                    미분류
                  </span>
                )}
                <span className="flex-1 min-w-0 text-sm font-medium truncate">
                  {it.theme}
                </span>
                <span className="text-sm tabular-nums shrink-0">
                  <span className="font-semibold">{it.count}</span>
                  <span className="text-muted-foreground ml-0.5">건</span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

interface CategoryReport {
  cat: ThemeCategory;
  thisWeekCount: number;
  delta: number | null;
  top: Array<{ theme: string; count: number; isNew: boolean }>;
  newThemes: Array<{ theme: string; count: number; isNew: boolean }>;
}

function buildCategoryNarrative(r: CategoryReport): string {
  if (r.thisWeekCount === 0) {
    return "이번 주 해당 범주에서 집중된 주제가 없었다.";
  }

  if (r.newThemes.length > 0 && r.top.length > r.newThemes.length) {
    const n = r.newThemes[0];
    const persisting = r.top.find((t) => !t.isNew);
    if (persisting) {
      return `"${persisting.theme}"(${persisting.count}건)이 최근 3주에 이어 지속되는 가운데, 이번 주 "${n.theme}"(${n.count}건)이 신규 주제로 부상했다.`;
    }
  }

  if (r.newThemes.length > 0) {
    const n = r.newThemes[0];
    return `이번 주 "${n.theme}"(${n.count}건)이 최근 3주간 없던 신규 주제로 새로 부상했다.`;
  }

  if (r.top.length >= 2) {
    const t1 = r.top[0];
    const t2 = r.top[1];
    return `"${t1.theme}"(${t1.count}건), "${t2.theme}"(${t2.count}건) 등 기존 이슈가 이번 주에도 주요 주제로 이어졌다.`;
  }

  if (r.top.length === 1) {
    return `"${r.top[0].theme}"(${r.top[0].count}건)이 단일 주요 이슈로 관찰됐다.`;
  }

  return "이번 주 해당 범주에서 집중된 주제가 없었다.";
}

function CategoryReportCard({ reports }: { reports: CategoryReport[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {reports.map((r) => (
        <CategoryReportColumn key={r.cat} report={r} />
      ))}
    </div>
  );
}

function CategoryReportColumn({ report }: { report: CategoryReport }) {
  const l = LABELS[report.cat];
  const { delta } = report;
  const deltaSign = delta === null ? "" : delta > 0 ? "▲" : delta < 0 ? "▼" : "–";
  const deltaColor =
    delta === null
      ? "text-muted-foreground"
      : delta > 0
      ? "text-red-600"
      : delta < 0
      ? "text-emerald-600"
      : "text-muted-foreground";
  const narrative = buildCategoryNarrative(report);
  return (
    <div className="border border-border rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-sm font-semibold">
          <span className="mr-1">{l.emoji}</span>
          {l.kr}
        </p>
        <span className="text-sm tabular-nums">
          <span className="font-bold">{report.thisWeekCount}</span>
          <span className="text-xs text-muted-foreground ml-1">건</span>
          {delta !== null && (
            <span className={`ml-2 text-xs ${deltaColor}`}>
              {deltaSign} {Math.abs(delta)}
            </span>
          )}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-foreground mb-3 flex-1">
        {narrative}
      </p>
      {report.top.length > 0 && (
        <ol className="space-y-1 pt-3 border-t border-border">
          {report.top.map((t, i) => (
            <li
              key={t.theme}
              className="flex items-center gap-2 text-xs"
            >
              <span className="text-muted-foreground tabular-nums w-4 shrink-0">
                {i + 1}
              </span>
              <span className="flex-1 min-w-0 truncate">
                {t.theme}
                {t.isNew && (
                  <span className="ml-1.5 text-[9px] leading-none px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    신규
                  </span>
                )}
              </span>
              <span className="tabular-nums shrink-0">
                <span className="font-semibold">{t.count}</span>
                <span className="text-muted-foreground ml-0.5">건</span>
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

interface CategoryWeekSent {
  weekLabel: string;
  weekSub: string;
  count: number;
  negPct: number;
  neuPct: number;
  posPct: number;
}

interface CategoryRow {
  key: string;
  label: string;
  weeks: CategoryWeekSent[];
}

const TIER_CLASSES = [
  "bg-red-50 text-red-700",
  "bg-red-100 text-red-800",
  "bg-red-200 text-red-900",
  "bg-red-300 text-red-900",
  "bg-red-400 text-white",
  "bg-red-500 text-white",
];

interface NegCountPoint {
  label: string;
  sub: string;
  bug_report: number;
  feature_request: number;
  user_experience: number;
}

function NegCountTrendLine({ data }: { data: NegCountPoint[] }) {
  return (
    <div className="border border-border rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-sm font-semibold">범주별 부정 리뷰 추이</p>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-sm bg-red-400" />
            버그
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-sm bg-violet-400" />
            요청
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-sm bg-blue-400" />
            UX
          </span>
        </div>
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#64748b" }}
              interval={0}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              width={32}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 6,
                border: "1px solid #e5e7eb",
              }}
              labelFormatter={(l, p) => {
                const pt = p?.[0]?.payload as NegCountPoint | undefined;
                return pt ? `${pt.label} (${pt.sub})` : l;
              }}
              formatter={(v, name) => {
                const labelMap: Record<string, string> = {
                  bug_report: "버그",
                  feature_request: "요청",
                  user_experience: "UX",
                };
                const key = typeof name === "string" ? name : String(name);
                return [v, labelMap[key] ?? key];
              }}
            />
            <Line
              type="monotone"
              dataKey="bug_report"
              stroke="#f87171"
              strokeWidth={2}
              dot={{ r: 3, fill: "#f87171" }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="feature_request"
              stroke="#a78bfa"
              strokeWidth={2}
              dot={{ r: 3, fill: "#a78bfa" }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="user_experience"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ r: 3, fill: "#60a5fa" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SentimentTrendArea({ data }: { data: CategoryRow[] }) {
  const xWeeks = data[0]?.weeks ?? [];

  const sortedPcts = useMemo(() => {
    return data
      .flatMap((cat) =>
        cat.weeks.filter((w) => w.count > 0).map((w) => w.negPct)
      )
      .sort((a, b) => a - b);
  }, [data]);

  const pctRange = sortedPcts.length
    ? {
        min: sortedPcts[0],
        max: sortedPcts[sortedPcts.length - 1],
      }
    : null;

  function tierClass(pct: number): string {
    if (sortedPcts.length === 0) return TIER_CLASSES[0];
    let lo = 0;
    let hi = sortedPcts.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (sortedPcts[mid] < pct) lo = mid + 1;
      else hi = mid;
    }
    const tier = Math.min(
      TIER_CLASSES.length - 1,
      Math.floor((lo / sortedPcts.length) * TIER_CLASSES.length)
    );
    return TIER_CLASSES[tier];
  }
  return (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-sm font-semibold">부정 비중 추이 (범주 × 주)</p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="tabular-nums">
            {pctRange ? `${pctRange.min.toFixed(0)}%` : "낮음"}
          </span>
          <div className="flex">
            {TIER_CLASSES.map((c, i) => (
              <div key={i} className={`w-3 h-3 ${c.split(" ")[0]}`} />
            ))}
          </div>
          <span className="tabular-nums">
            {pctRange ? `${pctRange.max.toFixed(0)}%` : "높음"}
          </span>
        </div>
      </div>
      <div className="space-y-0.5">
        {data.map((cat) => (
          <div key={cat.key} className="flex items-center gap-2">
            <p
              className={`w-12 text-xs shrink-0 truncate ${
                cat.key === "all"
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {cat.label}
            </p>
            <div className="flex-1 grid grid-cols-6 gap-0.5">
              {cat.weeks.map((w) => {
                const empty = w.count === 0;
                const cellClass = empty
                  ? "bg-slate-100 text-muted-foreground"
                  : tierClass(w.negPct);
                const tooltip = empty
                  ? `${cat.label} · ${w.weekLabel} (${w.weekSub}) · 0건`
                  : `${cat.label} · ${w.weekLabel} (${w.weekSub}) · ${w.count}건\n부정 ${w.negPct.toFixed(0)}% · 중립 ${w.neuPct.toFixed(0)}% · 긍정 ${w.posPct.toFixed(0)}%`;
                return (
                  <div
                    key={w.weekLabel}
                    className={`h-8 rounded-sm flex items-center justify-center text-[11px] font-medium tabular-nums ${cellClass}`}
                    title={tooltip}
                  >
                    {empty ? "—" : `${w.negPct.toFixed(0)}`}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-12 shrink-0" />
        <div className="flex-1 grid grid-cols-6 gap-0.5">
          {xWeeks.map((w) => (
            <p
              key={w.weekLabel}
              className="text-[10px] text-center text-muted-foreground tabular-nums"
            >
              {w.weekLabel}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function RatingCard({
  avg,
  overallAvg,
  delta,
}: {
  avg: number;
  overallAvg: number;
  delta: number | null;
}) {
  const deltaSign = delta === null ? "" : delta > 0 ? "▲" : delta < 0 ? "▼" : "–";
  const deltaColor =
    delta === null
      ? "text-muted-foreground"
      : delta > 0
      ? "text-emerald-600"
      : delta < 0
      ? "text-red-600"
      : "text-muted-foreground";
  return (
    <div className="border border-border rounded-lg p-5 h-full flex flex-col">
      <p className="text-xs text-muted-foreground mb-3">평균 별점</p>
      <p className="text-4xl font-bold tabular-nums leading-none">
        {avg.toFixed(2)}
        <span className="text-lg font-normal text-muted-foreground ml-1">
          / 5
        </span>
      </p>
      <p className="text-xs text-muted-foreground mt-auto pt-4">
        전체 평균{" "}
        <span className="tabular-nums">{overallAvg.toFixed(2)}</span> 기준
        {delta !== null && (
          <span className={`ml-2 tabular-nums font-medium ${deltaColor}`}>
            {deltaSign} {Math.abs(delta).toFixed(2)}
          </span>
        )}
      </p>
    </div>
  );
}
