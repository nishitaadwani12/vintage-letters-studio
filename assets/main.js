// UI interactions: nav scroll, section reveal, product customizer, cart.
(function () {
  "use strict";

  // Sticky nav shadow.
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll reveal.
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".section").forEach((s) => io.observe(s));

  // ---- Product customizer ----
  const BASE = 38;
  const msg = document.getElementById("msgInput");
  const previewText = document.getElementById("previewText");
  const wordCount = document.getElementById("wordCount");
  const letterBody = document.getElementById("previewText");
  const letterPaper = document.getElementById("letterPaper");
  const waxSeal = document.getElementById("waxSeal");
  const priceTotal = document.getElementById("priceTotal");
  const priceTotal2 = document.getElementById("priceTotal2");

  const state = { font: "script", wax: "#6b1d2f", paper: "#f4ead5", addons: 0 };

  function words(str) {
    const t = str.trim();
    return t ? t.split(/\s+/).length : 0;
  }
  function recalcPrice() {
    const total = BASE + state.addons;
    priceTotal.textContent = "$" + total;
    priceTotal2.textContent = "$" + total;
  }

  msg.addEventListener("input", () => {
    const v = msg.value;
    previewText.textContent = v || "Write your message and watch it come to life…";
    wordCount.textContent = words(v) + (words(v) === 1 ? " word" : " words");
  });

  document.getElementById("fontSwatches").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    document.querySelectorAll("#fontSwatches .chip").forEach((c) => c.classList.remove("is-active"));
    b.classList.add("is-active");
    state.font = b.dataset.font;
    letterBody.className = "letter-body font-" + state.font;
  });

  document.getElementById("waxSwatches").addEventListener("click", (e) => {
    const b = e.target.closest(".dot");
    if (!b) return;
    document.querySelectorAll("#waxSwatches .dot").forEach((c) => c.classList.remove("is-active"));
    b.classList.add("is-active");
    state.wax = b.dataset.color;
    waxSeal.style.background = `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), transparent 55%), ${state.wax}`;
  });

  document.getElementById("paperSwatches").addEventListener("click", (e) => {
    const b = e.target.closest(".paper-chip");
    if (!b) return;
    document.querySelectorAll("#paperSwatches .paper-chip").forEach((c) => c.classList.remove("is-active"));
    b.classList.add("is-active");
    state.paper = b.dataset.paper;
    letterPaper.style.background = state.paper;
  });

  document.querySelectorAll(".addon input").forEach((cb) =>
    cb.addEventListener("change", () => {
      state.addons = [...document.querySelectorAll(".addon input:checked")].reduce(
        (sum, el) => sum + Number(el.dataset.price), 0
      );
      recalcPrice();
    })
  );

  // ---- Cart ----
  const cart = [];
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const drawer = document.getElementById("cartDrawer");
  const scrim = document.getElementById("cartScrim");

  const openCart = () => { drawer.classList.add("open"); scrim.classList.add("open"); };
  const closeCart = () => { drawer.classList.remove("open"); scrim.classList.remove("open"); };
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  scrim.addEventListener("click", closeCart);

  function renderCart() {
    cartCount.textContent = cart.length;
    if (!cart.length) {
      cartItems.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      cartTotalEl.textContent = "$0";
      return;
    }
    cartItems.innerHTML = cart
      .map(
        (it) => `<div class="cart-item"><div>Custom Vintage Letter<small>${it.font} · wax ${it.wax}${it.addons ? " · +add-ons" : ""}</small></div><strong>$${it.price}</strong></div>`
      )
      .join("");
    cartTotalEl.textContent = "$" + cart.reduce((s, it) => s + it.price, 0);
  }

  document.getElementById("addToCart").addEventListener("click", () => {
    cart.push({ font: state.font, wax: state.wax, paper: state.paper, addons: state.addons, price: BASE + state.addons });
    renderCart();
    openCart();
  });

  recalcPrice();
})();
