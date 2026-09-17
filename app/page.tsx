"use client";

import Link from "next/link";
import Nav from "./components/Nav";
import SiteFooter from "./components/SiteFooter";
import { useReveal } from "./components/useReveal";
import { useLang } from "./contexts/LanguageContext";

const PILLAR_ICONS = [
  /* Clarity — crosshair over data scatter */
  <svg key="clarity" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="10" stroke="rgba(184,150,90,0.14)" strokeWidth="1" />
    <circle cx="18" cy="18" r="5" stroke="rgba(184,150,90,0.22)" strokeWidth="1" />
    <line x1="18" y1="6" x2="18" y2="11" stroke="rgba(184,150,90,0.28)" strokeWidth="1" />
    <line x1="18" y1="25" x2="18" y2="30" stroke="rgba(184,150,90,0.28)" strokeWidth="1" />
    <line x1="6" y1="18" x2="11" y2="18" stroke="rgba(184,150,90,0.28)" strokeWidth="1" />
    <line x1="25" y1="18" x2="30" y2="18" stroke="rgba(184,150,90,0.28)" strokeWidth="1" />
    <circle cx="18" cy="18" r="1.8" fill="rgba(184,150,90,0.55)" />
    <circle cx="10" cy="12" r="1.2" fill="rgba(184,150,90,0.18)" />
    <circle cx="26" cy="10" r="1.2" fill="rgba(184,150,90,0.18)" />
    <circle cx="8" cy="26" r="1.2" fill="rgba(184,150,90,0.12)" />
  </svg>,
  /* Connection — network nodes */
  <svg key="connection" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="7" cy="18" r="4" fill="rgba(184,150,90,0.08)" stroke="rgba(184,150,90,0.25)" strokeWidth="0.9" />
    <circle cx="29" cy="10" r="4" fill="rgba(184,150,90,0.08)" stroke="rgba(184,150,90,0.25)" strokeWidth="0.9" />
    <circle cx="29" cy="26" r="4" fill="rgba(184,150,90,0.08)" stroke="rgba(184,150,90,0.25)" strokeWidth="0.9" />
    <circle cx="18" cy="18" r="3" fill="rgba(184,150,90,0.12)" stroke="rgba(184,150,90,0.3)" strokeWidth="0.9" />
    <line x1="11" y1="18" x2="15" y2="18" stroke="rgba(184,150,90,0.2)" strokeWidth="0.8" />
    <line x1="21" y1="16" x2="25" y2="12" stroke="rgba(184,150,90,0.2)" strokeWidth="0.8" />
    <line x1="21" y1="20" x2="25" y2="24" stroke="rgba(184,150,90,0.2)" strokeWidth="0.8" />
    <line x1="7" y1="14" x2="14" y2="10" stroke="rgba(184,150,90,0.08)" strokeWidth="0.6" strokeDasharray="2 2" />
    <line x1="7" y1="22" x2="14" y2="26" stroke="rgba(184,150,90,0.08)" strokeWidth="0.6" strokeDasharray="2 2" />
  </svg>,
  /* Impact — ascending bars */
  <svg key="impact" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="4" y="24" width="6" height="8" fill="rgba(184,150,90,0.1)" rx="0.5" />
    <rect x="13" y="18" width="6" height="14" fill="rgba(184,150,90,0.14)" rx="0.5" />
    <rect x="22" y="12" width="6" height="20" fill="rgba(184,150,90,0.18)" rx="0.5" />
    <polyline points="7,23 16,17 25,11" stroke="rgba(184,150,90,0.45)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="25" cy="11" r="2" fill="rgba(184,150,90,0.5)" />
    <line x1="4" y1="33" x2="32" y2="33" stroke="rgba(184,150,90,0.12)" strokeWidth="0.8" />
  </svg>,
];

