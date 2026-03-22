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
    headerMeta: [
      { label: "Email", href: "mailto:jsyoung456@gmail.com", text: "jsyoung456@gmail.com" },
      { label: "GitHub", href: "https://github.com/SY-J123/portfolio", text: "github.com/SY-J123/portfolio", external: true },
      { label: "Location", text: "Seoul, Korea" },
    ],
    summary: [
      "저는 표면적인 요청보다 먼저 문제의 본질과 구조를 정의하는 서비스 기획자입니다. 주어진 요구를 그대로 정리하기보다, 왜 이 일이 필요한지와 어떤 사용자 가치로 연결되는지를 먼저 확인합니다.",
      "기획 문서를 작성하는 데서 멈추지 않고 사용자 흐름, 전달 기준, 협업 방식을 함께 설계해 여러 직군이 같은 방향으로 실행할 수 있는 상태를 만드는 데 강점이 있습니다.",
      "최근에는 AX 환경에서 도구 자체보다 어떤 비효율을 줄이고 어떤 구조를 개선할 수 있는지에 집중하며, 문서와 프로토타입, 웹 배포를 연결한 검토 가능한 워크플로를 만들어 왔습니다.",
    ],
    strengths: [
      {
        title: "Problem Definition",
        description: "표면적인 요청을 그대로 수행하기보다, 왜 같은 문제가 반복되는지 구조적으로 해석하고 팀이 공감할 수 있는 문제로 다시 정의합니다.",
      },
      {
        title: "UX Flow Design",
        description: "사용자 흐름과 서비스 목적이 어긋나지 않도록 확인하고, 기획 의도가 실제 화면과 행동으로 이어질 수 있게 구조를 설계합니다.",
      },
      {
        title: "Collaboration Structure",
        description: "문서, 프로토타입, 배포 방식을 분리해 각 산출물의 역할을 명확히 하고, 이해관계자가 같은 기준으로 논의할 수 있는 협업 구조를 만듭니다.",
      },
      {
        title: "Self-driven Growth",
        description: "필요한 역량은 스스로 메웁니다. 통계학 학습, 주요 대학 교재 독학, 새로운 도구 검토를 통해 정성 판단에 머무르지 않는 기획 역량을 쌓고 있습니다.",
      },
    ],
    experience: [
      {
        company: "Natris / LULU.AI",
        role: "Service Planner",
        period: "2024.04 - Present",
        summary: "B2C 모바일 웹 포커 게임에서 기능 기획, UX 흐름 설계, 협업 문서 구조 개선을 담당했습니다.",
        highlights: [
          "문서 중심 전달 방식을 협업 구조 문제로 재정의하고, PRD와 프로토타입의 역할을 분리한 검토 구조를 설계했습니다.",
          "바이브 코딩 기반 초기 보고용 프로토타입 제작 방식을 제안하고 안착시켜 이해관계자 투입을 3명에서 1명으로 줄이고, 보고 및 컨펌 기간을 1주에서 3일로 단축했습니다.",
          "문서 버전 관리와 웹 배포 기준을 정리해 비개발 직군도 최신 문서를 쉽게 확인할 수 있는 협업 환경을 만들었습니다.",
        ],
      },
      {
        company: "NSUSLAB Korea",
        role: "Operations",
        period: "2023.08 - 2024.04",
        summary: "GGPoker 토너먼트 운영팀에서 스케줄 관리, 지표 모니터링, 해외 지사 및 파트너 커뮤니케이션을 담당했습니다.",
        highlights: [
          "시즌과 타깃에 맞춰 운영 구조를 조정하고, 필요한 지표를 기준으로 반복 모니터링 체계를 운영했습니다.",
          "오버레이가 크게 발생하던 운영 건을 집중 모니터링하고 후속 대응해 손실을 절반 이상 줄였습니다.",
        ],
      },
      {
        company: "Me2on",
        role: "Operations",
        period: "2023.08 - 2024.08",
        summary: "Fullhouse Casino 소셜 카지노 게임 운영과 해외 지사 커뮤니케이션 실무를 담당했습니다.",
        highlights: [
          "글로벌 운영 실무를 통해 다양한 이해관계자와 맞추는 기본 커뮤니케이션 방식을 익혔습니다.",
          "운영 현장에서 사용자 흐름과 서비스 구조를 보는 관점을 키우며 이후 기획 역할로 확장하는 기반을 만들었습니다.",
        ],
      },
    ],
    projects: [
      {
        tag: "Project 01",
        title: "AX 기반 문서 협업 프로세스 개선",
        meta: "Service Planner | 2024",
        description: "문서 작성 문제가 아니라 협업 구조 문제로 재정의하고, PRD, 프로토타입, 웹 배포를 연결해 검토 속도와 전달 정확도를 높인 사례입니다.",
        href: "case-ai-doc-process.html",
        cta: "Case Study 보기",
      },
      {
        tag: "Project 02",
        title: "텍사스 홀덤 로비 구조 개선",
        meta: "UX Planning | In Progress",
        description: "정보 구조와 사용자 흐름 관점에서 로비 경험을 재설계하고, 사용자가 더 빠르게 진입할 수 있는 기준을 정리하는 프로젝트입니다.",
        href: "case-lobby-redesign.html",
        cta: "진행 내용 보기",
      },
    ],
    skills: [
      "Service Planning",
      "UX Flow Design",
      "Problem Definition",
      "Documentation Design",
      "SQL",
      "Python",
      "Figma",
      "Claude Code / Codex",
    ],
    education: [
      { school: "University of South Dakota", major: "Nursing", period: "2015.09 - 2016.08", note: "중퇴" },
      { school: "Korea National Open University", major: "Statistics & Data Science", period: "2023.03 - Present" },
    ],
    certifications: ["SQLD", "ADsP"],
    contactLinks: [
      { label: "Email", value: "jsyoung456@gmail.com", href: "mailto:jsyoung456@gmail.com" },
      { label: "GitHub", value: "SY-J123/portfolio", href: "https://github.com/SY-J123/portfolio", external: true },
      { label: "Location", value: "Seoul, Korea" },
    ],
    i18n: {
      "hero.name": "Siyoung Jang",
      "hero.headline": "문제를 구조로 바꿔 팀이 실행할 수 있게 만드는 기획자",
      "hero.desc": "문서만 정리하는 데서 멈추지 않습니다. 목적을 정의하고 사용자 흐름과 전달 기준을 설계한 뒤, 검토 가능한 프로토타입과 배포 방식까지 연결해 더 빠르고 명확한 협업 구조를 만듭니다.",
      "hero.cta_projects": "프로젝트 보기",
      "about.sub": "문제를 구조화하고 실행 기준으로 바꾸는 방식으로 일합니다.",
      "about.lens1": "표면적인 요청보다 왜 같은 문제가 반복되는지 먼저 봅니다.",
      "about.lens2": "문서의 양보다 실행 기준과 전달 구조를 명확히 하는 데 강점이 있습니다.",
      "about.lens3": "새로운 도구는 목적이 아니라 문제 해결을 위한 수단으로 선택합니다.",
      "about.focus": "프로세스의 비효율을 구조 개선으로 연결하는 기획",
      "experience.sub": "운영과 기획을 모두 경험하며 문제 정의 감각을 키워왔습니다.",
      "skills.sub": "실무에서 반복적으로 활용하는 역량과 도구입니다.",
      "projects.sub": "AX 환경에서 협업 구조를 바꿔본 경험을 담았습니다.",
      "contact.sub": "기획, 구조, 협업 방식에 대해 이야기할 준비가 되어 있습니다.",
      "contact.desc": "제품의 목적을 더 명확히 정의하고, 여러 직군이 같은 기준으로 움직일 수 있는 구조를 만드는 일에 관심이 있습니다.",
      "hero.note": "이 포트폴리오는 기획자가 직접 구조를 설계하고, 바이브 코딩 기반 워크플로로 제작한 결과물입니다.",
    },
  },
  en: {
    heroStats: [
      { value: "3 -> 1", label: "Stakeholders reduced" },
      { value: "1 week -> 3 days", label: "Review and approval lead time" },
      { value: "Problem to Structure", label: "Reframing work into execution" },
      { value: "Stats in Progress", label: "Quantitative thinking in progress" },
    ],
    headerMeta: [
      { label: "Email", href: "mailto:jsyoung456@gmail.com", text: "jsyoung456@gmail.com" },
      { label: "GitHub", href: "https://github.com/SY-J123/portfolio", text: "github.com/SY-J123/portfolio", external: true },
      { label: "Location", text: "Seoul, Korea" },
    ],
    summary: [
      "I am a service planner who defines the essence and structure of a problem before jumping into execution. Rather than organizing requirements as they are, I first ask why the work matters and what user value it should create.",
      "I do not stop at writing planning documents. I design user flows, delivery criteria, and collaboration structures so multiple functions can move in the same direction.",
      "Recently, I have focused less on tools themselves and more on which inefficiencies can be reduced in AX environments, building reviewable workflows that connect documents, prototypes, and web distribution.",
    ],
    strengths: [
      {
        title: "Problem Definition",
        description: "I do not respond only to surface requests. I analyze why the same issue keeps recurring and redefine it into a problem the team can align on.",
      },
      {
        title: "UX Flow Design",
        description: "I connect user flow with product intent and turn planning logic into structures that can actually be executed on screen.",
      },
      {
        title: "Collaboration Structure",
        description: "I separate the roles of documents, prototypes, and distribution so stakeholders can discuss the same source of truth with less confusion.",
      },
      {
        title: "Self-driven Growth",
        description: "I close skill gaps on my own through statistics study, textbook self-learning, and hands-on tool exploration to build stronger planning judgment.",
      },
    ],
    experience: [
      {
        company: "Natris / LULU.AI",
        role: "Service Planner",
        period: "2024.04 - Present",
        summary: "Led feature planning, UX flow design, and collaboration document improvement for a B2C mobile web poker game.",
        highlights: [
          "Reframed document-heavy delivery as a collaboration structure issue and redesigned the workflow around PRDs and prototypes.",
          "Introduced a vibe-coding-based prototype workflow that reduced stakeholders from 3 to 1 and shortened review and approval time from 1 week to 3 days.",
          "Set up version management and web distribution standards so non-technical stakeholders could access the latest document more easily.",
        ],
      },
      {
        company: "NSUSLAB Korea",
        role: "Operations",
        period: "2023.08 - 2024.04",
        summary: "Managed tournament scheduling, KPI monitoring, and cross-border partner communication for GGPoker.",
        highlights: [
          "Adjusted operational structures by season and target while maintaining a repeatable monitoring process.",
          "Closely tracked high-overlay events and follow-up actions, reducing losses by more than 50%.",
        ],
      },
      {
        company: "Me2on",
        role: "Operations",
        period: "2023.08 - 2024.08",
        summary: "Handled live operations and international communication for Fullhouse Casino, a social casino game.",
        highlights: [
          "Built a foundation in global operations and cross-functional communication.",
          "Developed a habit of looking at user flow and service structure from the operations side, which later supported my transition into planning.",
        ],
      },
    ],
    projects: [
      {
        tag: "Project 01",
        title: "AX-based Document Collaboration Improvement",
        meta: "Service Planner | 2024",
        description: "A case where I reframed documentation as a collaboration issue and connected PRDs, prototypes, and web distribution to improve review speed and delivery clarity.",
        href: "case-ai-doc-process.html",
        cta: "View Case Study",
      },
      {
        tag: "Project 02",
        title: "Texas Hold'em Lobby Structure Redesign",
        meta: "UX Planning | In Progress",
        description: "An ongoing project redesigning the lobby experience from an information architecture and user flow perspective.",
        href: "case-lobby-redesign.html",
        cta: "View Progress",
      },
    ],
    skills: [
      "Service Planning",
      "UX Flow Design",
      "Problem Definition",
      "Documentation Design",
      "SQL",
      "Python",
      "Figma",
      "Claude Code / Codex",
    ],
    education: [
      { school: "University of South Dakota", major: "Nursing", period: "2015.09 - 2016.08", note: "Withdrew" },
      { school: "Korea National Open University", major: "Statistics & Data Science", period: "2023.03 - Present" },
    ],
    certifications: ["SQLD", "ADsP"],
    contactLinks: [
      { label: "Email", value: "jsyoung456@gmail.com", href: "mailto:jsyoung456@gmail.com" },
      { label: "GitHub", value: "SY-J123/portfolio", href: "https://github.com/SY-J123/portfolio", external: true },
      { label: "Location", value: "Seoul, Korea" },
    ],
    i18n: {
      "hero.name": "Siyoung Jang",
      "hero.headline": "A planner who turns problems into structures teams can execute",
      "hero.desc": "I do more than organize documents. I define the purpose, design user flow and delivery criteria, then connect them to reviewable prototypes and distribution so teams can move faster with more clarity.",
      "hero.cta_projects": "View Projects",
      "about.sub": "I work by structuring problems and turning them into execution criteria.",
      "about.lens1": "I look first at why the same issue keeps recurring, not just at surface requests.",
      "about.lens2": "My strength is not in producing more documents, but in clarifying execution criteria and delivery structure.",
      "about.lens3": "New tools are selected as means to solve problems, not goals in themselves.",
      "about.focus": "Planning work that turns process inefficiency into structural improvement",
      "experience.sub": "My problem-definition instinct was shaped across both operations and planning.",
      "skills.sub": "Capabilities and tools I rely on repeatedly in practice.",
      "projects.sub": "Projects where I changed collaboration structure in AX environments.",
      "contact.sub": "Ready to talk about planning, structure, and collaboration systems.",
      "contact.desc": "I am interested in defining product purpose more clearly and building structures that help teams move with the same standards.",
      "hero.note": "This portfolio was structured by a planner and built through a vibe-coding-based workflow.",
    },
  },
};

