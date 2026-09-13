# Inkwell & Ivy — Handmade Gifting & Vintage Letters

A 3D, interactive prototype site for a handmade sentimental gifting studio specializing in **custom vintage love letters, wax-sealed keepsakes, and personalized romantic gifts.**

> Turn Your Words into Timeless Keepsakes.

## What's here

A fast, mobile-first, single-page storefront prototype built with vanilla HTML/CSS/JS + **Three.js** for an interactive 3D hero (a floating wax-sealed envelope with drifting pressed-flower petals — drag to explore).

### Features implemented
- **3D hero scene** (Three.js) — draggable wax-sealed envelope, rising letter, floating petals, warm vintage lighting. Degrades gracefully if WebGL is unavailable.
- **Live product customizer (PDP)** with a real-time letter preview:
  - Message text area with **word-count counter**
  - **Font/script** selector (Calligraphy · Typewriter · Classic Cursive)
  - **Wax seal color** swatches (Burgundy · Antique Gold · Forest Green · Blush Pink)
  - **Paper type** selector (Tea-Stained · Cotton Deckle · Parchment)
  - **Add-ons** with dynamic pricing (Dried Flowers · QR Audio · Keepsake Box)
- **Category grid**, **How It Works** (3 steps), **best-sellers/reviews**, **About** brand story.
- **Cart drawer** with discreet gift packaging + scheduled delivery date options.
- Scroll reveal animations, sticky nav, full mobile responsiveness, basic SEO meta + OG tags.

### Brand system
| Token | Value |
|---|---|
| Cream | `#fdfbf7` |
| Vintage Parchment | `#f4ead5` |
| Deep Burgundy | `#6b1d2f` |
| Antique Gold | `#d4af37` |
| Soft Sage | `#8a9a86` |

Type: **Cormorant Garamond** (serif headings) + **Inter** (body) + **Dancing Script** (letter preview).

## Run locally

It's static — serve the folder with any web server (needed for the ES-module import map):

```bash
cd vintage-letters-studio
python3 -m http.server 8000
# open http://localhost:8000
```

## Path to production

This is a **design/UX prototype**. For a launch-ready store with real payments, orders, and inventory, port it onto an e-commerce platform:

- **Shopify** (recommended for this use case) — use a custom Liquid theme built from this design; add customization via a line-item-property app (e.g. Infinite Options / Variant Option Product Options) for the text area, swatches, file/audio upload, and add-on pricing. Supports Apple Pay / Google Pay / PayPal, order tracking, and email templates out of the box.
- **WooCommerce** — Product Add-Ons plugin for the custom fields; more control, more maintenance.
- **Webflow** — best if you want to keep this exact bespoke design; e-commerce is lighter on complex per-item customization.

## Structure
```
vintage-letters-studio/
├── index.html          # markup + sections
├── assets/
│   ├── styles.css      # brand system + layout
│   ├── scene.js        # Three.js 3D hero
│   └── main.js         # customizer + cart logic
└── README.md
```