const PILLARS = [
  {
    num: "01", title: "Clarity",
    desc: {
      ko: "데이터가 복잡성이 숨어 있는 지점을 드러냅니다. AI가 불분명한 의사결정 구조와 불필요한 보고 단계를 정확히 짚어냅니다.",
      en: "Data exposes where complexity hides. AI pinpoints unclear decision flows and redundant reporting chains — precisely, not by intuition.",
    },
  },
  {
    num: "02", title: "Connection",
    desc: {
      ko: "조직도가 아닌 실제 데이터 흐름을 봅니다. 어디서 정보가 막히고 어디서 판단이 지연되는지를 데이터로 추적합니다.",
      en: "We look at real data flows, not the org chart. Track exactly where information gets blocked and decisions get delayed.",
    },
  },
  {
    num: "03", title: "Impact",
    desc: {
      ko: "단순해진 조직은 더 빠르게 움직이고 오래 유지됩니다. 모든 성과는 데이터로 측정하고 AI로 지속적으로 검증합니다.",
      en: "Simpler organizations move faster and last longer. Every outcome is measured with data and continuously validated with AI.",
    },
  },
];

export default function Home() {
  const { lang, t } = useLang();
  useReveal();

  return (
    <div className="noise-bg bg-[#080808] text-[#F0EDE8] font-[var(--font-geist-sans)]">

      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-end px-5 md:px-16 pb-20 pt-36 md:pt-48 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[70vw] h-[70vh] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(184,150,90,0.06) 0%, transparent 65%)",
          }}
        />
        {/* AI grid accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-screen-xl mx-auto w-full">
          <Link
            href="/forum"
            className="hero-eyebrow group inline-flex flex-wrap items-center gap-x-3 gap-y-1 mb-10 px-4 py-2.5 text-xs font-light transition-colors hover:border-[#B8965A]"
            style={{ border: "1px solid rgba(184,150,90,0.35)", background: "rgba(184,150,90,0.04)" }}
          >
            <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#B8965A]">{t("발표", "Talk")} · 2026.09.18</span>
            <span className="text-[#D4D0CA]">
              {t("2026 출판 데이터 마케팅 포럼 — 서점은 독자를 어떻게 읽는가", "2026 Publishing Data Forum — How Bookstores Read Their Readers")}
            </span>
            <span className="text-[#B8965A] group-hover:translate-x-1 transition-transform">{t("자료 보기 →", "Resources →")}</span>
          </Link>
          <div className="flex items-center gap-4 mb-10 hero-eyebrow">
            <span className="block w-8 h-px bg-[#B8965A]" />
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A]">
              {t("Data & AI 기반 조직 단순화", "Data & AI-Powered Simplification")}
            </p>
          </div>

          <h1 className="hero-title text-[clamp(4.5rem,13vw,16rem)] font-extralight leading-[0.88] tracking-[-0.035em] mb-8">
            <span className="block text-[#F0EDE8]">Simple</span>
            <span className="block italic text-[#B8965A]">Society.</span>
          </h1>

          {/* Data → AI flow tag */}
          <div className="hero-eyebrow flex items-center gap-3 mb-14">
            {["Data", "→", "AI", "→", t("단순화", "Simplify")].map((w, i) => (
              <span
                key={i}
                className="text-[0.6rem] tracking-[0.25em] uppercase"
                style={{ color: w === "→" ? "#4A4A4A" : w === "AI" || w === t("단순화", "Simplify") ? "rgba(184,150,90,0.8)" : "#6A6A6A" }}
              >
                {w}
              </span>
            ))}
          </div>

          <div className="hero-line mb-14">
            <span className="block h-px bg-[rgba(255,255,255,0.08)] w-full" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <p className="hero-body max-w-xl text-[#8A8780] text-lg leading-relaxed font-light">
              {t(
                "데이터로 진단하고, AI로 걷어냅니다. 불필요한 구조·프로세스·소음을 제거하고 — 팀이 진짜 일에만 집중할 수 있는 조직을 만듭니다.",
                "Diagnose with data. Cut with AI. Remove redundant structures, processes, and noise — so your teams can focus on work that actually matters."
              )}
            </p>
            <div className="hero-cta flex flex-wrap items-center gap-3 flex-shrink-0">
              <Link href="/services" className="btn-primary">
                {t("서비스 보기", "Our services")}
                <span className="text-[#B8965A]">→</span>
              </Link>
              <Link href="/datasimplr" className="btn-gold">
                dataSimplr
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section
        id="philosophy"
        className="py-36 md:py-52 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <div className="md:col-span-5">
              <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-10">
                Our Philosophy
              </p>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="text-[clamp(2.5rem,5vw,4.5rem)] font-extralight leading-[1.05] tracking-tight"
              >
                {t("복잡함은", "Complexity is not")}<br />
                {t("정교함이 아니다.", "sophistication.")}
              </h2>
              <div data-reveal data-reveal-delay="2" className="mt-12">
                <span className="gold-line block w-24" />
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-center gap-8">
              <p data-reveal className="text-[#6A6A6A] text-lg leading-[1.9] font-light">
                {t(
                  "대부분의 조직은 무너져서가 아니라, 걷어낼 도구가 없었기 때문에 복잡성 속에 파묻힙니다. 겹겹이 쌓인 프로세스, 불분명한 책임, 끝없는 회의들 — 이제 그 도구가 있습니다.",
                  "Most organizations don't fail for lack of effort — they drown in complexity because they never had the tool to strip it away. Layers of process, blurred ownership, endless meetings. Now there's a tool."
                )}
              </p>
              <p data-reveal data-reveal-delay="1" className="text-[#6A6A6A] text-lg leading-[1.9] font-light">
                {t(
                  "simplyciety는 데이터로 조직이 실제로 작동하는 방식을 분석하고, AI로 구조적 안개를 걷어냅니다. 무엇이 병목인지, 어디서 결정이 막히는지를 숫자로 보여주고 — 판단이 빠른 구조를 설계합니다.",
                  "simplyciety uses data to analyze how your organization actually works, then uses AI to clear the structural fog. Where are the bottlenecks? Where do decisions stall? We show it in numbers — then redesign for speed."
                )}
              </p>
              <p data-reveal data-reveal-delay="2"
                className="text-[#8A8780] text-base leading-[1.9] font-light italic border-l-2 border-[#B8965A] pl-6">
                {t(
                  "\"AI는 일을 자동화하는 것이 아니라, 하지 않아도 될 일을 없애는 것이다.\"",
                  "\"AI is not about automating work. It's about eliminating work that shouldn't exist.\""
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        className="py-20 px-8 md:px-16 bg-[#060606]"
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(255,255,255,0.04)]">
            {[
              {
                step: "Step 1",
                title: t("데이터 진단", "Data Diagnosis"),
                sub: "Data Analysis",
                desc: t("조직의 커뮤니케이션 패턴, 의사결정 구조, 협업 흐름을 데이터로 측정하고 수치화합니다.", "We measure your communication patterns, decision structures, and collaboration flows — and turn them into data."),
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="6" y="12" width="28" height="20" rx="1.5" stroke="rgba(184,150,90,0.2)" strokeWidth="0.9" />
                    <rect x="6" y="12" width="28" height="6" rx="1.5" fill="rgba(184,150,90,0.06)" />
                    <line x1="11" y1="24" x2="22" y2="24" stroke="rgba(184,150,90,0.2)" strokeWidth="0.8" />
                    <line x1="11" y1="28" x2="18" y2="28" stroke="rgba(184,150,90,0.12)" strokeWidth="0.8" />
                    <circle cx="30" cy="27" r="5" stroke="rgba(184,150,90,0.35)" strokeWidth="1" fill="rgba(184,150,90,0.05)" />
                    <line x1="33.5" y1="30.5" x2="36" y2="33" stroke="rgba(184,150,90,0.35)" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="20" cy="15" r="1.5" fill="rgba(184,150,90,0.4)" />
                  </svg>
                ),
              },
              {
                step: "Step 2",
                title: t("AI 단순화", "AI Simplification"),
                sub: "AI-Driven Design",
                desc: t("데이터로 파악한 병목 지점을 AI로 걷어냅니다. 불필요한 프로세스를 제거하고 핵심만 남긴 조직 청사진을 제안합니다.", "Use data to find the bottlenecks, then AI to clear them. Remove redundant processes — leave a blueprint of only what matters."),
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="6" stroke="rgba(184,150,90,0.28)" strokeWidth="1" fill="rgba(184,150,90,0.06)" />
                    {[[20,8],[30,14],[30,26],[20,32],[10,26],[10,14]].map(([cx,cy],i) => (
                      <g key={i}>
                        <circle cx={cx} cy={cy} r="2.5" fill="rgba(184,150,90,0.07)" stroke="rgba(184,150,90,0.18)" strokeWidth="0.8" />
                        <line x1="20" y1="20" x2={cx} y2={cy} stroke="rgba(184,150,90,0.1)" strokeWidth="0.7" />
                      </g>
                    ))}
                    <circle cx="20" cy="20" r="2" fill="rgba(184,150,90,0.5)" />
                  </svg>
                ),
              },
              {
                step: "Step 3",
                title: t("성장", "Grow"),
                sub: "Continuous Optimization",
                desc: t("데이터와 AI로 변화를 지속적으로 추적하고 최적화합니다. 성과는 인상이 아닌 숫자로 검증됩니다.", "Continuously track change and optimize with data and AI. Results are validated in numbers, not impressions."),
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <polyline points="6,30 14,22 20,26 28,14 34,10" stroke="rgba(184,150,90,0.4)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <polyline points="6,30 14,22 20,26 28,14 34,10 34,30 6,30" fill="rgba(184,150,90,0.04)" stroke="none" />
                    <circle cx="34" cy="10" r="2.5" fill="rgba(184,150,90,0.5)" />
                    <line x1="6" y1="30" x2="34" y2="30" stroke="rgba(184,150,90,0.12)" strokeWidth="0.8" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.step}
                data-reveal
                className="bg-[#060606] p-10 md:p-12 flex flex-col gap-6 group hover:bg-[#0A0A0A] transition-colors duration-500"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#3A3A3A]">{item.step}</span>
                  <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-500">{item.icon}</div>
                </div>
                <h3 className="text-3xl md:text-4xl font-extralight tracking-tight group-hover:text-[#B8965A] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-[1.9] font-light">{item.desc}</p>
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#B8965A]/40 border border-[#B8965A]/15 px-2 py-1 self-start">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PILLARS ─── */}
      <section
        id="pillars"
        className="py-32 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-20">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A]">
              Three Pillars
            </p>
            <p data-reveal className="text-[#2A2A2A] text-[0.6rem] tracking-widest uppercase hidden md:block">
              What we stand for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(255,255,255,0.04)]">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.num}
                data-reveal
                data-reveal-delay={String(i + 1) as "1" | "2" | "3"}
                className="pillar-card bg-[#080808] p-10 md:p-14 flex flex-col gap-8"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[0.65rem] tracking-[0.35em] text-[#B8965A] uppercase">
                    {pillar.num}
                  </span>
                  {PILLAR_ICONS[i]}
                </div>
                <h3 className="pillar-title text-[clamp(2rem,3.5vw,3rem)] font-extralight tracking-tight leading-none transition-colors duration-500">
                  {pillar.title}
                </h3>
                <p className="text-[#5A5A5A] leading-[1.9] text-sm font-light">
                  {pillar.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DATASIMPLR ─── */}
      <section
        className="py-28 md:py-40 px-5 md:px-16 relative overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="absolute top-0 right-0 w-[50vw] h-full pointer-events-none" style={{ background: "radial-gradient(ellipse at right, rgba(184,150,90,0.06) 0%, transparent 65%)" }} />
        <div className="relative max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6">
            <div data-reveal className="flex flex-wrap items-center gap-3 mb-8">
              <span className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A]">{t("제품", "Product")}</span>
              <span className="inline-flex items-center gap-2 text-[0.55rem] tracking-[0.2em] uppercase border border-[#B8965A]/50 text-[#B8965A] px-2.5 py-1">
                <span className="w-1 h-1 rounded-full bg-[#B8965A] animate-pulse" />
                {t("2026.10.18 출시", "Launching Oct 18")}
              </span>
            </div>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(3rem,7vw,6.5rem)] font-extralight leading-[0.92] tracking-[-0.03em] mb-8">
              data<span className="italic text-[#B8965A]">Simplr</span>
            </h2>
            <p data-reveal data-reveal-delay="2" className="text-[#A8A49E] text-lg md:text-xl leading-[1.7] font-extralight mb-10">
              {t(
                "데이터팀이 없는 팀을 위한 AI 데이터 플랫폼. 표·JSON·관계 데이터를 올리면 RDB·NoSQL·그래프·온톨로지로 정리하고, 에이전트가 그 위에서 분석합니다.",
                "The data platform for teams without a data team. Upload tables, JSON or relationship data — it's organized into relational, document, graph and ontology layers, and agents analyze on top."
              )}
            </p>
            <div data-reveal data-reveal-delay="3" className="flex flex-wrap gap-3">
              <Link href="/datasimplr#waitlist" className="btn-gold">{t("대기명단 등록 →", "Join the waitlist →")}</Link>
              <Link href="/datasimplr" className="btn-primary">{t("자세히 보기", "Learn more")}</Link>
            </div>
          </div>
          <div data-reveal data-reveal-delay="2" className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-px bg-[rgba(184,150,90,0.18)]" style={{ border: "1px solid rgba(184,150,90,0.3)" }}>
              {[
                ["RDB", t("표", "Tables")],
                ["NoSQL", t("문서", "Documents")],
                ["Graph", t("연결", "Relationships")],
                ["Ontology", t("의미", "Meaning")],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#080808] p-6 md:p-8">
                  <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#B8965A] mb-3">{k}</p>
                  <p className="text-2xl md:text-3xl font-extralight tracking-tight">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-px p-5 flex items-center justify-between gap-4" style={{ border: "1px solid rgba(184,150,90,0.3)", background: "rgba(184,150,90,0.06)" }}>
              <span className="text-sm font-light text-[#D4D0CA]">{t("에이전트 · 자연어 질문 · MCP", "Agents · plain-language questions · MCP")}</span>
              <span className="text-[#B8965A]">↑</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section
        className="py-28 md:py-36 px-5 md:px-16 bg-[#060606]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-end">
          <div className="md:col-span-5">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8">Founder</p>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2.5rem,5vw,4.5rem)] font-extralight leading-[1] tracking-tight">
              {t("양성열", "Sungreul Yang")}
              <span className="block text-[#8A8780] text-[clamp(1.1rem,2vw,1.5rem)] mt-4">
                {t("simplyciety 대표 · AI와 데이터를 더 쉽게", "Founder & CEO · Making AI & data simpler")}
              </span>
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col gap-8">
            <p data-reveal className="text-[#A8A49E] text-base md:text-lg leading-[1.9] font-light">
              {t(
                "금융 → 데이터·AI → 유통을 거쳐 대형서점 데이터 조직에서 기반 → 확산 → AI → 수익화의 네 단계를 모두 이끌었습니다. 그 경험을 이제 다른 조직과 제품에 옮기고 있습니다.",
                "From finance to data & AI to retail, I led a major bookstore's data organization through all four stages — foundation, adoption, AI, and monetization. Now I bring that to other organizations, and to a product."
              )}
            </p>
            <div data-reveal data-reveal-delay="1" className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[rgba(255,255,255,0.06)]">
              {[
                ["Foundation", t("기반", "Foundation")],
                ["Adoption", t("확산", "Adoption")],
                ["Intelligence", t("AI 적용", "AI")],
                ["Monetization", t("수익화", "Monetization")],
              ].map(([k, v], i) => (
                <div key={k} className="bg-[#060606] p-5">
                  <p className="text-[0.55rem] tracking-[0.2em] text-[#B8965A] mb-2">0{i + 1}</p>
                  <p className="text-base font-light">{v}</p>
                </div>
              ))}
            </div>
            <div data-reveal data-reveal-delay="2" className="flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/ceo" className="text-[0.65rem] tracking-[0.25em] uppercase text-[#B8965A] hover:text-[#F0EDE8] transition-colors">
                {t("대표 소개 →", "About the founder →")}
              </Link>
              <Link href="/ceo#speaking" className="text-[0.65rem] tracking-[0.25em] uppercase text-[#8A8780] hover:text-[#B8965A] transition-colors">
                {t("발표 · 인터뷰 →", "Talks & interviews →")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MANIFESTO ─── */}
      <section
        id="manifesto"
        className="py-40 md:py-60 px-8 md:px-16 bg-[#050505] relative overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(184,150,90,0.04) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p data-reveal className="text-[0.65rem] tracking-[0.5em] uppercase text-[#B8965A] mb-16">
            Manifesto
          </p>
          <blockquote
            data-reveal
            data-reveal-delay="1"
            className="text-[clamp(1.8rem,4vw,3.75rem)] font-extralight leading-[1.25] tracking-tight text-[#D4D0CA]"
          >
            {lang === "ko" ? (
              <>&ldquo;우리는 쉽게 만들려고 단순화하지 않는다. 중요한 것을{" "}
              <em className="text-[#B8965A] not-italic">외면할 수 없게</em>{" "}
              만들기 위해 단순화한다.&rdquo;</>
            ) : (
              <>&ldquo;We don&apos;t simplify to make things easy. We simplify to make{" "}
              <em className="text-[#B8965A] not-italic">what matters</em>{" "}
              impossible to ignore.&rdquo;</>
            )}
          </blockquote>
          <div
            data-reveal
            data-reveal-delay="2"
            className="mt-20 flex items-center justify-center gap-6"
          >
            <span className="gold-line block w-16" />
            <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#3A3A3A]">
              simplyciety, 2026
            </span>
            <span className="gold-line block w-16" />
          </div>
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <div
        className="py-5 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "ticker 30s linear infinite" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-16 flex-shrink-0">
              {["Data", "AI", "Clarity", "Pipeline", "Simplification", "Impact", "Insight", "Automation"].map((w) => (
                <span key={w} className="flex items-center gap-16">
                  <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#262626]">{w}</span>
                  <span className="text-[#B8965A] text-xs">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ─── CTA ─── */}
      <section
        className="py-40 md:py-52 px-8 md:px-16 relative overflow-hidden"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute bottom-0 left-0 w-[50vw] h-[50vh] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom left, rgba(184,150,90,0.04) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
          <div>
            <h2 data-reveal className="text-[clamp(2.8rem,6vw,6.5rem)] font-extralight leading-[0.95] tracking-tight">
              {t("복잡성을", "Ready to")}<br />
              <span className="italic text-[#B8965A]">{t("걷어낼 준비가", "cut through")}</span><br />
              {t("됐다면 —", "complexity?")}
            </h2>
          </div>
          <div data-reveal data-reveal-delay="1" className="flex flex-col gap-8">
            <p className="text-[#5A5A5A] text-base leading-[1.9] font-light">
              {t("어떤 서비스가 맞는지 몰라도 됩니다.", "You don't need to know which service fits.")}<br />
              {t("현재 상황을 간단히 적어주시면, 맞는 방향을 제안드립니다.", "Just tell us where things break down, and we'll point you in the right direction.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-gold inline-flex">
                {t("지금 문의하기 →", "Contact us →")}
              </Link>
              <Link
                href="/services"
                className="inline-flex text-[0.65rem] tracking-[0.25em] uppercase px-6 py-3.5 text-[#4A4A4A] border border-[rgba(255,255,255,0.06)] hover:text-[#F0EDE8] hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
              >
                {t("서비스 먼저 보기", "View services")}
              </Link>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1.5rem" }}>
              <a
                href="mailto:hello@simplyciety.com"
                className="text-[0.6rem] tracking-[0.25em] uppercase text-[#2A2A2A] hover:text-[#6A6A6A] transition-colors"
              >
                hello@simplyciety.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
