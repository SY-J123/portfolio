import type { RawReview } from "./google-play";

const GALLERY_ID = "toss"; // 토스 갤러리 (실제 gallery_id 확인 필요)
const BASE_URL = "https://gall.dcinside.com/board/lists";

interface DcPost {
  id: string;
  title: string;
  date: string;
}

async function fetchGalleryList(page = 1): Promise<DcPost[]> {
  const url = `${BASE_URL}?id=${GALLERY_ID}&page=${page}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  const html = await res.text();

  // 게시글 파싱 (tr.ub-content)
  const posts: DcPost[] = [];
  const rowRegex =
    /data-no="(\d+)"[\s\S]*?<td class="gall_tit[\s\S]*?<a[^>]*>([^<]+)<\/a>[\s\S]*?<td class="gall_date"[^>]*title="([^"]+)"/g;

  let match;
  while ((match = rowRegex.exec(html)) !== null) {
    posts.push({
      id: match[1],
      title: match[2].trim(),
      date: match[3],
    });
  }

  return posts;
}

async function fetchPostContent(postId: string): Promise<string> {
  const url = `https://gall.dcinside.com/board/view/?id=${GALLERY_ID}&no=${postId}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  const html = await res.text();

  // 본문 추출 (div.write_div)
  const bodyMatch = html.match(
    /<div class="write_div"[^>]*>([\s\S]*?)<\/div>/
  );
  if (!bodyMatch) return "";

  // HTML 태그 제거
  return bodyMatch[1]
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

export async function crawlDcinside(pages = 2): Promise<RawReview[]> {
  const reviews: RawReview[] = [];

  for (let page = 1; page <= pages; page++) {
    const posts = await fetchGalleryList(page);

    for (const post of posts.slice(0, 20)) {
      // 페이지당 최대 20개
      try {
        const content = await fetchPostContent(post.id);
        if (!content || content.length < 10) continue;

        reviews.push({
          source: "dcinside",
          external_id: post.id,
          author: "",
          score: null, // DC는 별점 없음
          text: `${post.title}\n${content}`.slice(0, 2000),
          posted_at: new Date(post.date).toISOString(),
          app_version: null,
          thumbs_up: 0,
          extra: { gallery: GALLERY_ID, title: post.title },
        });
      } catch {
        // 개별 글 실패는 무시
      }

      // rate limit
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  return reviews;
}
