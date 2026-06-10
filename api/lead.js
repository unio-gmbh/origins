// Vercel serverless function: receives a lead from the landing-page form
// (same-origin POST /api/lead), adds projectId + the webhook secret, and
// forwards it to the Unio leads API. The secret stays server-side.
//
// Required env var (set in the Vercel project settings):
//   UNIO_WEBHOOK_SECRET = <the X-Webhook-Secret value>

const UNIO_LEADS_URL = "https://api.unio.estate/api/public/landing-page-leads";
const PROJECT_ID = 6;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const secret = process.env.UNIO_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "not_configured", message: "UNIO_WEBHOOK_SECRET is not set" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    // projectId is fixed server-side; never trust a client-supplied value.
    const { projectId, ...rest } = body;
    const payload = { projectId: PROJECT_ID, ...rest };

    const upstream = await fetch(UNIO_LEADS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Webhook-Secret": secret },
      body: JSON.stringify(payload),
    });

    const detail = await upstream.text();
    if (!upstream.ok) {
      console.error("Unio leads upstream error", upstream.status, detail);
      return res.status(502).json({ error: "upstream_error", status: upstream.status });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Lead proxy error", e);
    return res.status(500).json({ error: "proxy_error" });
  }
};
