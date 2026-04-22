import type { RawReview } from "./google-play";

/**
 * 뽐뿌 커뮤니티 크롤러 — 스텁
 * TODO: 자유게시판/금융 게시판에서 '토스' 키워드 포함 글 수집 구현
 *   - 엔드포인트: https://www.ppomppu.co.kr/zboard/zboard.php?id=freeboard (예시)
 *   - 목록 파싱 → 본문 페이지 → RawReview 매핑
 */
export async function crawlPpomppu(_maxPages = 2): Promise<RawReview[]> {
  console.warn("[Ppomppu] 크롤러 미구현 — 빈 결과 반환");
  return [];
}
