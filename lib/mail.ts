import nodemailer from "nodemailer";

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Where inquiry & waitlist notifications go. Override with NOTIFY_EMAIL. */
export const NOTIFY_TO = process.env.NOTIFY_EMAIL || "yang5071@gmail.com";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function mailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export function createTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

/** Wraps body HTML in the simplyciety email frame. */
export function emailFrame(heading: string, bodyHtml: string) {
  return `
    <div style="font-family: 'Apple SD Gothic Neo', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; padding: 40px;">
      <div style="background: #080808; padding: 24px 32px; margin-bottom: 2px;">
        <p style="color: #B8965A; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 4px;">simplyciety</p>
        <h1 style="color: #F0EDE8; font-size: 22px; font-weight: 300; margin: 0;">${heading}</h1>
      </div>
      <div style="background: #fff; padding: 32px; border: 1px solid #eee;">${bodyHtml}</div>
      <p style="color: #aaa; font-size: 11px; margin-top: 16px; text-align: center;">
        simplyciety.com — Less noise. More signal.
      </p>
    </div>
  `;
}
