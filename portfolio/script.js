/* ===========================
   Content - KO / EN
   =========================== */
const content = {
  ko: {
    heroStats: [
      { value: "3명 -> 1명", label: "초기 검토 이해관계자 축소" },
      { value: "1주 -> 3일", label: "보고 및 컨펌 리드타임 단축" },
      { value: "Problem to Structure", label: "문제를 실행 구조로 재정의" },
      { value: "Stats in Progress", label: "정량 판단 역량 강화 중" },
    ],
    summary: [
      "운영과 서비스 기획을 모두 경험하며, 데이터와 사용자 흐름을 함께 보면서 문제를 구조적으로 정의해온 기획자입니다.",
      "운영 단계에서는 지표와 스케줄을 조정해 전년도에 손실이 발생했던 이벤트의 손실을 50% 줄였고, 이를 통해 숫자로 문제를 파악하고 개선 방향을 세우는 감각을 키웠습니다.",
      "최근에는 AI를 활용해 문서, 프로토타입, 웹 배포를 연결한 검토 워크플로를 만들며 보고 및 컨펌 리드타임을 1주에서 3일로 단축했습니다.",
    ],
    strengths: [
      {
        title: "Proactive Worker",
        description: "반복되는 비효율을 먼저 발견하고 새로운 방식을 적극적으로 제안하는 편입니다. 실제로 문서 중심 검토 과정의 마찰을 줄이기 위해 AX 기반 프로토타입 제작과 웹 배포 방식을 제안했고, 그 제안이 실제 협업 방식으로 채택되었습니다.",
      },
      {
        title: "Structured Thinker",
        description: "모호한 것을 명확하게 정의해 팀의 의사소통 비용을 줄입니다.  UX 가이드라인 프로젝트에서는 추상적으로 쓰이던 표현들을 기능 정의, 평가 기준, 의사결정 트리로 구조화해 기획과 디자인이 같은 기준으로 판단할 수 있도록 정리했습니다.",
      },
      {
        title: "Context-Aware Communicator",
        description: "정답 하나를 고집하기보다, 조직 상황과 이해관계자에 맞춰 역할과 기준을 조율하는 편입니다. 실제로 AX 기반 프로세스를 도입하는 과정에서는 새로운 협업 방식에 맞게 업무 범위와 책임 구분을 다시 조정해 팀이 무리 없이 적응할 수 있도록 정리했습니다.",
      },
      {
        title: "Logic-Driven Planner",
        description: "좋은 기획은 설명 가능해야 한다고 믿습니다. 목적, 사용자 가치, 판단 근거가 분명한 결정을 만들려고 합니다.",
      },
    ],
    experience: [
      {
        company: "Natris / LULU.AI",
        role: "Product Manager",
        period: "2024.04 - Present",
        duration: "1년 11개월",
        summary: "B2C 모바일 웹 포커 게임의 기능 기획과 UX 설계, AX 기반 협업 구조 개선을 담당",
        responsibilities: [
          {
            title: "서비스 목적에 맞는 기능 기획",
            details: [
              "기능 요구사항 정의",
              "기능 목적과 완료 기준 정리",
              "정상 흐름과 예외 흐름을 포함한 기획 기준 구체화",
            ],
          },
          {
            title: "사용 맥락을 고려한 UX 설계",
            details: [
              "사용 시간대와 서비스 이용 환경을 반영한 기본 UX 정책 설계",
              "야간 이용 비중을 고려한 다크모드 기본 설정 적용",
              "진입 경험과 몰입도를 고려한 화면 흐름 기준 정리",
            ],
          },
          {
            title: "AX 기반 협업 및 업무 효율 개선",
            details: [
              "산출물별 주 독자와 작성 범위 정리",
              "API 명세 등 경계가 모호한 항목의 문서 포함 범위 조율",
              "기획자가 직접 프로토타입을 제작하는 방식 도입",
              "바이브 코딩을 활용한 Lo-fi 프로토타입 제작",
              "Claude Code를 활용한 문서 무결성 관리 자동화",
              "성과: 이해관계자 투입 3명 -> 1명, 보고 및 검토 리드타임 1주 -> 3일 단축",
            ],
          },
          {
            title: "포커 게임 유형별 특성 및 시장 현황 분석",
            details: [
              "Web, App, iGaming별 구조와 UX 특성 분석",
              "경쟁 서비스 기능 및 흐름 비교",
              "서비스 개선 방향 검토를 위한 레퍼런스 조사",
            ],
          },
        ],
      },
      {
        company: "NSUSLAB Korea",
        role: "Operations",
        period: "2023.08 - 2024.04",
        duration: "9개월",
        summary: "GGPoker 토너먼트 운영에서 모니터링, 해외 커뮤니케이션, 운영 손실 대응을 담당",
        responsibilities: [
          {
            title: "토너먼트 모니터링",
            details: [
              "진행 중인 토너먼트의 운영 현황과 주요 지표를 주기적으로 점검",
              "시간대별 참여 흐름을 분석해 특정 시간대에 더 적합한 포맷을 제안",
              "참여 추이와 운영 성과를 바탕으로 상금 규모를 관리하고 조정",
            ],
          },
          {
            title: "해외 지사 및 파트너 커뮤니케이션",
            details: [
              "해외 지사 및 파트너와 이벤트 스케줄 및 토너먼트 포맷을 영어로 협의",
              "해외 지사에서 전달되는 운영 요청 사항과 요구사항을 검토하고 조율",
              "내부 운영 가이드라인을 기준으로 구성안을 검토하고 조정 사항 전달",
              "시즌성과 지역 특성을 반영해 더 적합한 운영 구성을 제안",
            ],
          },
          {
            title: "운영 손실 대응",
            details: [
              "전년도 성과가 좋지 않았던 로컬 이벤트 운영 건을 다시 점검하고 팔로업 및 모니터링 진행",
              "전년도 상금 규모, 주요 지표, 스케줄을 함께 분석해 손실 요인과 개선 필요 지점 정리",
              "시즌성과 지역 특성을 반영해 더 적합한 운영안과 상금 규모를 제안",
              "성과: 전년도 손실이 컸던 운영 건의 손실 폭 절반 수준 감소",
            ],
          },
          {
            title: "타사 이벤트 모니터링 및 보고",
            details: [
              "경쟁 서비스의 이벤트 운영 현황과 구성 방식 모니터링",
              "타사 이벤트 내용과 운영 흐름을 정리해 보고서 작성",
              "내부 검토와 운영 참고를 위한 모니터링 결과 공유",
            ],
          },
        ],
      },
      {
        company: "Me2on",
        role: "Operations",
        period: "2023.08 - 2024.08",
        duration: "1년 1개월",
        summary: "Fullhouse Casino 운영 지원 및 해외 지사 커뮤니케이션 수행",
        responsibilities: [
          {
            title: "서비스 운영 지원",
            details: [
              "소셜 카지노 서비스의 라이브 운영 지원과 이슈 대응 업무 수행",
              "운영 요청 사항과 진행 상황을 점검하며 기본 운영 흐름 경험 축적",
            ],
          },
          {
            title: "해외 지사 커뮤니케이션",
            details: [
              "해외 지사와의 커뮤니케이션을 통해 운영 요청 사항과 진행 상황 공유",
              "글로벌 서비스 운영 환경에서 협업 방식에 대한 실무 감각 축적",
            ],
          },
        ],
      },
    ],
    projects: [
      {
        tag: "Project 01",
        title: "AX 기반 문서 협업 프로세스 개선",
        meta: "LULU.AI | 25년 12월 ~ 26년 3월",
        description: "AX 프로토타입 제작을 통해 업무 효율과 커뮤니케이션 정확도를 높인 프로젝트입니다.",
        href: "../case-ai-doc-process.html",
        cta: "자세히 보기",
      },
      {
        tag: "Project 02",
        title: "UX 가이드라인 제작",
        meta: "LULU.AI | 26년 1월 ~ 2월",
        description: "모호한 UX 기준을 실무에서 바로 쓸 수 있는 판단 기준과 가이드라인으로 정리한 프로젝트입니다.",
        href: "../case-ux-guideline.html",
        cta: "자세히 보기",
      },
    ],
    skills: [
      {
        items: [
          {
            name: "Vibe Coding",
            detail: "기획 검토에 필요한 화면과 흐름을 빠르게 구현해, 문서만으로는 맞추기 어려운 맥락을 더 선명하게 공유할 수 있게 했습니다.",
          },
          {
            name: "Data Analysis Foundations",
            detail: "SQL, Python, 그리고 통계학 학습을 바탕으로 데이터 분석의 기초 역량을 확장하고 있으며, 더 근거 있는 의사결정을 위한 기반을 쌓고 있습니다.",
          },
          {
            name: "Figma",
            detail: "화면 설계서를 작성하고, 필요한 fidelity에 맞춰 와이어프레임을 정의합니다.",
          },
          {
            name: "Business English",
            detail: "Business Level의 영어 커뮤니케이션이 가능하며, 해외 지사 및 파트너와 일정, 운영 이슈, 후속 대응 사항을 영어로 조율한 경험이 있습니다.",
          },
          {
            name: "GitHub",
            detail: "문서와 프로토타입을 버전 관리하고, 최신 기준을 팀이 쉽게 확인할 수 있도록 운영했습니다.",
          },
        ],
      },
    ],
    learning: [
      {
        name: "Data-Informed Thinking",
        detail: "통계학, SQL, Python을 바탕으로 더 근거 있는 의사결정을 할 수 있는 기획 역량을 쌓고 있습니다. Evidence: related study notes are documented on my Velog.",
      },
      {
        name: "AI-Native Workflow",
        detail: "AI를 활용해 더 빠르게 프로토타입을 만들고, 더 명확하게 검토하고, 더 실행 가능한 기획 워크플로를 설계하는 방법을 계속 실험하고 있습니다. Evidence: ongoing experiments and learnings are documented on my Velog.",
      },
    ],
    education: [
      { school: "방송통신대학교", major: "Data & Statistics", period: "2023.03 - Present" },
      { school: "University of South Dakota", major: "Nursing", period: "2015.09 - 2016.08", note: "중퇴" },
    ],
    certifications: ["SQLD", "ADsP"],
    contactLinks: [
      { label: "Email", value: "jsyoung456@gmail.com", href: "mailto:jsyoung456@gmail.com" },
      { label: "Phone", value: "+82-10-3224-9483", href: "tel:+821032249483" },
      { label: "Location", value: "Seoul, Korea" },
    ],
    i18n: {
      "ui.skipNav": "본문으로 건너뛰기",
      "ui.navLabel": "주요 섹션",
      "ui.langToggle": "언어 전환",
      "ui.menuOpen": "메뉴 열기",
      "nav.home": "Home",
      "nav.howIWork": "How I Work",
      "nav.experience": "Experience",
      "nav.education": "Education",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "hero.badge": "Open to Work",
      "hero.name": "Siyoung Jang",
      "hero.role": "서비스 기획자",
      "hero.headline": "문제를 구조로 바꿔 팀이 실행할 수 있게 만드는 기획자",
      "hero.cta_contact": "Contact Me",
      "hero.desc": "문서만 정리하는 데서 멈추지 않습니다. 목적을 정의하고 사용자 흐름과 전달 기준을 설계한 뒤, 검토 가능한 프로토타입과 배포 방식까지 연결해 더 빠르고 명확한 협업 구조를 만듭니다.",
      "hero.cta_projects": "프로젝트 보기",
      "about.title": "About Me",
      "about.sub": "커리어와 대표 성과를 간단히 소개합니다.",
      "about.lens1": "표면적인 요청보다 왜 같은 문제가 반복되는지 먼저 봅니다.",
      "about.lens2": "문서의 양보다 실행 기준과 전달 구조를 명확히 하는 데 강점이 있습니다.",
      "about.lens3": "새로운 도구는 목적이 아니라 문제 해결을 위한 수단으로 선택합니다.",
      "about.focus": "프로세스의 비효율을 구조 개선으로 연결하는 기획",
      "section.howIWork": "How I Work",
      "section.experience": "Experience",
      "section.education": "Education",
      "section.skills": "Skills",
      "section.projects": "Projects",
      "section.contact": "Contact",
      "experience.sub": "운영과 기획을 모두 경험하며 문제 정의 감각을 키워왔습니다.",
      "skills.panelTitle": "Skills",
      "skills.panelDesc": "하드 스킬과 소프트 스킬을 나누어, 실제 업무에서 어떻게 기여했는지 보여줍니다.",
      "skills.certEyebrow": "Verified",
      "skills.certTitle": "Certificates",
      "learning.title": "What I Am Learning",
      "skills.sub": "저를 설명하는 일하는 방식과 핵심 키워드입니다.",
      "projects.sub": "AX 환경에서 협업 구조를 바꿔본 경험을 담았습니다.",
      "contact.sub": "함께 만들 제품과 문제에 대해 편하게 연락 주세요.",
      "contact.desc": "",
      "hero.note": "본 포트폴리오는 바이브 코딩으로 제작되었습니다.",
    },
  },
  en: {
    heroStats: [
      { value: "3 -> 1", label: "Reduced initial reviewers" },
      { value: "1 week -> 3 days", label: "Shortened reporting and approval lead time" },
      { value: "Problem to Structure", label: "Reframed problems into execution structures" },
      { value: "Stats in Progress", label: "Building stronger quantitative judgment" },
    ],
    summary: [
      "My experience in both operations and product management helps me define problems through data and user flows.",
      "In operations, I cut losses by 50% in an event that had been unprofitable the year before by adjusting metrics and schedules. That experience sharpened my ability to spot problems in the numbers and turn them into action.",
      "More recently, I built an AI-assisted review workflow connecting documents, prototypes, and web publishing, cutting reporting and approval lead time from one week to three days.",
    ],
    strengths: [
      {
        title: "Proactive Builder",
        description: "I try to spot friction before it becomes a bigger problem and actively suggest better ways of working. For example, I proposed an AX-powered prototyping and web publishing workflow to reduce review friction in a document-heavy process, and that proposal was adopted into the team's actual collaboration flow.",
      },
      {
        title: "Structured Thinker",
        description: "I turn ambiguity into clarity so teams can move faster and stay aligned. In my UX guideline project, I translated vague expressions into structured feature definitions, decision criteria, and decision trees so planning and design could work from the same standards.",
      },
      {
        title: "Context-Aware Communicator",
        description: "Rather than forcing one fixed answer, I adjust roles and decision boundaries to fit the organization and the people involved. During the adoption of an AX-powered workflow, I helped redefine scopes and responsibilities so the team could adapt to the new process without unnecessary friction.",
      },
      {
        title: "Logic-Driven PM",
        description: "I believe good product decisions should be explainable. I aim to make decisions grounded in purpose, user value, and clear reasoning.",
      },
    ],
    experience: [
      {
        company: "Natris / LULU.AI",
        role: "Product Manager",
        period: "2024.04 - Present",
        duration: "1 yr 11 mos",
        summary: "Led feature planning, UX design, and AX-based collaboration improvements for a B2C mobile web poker game",
        responsibilities: [
          {
            title: "Feature planning aligned with product goals",
            details: [
              "Defined feature requirements",
              "Clarified feature goals and completion criteria",
              "Specified planning criteria across main flows and edge cases",
            ],
          },
          {
            title: "UX design grounded in usage context",
            details: [
              "Designed baseline UX policies based on usage timing and service context",
              "Applied dark mode as the default experience for a product with strong night-time usage",
              "Organized flow criteria around entry experience and immersion",
            ],
          },
          {
            title: "AX-based collaboration and workflow improvement",
            details: [
              "Defined primary audiences and writing scope for each deliverable",
              "Aligned document boundaries for ambiguous areas such as API specifications",
              "Introduced planner-led prototyping",
              "Built Lo-fi prototypes through vibe coding",
              "Used Claude Code to automate document integrity checks",
              "Impact: reduced initial stakeholders from 3 to 1 and review lead time from 1 week to 3 days",
            ],
          },
          {
            title: "Research on poker product types and market structure",
            details: [
              "Analyzed structural and UX differences across web, app, and iGaming poker products",
              "Compared competitor features and flow patterns",
              "Reviewed reference products to guide improvement direction",
            ],
          },
        ],
      },
      {
        company: "NSUSLAB Korea",
        role: "Operations",
        period: "2023.08 - 2024.04",
        duration: "9 mos",
        summary: "Handled tournament monitoring, overseas communication, and loss-response operations for GGPoker",
        responsibilities: [
          {
            title: "Tournament monitoring",
            details: [
              "Checked live tournament status and key metrics on a regular basis",
              "Analyzed participation patterns by time slot and suggested formats better suited to specific hours",
              "Managed and adjusted prize levels based on participation and operating performance",
            ],
          },
          {
            title: "Communication with overseas branches and partners",
            details: [
              "Coordinated event schedules and tournament formats in English",
              "Reviewed and adjusted incoming requests from overseas branches and partners",
              "Checked proposals against internal operating guidelines and communicated required adjustments",
              "Suggested stronger operating configurations based on seasonality and locality",
            ],
          },
          {
            title: "Loss-response operations",
            details: [
              "Revisited a recurring local event that had underperformed the previous year",
              "Reviewed prior prize structures, key metrics, and schedules to identify loss factors",
              "Proposed improved operating plans and prize sizes based on regional and seasonal context",
              "Impact: reduced losses to roughly half compared with the previous year",
            ],
          },
          {
            title: "Competitor event monitoring and reporting",
            details: [
              "Monitored how competitor events were structured and run",
              "Documented event details and operating flow in internal reports",
              "Shared findings internally as reference for ongoing operations",
            ],
          },
        ],
      },
      {
        company: "Me2on",
        role: "Operations",
        period: "2023.08 - 2024.08",
        duration: "1 yr 1 mo",
        summary: "Supported operations for Fullhouse Casino and worked with overseas branches",
        responsibilities: [
          {
            title: "Live operations support",
            details: [
              "Supported live service operations and issue handling for a social casino product",
              "Built practical familiarity with day-to-day operating flow",
            ],
          },
          {
            title: "Overseas branch communication",
            details: [
              "Worked with overseas branches to share requests, updates, and follow-up actions",
              "Built early hands-on experience in global service operations and cross-team coordination",
            ],
          },
        ],
      },
    ],
    projects: [
      {
        tag: "Project 01",
        title: "AI-Driven Document Collaboration Process Improvement",
        meta: "LULU.AI | Dec 2025 - Mar 2026",
        description: "A project that improved review efficiency and communication clarity through AX-powered prototyping and web publishing.",
        href: "../case-ai-doc-process-en.html",
        cta: "Learn More",
      },
      {
        tag: "Project 02",
        title: "UX Guideline Development",
        meta: "LULU.AI | Jan 2026 - Feb 2026",
        description: "A project that translated vague UX language into clearer criteria, then organized it into an evaluation framework and production guidelines.",
        href: "../case-ux-guideline-en.html",
        cta: "Learn More",
      },
    ],
    skills: [
      {
        items: [
          {
            name: "Vibe Coding",
            detail: "I quickly build screens and flows for review, making it easier to align on context that would be difficult to convey through documents alone.",
          },
          {
            name: "Data Analysis Foundations",
            detail: "I am strengthening my foundation in data analysis through SQL, Python, and statistics to support more evidence-based decisions.",
          },
          {
            name: "Figma",
            detail: "I create screen specifications and define wireframes at the level of fidelity each stage requires.",
          },
          {
            name: "Business English",
            detail: "I work comfortably in English and have coordinated schedules, operational issues, and follow-up actions with overseas branches and partners.",
          },
          {
            name: "GitHub",
            detail: "I use GitHub to manage document and prototype versions so the team can stay aligned on the latest source of truth.",
          },
        ],
      },
    ],
    learning: [
      {
        name: "Data-Informed Thinking",
        detail: "I am building stronger product judgment through statistics, SQL, and Python so I can make decisions with better evidence. Related study notes are documented on Velog.",
      },
      {
        name: "AI-Native Workflow",
        detail: "I keep experimenting with how AI can support faster prototyping, clearer reviews, and more executable product workflows. Ongoing experiments and notes are documented on Velog.",
      },
    ],
    education: [
      { school: "Korea National Open University", major: "Data & Statistics", period: "2023.03 - Present" },
      { school: "University of South Dakota", major: "Nursing", period: "2015.09 - 2016.08", note: "Withdrew" },
    ],
    certifications: ["SQLD", "ADsP"],
    contactLinks: [
      { label: "Email", value: "jsyoung456@gmail.com", href: "mailto:jsyoung456@gmail.com" },
      { label: "Phone", value: "+82-10-3224-9483", href: "tel:+821032249483" },
      { label: "Location", value: "Seoul, Korea" },
    ],
    i18n: {
      "ui.skipNav": "Skip to content",
      "ui.navLabel": "Primary sections",
      "ui.langToggle": "Switch language",
      "ui.menuOpen": "Open menu",
      "nav.home": "Home",
      "nav.howIWork": "How I Work",
      "nav.experience": "Experience",
      "nav.education": "Education",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "hero.badge": "Open to Work",
      "hero.name": "Siyoung Jang",
      "hero.role": "Product Manager",
      "hero.headline": "A product manager who turns problems into plans teams can execute",
      "hero.cta_contact": "Contact Me",
      "hero.desc": "I do more than write documents. I define the goal, design user flows and decision criteria, and connect them to reviewable prototypes and publishing workflows so teams can move faster with more clarity.",
      "hero.cta_projects": "View Projects",
      "about.title": "About Me",
      "about.sub": "A brief introduction to my career path and key outcomes.",
      "about.lens1": "I look first at why the same issue keeps repeating, rather than stopping at surface-level requests.",
      "about.lens2": "My strength is not in producing more documents, but in clarifying execution criteria and delivery structure.",
      "about.lens3": "I choose new tools as a means to solve problems, not as goals in themselves.",
      "about.focus": "Product work that turns process inefficiency into better systems",
      "section.howIWork": "How I Work",
      "section.experience": "Experience",
      "section.education": "Education",
      "section.skills": "Skills",
      "section.projects": "Projects",
      "section.contact": "Contact",
      "experience.sub": "My instinct for problem definition was shaped through both operations and product work.",
      "skills.panelTitle": "Skills",
      "skills.panelDesc": "Organized by hard and soft skills to show how I apply them in real work.",
      "skills.certEyebrow": "Verified",
      "skills.certTitle": "Certificates",
      "learning.title": "What I Am Learning",
      "skills.sub": "The working style and keywords that best describe how I contribute.",
      "projects.sub": "Projects where I improved collaboration systems in AI-assisted environments.",
      "contact.sub": "Feel free to reach out about products, problems, and how we build them together.",
      "contact.desc": "",
      "hero.note": "This portfolio was built through a vibe-coded workflow.",
    },
  },
};

