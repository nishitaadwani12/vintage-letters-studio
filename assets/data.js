// Product catalog + shared config for Inkwell & Ivy.
// Prices in USD. `emoji` stands in for product photography in this prototype.
window.INKWELL = window.INKWELL || {};

window.INKWELL.CATEGORIES = [
  { slug: "letters", name: "Vintage Letters & Bundles", emoji: "✉️", accent: "#6b1d2f" },
  { slug: "flowers", name: "Pressed Flower Frames & Keepsakes", emoji: "🌸", accent: "#8a9a86" },
  { slug: "boxes", name: "Interactive Gift Boxes & Jars", emoji: "🎁", accent: "#d4af37" },
];

window.INKWELL.OCCASIONS = ["Anniversary", "Long Distance", "Birthday", "Just Because"];

window.INKWELL.PRODUCTS = [
  {
    id: "custom-vintage-letter",
    name: "Custom Vintage Letter",
    category: "letters",
    occasions: ["Anniversary", "Long Distance", "Just Because"],
    price: 38,
    emoji: "✉️",
    bestseller: true,
    customizable: true,
    blurb: "Hand-lettered on aged paper, sealed in warm wax. Your words, made to keep.",
    desc: "Our signature keepsake. Write your message, choose your script, paper and wax seal color, and we hand-craft a letter that arrives sealed and ready to be reread for years.",
  },
  {
    id: "love-letter-bundle",
    name: "12-Month Love Letter Bundle",
    category: "letters",
    occasions: ["Anniversary", "Long Distance"],
    price: 128,
    emoji: "💌",
    bestseller: true,
    customizable: true,
    blurb: "One sealed letter to open each month of the year.",
    desc: "Twelve individually written and wax-sealed letters, each labeled for a month. A slow-burn gift that keeps giving all year long.",
  },
  {
    id: "long-distance-letter",
    name: "Long-Distance Keepsake Letter",
    category: "letters",
    occasions: ["Long Distance"],
    price: 44,
    emoji: "🌍",
    customizable: true,
    blurb: "For the miles between you — scented, sealed, and sent worldwide.",
    desc: "A letter designed for distance: lightly scented paper, a pressed flower, and optional QR audio so they can hear your voice from anywhere.",
  },
  {
    id: "pressed-flower-frame",
    name: "Pressed Flower Frame",
    category: "flowers",
    occasions: ["Anniversary", "Birthday", "Just Because"],
    price: 56,
    emoji: "🖼️",
    bestseller: true,
    blurb: "Real botanicals preserved behind glass with a hand-written note.",
    desc: "Ethically dried flowers arranged and pressed into a solid-wood frame, paired with a small calligraphy card. A keepsake for the wall or the mantel.",
  },
  {
    id: "pressed-flower-bookmark",
    name: "Pressed Flower Bookmark Set",
    category: "flowers",
    occasions: ["Birthday", "Just Because"],
    price: 22,
    emoji: "🔖",
    blurb: "A set of three laminated botanical bookmarks.",
    desc: "Three bookmarks, each with a different pressed bloom sealed in a whisper-thin laminate. Ships flat in a parchment sleeve.",
  },
  {
    id: "flower-initial-keepsake",
    name: "Floral Initial Keepsake",
    category: "flowers",
    occasions: ["Anniversary", "Birthday"],
    price: 48,
    emoji: "🌿",
    customizable: true,
    blurb: "A monogram formed from real dried flowers.",
    desc: "Choose an initial and we shape it from dried petals and stems, framed in glass. A personal botanical monogram for a shelf or desk.",
  },
  {
    id: "memory-jar",
    name: "Memory Jar of Notes",
    category: "boxes",
    occasions: ["Anniversary", "Just Because"],
    price: 42,
    emoji: "🫙",
    bestseller: true,
    customizable: true,
    blurb: "A corked jar filled with rolled, sealed little notes.",
    desc: "We hand-roll and wax-tie each of your short notes and tuck them into a corked apothecary jar. They pull one out whenever they need you.",
  },
  {
    id: "vintage-gift-box",
    name: "Interactive Vintage Gift Box",
    category: "boxes",
    occasions: ["Anniversary", "Birthday"],
    price: 74,
    emoji: "🎁",
    customizable: true,
    blurb: "A layered unboxing: letter, flowers, wax seal & keepsake.",
    desc: "A curated wooden box that unfolds in layers — a sealed letter, a pressed-flower mini bouquet, and a keepsake trinket, staged for a filmable unboxing.",
  },
  {
    id: "wax-seal-kit",
    name: "DIY Wax Seal Kit",
    category: "boxes",
    occasions: ["Birthday", "Just Because"],
    price: 34,
    emoji: "🕯️",
    blurb: "Everything to seal your own letters at home.",
    desc: "A brass seal, a spoon, and a set of wax sticks in our signature colors — for the romantics who want to make their own.",
  },
];

// Shared customization option sets (used on customizable PDPs and the request form).
window.INKWELL.OPTIONS = {
  fonts: [
    { id: "script", label: "Hand-written Calligraphy" },
    { id: "typewriter", label: "Vintage Typewriter" },
    { id: "cursive", label: "Classic Cursive" },
  ],
  wax: [
    { color: "#6b1d2f", name: "Burgundy" },
    { color: "#d4af37", name: "Antique Gold" },
    { color: "#4a5d47", name: "Forest Green" },
    { color: "#d8a3a3", name: "Blush Pink" },
  ],
  paper: [
    { color: "#f4ead5", name: "Tea-Stained Vintage" },
    { color: "#fdfbf7", name: "Cotton Deckle-Edge" },
    { color: "#efe6cf", name: "Parchment" },
  ],
  addons: [
    { id: "flowers", label: "Dried Flower Mini-Bouquet", price: 9 },
    { id: "audio", label: "QR Code Audio Recording", price: 12 },
    { id: "box", label: "Wooden Keepsake Box Packaging", price: 18 },
  ],
};

window.INKWELL.getProduct = (id) => window.INKWELL.PRODUCTS.find((p) => p.id === id);
