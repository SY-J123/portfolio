const resumeContent = {
  headerMeta: [
    {
      label: "Email",
      href: "mailto:jsyoung456@gmail.com",
      text: "jsyoung456@gmail.com",
    },
    {
      label: "GitHub",
      href: "https://github.com/example",
      text: "github.com/example",
      external: true,
    },
    {
      label: "Location",
      text: "Seoul, Korea",
    },
    {
      label: "Resume PDF",
      href: "#",
      text: "Open Resume",
    },
  ],
  summary: [
    "복잡한 문제의 핵심을 정의하고, 팀이 같은 방향으로 실행할 수 있는 구조로 바꾸는 서비스 기획자입니다.",
    "B2C 모바일 웹과 게임 도메인에서 문제 정의, UX 흐름 설계, 문서 구조화, 협업 프로세스 개선을 중심으로 일해왔습니다.",
    "최근에는 AI-assisted workflow와 데이터 기반 판단 역량을 함께 확장하며 더 정교한 제품 설계를 만들어가고 있습니다.",
  ],
  experience: [
    {
      company: "Natris",
      role: "Service Planner",
      period: "2024.04 - Present",
      summary: "B2C 모바일 웹 포커 게임의 기능 기획, UX 흐름 설계, 협업 문서 구조 설계를 담당.",
      highlights: [
        "AI 기반 프로토타이핑과 문서 구조 재설계를 통해 이해관계자 수를 3명에서 1명으로 줄임.",
        "업무 리드타임을 1~2주에서 3~4일 수준으로 단축.",
        "문서 중심 협업의 병목을 구조적 문제로 재정의하고 PRD와 프로토타입 병행 방식을 정착시킴.",
      ],
    },
    {
      company: "Anthurus Lab Korea",
      role: "Operations",
      period: "2023.08 - 2024.04",
      summary: "GGPoker 토너먼트 운영팀에서 스케줄 관리, 지표 모니터링, 해외 지사 커뮤니케이션을 담당.",
      highlights: [
        "시즌과 타겟에 맞춰 스케줄과 개런티를 조정하며 운영 구조를 최적화.",
        "오버레이가 크게 발생했던 운영 건에서 팔로업과 모니터링을 통해 손실 폭을 절반 이상 감소.",
      ],
    },
    {
      company: "Me2on",
      role: "Operations",
      period: "2023.08 - 2024.08",
      summary: "Fullhouse Casino 소셜 카지노 게임 운영과 해외 지사 커뮤니케이션 실무를 담당.",
      highlights: [
        "글로벌 운영 협업의 기본 구조와 커뮤니케이션 방식을 실무에서 경험.",
        "운영 중심 경력의 출발점으로 이후 제품과 기획 관점 확장의 기반을 마련.",
      ],
    },
  ],
  projects: [
    {
      tag: "Project 01",
      title: "Project Title Placeholder",
      meta: "Role Placeholder | Period Placeholder",
      thumbnailLabel: "Thumbnail Placeholder",
      description:
        "프로젝트의 핵심 문제, 접근 방식, 결과를 2~3줄 정도로 요약하는 placeholder 문장입니다.",
      href: "case-ai-doc-process.html",
      cta: "View Project",
    },
    {
      tag: "Project 02",
      title: "Project Title Placeholder",
      meta: "Role Placeholder | Status Placeholder",
      thumbnailLabel: "Thumbnail Placeholder",
      description:
        "현재 진행 중인 프로젝트나 별도 케이스 스터디로 연결할 프로젝트 설명을 넣는 placeholder 문장입니다.",
      href: "case-lobby-redesign.html",
      cta: "View Project",
    },
    {
      tag: "Project 03",
      title: "Project Title Placeholder",
      meta: "Role Placeholder | Impact Placeholder",
      thumbnailLabel: "Thumbnail Placeholder",
      description:
        "추가 프로젝트가 들어갈 경우를 위한 placeholder 카드입니다. 필요한 만큼 카드 수를 늘려 사용할 수 있습니다.",
      href: "#",
      cta: "View Project",
    },
    {
      tag: "Project 04",
      title: "Project Title Placeholder",
      meta: "Role Placeholder | Link Placeholder",
      thumbnailLabel: "Thumbnail Placeholder",
      description:
        "프로젝트 상세 페이지 또는 외부 링크로 이동할 수 있는 카드 구조를 가정한 placeholder 문장입니다.",
      href: "#",
      cta: "View Project",
    },
  ],
  skills: [
    "English",
    "Python",
    "SQL",
    "Markdown",
    "HTML",
    "Notion",
    "Claude Code",
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
};

function renderList(containerId, items, renderItem) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  container.innerHTML = items.map(renderItem).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderList(
    "header-meta",
    resumeContent.headerMeta,
    (item) => `
      <li>
        <span>${item.label}</span>
        ${item.href
          ? `<a href="${item.href}"${item.external ? ' target="_blank" rel="noopener"' : ""}>${item.text}</a>`
          : `<strong>${item.text}</strong>`}
      </li>
    `
  );

  renderList(
    "summary-body",
    resumeContent.summary,
    (item) => `<p>${item}</p>`
  );

  renderList(
    "experience-list",
    resumeContent.experience,
    (item) => `
      <article class="resume-item">
        <div class="resume-item__header">
          <div>
            <h3 class="resume-item__title">${item.company}</h3>
            <p class="resume-item__role">${item.role}</p>
          </div>
          <p class="resume-item__period">${item.period}</p>
        </div>
        <p class="resume-item__summary">${item.summary}</p>
        <ul class="resume-item__highlights">
          ${item.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
        </ul>
      </article>
    `
  );

  renderList(
    "project-list",
    resumeContent.projects,
    (item) => `
      <a class="project-card" href="${item.href}">
        <div class="project-card__thumbnail" aria-hidden="true">
          <span class="project-card__thumbnail-label">${item.thumbnailLabel}</span>
          <span class="project-card__thumbnail-cta">Click to open</span>
        </div>
        <span class="project-card__tag">${item.tag}</span>
        <h3 class="project-card__title">${item.title}</h3>
        <p class="project-card__meta">${item.meta}</p>
        <p class="project-card__description">${item.description}</p>
        <span class="project-card__link">${item.cta}</span>
      </a>
    `
  );

  renderList(
    "skill-grid",
    resumeContent.skills,
    (item) => `<li class="skill-chip">${item}</li>`
  );

  renderList(
    "education-list",
    resumeContent.education,
    (item) => `
      <article class="resume-side-item">
        <h3>${item.school}</h3>
        <p>${item.major}</p>
        <p>${item.period}${item.note ? ` | ${item.note}` : ""}</p>
      </article>
    `
  );

  renderList(
    "certification-list",
    resumeContent.certifications,
    (item) => `<li>${item}</li>`
  );
});
