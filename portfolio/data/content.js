const portfolioContent = {
  ko: {
    heroStats: [
      { value: "3명 -> 1명", label: "PoC 프로토타입 초기 투입 인원 축소" },
      { value: "1주 -> 3일", label: "검토 및 컨펌 리드타임 단축" },
      { value: "Problem to Structure", label: "문제를 실행 구조로 바꾸는 방식" },
      { value: "Stats in Progress", label: "정량 분석 역량 확장 중" },
    ],
    summary: [
      "운영과 서비스 기획을 모두 경험하며, 문제를 구조로 바꿔 팀이 실행할 수 있게 만드는 일에 집중해왔습니다.",
      "반복되는 비효율을 먼저 발견하고, 문서와 화면, 워크플로를 다시 설계해 실제 의사결정 속도를 높이는 데 강점이 있습니다.",
      "최근에는 AI를 활용해 문서 협업, 프로토타이핑, 배포 흐름을 더 빠르게 만들고 있으며 SQL, Python, 통계 학습도 함께 이어가고 있습니다.",
    ],
    strengths: [
      {
        title: "Autonomous",
        description: "반복되는 비효율을 먼저 발견하고 실행 가능한 개선안으로 연결합니다.",
      },
      {
        title: "Structured Thinking",
        description: "모호한 문제를 문서, 기준, 흐름으로 구조화해 팀이 같은 기준으로 판단하게 만듭니다.",
      },
      {
        title: "Cross-Functional Communication",
        description: "기획, 디자인, 개발이 같은 맥락을 공유하도록 설명 방식과 협업 기준을 조정합니다.",
      },
      {
        title: "Ownership",
        description: "좋은 아이디어보다 끝까지 작동하는 구조가 중요하다고 생각합니다.",
      },
    ],
    skills: [
      {
        name: "Business English",
        detail: "해외 파트너 및 내부 협업에서 메일, 문서, 커뮤니케이션 영어 조율",
      },
      {
        name: "Vibe Coding",
        detail: "문서만으로 전달하기 어려운 흐름을 프로토타입으로 빠르게 구현",
      },
      {
        name: "Figma",
        detail: "화면 구조와 사용자 흐름 정리, 설계 의도 시각화",
      },
      {
        name: "Notion / Docs",
        detail: "PRD, 체크리스트, 가이드라인 등 실행 기준 문서 구조화",
      },
      {
        name: "GitHub",
        detail: "문서와 프로토타입의 버전 관리, 배포 흐름 연결",
      },
      {
        name: "SQL / Python / Statistics",
        detail: "데이터 전처리, 시각화, 가설 검정",
      },
    ],
    projects: [
      {
        title: "AI 활용 업무 프로세스 개선",
        meta: "LULU.AI | 25년 12월 ~ 26년 3월",
        problem: [
          "소규모 기업 특성상 개인이 넓은 범위의 업무를 맡아 많은 산출물이 발생했고 문서 유지보수에 어려움이 있었다.",
          "PoC 검토마다 반복 설명 발생, 컨펌 리드타임 과다하게 발생했다.",
        ],
        goal: [
          "기획 산출물(문서)을 2개이하로 만든다.",
          "UX흐름에 대해 더 시각적으로 쉽게 이해할 수 있게 한다.",
        ],
        approach: [
          "와이어 프레임과 스토리보드를 없애고 직접바이브 코딩을 활용해 기획자가 직접 프로토타입 제작하고 화면 설계 내용도 포함",
          "기존 노션에서 관리되던 문서를 md파일로 제작하고",
          "GitHub와 웹 배포를 연결해 단일 검토 기준점 구축",
          "Claude Code로 반복 문서 정리 작업 자동화",
        ],
        impact: [
          "프로토타입 제작 투입 인원 3명 → 1명",
          "리드타임 1주 → 3일 단축",
        ],
        appendix: [
          "프로토타입 링크 기반 검토 흐름",
          "블러 처리한 시연 영상",
        ],
        tools: ["Claude Code", "GitHub"],
        href: "../cases/ko/case-ai-doc-process.html",
        cta: "자세히 보기",
      },
      {
        title: "UI 기획 / UX 가이드라인 제작",
        meta: "LULU.AI | 26년 1월 ~ 2월",
        problem: [
          "UI 기능정의 부재로 불필요한 컴포넌트 제작을 반복했다.",
          "UI 사용 기준 부재로 서비스내 UX 일관성이 저하된다."
        ],
        goal: [
          "UI 기능 정의 표준화",
          "직군 무관 컴포넌트 파악 구조 구축",
          "일관된 UX 판단 기준 제공",
        ],
        approach: [
          "공통 UI를 컴포넌트 단위로 정의했다.",
          "Claude Code로 시각화하여 컴포넌트 라이브러리 문서를 제작했다.",
          "기능별 의사결정 트리와 체크리스트를 설계했다.",
        ],
        impact: [
          "UI 14종의 기능을 속성과 메서드 기준으로 구조화",
          "시각화된 컴포넌트 라이브러리 문서 제작",
          "의사결정 트리·체크리스트 세트 제작",
        ],
        appendix: [
          "UI 기능 14종 정리",
          "시각화된 가이드 문서 제작",
          "의사결정 트리와 체크리스트 세트 정리",
        ],
        tools: ["Notion", "Claude Code"],
        href: "../cases/ko/case-ux-guideline.html",
        cta: "자세히 보기",
      },
      {
        title: "데이터 분석을 통한 손실 개선",
        meta: "NSUSLAB Korea | 23년 12월 ~ 24년 1월",
        problem: [
          "전년도 운영에서 특정 포맷과 구간의 손실이 과도하게 발생했다.",
          "오프라인 본선 200명 목표는 그대로 유지해야 했다.",
        ],
        goal: [
          "운영 목표를 훼손하지 않고 손실 구조를 개선한다.",
          "기존 가이드라인 안에서 실행 가능한 운영안을 만든다.",
        ],
        approach: [
          "전년도 데이터에서 손실이 집중된 구간을 다시 읽었다.",
          "상대적으로 손실이 낮은 포맷 중심으로 운영 구조를 재편했다.",
          "이벤트 노출 구조도 함께 조정했다.",
        ],
        impact: [
          "전년 대비 손실 폭 약 50% 감소",
        ],
        tools: ["Excel", "Data Analysis", "Operations Planning"],
        href: "../cases/ko/case-tournament-loss-reduction.html",
        cta: "자세히 보기",
      },
      {
        title: "서울 부동산 실거래가 데이터 대시보드",
        meta: "Toy Project | 26년 4월",
        problem: [
          "공개 실거래 데이터는 존재하지만 기간, 면적, 거래 유형별 비교가 번거로웠다.",
          "단순 조회를 넘어 비교와 검정까지 이어지는 흐름이 필요했다.",
        ],
        goal: [
          "서울 실거래 데이터를 더 빠르게 탐색할 수 있게 만든다.",
          "대시보드 탐색과 가설 검정을 한 흐름으로 연결한다.",
        ],
        approach: [
          "국토교통부 공개 API 데이터를 평당가 기준으로 재구성했다.",
          "기간, 면적, 실거래가/전세가 필터를 가진 대시보드를 만들었다.",
          "가설 검정 페이지를 분리해 분석 루프를 연결했다.",
        ],
        impact: [
          "대시보드와 가설 검정 흐름 연결",
          "공개 데이터를 비교 가능한 분석 구조로 재구성",
        ],
        appendix: [
          "대시보드 필터: 기간, 면적, 실거래가/전세가",
          "데이터 범위: 서울 25개 구 아파트 실거래가",
        ],
        appendixLink: {
          href: "https://real-estate-data-kappa.vercel.app/dashboard",
          label: "실제 대시보드 보기",
        },
        tools: ["Python", "Pandas", "Statistics", "Vercel"],
        href: "../cases/ko/case-real-estate-dashboard.html",
        cta: "자세히 보기",
      },
    ],
    learning: [
      {
        name: "SQL / Python / Statistics",
        detail: "정량 근거를 더 단단하게 만들기 위해 분석 도구와 통계 개념을 꾸준히 학습하고 있습니다.",
      },
      {
        name: "AI Workflow Design",
        detail: "AI를 활용해 프로토타이핑, 문서화, 검토 흐름을 더 빠르게 만드는 방식을 계속 실험하고 있습니다.",
      },
    ],
    contactLinks: [
      { label: "Email", value: "jsyoung456@gmail.com", href: "mailto:jsyoung456@gmail.com" },
      { label: "LinkedIn", value: "linkedin.com/in/bryant-jang-b8208b255", href: "https://www.linkedin.com/in/bryant-jang-b8208b255/" },
      { label: "Velog", value: "velog.io/@bryant_", href: "https://velog.io/@bryant_/posts" },
    ],
    i18n: {
      "ui.skipNav": "본문으로 이동",
      "ui.navLabel": "주요 섹션",
      "ui.langToggle": "언어 전환",
      "ui.menuOpen": "메뉴 열기",
      "cover.label": "포트폴리오",
      "cover.scroll": "아래로 이동",
      "nav.home": "Home",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.learning": "Learning",
      "nav.contact": "Contact",
      "hero.name": "Siyoung Jang",
      "hero.role": "서비스 기획자",
      "hero.note": "이 포트폴리오는 기획자가 직접 구조를 설계하고, 바이브 코딩 기반 워크플로로 제작한 결과물입니다.",
      "hero.headline": "문제를 구조로 바꿔 팀이 실행할 수 있게 만드는 기획자",
      "hero.cta_contact": "Contact Me",
      "about.title": "About Me",
      "about.strengths": "Key Strengths",
      "section.skills": "Skills",
      "section.projects": "Projects",
      "section.contact": "Contact",
      "projects.problem": "문제 정의",
      "projects.goal": "목표",
      "projects.approach": "방법",
      "projects.impact": "성과",
      "projects.tools": "Skills",
      "projects.appendix": "Appendix",
      "projects.modalPrev": "이전 프로젝트",
      "projects.modalNext": "다음 프로젝트",
      "projects.close": "닫기",
      "learning.title": "What I Am Learning",
    },
  },
  en: {
    heroStats: [
      { value: "3 -> 1", label: "Prototype staffing reduced for PoC review" },
      { value: "1 week -> 3 days", label: "Review and approval lead time reduced" },
      { value: "Problem to Structure", label: "A planning style built around executable structure" },
      { value: "Stats in Progress", label: "Expanding quantitative analysis skills" },
    ],
    summary: [
      "I have worked across both operations and product planning, with a consistent focus on turning messy problems into structures teams can execute.",
      "I am strongest when I can spot recurring inefficiencies, redesign the workflow, and help stakeholders align around the same context faster.",
      "Recently I have been using AI to speed up documentation, prototyping, and review workflows while continuing to study SQL, Python, and statistics.",
    ],
    strengths: [
      {
        title: "Autonomous",
        description: "I tend to notice recurring inefficiencies early and connect them to practical next steps.",
      },
      {
        title: "Structured Thinking",
        description: "I translate ambiguous issues into documents, criteria, and flows that teams can actually use.",
      },
      {
        title: "Cross-Functional Communication",
        description: "I adjust the way decisions are documented so planning, design, and development can work from the same context.",
      },
      {
        title: "Ownership",
        description: "I care less about clever ideas on paper and more about whether the structure really works in practice.",
      },
    ],
    skills: [
      {
        name: "Business English",
        detail: "Email, docs, and communication coordination with global stakeholders",
      },
      {
        name: "Vibe Coding",
        detail: "Fast prototyping for flows hard to convey through documents alone",
      },
      {
        name: "Figma",
        detail: "Interface structure, user flow mapping, design intent visualization",
      },
      {
        name: "Notion / Docs",
        detail: "PRDs, checklists, and guidelines structured as actionable references",
      },
      {
        name: "GitHub",
        detail: "Version control, change tracking, and lightweight publishing",
      },
      {
        name: "SQL / Python / Statistics",
        detail: "Data preprocessing, visualization, hypothesis testing",
      },
    ],
    projects: [
      {
        title: "AI-Driven Document Collaboration Process Improvement",
        meta: "LULU.AI | Dec 2025 - Mar 2026",
        problem: [
          "Text-based document sharing failed to convey screen flows and planning intent in a single pass",
          "Repeated explanation per PoC review, excessive approval lead time",
        ],
        goal: [
          "Reduce PoC review and approval lead time",
          "Eliminate interpretation gaps across stakeholders, reduce documentation maintenance cost",
        ],
        approach: [
          "Built low-fidelity prototypes directly to share screen flows alongside documents",
          "Connected GitHub and web deployment to establish a single review reference point",
          "Automated repetitive documentation work with Claude Code",
        ],
        impact: [
          "Prototype production headcount: 3 → 1 (67% reduction)",
          "Lead time: 1 week → 3 days (57% reduction)",
        ],
        appendix: [
          "Prototype link-based review flow",
          "Blurred demo video",
        ],
        tools: ["Claude Code", "GitHub"],
        href: "../cases/en/case-ai-doc-process.html",
        cta: "View details",
      },
      {
        title: "UI Planning / UX Guideline Development",
        meta: "LULU.AI | Jan 2026 - Feb 2026",
        problem: [
          "Lack of UI feature definitions caused repeated creation of redundant components",
          "Absence of UI usage standards degraded UX consistency across the service",
        ],
        goal: [
          "Standardize UI feature definitions",
          "Build a structure for cross-functional component comprehension",
          "Provide consistent UX decision-making criteria",
        ],
        approach: [
          "Defined common UI as component units",
          "Created visualized component library documentation with Claude Code",
          "Designed per-feature decision trees and checklists",
        ],
        impact: [
          "Structured 14 UI features by attributes and methods",
          "Produced visualized component library documentation",
          "Delivered decision tree and checklist sets",
        ],
        appendix: [
          "Structured 14 UI feature types",
          "Created a visualized guideline document",
          "Compiled a decision-tree and checklist set",
        ],
        tools: ["Notion", "Claude Code"],
        href: "../cases/en/case-ux-guideline.html",
        cta: "View details",
      },
      {
        title: "Tournament Loss Structure Improvement",
        meta: "NSUSLAB Korea | Dec 2023 - Jan 2024",
        problem: [
          "Certain formats and ranges in the prior year's operation were generating outsized losses.",
          "The target of securing 200 offline finalists still had to be maintained.",
        ],
        goal: [
          "Improve the loss structure without weakening the core operating target.",
          "Create an executable operating plan within existing guidelines.",
        ],
        approach: [
          "I re-read prior-year data to identify where losses were concentrated.",
          "I reorganized the event structure around relatively lower-loss formats.",
          "I also adjusted exposure structure to support the revised plan.",
        ],
        impact: [
          "Maintained the target of securing 200 offline finalists",
          "Reduced losses by roughly 50% versus the previous year",
        ],
        tools: ["Excel", "Data Analysis", "Operations Planning"],
        href: "../cases/en/case-tournament-loss-reduction.html",
        cta: "View details",
      },
      {
        title: "Seoul Real Estate Transaction Dashboard",
        meta: "Toy Project | Apr 2026",
        problem: [
          "Public transaction data exists, but comparing it across time range, size band, and transaction type is still cumbersome.",
          "I wanted a flow that connects exploration to hypothesis testing instead of stopping at simple lookup.",
        ],
        goal: [
          "Make Seoul apartment transaction data easier to explore.",
          "Connect dashboard exploration with a follow-up hypothesis-testing flow.",
        ],
        approach: [
          "I normalized Ministry of Land transaction data into price-per-pyeong views.",
          "I built dashboard filters for period, size, and sale versus lease.",
          "I separated a hypothesis-testing page to complete the analysis loop.",
        ],
        impact: [
          "Connected dashboard exploration with hypothesis-testing flow",
          "Reframed public data into a more comparable analysis structure",
        ],
        appendix: [
          "Dashboard filters: period, size, sale/lease",
          "Coverage: apartment transactions across Seoul's 25 districts",
        ],
        appendixLink: {
          href: "https://real-estate-data-kappa.vercel.app/dashboard",
          label: "Open the live dashboard",
        },
        tools: ["Python", "Pandas", "Statistics", "Vercel"],
        href: "../cases/en/case-real-estate-dashboard.html",
        cta: "View details",
      },
    ],
    learning: [
      {
        name: "SQL / Python / Statistics",
        detail: "I am continuously studying analysis tools and statistical concepts to build stronger quantitative reasoning.",
      },
      {
        name: "AI Workflow Design",
        detail: "I keep experimenting with ways to make prototyping, documentation, and review workflows faster with AI.",
      },
    ],
    contactLinks: [
      { label: "Email", value: "jsyoung456@gmail.com", href: "mailto:jsyoung456@gmail.com" },
      { label: "LinkedIn", value: "linkedin.com/in/bryant-jang-b8208b255", href: "https://www.linkedin.com/in/bryant-jang-b8208b255/" },
      { label: "Velog", value: "velog.io/@bryant_", href: "https://velog.io/@bryant_/posts" },
    ],
    i18n: {
      "ui.skipNav": "Skip to content",
      "ui.navLabel": "Primary sections",
      "ui.langToggle": "Switch language",
      "ui.menuOpen": "Open menu",
      "cover.label": "Portfolio",
      "cover.scroll": "Scroll down",
      "nav.home": "Home",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.learning": "Learning",
      "nav.contact": "Contact",
      "hero.name": "Siyoung Jang",
      "hero.role": "Product Manager",
      "hero.note": "This portfolio was built through a vibe-coded workflow.",
      "hero.headline": "A product manager who turns problems into plans teams can execute",
      "hero.cta_contact": "Contact Me",
      "about.title": "About Me",
      "about.strengths": "Key Strengths",
      "section.skills": "Skills",
      "section.projects": "Projects",
      "section.contact": "Contact",
      "projects.problem": "Problem",
      "projects.goal": "Goal",
      "projects.approach": "Approach",
      "projects.impact": "Impact",
      "projects.tools": "Skills",
      "projects.appendix": "Appendix",
      "projects.modalPrev": "Previous project",
      "projects.modalNext": "Next project",
      "projects.close": "Close",
      "learning.title": "What I Am Learning",
    },
  },
};

export default portfolioContent;

