// Product detail page: renders a product, and (if customizable) a live customizer.
(function () {
  "use strict";
  const D = window.INKWELL;
  const money = D.money;
  const pdp = document.getElementById("pdp");
  const id = new URLSearchParams(location.search).get("id");
  const product = D.getProduct(id);

  if (!product) {
    pdp.innerHTML = '<p class="no-results">Sorry, we couldn\'t find that item. <a href="shop.html">Back to the shop →</a></p>';
    return;
  }
  document.title = product.name + " - Asli Tohfa";

  if (!product.customizable) {
    renderSimple();
  } else {
    renderCustomizer();
  }

  // ---- Non-customizable product ----
  function renderSimple() {
    pdp.innerHTML = `
      <div class="pdp-preview">
        <img class="pdp-photo" src="${product.img}" alt="${product.name}" />
        <p class="preview-caption">Handmade to order</p>
      </div>
      <div class="pdp-config">
        <p class="eyebrow">${catName(product.category)}</p>
        <h1 class="pdp-title">${product.name}</h1>
        <p class="pdp-price">Price <strong>${money(product.price)}</strong></p>
        <p class="pdp-desc">${product.desc}</p>
        <label class="field"><span class="field-label">Gift note (optional)</span>
          <textarea id="note" maxlength="400" placeholder="Add a short note to include…"></textarea></label>
        <button class="btn btn-primary btn-block" id="add">Add to Cart · ${money(product.price)}</button>
        <p class="form-note"><a href="shop.html">← Back to the collection</a></p>
      </div>`;
    document.getElementById("add").addEventListener("click", () => {
      const note = document.getElementById("note").value.trim();
      addToCart({ name: product.name, price: product.price, summary: note ? "Note: " + note.slice(0, 40) : "" });
    });
  }

  // ---- Customizable product ----
  function renderCustomizer() {
    const O = D.OPTIONS;
    pdp.innerHTML = `
      <div class="pdp-preview">
        <div class="letter-preview">
          <div class="letter-paper" id="paper">
            <p class="letter-date">${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            <p class="letter-body" id="preview">Write your message and watch it come to life…</p>
            <p class="letter-sign">With love,</p>
            <div class="wax-seal" id="seal">&amp;</div>
          </div>
        </div>
        <p class="preview-caption">Live preview · updates as you customize</p>
        <img class="pdp-photo pdp-photo-sm" src="${product.img}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="pdp-config">
        <p class="eyebrow">${catName(product.category)}</p>
        <h1 class="pdp-title">${product.name}</h1>
        <p class="pdp-price">Base ${money(product.price)} · Total <strong id="total">${money(product.price)}</strong></p>
        <p class="pdp-desc">${product.desc}</p>

        <label class="field"><span class="field-label">Your message <em id="wc">0 words</em></span>
          <textarea id="msg" maxlength="1200" placeholder="My dearest…"></textarea></label>

        <div class="field"><span class="field-label">Font / Script</span>
          <div class="swatches" id="fonts">${O.fonts.map((f, i) => `<button class="chip${i === 0 ? " is-active" : ""}" data-font="${f.id}">${f.label}</button>`).join("")}</div></div>

        <div class="field"><span class="field-label">Wax seal color</span>
          <div class="swatches" id="wax">${O.wax.map((w, i) => `<button class="dot${i === 0 ? " is-active" : ""}" data-color="${w.color}" style="--c:${w.color}" title="${w.name}"></button>`).join("")}</div></div>

        <div class="field"><span class="field-label">Paper type</span>
          <div class="swatches" id="paperOpts">${O.paper.map((p, i) => `<button class="paper-chip${i === 0 ? " is-active" : ""}" data-paper="${p.color}" style="--p:${p.color}">${p.name.split(" ")[0]}</button>`).join("")}</div></div>

        <div class="field"><span class="field-label">Add-ons</span>
          ${O.addons.map((a) => `<label class="addon"><input type="checkbox" data-price="${a.price}" data-id="${a.id}"> ${a.label} <span>+${money(a.price)}</span></label>`).join("")}</div>

        <label class="field"><span class="field-label">Upload audio clip (optional)</span>
          <input type="file" id="audio" accept="audio/*" />
          <p class="form-note">We'll turn it into a scannable QR code on your keepsake (requires the QR add-on).</p></label>

        <button class="btn btn-primary btn-block" id="add">Add to Cart · <span id="total2">${money(product.price)}</span></button>
        <p class="form-note"><a href="shop.html">← Back to the collection</a></p>
      </div>`;

    const state = { font: O.fonts[0].id, wax: O.wax[0].color, paper: O.paper[0].color, addons: [] };
    const $ = (id) => document.getElementById(id);
    const preview = $("preview"), seal = $("seal"), paper = $("paper");

    $("msg").addEventListener("input", (e) => {
      const v = e.target.value;
      preview.textContent = v || "Write your message and watch it come to life…";
      const n = v.trim() ? v.trim().split(/\s+/).length : 0;
      $("wc").textContent = n + (n === 1 ? " word" : " words");
    });
    $("fonts").addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $("fonts").querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      b.classList.add("is-active"); state.font = b.dataset.font;
      preview.className = "letter-body font-" + state.font;
    });
    $("wax").addEventListener("click", (e) => {
      const b = e.target.closest(".dot"); if (!b) return;
      $("wax").querySelectorAll(".dot").forEach((c) => c.classList.remove("is-active"));
      b.classList.add("is-active"); state.wax = b.dataset.color;
      const c = state.wax;
      seal.style.background = `radial-gradient(circle at 38% 32%, color-mix(in srgb, ${c} 72%, white), ${c} 55%, color-mix(in srgb, ${c} 82%, black) 100%)`;
    });
    $("paperOpts").addEventListener("click", (e) => {
      const b = e.target.closest(".paper-chip"); if (!b) return;
      $("paperOpts").querySelectorAll(".paper-chip").forEach((c) => c.classList.remove("is-active"));
      b.classList.add("is-active"); state.paper = b.dataset.paper; paper.style.background = state.paper;
    });
    pdp.querySelectorAll(".addon input").forEach((cb) =>
      cb.addEventListener("change", () => {
        state.addons = [...pdp.querySelectorAll(".addon input:checked")].map((el) => ({ id: el.dataset.id, price: Number(el.dataset.price) }));
        recalc();
      })
    );

    function total() { return product.price + state.addons.reduce((s, a) => s + a.price, 0); }
    function recalc() { $("total").textContent = money(total()); $("total2").textContent = money(total()); }

    $("add").addEventListener("click", () => {
      const msg = $("msg").value.trim();
      const fontLabel = O.fonts.find((f) => f.id === state.font).label;
      const waxName = O.wax.find((w) => w.color === state.wax).name;
      const paperName = O.paper.find((p) => p.color === state.paper).name;
      const addonNames = state.addons.map((a) => O.addons.find((x) => x.id === a.id).label);
      const summary = [fontLabel, waxName + " wax", paperName].concat(addonNames.length ? ["+ " + addonNames.join(", ")] : []).join(" · ");
      addToCart({
        name: product.name, price: total(), summary,
        details: { message: msg, font: state.font, wax: state.wax, paper: state.paper, addons: state.addons.map((a) => a.id) },
      });
    });
  }

  function catName(slug) {
    const c = D.CATEGORIES.find((x) => x.slug === slug);
    return c ? c.name : "Keepsake";
  }
  function addToCart(item) {
    D.Cart.add(item);
    const t = document.getElementById("toast");
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1800);
  }
})();
