import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { CRAWLERS, type RawReview } from "@/lib/crawlers";
import { classifyUnclassified } from "@/lib/classify";

// Vercel Cron 인증
function isAuthorized(req: Request): boolean {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // 로컬 테스트 허용
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getServiceClient();
  const results: Record<string, { new: number; error?: string }> = {};

  for (const [source, crawl] of Object.entries(CRAWLERS)) {
    // 크롤링 로그 시작
    const { data: log } = await db
      .from("crawl_logs")
      .insert({ source, status: "running" })
      .select("id")
      .single();

    try {
      const reviews: RawReview[] = await crawl();

      // upsert (external_id 기준 중복 무시)
      let newCount = 0;
      for (const review of reviews) {
        const { error } = await db.from("reviews").upsert(
          {
            source: review.source,
            external_id: review.external_id,
            author: review.author,
            score: review.score,
            text: review.text,
            posted_at: review.posted_at,
            app_version: review.app_version,
            thumbs_up: review.thumbs_up,
            extra: review.extra,
          },
          { onConflict: "source,external_id", ignoreDuplicates: true }
        );
        if (!error) newCount++;
      }

      // 로그 업데이트
      if (log?.id) {
        await db
          .from("crawl_logs")
          .update({
            finished_at: new Date().toISOString(),
            new_reviews: newCount,
            status: "success",
          })
          .eq("id", log.id);
      }

      results[source] = { new: newCount };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);

      if (log?.id) {
        await db
          .from("crawl_logs")
          .update({
            finished_at: new Date().toISOString(),
            status: "error",
            error_message: msg,
          })
          .eq("id", log.id);
      }

      results[source] = { new: 0, error: msg };
    }
  }

  // 2단계: 미분류 리뷰 AI 자동 분류
  let classified = 0;
  try {
    classified = await classifyUnclassified(50);
  } catch (err) {
    console.error("AI 분류 실패:", err);
  }

  return NextResponse.json({ ok: true, results, classified, timestamp: new Date().toISOString() });
}
