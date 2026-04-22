import type { RawReview } from "./google-play";

const APP_ID = 839333328; // 토스 iOS (Viva Republica)

// Apple RSS 피드 기반 (라이브러리 불필요)
export async function crawlAppStore(maxPages = 5): Promise<RawReview[]> {
  const reviews: RawReview[] = [];

  for (let page = 1; page <= maxPages + 2; page++) {
    try {
      const res = await fetch(
        `https://itunes.apple.com/kr/rss/customerreviews/page=${page}/id=${APP_ID}/sortBy=mostRecent/json`
      );
      const json = await res.json();
      const entries = json?.feed?.entry;
      if (!entries || entries.length === 0) continue;

      for (const e of entries) {
        if (!e.content?.label) continue; // 메타 엔트리 스킵

        reviews.push({
          source: "app_store",
          external_id: String(e.id?.label || `ios_${page}_${reviews.length}`),
          author: e.author?.name?.label || "",
          score: parseInt(e["im:rating"]?.label) || null,
          text: String(e.content.label).slice(0, 2000),
          posted_at: e.updated?.label
            ? new Date(e.updated.label).toISOString()
            : new Date().toISOString(),
          app_version: e["im:version"]?.label || null,
          thumbs_up: parseInt(e["im:voteSum"]?.label) || 0,
          extra: { title: e.title?.label || null },
        });
      }
    } catch {
      // 페이지 실패 무시
    }
  }

  return reviews;
}
