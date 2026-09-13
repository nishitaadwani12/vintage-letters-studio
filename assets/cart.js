// Cart & checkout page: full line items, gift options, order summary.
// Checkout is a prototype confirmation - wire to a real payment provider for launch.
(function () {
  "use strict";
  const D = window.INKWELL;
  const money = D.money;
  const root = document.getElementById("cartRoot");
  const SHIP = 79;

  function photoFor(name) {
    const p = D.PRODUCTS.find((x) => x.name === name);
    return p ? p.img : "";
  }

  function render() {
    const items = D.Cart.read();
    if (!items.length) {
      root.innerHTML = `<div class="empty-cart"><p style="font-size:3rem">🕊️</p>
        <h2 style="font-family:var(--serif);font-size:1.8rem;margin:0.5rem 0">Your cart is empty</h2>
        <p style="margin-bottom:1.4rem">Every keepsake starts with a story.</p>
        <a class="btn btn-primary" href="shop.html">Browse the collection</a></div>`;
      return;
    }
    const subtotal = D.Cart.total();
    root.innerHTML = `
      <div class="cart-page">
        <div class="cart-list">
          ${items.map((i) => `
            <div class="cart-row">
              <div class="thumb" style="background-image:url('${photoFor(i.name)}')"></div>
              <div class="info">
                <h4>${i.name}</h4>
                ${i.summary ? `<small>${i.summary}</small>` : ""}
                ${i.details && i.details.message ? `<small>“${escapeHtml(i.details.message).slice(0, 80)}${i.details.message.length > 80 ? "…" : ""}”</small>` : ""}
                <button class="link-remove" data-k="${i._k}">Remove</button>
              </div>
              <div class="price">${money(i.price)}</div>
            </div>`).join("")}
        </div>
        <aside class="summary">
          <h3>Order Summary</h3>
          <div class="summary-line"><span>Subtotal</span><span>${money(subtotal)}</span></div>
          <div class="summary-line"><span>Handmade shipping</span><span>${money(SHIP)}</span></div>
          <div class="summary-total"><span>Total</span><span>${money(subtotal + SHIP)}</span></div>

          <label class="field" style="margin-top:1.2rem"><span class="field-label">Gift note</span>
            <textarea id="giftNote" maxlength="300" placeholder="A short message for the recipient…" style="min-height:80px"></textarea></label>
          <label class="gift-opt"><input type="checkbox" id="discreet" /> Discreet gift packaging (no invoice inside)</label>
          <label class="gift-opt" style="flex-direction:column;align-items:flex-start">Scheduled delivery date
            <input type="date" id="deliveryDate" /></label>

          <button class="btn btn-primary btn-block" id="checkout" style="margin-top:1rem">Checkout · ${money(subtotal + SHIP)}</button>
          <p class="form-note" style="text-align:center;margin-top:0.8rem">Secure checkout · Apple Pay · PayPal · Card</p>
        </aside>
      </div>`;

    root.querySelectorAll(".link-remove").forEach((b) =>
      b.addEventListener("click", () => D.Cart.remove(b.dataset.k))
    );
    document.getElementById("checkout").addEventListener("click", checkout);
  }

  function checkout() {
    const note = document.getElementById("giftNote").value.trim();
    const date = document.getElementById("deliveryDate").value;
    const discreet = document.getElementById("discreet").checked;
    // Prototype: confirm + clear. Replace with a real payment session for launch.
    const parts = ["Thank you! Your order is confirmed (prototype)."];
    if (date) parts.push("Scheduled for delivery on " + date + ".");
    if (discreet) parts.push("It'll ship discreetly with no invoice inside.");
    if (note) parts.push('Your gift note: "' + note + '"');
    alert(parts.join("\n\n"));
    D.Cart.clear();
    render();
  }

  function escapeHtml(s) {
    return (s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  document.addEventListener("cart:change", render);
  render();
})();