let currentLang = "ko";

function renderList(containerId, items, renderItem) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(renderItem).join("");
}

function renderAll(data) {
  renderList("hero-stat-grid", data.heroStats, (item) => `
    <div class="stat-card">
      <p class="stat-card__value">${item.value}</p>
      <p class="stat-card__label">${item.label}</p>
    </div>
  `);

  renderList("header-meta", data.headerMeta, (item) => `
    ${item.href
      ? `<a class="contact-meta-item" href="${item.href}"${item.external ? ' target="_blank" rel="noopener"' : ""}>
          <span class="contact-meta-item__label">${item.label}</span>
          <span class="contact-meta-item__value">${item.text}</span>
        </a>`
      : `<div class="contact-meta-item">
          <span class="contact-meta-item__label">${item.label}</span>
          <span class="contact-meta-item__value">${item.text}</span>
        </div>`
    }
  `);

  renderList("summary-body", data.summary, (item) => `<p>${item}</p>`);

  renderList("project-list", data.projects, (item) => `
    <a class="project-card" href="${item.href}">
      <span class="project-card__tag">${item.tag}</span>
      <h3 class="project-card__title">${item.title}</h3>
      <p class="project-card__meta">${item.meta}</p>
      <p class="project-card__description">${item.description}</p>
      <span class="project-card__link">${item.cta} -></span>
    </a>
  `);

  renderList("experience-list", data.experience, (item) => `
    <article class="timeline-item">
      <span class="timeline-item__period">${item.period}</span>
      <p class="timeline-item__role">${item.role}</p>
      <h3 class="timeline-item__company">${item.company}</h3>
      <p class="timeline-item__summary">${item.summary}</p>
      <ul class="timeline-item__highlights">
        ${item.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
      </ul>
    </article>
  `);

  renderList("strength-grid", data.strengths, (item) => `
    <article class="strength-card">
      <h3 class="strength-card__title">${item.title}</h3>
      <p class="strength-card__description">${item.description}</p>
    </article>
  `);

  renderList("skill-grid", data.skills, (item) => `<li class="skill-chip">${item}</li>`);

  renderList("education-list", data.education, (item) => `
    <div class="edu-timeline__item">
      <div class="edu-timeline__card">
        <span class="edu-timeline__degree">${item.major}${item.note ? ` (${item.note})` : ""}</span>
        <h3 class="edu-timeline__school">${item.school}</h3>
      </div>
      <div class="edu-timeline__dot"></div>
      <span class="edu-timeline__period">${item.period}</span>
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

  document.documentElement.lang = currentLang;
}

function switchLang(lang) {
  currentLang = lang;
  renderAll(content[lang]);

  document.querySelectorAll(".lang-toggle__option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.lang === lang);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll(content.ko);

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
