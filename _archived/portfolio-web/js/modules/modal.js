let activeProjectIndex = 0;
let activeProjectData = null;
let activeLangData = null;

function createModalShell() {
  if (document.getElementById("project-modal")) return;

  const modalRoot = document.createElement("div");
  modalRoot.id = "project-modal";
  modalRoot.className = "project-modal";
  modalRoot.setAttribute("hidden", "hidden");
  modalRoot.innerHTML = `
    <div class="project-modal__backdrop" data-project-close="true"></div>
    <div class="project-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button class="project-modal__close" type="button" data-project-close="true" aria-label="Close">&times;</button>
      <div class="project-modal__nav">
        <button class="project-modal__arrow" type="button" id="project-modal-prev" aria-label="Previous project">&lsaquo;</button>
        <button class="project-modal__arrow" type="button" id="project-modal-next" aria-label="Next project">&rsaquo;</button>
      </div>
      <div class="project-modal__content">
        <p class="project-modal__eyebrow" id="project-modal-count"></p>
        <div class="project-modal__deck" id="project-modal-sections"></div>
      </div>
    </div>
  `;

  document.body.appendChild(modalRoot);
}

function getModalElements() {
  return {
    root: document.getElementById("project-modal"),
    count: document.getElementById("project-modal-count"),
    sections: document.getElementById("project-modal-sections"),
    prev: document.getElementById("project-modal-prev"),
    next: document.getElementById("project-modal-next"),
    close: document.querySelector(".project-modal__close"),
  };
}

