/**
 * Contact notification email.
 *
 * Priority:
 *  1. Resend REST API (if RESEND_API_KEY + RESEND_FROM set) — no SDK, plain fetch.
 *  2. SMTP via nodemailer (if SMTP_HOST set).
 *  3. Else: console.log + skip.
 *
 * Recipient = CONTACT_NOTIFICATION_EMAIL.
 * ALWAYS wrapped in try/catch — must NEVER throw to the contact route or crash the API.
 */

export interface ContactNotificationPayload {
  name: string;
  email: string;
  company?: string | null;
  inquiryType: string;
  message: string;
  preferredResponse: string;
  submittedAt: string;
}

export async function sendContactNotification(payload: ContactNotificationPayload): Promise<void> {
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!to) {
    console.warn("[email] CONTACT_NOTIFICATION_EMAIL not set — skipping notification.");
    return;
  }

  const subject = `New portfolio inquiry — ${payload.inquiryType}`;
  const text = [
    `New contact form submission on your portfolio.`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    `Inquiry type: ${payload.inquiryType}`,
    `Preferred response: ${payload.preferredResponse}`,
    `Submitted at: ${payload.submittedAt}`,
    ``,
    `Message:`,
    payload.message,
    ``,
    `— Sent from the Obasiochie Vincent Chimaobi portfolio contact form.`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const resendKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;
    const smtpHost = process.env.SMTP_HOST;

    if (resendKey && resendFrom) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [to],
          reply_to: payload.email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.warn(`[email] Resend API failed (${res.status}): ${errText}`);
        return;
      }
      console.log("[email] Sent via Resend.");
      return;
    }

    if (smtpHost) {
      // Lazy-import nodemailer only when SMTP is configured.
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT ?? 587) === 465,
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS ?? "" }
          : undefined,
      });
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER || `Portfolio <noreply@${smtpHost}>`,
        to,
        replyTo: payload.email,
        subject,
        text,
      });
      console.log("[email] Sent via SMTP.");
      return;
    }

    // No transport configured — log and skip.
    console.log("[email] No transport configured. Notification payload:");
    console.log(text);
  } catch (err) {
    // NEVER throw — the contact route must not crash on email failure.
    console.error("[email] sendContactNotification failed (suppressed):", err);
  }
}
