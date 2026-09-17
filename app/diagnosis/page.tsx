"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import { useLang } from "../contexts/LanguageContext";
import { DIMENSIONS, QUESTIONS, SERVICES, STAGES, computeResult, type Answers, type Result } from "./content";

const TOTAL = QUESTIONS.length;

function Radar({ dims, labels }: { dims: Result["dims"]; labels: string[] }) {
  const size = 320;
  const c = size / 2;
  const R = 110;
  const n = dims.length;
  const pt = (i: number, r: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [c + r * Math.cos(a), c + r * Math.sin(a)] as const;
  };
  const poly = (r: (i: number) => number) => dims.map((_, i) => pt(i, r(i)).join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[360px] mx-auto overflow-visible" role="img" aria-label="radar chart">
      {[1, 2, 3, 4].map((lv) => (
        <polygon key={lv} points={poly(() => (R * lv) / 4)} fill="none" stroke="rgba(255,255,255,0.07)" />
      ))}
      {dims.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" />;
      })}
      <polygon points={poly((i) => (R * dims[i].score) / 4)} fill="rgba(184,150,90,0.18)" stroke="#B8965A" strokeWidth="1.5" />
      {dims.map((d, i) => {
        const [x, y] = pt(i, (R * d.score) / 4);
        return <circle key={d.id} cx={x} cy={y} r="3.5" fill={d.score <= 2 ? "#D98A6A" : "#E0C48E"} />;
      })}
      {dims.map((d, i) => {
        const [x, y] = pt(i, R + 26);
        const anchor = Math.abs(x - c) < 8 ? "middle" : x > c ? "start" : "end";
        return (
          <text key={d.id} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize="10.5" fill="#A8A49E">
            {labels[i]} <tspan fill="#B8965A">{d.score}</tspan>
          </text>
        );
      })}
    </svg>
  );
}

