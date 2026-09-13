// Elegant 3D tilt: elements with class "tilt" lean toward the cursor in
// perspective, with a soft lift. Works on dynamically-rendered cards.
// Disabled for touch and reduced-motion users.
(function () {
  "use strict";
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia && matchMedia("(hover: none)").matches) return;

  const MAX = 7; // max degrees of tilt
  const bound = new WeakSet();

  function bind(el) {
    if (bound.has(el)) return;
    bound.add(el);
    let raf = 0;
    // A cursor-tracking light sweep (skipped on <img>, which can't hold children).
    let glare = null;
    if (el.tagName !== "IMG") {
      glare = document.createElement("span");
      glare.className = "tilt-glare";
      el.appendChild(glare);
    }
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform =
          `perspective(900px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg) translateY(-6px) scale(1.02)`;
        if (glare) {
          glare.style.opacity = "1";
          glare.style.background =
            `radial-gradient(circle at ${((px + 0.5) * 100).toFixed(0)}% ${((py + 0.5) * 100).toFixed(0)}%, rgba(255,255,255,0.35), transparent 55%)`;
        }
      });
    });
    el.addEventListener("pointerleave", () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
      if (glare) glare.style.opacity = "0";
    });
  }

  function scan() { document.querySelectorAll(".tilt").forEach(bind); }

  document.addEventListener("DOMContentLoaded", () => {
    scan();
    // Re-scan as cards/sections are injected by the page scripts.
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  });
})();
