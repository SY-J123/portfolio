const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const INPUT_PATH = path.join(DATA_DIR, 'reviews_for_classify.json');
const OUTPUT_ALL_PATH = path.join(DATA_DIR, 'reviews_preprocessed.json');
const OUTPUT_MODEL_PATH = path.join(DATA_DIR, 'reviews_for_model.json');
const OUTPUT_DROPPED_PATH = path.join(DATA_DIR, 'reviews_dropped.json');

const DOMAIN_KEYWORDS = [
  '광고', '알림', '결제', '자동결제', '취소', '환불', '반품', '교환',
  '로그인', '로그아웃', '업데이트', '버그', '오류', '에러', '배송', '배달',
  '고객센터', '상담', '문의', '카드', '쿠폰', '개인정보', '보안', '유출',
  '검색', '필터', '정렬', '로딩', '속도', '앱', '화면', '버튼', '팝업',
  '멤버십', '와우', '주문', '리뷰', '상품', '문의', '회원가입',
  'login', 'logout', 'error', 'bug', 'payment', 'refund', 'cancel',
  'delivery', 'review', 'coupon', 'popup'
];

const OPINION_ONLY_PATTERNS = [
  /^최악+$/,
  /^별로+$/,
  /^구려+$/,
  /^구림+$/,
  /^별루+$/,
  /^노답+$/,
  /^망했/,
  /^짜증/,
  /^답없/,
  /^실망/,
  /^좋아/,
  /^좋네요$/,
  /^좋음$/,
  /^굿+$/,
  /^최고+$/,
  /^추천+$/,
  /^만족+$/,
  /^감사/,
  /^굳+$/,
  /^별점/
];

const NON_SEMANTIC_TOKEN_RE = /[ㅋㅎㅠㅜㅡ]+|[!?,.~]+|[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;
const ONLY_NOISE_RE = /^[\s0-9ㄱ-ㅎㅏ-ㅣㅋㅎㅠㅜㅡ!?.,~]+$/u;
const JAMO_TOKEN_RE = /\b[ㄱ-ㅎㅏ-ㅣ]{2,}\b/gu;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8');
}

function collapseRepeatedChars(text) {
  return text.replace(/(.)\1{3,}/gu, '$1$1');
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function removeStandaloneNoiseTokens(text) {
  return text
    .split(/\s+/)
    .filter((token) => {
      if (!token) return false;
      const stripped = token.replace(NON_SEMANTIC_TOKEN_RE, '');
      return stripped.length > 0;
    })
    .join(' ');
}

function cleanText(text) {
  if (typeof text !== 'string') return '';

  let cleaned = text.normalize('NFKC');
  cleaned = cleaned.replace(/\u200B/g, ' ');
  cleaned = cleaned.replace(EMOJI_RE, ' ');
  cleaned = cleaned.replace(/https?:\/\/\S+/gi, ' ');
  cleaned = cleaned.replace(/www\.\S+/gi, ' ');
  cleaned = cleaned.replace(JAMO_TOKEN_RE, ' ');
  cleaned = collapseRepeatedChars(cleaned);
  cleaned = cleaned.replace(/[!?.,~]{2,}/g, ' ');
  cleaned = removeStandaloneNoiseTokens(cleaned);
  cleaned = normalizeWhitespace(cleaned);

  return cleaned;
}

function hasDomainKeyword(text) {
  const lower = text.toLowerCase();
  return DOMAIN_KEYWORDS.some((keyword) => lower.includes(keyword.toLowerCase()));
}

function isOpinionOnly(text) {
  return OPINION_ONLY_PATTERNS.some((pattern) => pattern.test(text));
}

function semanticLength(text) {
  return text.replace(/\s+/g, '').length;
}

function classifyMeaningfulness(review) {
  const rawText = typeof review.text === 'string' ? review.text.trim() : '';
  const cleanedText = cleanText(rawText);
  const length = semanticLength(cleanedText);
  const keywordHit = hasDomainKeyword(cleanedText);

  if (!rawText) {
    return { cleanedText, isMeaningful: false, dropReason: 'empty_text' };
  }

  if (!cleanedText) {
    return { cleanedText, isMeaningful: false, dropReason: 'empty_after_cleaning' };
  }

  if (ONLY_NOISE_RE.test(rawText) || ONLY_NOISE_RE.test(cleanedText)) {
    return { cleanedText, isMeaningful: false, dropReason: 'noise_only_text' };
  }

  if (isOpinionOnly(cleanedText) && !keywordHit) {
    return { cleanedText, isMeaningful: false, dropReason: 'opinion_only_text' };
  }

  if (!keywordHit && length <= 4) {
    return { cleanedText, isMeaningful: false, dropReason: 'too_short_without_context' };
  }

  if (!keywordHit && review.score >= 4 && length <= 8) {
    return { cleanedText, isMeaningful: false, dropReason: 'short_positive_without_context' };
  }

  if (!keywordHit && review.score <= 2 && length <= 8) {
    return { cleanedText, isMeaningful: false, dropReason: 'short_negative_without_context' };
  }

  return { cleanedText, isMeaningful: true, dropReason: null };
}

function summarizeDropped(dropped) {
  const counts = {};
  dropped.forEach((review) => {
    counts[review.dropReason] = (counts[review.dropReason] || 0) + 1;
  });
  return counts;
}

function main() {
  const reviews = readJson(INPUT_PATH);

  const processed = reviews.map((review) => {
    const result = classifyMeaningfulness(review);
    return {
      ...review,
      rawText: review.text,
      cleanText: result.cleanedText,
      isMeaningful: result.isMeaningful,
      dropReason: result.dropReason
    };
  });

  const retained = processed.filter((review) => review.isMeaningful);
  const dropped = processed.filter((review) => !review.isMeaningful);

  writeJson(OUTPUT_ALL_PATH, processed);
  writeJson(OUTPUT_MODEL_PATH, retained);
  writeJson(OUTPUT_DROPPED_PATH, dropped);

  console.log(`total: ${processed.length}`);
  console.log(`retained: ${retained.length}`);
  console.log(`dropped: ${dropped.length}`);
  console.log('drop reasons:', summarizeDropped(dropped));
}

main();
