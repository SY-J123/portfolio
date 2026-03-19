/* ===========================
   Content — KO / EN
   =========================== */
const content = {
  ko: {
    heroStats: [
      { value: "3명 → 1명", label: "협업 투입 인원 축소" },
      { value: "1~2주 → 3~4일", label: "핸드오프 리드타임 단축" },
      { value: "PM / Planner", label: "문제 정의와 UX 흐름 설계 중심" },
      { value: "AI-assisted", label: "기획 검토와 프로토타입 제작 워크플로우" },
    ],
    headerMeta: [
      { label: "Email", href: "mailto:jsyoung456@gmail.com", text: "jsyoung456@gmail.com" },
      { label: "GitHub", href: "https://github.com/SY-J123/portfolio", text: "github.com/SY-J123/portfolio", external: true },
      { label: "Location", text: "Seoul, Korea" },
    ],
    summary: [
      "저는 화면보다 먼저 문제의 본질을 정의하는 서비스 기획자입니다. 주어진 요구를 그대로 정리하기보다 그 일이 왜 필요한지, 어떤 사용자 가치로 연결되는지를 먼저 확인합니다.",
      "기획 문서를 쓰는 데서 멈추지 않고 사용자 흐름, 예외 케이스, 전달 구조를 함께 설계해 디자이너와 개발자가 바로 움직일 수 있는 상태를 만드는 데 강점이 있습니다.",
      "최근에는 AI를 단순 보조 도구가 아니라 실무 전달 구조를 더 빠르고 명확하게 만드는 수단으로 활용하며, 기획자가 직접 검토 가능한 프로토타입까지 연결하는 방식을 실험하고 있습니다.",
    ],
    strengths: [
      { title: "Problem Definition", description: "표면적인 불편을 바로 해결하기보다 왜 같은 문제가 반복되는지 구조적으로 해석하고, 팀이 공감할 수 있는 문제로 다시 정의합니다." },
      { title: "UX Flow Design", description: "사용자의 불편과 서비스가 유도하는 방향이 어긋나지 않는지 점검하며, 목적에 맞는 흐름과 화면 구조를 설계합니다." },
      { title: "Collaboration Structure", description: "문서, 화면, 리뷰 기준을 분리해서 관리하기보다 한 번에 연결해 협업 왕복을 줄이고 실행 속도를 높이는 방식을 만듭니다." },
      { title: "Self-directed Improvement", description: "필요하다고 판단한 문제는 먼저 시도해보고, 시행착오를 거쳐 실무에 맞는 기준으로 계속 보완합니다." },
    ],
    experience: [
      {
        company: "Natris / LULU.AI", role: "Service Planner", period: "2024.04 - Present",
        summary: "B2C 모바일 웹 포커 게임에서 기능 기획, UX 흐름 설계, 협업 문서 구조 개선을 담당했습니다.",
        highlights: [
          "문서 중심 협업의 병목을 구조적 문제로 재정의하고, PRD와 프로토타입을 병행하는 협업 방식을 설계했습니다.",
          "AI 기반 프로세스 개선을 먼저 제안하고 적용해 이해관계자 수를 3명에서 1명으로 줄이고, 핸드오프 준비 리드타임을 1~2주에서 3~4일 수준으로 단축했습니다.",
          "문서 역할과 전달 기준을 정리해 디자이너와 개발자가 바로 실행 가능한 형태로 기획 의도를 연결했습니다.",
        ],
      },
      {
        company: "NSUSLAB Korea", role: "Operations", period: "2023.08 - 2024.04",
        summary: "GGPoker 토너먼트 운영팀에서 스케줄 관리, 지표 모니터링, 해외 지사 및 파트너 커뮤니케이션을 담당했습니다.",
        highlights: [
          "시즌과 타깃에 맞춰 스케줄과 개런티를 조정하며 운영 구조를 더 효율적으로 정리했습니다.",
          "오버레이가 크게 발생했던 운영 건을 집중 모니터링하고 팔로업해 손실 폭을 절반 이상 줄였습니다.",
        ],
      },
      {
        company: "Me2on", role: "Operations", period: "2023.08 - 2024.08",
        summary: "Fullhouse Casino 소셜 카지노 게임 운영과 해외 지사 커뮤니케이션 실무를 담당했습니다.",
        highlights: [
          "글로벌 운영 협업의 기본 구조와 커뮤니케이션 방식을 실무에서 익혔습니다.",
          "운영 현장에서 사용자 흐름과 서비스 구조를 보는 관점을 쌓으며 이후 기획 역할로 확장하는 기반을 만들었습니다.",
        ],
      },
    ],
    projects: [
      { tag: "Project 01", title: "AI 기반 문서 협업 프로세스 개선", meta: "Service Planner | 2024", description: "문서 작성 문제를 협업 구조 문제로 재정의하고, Markdown PRD와 AI-assisted 프로토타입 workflow를 결합해 검토 속도와 전달 명확도를 높인 사례입니다.", href: "case-ai-doc-process.html", cta: "Case Study 보기" },
      { tag: "Project 02", title: "텍사스 홀덤 로비 구조 개선", meta: "UX Planning | In Progress", description: "정보 구조와 사용자 흐름 관점에서 로비 경험을 다시 설계하고, 우선순위와 시각적 위계를 재정리하는 프로젝트입니다.", href: "case-lobby-redesign.html", cta: "진행 내용 보기" },
    ],
    skills: ["English Communication", "SQL", "Python", "Figma", "Vibe Coding Workflow", "Claude Code / Codex"],
    education: [
      { school: "University of South Dakota", major: "Nursing", period: "2015.09 - 2016.08", note: "중퇴" },
      { school: "방송통신대학교", major: "통계, 데이터학과", period: "2023.03 - Present" },
    ],
    certifications: ["SQLD", "ADsP"],
    contactLinks: [
      { label: "Email", value: "jsyoung456@gmail.com", href: "mailto:jsyoung456@gmail.com" },
      { label: "GitHub", value: "SY-J123/portfolio", href: "https://github.com/SY-J123/portfolio", external: true },
      { label: "Location", value: "Seoul, Korea" },
    ],
    i18n: {
      "hero.name": "장시영",
      "hero.headline": "문제를 구조로 바꾸고, 팀이 실행할 수 있게 만드는 기획자",
      "hero.desc": "문서, 화면, 프로토타입을 분리해서 보지 않습니다. 목적을 정의하고 사용자 흐름을 설계한 뒤, AI 기반 제작 워크플로우까지 연결해 더 빠르게 검토하고 더 명확하게 전달하는 방식을 만듭니다.",
      "hero.cta_projects": "프로젝트 보기",
      "about.sub": "기획 의도를 실행 가능한 구조로 정리합니다",
      "about.lens1": "표면적인 요청보다 왜 같은 문제가 반복되는지 먼저 봅니다.",
      "about.lens2": "문서 작성보다 협업 구조와 전달 기준을 명확히 정리하는 데 강점이 있습니다.",
      "about.lens3": "새로운 도구는 목적이 아니라 문제 해결 수단으로 선택합니다.",
      "about.focus": "AI를 활용한 기획 전달 구조 개선",
      "experience.sub": "서비스 운영과 기획을 오가며 쌓은 문제 정의 감각",
      "skills.sub": "실무에서 자주 꺼내 쓰는 역량",
      "projects.sub": "AI를 활용해 실무 구조를 바꾼 경험",
      "contact.sub": "기획과 협업 구조를 함께 이야기할 준비가 되어 있습니다",
      "contact.desc": "제품의 목적을 더 명확하게 정의하고, 팀이 같은 방향으로 움직일 수 있는 구조를 만드는 일에 관심이 있습니다.",
      "hero.note": "이 포트폴리오는 Claude Code, Codex를 이용한 바이브 코딩으로 제작되었습니다.",
    },
  },

  en: {
    heroStats: [
      { value: "3 → 1", label: "Stakeholders reduced" },
      { value: "1-2wk → 3-4d", label: "Handoff lead time cut" },
      { value: "PM / Planner", label: "Problem definition & UX flow design" },
      { value: "AI-assisted", label: "Review & prototype workflow" },
    ],
    headerMeta: [
      { label: "Email", href: "mailto:jsyoung456@gmail.com", text: "jsyoung456@gmail.com" },
      { label: "GitHub", href: "https://github.com/SY-J123/portfolio", text: "github.com/SY-J123/portfolio", external: true },
      { label: "Location", text: "Seoul, Korea" },
    ],
    summary: [
      "I'm a service planner who defines the essence of a problem before jumping into screens. Rather than organizing requirements as given, I first ask why the work is needed and what user value it connects to.",
      "I don't stop at writing planning documents — I design user flows, edge cases, and delivery structures so designers and developers can act immediately.",
      "Recently, I've been using AI not just as an assistant but as a means to make delivery structures faster and clearer, connecting planning directly to reviewable prototypes.",
    ],
    strengths: [
      { title: "Problem Definition", description: "Rather than fixing surface-level issues, I interpret why the same problems recur structurally and redefine them into problems the team can align on." },
      { title: "UX Flow Design", description: "I verify that user pain points and the service's intended direction are aligned, then design flows and screen structures to match." },
      { title: "Collaboration Structure", description: "Instead of managing documents, screens, and review criteria separately, I connect them to reduce back-and-forth and speed up execution." },
      { title: "Self-directed Improvement", description: "When I identify a problem worth solving, I try it first and iterate until it meets real-world standards." },
    ],
    experience: [
      {
        company: "Natris / LULU.AI", role: "Service Planner", period: "2024.04 - Present",
        summary: "Led feature planning, UX flow design, and documentation structure improvement for a B2C mobile web poker game.",
        highlights: [
          "Reframed document-centric collaboration bottlenecks as structural issues and designed a workflow combining PRDs with prototypes.",
          "Proposed and implemented AI-based process improvements, reducing stakeholders from 3 to 1 and cutting handoff lead time from 1-2 weeks to 3-4 days.",
          "Organized document roles and delivery standards so designers and developers could execute directly from planning output.",
        ],
      },
      {
        company: "NSUSLAB Korea", role: "Operations", period: "2023.08 - 2024.04",
        summary: "Managed tournament scheduling, KPI monitoring, and cross-border partner communication for GGPoker.",
        highlights: [
          "Adjusted schedules and guarantees by season and target, streamlining the operational structure.",
          "Monitored and followed up on high-overlay events, reducing losses by over 50%.",
        ],
      },
      {
        company: "Me2on", role: "Operations", period: "2023.08 - 2024.08",
        summary: "Handled live operations and international coordination for Fullhouse Casino, a social casino game.",
        highlights: [
          "Learned foundational structures for global operations and cross-team communication.",
          "Built a perspective on user flows and service structure from the operations side, forming the basis for transitioning into a planning role.",
        ],
      },
    ],
    projects: [
      { tag: "Project 01", title: "AI-based Document Collaboration Process", meta: "Service Planner | 2024", description: "Reframed a documentation problem as a collaboration structure issue, combining Markdown PRDs with AI-assisted prototyping to improve review speed and delivery clarity.", href: "case-ai-doc-process.html", cta: "View Case Study" },
      { tag: "Project 02", title: "Texas Hold'em Lobby Redesign", meta: "UX Planning | In Progress", description: "Redesigning the lobby experience from an information architecture and user flow perspective, re-prioritizing visual hierarchy.", href: "case-lobby-redesign.html", cta: "View Progress" },
    ],
    skills: ["English Communication", "SQL", "Python", "Figma", "Vibe Coding Workflow", "Claude Code / Codex"],
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
      "hero.desc": "I don't treat documents, screens, and prototypes as separate artifacts. I define the purpose, design user flows, then connect them to an AI-assisted production workflow for faster review and clearer delivery.",
      "hero.cta_projects": "View Projects",
      "about.sub": "Turning planning intent into actionable structure",
      "about.lens1": "I look at why the same problems keep recurring, not just the surface-level requests.",
      "about.lens2": "My strength is in clarifying collaboration structures and delivery standards, not just writing documents.",
      "about.lens3": "New tools are chosen as a means to solve problems, not as goals in themselves.",
      "about.focus": "Improving planning delivery structure with AI",
      "experience.sub": "Problem-definition instincts built across operations and planning",
      "skills.sub": "Capabilities I rely on in practice",
      "projects.sub": "Experiences reshaping workflows with AI",
      "contact.sub": "Ready to discuss planning and collaboration structures",
      "contact.desc": "I'm interested in defining product purpose more clearly and building structures that keep teams moving in the same direction.",
      "hero.note": "This portfolio was designed, built, reviewed, and deployed by a planner using an AI-assisted workflow.",
    },
  },
};

