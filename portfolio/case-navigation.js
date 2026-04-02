document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("case-page")) return;

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

      if (visible) {
        setActive(visible.target.id);
      }
    },
    {
      threshold: [0.35, 0.55, 0.75],
      rootMargin: "-10% 0px -18% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sections[0].id);
});
