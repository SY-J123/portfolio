const portfolioContent = {
  heroStats: [
    {
      value: "3명 → 1명",
      label: "협업 투입 인원 축소",
    },
    {
      value: "1~2주 → 3~4일",
      label: "핸드오프 리드타임 단축",
    },
    {
      value: "PM / Planner",
      label: "문제 정의와 UX 흐름 설계 중심",
    },
    {
      value: "AI-assisted",
      label: "기획 검토와 프로토타입 제작 워크플로우",
    },
  ],
  headerMeta: [
    {
      label: "Email",
      href: "mailto:jsyoung456@gmail.com",
      text: "jsyoung456@gmail.com",
    },
    {
      label: "GitHub",
      href: "https://github.com/SY-J123/portfolio",
      text: "github.com/SY-J123/portfolio",
      external: true,
    },
    {
      label: "Location",
      text: "Seoul, Korea",
    },
  ],
  summary: [
    "저는 화면보다 먼저 문제의 본질을 정의하는 서비스 기획자입니다. 주어진 요구를 그대로 정리하기보다 그 일이 왜 필요한지, 어떤 사용자 가치로 연결되는지를 먼저 확인합니다.",
    "기획 문서를 쓰는 데서 멈추지 않고 사용자 흐름, 예외 케이스, 전달 구조를 함께 설계해 디자이너와 개발자가 바로 움직일 수 있는 상태를 만드는 데 강점이 있습니다.",
    "최근에는 AI를 단순 보조 도구가 아니라 실무 전달 구조를 더 빠르고 명확하게 만드는 수단으로 활용하며, 기획자가 직접 검토 가능한 프로토타입까지 연결하는 방식을 실험하고 있습니다.",
  ],
  strengths: [
    {
      title: "Problem Definition",
      description:
        "표면적인 불편을 바로 해결하기보다 왜 같은 문제가 반복되는지 구조적으로 해석하고, 팀이 공감할 수 있는 문제로 다시 정의합니다.",
    },
    {
      title: "UX Flow Design",
      description:
        "사용자의 불편과 서비스가 유도하는 방향이 어긋나지 않는지 점검하며, 목적에 맞는 흐름과 화면 구조를 설계합니다.",
    },
    {
      title: "Collaboration Structure",
      description:
        "문서, 화면, 리뷰 기준을 분리해서 관리하기보다 한 번에 연결해 협업 왕복을 줄이고 실행 속도를 높이는 방식을 만듭니다.",
    },
    {
      title: "Self-directed Improvement",
      description:
        "필요하다고 판단한 문제는 먼저 시도해보고, 시행착오를 거쳐 실무에 맞는 기준으로 계속 보완합니다.",
    },
  ],
  experience: [
    {
      company: "Natris / LULU.AI",
      role: "Service Planner",
      period: "2024.04 - Present",
      summary:
        "B2C 모바일 웹 포커 게임에서 기능 기획, UX 흐름 설계, 협업 문서 구조 개선을 담당했습니다.",
      highlights: [
        "문서 중심 협업의 병목을 구조적 문제로 재정의하고, PRD와 프로토타입을 병행하는 협업 방식을 설계했습니다.",
        "AI 기반 프로세스 개선을 먼저 제안하고 적용해 이해관계자 수를 3명에서 1명으로 줄이고, 핸드오프 준비 리드타임을 1~2주에서 3~4일 수준으로 단축했습니다.",
        "문서 역할과 전달 기준을 정리해 디자이너와 개발자가 바로 실행 가능한 형태로 기획 의도를 연결했습니다.",
      ],
    },
    {
      company: "NSUSLAB Korea",
      role: "Operations",
      period: "2023.08 - 2024.04",
      summary:
        "GGPoker 토너먼트 운영팀에서 스케줄 관리, 지표 모니터링, 해외 지사 및 파트너 커뮤니케이션을 담당했습니다.",
      highlights: [
        "시즌과 타깃에 맞춰 스케줄과 개런티를 조정하며 운영 구조를 더 효율적으로 정리했습니다.",
        "오버레이가 크게 발생했던 운영 건을 집중 모니터링하고 팔로업해 손실 폭을 절반 이상 줄였습니다.",
      ],
    },
    {
      company: "Me2on",
      role: "Operations",
      period: "2023.08 - 2024.08",
      summary:
        "Fullhouse Casino 소셜 카지노 게임 운영과 해외 지사 커뮤니케이션 실무를 담당했습니다.",
      highlights: [
        "글로벌 운영 협업의 기본 구조와 커뮤니케이션 방식을 실무에서 익혔습니다.",
        "운영 현장에서 사용자 흐름과 서비스 구조를 보는 관점을 쌓으며 이후 기획 역할로 확장하는 기반을 만들었습니다.",
      ],
    },
  ],
  projects: [
    {
      tag: "Project 01",
      title: "AI 기반 문서 협업 프로세스 개선",
      meta: "Service Planner | 2024",
      description:
        "문서 작성 문제를 협업 구조 문제로 재정의하고, Markdown PRD와 AI-assisted 프로토타입 workflow를 결합해 검토 속도와 전달 명확도를 높인 사례입니다.",
      href: "case-ai-doc-process.html",
      cta: "Case Study 보기",
    },
    {
      tag: "Project 02",
      title: "텍사스 홀덤 로비 구조 개선",
      meta: "UX Planning | In Progress",
      description:
        "정보 구조와 사용자 흐름 관점에서 로비 경험을 다시 설계하고, 우선순위와 시각적 위계를 재정리하는 프로젝트입니다.",
      href: "case-lobby-redesign.html",
      cta: "진행 내용 보기",
    },
  ],
  skills: [
    "English Communication",
    "SQL",
    "Python",
    "Figma",
    "Vibe Coding Workflow",
    "Claude Code / Codex",
  ],
  education: [
    {
      school: "University of South Dakota",
      major: "Nursing",
      period: "2015.09 - 2016.08",
      note: "중퇴",
    },
    {
      school: "방송통신대학교",
      major: "통계, 데이터학과",
      period: "2023.03 - Present",
    },
  ],
  certifications: ["SQLD", "ADsP"],
  contactLinks: [
    {
      label: "Email",
      value: "jsyoung456@gmail.com",
      href: "mailto:jsyoung456@gmail.com",
    },
    {
      label: "GitHub",
      value: "SY-J123/portfolio",
      href: "https://github.com/SY-J123/portfolio",
      external: true,
    },
    {
      label: "Location",
      value: "Seoul, Korea",
    },
  ],
};