let currentLang = "ko";

/* ===========================
   Render helpers
   =========================== */
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
      <span class="project-card__link">${item.cta} →</span>
    </a>
  `);

  renderList("experience-list", data.experience, (item) => `
    <article class="timeline-item">
      <span class="timeline-item__period">${item.period}</span>
      <p class="timeline-item__role">${item.role}</p>
      <h3 class="timeline-item__company">${item.company}</h3>
      <p class="timeline-item__summary">${item.summary}</p>
      <ul class="timeline-item__highlights">
        ${item.highlights.map((h) => `<li>${h}</li>`).join("")}
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

  // Update static i18n text
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (data.i18n[key]) el.textContent = data.i18n[key];
  });

  // Update html lang
  document.documentElement.lang = currentLang;
}

function switchLang(lang) {
  currentLang = lang;
  renderAll(content[lang]);

  document.querySelectorAll(".lang-toggle__option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.lang === lang);
  });
}

/* ===========================
   Init
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  renderAll(content.ko);

  // Language toggle
  document.getElementById("lang-toggle").addEventListener("click", (e) => {
    const opt = e.target.closest("[data-lang]");
    if (opt && opt.dataset.lang !== currentLang) {
      switchLang(opt.dataset.lang);
    }
  });

  // Sidebar active link on scroll
  const sections = document.querySelectorAll(".section[id]");
  const navLinks = document.querySelectorAll(".sidebar__link");

  function updateActiveNav() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;

    if (scrollY + windowH >= docH - 2) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const lastLink = document.querySelector(
        `.sidebar__link[href="#${sections[sections.length - 1].id}"]`
      );
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
    const activeLink = document.querySelector(
      `.sidebar__link[href="#${current.id}"]`
    );
    if (activeLink) activeLink.classList.add("active");
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // Scroll Reveal
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal--left, .reveal--right, .reveal--scale, .reveal-stagger"
  );

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

  // Mobile hamburger toggle
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    sidebar.querySelectorAll(".sidebar__link").forEach((link) => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }
});
