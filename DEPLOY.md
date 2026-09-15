# Go Live — Asli Tohfa

This site is deploy-ready with **real Razorpay payments** (INR: UPI, cards, netbanking) and **real form delivery**. It's built for **Vercel** (free, runs the serverless payment functions and auto-deploys from GitHub).

Everything below is a one-time setup. The code already handles the rest.

---

## 1. Deploy to Vercel (5 min)

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account.
2. **Add New → Project → Import** `nishitaadwani12/vintage-letters-studio`.
3. Framework preset: **Other**. Leave build/output settings empty (it's a static site + `/api` functions). Click **Deploy**.
4. You'll get a live URL like `https://asli-tohfa.vercel.app`. You can add a custom domain later in Project → Settings → Domains.

Vercel automatically serves the pages and runs `api/create-order.js` + `api/verify.js` as serverless functions, and installs the `razorpay` dependency from `package.json`.

---

## 2. Turn on payments (Razorpay)

1. Create an account at [razorpay.com](https://razorpay.com) and complete KYC (needed for **live** mode; you can test first without it).
2. Dashboard → **Settings → API Keys → Generate Key**. Copy the **Key ID** and **Key Secret**.
   - Start in **Test Mode** to trial the flow, then switch to **Live** keys when ready.
3. In Vercel → your project → **Settings → Environment Variables**, add:
   | Name | Value |
   |---|---|
   | `RAZORPAY_KEY_ID` | your Key ID |
   | `RAZORPAY_KEY_SECRET` | your Key Secret |
4. **Redeploy** (Deployments → ⋯ → Redeploy) so the functions pick up the keys.

That's it — the Checkout button now opens the secure Razorpay UPI/card window, the amount is recomputed server-side from the catalog, and payments are signature-verified.

**Test it:** in Test Mode use Razorpay's test card `4111 1111 1111 1111`, any future expiry/CVV, or test UPI `success@razorpay`.

---

## 3. Turn on form delivery (Formspree)

So the **Custom Gift Request** and **Contact** forms reach your inbox with no server:

1. Sign up at [formspree.io](https://formspree.io) (free tier = 50 submissions/mo).
2. Create a form and set its **destination inbox** to your private studio Gmail.
   > Privacy: that address is entered **only in the Formspree dashboard** — never in this repo or the site's page source, so it stays hidden from visitors and web scrapers.
3. Copy the form endpoint (e.g. `https://formspree.io/f/abcd1234`) and paste it (replacing `YOUR_FORM_ID`) in **two** places:
   - `assets/request.js` → `FORMSPREE_ENDPOINT`
   - `contact.html` → `FORMSPREE_ENDPOINT`
4. Commit + push — Vercel auto-redeploys.

Until you do this, form submissions are validated and kept as a local backup in the visitor's browser, but are **not delivered** — so configure Formspree before launch.

---

## What's automatic vs. manual

- **Payment amount**: recomputed server-side from `api/_catalog.js` (keep prices in sync with `assets/data.js`).
- **Order details** (gift note, delivery date, discreet flag) are attached to the Razorpay order notes and visible in your Razorpay dashboard.
- **Order emails / fulfillment tracking**: Razorpay emails you on each payment; for branded confirmation emails or an admin dashboard you can later add a webhook + email service (Resend/SendGrid). Not required to accept money.

## Still on GitHub Pages?

The site still works there for browsing, but **payments need Vercel** (GitHub Pages can't run the serverless functions). Point customers to the Vercel URL for live checkout.
