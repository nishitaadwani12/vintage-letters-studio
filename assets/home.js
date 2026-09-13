// Home page: render category grid + best-sellers from the catalog.
(function () {
  "use strict";
  const D = window.INKWELL;

  const catGrid = document.getElementById("catGrid");
  if (catGrid) {
    catGrid.innerHTML = D.CATEGORIES.map(
      (c) => `<a class="cat-card" style="--accent:${c.accent}" href="shop.html?cat=${c.slug}">
        <div class="cat-emoji">${c.emoji}</div>
        <h3>${c.name}</h3>
        <span class="cat-link">Explore →</span>
      </a>`
    ).join("") +
    `<a class="cat-card" style="--accent:#6b1d2f" href="shop.html">
       <div class="cat-emoji">💌</div><h3>Shop by Occasion</h3>
       <span class="cat-link">Anniversary · Long Distance · Birthday →</span>
     </a>`;
  }

  const bestGrid = document.getElementById("bestGrid");
  if (bestGrid) {
    bestGrid.innerHTML = D.PRODUCTS.filter((p) => p.bestseller).map(D.productCardHTML).join("");
  }
})();
