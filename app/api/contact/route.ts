/**
 * /api/contact
 *
 * POST — receives the contact form submission, sends an email to
 * customercare.tmcwd@gmail.com via Resend, and returns a JSON result.
 *
 * Required env var:
 *   RESEND_API_KEY  — get one at https://resend.com (free tier: 100 emails/day)
 *
 * Rate-limiting is intentionally kept simple (one submission per request).
 * Add a Redis-based limiter if abuse becomes a concern.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const { name, accountNumber, concernType, message, honeypot } =
    body as Record<string, string>;

  // Honeypot — bots fill hidden fields; humans don't
  if (honeypot) {
    return NextResponse.json({ ok: true }); // silently drop
  }

  if (!name?.trim() || !concernType?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, concern type, and message are required." },
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
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "TMCWD Website <onboarding@resend.dev>",
      to:   ["tmcwdadmin@gmail.com"],
      replyTo: undefined,
      subject,
      html: htmlBody,
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
