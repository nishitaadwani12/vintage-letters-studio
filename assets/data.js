// Product catalog + shared config for Asli Tohfa.
// Prices in INR. `emoji` is a small fallback icon; `img` holds the product photo.
window.ASLI = window.ASLI || {};

window.ASLI.CATEGORIES = [
  { slug: "letters", name: "Vintage Letters & Bundles", emoji: "✉️", accent: "#6b1d2f",
    kicker: "The Written Word",
    tagline: "Hand-lettered on aged paper and closed with warm wax. The words they'll keep in a drawer and reread for years." },
  { slug: "flowers", name: "Pressed Flower Keepsakes", emoji: "🌸", accent: "#8a9a86",
    kicker: "Preserved in Bloom",
    tagline: "Real botanicals dried and pressed behind glass. A moment held still, made to keep." },
  { slug: "boxes", name: "Scrapbooks, Boxes & Jars", emoji: "🎁", accent: "#b8891f",
    kicker: "The Unboxing",
    tagline: "Hand-bound scrapbooks, layered gift boxes and jars of little sealed notes, made to be opened slowly." },
];

window.ASLI.OCCASIONS = ["Anniversary", "Wedding", "Long Distance", "Birthday", "New Baby", "Just Because"];

window.ASLI.PRODUCTS = [
  {
    id: "custom-vintage-letter",
    name: "Custom Vintage Letter",
    category: "letters",
    occasions: ["Anniversary", "Wedding", "Long Distance", "Just Because"],
    price: 799,
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
    price: 2999,
    emoji: "💌",
    bestseller: true,
    customizable: true,
    blurb: "One sealed letter to open each month of the year.",
    desc: "Twelve individually written and wax-sealed letters, each labeled for a month. A slow-burn gift that keeps giving all year long.",
  },
  {
    id: "open-when-letters",
    name: "\"Open When…\" Letter Set",
    category: "letters",
    occasions: ["Long Distance", "Just Because"],
    price: 1299,
    emoji: "🗝️",
    bestseller: true,
    customizable: true,
    blurb: "A set of sealed letters for every mood: open when you miss me, when you're happy, when you can't sleep.",
    desc: "A curated set of hand-lettered, wax-sealed notes, each labeled for a moment - open when you miss me, when you're sad, when you need a laugh. A comforting companion for the miles between you.",
  },
  {
    id: "reasons-i-love-you-deck",
    name: "\"Reasons I Love You\" Keepsake Deck",
    category: "letters",
    occasions: ["Anniversary", "Birthday", "Just Because"],
    price: 899,
    emoji: "🃏",
    customizable: true,
    blurb: "A little deck of hand-written reasons, tied with ribbon.",
    desc: "We hand-letter each of your reasons onto a small aged card and bind the deck with wax and ribbon. They flip to a new one whenever they need reminding.",
  },
  {
    id: "long-distance-letter",
    name: "Long-Distance Keepsake Letter",
    category: "letters",
    occasions: ["Long Distance"],
    price: 999,
    emoji: "🌍",
    customizable: true,
    blurb: "For the miles between you, scented, sealed, and sent worldwide.",
    desc: "A letter designed for distance: lightly scented paper, a pressed flower, and optional QR audio so they can hear your voice from anywhere.",
  },
  {
    id: "pressed-flower-frame",
    name: "Pressed Flower Frame",
    category: "flowers",
    occasions: ["Anniversary", "Birthday", "Just Because"],
    price: 1499,
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
    price: 499,
    emoji: "🔖",
    blurb: "A set of three laminated botanical bookmarks.",
    desc: "Three bookmarks, each with a different pressed bloom sealed in a whisper-thin laminate. Ships flat in a parchment sleeve.",
  },
  {
    id: "memory-scrapbook",
    name: "Handmade Memory Scrapbook",
    category: "boxes",
    occasions: ["Anniversary", "Wedding", "Birthday", "Just Because"],
    price: 2799,
    emoji: "📖",
    bestseller: true,
    customizable: true,
    blurb: "A hand-bound scrapbook, laid out page by page with your photos and notes.",
    desc: "We hand-assemble a vintage-style scrapbook from your photos, ticket stubs and words - each spread designed, captioned in calligraphy, and bound to be turned again and again. A keepsake of your whole story in one book.",
  },
  {
    id: "memory-jar",
    name: "Memory Jar of Notes",
    category: "boxes",
    occasions: ["Anniversary", "Just Because"],
    price: 1199,
    emoji: "🫙",
    bestseller: true,
    customizable: true,
    blurb: "A corked jar filled with rolled, sealed little notes.",
    desc: "We hand-roll and wax-tie each of your short notes and tuck them into a corked apothecary jar. They pull one out whenever they need you.",
  },
  {
    id: "anniversary-time-capsule",
    name: "Anniversary Time Capsule Box",
    category: "boxes",
    occasions: ["Anniversary"],
    price: 1799,
    emoji: "⏳",
    customizable: true,
    blurb: "A sealed keepsake box to open on your next anniversary.",
    desc: "A wax-sealed wooden box holding your letter, a pressed flower, and a keepsake, meant to stay closed until your next anniversary. A gift to your future selves.",
  },
  {
    id: "vintage-gift-box",
    name: "Interactive Vintage Gift Box",
    category: "boxes",
    occasions: ["Anniversary", "Wedding", "Birthday"],
    price: 1999,
    emoji: "🎁",
    customizable: true,
    blurb: "A layered unboxing: letter, flowers, wax seal & keepsake.",
    desc: "A curated wooden box that unfolds in layers - a sealed letter, a pressed-flower mini bouquet, and a keepsake trinket, staged for a filmable unboxing.",
  },
  {
    id: "365-days-of-us-jar",
    name: "365 Days of Us Jar",
    category: "boxes",
    occasions: ["Anniversary", "Just Because"],
    price: 2499,
    emoji: "📆",
    customizable: true,
    blurb: "A note for every day of the year, sealed in a keepsake jar.",
    desc: "A full year of hand-rolled, wax-tied notes in a large apothecary jar - one to open each day. Our most heartfelt slow-gift, written from your prompts and memories.",
  },
  {
    id: "custom-gift-hamper",
    name: "Build-Your-Own Gift Hamper",
    category: "boxes",
    occasions: ["Anniversary", "Wedding", "Birthday", "Just Because"],
    price: 3499,
    emoji: "🧺",
    bestseller: true,
    customizable: true,
    blurb: "Pick two or more of our keepsakes, bundled into one vintage hamper.",
    desc: "Choose any two or more gifts - a sealed letter, a pressed-flower frame, a memory jar, a scrapbook - and we arrange them into a single vintage hamper, wrapped with ribbon and a hand-written note. Tell us your picks and occasion in the customization notes.",
  },
  {
    id: "newborn-keepsake-letter",
    name: "Newborn Welcome Keepsake",
    category: "letters",
    occasions: ["New Baby", "Just Because"],
    price: 999,
    customizable: true,
    emoji: "🍼",
    blurb: "A first letter to a new arrival, sealed to open one day.",
    desc: "A hand-lettered welcome letter with the baby's name, birth details, and your words - wax-sealed to be kept and opened on a future birthday. A heirloom from day one.",
  },
  {
    id: "remembrance-letter",
    name: "Remembrance Keepsake Letter",
    category: "letters",
    occasions: ["Just Because"],
    price: 899,
    customizable: true,
    emoji: "🕊️",
    blurb: "A gentle, hand-lettered tribute to someone dearly missed.",
    desc: "A quietly beautiful keepsake letter honoring a loved one - your words, hand-lettered on soft paper and sealed with care. A tender way to hold a memory close.",
  },
];

// Shared customization option sets (used on customizable PDPs and the request form).
window.ASLI.OPTIONS = {
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
    { id: "flowers", label: "Dried Flower Mini-Bouquet", price: 199 },
    { id: "audio", label: "QR Code Audio Recording", price: 299 },
    { id: "box", label: "Wooden Keepsake Box Packaging", price: 499 },
  ],
};

// --- Reference photos: locally-hosted, subject-matched placeholders ---
// Each image lives in assets/img/<id>.jpg (and cat-<slug>.jpg for categories),
// hand-picked and verified to match the gift. All are Creative-Commons
// commercial-use licensed — see assets/img/CREDITS.md. Replace `p.img` / `c.img`
// with your own product photography before launch.
window.ASLI.PRODUCTS.forEach((p) => {
  p.img = `assets/img/${p.id}.jpg`;
});
window.ASLI.CATEGORIES.forEach((c) => {
  c.img = `assets/img/cat-${c.slug}.jpg`;
});

window.ASLI.getProduct = (id) => window.ASLI.PRODUCTS.find((p) => p.id === id);
