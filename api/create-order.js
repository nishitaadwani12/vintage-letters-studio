// Vercel serverless function: create a Razorpay order for the cart.
// The amount is recomputed server-side from the trusted catalog.
// Requires env vars: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET.
const Razorpay = require("razorpay");
const { computeTotal } = require("./_catalog");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    res.status(500).json({ error: "Payments are not configured yet." });
    return;
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const totalInr = computeTotal(body.items); // throws on empty/unknown
    const rzp = new Razorpay({ key_id, key_secret });
    const order = await rzp.orders.create({
      amount: totalInr * 100, // paise
      currency: "INR",
      receipt: "at_" + Date.now(),
      notes: { source: "asli-tohfa-web" },
    });
    res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: key_id });
  } catch (err) {
    res.status(400).json({ error: err.message || "Could not create order" });
  }
};
