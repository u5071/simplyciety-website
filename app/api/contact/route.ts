import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, phone, serviceType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "이름, 이메일, 문의 내용은 필수 항목입니다." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "올바른 이메일 주소를 입력해주세요." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const serviceLabel: Record<string, string> = {
      consulting: "AX 컨설팅",
      platform: "AI/Data 플랫폼 구축",
      education: "교육·조직문화빌딩",
      lecture: "강연 요청",
      other: "기타",
    };

    await transporter.sendMail({
      from: `"simplyciety 문의" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[simplyciety] ${serviceLabel[serviceType] ?? "문의"} — ${company ? `${company} / ` : ""}${name}`,
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; padding: 40px;">
          <div style="background: #080808; padding: 24px 32px; margin-bottom: 2px;">
            <p style="color: #B8965A; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 4px;">simplyciety</p>
            <h1 style="color: #F0EDE8; font-size: 22px; font-weight: 300; margin: 0;">새 문의가 도착했습니다</h1>
          </div>
          <div style="background: #fff; padding: 32px; border: 1px solid #eee;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 0; color: #999; width: 100px; font-size: 12px;">문의 유형</td>
                <td style="padding: 12px 0; color: #1a1a1a; font-weight: 500;">${serviceLabel[serviceType] ?? serviceType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 0; color: #999; font-size: 12px;">이름</td>
                <td style="padding: 12px 0; color: #1a1a1a;">${name}</td>
              </tr>
              ${company ? `<tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 12px 0; color: #999; font-size: 12px;">회사</td><td style="padding: 12px 0; color: #1a1a1a;">${company}</td></tr>` : ""}
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 0; color: #999; font-size: 12px;">이메일</td>
                <td style="padding: 12px 0; color: #1a1a1a;"><a href="mailto:${email}" style="color: #B8965A;">${email}</a></td>
              </tr>
              ${phone ? `<tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 12px 0; color: #999; font-size: 12px;">연락처</td><td style="padding: 12px 0; color: #1a1a1a;">${phone}</td></tr>` : ""}
              <tr>
                <td style="padding: 12px 0; color: #999; font-size: 12px; vertical-align: top;">문의 내용</td>
                <td style="padding: 12px 0; color: #1a1a1a; line-height: 1.8; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <p style="color: #aaa; font-size: 11px; margin-top: 16px; text-align: center;">
            simplyciety.com — Less noise. More signal.
          </p>
        </div>
      `,
    });

    // 발신자에게 자동 회신
    await transporter.sendMail({
      from: `"simplyciety" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `[simplyciety] 문의가 접수되었습니다`,
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; padding: 40px;">
          <div style="background: #080808; padding: 24px 32px; margin-bottom: 2px;">
            <p style="color: #B8965A; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 4px;">simplyciety</p>
            <h1 style="color: #F0EDE8; font-size: 22px; font-weight: 300; margin: 0;">문의가 접수되었습니다</h1>
          </div>
          <div style="background: #fff; padding: 32px; border: 1px solid #eee;">
            <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
              안녕하세요, ${name}님.<br>
              simplyciety에 문의해 주셔서 감사합니다.
            </p>
            <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
              접수하신 <strong>${serviceLabel[serviceType] ?? "문의"}</strong> 내용을 확인 후,
              영업일 기준 <strong>1~2일 이내</strong>에 연락드리겠습니다.
            </p>
            <p style="color: #999; font-size: 13px; line-height: 1.6; margin: 0;">
              빠른 답변이 필요하신 경우<br>
              <a href="mailto:hello@simplyciety.com" style="color: #B8965A;">hello@simplyciety.com</a>으로 직접 연락 주세요.
            </p>
          </div>
          <p style="color: #aaa; font-size: 11px; margin-top: 16px; text-align: center;">
            simplyciety.com — Less noise. More signal.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
