"use client";

import { useState } from "react";
import { useLang } from "../contexts/LanguageContext";
import { LAUNCH_LONG } from "../../lib/launch";
import { WAITLIST_OPTIONS, type Opt } from "../../lib/waitlist-options";

type Status = "idle" | "loading" | "success" | "error";

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

function Chips({
  options,
  value,
  onToggle,
  multi,
}: {
  options: readonly Opt[];
  value: string | string[];
  onToggle: (v: string) => void;
  multi?: boolean;
}) {
  const { lang } = useLang();
  return (
    <div className="flex flex-wrap gap-2" role={multi ? "group" : "radiogroup"}>
      {options.map((o) => {
        const on = Array.isArray(value) ? value.includes(o.value) : value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onToggle(o.value)}
            aria-pressed={on}
            className="px-3.5 py-2 text-xs border transition-all duration-200"
            style={{
              borderColor: on ? "#B8965A" : "rgba(255,255,255,0.12)",
              color: on ? "#F0EDE8" : "#8A8780",
              background: on ? "rgba(184,150,90,0.12)" : "transparent",
            }}
          >
            {on && multi && <span className="text-[#B8965A] mr-1.5">✓</span>}
            {o[lang]}
          </button>
        );
      })}
    </div>
  );
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
    aiStage: "",
    useCases: [] as string[],
    timeline: "",
    useCase: "",
    website: "", // honeypot
  });
  const mailto = `mailto:yang5071@gmail.com?subject=${encodeURIComponent("[dataSimplr] 대기명단 등록 / Waitlist")}&body=${encodeURIComponent(
    [`email: ${form.email}`, form.name && `name: ${form.name}`, form.company && `company: ${form.company}`, form.useCase && `use case: ${form.useCase}`]
      .filter(Boolean)
      .join("\n")
  )}`;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const pick = (k: "role" | "teamSize" | "aiStage" | "timeline") => (v: string) =>
    setForm((f) => ({ ...f, [k]: f[k] === v ? "" : v }));
  const toggle = (k: "dataTypes" | "useCases") => (v: string) =>
    setForm((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));

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
            : t("지금은 온라인 등록이 안 됩니다. 아래 링크로 메일을 보내주시면 명단에 올려드립니다.", "Online signup is unavailable right now. Email us using the link below and we'll add you.")
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
    "w-full bg-white/[0.02] border border-[rgba(255,255,255,0.12)] px-4 py-3.5 text-sm text-[#F0EDE8] placeholder:text-[#5A5A5A] outline-none focus:border-[#B8965A]/70 focus:bg-white/[0.04] transition-colors font-light";
  const label = "block text-[0.6rem] tracking-[0.25em] uppercase text-[#8A8780] mb-2.5";

  if (status === "success" && result) {
    return (
      <div id={id} className="ds-fade p-7 md:p-9" style={{ border: "1px solid rgba(184,150,90,0.5)", background: "linear-gradient(135deg, rgba(184,150,90,0.12), rgba(184,150,90,0.02))" }} role="status">
        <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A] mb-3">
          {result.alreadyJoined ? t("이미 등록됨", "Already on the list") : t("등록 완료", "You're in")}
        </p>
        {result.position ? (
          <p className="text-4xl md:text-5xl font-extralight tracking-tight mb-3">
            {t("대기 순번 ", "You're ")}
            <span className="text-[#B8965A]">#{result.position}</span>
          </p>
        ) : (
          <p className="text-2xl md:text-3xl font-extralight tracking-tight mb-3">{t("대기명단에 등록되었습니다.", "You're on the waitlist.")}</p>
        )}
        <p className="text-[#A8A49E] text-sm leading-relaxed font-light">
          {t(
            `${LAUNCH_LONG.ko} 출시일에 등록 순서대로 초대 메일을 보내드립니다. 받은편지함에서 확인 메일을 확인해 주세요.`,
            `We'll send invites in order on launch day, ${LAUNCH_LONG.en}. Check your inbox for a confirmation.`
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

  const errorLine = error && (
    <p className="text-xs text-[#D98A6A]" role="alert">
      {error}{" "}
      <a href={mailto} className="underline text-[#B8965A]">{t("메일로 등록하기 →", "Join by email →")}</a>
    </p>
  );

  if (variant === "compact") {
    return (
      <form id={id} onSubmit={submit} className="relative flex flex-col gap-3 w-full">
        {honeypot}
        <div className="flex flex-col sm:flex-row sm:p-1 sm:border sm:border-white/[0.12] sm:bg-white/[0.02] focus-within:border-[#B8965A]/60 transition-colors">
          <label className="sr-only" htmlFor={`${id ?? "wl"}-email`}>{t("이메일", "Email")}</label>
          <input
            id={`${id ?? "wl"}-email`}
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            placeholder={t("업무용 이메일", "you@company.com")}
            className="flex-1 min-w-0 bg-transparent px-4 py-3.5 text-sm text-[#F0EDE8] placeholder:text-[#5A5A5A] outline-none border border-white/[0.12] sm:border-0 mb-2 sm:mb-0"
            autoComplete="email"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex-shrink-0 px-6 py-3.5 text-[0.7rem] tracking-[0.2em] uppercase bg-[#B8965A] text-[#080808] hover:bg-[#D2B27A] transition-colors disabled:opacity-60"
          >
            {status === "loading" ? t("등록 중…", "Joining…") : t("얼리 액세스 신청", "Get early access")}
          </button>
        </div>
        {errorLine}
        <p className="text-[0.65rem] text-[#6A6A6A]">
          {t("베타 무료 · 등록 순서대로 초대 · 출시 안내 외 사용하지 않음", "Free beta · invites in signup order · launch updates only")}
        </p>
      </form>
    );
  }

  const O = WAITLIST_OPTIONS;
  return (
    <form id={id} onSubmit={submit} className="relative flex flex-col gap-7">
      {honeypot}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <label className={label} htmlFor="wl-full-email">{t("업무용 이메일 *", "Work email *")}</label>
          <input id="wl-full-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@company.com" className={input} autoComplete="email" />
        </div>
        <div>
          <label className={label} htmlFor="wl-name">{t("이름", "Name")}</label>
          <input id="wl-name" value={form.name} onChange={set("name")} className={input} autoComplete="name" />
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="wl-company">{t("회사 · 팀", "Company · Team")}</label>
          <input id="wl-company" value={form.company} onChange={set("company")} className={input} autoComplete="organization" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div>
          <span className={label}>{t("역할", "Role")}</span>
          <Chips options={O.role} value={form.role} onToggle={pick("role")} />
        </div>
        <div>
          <span className={label}>{t("조직 규모", "Company size")}</span>
          <Chips options={O.teamSize} value={form.teamSize} onToggle={pick("teamSize")} />
        </div>
      </div>

      <div>
        <span className={label}>{t("연결하려는 데이터 · 복수 선택", "Data you want to connect · select all")}</span>
        <Chips options={O.dataSources} value={form.dataTypes} onToggle={toggle("dataTypes")} multi />
      </div>

      <div>
        <span className={label}>{t("우선 사용 사례 · 복수 선택", "Priority use cases · select all")}</span>
        <Chips options={O.useCases} value={form.useCases} onToggle={toggle("useCases")} multi />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div>
          <span className={label}>{t("현재 AI 활용 단계", "Current AI maturity")}</span>
          <Chips options={O.aiStage} value={form.aiStage} onToggle={pick("aiStage")} />
        </div>
        <div>
          <span className={label}>{t("도입 희망 시점", "When would you adopt?")}</span>
          <Chips options={O.timeline} value={form.timeline} onToggle={pick("timeline")} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="wl-usecase">{t("가장 먼저 해결하고 싶은 문제 (선택)", "The first problem you'd solve (optional)")}</label>
        <textarea
          id="wl-usecase"
          rows={3}
          value={form.useCase}
          onChange={set("useCase")}
          placeholder={t("예) 채널별 매출·재고를 한 번에 묻고, 이상치가 생기면 에이전트가 알려주면 좋겠습니다", "e.g. Ask about sales and inventory across channels, and have an agent flag anomalies")}
          className={`${input} resize-none`}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-[0.65rem] text-[#6A6A6A] leading-relaxed max-w-md">
          {t(
            "입력 정보는 dataSimplr 출시 안내·초대와 디자인 파트너 선정에만 사용하며, 출시 후 1년간 보관합니다.",
            "Used only for launch updates, invites and design-partner selection; kept for one year after launch."
          )}
        </p>
        <button type="submit" disabled={status === "loading"} className="btn-gold justify-center disabled:opacity-60">
          {status === "loading" ? t("등록 중…", "Joining…") : t("대기명단 등록 →", "Join the waitlist →")}
        </button>
      </div>
      {errorLine}
    </form>
  );
}
