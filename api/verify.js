// Vercel serverless function: verify a Razorpay payment signature.
// Requires env var: RAZORPAY_KEY_SECRET.
const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    res.status(500).json({ error: "Payments are not configured yet." });
    return;
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({ ok: false, error: "Missing payment fields" });
      return;
    }
    const expected = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    const ok = expected === razorpay_signature;
    res.status(ok ? 200 : 400).json({ ok });
  } catch (err) {
    res.status(400).json({ ok: false, error: "Verification failed" });
  }
};