export default function DiagnosisPage() {
  const { lang, t } = useLang();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  const q = QUESTIONS[step];
  const current = q ? (answers as Record<string, string | number | undefined>)[q.id] : undefined;
  const result = useMemo(() => (done ? computeResult(answers) : null), [done, answers]);

  const choose = (value: string | number) => {
    if (advancing) return;
    setAdvancing(true);
    setAnswers((a) => ({ ...a, [q.id]: value }));
    // auto-advance for a faster flow
    setTimeout(() => {
      if (step === TOTAL - 1) setDone(true);
      else setStep((s) => s + 1);
      setAdvancing(false);
    }, 220);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  const contactHref = (r: Result) => {
    const svc = SERVICES[r.service];
    const lines = [
      `[AI 준비도 진단 결과] 종합 ${r.score}점 · ${STAGES[r.stage].name.ko}`,
      ...r.dims.map((d) => `- ${DIMENSIONS.find((x) => x.id === d.id)!.short.ko}: ${d.score}/4`),
      `추천: ${svc.name} (${svc.sub.ko})`,
      "",
      "상담 받고 싶은 내용: ",
    ];
    return `/contact?service=${svc.serviceType}&message=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <div className="bg-[#080808] text-[#F0EDE8] min-h-screen">
      <Nav />

      <div className="min-h-screen px-5 md:px-16 pt-32 md:pt-40 pb-24">
        <div className={`mx-auto w-full ${result ? "max-w-screen-xl" : "max-w-3xl"}`}>
          {/* ─── RESULT ─── */}
          {result && (
            <div className="ds-fade">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
                <p className="text-[0.6rem] tracking-[0.4em] uppercase text-[#B8965A] flex items-center gap-3">
                  <span className="w-5 h-px bg-[#B8965A]" />
                  AI Readiness Report
                </p>
                <button onClick={reset} className="text-[0.6rem] tracking-[0.25em] uppercase text-[#6A6A6A] hover:text-[#B8965A] transition-colors">
                  {t("← 다시 진단하기", "← Retake")}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="flex items-end gap-4">
                    <span className="text-[clamp(5rem,12vw,9rem)] font-extralight leading-[0.85] tracking-tight text-[#B8965A]">{result.score}</span>
                    <span className="text-[#6A6A6A] text-sm mb-3">/ 100</span>
                  </div>
                  <div className="flex gap-1.5">
                    {(["foundation", "explore", "scale", "native"] as const).map((sid) => (
                      <div key={sid} className="flex-1">
                        <div className="h-1" style={{ background: sid === result.stage ? "#B8965A" : "rgba(255,255,255,0.08)" }} />
                        <p className="mt-2 text-[0.55rem] tracking-[0.15em] uppercase" style={{ color: sid === result.stage ? "#B8965A" : "#4A4A4A" }}>
                          {STAGES[sid].range}
                        </p>
                      </div>
                    ))}
                  </div>
                  <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.1] tracking-tight">{STAGES[result.stage].name[lang]}</h1>
                  <p className="text-[#A8A49E] text-base leading-[1.9] font-light">{STAGES[result.stage].desc[lang]}</p>
                </div>
                <div className="lg:col-span-7 flex items-center justify-center p-6 md:p-10" style={{ border: "1px solid rgba(255,255,255,0.06)", background: "#0A0A0A" }}>
                  <Radar dims={result.dims} labels={result.dims.map((d) => DIMENSIONS.find((x) => x.id === d.id)!.short[lang])} />
                </div>
              </div>

              {/* Priorities */}
              <div className="mb-16">
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#8A8780] mb-6">{t("우선 개선 과제", "Priority actions")}</p>
                {result.gaps.length === 0 ? (
                  <p className="text-[#A8A49E] font-light">
                    {t("모든 영역이 3단계 이상입니다. 평가(eval) 체계와 데이터 제품화로 다음 가치를 설계하세요.", "Every dimension is at level 3 or above. Next: rigorous evaluation and data products.")}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
                    {result.gaps.map((g, i) => {
                      const d = DIMENSIONS.find((x) => x.id === g)!;
                      const sc = result.dims.find((x) => x.id === g)!.score;
                      return (
                        <div key={g} className="bg-[#080808] p-7 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[0.6rem] tracking-[0.3em] text-[#B8965A]">0{i + 1}</span>
                            <span className="text-[0.6rem] text-[#D98A6A]">Level {sc}/4</span>
                          </div>
                          <h3 className="text-xl font-extralight tracking-tight">{d.short[lang]}</h3>
                          <p className="text-[#A8A49E] text-sm leading-[1.85] font-light">{d.action[lang]}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div className={`grid grid-cols-1 ${result.dataSimplrFit ? "lg:grid-cols-2" : ""} gap-4`}>
                {(() => {
                  const svc = SERVICES[result.service];
                  return (
                    <div className="p-8 md:p-10 flex flex-col gap-5" style={{ border: "1px solid rgba(184,150,90,0.3)", background: "rgba(184,150,90,0.03)" }}>
                      <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A]">{t("추천 서비스", "Recommended service")}</p>
                      <div>
                        <h2 className="text-2xl font-light">{svc.name}</h2>
                        <p className="text-[#8A8780] text-sm mt-1">{svc.sub[lang]}</p>
                      </div>
                      <p className="text-[#A8A49E] text-sm leading-[1.85] font-light">{svc.desc[lang]}</p>
                      <p className="text-xs text-[#6A6A6A]">{t("예상 기간", "Timeline")} · {svc.duration[lang]}</p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <Link href={contactHref(result)} className="btn-gold">{t("결과로 상담 신청 →", "Discuss these results →")}</Link>
                        <Link href={`/services#${svc.serviceType}`} className="btn-primary">{t("서비스 상세", "Service details")}</Link>
                      </div>
                    </div>
                  );
                })()}
                {result.dataSimplrFit && (
                  <div className="p-8 md:p-10 flex flex-col gap-5" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#0A0A0A" }}>
                    <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A]">{t("셀프서비스로 시작하기", "Start self-serve")}</p>
                    <h2 className="text-2xl font-light">
                      data<span className="italic text-[#B8965A]">Simplr</span>
                    </h2>
                    <p className="text-[#A8A49E] text-sm leading-[1.85] font-light">
                      {t(
                        "데이터 기반·정의 영역이 약하고 데이터 전담 인력이 적은 조직에 맞습니다. 파일과 DB를 올리면 연결·정의·가림을 자동으로 처리하고, 에이전트가 그 위에서 분석합니다.",
                        "A fit for teams with weak data foundations and few data people. Upload files and databases; dataSimplr handles connecting, defining and masking, and agents analyze on top."
                      )}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <Link href="/datasimplr#waitlist" className="btn-gold">{t("대기명단 등록 →", "Join the waitlist →")}</Link>
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-10 text-[0.7rem] text-[#5A5A5A] leading-relaxed">
                {t(
                  "이 결과는 자가 응답 기반의 간이 진단입니다. 6개 영역은 발표 「AI가 쓸 수 있는 데이터」의 조건과 조직 운영 요소를 바탕으로 구성했습니다. 응답은 저장되지 않습니다.",
                  "This is a self-reported quick assessment. The six dimensions build on the “AI-ready data” conditions plus operating-model factors. Your answers are not stored."
                )}
              </p>
            </div>
          )}

          {/* ─── SURVEY ─── */}
          {!result && q && (
            <div>
              {step === 0 && (
                <div className="mb-14">
                  <p className="text-[0.6rem] tracking-[0.4em] uppercase text-[#B8965A] mb-6 flex items-center gap-3">
                    <span className="w-5 h-px bg-[#B8965A]" />
                    AI Readiness Assessment
                  </p>
                  <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-extralight leading-[1.08] tracking-tight mb-5">
                    {t("우리 조직은 AI를 쓸 준비가", "How ready is your organization")}
                    <br />
                    <span className="italic text-[#B8965A]">{t("얼마나 되어 있을까", "for AI?")}</span>
                  </h1>
                  <p className="text-[#8A8780] text-sm md:text-base leading-[1.8] font-light max-w-xl">
                    {t(
                      "9개 질문 · 약 3분. 데이터 기반, 정의·품질, 비정형 데이터, 거버넌스, AI 활용, 조직 역량 6개 영역의 성숙도와 우선 과제를 보여드립니다.",
                      "9 questions · about 3 minutes. See your maturity across six dimensions — data foundation, semantics, unstructured data, governance, AI adoption and people — with priority actions."
                    )}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8A8780]">
                  {q.kind === "dimension" ? q.short[lang] : t("기본 정보", "About you")}
                </p>
                <p className="text-[0.6rem] tracking-[0.2em] text-[#6A6A6A]">
                  {String(step + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                </p>
              </div>
              <div className="h-px bg-white/[0.06] mb-12 relative">
                <div className="absolute inset-y-0 left-0 bg-[#B8965A] transition-all duration-500" style={{ width: `${(step / TOTAL) * 100}%` }} />
              </div>

              <div key={q.id} className="ds-fade">
                <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extralight leading-[1.2] tracking-tight mb-3">{q.question[lang]}</h2>
                {q.help && <p className="text-[#6A6A6A] text-sm mb-10">{q.help[lang]}</p>}
                {!q.help && <div className="mb-10" />}

                <div className="flex flex-col gap-2 mb-12">
                  {q.kind === "dimension"
                    ? q.options.map((opt, i) => {
                        const v = i + 1;
                        const active = current === v;
                        return (
                          <button
                            key={i}
                            onClick={() => choose(v)}
                            className="group text-left flex items-center gap-5 px-5 py-4 transition-all duration-200"
                            style={{
                              border: `1px solid ${active ? "rgba(184,150,90,0.6)" : "rgba(255,255,255,0.08)"}`,
                              background: active ? "rgba(184,150,90,0.07)" : "transparent",
                            }}
                          >
                            <span className="flex gap-0.5 flex-shrink-0" aria-hidden>
                              {[1, 2, 3, 4].map((b) => (
                                <span key={b} className="w-1.5 h-4" style={{ background: b <= v ? (active ? "#B8965A" : "rgba(184,150,90,0.45)") : "rgba(255,255,255,0.08)" }} />
                              ))}
                            </span>
                            <span className="text-sm md:text-[0.95rem] font-light leading-snug" style={{ color: active ? "#F0EDE8" : "#A8A49E" }}>
                              {opt[lang]}
                            </span>
                          </button>
                        );
                      })
                    : (
                      <div className={`grid gap-2 ${q.options.length > 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                        {q.options.map((opt) => {
                          const active = current === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => choose(opt.id)}
                              className="text-left px-5 py-4 text-sm md:text-[0.95rem] font-light transition-all duration-200"
                              style={{
                                border: `1px solid ${active ? "rgba(184,150,90,0.6)" : "rgba(255,255,255,0.08)"}`,
                                background: active ? "rgba(184,150,90,0.07)" : "transparent",
                                color: active ? "#F0EDE8" : "#A8A49E",
                              }}
                            >
                              {opt.label[lang]}
                            </button>
                          );
                        })}
                      </div>
                    )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="text-[0.6rem] tracking-[0.25em] uppercase text-[#6A6A6A] hover:text-[#F0EDE8] transition-colors disabled:opacity-0"
                >
                  ← {t("이전", "Back")}
                </button>
                <p className="text-[0.65rem] text-[#5A5A5A]">{t("선택하면 다음 질문으로 넘어갑니다", "Selecting an answer moves you forward")}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
