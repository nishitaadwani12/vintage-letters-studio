// Shared product-card renderer used by home & shop pages.
window.ASLI = window.ASLI || {};
window.ASLI.productCardHTML = function (p) {
  const money = window.ASLI.money || ((n) => "₹" + n);
  return `
    <article class="product-card tilt">
      <a class="product-thumb" href="product.html?id=${p.id}" aria-label="${p.name}">
        ${p.bestseller ? '<span class="badge">Best Seller</span>' : ""}
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
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
