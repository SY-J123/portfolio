import portfolioContent from "../data/content.js";
import { applyTranslations, equalizeContactCards, getLangFromUrl } from "./modules/utils.js";
import { renderContact, renderHero, renderLearning, renderProjects, renderSkills } from "./modules/render.js";
import { initProjectModal } from "./modules/modal.js";
import { initCoverSnap, initLangToggle, initMobileMenu, initReveal, updateActiveNav, updateTopbarState } from "./modules/interactions.js";

function renderPage(lang) {
  const data = portfolioContent[lang];
  if (!data) return;

  renderHero(data);
  renderSkills(data);
  renderProjects(data);
  renderLearning(data);
  renderContact(data);
  applyTranslations(data);
  initProjectModal(data);
  window.requestAnimationFrame(equalizeContactCards);

  document.documentElement.lang = lang;
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
