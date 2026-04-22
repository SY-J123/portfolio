import { getServiceClient } from "./supabase";

// 키워드 기반 규칙 분류 — Claude API 불필요

const VERY_POSITIVE_KW = /좋아요|최고|만족|편리|편해|사랑|감사|응원|화이팅|잘\s*쓰|잘\s*사용|빠르고.*좋|좋고.*빠/;
const VERY_NEGATIVE_KW = /탈[퇴팡회]|삭제|해지|안\s*쓴다|안\s*씀|못\s*믿|사기|거짓말|최악|극혐|역[겹겨]|꺼져|망[해하]|지움|사라져|불매|신고/;
const REPEAT_KW = /또|계속|자꾸|몇\s*번째|매번|맨날|항상|반복|여러\s*번|몇\s*번/;

// 카테고리 키워드
const CAT_KEYWORDS: Record<string, RegExp> = {
  전략: /가격|저렴|할인|쿠폰|토스프라임|멤버십|혜택|경쟁|카카오뱅크|쓸데없|돈|유료|결제|구독|해지|환불|요금|수수료|이자|포인트|캐시백|정책|약관|광고/,
  UX: /UI|디자인|화면|불편|복잡|사용|검색|찾기|카테고리|메뉴|버튼|글자|폰트|다크모드|최근\s*본|위치|레이아웃|인터페이스|직관|탐색|필터|정렬/,
  운영: /고객[센지]|상담|문의|답변|응답|공지|안내|이체|송금|환불|반품|교환|리뷰.*삭제|리뷰.*조작|이벤트|푸시|알림|알[람]|약속/,
  기술: /오류|에러|버그|튕김|크래시|꺼[짐져]|안[됨돼]|로딩|느리|속도|배터리|용량|업[뎃데]|로그인|인증|보안|개인정보|유출|해킹|설치|호환/,
};

function calcSentiment(score: number | null, text: string) {
  const s = score ?? 3;
  if (s >= 5 && VERY_POSITIVE_KW.test(text)) return { level: "매우 긍정" as const, score: 20 };
  if (s >= 4) return { level: "긍정" as const, score: 10 };
  if (s === 3) return { level: "중립" as const, score: 0 };
  if (s === 1 && VERY_NEGATIVE_KW.test(text)) return { level: "매우 부정" as const, score: -20 };
  return { level: "부정" as const, score: -10 };
}

function calcSeverity(text: string) {
  const hasRepeat = REPEAT_KW.test(text);
  const hasExtreme = VERY_NEGATIVE_KW.test(text);
  if (hasRepeat && hasExtreme) return { level: "반복+이탈", multiplier: 2.5 };
  if (hasExtreme) return { level: "이탈/강한 부정", multiplier: 2.0 };
  if (hasRepeat) return { level: "반복/누적", multiplier: 1.5 };
  return { level: "일반", multiplier: 1.0 };
}

function detectCategories(text: string): string[] {
  const cats: string[] = [];
  for (const [cat, regex] of Object.entries(CAT_KEYWORDS)) {
    if (regex.test(text)) cats.push(cat);
  }
  return cats;
}

// 미분류 리뷰를 규칙 기반으로 자동 분류
export async function classifyUnclassified(limit = 100): Promise<number> {
  const db = getServiceClient();

  const { data: unclassified, error } = await db
    .from("reviews")
    .select("id, text, score")
    .is("classified_at", null)
    .order("crawled_at", { ascending: false })
    .limit(limit);

  if (error || !unclassified || unclassified.length === 0) return 0;

  let updated = 0;
  for (const review of unclassified) {
    const sent = calcSentiment(review.score, review.text);
    const sev = calcSeverity(review.text);
    const cats = detectCategories(review.text);
    const scoreReality = Math.max(0, Math.min(100, 80 + sent.score * sev.multiplier));

    const { error: updateErr } = await db
      .from("reviews")
      .update({
        sentiment: sent.level,
        sentiment_score: sent.score,
        severity: sev.level,
        severity_multiplier: sev.multiplier,
        score_reality: scoreReality,
        categories: cats.length > 0 ? cats : null,
        classified_at: new Date().toISOString(),
      })
      .eq("id", review.id);

    if (!updateErr) updated++;
  }

  return updated;
}
