// Server-side source of truth for prices (INR). Used to recompute order totals
// so the amount can never be tampered with from the browser.
// KEEP IN SYNC with assets/data.js.
const PRODUCTS = {
  "custom-vintage-letter": 799,
  "love-letter-bundle": 2999,
  "open-when-letters": 1299,
  "reasons-i-love-you-deck": 899,
  "long-distance-letter": 999,
  "pressed-flower-frame": 1499,
  "birth-flower-frame": 1399,
  "star-map-frame": 1599,
  "flower-initial-keepsake": 1299,
  "pressed-flower-bookmark": 499,
  "memory-jar": 1199,
  "anniversary-time-capsule": 1799,
  "vintage-gift-box": 1999,
  "wedding-vow-keepsake": 1899,
  "365-days-of-us-jar": 2499,
  "scratch-date-night-box": 1099,
  "where-we-met-map": 1699,
  "newborn-keepsake-letter": 999,
  "remembrance-letter": 899,
};
const ADDONS = { flowers: 199, audio: 299, box: 499 };
const SHIP = 79;

// Recompute the cart total in INR from trusted prices; throws on unknown ids.
function computeTotal(items) {
  if (!Array.isArray(items) || !items.length) throw new Error("Cart is empty");
  let total = 0;
  for (const it of items) {
    const base = PRODUCTS[it && it.id];
    if (base == null) throw new Error("Unknown item: " + (it && it.id));
    let line = base;
    (Array.isArray(it.addons) ? it.addons : []).forEach((a) => { line += ADDONS[a] || 0; });
    total += line;
  }
  return total + SHIP;
}

module.exports = { PRODUCTS, ADDONS, SHIP, computeTotal };
