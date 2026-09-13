// Product catalog + shared config for Asli Tohfa.
// Prices in INR. `emoji` stands in for product photography in this prototype.
window.INKWELL = window.INKWELL || {};

window.INKWELL.CATEGORIES = [
  { slug: "letters", name: "Vintage Letters & Bundles", emoji: "✉️", accent: "#6b1d2f",
    kicker: "The Written Word",
    tagline: "Hand-lettered on aged paper and closed with warm wax. The words they'll keep in a drawer and reread for years." },
  { slug: "flowers", name: "Pressed Flower Frames & Keepsakes", emoji: "🌸", accent: "#8a9a86",
    kicker: "Preserved in Bloom",
    tagline: "Real botanicals dried, arranged and pressed behind glass. A moment held still, made to hang on a wall for a lifetime." },
  { slug: "boxes", name: "Interactive Gift Boxes & Jars", emoji: "🎁", accent: "#b8891f",
    kicker: "The Unboxing",
    tagline: "Layered gift boxes and jars of little sealed notes, staged to be opened slowly, one delight at a time." },
];

window.INKWELL.OCCASIONS = ["Anniversary", "Wedding", "Long Distance", "Birthday", "New Baby", "Just Because"];

window.INKWELL.PRODUCTS = [
  {
    id: "custom-vintage-letter",
    name: "Custom Vintage Letter",
    category: "letters",
    occasions: ["Anniversary", "Long Distance", "Just Because"],
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
    id: "birth-flower-frame",
    name: "Birth Flower Pressed Frame",
    category: "flowers",
    occasions: ["Birthday", "Just Because"],
    price: 1399,
    emoji: "🌷",
    customizable: true,
    blurb: "Their birth-month flower, pressed and framed with their name.",
    desc: "We press the flower of their birth month and frame it with a hand-lettered name or date. A thoughtful, personal keepsake for birthdays and new beginnings.",
  },
  {
    id: "star-map-frame",
    name: "Custom Star Map & Letter Frame",
    category: "flowers",
    occasions: ["Anniversary", "Long Distance"],
    price: 1599,
    emoji: "✨",
    customizable: true,
    blurb: "The night sky of your special date, paired with a sealed note.",
    desc: "Tell us the date and place that matters and we render the exact night sky, mount it with a hand-written note, and frame it. The stars, the way they were, the night it began.",
  },
  {
    id: "flower-initial-keepsake",
    name: "Floral Initial Keepsake",
    category: "flowers",
    occasions: ["Anniversary", "Birthday"],
    price: 1299,
    emoji: "🌿",
    customizable: true,
    blurb: "A monogram formed from real dried flowers.",
    desc: "Choose an initial and we shape it from dried petals and stems, framed in glass. A personal botanical monogram for a shelf or desk.",
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
    occasions: ["Anniversary", "Birthday"],
    price: 1999,
    emoji: "🎁",
    customizable: true,
    blurb: "A layered unboxing: letter, flowers, wax seal & keepsake.",
    desc: "A curated wooden box that unfolds in layers - a sealed letter, a pressed-flower mini bouquet, and a keepsake trinket, staged for a filmable unboxing.",
  },
  {
    id: "wedding-vow-keepsake",
    name: "Wedding Vow Keepsake Frame",
    category: "flowers",
    occasions: ["Wedding", "Anniversary"],
    price: 1899,
    emoji: "💍",
    bestseller: true,
    customizable: true,
    blurb: "Your vows, hand-lettered and framed with your wedding flowers.",
    desc: "We hand-letter your vows onto aged paper, mount them with pressed flowers from your palette, and frame it in solid wood. Add a QR of your first-dance song to keep the day alive.",
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
    id: "scratch-date-night-box",
    name: "Scratch-to-Reveal Date Night Box",
    category: "boxes",
    occasions: ["Anniversary", "Birthday", "Just Because"],
    price: 1099,
    emoji: "🎟️",
    customizable: true,
    blurb: "Hand-made scratch cards hiding surprise dates and notes.",
    desc: "A set of aged scratch-off cards, each concealing a date idea, a memory, or a love note you choose. Interactive, playful, and endlessly re-openable.",
  },
  {
    id: "where-we-met-map",
    name: "\"Where We Met\" Pressed Map",
    category: "flowers",
    occasions: ["Anniversary", "Long Distance"],
    price: 1699,
    emoji: "🗺️",
    customizable: true,
    blurb: "A hand-illustrated map of your place, pressed with flowers.",
    desc: "Tell us the spot your story began and we hand-mark it on an antiqued map, press local-style blooms around it, and frame it with your date and note.",
  },
  {
    id: "newborn-keepsake-letter",
    name: "Newborn Welcome Keepsake",
    category: "letters",
    occasions: ["New Baby", "Just Because"],
    price: 999,
    emoji: "🍼",
    customizable: true,
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
    { id: "flowers", label: "Dried Flower Mini-Bouquet", price: 199 },
    { id: "audio", label: "QR Code Audio Recording", price: 299 },
    { id: "box", label: "Wooden Keepsake Box Packaging", price: 499 },
  ],
};

// --- Reference photos (curated, subject-matched free photos via Unsplash) ---
// Each ID was picked to match the actual gift type. Swap `p.img` / `c.img`
// for your own product photography before launch.
window.INKWELL.photoURL = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&q=80&auto=format&fit=crop`;

const PHOTO_ID = {
  // Letters & notes — sealed envelopes, wax, handwriting.
  "custom-vintage-letter": "1642069526127-75907e007187",
  "love-letter-bundle": "1642069525937-ce9e8b24413a",
  "open-when-letters": "1573046171778-f6506436ec62",
  "reasons-i-love-you-deck": "1638607290333-a5702465d1f9",
  "long-distance-letter": "1642069526127-75907e007187",
  "newborn-keepsake-letter": "1573046171778-f6506436ec62",
  "remembrance-letter": "1642069525937-ce9e8b24413a",
  // Pressed flowers & framed keepsakes.
  "pressed-flower-frame": "1775780307681-3340157a1d26",
  "birth-flower-frame": "1644664575825-931a3a101279",
  "flower-initial-keepsake": "1621264411684-b3ff856c1d49",
  "pressed-flower-bookmark": "1631423020277-ee28d5912971",
  "wedding-vow-keepsake": "1644664575825-931a3a101279",
  "where-we-met-map": "1621264411684-b3ff856c1d49",
  "star-map-frame": "1488866022504-f2584929ca5f",
  // Boxes & jars.
  "memory-jar": "1518745751685-7de700e56f72",
  "365-days-of-us-jar": "1523292426375-339a4ba8e0bd",
  "anniversary-time-capsule": "1610377507996-dcd4f0cfc125",
  "vintage-gift-box": "1545844568-98bb15133ec0",
  "scratch-date-night-box": "1592903297149-37fb25202dfa",
};
const CAT_ID = {
  letters: "1642069526127-75907e007187",
  flowers: "1775780307681-3340157a1d26",
  boxes: "1545844568-98bb15133ec0",
};

window.INKWELL.PRODUCTS.forEach((p) => {
  p.img = window.INKWELL.photoURL(PHOTO_ID[p.id] || CAT_ID[p.category], 800, 600);
});
window.INKWELL.CATEGORIES.forEach((c) => {
  c.img = window.INKWELL.photoURL(CAT_ID[c.slug], 900, 1100);
});

window.INKWELL.getProduct = (id) => window.INKWELL.PRODUCTS.find((p) => p.id === id);
