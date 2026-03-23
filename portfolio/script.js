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
      "운영과 서비스 기획을 모두 경험하며, 데이터와 사용자 흐름을 함께 보면서 문제를 구조적으로 정의해온 기획자입니다.",
      "운영 단계에서는 지표와 스케줄을 조정해 전년도에 손실이 발생했던 이벤트의 손실을 50% 줄였고, 이를 통해 숫자로 문제를 파악하고 개선 방향을 세우는 감각을 키웠습니다.",
      "최근에는 AI를 활용해 문서, 프로토타입, 웹 배포를 연결한 검토 워크플로를 만들며 보고 및 컨펌 리드타임을 1주에서 3일로 단축했습니다.",
    ],
    strengths: [
      {
        title: "Problem Definition",
        description: "표면적인 요청을 그대로 받기보다, 왜 같은 문제가 반복되는지 먼저 해석하고 팀이 공감할 수 있는 문제로 다시 정의합니다.",
      },
      {
        title: "Execution Structure",
        description: "사용자 흐름, 전달 기준, 협업 방식을 함께 설계해 여러 직군이 같은 방향으로 실행할 수 있는 상태를 만듭니다.",
      },
      {
        title: "Reviewable Workflow",
        description: "문서만 정리하는 데서 멈추지 않고, 프로토타입과 웹 배포까지 연결해 검토 가능하고 전달력 있는 워크플로를 만듭니다.",
      },
      {
        title: "Learning Agility",
        description: "필요한 역량은 스스로 빠르게 메웁니다. 새로운 도구와 지식을 실무에 연결하며 정성 판단에 머무르지 않는 기획 역량을 쌓고 있습니다.",
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
        summary: "GGPoker 토너먼트 운영팀에서 스케줄 관리, 지표 모니터링, 그리고 해외 지사 및 파트너와의 영어 커뮤니케이션을 담당했습니다.",
        highlights: [
          "시즌과 타깃에 맞춰 운영 구조를 조정하고, 필요한 지표를 기준으로 반복 모니터링 체계를 운영했습니다.",
          "이전해 손실이 발생한 이벤트의 스케줄을 최적화해 전년 대비 손실을 50% 줄였습니다.",
          "해외 지사 및 파트너와 영어로 일정, 운영 이슈, 후속 대응 사항을 조율하며 실무 커뮤니케이션 역량을 쌓았습니다.",
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
      { school: "방송통신대학교", major: "Data & Statistics", period: "2023.03 - Present" },
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
      "about.sub": "커리어와 대표 성과를 간단히 소개합니다.",
      "about.lens1": "표면적인 요청보다 왜 같은 문제가 반복되는지 먼저 봅니다.",
      "about.lens2": "문서의 양보다 실행 기준과 전달 구조를 명확히 하는 데 강점이 있습니다.",
      "about.lens3": "새로운 도구는 목적이 아니라 문제 해결을 위한 수단으로 선택합니다.",
      "about.focus": "프로세스의 비효율을 구조 개선으로 연결하는 기획",
      "experience.sub": "운영과 기획을 모두 경험하며 문제 정의 감각을 키워왔습니다.",
      "skills.sub": "저를 설명하는 일하는 방식과 핵심 키워드입니다.",
      "projects.sub": "AX 환경에서 협업 구조를 바꿔본 경험을 담았습니다.",
      "contact.sub": "기획, 구조, 협업 방식에 대해 이야기할 준비가 되어 있습니다.",
      "contact.desc": "제품의 목적을 더 명확히 정의하고, 여러 직군이 같은 기준으로 움직일 수 있는 구조를 만드는 일에 관심이 있습니다.",
      "hero.note": "본 포트폴리오는 바이브 코딩으로 제작되었습니다.",
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
      "I am a planner with experience across both operations and service planning, working from both data and user flow to define problems in a structured way.",
      "On the operations side, I used metrics and schedule adjustments to cut losses by 50% for an event that had been loss-making the previous year, which strengthened my ability to identify issues through numbers and turn them into action.",
      "More recently, I used AI to connect documents, prototypes, and web distribution into a reviewable workflow, shortening reporting and approval lead time from one week to three days.",
    ],
    strengths: [
      {
        title: "Problem Definition",
        description: "I do not stop at surface requests. I first interpret why the same issue keeps recurring and redefine it into a problem the team can align on.",
      },
      {
        title: "Execution Structure",
        description: "I design user flow, delivery criteria, and collaboration ways of working so cross-functional teams can move in the same direction.",
      },
      {
        title: "Reviewable Workflow",
        description: "I go beyond documentation by connecting prototypes and web delivery, creating workflows that are easier to review and act on.",
      },
      {
        title: "Learning Agility",
        description: "I close skill gaps quickly on my own, linking new tools and knowledge back to the work instead of treating them as ends in themselves.",
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
        summary: "Managed tournament scheduling, KPI monitoring, and communication with overseas branches and partners for GGPoker.",
        highlights: [
          "Adjusted event schedules by season and target while maintaining a repeatable monitoring process.",
          "Revisited an event that had previously generated losses and cut the deficit by 50% through schedule optimization.",
          "Handled day-to-day coordination in English with overseas teams and partners to align schedules, operational issues, and follow-up actions.",
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
      { school: "Korea National Open University", major: "Data & Statistics", period: "2023.03 - Present" },
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
      "about.sub": "A brief introduction to my career path and key outcomes.",
      "about.lens1": "I look first at why the same issue keeps recurring, not just at surface requests.",
      "about.lens2": "My strength is not in producing more documents, but in clarifying execution criteria and delivery structure.",
      "about.lens3": "New tools are selected as means to solve problems, not goals in themselves.",
      "about.focus": "Planning work that turns process inefficiency into structural improvement",
      "experience.sub": "My problem-definition instinct was shaped across both operations and planning.",
      "skills.sub": "The working style and keywords that best describe how I contribute.",
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

  renderList("home-summary", data.summary, (item) => `<p>${item}</p>`);

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
