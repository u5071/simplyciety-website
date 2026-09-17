"use client";

import { useState } from "react";
import { useLang } from "../contexts/LanguageContext";

type Status = "idle" | "loading" | "success" | "error";

const DATA_TYPES = [
  { value: "spreadsheets", ko: "스프레드시트", en: "Spreadsheets" },
  { value: "rdb", ko: "RDB (MySQL·Postgres)", en: "RDB (MySQL·Postgres)" },
  { value: "nosql", ko: "NoSQL · JSON", en: "NoSQL · JSON" },
  { value: "graph", ko: "그래프", en: "Graph" },
  { value: "docs", ko: "문서 · PDF", en: "Docs · PDF" },
];

const TEAM_SIZES = ["1", "2–10", "11–50", "51–200", "200+"];

const ROLES = [
  { value: "founder", ko: "대표 · 운영자", en: "Founder · Operator" },
  { value: "marketing", ko: "마케팅 · 영업", en: "Marketing · Sales" },
  { value: "data", ko: "데이터 · 분석", en: "Data · Analytics" },
  { value: "developer", ko: "개발자", en: "Developer" },
  { value: "other", ko: "기타", en: "Other" },
];

/** utm / ref params and referrer, so we know where signups come from. */
function readSource() {
  try {
    const p = new URLSearchParams(window.location.search);
    const parts = ["utm_source", "utm_medium", "utm_campaign", "ref"]
      .map((k) => (p.get(k) ? `${k}=${p.get(k)}` : ""))
      .filter(Boolean);
    if (document.referrer) parts.push(`referrer=${document.referrer}`);
    return parts.join("&");
  } catch {
    return "";
  }
}

