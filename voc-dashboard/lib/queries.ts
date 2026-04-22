import { supabase } from "./supabase";

type SourceFilter = string | null; // null = 전체

function applySource(query: ReturnType<typeof supabase.from>, source: SourceFilter) {
  if (!source) return query;
  return query.eq("source", source);
}

// 전체 통계
export async function getOverallStats(source: SourceFilter = null) {
  let query = supabase.from("reviews").select("score_reality, sentiment, categories, posted_at, score");
  query = applySource(query, source);
  const { data, error } = await query;

  if (error || !data || data.length === 0) return null;

  const total = data.length;
  const avgScore = data.reduce((s, r) => s + (Number(r.score_reality) || 0), 0) / total;
  const negative = data.filter((r) => r.sentiment === "부정" || r.sentiment === "매우 부정").length;

  return { total, avgScore: Math.round(avgScore * 10) / 10, negative };
}

// 카테고리별 통계
export async function getCategoryStats(source: SourceFilter = null) {
  let query = supabase.from("reviews").select("score_reality, sentiment, categories, posted_at");
  query = applySource(query, source);
  const { data, error } = await query;

  if (error || !data) return [];

  const cats = ["전략", "UX", "운영", "기술"] as const;

  return cats.map((cat) => {
    const filtered = data.filter((r) => r.categories && (r.categories as string[]).includes(cat));
    const count = filtered.length;
    if (count === 0) return { name: cat, score: 0, count: 0, negative: 0 };

    const avg = filtered.reduce((s, r) => s + (Number(r.score_reality) || 0), 0) / count;
    const neg = filtered.filter((r) => r.sentiment === "부정" || r.sentiment === "매우 부정").length;

    return { name: cat, score: Math.round(avg * 10) / 10, count, negative: neg };
  });
}

// 월별 추이
export async function getMonthlyTrend(source: SourceFilter = null) {
  let query = supabase.from("reviews").select("score_reality, categories, posted_at").order("posted_at", { ascending: true });
  query = applySource(query, source);
  const { data, error } = await query;

  if (error || !data) return [];

  const cats = ["전략", "UX", "운영", "기술"] as const;
  const months: Record<string, Record<string, { sum: number; count: number }>> = {};

  for (const r of data) {
    if (!r.posted_at) continue;
    const month = r.posted_at.slice(0, 7);
    if (!months[month]) {
      months[month] = {};
      for (const c of cats) months[month][c] = { sum: 0, count: 0 };
      months[month]["전체"] = { sum: 0, count: 0 };
    }

    const score = Number(r.score_reality) || 0;
    months[month]["전체"].sum += score;
    months[month]["전체"].count += 1;

    if (r.categories) {
      for (const c of r.categories as string[]) {
        if (months[month][c]) {
          months[month][c].sum += score;
          months[month][c].count += 1;
        }
      }
    }
  }

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, catData]) => {
      const entry: Record<string, number | string> = { month };
      for (const [cat, { sum, count }] of Object.entries(catData)) {
        entry[cat] = count > 0 ? Math.round((sum / count) * 10) / 10 : 0;
      }
      return entry;
    });
}

// 부정 VOC
export async function getTopIssues(source: SourceFilter = null) {
  let query = supabase
    .from("reviews")
    .select("text, score_reality, sentiment, categories, source")
    .or("sentiment.eq.부정,sentiment.eq.매우 부정")
    .order("score_reality", { ascending: true })
    .limit(50);
  query = applySource(query, source);
  const { data, error } = await query;
  if (error || !data) return [];
  return data;
}

// VoC 피드
export async function getReviews(filters?: {
  source?: string;
  category?: string;
  sentiment?: string;
  limit?: number;
  offset?: number;
}) {
  let query = supabase.from("reviews").select("*").order("posted_at", { ascending: false });

  if (filters?.source && filters.source !== "전체") {
    query = query.eq("source", filters.source);
  }
  if (filters?.category && filters.category !== "전체") {
    query = query.contains("categories", [filters.category]);
  }
  if (filters?.sentiment && filters.sentiment !== "전체") {
    if (filters.sentiment === "긍정") {
      query = query.in("sentiment", ["긍정", "매우 긍정"]);
    } else if (filters.sentiment === "부정") {
      query = query.in("sentiment", ["부정", "매우 부정"]);
    }
  }

  query = query.range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 30) - 1);

  const { data, error } = await query;
  if (error) return [];
  return data;
}

// 소스별 건수
export async function getSourceCounts() {
  const { data, error } = await supabase.from("reviews").select("source");
  if (error || !data) return {};

  const counts: Record<string, number> = {};
  for (const r of data) {
    counts[r.source] = (counts[r.source] || 0) + 1;
  }
  return counts;
}

// 리뷰 총 건수
export async function getReviewCount() {
  const { count, error } = await supabase.from("reviews").select("*", { count: "exact", head: true });
  if (error) return 0;
  return count || 0;
}

// 수집된 리뷰의 작성일 범위 (posted_at min/max)
export async function getDateRange(): Promise<{ from: string | null; to: string | null }> {
  const [oldestRes, newestRes] = await Promise.all([
    supabase.from("reviews").select("posted_at").not("posted_at", "is", null).order("posted_at", { ascending: true }).limit(1).maybeSingle(),
    supabase.from("reviews").select("posted_at").not("posted_at", "is", null).order("posted_at", { ascending: false }).limit(1).maybeSingle(),
  ]);
  return {
    from: oldestRes.data?.posted_at ?? null,
    to: newestRes.data?.posted_at ?? null,
  };
}
