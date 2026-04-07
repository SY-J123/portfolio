import { renderList } from "./utils.js";

export function renderHero(data) {
  renderList("home-summary", data.summary, (item) => `<p>${item}</p>`);
  renderList("home-work-badges", data.strengths, (item) => `<span class="work-preview-badge">${item.title}</span>`);
}

export function renderSkills(data) {
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

export function renderProjects(data) {
  renderList(
    "project-list",
    data.projects,
    (item, index) => `
      <button class="project-card project-card--compact" type="button" data-project-index="${index}">
        <h3 class="project-card__title">${item.title}</h3>
        <p class="project-card__meta">${item.meta}</p>
        <div class="project-card__meta-list">
          <div class="project-card__meta-item">
            <p class="project-card__label">${data.i18n["projects.impact"]}</p>
            <ul class="project-card__impact-list">${(Array.isArray(item.impact) ? item.impact : [item.impact]).map((impact) => `<li class="project-card__impact-item">${impact}</li>`).join("")}</ul>
          </div>
        </div>
        <div class="project-card__tools">
          <p class="project-card__label">${data.i18n["projects.tools"]}</p>
          <div class="project-card__tool-list">
            ${(item.tools || []).map((tool) => `<span class="project-card__tool">${tool}</span>`).join("")}
          </div>
        </div>
        <span class="project-card__link">${item.cta} &rarr;</span>
      </button>
    `
  );
}

export function renderLearning(data) {
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

export function renderContact(data) {
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
