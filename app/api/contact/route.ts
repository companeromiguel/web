/**
 * /api/contact
 *
 * POST — receives the contact form submission, sends an email to
 * customercare.tmcwd@gmail.com via Resend, and returns a JSON result.
 *
 * Rate limiting: 3 submissions per IP per hour via Upstash Redis.
 *
 * Required env vars:
 *   RESEND_API_KEY          — get one at https://resend.com
 *   UPSTASH_REDIS_REST_URL  — Upstash Redis REST URL
 *   UPSTASH_REDIS_REST_TOKEN — Upstash Redis REST token
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const RATE_LIMIT      = 3;    // max submissions
const RATE_WINDOW_SEC = 3600; // per hour (3600 seconds)

/** Run a single Upstash Redis command via REST */
async function redis<T>(command: unknown[]): Promise<T> {
  const res = await fetch(REDIS_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const json = await res.json() as { result: T };
  return json.result;
}

/**
 * Check and increment the rate limit counter for a given IP.
 * Returns { allowed: true } or { allowed: false, retryAfter: seconds }.
 */
async function checkRateLimit(ip: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  if (!REDIS_URL || !REDIS_TOKEN) return { allowed: true }; // skip if Redis not configured

  const key = `contact:rl:${ip}`;

  try {
    // Increment counter — returns new value
    const count = await redis<number>(["INCR", key]);

    if (count === 1) {
      // First request — set expiry window
      await redis(["EXPIRE", key, RATE_WINDOW_SEC]);
    }

    if (count > RATE_LIMIT) {
      // Get remaining TTL so we can tell the user how long to wait
      const ttl = await redis<number>(["TTL", key]);
      return { allowed: false, retryAfter: ttl > 0 ? ttl : RATE_WINDOW_SEC };
    }

    return { allowed: true };
  } catch {
    // If Redis is down, fail open — don't block legitimate users
    return { allowed: true };
  }
}

// Concern type labels — must match the values in ContactForm.tsx
const CONCERN_LABELS: Record<string, string> = {
  billing:        "Billing & Account",
  leak:           "Leak / Water Supply Concern",
  application:    "New Water Application",
  disconnection:  "Disconnection / Reconnection",
  other:          "Other",
};

export async function POST(req: NextRequest) {
  // ── Parse & validate ──────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, accountNumber, concernType, message, honeypot } =
    body as Record<string, string>;

  // Honeypot — bots fill hidden fields; humans don't
  if (honeypot) {
    return NextResponse.json({ ok: true }); // silently drop
  }

  // ── Rate limiting ─────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, retryAfter } = await checkRateLimit(ip);
  if (!allowed) {
    const minutes = Math.ceil((retryAfter ?? RATE_WINDOW_SEC) / 60);
    return NextResponse.json(
      { error: `Too many submissions. Please wait ${minutes} minute${minutes !== 1 ? "s" : ""} before trying again.` },
      { status: 429, headers: { "Retry-After": String(retryAfter ?? RATE_WINDOW_SEC) } }
    );
  }

  if (!name?.trim() || !email?.trim() || !concernType?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, concern type, and message are required." },
      { status: 422 }
    );
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  if (message.trim().length < 10) {
    return NextResponse.json(
      { error: "Message is too short. Please describe your concern in more detail." },
      { status: 422 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "Email service is not configured. Please contact us by phone." },
      { status: 503 }
    );
  }

  // ── Send email ───────────────────────────────────────────────────
  const concernLabel = CONCERN_LABELS[concernType] ?? concernType;
  const subject = `[Website Inquiry] ${concernLabel} — ${name.trim()}`;

  const htmlBody = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#2A2A29;">
      <div style="background:#0591D4;padding:20px 24px;border-radius:8px 8px 0 0;">
        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75);letter-spacing:0.1em;text-transform:uppercase;">
          TMCWD Website Inquiry
        </p>
        <h1 style="margin:6px 0 0;font-size:20px;color:#fff;">${concernLabel}</h1>
      </div>
      <div style="border:1px solid #C4DAE7;border-top:none;border-radius:0 0 8px 8px;padding:24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:8px 0;color:#52616B;width:140px;vertical-align:top;">Full Name</td>
            <td style="padding:8px 0;font-weight:600;">${escapeHtml(name.trim())}</td>
          </tr>
          <tr style="border-top:1px solid #EEF4F8;">
            <td style="padding:8px 0;color:#52616B;vertical-align:top;">Email</td>
            <td style="padding:8px 0;font-weight:600;"><a href="mailto:${escapeHtml(email.trim())}" style="color:#0591D4;">${escapeHtml(email.trim())}</a></td>
          </tr>
          <tr style="border-top:1px solid #EEF4F8;">
            <td style="padding:8px 0;color:#52616B;vertical-align:top;">Account No.</td>
            <td style="padding:8px 0;font-weight:600;">${accountNumber?.trim() ? escapeHtml(accountNumber.trim()) : "<em style='color:#94A3B8;font-weight:400;'>Not provided</em>"}</td>
          </tr>
          <tr style="border-top:1px solid #EEF4F8;">
            <td style="padding:8px 0;color:#52616B;vertical-align:top;">Concern Type</td>
            <td style="padding:8px 0;font-weight:600;">${escapeHtml(concernLabel)}</td>
          </tr>
          <tr style="border-top:1px solid #EEF4F8;">
            <td style="padding:8px 0;color:#52616B;vertical-align:top;">Message</td>
            <td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(message.trim())}</td>
          </tr>
        </table>
        <p style="margin:24px 0 0;font-size:12px;color:#94A3B8;">
          Sent from the TMCWD website contact form · ${new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" })}
        </p>

        <!-- Reply template separator -->
        <div style="margin-top:32px;padding-top:24px;border-top:2px solid #EEF4F8;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#94A3B8;">
            Suggested reply to ${escapeHtml(name.trim())}
          </p>
          <div style="background:#F8FBFD;border:1px solid #C4DAE7;border-radius:8px;padding:20px;font-size:14px;line-height:1.8;color:#2A2A29;">
            <p style="margin:0 0 12px;">Dear ${escapeHtml(name.trim())},</p>
            <p style="margin:0 0 12px;">Thank you for reaching out to the Trece Martires City Water District. We have received your inquiry regarding <strong>${escapeHtml(concernLabel)}</strong> and will attend to it accordingly.</p>
            <p style="margin:0 0 12px;">Should you have further questions or concerns, please do not hesitate to contact us through the following:</p>
            <ul style="margin:0 0 12px;padding-left:20px;">
              <li>Telephone: (046) 419-2664</li>
              <li>Cell Phone: 0917-805-0391</li>
              <li>Email: <a href="mailto:customercare.tmcwd@gmail.com" style="color:#0591D4;">customercare.tmcwd@gmail.com</a></li>
            </ul>
            <p style="margin:0 0 4px;">Thank you for your patience and cooperation.</p>
            <p style="margin:0;">We look forward to serving you.</p>
            <br/>
            <p style="margin:0;font-weight:600;">Customer Service Department</p>
            <p style="margin:0;font-weight:700;color:#0591D4;">TRECE MARTIRES CITY WATER DISTRICT</p>
            <p style="margin:4px 0 0;font-size:12px;color:#52616B;">
              Front of Quintana Executive Homes, Brgy. San Agustin, Trece Martires City, Cavite<br/>
              Tel: (046) 419-2664 &nbsp;|&nbsp; Cell: 0917-805-0391<br/>
              <a href="mailto:customercare.tmcwd@gmail.com" style="color:#0591D4;">customercare.tmcwd@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "TMCWD Website <onboarding@resend.dev>",
      to:   ["customercare.tmcwd@gmail.com"],
      replyTo: email.trim(),
      subject,
      html: htmlBody,
      headers: {
        // Pre-fills the subject when staff hits Reply in Gmail
        "X-Reply-Subject": `Re: ${subject}`,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again or contact us by phone." },
      { status: 500 }
    );
  }
}

/** Escape user-supplied strings before inserting into HTML */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
