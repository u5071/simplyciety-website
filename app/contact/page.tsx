"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import { useLang } from "../contexts/LanguageContext";

const SERVICE_OPTIONS = [
  { value: "consulting", ko: "AX 컨설팅", en: "AX Consulting" },
  { value: "platform", ko: "AI/Data 플랫폼 구축", en: "AI/Data Platform" },
  { value: "education", ko: "교육·조직문화빌딩", en: "Education & Culture" },
  { value: "lecture", ko: "강연 요청", en: "Speaking Request" },
  { value: "other", ko: "기타 / 잘 모르겠어요", en: "Other / Not sure yet" },
];

const EXAMPLES: Record<string, { ko: string; en: string }> = {
  consulting: {
    ko: "예) 데이터는 있는데 AI를 어떻게 도입해야 할지 방향이 없습니다. 50명 규모 팀 기준으로 AI 전환 전략을 잡아드릴 수 있을까요?",
    en: "e.g. We have data but no idea where to start with AI. Can you help shape a transformation strategy for a 50-person team?",
  },
  platform: {
    ko: "예) AWS 기반으로 데이터 파이프라인을 처음 구축하려고 합니다. 현재 운영 중인 RDS에서 분석 환경까지 연결하고 싶어요.",
    en: "e.g. We want to build our first data pipeline on AWS — connecting our existing RDS database to an analytics environment.",
  },
  education: {
    ko: "예) 임원진의 AI 이해도가 낮아 데이터 조직이 예산을 확보하지 못하고 있습니다. C레벨 대상 AI 브리핑 과정을 제안해주실 수 있을까요?",
    en: "e.g. Our executives have low AI literacy and our data team can't get budget. Can you propose an AI briefing program for C-level?",
  },
  lecture: {
    ko: "예) 사내 DX 킥오프 행사에서 1시간 강연을 요청드립니다. 'AI 전환의 현실'을 주제로 실제 사례 중심으로 부탁드립니다.",
    en: "e.g. We'd like a 1-hour keynote at our internal DX kickoff event on 'The Reality of AI Transformation' with real case examples.",
  },
  other: {
    ko: "예) 정확히 어떤 서비스가 필요한지 모르겠지만, 현재 데이터 담당자 없이 영업 데이터를 엑셀로만 관리하고 있어서 변화가 필요합니다.",
    en: "e.g. I'm not sure what service fits, but we're managing all sales data in Excel with no dedicated data person — things need to change.",
  },
};

const PROCESS_STEPS = [
  { num: "01", title: { ko: "문의 접수", en: "Submit" }, desc: { ko: "폼 작성 또는 이메일로 현재 상황을 간단히 알려주세요.", en: "Fill out the form or email us with a brief description of your situation." } },
  { num: "02", title: { ko: "1:1 상담", en: "Consultation" }, desc: { ko: "영업일 1–2일 이내 담당자가 연락드려 상황을 더 깊이 파악합니다.", en: "We'll reach out within 1–2 business days to understand your situation in depth." } },
  { num: "03", title: { ko: "맞춤 제안", en: "Proposal" }, desc: { ko: "상황에 맞는 서비스 방향과 접근 방식을 구체적으로 제안드립니다.", en: "We propose a concrete service direction and approach matched to your situation." } },
];

type Status = "idle" | "loading" | "success" | "error";

