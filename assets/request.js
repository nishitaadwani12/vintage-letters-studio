// Custom gift request form: populate options, validate, and submit.
// Submits to Formspree if configured (real delivery to the studio inbox);
// otherwise falls back to opening a prefilled email. See DEPLOY.md.
(function () {
  "use strict";
  const D = window.INKWELL;
  const STORE_KEY = "inkwell_requests_v1";
  const STUDIO_EMAIL = "aslitohfa@gmail.com";
  // TODO: create a free form at formspree.io for aslitohfa@gmail.com and paste its ID.
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  const form = document.getElementById("requestForm");
  const success = document.getElementById("success");
  const errEl = document.getElementById("formError");

  // Populate occasion dropdown.
  const occ = document.getElementById("occasion");
  occ.innerHTML = '<option value="">Not sure yet</option>' + D.OCCASIONS.map((o) => `<option>${o}</option>`).join("");

  // Aesthetic preference swatches (optional, single-select each).
  const waxBox = document.getElementById("waxPrefs");
  const paperBox = document.getElementById("paperPrefs");
  waxBox.innerHTML = D.OPTIONS.wax.map((w) => `<button type="button" class="dot" data-name="${w.name}" style="--c:${w.color}" title="${w.name}"></button>`).join("");
  paperBox.innerHTML = D.OPTIONS.paper.map((p) => `<button type="button" class="paper-chip" data-name="${p.name}" style="--p:${p.color}">${p.name.split(" ")[0]}</button>`).join("");
  const pref = { wax: "", paper: "" };
  singleSelect(waxBox, ".dot", (b) => (pref.wax = b.dataset.name));
  singleSelect(paperBox, ".paper-chip", (b) => (pref.paper = b.dataset.name));

  // Live character count.
  const box = document.getElementById("requestBox");
  const count = document.getElementById("reqCount");
  box.addEventListener("input", () => (count.textContent = `${box.value.length} / 1500`));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errEl.style.display = "none";
    const data = Object.fromEntries(new FormData(form).entries());
    data.discreet = form.discreet.checked;
    data.waxPref = pref.wax;
    data.paperPref = pref.paper;
    data.submittedAt = new Date().toISOString();

    if (!data.name.trim() || !isEmail(data.email) || data.request.trim().length < 10) {
      errEl.textContent = "Please add your name, a valid email, and a few sentences about your gift.";
      errEl.style.display = "block";
      return;
    }
    submitRequest(data);
    form.style.display = "none";
    success.classList.add("show");
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  document.getElementById("anotherBtn").addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    count.textContent = "0 / 1500";
    waxBox.querySelectorAll(".is-active").forEach((b) => b.classList.remove("is-active"));
    paperBox.querySelectorAll(".is-active").forEach((b) => b.classList.remove("is-active"));
    pref.wax = pref.paper = "";
    success.classList.remove("show");
    form.style.display = "";
    form.scrollIntoView({ behavior: "smooth" });
  });

  // --- Submit: keep a local backup, then deliver via Formspree (or email fallback) ---
  function submitRequest(data) {
    try {
      const all = JSON.parse(localStorage.getItem(STORE_KEY)) || [];
      all.push(data);
      localStorage.setItem(STORE_KEY, JSON.stringify(all));
    } catch (_) {}

    if (!FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      // Real delivery to the studio inbox, no page reload.
      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: "Custom gift request from " + data.name, ...data }),
      }).catch(() => mailtoFallback(data));
      return;
    }
    mailtoFallback(data);
  }

  function mailtoFallback(data) {
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Occasion: ${data.occasion || " - "}`,
      `Recipient: ${data.recipient || " - "}`,
      `Budget: ${data.budget || " - "}`,
      `Delivery date: ${data.deliveryDate || " - "}`,
      `Wax preference: ${data.waxPref || " - "}`,
      `Paper preference: ${data.paperPref || " - "}`,
      `Discreet shipping: ${data.discreet ? "Yes" : "No"}`,
      "",
      "Request:",
      data.request,
    ].join("\n");
    const href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent("Custom gift request from " + data.name)}&body=${encodeURIComponent(body)}`;
    window.open(href, "_blank");
  }

  function singleSelect(container, sel, onPick) {
    container.addEventListener("click", (e) => {
      const b = e.target.closest(sel); if (!b) return;
      const active = b.classList.contains("is-active");
      container.querySelectorAll(sel).forEach((x) => x.classList.remove("is-active"));
      if (!active) { b.classList.add("is-active"); onPick(b); }
      else onPick({ dataset: { name: "" } });
    });
  }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim()); }
})();