function renderList(containerId, items, renderItem) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(renderItem).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  // Hero stats
  renderList(
    "hero-stat-grid",
    portfolioContent.heroStats,
    (item) => `
      <div class="stat-card">
        <p class="stat-card__value">${item.value}</p>
        <p class="stat-card__label">${item.label}</p>
      </div>
    `
  );

  // Profile meta (in Contact)
  renderList(
    "header-meta",
    portfolioContent.headerMeta,
    (item) => `
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
    `
  );

  // Summary
  renderList(
    "summary-body",
    portfolioContent.summary,
    (item) => `<p>${item}</p>`
  );

  // Projects
  renderList(
    "project-list",
    portfolioContent.projects,
    (item) => `
      <a class="project-card" href="${item.href}">
        <span class="project-card__tag">${item.tag}</span>
        <h3 class="project-card__title">${item.title}</h3>
        <p class="project-card__meta">${item.meta}</p>
        <p class="project-card__description">${item.description}</p>
        <span class="project-card__link">${item.cta} →</span>
      </a>
    `
  );

  // Experience (timeline)
  renderList(
    "experience-list",
    portfolioContent.experience,
    (item) => `
      <article class="timeline-item">
        <span class="timeline-item__period">${item.period}</span>
        <p class="timeline-item__role">${item.role}</p>
        <h3 class="timeline-item__company">${item.company}</h3>
        <p class="timeline-item__summary">${item.summary}</p>
        <ul class="timeline-item__highlights">
          ${item.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
      </article>
    `
  );

  // Strengths
  renderList(
    "strength-grid",
    portfolioContent.strengths,
    (item) => `
      <article class="strength-card">
        <h3 class="strength-card__title">${item.title}</h3>
        <p class="strength-card__description">${item.description}</p>
      </article>
    `
  );

  // Skills
  renderList(
    "skill-grid",
    portfolioContent.skills,
    (item) => `<li class="skill-chip">${item}</li>`
  );

  // Education
  renderList(
    "education-list",
    portfolioContent.education,
    (item) => `
      <article class="edu-item">
        <h3>${item.school}</h3>
        <p>${item.major}</p>
        <p>${item.period}${item.note ? ` | ${item.note}` : ""}</p>
      </article>
    `
  );

  // Certifications
  renderList(
    "certification-list",
    portfolioContent.certifications,
    (item) => `<li>${item}</li>`
  );

  // Contact
  renderList(
    "contact-links",
    portfolioContent.contactLinks,
    (item) => `
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
    `
  );

  // Sidebar active link on scroll
  const sections = document.querySelectorAll(".section[id]");
  const navLinks = document.querySelectorAll(".sidebar__link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(
            `.sidebar__link[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -60% 0px" }
  );

  sections.forEach((section) => observer.observe(section));

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
      sidebar.classList.toggle("open");
    });

    // Close sidebar on link click (mobile)
    sidebar.querySelectorAll(".sidebar__link").forEach((link) => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("open");
      });
    });
  }
});
