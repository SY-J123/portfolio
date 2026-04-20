export const SECTION_IDS = ["home", "skills", "projects", "learning", "contact"];

export function renderList(containerId, items, renderItem) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(renderItem).join("");
}

export function getLangFromUrl() {
  const path = window.location.pathname.toLowerCase();
  const segments = path.split("/").filter(Boolean);

  if (segments.includes("en")) return "en";
  if (segments.includes("kr")) return "ko";

  const params = new URLSearchParams(window.location.search);
  return params.get("lang") === "en" ? "en" : "ko";
}

export function syncLangUrl(lang) {
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

export function applyTranslations(data) {
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

export function equalizeContactCards() {
  const container = document.getElementById("contact-links");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(".contact-card"));
  if (!cards.length) return;

  container.style.removeProperty("--contact-card-width");
  cards.forEach((card) => card.style.removeProperty("width"));

  if (window.innerWidth <= 768) return;

  const maxWidth = Math.ceil(
    Math.max(
      ...cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return rect.width;
      })
    )
  );

  container.style.setProperty("--contact-card-width", `${maxWidth}px`);
}
