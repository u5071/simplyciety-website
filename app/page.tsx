"use client";

import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import { useLang } from "./contexts/LanguageContext";

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
  const [scrolled, setScrolled] = useState(false);
  const { lang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    const els = document.querySelectorAll("[data-reveal], .gold-line");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="noise-bg bg-[#080808] text-[#F0EDE8] font-[var(--font-geist-sans)]">

      {/* ─── NAVIGATION ─── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between transition-all duration-700"
        style={{
          padding: scrolled ? "1.25rem 2.5rem" : "1.75rem 2.5rem",
          background: scrolled ? "rgba(8,8,8,0.93)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
        }}
      >
        <a href="#" className="hover:opacity-80 transition-opacity duration-300">
          <Logo />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {[
            ["서비스", "/services"],
            ["How It Works", "#pillars"],
            ["CEO", "/ceo"],
            ["문의", "/contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[0.65rem] tracking-[0.25em] uppercase text-[#6A6A6A] hover:text-[#F0EDE8] transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="/contact"
          className="hidden md:inline-flex text-[0.65rem] tracking-[0.25em] uppercase border border-[#B8965A]/40 px-5 py-2.5 text-[#B8965A] hover:bg-[#B8965A] hover:text-[#080808] transition-all duration-300"
        >
          문의하기
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 pt-48 overflow-hidden">
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
                className="text-[0.5rem] tracking-[0.25em] uppercase"
                style={{ color: w === "→" ? "#2A2A2A" : w === "AI" || w === t("단순화", "Simplify") ? "rgba(184,150,90,0.6)" : "#3A3A3A" }}
              >
                {w}
              </span>
            ))}
          </div>

          <div className="hero-line mb-14">
            <span className="block h-px bg-[rgba(255,255,255,0.08)] w-full" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <p className="hero-body max-w-xl text-[#6A6A6A] text-lg leading-relaxed font-light">
              {t(
                "데이터로 진단하고, AI로 걷어냅니다. 불필요한 구조·프로세스·소음을 제거하고 — 팀이 진짜 일에만 집중할 수 있는 조직을 만듭니다.",
                "Diagnose with data. Cut with AI. Remove redundant structures, processes, and noise — so your teams can focus on work that actually matters."
              )}
            </p>
            <div className="hero-cta flex items-center gap-6 flex-shrink-0">
              <a href="#philosophy" className="btn-primary">
                {t("우리의 철학", "Our Vision")}
                <span className="text-[#B8965A]">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-3 hero-cta">
          <span
            className="text-[0.55rem] tracking-[0.3em] uppercase text-[#3A3A3A]"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <div className="scroll-indicator w-px h-10 bg-gradient-to-b from-[#3A3A3A] to-transparent" />
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
              },
              {
                step: "Step 2",
                title: t("AI 단순화", "AI Simplification"),
                sub: "AI-Driven Design",
                desc: t("데이터로 파악한 병목 지점을 AI로 걷어냅니다. 불필요한 프로세스를 제거하고 핵심만 남긴 조직 청사진을 제안합니다.", "Use data to find the bottlenecks, then AI to clear them. Remove redundant processes — leave a blueprint of only what matters."),
              },
              {
                step: "Step 3",
                title: t("성장", "Grow"),
                sub: "Continuous Optimization",
                desc: t("데이터와 AI로 변화를 지속적으로 추적하고 최적화합니다. 성과는 인상이 아닌 숫자로 검증됩니다.", "Continuously track change and optimize with data and AI. Results are validated in numbers, not impressions."),
              },
            ].map((item) => (
              <div
                key={item.step}
                data-reveal
                className="bg-[#060606] p-10 md:p-12 flex flex-col gap-6 group hover:bg-[#0A0A0A] transition-colors duration-500"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#3A3A3A]">{item.step}</span>
                  <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#B8965A]/60 border border-[#B8965A]/20 px-2 py-1">
                    {item.sub}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extralight tracking-tight group-hover:text-[#B8965A] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-[1.9] font-light">{item.desc}</p>
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
                className="pillar-card bg-[#080808] p-10 md:p-14 flex flex-col gap-10"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[0.65rem] tracking-[0.35em] text-[#B8965A] uppercase">
                    {pillar.num}
                  </span>
                  <span className="w-6 h-px bg-[rgba(255,255,255,0.08)] mt-2 flex-shrink-0" />
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
              <>&ldquo;We don't simplify to make things easy. We simplify to make{" "}
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
              <a href="/contact" className="btn-gold inline-flex">
                {t("지금 문의하기 →", "Contact us →")}
              </a>
              <a
                href="/services"
                className="inline-flex text-[0.65rem] tracking-[0.25em] uppercase px-6 py-3.5 text-[#4A4A4A] border border-[rgba(255,255,255,0.06)] hover:text-[#F0EDE8] hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
              >
                {t("서비스 먼저 보기", "View services")}
              </a>
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

      {/* ─── FOOTER ─── */}
      <footer className="px-8 md:px-16 py-10">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <Logo markColor="rgba(184,150,90,0.35)" textColor="#3A3A3A" />
            <span className="text-[#2A2A2A]">—</span>
            <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#3A3A3A]">
              © 2026
            </span>
          </div>
          <div className="flex items-center gap-8">
            {[
              [t("서비스", "Services"), "/services"],
              ["CEO", "/ceo"],
              [t("문의하기", "Contact"), "/contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-[0.6rem] tracking-[0.25em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#2A2A2A]">
            Less noise. More signal.
          </span>
        </div>
      </footer>
    </div>
  );
}
