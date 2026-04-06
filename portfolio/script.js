const SECTION_IDS = ["home", "skills", "projects", "learning", "contact"];

function renderList(containerId, items, renderItem) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(renderItem).join("");
}

function getLangFromUrl() {
  const path = window.location.pathname.toLowerCase();
  const segments = path.split("/").filter(Boolean);

  if (segments.includes("en")) return "en";
  if (segments.includes("kr")) return "ko";

  const params = new URLSearchParams(window.location.search);
  return params.get("lang") === "en" ? "en" : "ko";
}

function syncLangUrl(lang) {
  const currentUrl = new URL(window.location.href);
  const segments = currentUrl.pathname.split("/").filter(Boolean);
  const targetSegment = lang === "en" ? "en" : "kr";
  const langIndex = segments.findIndex((segment) => segment === "en" || segment === "kr");

  if (langIndex >= 0) {
    segments[langIndex] = targetSegment;
  } else {
    segments.push(targetSegment);
  }

  currentUrl.pathname = `/${segments.join("/")}/`;
  window.location.href = currentUrl.toString();
}

function applyTranslations(data) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (data.i18n[key]) {
      element.textContent = data.i18n[key];
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    const mappings = element.getAttribute("data-i18n-attr");
    if (!mappings) return;

    mappings.split(",").forEach((mapping) => {
      const [attr, key] = mapping.split(":").map((part) => part.trim());
      if (attr && key && data.i18n[key]) {
        element.setAttribute(attr, data.i18n[key]);
      }
    });
  });
}

function renderHero(data) {
  renderList("home-summary", data.summary, (item) => `<p>${item}</p>`);
  renderList("home-work-badges", data.strengths, (item) => `<span class="work-preview-badge">${item.title}</span>`);
}

function renderSkills(data) {
  renderList(
    "skill-grid",
    data.skills,
    (item) => `
      <article class="skill-story">
        <h3 class="skill-story__name">${item.name}</h3>
        <p class="skill-story__detail">${item.detail}</p>
      </article>
    `
  );
}

function renderProjects(data) {
  renderList(
    "project-list",
    data.projects,
    (item) => `
      <a class="project-card" href="${item.href}">
        <h3 class="project-card__title">${item.title}</h3>
        <p class="project-card__meta">${item.meta}</p>
        <div class="project-card__sections">
          <div class="project-card__section">
            <p class="project-card__label">${data.i18n["projects.problem"]}</p>
            <p class="project-card__body">${item.problem}</p>
          </div>
          <div class="project-card__section">
            <p class="project-card__label">${data.i18n["projects.approach"]}</p>
            <p class="project-card__body">${item.approach}</p>
          </div>
          <div class="project-card__section">
            <p class="project-card__label">${data.i18n["projects.impact"]}</p>
            <p class="project-card__body">${item.impact}</p>
          </div>
        </div>
        <span class="project-card__link">${item.cta} →</span>
      </a>
    `
  );
}

function renderLearning(data) {
  renderList(
    "learning-grid",
    data.learning,
    (item) => `
      <article class="learning-card">
        <h3 class="learning-card__title">${item.name}</h3>
        <p class="learning-card__detail">${item.detail}</p>
      </article>
    `
  );
}

function renderContact(data) {
  renderList(
    "contact-links",
    data.contactLinks,
    (item) => `
      ${item.href
        ? `<a class="contact-card" href="${item.href}">
            <span class="contact-card__label">${item.label}</span>
            <span class="contact-card__value">${item.value}</span>
          </a>`
        : `<div class="contact-card">
            <span class="contact-card__label">${item.label}</span>
            <span class="contact-card__value">${item.value}</span>
          </div>`}
    `
  );
}

function renderPage(lang) {
  const data = portfolioContent[lang];

  if (!data) return;

  renderHero(data);
  renderSkills(data);
  renderProjects(data);
  renderLearning(data);
  renderContact(data);
  applyTranslations(data);

  document.documentElement.lang = lang;
}

function updateActiveNav() {
  const navLinks = document.querySelectorAll(".sidebar__link");
  const sections = SECTION_IDS
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const scrollY = window.scrollY;
  const windowH = window.innerHeight;
  const docH = document.documentElement.scrollHeight;

  if (!sections.length) return;

  let current = sections[0];

  if (scrollY + windowH >= docH - 2) {
    current = sections[sections.length - 1];
  } else {
    sections.forEach((section) => {
      if (section.offsetTop - 120 <= scrollY) {
        current = section;
      }
    });
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
}

function initReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal--left, .reveal--right, .reveal--scale, .reveal-stagger");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  if (!hamburger || !sidebar) return;

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

function initLangToggle(currentLang) {
  const langToggle = document.getElementById("lang-toggle");
  if (!langToggle) return;

  document.querySelectorAll(".lang-toggle__option").forEach((option) => {
    option.classList.toggle("active", option.dataset.lang === currentLang);
  });

  langToggle.addEventListener("click", (event) => {
    const option = event.target.closest("[data-lang]");
    if (option && option.dataset.lang !== currentLang) {
      syncLangUrl(option.dataset.lang);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const currentLang = getLangFromUrl();

  renderPage(currentLang);
  initLangToggle(currentLang);
  initReveal();
  initMobileMenu();

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();
});
