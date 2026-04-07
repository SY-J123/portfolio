import { SECTION_IDS, syncLangUrl } from "./utils.js";

let isAutoSnapping = false;
let snapLockUntil = 0;
let hasCompletedCoverSnap = false;

export function updateActiveNav() {
  const navLinks = document.querySelectorAll(".topbar__nav .sidebar__link, .mobile-nav .sidebar__link");
  const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);

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

export function updateTopbarState() {
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

export function initCoverSnap() {
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

      window.scrollTo({ top: home.offsetTop, behavior: "smooth" });

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

export function initReveal() {
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

export function initMobileMenu() {
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

export function initLangToggle(currentLang) {
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
