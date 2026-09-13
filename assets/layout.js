// Shared layout + cart engine for every page.
// Injects the nav, footer, and cart drawer, and manages a localStorage cart.
(function () {
  "use strict";
  const CART_KEY = "inkwell_cart_v1";
  const money = (n) => "$" + Number(n).toFixed(2).replace(/\.00$/, "");

  // ---- Cart store (localStorage) ----
  const Cart = {
    read() {
      try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
      catch { return []; }
    },
    write(items) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      document.dispatchEvent(new CustomEvent("cart:change", { detail: items }));
    },
    add(item) {
      const items = this.read();
      items.push({ ...item, _k: Date.now() + "-" + Math.random().toString(36).slice(2, 7) });
      this.write(items);
    },
    remove(key) { this.write(this.read().filter((i) => i._k !== key)); },
    clear() { this.write([]); },
    count() { return this.read().length; },
    total() { return this.read().reduce((s, i) => s + Number(i.price || 0), 0); },
  };
  window.INKWELL = window.INKWELL || {};
  window.INKWELL.Cart = Cart;
  window.INKWELL.money = money;

  // ---- Markup ----
  const nav = `
    <header class="nav" id="nav">
      <a class="brand" href="index.html">
        <span class="brand-mark">✦</span><span class="brand-name">Inkwell&nbsp;&amp;&nbsp;Ivy</span>
      </a>
      <nav class="nav-links">
        <a href="shop.html">Shop</a>
        <a href="index.html#how">How It Works</a>
        <a href="custom-request.html">Custom Request</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="nav-actions">
        <a class="nav-cta" href="custom-request.html">Create Your Letter</a>
        <button class="cart-btn" id="cartBtn" aria-label="Open cart">Cart <span class="cart-count" id="cartCount">0</span></button>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
    </header>`;

  const footer = `
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <span class="brand-name">Inkwell &amp; Ivy</span>
          <p class="footer-tag">A handmade sentimental gifting studio — reviving the lost art of letter writing.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <a href="shop.html?cat=letters">Vintage Letters</a>
          <a href="shop.html?cat=flowers">Pressed Flowers</a>
          <a href="shop.html?cat=boxes">Gift Boxes</a>
          <a href="custom-request.html">Custom Request</a>
        </div>
        <div>
          <h4>Studio</h4>
          <a href="about.html">Our Story</a>
          <a href="contact.html">Contact</a>
          <a href="cart.html">Cart &amp; Checkout</a>
        </div>
      </div>
      <p class="footer-copy">© 2026 Inkwell &amp; Ivy · Handcrafted with care · Prototype site</p>
    </footer>`;

  const drawer = `
    <aside class="cart-drawer" id="cartDrawer" aria-hidden="true">
      <div class="cart-head"><h3>Your Cart</h3><button id="cartClose" aria-label="Close cart">✕</button></div>
      <div class="cart-items" id="cartDrawerItems"></div>
      <div class="cart-foot">
        <div class="cart-total">Total <span id="cartDrawerTotal">$0</span></div>
        <a class="btn btn-primary btn-block" href="cart.html">View Cart &amp; Checkout</a>
      </div>
    </aside>
    <div class="cart-scrim" id="cartScrim"></div>`;

  // ---- Inject ----
  document.addEventListener("DOMContentLoaded", () => {
    const mountTop = document.getElementById("layout-top");
    const mountBottom = document.getElementById("layout-bottom");
    if (mountTop) mountTop.innerHTML = nav;
    if (mountBottom) mountBottom.innerHTML = footer + drawer;

    // Sticky nav shadow.
    const navEl = document.getElementById("nav");
    const onScroll = () => navEl && navEl.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile menu.
    const toggle = document.getElementById("navToggle");
    if (toggle) toggle.addEventListener("click", () => navEl.classList.toggle("open"));

    // Cart drawer wiring.
    const drawerEl = document.getElementById("cartDrawer");
    const scrim = document.getElementById("cartScrim");
    const open = () => { drawerEl.classList.add("open"); scrim.classList.add("open"); };
    const close = () => { drawerEl.classList.remove("open"); scrim.classList.remove("open"); };
    const cartBtn = document.getElementById("cartBtn");
    const cartClose = document.getElementById("cartClose");
    if (cartBtn) cartBtn.addEventListener("click", () => { renderDrawer(); open(); });
    if (cartClose) cartClose.addEventListener("click", close);
    if (scrim) scrim.addEventListener("click", close);

    document.addEventListener("cart:change", () => { renderBadge(); renderDrawer(); });
    renderBadge();

    // Scroll reveal.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  });

  function renderBadge() {
    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = Cart.count();
  }

  function renderDrawer() {
    const box = document.getElementById("cartDrawerItems");
    const totalEl = document.getElementById("cartDrawerTotal");
    if (!box) return;
    const items = Cart.read();
    if (!items.length) {
      box.innerHTML = '<p class="cart-empty">Your cart is empty.<br/><a href="shop.html">Browse the collection →</a></p>';
    } else {
      box.innerHTML = items
        .map(
          (i) => `<div class="cart-item">
            <div><strong>${i.name}</strong>${i.summary ? `<small>${i.summary}</small>` : ""}</div>
            <div class="cart-item-right"><span>${money(i.price)}</span>
            <button class="link-remove" data-k="${i._k}" aria-label="Remove">Remove</button></div>
          </div>`
        )
        .join("");
      box.querySelectorAll(".link-remove").forEach((b) =>
        b.addEventListener("click", () => Cart.remove(b.dataset.k))
      );
    }
    if (totalEl) totalEl.textContent = money(Cart.total());
  }
})();
