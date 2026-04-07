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
        <h3 class="project-modal__title" id="project-modal-title"></h3>
        <p class="project-modal__meta" id="project-modal-meta"></p>
        <div class="project-modal__tools" id="project-modal-tools"></div>
        <div class="project-modal__sections" id="project-modal-sections"></div>
      </div>
    </div>
  `;

  document.body.appendChild(modalRoot);
}

function getModalElements() {
  return {
    root: document.getElementById("project-modal"),
    count: document.getElementById("project-modal-count"),
    title: document.getElementById("project-modal-title"),
    meta: document.getElementById("project-modal-meta"),
    tools: document.getElementById("project-modal-tools"),
    sections: document.getElementById("project-modal-sections"),
    prev: document.getElementById("project-modal-prev"),
    next: document.getElementById("project-modal-next"),
    close: document.querySelector(".project-modal__close"),
  };
}

function renderAppendix(project, labels) {
  const appendixItems = Array.isArray(project.appendix) ? project.appendix : [];
  if (!appendixItems.length && !project.appendixLink) return "";

  const appendixList = appendixItems.length
    ? `<ul class="project-modal__list">${appendixItems.map((item) => `<li>${item}</li>`).join("")}</ul>`
    : "";

  const appendixLink = project.appendixLink
    ? `<a class="project-modal__appendix-link" href="${project.appendixLink.href}" target="_blank" rel="noopener">${project.appendixLink.label}</a>`
    : "";

  return `
    <div class="project-modal__group project-modal__group--appendix">
      <p class="project-modal__label">${labels["projects.appendix"]}</p>
      ${appendixList}
      ${appendixLink}
    </div>
  `;
}

function renderModalContent(index) {
  if (!activeProjectData || !activeLangData) return;

  const project = activeProjectData[index];
  if (!project) return;

  const modal = getModalElements();
  const labels = activeLangData.i18n;
  const sections = [
    { label: labels["projects.problem"], value: project.problem },
    { label: labels["projects.goal"], value: project.goal },
    { label: labels["projects.approach"], value: project.approach },
    { label: labels["projects.impact"], value: project.impact },
  ].filter((section) => section.value && (Array.isArray(section.value) ? section.value.length : true));

  modal.count.textContent = `${index + 1} / ${activeProjectData.length}`;
  modal.title.textContent = project.title;
  modal.meta.textContent = project.meta;
  modal.tools.innerHTML = (project.tools || []).map((tool) => `<span class="project-modal__tool">${tool}</span>`).join("");
  modal.sections.innerHTML = `
    <section class="project-modal__section">
      ${sections.map((section) => {
        const items = Array.isArray(section.value) ? section.value : [section.value];
        return `
          <div class="project-modal__group">
            <p class="project-modal__label">${section.label}</p>
            <ul class="project-modal__list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
        `;
      }).join("")}
      ${renderAppendix(project, labels)}
    </section>
  `;

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
