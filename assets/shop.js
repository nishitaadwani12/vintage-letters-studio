// Shop page: filterable catalog by category + occasion, driven by ?cat= / ?occ=.
(function () {
  "use strict";
  const D = window.INKWELL;
  const params = new URLSearchParams(location.search);
  const state = { cat: params.get("cat") || "all", occ: params.get("occ") || "all" };

  const catBox = document.getElementById("catFilters");
  const occBox = document.getElementById("occFilters");
  const grid = document.getElementById("grid");

  function pill(label, value, active) {
    return `<button class="pill${active ? " is-active" : ""}" data-value="${value}">${label}</button>`;
  }

  const SHORT = { letters: "Letters", flowers: "Pressed Flowers", boxes: "Gift Boxes" };
  function renderFilters() {
    catBox.innerHTML =
      pill("All", "all", state.cat === "all") +
      D.CATEGORIES.map((c) => pill(SHORT[c.slug], c.slug, state.cat === c.slug)).join("");
    occBox.innerHTML =
      pill("All", "all", state.occ === "all") +
      D.OCCASIONS.map((o) => pill(o, o, state.occ === o)).join("");
  }

  function renderGrid() {
    const items = D.PRODUCTS.filter((p) => {
      const okCat = state.cat === "all" || p.category === state.cat;
      const okOcc = state.occ === "all" || (p.occasions || []).includes(state.occ);
      return okCat && okOcc;
    });
    grid.innerHTML = items.length
      ? items.map(D.productCardHTML).join("")
      : '<p class="no-results">No keepsakes match those filters yet — try clearing one.</p>';
  }

  function syncUrl() {
    const q = new URLSearchParams();
    if (state.cat !== "all") q.set("cat", state.cat);
    if (state.occ !== "all") q.set("occ", state.occ);
    history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : ""));
  }

  catBox.addEventListener("click", (e) => {
    const b = e.target.closest(".pill"); if (!b) return;
    state.cat = b.dataset.value; renderFilters(); renderGrid(); syncUrl();
  });
  occBox.addEventListener("click", (e) => {
    const b = e.target.closest(".pill"); if (!b) return;
    state.occ = b.dataset.value; renderFilters(); renderGrid(); syncUrl();
  });

  renderFilters();
  renderGrid();
})();
