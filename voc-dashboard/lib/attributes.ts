export const CATEGORIES = ["전략", "UX", "운영", "기술"] as const;
export type Category = (typeof CATEGORIES)[number];

export const SENTIMENT_ORDER = [
  "매우 긍정",
  "긍정",
  "중립",
  "부정",
  "매우 부정",
] as const;
export type Sentiment = (typeof SENTIMENT_ORDER)[number];

export interface Attribute {
  name: string;
  type: string;
  desc: string;
  example: string;
  category: Category;
}

export const ATTRIBUTES: Attribute[] = [
  { name: "핵심가치전달력", type: "기능", desc: "핵심 가치를 사용자에게 명확히 전달하는 정도", example: "토스가 뭐가 좋은지 모르겠음. 그냥 송금 빠른 앱?", category: "전략" },
  { name: "차별화 인식", type: "기능", desc: "경쟁 서비스 대비 고유한 강점 인지 정도", example: "카카오뱅크랑 뭐가 다른지 모르겠음", category: "전략" },
  { name: "시장 적합성", type: "기능", desc: "타겟 사용자 니즈와 서비스의 부합 정도", example: "어르신인데 본인인증이 너무 복잡해서 아예 못 씀", category: "전략" },
  { name: "가격 대비 가치", type: "기능", desc: "비용 대비 사용자가 느끼는 가치의 적정성", example: "토스프라임비 내는데 혜택이 점점 줄어드는 느낌", category: "전략" },
  { name: "정책 투명성", type: "기능", desc: "가격 정책, 멤버십 조건이 명확하게 안내되는 정도", example: "수수료가 어디서 얼마 나가는지 모르게 빠져나감", category: "전략" },
  { name: "프로모션 체감", type: "기능", desc: "할인/쿠폰을 사용자가 실제로 체감하는 정도", example: "포인트 준다고 가입했는데 조건이 까다로워서 못 받음", category: "전략" },
  { name: "타겟 적합성", type: "기능", desc: "다양한 사용자 계층의 니즈를 포괄하는 정도", example: "어르신들은 이 앱 절대 못 씀. 글자도 작고 메뉴가 복잡함", category: "전략" },
  { name: "UI 일관성", type: "비기능", desc: "화면 간 디자인 패턴과 인터랙션의 통일성", example: "어떤 화면은 뒤로가기가 왼쪽 위에 있고 어떤 건 없음", category: "UX" },
  { name: "정보구조 적합성", type: "비기능", desc: "정보 분류·계층이 사용자 멘탈모델에 부합하는 정도", example: "메뉴 찾기가 너무 어려움. 원하는 서비스가 어디 있는지 모르겠음", category: "UX" },
  { name: "온보딩 경험", type: "기능", desc: "최초 사용자가 핵심 기능을 이해하는 데 걸리는 노력", example: "처음 깔았는데 뭐부터 해야 하는지 모르겠고 알림 동의만 뜸", category: "UX" },
  { name: "검색 효율성", type: "기능", desc: "원하는 서비스/정보를 빠르게 찾을 수 있는 정도", example: "검색하면 광고만 잔뜩 나오고 원하는 기능은 한참 밑에", category: "UX" },
  { name: "접근성", type: "비기능", desc: "다양한 사용자가 서비스를 이용할 수 있는 정도", example: "글자 크기가 너무 작아서 확대해서 봐야 함", category: "UX" },
  { name: "오류 메시지 품질", type: "비기능", desc: "오류 시 상황을 이해하고 해결할 수 있는 정도", example: "송금 오류라고만 뜨고 왜 안 되는지 설명이 없음", category: "UX" },
  { name: "이용 내역 접근성", type: "기능", desc: "최근 이용·거래 내역을 다시 찾을 수 있는 편의성", example: "최근 이체 내역 왜 안 보이나요? 아무리 찾아도 없음", category: "UX" },
  { name: "시각적 피로도", type: "비기능", desc: "장시간 사용 시 눈의 피로를 유발하는 정도", example: "배경이 너무 밝아서 밤에 쓰기 힘듦. 다크모드 넣어주세요", category: "UX" },
  { name: "고객지원 접근성", type: "기능", desc: "지원 채널에 쉽게 접근할 수 있는 정도", example: "문의하려는데 전화번호도 없고 챗봇은 엉뚱한 답변만", category: "운영" },
  { name: "응답 속도 체감", type: "비기능", desc: "문의에 대한 응답까지 사용자가 체감하는 시간", example: "고객센터에 문의했는데 3일째 답변이 없습니다", category: "운영" },
  { name: "처리 정확성", type: "기능", desc: "문의·요청 사항이 정확하게 처리되는 정도", example: "이체 취소 요청했는데 엉뚱한 건을 처리해놨음", category: "운영" },
  { name: "공지·안내 명확성", type: "기능", desc: "서비스 변경·점검 안내가 명확하고 시의적절한 정도", example: "갑자기 정책이 바뀌었는데 공지도 없이 적용됨", category: "운영" },
  { name: "후기 신뢰도", type: "기능", desc: "서비스 후기·리뷰가 조작 없이 신뢰할 수 있는 정도", example: "후기 조작하는 거 다 보인다. 별 5개만 잔뜩", category: "운영" },
  { name: "알림 적절성", type: "기능", desc: "푸시 알림의 빈도와 내용이 유용한 정도", example: "이벤트 푸시는 오는데 정작 이체 알림은 안 옴", category: "운영" },
  { name: "거래 상태 안내", type: "기능", desc: "거래·송금 상태 정보가 실시간으로 정확하게 제공되는 정도", example: "이체 완료됐다고 떴는데 상대방은 받지 못했다고 함", category: "운영" },
  { name: "크래시 빈도", type: "비기능", desc: "앱이 비정상 종료되는 빈도", example: "송금하다가 또 튕겼음. 하루에 3번은 꺼짐", category: "기술" },
  { name: "앱 안정성", type: "비기능", desc: "전반적 앱 동작의 안정성과 예측 가능성", example: "업데이트하고 나서 계속 먹통. 버튼 눌러도 반응 없음", category: "기술" },
  { name: "배터리 영향", type: "비기능", desc: "앱 사용 시 기기 배터리 소모에 미치는 영향", example: "토스 앱 켜놓으면 배터리가 눈에 띄게 빨리 닳음", category: "기술" },
  { name: "로딩 속도", type: "비기능", desc: "화면 전환·데이터 로드 시 체감 지연 시간", example: "계좌 화면 열 때마다 5초는 걸림", category: "기술" },
  { name: "로그인·인증", type: "기능", desc: "로그인 및 본인 인증 과정의 편의성과 안정성", example: "번호 바꿨는데 옛날 번호로 인증하라고 함", category: "기술" },
  { name: "보안·개인정보", type: "비기능", desc: "사용자 데이터 보호 수준과 보안 신뢰도", example: "개인정보 수집을 그렇게 많이 하는데 보호를 못 함", category: "기술" },
  { name: "호환성", type: "비기능", desc: "다양한 기기·OS 버전에서 정상 동작하는 정도", example: "태블릿에서 쓰면 레이아웃이 다 깨짐", category: "기술" },
];

export const CAT_COLORS: Record<Category, string> = {
  전략: "bg-amber-400",
  UX: "bg-emerald-400",
  운영: "bg-blue-400",
  기술: "bg-red-400",
};

export const CAT_HEX: Record<Category, string> = {
  전략: "#f59e0b",
  UX: "#10b981",
  운영: "#3b82f6",
  기술: "#ef4444",
};

export const SENTIMENT_COLORS: Record<Sentiment, string> = {
  "매우 긍정": "bg-emerald-500",
  긍정: "bg-emerald-300",
  중립: "bg-slate-300",
  부정: "bg-red-300",
  "매우 부정": "bg-red-500",
};

export function findAttribute(name: string): Attribute | undefined {
  return ATTRIBUTES.find((a) => a.name === name);
}
