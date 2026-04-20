import { buildCaseProjects } from "./cases.js";

const portfolioContent = {
  ko: {
    heroStats: [
      { value: "3명 -> 1명", label: "PoC 프로토타입 초기 투입 인원 축소" },
      { value: "1주 -> 3일", label: "검토 및 컨펌 리드타임 단축" },
      { value: "Problem to Structure", label: "문제를 실행 구조로 바꾸는 방식" },
      { value: "Stats in Progress", label: "정량 분석 역량 확장 중" }
    ],
    summary: [
      "운영과 서비스 기획을 모두 경험하며, 문제를 구조로 바꿔 팀이 실행할 수 있게 만드는 일에 집중해왔습니다.",
      "반복되는 비효율을 먼저 발견하고, 문서와 화면, 워크플로를 다시 설계해 실제 의사결정 속도를 높이는 데 강점이 있습니다.",
      "최근에는 AI를 활용해 문서 협업, 프로토타이핑, 배포 흐름을 더 빠르게 만들고 있으며 SQL, Python, 통계 학습도 함께 이어가고 있습니다."
    ],
    strengths: [
      { title: "Autonomous", description: "반복되는 비효율을 먼저 발견하고 실행 가능한 개선안으로 연결합니다." },
      { title: "Structured Thinking", description: "모호한 문제를 문서, 기준, 흐름으로 구조화해 팀이 같은 기준으로 판단하게 만듭니다." },
      {
        title: "Cross-Functional Communication",
        description: "기획, 디자인, 개발이 같은 맥락을 공유하도록 설명 방식과 협업 기준을 조정합니다."
      },
      { title: "Ownership", description: "좋은 아이디어보다 끝까지 작동하는 구조가 중요하다고 생각합니다." }
    ],
    skills: [
      { name: "Business English", detail: "해외 파트너 및 내부 협업에서 메일, 문서, 커뮤니케이션 영어 조율" },
      { name: "Vibe Coding", detail: "문서 작성, 문제 정의" },
      { name: "Figma", detail: "화면 구조와 사용자 흐름 정리, 설계 의도 시각화" },
      { name: "Notion / Docs", detail: "PRD, 체크리스트, 가이드라인 등 실행 기준 문서 구조화" },
      { name: "GitHub", detail: "문서와 프로토타입의 버전 관리, 배포 흐름 연결" },
      { name: "SQL / Python / Statistics", detail: "데이터 분석을 위한 데이터 전처리, 시각화" }
    ],
    learning: [
      { name: "SQL / Python / Statistics", detail: "정량 근거를 더 단단하게 만들기 위해 분석 도구와 통계 개념을 꾸준히 학습하고 있습니다." },
      { name: "AI Workflow Design", detail: "AI를 활용해 프로토타이핑, 문서화, 검토 흐름을 더 빠르게 만드는 방식을 계속 실험하고 있습니다." }
    ],
    contactLinks: [
      { label: "Email", value: "jsyoung456@gmail.com", href: "mailto:jsyoung456@gmail.com" },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/bryant-jang-b8208b255",
        href: "https://www.linkedin.com/in/bryant-jang-b8208b255/"
      },
      { label: "Velog", value: "velog.io/@bryant_", href: "https://velog.io/@bryant_/posts" }
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
      "hero.note": "",
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
      "learning.title": "What I Am Learning"
    }
  },
  en: {
    heroStats: [
      { value: "3 -> 1", label: "Prototype staffing reduced for PoC review" },
      { value: "1 week -> 3 days", label: "Review and approval lead time reduced" },
      { value: "Problem to Structure", label: "A planning style built around executable structure" },
      { value: "Stats in Progress", label: "Expanding quantitative analysis skills" }
    ],
    summary: [
      "I have worked across both operations and product planning, with a consistent focus on turning messy problems into structures teams can execute.",
      "I am strongest when I can spot recurring inefficiencies, redesign the workflow, and help stakeholders align around the same context faster.",
      "Recently I have been using AI to speed up documentation, prototyping, and review workflows while continuing to study SQL, Python, and statistics."
    ],
    strengths: [
      {
        title: "Autonomous",
        description: "I tend to notice recurring inefficiencies early and connect them to practical next steps."
      },
      {
        title: "Structured Thinking",
        description: "I translate ambiguous issues into documents, criteria, and flows that teams can actually use."
      },
      {
        title: "Cross-Functional Communication",
        description: "I adjust the way decisions are documented so planning, design, and development can work from the same context."
      },
      {
        title: "Ownership",
        description: "I care less about clever ideas on paper and more about whether the structure really works in practice."
      }
    ],
    skills: [
      {
        name: "Business English",
        detail: "Email, docs, and communication coordination with global stakeholders"
      },
      { name: "Vibe Coding", detail: "Fast prototyping for flows hard to convey through documents alone" },
      { name: "Figma", detail: "Interface structure, user flow mapping, design intent visualization" },
      {
        name: "Notion / Docs",
        detail: "PRDs, checklists, and guidelines structured as actionable references"
      },
      { name: "GitHub", detail: "Version control, change tracking, and lightweight publishing" },
      { name: "SQL / Python / Statistics", detail: "Data preprocessing and visualization for analysis" }
    ],
    learning: [
      {
        name: "SQL / Python / Statistics",
        detail: "I am continuously studying analysis tools and statistical concepts to build stronger quantitative reasoning."
      },
      {
        name: "AI Workflow Design",
        detail: "I keep experimenting with ways to make prototyping, documentation, and review workflows faster with AI."
      }
    ],
    contactLinks: [
      { label: "Email", value: "jsyoung456@gmail.com", href: "mailto:jsyoung456@gmail.com" },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/bryant-jang-b8208b255",
        href: "https://www.linkedin.com/in/bryant-jang-b8208b255/"
      },
      { label: "Velog", value: "velog.io/@bryant_", href: "https://velog.io/@bryant_/posts" }
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
      "hero.note": "",
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
      "learning.title": "What I Am Learning"
    }
  }
};

portfolioContent.ko.projects = buildCaseProjects("ko");
portfolioContent.en.projects = buildCaseProjects("en");

export default portfolioContent;
