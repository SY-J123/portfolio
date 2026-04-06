const SECTION_IDS = ["home", "skills", "projects", "learning", "contact"];
let isAutoSnapping = false;
let snapLockUntil = 0;
let hasCompletedCoverSnap = false;

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
            <p class="project-card__label">${data.i18n["projects.impact"]}</p>
            <p class="project-card__body">${item.impact}</p>
          </div>
        </div>
        <div class="project-card__tools">
          <p class="project-card__label">${data.i18n["projects.tools"]}</p>
          <div class="project-card__tool-list">
            ${(item.tools || []).map((tool) => `<span class="project-card__tool">${tool}</span>`).join("")}
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

function equalizeContactCards() {
  const container = document.getElementById("contact-links");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(".contact-card"));
  if (!cards.length) return;

  container.style.removeProperty("--contact-card-width");
  cards.forEach((card) => {
    card.style.removeProperty("width");
  });

  if (window.innerWidth <= 768) return;

  const maxWidth = Math.ceil(
    Math.max(...cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return rect.width;
    }))
  );

  container.style.setProperty("--contact-card-width", `${maxWidth}px`);
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
  window.requestAnimationFrame(equalizeContactCards);

  document.documentElement.lang = lang;
}

function updateActiveNav() {
  const navLinks = document.querySelectorAll(".topbar__nav .sidebar__link, .mobile-nav .sidebar__link");
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

function updateTopbarState() {
  const topbar = document.getElementById("topbar");
  const cover = document.getElementById("cover");

  if (!cover) return;

  const coverHeight = cover.offsetHeight || window.innerHeight;
  const start = coverHeight * 0.72;
  const end = coverHeight * 0.96;
  const rawProgress = (window.scrollY - start) / Math.max(end - start, 1);
  const progress = Math.min(Math.max(rawProgress, 0), 1);
  const coverProgress = Math.min(Math.max(window.scrollY / Math.max(coverHeight * 0.9, 1), 0), 1);

  cover.style.setProperty("--cover-progress", coverProgress.toFixed(3));

  if (!topbar) return;

  topbar.style.setProperty("--topbar-progress", progress.toFixed(3));
  topbar.classList.toggle("topbar--visible", progress > 0.02);
}

function initCoverSnap() {
  const cover = document.getElementById("cover");
  const home = document.getElementById("home");

  if (!cover || !home) return;

  const handleCoverSnap = () => {
    if (window.innerWidth <= 768) return;
    if (isAutoSnapping) return;
    if (Date.now() < snapLockUntil) return;
    if (hasCompletedCoverSnap) return;

    const scrollY = window.scrollY;
    const coverHeight = cover.offsetHeight || window.innerHeight;
    const start = coverHeight * 0.12;
    const end = coverHeight * 0.42;

    if (scrollY >= start && scrollY <= end) {
      isAutoSnapping = true;
      hasCompletedCoverSnap = true;
      snapLockUntil = Date.now() + 1400;

      window.scrollTo({
        top: home.offsetTop,
        behavior: "smooth",
      });

      window.setTimeout(() => {
        isAutoSnapping = false;
      }, 900);

      window.removeEventListener("wheel", handleCoverSnap);
      window.removeEventListener("touchmove", handleCoverSnap);
    }
  };

  window.addEventListener("wheel", handleCoverSnap, { passive: true });
  window.addEventListener("touchmove", handleCoverSnap, { passive: true });
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
  const mobileNav = document.getElementById("mobile-nav");

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll(".sidebar__link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

function initLangToggle(currentLang) {
  const langToggles = document.querySelectorAll("#lang-toggle, #mobile-lang-toggle");
  if (!langToggles.length) return;

  document.querySelectorAll(".lang-toggle__option").forEach((option) => {
    option.classList.toggle("active", option.dataset.lang === currentLang);
  });

  langToggles.forEach((langToggle) => {
    langToggle.addEventListener("click", (event) => {
      const option = event.target.closest("[data-lang]");
      if (option && option.dataset.lang !== currentLang) {
        syncLangUrl(option.dataset.lang);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const currentLang = getLangFromUrl();

  renderPage(currentLang);
  initLangToggle(currentLang);
  initReveal();
  initMobileMenu();
  initCoverSnap();

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("scroll", updateTopbarState, { passive: true });
  window.addEventListener("resize", updateTopbarState);
  window.addEventListener("resize", equalizeContactCards);
  updateActiveNav();
  updateTopbarState();
  equalizeContactCards();
});
