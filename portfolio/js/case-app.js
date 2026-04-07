import { CASE_LABELS, caseContent } from "../data/cases.js";

function getLang() {
  const bodyLang = document.body.dataset.lang;
  if (bodyLang === "ko" || bodyLang === "en") return bodyLang;

  const path = window.location.pathname.toLowerCase();
  const segments = path.split("/").filter(Boolean);
  if (segments.includes("en")) return "en";
  if (segments.includes("ko")) return "ko";

  const params = new URLSearchParams(window.location.search);
  return params.get("lang") === "en" ? "en" : "ko";
}

function getCaseSlug() {
  return document.body.dataset.case || "";
}

function getHomeHref(lang) {
  const path = window.location.pathname.toLowerCase();
  const segments = path.split("/").filter(Boolean);
  const nestedCaseRoute = segments.includes("cases") && (segments.includes("ko") || segments.includes("en"));
  const prefix = nestedCaseRoute ? "../../" : "../";
  return `${prefix}${lang === "en" ? "en" : "kr"}/`;
}

function setMeta(name, content) {
  const element = document.querySelector(`meta[name="${name}"]`);
  if (element) element.setAttribute("content", content);
}

function setProperty(property, content) {
  const element = document.querySelector(`meta[property="${property}"]`);
  if (element) element.setAttribute("content", content);
}

function renderSection(section) {
  const items = (section.items || []).map((item) => `<li>${item}</li>`).join("");
  const link = section.link
    ? `<p><a href="${section.link.href}" target="_blank" rel="noopener noreferrer">${section.link.label}</a></p>`
    : "";

  return `
    <section class="case-section" id="${section.id}">
      <h2 class="case-section__title">${section.title}</h2>
      <ul>${items}</ul>
      ${link}
    </section>
  `;
}

function renderToc(sections) {
  return sections
    .map(
      (section, index) => `
        <a class="case-toc__link" href="#${section.id}"><span>${String(index + 1).padStart(2, "0")}</span>${section.title}</a>
      `
    )
    .join("");
}

function initToc() {
  const tocLinks = Array.from(document.querySelectorAll(".case-toc__link"));
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!tocLinks.length || !sections.length) return;

  const setActive = (id) => {
    tocLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActive(visible.target.id);
    },
    {
      threshold: [0.35, 0.55, 0.75],
      rootMargin: "-10% 0px -18% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sections[0].id);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("case-page")) return;

  const lang = getLang();
  const slug = getCaseSlug();
  const labels = CASE_LABELS[lang];
  const data = caseContent[slug]?.[lang];

  if (!data) return;

  document.documentElement.lang = lang;
  document.title = `${data.title} - Siyoung Jang`;
  setMeta("description", data.description);
  setMeta("twitter:title", data.title);
  setMeta("twitter:description", data.description);
  setProperty("og:title", data.title);
  setProperty("og:description", data.description);

  const homeHref = getHomeHref(lang);

  document.getElementById("case-home-link").setAttribute("href", homeHref);
  document.getElementById("case-home-link").textContent = `← ${labels.home}`;
  document.getElementById("case-title").textContent = data.title;
  document.getElementById("case-meta").textContent = data.meta;
  document.getElementById("case-headline").textContent = data.headline;
  document.getElementById("case-sections").innerHTML = data.sections.map(renderSection).join("");
  document.getElementById("case-back-link").setAttribute("href", homeHref);
  document.getElementById("case-back-link").textContent = `← ${labels.back}`;
  document.getElementById("case-outline-label").textContent = labels.outline;
  document.getElementById("case-toc-nav").innerHTML = renderToc(data.sections);

  initToc();
});