function getItems(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function renderList(items) {
  return `<ul class="project-modal__list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderCoverSlide(project) {
  const summary = project.summary ? `<p class="project-modal__summary">${project.summary}</p>` : "";
  const tools = (project.tools || []).length
    ? `
      <div class="project-modal__tools">
        ${(project.tools || []).map((tool) => `<span class="project-modal__tool">${tool}</span>`).join("")}
      </div>
    `
    : "";

  return `
    <section class="project-modal__slide project-modal__slide--cover" aria-labelledby="project-modal-title">
      <div class="project-modal__cover-mark">Overview</div>
      <div class="project-modal__cover-body">
        <p class="project-modal__slide-index">Slide 01</p>
        <h3 class="project-modal__title" id="project-modal-title">${project.title}</h3>
        <p class="project-modal__meta">${project.meta}</p>
        ${summary}
      </div>
      ${tools}
    </section>
  `;
}

function renderSectionSlide(label, items, index) {
  const safeItems = getItems(items);
  if (!safeItems.length) return "";

  return `
    <section class="project-modal__slide" aria-label="${label}">
      <div class="project-modal__slide-header">
        <p class="project-modal__slide-index">Slide ${String(index).padStart(2, "0")}</p>
        <p class="project-modal__label">${label}</p>
      </div>
      <div class="project-modal__slide-body">
        ${renderList(safeItems)}
      </div>
    </section>
  `;
}

function renderEmbedSlide(project, index) {
  if (!project.embed?.src) return "";

  return `
    <section class="project-modal__slide project-modal__slide--embed" aria-label="${project.embed.title || "Embedded slide"}">
      <div class="project-modal__slide-header">
        <p class="project-modal__slide-index">Slide ${String(index).padStart(2, "0")}</p>
        <p class="project-modal__label">Embed</p>
      </div>
      <div class="project-modal__slide-body">
        <div class="project-modal__embed-frame">
          <iframe
            src="${project.embed.src}"
            title="${project.embed.title || "Embedded slide"}"
            loading="lazy"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </section>
  `;
}
function renderAppendixSlide(project, labels, index) {
  const appendixItems = getItems(project.appendix);
  if (!appendixItems.length && !project.appendixLink) return "";

  const appendixList = appendixItems.length ? renderList(appendixItems) : "";
  const appendixLink = project.appendixLink
    ? `<a class="project-modal__appendix-link" href="${project.appendixLink.href}" target="_blank" rel="noopener">${project.appendixLink.label}</a>`
    : "";

  return `
    <section class="project-modal__slide project-modal__slide--appendix" aria-label="${labels["projects.appendix"]}">
      <div class="project-modal__slide-header">
        <p class="project-modal__slide-index">Slide ${String(index).padStart(2, "0")}</p>
        <p class="project-modal__label">${labels["projects.appendix"]}</p>
      </div>
      <div class="project-modal__slide-body">
        ${appendixList}
        ${appendixLink}
      </div>
    </section>
  `;
}

function renderModalContent(index) {
  if (!activeProjectData || !activeLangData) return;

  const project = activeProjectData[index];
  if (!project) return;

  const modal = getModalElements();
  const labels = activeLangData.i18n;
  const slideMarkup = [];
  const isEmbedOnly = Boolean(project.embed?.src);

  modal.root?.classList.toggle("project-modal--embed-only", isEmbedOnly);
  if (modal.count) modal.count.hidden = isEmbedOnly;

  if (isEmbedOnly) {
    slideMarkup.push(renderEmbedSlide(project, 1));
    modal.count.textContent = `${index + 1} / ${activeProjectData.length}`;
    modal.sections.innerHTML = slideMarkup.join("");
    modal.prev?.setAttribute("aria-label", labels["projects.modalPrev"] || "Previous project");
    modal.next?.setAttribute("aria-label", labels["projects.modalNext"] || "Next project");
    modal.close?.setAttribute("aria-label", labels["projects.close"] || "Close");
    return;
  }

  slideMarkup.push(renderCoverSlide(project));

  const sectionEntries = [
    { label: labels["projects.problem"], value: project.problem },
    { label: labels["projects.goal"], value: project.goal },
    { label: labels["projects.approach"], value: project.approach },
    { label: labels["projects.impact"], value: project.impact },
  ].filter((section) => getItems(section.value).length);

  sectionEntries.forEach((section, sectionIndex) => {
    slideMarkup.push(renderSectionSlide(section.label, section.value, sectionIndex + 2));
  });

  const embedSlide = renderEmbedSlide(project, slideMarkup.length + 1);
  if (embedSlide) slideMarkup.push(embedSlide);

  const appendixSlide = renderAppendixSlide(project, labels, slideMarkup.length + 1);
  if (appendixSlide) slideMarkup.push(appendixSlide);

  modal.count.textContent = `${index + 1} / ${activeProjectData.length}`;
  modal.sections.innerHTML = slideMarkup.join("");

  modal.prev?.setAttribute("aria-label", labels["projects.modalPrev"] || "Previous project");
  modal.next?.setAttribute("aria-label", labels["projects.modalNext"] || "Next project");
  modal.close?.setAttribute("aria-label", labels["projects.close"] || "Close");
}

function openProjectModal(index) {
  activeProjectIndex = index;
  const modal = getModalElements();
  renderModalContent(activeProjectIndex);
  if (!modal.root) return;
  modal.root.hidden = false;
  document.body.classList.add("modal-open");
  window.setTimeout(() => modal.close?.focus(), 0);
}

function closeProjectModal() {
  const modal = getModalElements();
  if (!modal.root) return;
  modal.root.hidden = true;
  document.body.classList.remove("modal-open");
}

function moveProjectModal(direction) {
  if (!activeProjectData?.length) return;
  const total = activeProjectData.length;
  activeProjectIndex = (activeProjectIndex + direction + total) % total;
  renderModalContent(activeProjectIndex);
}

export function initProjectModal(data) {
  activeProjectData = data.projects;
  activeLangData = data;
  createModalShell();

  document.querySelectorAll("[data-project-index]").forEach((card) => {
    card.addEventListener("click", () => {
      const index = Number(card.getAttribute("data-project-index"));
      openProjectModal(index);
    });
  });

  const modal = getModalElements();
  if (!modal.root || modal.root.dataset.bound === "true") return;

  modal.root.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.projectClose === "true") {
      closeProjectModal();
    }
  });

  modal.prev?.addEventListener("click", () => moveProjectModal(-1));
  modal.next?.addEventListener("click", () => moveProjectModal(1));

  document.addEventListener("keydown", (event) => {
    if (modal.root?.hidden) return;
    if (event.key === "Escape") closeProjectModal();
    if (event.key === "ArrowLeft") moveProjectModal(-1);
    if (event.key === "ArrowRight") moveProjectModal(1);
  });

  modal.root.dataset.bound = "true";
}




