import gplay from "google-play-scraper";

export interface RawReview {
  source: string;
  external_id: string;
  author: string;
  score: number | null;
  text: string;
  posted_at: string;
  app_version: string | null;
  thumbs_up: number;
  extra: Record<string, unknown>;
}

const APP_ID = "viva.republica.toss"; // 토스 Android

export async function crawlGooglePlay(count = 200): Promise<RawReview[]> {
  const results = await gplay.reviews({
    appId: APP_ID,
    lang: "ko",
    country: "kr",
    sort: gplay.sort.NEWEST,
    num: count,
  });

  return results.data.map((r) => ({
    source: "google_play" as const,
    external_id: r.id,
    author: r.userName || "",
    score: r.score,
    text: r.text || "",
    posted_at: r.date ? new Date(r.date).toISOString() : new Date().toISOString(),
    app_version: r.version || null,
    thumbs_up: r.thumbsUp || 0,
    extra: {
      reply: r.replyText || null,
      reply_date: r.replyDate || null,
    },
  }));
}