export default function WaitlistForm({ variant = "full", id }: { variant?: "compact" | "full"; id?: string }) {
  const { lang, t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<{ position: number | null; alreadyJoined: boolean } | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    name: "",
    company: "",
    role: "",
    teamSize: "",
    dataTypes: [] as string[],
    useCase: "",
    website: "", // honeypot
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleType = (v: string) =>
    setForm((f) => ({ ...f, dataTypes: f.dataTypes.includes(v) ? f.dataTypes.filter((x) => x !== v) : [...f.dataTypes, v] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang, source: [variant, readSource()].filter(Boolean).join("&") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          data.error === "invalid_email"
            ? t("이메일 주소를 확인해 주세요.", "Please check your email address.")
            : t("지금 등록할 수 없습니다. hello@simplyciety.com으로 메일 주세요.", "We couldn't sign you up right now. Please email hello@simplyciety.com.")
        );
        setStatus("error");
        return;
      }
      setResult({ position: data.position ?? null, alreadyJoined: Boolean(data.alreadyJoined) });
      setStatus("success");
    } catch {
      setError(t("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", "Network error. Please try again."));
      setStatus("error");
    }
  };

  const input =
    "w-full bg-transparent border border-[rgba(255,255,255,0.12)] px-4 py-3.5 text-sm text-[#F0EDE8] placeholder:text-[#5A5A5A] outline-none focus:border-[#B8965A]/70 transition-colors font-light";

  if (status === "success" && result) {
    return (
      <div id={id} className="p-6 md:p-8" style={{ border: "1px solid rgba(184,150,90,0.5)", background: "rgba(184,150,90,0.05)" }} role="status">
        <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A] mb-3">
          {result.alreadyJoined ? t("이미 등록됨", "Already on the list") : t("등록 완료", "You're in")}
        </p>
        {result.position ? (
          <p className="text-3xl md:text-4xl font-extralight tracking-tight mb-3">
            {t("대기 순번 ", "You're ")}
            <span className="text-[#B8965A]">#{result.position}</span>
          </p>
        ) : (
          <p className="text-2xl font-extralight tracking-tight mb-3">{t("대기명단에 등록되었습니다.", "You're on the waitlist.")}</p>
        )}
        <p className="text-[#A8A49E] text-sm leading-relaxed font-light">
          {t(
            "2026년 10월 18일 출시일에 등록 순서대로 초대 메일을 보내드립니다. 확인 메일을 확인해 주세요.",
            "We'll send invites in order on launch day, October 18, 2026. Check your inbox for a confirmation."
          )}
        </p>
      </div>
    );
  }

  const honeypot = (
    <input
      type="text"
      name="website"
      value={form.website}
      onChange={set("website")}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="absolute -left-[9999px] w-px h-px opacity-0"
    />
  );

  if (variant === "compact") {
    return (
      <form id={id} onSubmit={submit} className="relative flex flex-col gap-3 w-full">
        {honeypot}
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="sr-only" htmlFor={`${id ?? "wl"}-email`}>{t("이메일", "Email")}</label>
          <input
            id={`${id ?? "wl"}-email`}
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            placeholder={t("업무용 이메일", "you@company.com")}
            className={input}
            autoComplete="email"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex-shrink-0 px-6 py-3.5 text-[0.7rem] tracking-[0.2em] uppercase bg-[#B8965A] text-[#080808] hover:bg-[#CDAE74] transition-colors disabled:opacity-60"
          >
            {status === "loading" ? t("등록 중…", "Joining…") : t("대기명단 등록", "Join waitlist")}
          </button>
        </div>
        {error && <p className="text-xs text-[#D98A6A]" role="alert">{error}</p>}
        <p className="text-[0.65rem] text-[#5A5A5A]">
          {t("출시 안내 외에는 사용하지 않습니다. 언제든 삭제 요청 가능.", "Launch updates only. Unsubscribe anytime.")}
        </p>
      </form>
    );
  }

  return (
    <form id={id} onSubmit={submit} className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
      {honeypot}
      <div className="md:col-span-2">
        <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-[#8A8780] mb-2" htmlFor="wl-full-email">
          {t("이메일 *", "Email *")}
        </label>
        <input id="wl-full-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@company.com" className={input} autoComplete="email" />
      </div>
      <div>
        <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-[#8A8780] mb-2" htmlFor="wl-name">{t("이름", "Name")}</label>
        <input id="wl-name" value={form.name} onChange={set("name")} className={input} autoComplete="name" />
      </div>
      <div>
        <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-[#8A8780] mb-2" htmlFor="wl-company">{t("회사 · 팀", "Company · Team")}</label>
        <input id="wl-company" value={form.company} onChange={set("company")} className={input} autoComplete="organization" />
      </div>
      <div>
        <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-[#8A8780] mb-2" htmlFor="wl-role">{t("역할", "Role")}</label>
        <select id="wl-role" value={form.role} onChange={set("role")} className={`${input} bg-[#080808]`}>
          <option value="">{t("선택", "Select")}</option>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>{r[lang]}</option>
          ))}
        </select>
      </div>
      <div>
        <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-[#8A8780] mb-2">{t("팀 규모", "Team size")}</span>
        <div className="flex flex-wrap gap-2">
          {TEAM_SIZES.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => setForm((f) => ({ ...f, teamSize: f.teamSize === sz ? "" : sz }))}
              aria-pressed={form.teamSize === sz}
              className="px-3 py-2.5 text-xs border transition-colors"
              style={{
                borderColor: form.teamSize === sz ? "#B8965A" : "rgba(255,255,255,0.12)",
                color: form.teamSize === sz ? "#B8965A" : "#8A8780",
              }}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-[#8A8780] mb-2">
          {t("주로 쓰는 데이터 (복수 선택)", "Data you work with (select all)")}
        </span>
        <div className="flex flex-wrap gap-2">
          {DATA_TYPES.map((d) => {
            const on = form.dataTypes.includes(d.value);
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => toggleType(d.value)}
                aria-pressed={on}
                className="px-3 py-2.5 text-xs border transition-colors"
                style={{ borderColor: on ? "#B8965A" : "rgba(255,255,255,0.12)", color: on ? "#B8965A" : "#8A8780", background: on ? "rgba(184,150,90,0.06)" : "transparent" }}
              >
                {d[lang]}
              </button>
            );
          })}
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-[#8A8780] mb-2" htmlFor="wl-usecase">
          {t("dataSimplr로 가장 먼저 하고 싶은 일", "The first thing you'd do with dataSimplr")}
        </label>
        <textarea
          id="wl-usecase"
          rows={3}
          value={form.useCase}
          onChange={set("useCase")}
          placeholder={t("예) 채널별 매출과 재고를 한 번에 묻고 싶어요", "e.g. Ask about sales and inventory across all channels at once")}
          className={`${input} resize-none`}
        />
      </div>
      <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <p className="text-[0.65rem] text-[#5A5A5A] leading-relaxed max-w-md">
          {t(
            "입력하신 정보는 dataSimplr 출시 안내와 초대에만 사용하며, 출시 후 1년간 보관합니다.",
            "We use this only for dataSimplr launch updates and invites, and keep it for one year after launch."
          )}
        </p>
        <button type="submit" disabled={status === "loading"} className="btn-gold justify-center disabled:opacity-60">
          {status === "loading" ? t("등록 중…", "Joining…") : t("대기명단 등록 →", "Join the waitlist →")}
        </button>
      </div>
      {error && <p className="md:col-span-2 text-xs text-[#D98A6A]" role="alert">{error}</p>}
    </form>
  );
}
