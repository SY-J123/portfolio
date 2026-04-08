const CASE_LABELS = {
  ko: {
    home: "홈으로",
    back: "홈으로 돌아가기",
    outline: "Outline",
    appendix: "Appendix",
  },
  en: {
    home: "Home",
    back: "Back to Home",
    outline: "Outline",
    appendix: "Appendix",
  },
};

const caseContent = {
  "case-ai-doc-process": {
    ko: {
      description: "텍스트 중심 문서 협업의 구조적 비효율을 정의하고, 프로토타입·배포 연결로 검토 리드타임을 57% 단축한 사례",
      title: "AI 기반 문서 협업 프로세스 개선",
      meta: "LULU.AI · 25년 12월 ~ 26년 3월",
      headline: "문서, 프로토타입, 웹 배포를 연결해 PoC 검토 리드타임을 57% 단축한 프로젝트입니다.",
      sections: [
        { id: "problem", title: "문제 정의", items: ["텍스트 중심 문서만으로는 화면 흐름과 기획 의도가 1회 전달되지 않았다.", "PoC 검토마다 반복 설명과 재확인이 발생해 리드타임이 길어졌다.", "이해관계자별 해석 기준이 달라 검토-컨펌 사이클이 반복됐다.", "문서 작성·수정 시간이 과다해 핵심 판단에 집중하기 어려웠다."] },
        { id: "goal", title: "목적", items: ["PoC 검토 및 컨펌 리드타임 단축", "이해관계자 간 해석 편차 제거", "문서 유지보수 비용 절감"] },
        { id: "approach", title: "해결 방법", items: ["기획자가 직접 로우파이 프로토타입을 제작해 화면 흐름을 함께 공유했다.", "GitHub와 웹 배포를 연결해 이해관계자가 항상 같은 기준 문서를 보도록 구조를 맞췄다.", "Claude Code로 반복 문서 정리 작업을 줄이고, 절감된 시간을 UX 판단과 핵심 기획에 재배분했다."] },
        { id: "impact", title: "결과", items: ["PoC 검토 및 컨펌 리드타임 1주 → 3일 (약 57% 단축)", "프로토타입 제작 투입 인원 3명 → 1명 (약 67% 축소)", "반복 설명·재확인 감소로 커뮤니케이션 비용 절감", "문서 작성·수정 시간 절감분을 UX 판단에 재투입"] },
        { id: "appendix", title: "Appendix", items: ["프로토타입 링크 기반 검토 흐름", "블러 처리한 시연 영상"] },
      ],
    },
    en: {
      description: "Identified structural inefficiencies in document-heavy collaboration and reduced review lead time by 57% through prototyping and deployment integration.",
      title: "AI-Driven Document Collaboration Process Improvement",
      meta: "LULU.AI · Dec 2025 - Mar 2026",
      headline: "Connected documents, prototypes, and web deployment to reduce PoC review lead time by 57%.",
      sections: [
        { id: "problem", title: "Problem", items: ["Text-based documents alone failed to convey screen flows and planning intent in a single pass.", "Each PoC review required repeated explanation and reconfirmation, extending lead time.", "Inconsistent interpretation across stakeholders caused repeated review-confirmation cycles.", "Excessive time on document creation and revision reduced focus on core decision-making."] },
        { id: "goal", title: "Goal", items: ["Reduce PoC review and approval lead time", "Eliminate interpretation gaps across stakeholders", "Reduce documentation maintenance cost"] },
        { id: "approach", title: "Approach", items: ["Built low-fidelity prototypes directly as planner to share screen flows alongside documents.", "Connected GitHub and web deployment so stakeholders always reviewed against the same baseline.", "Used Claude Code to reduce repetitive document formatting, reallocating saved time to UX decisions and core planning."] },
        { id: "impact", title: "Result", items: ["PoC review and approval lead time: 1 week → 3 days (approx. 57% reduction)", "Prototype production headcount: 3 → 1 (approx. 67% reduction)", "Reduced communication cost through fewer repeated explanations and reconfirmations", "Time saved on documentation reallocated to UX decision-making"] },
        { id: "appendix", title: "Appendix", items: ["Prototype link-based review flow", "Blurred demo video"] },
      ],
    },
  },
  "case-ux-guideline": {
    ko: {
      description: "UI 기능 정의 부재로 발생한 비효율을 속성·메서드 기준 구조화와 시각화 문서로 해결한 사례",
      title: "UI 기획 / UX 가이드라인 제작",
      meta: "LULU.AI · 26년 1월 ~ 2월",
      headline: "UI 기능을 속성과 메서드 기준으로 구조화하고, 시각화된 컴포넌트 라이브러리 문서를 제작한 프로젝트입니다.",
      sections: [
        { id: "problem", title: "문제 정의", items: ["UI 기능 정의 부재로 불필요한 컴포넌트 제작을 반복했다.", "UI 사용 기준 부재로 서비스 내 UX 일관성이 저하됐다."] },
        { id: "goal", title: "목적", items: ["UI 기능 정의 표준화", "직군 무관 컴포넌트 파악 구조 구축", "일관된 UX 판단 기준 제공"] },
        { id: "approach", title: "해결 방법", items: ["공통 UI를 컴포넌트 단위로 정의했다.", "Claude Code로 시각화하여 컴포넌트 라이브러리 문서를 제작했다.", "기능별 의사결정 트리와 체크리스트를 설계했다."] },
        { id: "impact", title: "결과", items: ["UI 14종의 기능을 속성과 메서드 기준으로 구조화", "시각화된 컴포넌트 라이브러리 문서 제작", "의사결정 트리·체크리스트 세트 제작"] },
        { id: "appendix", title: "Appendix", items: ["UI 기능 14종 정리", "시각화된 가이드 문서 제작", "의사결정 트리와 체크리스트 세트 정리"] },
      ],
    },
    en: {
      description: "Resolved inefficiencies from missing UI feature definitions through attribute/method-based structuring and visualized documentation.",
      title: "UI Planning / UX Guideline Development",
      meta: "LULU.AI · Jan 2026 - Feb 2026",
      headline: "Structured UI features by attributes and methods, and produced a visualized component library document.",
      sections: [
        { id: "problem", title: "Problem", items: ["Lack of UI feature definitions caused repeated creation of redundant components.", "Absence of UI usage standards degraded UX consistency across the service."] },
        { id: "goal", title: "Goal", items: ["Standardize UI feature definitions", "Build a structure for cross-functional component comprehension", "Provide consistent UX decision-making criteria"] },
        { id: "approach", title: "Approach", items: ["Defined common UI as component units.", "Created visualized component library documentation with Claude Code.", "Designed per-feature decision trees and checklists."] },
        { id: "impact", title: "Result", items: ["Structured 14 UI features by attributes and methods", "Produced visualized component library documentation", "Delivered decision tree and checklist sets"] },
        { id: "appendix", title: "Appendix", items: ["Structured 14 UI feature types", "Created a visualized guideline document", "Compiled a decision-tree and checklist set"] },
      ],
    },
  },
  "case-tournament-loss-reduction": {
    ko: {
      description: "운영 목표를 유지하면서 손실 구조를 개선한 프로젝트 요약",
      title: "토너먼트 손실 구조 개선",
      meta: "NSUSLAB Korea · 23년 12월 ~ 24년 1월",
      headline: "핵심 운영 목표를 유지하면서 손실이 커지는 구조를 다시 설계한 프로젝트입니다.",
      sections: [
        { id: "problem", title: "문제 정의", items: ["전년도 운영에서 특정 포맷과 구간의 손실이 과도하게 발생했다.", "오프라인 본선 200명 목표는 그대로 유지해야 했다."] },
        { id: "goal", title: "목적", items: ["운영 목표를 훼손하지 않고 손실 구조를 개선한다.", "기존 가이드라인 안에서 실행 가능한 운영안을 만든다."] },
        { id: "approach", title: "해결 방법", items: ["전년도 데이터에서 손실이 집중된 구간을 다시 읽었다.", "상대적으로 손실이 낮은 포맷 중심으로 운영 구조를 재편했다.", "이벤트 노출 구조도 함께 조정했다."] },
        { id: "impact", title: "결과", items: ["오프라인 본선 200명 목표 유지", "전년 대비 손실 폭 약 50% 감소"] },
      ],
    },
    en: {
      description: "A tournament operations case where I kept the core goal of securing 200 offline finalists while cutting losses.",
      title: "Tournament Loss Structure Improvement",
      meta: "NSUSLAB Korea · Dec 2023 - Jan 2024",
      headline: "A project that kept the core operating target intact while redesigning the loss structure of a recurring event.",
      sections: [
        { id: "problem", title: "Problem", items: ["Certain formats and ranges in the prior year's operation were generating outsized losses.", "The target of securing 200 offline finalists still had to be maintained."] },
        { id: "goal", title: "Goal", items: ["Improve the loss structure without weakening the core operating target.", "Create an executable operating plan within existing guidelines."] },
        { id: "approach", title: "Approach", items: ["I re-read prior-year data to identify where losses were concentrated.", "I reorganized the event structure around relatively lower-loss formats.", "I also adjusted exposure structure to support the revised plan."] },
        { id: "impact", title: "Impact", items: ["Maintained the target of securing 200 offline finalists", "Reduced losses by roughly 50% versus the previous year"] },
      ],
    },
  },
  "case-real-estate-dashboard": {
    ko: {
      description: "서울 부동산 데이터를 비교와 검정 흐름으로 정리한 토이 프로젝트 요약",
      title: "서울 부동산 실거래가 데이터 대시보드",
      meta: "Toy Project · 26년 4월",
      headline: "서울 실거래 데이터를 평당가 기준으로 재구성하고, 대시보드와 가설 검정 흐름을 연결한 토이 프로젝트입니다.",
      sections: [
        { id: "problem", title: "문제 정의", items: ["공개 실거래 데이터는 존재하지만 기간, 면적, 거래 유형별 비교가 번거로웠다.", "단순 조회를 넘어 비교와 검정까지 이어지는 흐름이 필요했다."] },
        { id: "goal", title: "목적", items: ["서울 실거래 데이터를 더 빠르게 탐색할 수 있게 만든다.", "대시보드 탐색과 가설 검정을 한 흐름으로 연결한다."] },
        { id: "approach", title: "해결 방법", items: ["국토교통부 공개 API 데이터를 평당가 기준으로 재구성했다.", "기간, 면적, 실거래가/전세가 필터를 가진 대시보드를 만들었다.", "가설 검정 페이지를 분리해 분석 루프를 연결했다."] },
        { id: "impact", title: "결과", items: ["대시보드와 가설 검정 흐름 연결", "공개 데이터를 비교 가능한 분석 구조로 재구성"] },
        { id: "appendix", title: "Appendix", items: ["대시보드 필터: 기간, 면적, 실거래가/전세가", "데이터 범위: 서울 25개 구 아파트 실거래가"], link: { href: "https://real-estate-data-kappa.vercel.app/dashboard", label: "실제 대시보드 보기" } },
      ],
    },
    en: {
      description: "A toy data project that turns Seoul apartment transaction data into an exploratory dashboard with hypothesis-testing flow.",
      title: "Seoul Real Estate Transaction Dashboard",
      meta: "Toy Project · Apr 2026",
      headline: "A toy data project that reorganizes Seoul apartment transaction data into price-per-pyeong views and connects exploration with hypothesis testing.",
      sections: [
        { id: "problem", title: "Problem", items: ["Public transaction data exists, but comparing it across time range, size band, and transaction type is still cumbersome.", "I wanted a flow that connects exploration to hypothesis testing instead of stopping at simple lookup."] },
        { id: "goal", title: "Goal", items: ["Make Seoul apartment transaction data easier to explore.", "Connect dashboard exploration with a follow-up hypothesis-testing flow."] },
        { id: "approach", title: "Approach", items: ["I normalized Ministry of Land transaction data into price-per-pyeong views.", "I built dashboard filters for period, size, and sale versus lease.", "I separated a hypothesis-testing page to complete the analysis loop."] },
        { id: "impact", title: "Impact", items: ["Connected dashboard exploration with hypothesis-testing flow", "Reframed public data into a more comparable analysis structure"] },
        { id: "appendix", title: "Appendix", items: ["Dashboard filters: period, size, sale/lease", "Coverage: apartment transactions across Seoul's 25 districts"], link: { href: "https://real-estate-data-kappa.vercel.app/dashboard", label: "Open the live dashboard" } },
      ],
    },
  },
};

export { CASE_LABELS, caseContent };
