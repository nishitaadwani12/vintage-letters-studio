// Shared product-card renderer used by home & shop pages.
window.INKWELL = window.INKWELL || {};
window.INKWELL.productCardHTML = function (p) {
  const money = window.INKWELL.money || ((n) => "₹" + n);
  return `
    <article class="product-card">
      <a class="product-thumb" href="product.html?id=${p.id}" aria-label="${p.name}">
        ${p.bestseller ? '<span class="badge">Best Seller</span>' : ""}
        <span aria-hidden="true">${p.emoji}</span>
      </a>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.blurb}</p>
        <div class="product-foot">
          <span class="price">${money(p.price)}</span>
          <a class="btn btn-ghost" href="product.html?id=${p.id}" style="padding:0.5rem 1.1rem;font-size:0.85rem">${p.customizable ? "Customize" : "View"}</a>
        </div>
      </div>
    </article>`;
};
