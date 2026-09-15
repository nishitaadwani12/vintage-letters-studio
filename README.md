# Asli Tohfa - Handmade Gifting & Vintage Letters

A 3D, interactive storefront for a handmade sentimental gifting studio specializing in **custom vintage love letters, wax-sealed keepsakes, and personalized romantic gifts.**

> Turn Your Words into Timeless Keepsakes.

**Live demo:** https://nishitaadwani12.github.io/vintage-letters-studio/

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | 3D wax-sealed-envelope hero (drag to explore), category grid, How-It-Works, best-sellers, reviews |
| Shop | `shop.html` | Filterable catalog by **category** and **occasion** (deep-linkable via `?cat=` / `?occ=`) |
| Product | `product.html?id=…` | Product detail; customizable items get a **live letter preview** + options |
| Custom Request | `custom-request.html` | **Free-form custom gift request form** with aesthetic prefs, file/audio upload, validation |
| Cart & Checkout | `cart.html` | Line items, gift note, discreet packaging, scheduled delivery, order summary |
| About | `about.html` | Brand story + values |
| Contact | `contact.html` | Contact / order-tracking form |

## Features

- **3D hero scene** (Three.js) - draggable wax-sealed envelope, rising letter, drifting pressed-flower petals, warm vintage lighting. Degrades gracefully if WebGL is unavailable.
- **Live product customizer** (real-time letter preview): message + **word-count counter**, **font/script**, **wax seal color**, **paper type**, and **priced add-ons** (dried flowers, QR audio, keepsake box), plus optional audio upload.
- **Custom gift request form** - a large free-text box for one-of-a-kind requests, occasion/budget/date fields, optional wax + paper preferences, attachment upload, discreet-shipping option, live validation, and a prefilled email submit.
- **Persistent cart** - stored in `localStorage`, shared across every page, with a slide-out drawer + full cart page.
- **Filterable shop**, gift note + scheduled delivery + discreet packaging at checkout.
- Scroll-reveal animations, sticky nav, mobile menu, 100% responsive, SEO meta + OpenGraph tags.

## Architecture

Vanilla HTML/CSS/JS - no build step, deploys straight to any static host.

```
vintage-letters-studio/
├── index.html  shop.html  product.html
├── custom-request.html  cart.html  about.html  contact.html
├── assets/
│   ├── data.js      # product catalog + option sets (edit this to add products)
│   ├── layout.js    # shared nav/footer/cart-drawer injection + localStorage cart
│   ├── cards.js     # shared product-card renderer
│   ├── styles.css   # brand system + all page styles
│   ├── scene.js     # Three.js 3D hero
│   ├── home.js  shop.js  product.js  request.js  cart.js
└── README.md
```

**Shared layout:** every page has `<div id="layout-top">` and `<div id="layout-bottom">` mount points; `layout.js` injects the nav, footer, and cart drawer, so there's one source of truth.

**Add a product:** append an object to `PRODUCTS` in `assets/data.js`. Set `customizable: true` to give it the live customizer.

## Brand theme — "Rosewood & Marigold" (Heirloom)

An elegant vintage-romantic palette with a warm Indian-heritage nod that fits the brand's Hindi name (*Asli Tohfa* = "real gift"). Chosen to be the refined, timeless counterpart to a playful pastel brand — quiet, warm, and expensive-feeling.

| Token | Value | Use |
|---|---|---|
| Ivory | `#fdf9f0` | base background |
| Aged Parchment | `#f3e7cf` | panels, alt sections |
| Rosewood Burgundy | `#6b1d2f` | primary, headings accent |
| Antique Gold | `#cba53a` | fine accents, rules |
| Marigold | `#e4a11b` | warm heritage highlight |
| Soft Rose | `#c97b84` | romantic accent, hovers |
| Warm Ink | `#2b2320` | body text |
| Muted Botanical (Sage) | `#8a9a86` | quiet secondary |

Type: **Cormorant Garamond** (serif headings) · **Inter** (body) · **Dancing Script** (letter preview).

## Run locally

Static, but the ES-module import map for Three.js needs a server:

```bash
cd vintage-letters-studio
python3 -m http.server 8000
# open http://localhost:8000
```

## Going live (what's left before real transactions)

This is a fully-built **front end**. To transact real money and capture orders you need a backend - pick one:

1. **Payments** - the checkout button is a prototype confirmation. Integrate Stripe/Shopify/PayPal (Apple Pay & Google Pay come with Stripe/Shopify). Easiest path for this exact design: keep the front end and use **Shopify** headless or a **Stripe Payment Link / Checkout** per product.
2. **Form delivery** - the contact and custom-request forms keep a local backup and deliver via **Formspree**. Set the `FORMSPREE_ENDPOINT` in `assets/request.js` and `contact.html` (see `DEPLOY.md`). The destination inbox is configured in the Formspree dashboard only — never hardcoded in the site.
3. **File/audio uploads** - the upload fields are wired in the UI; real storage needs the same backend/form service.
4. **Order tracking & emails** - Razorpay emails you on each payment; add a webhook + email service later for branded confirmations.

No email address is stored in the site code or page source. Set your inbox in the Formspree and Razorpay dashboards. Swap **Asli Tohfa** for your final brand name if it changes.
