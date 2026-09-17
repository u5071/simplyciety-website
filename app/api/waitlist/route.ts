import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE, NOTIFY_TO, createTransport, emailFrame, escapeHtml, mailConfigured } from "../../../lib/mail";
import { LAUNCH_DATE, addToWaitlist, storageConfigured, type WaitlistEntry } from "../../../lib/waitlist";

const DATA_TYPES = ["spreadsheets", "rdb", "nosql", "graph", "docs"];
const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : undefined);

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ success: true, position: null });
  }

  const email = clip(body.email, 254)?.toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const entry: WaitlistEntry = {
    email,
    name: clip(body.name, 100),
    company: clip(body.company, 150),
    role: clip(body.role, 60),
    teamSize: clip(body.teamSize, 30),
    dataTypes: Array.isArray(body.dataTypes)
      ? body.dataTypes.filter((d): d is string => typeof d === "string" && DATA_TYPES.includes(d))
      : undefined,
    useCase: clip(body.useCase, 1000),
    lang: body.lang === "en" ? "en" : "ko",
    source: clip(body.source, 200),
  };

  if (!storageConfigured() && !mailConfigured()) {
    console.error("Waitlist: neither storage nor mail is configured");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  let position: number | null = null;
  let isNew = true;
  let stored = false;
  if (storageConfigured()) {
    try {
      ({ position, isNew } = await addToWaitlist(entry));
      stored = true;
    } catch (err) {
      console.error("Waitlist storage error:", err);
      if (!mailConfigured()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
    }
  }

  if (isNew && mailConfigured()) {
    try {
      const transporter = createTransport();
      const rows = Object.entries(entry)
        .filter(([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
        .map(
          ([k, v]) =>
            `<tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 0;color:#999;font-size:12px;width:110px;">${escapeHtml(k)}</td><td style="padding:10px 0;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(Array.isArray(v) ? v.join(", ") : v)}</td></tr>`
        )
        .join("");

      await transporter.sendMail({
        from: `"dataSimplr waitlist" <${process.env.GMAIL_USER}>`,
        to: NOTIFY_TO,
        replyTo: email,
        subject: `[dataSimplr] 대기명단 등록${position ? ` #${position}` : ""} — ${entry.company ? `${entry.company} / ` : ""}${email}`,
        html: emailFrame(
          `대기명단 신규 등록${position ? ` #${position}` : ""}`,
          `<table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>`
        ),
      });

      const en = entry.lang === "en";
      const greeting = entry.name ? escapeHtml(entry.name) : en ? "there" : "";
      await transporter.sendMail({
        from: `"dataSimplr by simplyciety" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: en ? "You're on the dataSimplr waitlist" : "[dataSimplr] 대기명단 등록이 완료되었습니다",
        html: emailFrame(
          en ? "You're on the list" : "대기명단에 등록되었습니다",
          en
            ? `<p style="color:#333;font-size:15px;line-height:1.8;margin:0 0 20px;">Hi ${greeting},<br>Thanks for joining the dataSimplr waitlist${position ? ` — you're <strong>#${position}</strong>` : ""}.</p>
               <p style="color:#333;font-size:15px;line-height:1.8;margin:0 0 20px;">dataSimplr launches on <strong>October 18, 2026</strong>. We'll send invites in waitlist order.</p>
               <p style="color:#999;font-size:13px;line-height:1.6;margin:0;">We only use your email to send launch updates. Reply to this email to be removed.</p>`
            : `<p style="color:#333;font-size:15px;line-height:1.8;margin:0 0 20px;">${greeting ? `${greeting}님, ` : ""}dataSimplr 대기명단에 등록해 주셔서 감사합니다${position ? ` — 대기 순번은 <strong>${position}번</strong>입니다` : ""}.</p>
               <p style="color:#333;font-size:15px;line-height:1.8;margin:0 0 20px;">dataSimplr는 <strong>2026년 10월 18일</strong> 출시 예정이며, 등록 순서대로 초대 메일을 보내드립니다.</p>
               <p style="color:#999;font-size:13px;line-height:1.6;margin:0;">입력하신 정보는 출시 안내에만 사용합니다. 이 메일에 회신하시면 명단에서 삭제해 드립니다.</p>`
        ),
      });
    } catch (err) {
      console.error("Waitlist mail error:", err);
      // If the entry was stored, the signup still counts.
      if (!stored) return NextResponse.json({ error: "unavailable" }, { status: 503 });
    }
  }

  return NextResponse.json({ success: true, position, alreadyJoined: !isNew, launchDate: LAUNCH_DATE });
}
