"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Nav from "../components/Nav";

const SERVICE_OPTIONS = [
  { value: "consulting", label: "AX 컨설팅" },
  { value: "platform", label: "AI/Data 플랫폼 구축" },
  { value: "education", label: "교육·조직문화빌딩" },
  { value: "lecture", label: "강연 요청" },
  { value: "other", label: "기타 / 잘 모르겠어요" },
];

type Status = "idle" | "loading" | "success" | "error";

function ContactForm() {
  const searchParams = useSearchParams();
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
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-6">접수 완료</p>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-[0.95] tracking-tight mb-8">
              문의가<br />
              <span className="italic text-[#B8965A]">접수되었습니다.</span>
            </h1>
            <p className="text-[#5A5A5A] text-base leading-relaxed mb-10">
              영업일 기준 1~2일 이내에 회신 드리겠습니다.<br />
              입력하신 이메일로 접수 확인 메일을 보내드렸습니다.
            </p>
            <Link href="/services" className="btn-gold inline-flex">
              서비스 더 보기 →
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
                문의하기
              </h1>
              <p className="text-[#4A4A4A] text-base font-light max-w-lg">
                어떤 서비스가 맞는지 몰라도 괜찮습니다. 상황을 간단히 적어주시면 맞는 방향을 제안드립니다.
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
                        이름 <span className="text-[#B8965A]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="홍길동"
                        value={form.name}
                        onChange={set("name")}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A]">회사명</label>
                      <input
                        type="text"
                        placeholder="(주)회사이름"
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
                        이메일 <span className="text-[#B8965A]">*</span>
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
                      <label className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A]">연락처</label>
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        value={form.phone}
                        onChange={set("phone")}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Service type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A]">
                      문의 유형 <span className="text-[#B8965A]">*</span>
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
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A]">
                      문의 내용 <span className="text-[#B8965A]">*</span>
                    </label>
                    <textarea
                      placeholder="현재 상황, 고민하고 계신 문제, 원하는 결과를 자유롭게 적어주세요."
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
                    {status === "loading" ? "전송 중..." : "문의 전송 →"}
                  </button>
                  <p className="text-[#2A2A2A] text-[0.55rem] tracking-widest uppercase">
                    영업일 기준 1~2일 이내 회신 · 스팸 없음
                  </p>
                </form>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-5 flex flex-col gap-12">
                {/* Direct contact */}
                <div>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A] mb-5">직접 연락</p>
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
                      Mr. Simpler 프로필 ↗
                    </span>
                  </a>
                </div>

                {/* Services */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "2rem" }}>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A] mb-5">서비스</p>
                  <div className="flex flex-col gap-3">
                    {[
                      ["AX 컨설팅", "/services#consulting"],
                      ["AI/Data 플랫폼 구축", "/services#platform"],
                      ["교육·조직문화빌딩", "/services#education"],
                    ].map(([l, h]) => (
                      <Link
                        key={h}
                        href={h}
                        className="text-[0.6rem] tracking-[0.2em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors"
                      >
                        {l} →
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Grand opening notice */}
                <div
                  className="flex items-start gap-3 p-5"
                  style={{ border: "1px solid rgba(184,150,90,0.2)", background: "rgba(184,150,90,0.03)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8965A] animate-pulse flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-[0.55rem] tracking-[0.25em] uppercase text-[#B8965A] mb-1">Grand Opening</p>
                    <p className="text-[#4A4A4A] text-xs leading-relaxed">
                      2026년 6월 1일 공식 오픈 예정입니다.<br />
                      사전 문의도 동일하게 처리됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="px-8 md:px-16 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <Link href="/" className="text-[0.6rem] tracking-[0.3em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors">
                simplyciety
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