let currentLang = "ko";

function renderList(containerId, items, renderItem) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(renderItem).join("");
}

function getLangFromUrl() {
  const path = window.location.pathname.toLowerCase();

  if (path === "/en" || path.startsWith("/en/")) {
    return "en";
  }

  if (path === "/kr" || path.startsWith("/kr/")) {
    return "ko";
  }

  const params = new URLSearchParams(window.location.search);
  return params.get("lang") === "en" ? "en" : "ko";
}

function syncLangUrl(lang) {
  const currentPath = window.location.pathname.toLowerCase();
  const inLangDir = currentPath.endsWith("/kr/") || currentPath.endsWith("/en/") || currentPath.endsWith("/kr") || currentPath.endsWith("/en");
  const targetPath = lang === "en" ? "../en/" : "../kr/";

  window.location.href = inLangDir ? targetPath : (lang === "en" ? "en/" : "kr/");
}

function renderAll(data) {
  renderList("hero-stat-grid", data.heroStats, (item) => `
    <div class="stat-card">
      <p class="stat-card__value">${item.value}</p>
      <p class="stat-card__label">${item.label}</p>
    </div>
  `);

  renderList("home-summary", data.summary, (item) => `<p>${item}</p>`);

  renderList("project-list", data.projects, (item) => `
    <a class="project-card" href="${item.href}">
      <span class="project-card__tag">${item.tag}</span>
      <h3 class="project-card__title">${item.title}</h3>
      <p class="project-card__meta">${item.meta}</p>
      <p class="project-card__description">${item.description}</p>
      <span class="project-card__link">${item.cta} →</span>
    </a>
  `);

  renderList("experience-list", data.experience, (item) => `
    <article class="timeline-item">
      <div class="timeline-item__meta">
        <span class="timeline-item__period">${item.period} · ${item.duration}</span>
      </div>
      <p class="timeline-item__role">${item.role}</p>
      <h3 class="timeline-item__company">${item.company}</h3>
      <p class="timeline-item__summary">${item.summary}</p>
      <div class="timeline-item__responsibilities">
        ${item.responsibilities.map((responsibility) => `
          <section class="timeline-item__responsibility">
            <h4 class="timeline-item__responsibility-title">${responsibility.title}</h4>
            <ul class="timeline-item__highlights">
              ${responsibility.details.map((detail) => `<li>${detail}</li>`).join("")}
            </ul>
          </section>
        `).join("")}
      </div>
    </article>
  `);

  renderList("strength-grid", data.strengths, (item) => `
    <article class="strength-card">
      <h3 class="strength-card__title">${item.title}</h3>
      <p class="strength-card__description">${item.description}</p>
    </article>
  `);

  renderList("skill-grid", data.skills, (group) => `
    <section class="skill-group">
      <div class="skill-group__list">
        ${group.items.map((item) => `
          <article class="skill-story">
            <h5 class="skill-story__name">${item.name}</h5>
            <p class="skill-story__detail">${item.detail}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `);
  renderList("learning-grid", data.learning, (item) => `
    <article class="learning-card">
      <h3 class="learning-card__title">${item.name}</h3>
      <p class="learning-card__detail">${item.detail}</p>
    </article>
  `);
  renderList("education-list", data.education, (item) => `
    <div class="edu-timeline__item">
      <div class="edu-timeline__card">
        <div class="edu-timeline__meta">
          <span class="edu-timeline__period">${item.period}${item.note ? ` · ${item.note}` : ""}</span>
        </div>
        <h3 class="edu-timeline__degree">${item.major}</h3>
        <p class="edu-timeline__school">${item.school}</p>
      </div>
      <div class="edu-timeline__dot"></div>
    </div>
  `);

  renderList("certification-list", data.certifications, (item) => `<li>${item}</li>`);

  renderList("contact-links", data.contactLinks, (item) => `
    ${item.href
      ? `<a class="contact-card" href="${item.href}"${item.external ? ' target="_blank" rel="noopener"' : ""}>
          <span class="contact-card__label">${item.label}</span>
          <span class="contact-card__value">${item.value}</span>
        </a>`
      : `<div class="contact-card">
          <span class="contact-card__label">${item.label}</span>
          <span class="contact-card__value">${item.value}</span>
        </div>`
    }
  `);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (data.i18n[key]) {
      el.textContent = data.i18n[key];
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const mappings = el.getAttribute("data-i18n-attr");
    if (!mappings) return;

    mappings.split(",").forEach((mapping) => {
      const [attr, key] = mapping.split(":").map((part) => part.trim());
      if (attr && key && data.i18n[key]) {
        el.setAttribute(attr, data.i18n[key]);
      }
    });
  });

  document.documentElement.lang = currentLang;
}

function switchLang(lang) {
  syncLangUrl(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  currentLang = getLangFromUrl();
  renderAll(content[currentLang]);

  document.querySelectorAll(".lang-toggle__option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.lang === currentLang);
  });

  document.getElementById("lang-toggle").addEventListener("click", (e) => {
    const opt = e.target.closest("[data-lang]");
    if (opt && opt.dataset.lang !== currentLang) {
      switchLang(opt.dataset.lang);
    }
  });

  const sections = document.querySelectorAll(".section[id]");
  const navLinks = document.querySelectorAll(".sidebar__link");

  function updateActiveNav() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;

    if (scrollY + windowH >= docH - 2) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const lastLink = document.querySelector(`.sidebar__link[href="#${sections[sections.length - 1].id}"]`);
      if (lastLink) lastLink.classList.add("active");
      return;
    }

    let current = sections[0];
    sections.forEach((section) => {
      if (section.offsetTop - 120 <= scrollY) {
        current = section;
      }
    });

    navLinks.forEach((link) => link.classList.remove("active"));
    const activeLink = document.querySelector(`.sidebar__link[href="#${current.id}"]`);
    if (activeLink) activeLink.classList.add("active");
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  const revealElements = document.querySelectorAll(".reveal, .reveal--left, .reveal--right, .reveal--scale, .reveal-stagger");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    sidebar.querySelectorAll(".sidebar__link").forEach((link) => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }
});

