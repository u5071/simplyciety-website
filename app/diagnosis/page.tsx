"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import { useLang } from "../contexts/LanguageContext";
import {
  QUESTIONS,
  LEVELS,
  SERVICES,
  computeResult,
  type Answers,
  type Level,
  type ServiceId,
} from "./content";

const STEP_COUNT = QUESTIONS.length;

const CATEGORY_LABELS = {
  consulting: { ko: "AX 컨설팅", en: "AX Consulting" },
  platform: { ko: "AI/Data 플랫폼 구축", en: "AI/Data Platform" },
  education: { ko: "교육·조직문화빌딩", en: "Education & Culture" },
};

const CATEGORY_ANCHORS = {
  consulting: "consulting",
  platform: "platform",
  education: "education",
};

function LevelGauge({ level }: { level: Level }) {
  const segments = [1, 2, 3, 4] as Level[];
  return (
    <div className="flex items-center gap-1.5">
      {segments.map((s) => (
        <div
          key={s}
          className="h-1 flex-1 transition-all duration-700"
          style={{
            background:
              s <= level
                ? `rgba(184,150,90,${0.3 + (s / 4) * 0.65})`
                : "rgba(255,255,255,0.06)",
          }}
        />
      ))}
    </div>
  );
}

export default function DiagnosisPage() {
  const { lang, t } = useLang();
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<{ level: Level; service: ServiceId } | null>(null);

  const question = QUESTIONS[step];
  const isLastStep = step === STEP_COUNT - 1;

  function handleSelect(id: string) {
    setSelected(id);
  }

  function handleNext() {
    if (!selected || !question) return;
    const next = { ...answers, [question.id]: selected };
    setAnswers(next);

    if (isLastStep) {
      const full = next as Answers;
      setResult(computeResult(full));
    } else {
      setStep((s) => s + 1);
      setSelected(null);
    }
  }

  function handleBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
    const prevQ = QUESTIONS[step - 1];
    setSelected((answers[prevQ.id as keyof Answers] as string) ?? null);
  }

  function handleReset() {
    setStep(0);
    setAnswers({});
    setSelected(null);
    setResult(null);
  }

  return (
    <div className="bg-[#080808] text-[#F0EDE8] font-[var(--font-geist-sans)] min-h-screen">
      <Nav />

      <div className="min-h-screen flex flex-col justify-center px-8 md:px-16 pt-32 pb-20">
        <div className="max-w-2xl mx-auto w-full">

          {/* ─── RESULT ─── */}
          {result && (() => {
            const lvl = LEVELS[result.level];
            const svc = SERVICES[result.service];
            const cat = CATEGORY_LABELS[svc.serviceType];
            const anchor = CATEGORY_ANCHORS[svc.serviceType];
            return (
              <div className="animate-in fade-in duration-700">
                <p className="text-[0.55rem] tracking-[0.4em] uppercase text-[#B8965A] mb-10 flex items-center gap-3">
                  <span className="w-5 h-px bg-[#B8965A]" />
                  {t("진단 결과", "Diagnosis Result")}
                </p>

                {/* Level */}
                <div className="mb-12">
                  <div className="flex items-end justify-between mb-3">
                    <p className="text-[0.5rem] tracking-[0.3em] uppercase text-[#3A3A3A]">
                      AI Readiness — Level {result.level}/4
                    </p>
                  </div>
                  <LevelGauge level={result.level} />
                  <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-[1.05] tracking-tight mt-6 mb-4">
                    {lvl.name[lang]}
                  </h1>
                  <p className="text-[#5A5A5A] text-base leading-[1.9] font-light">
                    {lvl.desc[lang]}
                  </p>
                </div>

                {/* Recommended service */}
                <div
                  className="p-8 md:p-10 mb-10"
                  style={{ border: "1px solid rgba(184,150,90,0.18)", background: "rgba(184,150,90,0.03)" }}
                >
                  <p className="text-[0.5rem] tracking-[0.3em] uppercase text-[#B8965A] mb-5">
                    {t("추천 서비스", "Recommended Service")}
                  </p>
                  <div className="flex items-start justify-between gap-6 mb-5">
                    <div>
                      <h2 className="text-2xl font-light tracking-wide text-[#F0EDE8] mb-1">
                        {svc.name}
                      </h2>
                      <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#3A3A3A]">
                        {svc.sub[lang]}
                      </p>
                    </div>
                    <span
                      className="text-[0.5rem] tracking-[0.2em] uppercase px-3 py-1.5 flex-shrink-0"
                      style={{ border: "1px solid rgba(184,150,90,0.25)", color: "#B8965A" }}
                    >
                      {cat[lang]}
                    </span>
                  </div>
                  <p className="text-[#5A5A5A] text-sm leading-[1.85] font-light mb-5">
                    {svc.desc[lang]}
                  </p>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1rem" }}>
                    <p className="text-[0.5rem] tracking-[0.2em] uppercase text-[#2A2A2A] mb-1">
                      {t("예상 기간", "Timeline")}
                    </p>
                    <p className="text-xs text-[#4A4A4A]">{svc.duration[lang]}</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href={`/contact?service=${svc.serviceType}`}
                    className="btn-gold inline-flex justify-center"
                  >
                    {t("무료 초기 상담 신청 →", "Book a free consultation →")}
                  </Link>
                  <Link
                    href={`/services#${anchor}`}
                    className="inline-flex justify-center text-[0.65rem] tracking-[0.25em] uppercase px-6 py-3.5 text-[#4A4A4A] border border-[rgba(255,255,255,0.06)] hover:text-[#F0EDE8] hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
                  >
                    {t("서비스 상세 보기", "View service details")}
                  </Link>
                </div>

                <button
                  onClick={handleReset}
                  className="text-[0.55rem] tracking-[0.25em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors"
                >
                  {t("← 다시 진단하기", "← Retake diagnosis")}
                </button>
              </div>
            );
          })()}

          {/* ─── SURVEY ─── */}
          {!result && question && (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <p className="text-[0.55rem] tracking-[0.4em] uppercase text-[#B8965A] flex items-center gap-3">
                  <span className="w-5 h-px bg-[#B8965A]" />
                  {t("AI 준비도 진단", "AI Readiness Diagnosis")}
                </p>
                <p className="text-[0.5rem] tracking-[0.2em] uppercase text-[#2A2A2A]">
                  {String(step + 1).padStart(2, "0")} / {String(STEP_COUNT).padStart(2, "0")}
                </p>
              </div>

              {/* Progress */}
              <div className="flex gap-1 mb-14">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className="h-px flex-1 transition-all duration-500"
                    style={{
                      background:
                        i < step
                          ? "rgba(184,150,90,0.7)"
                          : i === step
                          ? "rgba(184,150,90,0.4)"
                          : "rgba(255,255,255,0.06)",
                    }}
                  />
                ))}
              </div>

              {/* Question */}
              <h2 className="text-[clamp(1.6rem,4vw,3rem)] font-extralight leading-[1.15] tracking-tight mb-10">
                {question.question[lang]}
              </h2>

              {/* Options */}
              <div
                className={`grid gap-px mb-10 ${
                  question.options.length > 4
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2"
                }`}
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {question.options.map((opt) => {
                  const isActive = selected === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      className="text-left p-6 md:p-8 flex flex-col gap-2 transition-all duration-300 group"
                      style={{
                        background: isActive ? "rgba(184,150,90,0.07)" : "#080808",
                        outline: isActive ? "1px solid rgba(184,150,90,0.4)" : "none",
                        outlineOffset: "-1px",
                      }}
                    >
                      <span
                        className="text-sm font-light leading-snug transition-colors duration-300"
                        style={{ color: isActive ? "#F0EDE8" : "#5A5A5A" }}
                      >
                        {opt.label[lang]}
                      </span>
                      {opt.hint && (
                        <span
                          className="text-[0.6rem] tracking-wide font-light transition-colors duration-300"
                          style={{ color: isActive ? "rgba(184,150,90,0.6)" : "#2A2A2A" }}
                        >
                          {opt.hint[lang]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Nav buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="text-[0.55rem] tracking-[0.25em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors disabled:opacity-0"
                >
                  ← {t("이전", "Back")}
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className="text-[0.65rem] tracking-[0.25em] uppercase px-8 py-3.5 transition-all duration-300"
                  style={{
                    background: selected ? "#B8965A" : "transparent",
                    color: selected ? "#080808" : "#2A2A2A",
                    border: selected ? "1px solid #B8965A" : "1px solid rgba(255,255,255,0.06)",
                    cursor: selected ? "pointer" : "default",
                  }}
                >
                  {isLastStep ? t("결과 보기 →", "See results →") : t("다음 →", "Next →")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