function ContactForm() {
  const searchParams = useSearchParams();
  const { lang, t } = useLang();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    serviceType: searchParams.get("service") ?? "other",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "오류가 발생했습니다.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setStatus("error");
    }
  };

  const [showExample, setShowExample] = useState(false);

  const inputClass =
    "w-full bg-transparent border border-[rgba(255,255,255,0.08)] px-5 py-4 text-sm text-[#F0EDE8] placeholder:text-[#2A2A2A] outline-none focus:border-[#B8965A]/50 transition-colors duration-300 font-light tracking-wide";

  return (
    <div className="bg-[#080808] text-[#F0EDE8] font-[var(--font-geist-sans)] min-h-screen">
      <Nav />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "simplyciety 문의",
            url: "https://simplyciety.com/contact",
            description: "AX 컨설팅, 데이터 플랫폼 구축, AI 교육 및 강연 문의",
            mainEntity: {
              "@type": "Organization",
              name: "simplyciety",
              email: "hello@simplyciety.com",
              url: "https://simplyciety.com",
            },
          }),
        }}
      />

      {status === "success" ? (
        /* SUCCESS STATE */
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="text-center max-w-lg">
            <div className="w-16 h-16 rounded-full border border-[#B8965A]/40 flex items-center justify-center mx-auto mb-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polyline points="20,6 9,17 4,12" stroke="#B8965A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-6">{t("접수 완료", "Received")}</p>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-[0.95] tracking-tight mb-8">
              {t("문의가", "Your inquiry")}<br />
              <span className="italic text-[#B8965A]">{t("접수되었습니다.", "has been received.")}</span>
            </h1>
            <p className="text-[#5A5A5A] text-base leading-relaxed mb-10">
              {t("영업일 기준 1~2일 이내에 회신 드리겠습니다.", "We'll reply within 1–2 business days.")}<br />
              {t("입력하신 이메일로 접수 확인 메일을 보내드렸습니다.", "A confirmation email has been sent to your address.")}
            </p>
            <Link href="/services" className="btn-gold inline-flex">
              {t("서비스 더 보기 →", "View our services →")}
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* HERO */}
          <section className="relative px-8 md:px-16 pt-40 pb-20 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-[45vw] h-[50vh] pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top left, rgba(184,150,90,0.04) 0%, transparent 65%)" }}
            />
            <div className="relative max-w-screen-xl mx-auto">
              <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8 flex items-center gap-3">
                <span className="w-6 h-px bg-[#B8965A]" />
                Contact
              </p>
              <h1 className="text-[clamp(3rem,8vw,10rem)] font-extralight leading-[0.9] tracking-[-0.03em] mb-6">
                {t("문의하기", "Contact")}
              </h1>
              <p className="text-[#4A4A4A] text-base font-light max-w-lg">
                {t("어떤 서비스가 맞는지 몰라도 괜찮습니다. 상황을 간단히 적어주시면 맞는 방향을 제안드립니다.", "You don't need to know which service fits. Just describe your situation briefly and we'll point you in the right direction.")}
              </p>
            </div>
          </section>

          {/* FORM */}
          <section
            className="py-16 px-8 md:px-16"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
              {/* Form */}
              <div className="md:col-span-7">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A]">
                        {t("이름", "Name")} <span className="text-[#B8965A]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={t("홍길동", "Jane Smith")}
                        value={form.name}
                        onChange={set("name")}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A]">{t("회사명", "Company")}</label>
                      <input
                        type="text"
                        placeholder={t("(주)회사이름", "Acme Corp")}
                        value={form.company}
                        onChange={set("company")}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A]">
                        {t("이메일", "Email")} <span className="text-[#B8965A]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email@company.com"
                        value={form.email}
                        onChange={set("email")}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A]">{t("연락처", "Phone")}</label>
                      <input
                        type="tel"
                        placeholder={t("010-0000-0000", "+1 555-0000")}
                        value={form.phone}
                        onChange={set("phone")}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Service type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A]">
                      {t("문의 유형", "Inquiry Type")} <span className="text-[#B8965A]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, serviceType: opt.value }))}
                          className="text-[0.6rem] tracking-[0.2em] uppercase px-4 py-2.5 border transition-all duration-200"
                          style={{
                            borderColor: form.serviceType === opt.value ? "#B8965A" : "rgba(255,255,255,0.08)",
                            color: form.serviceType === opt.value ? "#B8965A" : "#3A3A3A",
                            background: form.serviceType === opt.value ? "rgba(184,150,90,0.06)" : "transparent",
                          }}
                        >
                          {lang === "ko" ? opt.ko : opt.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A]">
                        {t("문의 내용", "Message")} <span className="text-[#B8965A]">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowExample((v) => !v)}
                        className="text-[0.5rem] tracking-[0.2em] uppercase text-[#B8965A]/60 hover:text-[#B8965A] transition-colors"
                      >
                        {showExample ? t("예시 숨기기", "Hide example") : t("예시 보기 ↓", "Show example ↓")}
                      </button>
                    </div>
                    {showExample && (
                      <div
                        className="px-4 py-3 text-[0.7rem] leading-relaxed text-[#4A4A4A] font-light"
                        style={{ border: "1px solid rgba(184,150,90,0.15)", background: "rgba(184,150,90,0.03)" }}
                      >
                        {(EXAMPLES[form.serviceType] ?? EXAMPLES.other)[lang]}
                        <button
                          type="button"
                          onClick={() => {
                            setForm((f) => ({ ...f, message: (EXAMPLES[f.serviceType] ?? EXAMPLES.other)[lang] }));
                            setShowExample(false);
                          }}
                          className="block mt-2 text-[0.5rem] tracking-[0.2em] uppercase text-[#B8965A]/70 hover:text-[#B8965A] transition-colors"
                        >
                          {t("이 예시로 시작하기 →", "Use this example →")}
                        </button>
                      </div>
                    )}
                    <textarea
                      placeholder={t("현재 상황, 고민하고 계신 문제, 원하는 결과를 자유롭게 적어주세요.", "Describe your situation, the challenge you're facing, and the outcome you want.")}
                      value={form.message}
                      onChange={set("message")}
                      required
                      rows={7}
                      className={inputClass}
                      style={{ resize: "none" }}
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="text-red-400/70 text-xs">{errorMsg}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-gold self-start mt-2"
                    style={{ opacity: status === "loading" ? 0.6 : 1 }}
                  >
                    {status === "loading" ? t("전송 중...", "Sending...") : t("문의 전송 →", "Send inquiry →")}
                  </button>
                  <p className="text-[#2A2A2A] text-[0.55rem] tracking-widest uppercase">
                    {t("영업일 기준 1~2일 이내 회신 · 스팸 없음", "Reply within 1–2 business days · No spam")}
                  </p>
                </form>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-5 flex flex-col gap-12">
                {/* Direct contact */}
                <div>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A] mb-5">{t("직접 연락", "Direct Contact")}</p>
                  <a
                    href="mailto:hello@simplyciety.com"
                    className="text-[#6A6A6A] text-sm hover:text-[#B8965A] transition-colors"
                  >
                    hello@simplyciety.com
                  </a>
                </div>

                {/* LinkedIn */}
                <div>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A] mb-5">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/%EC%84%B1%EC%97%B4-%EC%96%91-bab2b4153/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 group"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="4" fill="#B8965A" opacity="0.12" />
                      <path d="M7 10h2v7H7v-7zm1-3a1.1 1.1 0 110 2.2A1.1 1.1 0 018 7zm4 3h2v1h.03C14.42 10.37 15.22 10 16 10c2.21 0 3 1.49 3 3.43V17h-2v-3.17c0-.95-.35-1.6-1.18-1.6-.88 0-1.32.62-1.32 1.58V17h-2v-7z" fill="#B8965A" opacity="0.6"/>
                    </svg>
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#3A3A3A] group-hover:text-[#B8965A] transition-colors">
                      {t("Mr. Simpler 프로필 ↗", "Mr. Simpler Profile ↗")}
                    </span>
                  </a>
                </div>

                {/* Services */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "2rem" }}>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A] mb-5">{t("서비스", "Services")}</p>
                  <div className="flex flex-col gap-3">
                    {[
                      { ko: "AX 컨설팅", en: "AX Consulting", href: "/services#consulting" },
                      { ko: "AI/Data 플랫폼 구축", en: "AI/Data Platform", href: "/services#platform" },
                      { ko: "교육·조직문화빌딩", en: "Education & Culture", href: "/services#education" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-[0.6rem] tracking-[0.2em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors"
                      >
                        {lang === "ko" ? item.ko : item.en} →
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "2rem" }}>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A] mb-6">{t("문의 프로세스", "Inquiry Process")}</p>
                  <div className="flex flex-col gap-5">
                    {PROCESS_STEPS.map((s, i) => (
                      <div key={s.num} className="flex items-start gap-4">
                        <span className="text-[0.5rem] tracking-[0.2em] text-[#B8965A]/50 font-light pt-0.5 flex-shrink-0 w-5">
                          {s.num}
                        </span>
                        <div>
                          <p className="text-[0.6rem] tracking-[0.15em] uppercase text-[#6A6A6A] mb-1">{s.title[lang]}</p>
                          <p className="text-[#3A3A3A] text-xs leading-relaxed font-light">{s.desc[lang]}</p>
                        </div>
                        {i < PROCESS_STEPS.length - 1 && (
                          <span className="text-[#2A2A2A] text-xs self-end ml-auto">↓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="px-8 md:px-16 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <Link href="/" className="hover:opacity-70 transition-opacity">
                <Logo markColor="rgba(184,150,90,0.25)" textColor="#2A2A2A" />
              </Link>
              <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#1A1A1A]">Less noise. More signal.</span>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="bg-[#080808] min-h-screen" />}>
      <ContactForm />
    </Suspense>
  );
}
