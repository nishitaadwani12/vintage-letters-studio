// Home page (editorial): full-bleed alternating category story sections + best-sellers.
(function () {
  "use strict";
  const D = window.ASLI;

  // Category story sections - alternating, scroll-revealed.
  const stories = document.getElementById("stories");
  if (stories) {
    stories.innerHTML = D.CATEGORIES.map((c, i) => {
      const n = String(i + 1).padStart(2, "0");
      return `
      <section class="story${i % 2 ? " story-reverse" : ""} reveal" style="--accent:${c.accent}">
        <div class="story-media tilt">
          <img class="story-photo" src="${c.img}" alt="${c.name}" loading="lazy" />
        </div>
        <div class="story-text">
          <span class="story-num">${n}</span>
          <p class="story-kicker">${c.kicker}</p>
          <h2 class="story-title">${c.name}</h2>
          <p class="story-tagline">${c.tagline}</p>
          <a class="story-link" href="shop.html?cat=${c.slug}">Explore ${shortName(c.slug)} <span>&rarr;</span></a>
        </div>
      </section>`;
    }).join("");
    // Observe the freshly-injected sections for scroll reveal.
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
        { threshold: 0.15 }
      );
      stories.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    } else {
      stories.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
    }
  }

  const bestGrid = document.getElementById("bestGrid");
  if (bestGrid) bestGrid.innerHTML = D.PRODUCTS.filter((p) => p.bestseller).map(D.productCardHTML).join("");

  // Subtle 3D cursor-parallax on the editorial hero headline.
  const hero = document.querySelector(".ed-hero");
  const display = document.querySelector(".ed-display");
  const okMotion = !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const hoverCapable = !(window.matchMedia && matchMedia("(hover: none)").matches);
  const orbs = hero && hero.querySelector(".ed-orbs");
  if (hero && display && okMotion && hoverCapable) {
    hero.addEventListener("pointermove", (e) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      display.style.setProperty("--ry", (px * 5).toFixed(2) + "deg");
      display.style.setProperty("--rx", (-py * 3).toFixed(2) + "deg");
      if (orbs) orbs.style.transform = `translate(${(px * -34).toFixed(1)}px, ${(py * -28).toFixed(1)}px)`;
    });
    hero.addEventListener("pointerleave", () => {
      display.style.setProperty("--ry", "0deg");
      display.style.setProperty("--rx", "0deg");
      if (orbs) orbs.style.transform = "";
    });
  }

  function shortName(slug) {
    return { letters: "letters", flowers: "pressed flowers", boxes: "gift boxes" }[slug] || "the collection";
  }
})();
