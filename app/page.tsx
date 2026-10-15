"use client";

import Link from "next/link";
import Nav from "./components/Nav";
import SiteFooter from "./components/SiteFooter";
import { useReveal } from "./components/useReveal";
import { useLang } from "./contexts/LanguageContext";
import { CONTACT_EMAIL, TAGLINE } from "../lib/contact";
import { LAUNCH_LABEL } from "../lib/launch";

const PILLARS = [
  { word: "Consult", id: "consulting", name: { ko: "AX 컨설팅", en: "AX consulting" },
    desc: { ko: "어디서부터 AI를 붙일지 진단하고, 우선순위와 실행 로드맵을 함께 잡습니다.", en: "Diagnose where AI fits first, then set priorities and an execution roadmap together." } },
  { word: "Educate", id: "education", name: { ko: "교육·조직문화", en: "Education & culture" },
    desc: { ko: "경영진부터 실무자까지, 데이터와 AI로 판단하는 습관을 조직에 심습니다.", en: "From executives to practitioners — build the habit of deciding with data and AI." } },
  { word: "Build", id: "platform", name: { ko: "플랫폼·에이전트 구축", en: "Platforms & agents" },
    desc: { ko: "데이터 파이프라인과 사내 포털을 깔고, 그 위에 AI 모델과 에이전트를 붙입니다.", en: "Lay pipelines and internal portals, then put AI models and agents on top." } },
  { word: "Create", id: "create", name: { ko: "솔루션·플랫폼", en: "Solutions & platform" },
    desc: { ko: "AI 데이터 플랫폼 dataSimplr를 만들고, 쌓인 데이터를 새 상품으로 설계합니다.", en: "We build dataSimplr, the AI data platform, and design new products from the data you hold." } },
];

export default function Home() {
  const { lang, t } = useLang();
  useReveal();

  return (
    <div className="noise-bg bg-bg text-text font-[var(--font-geist-sans)]">

      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-end px-5 md:px-16 pb-20 pt-36 md:pt-48 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[70vw] h-[70vh] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgb(var(--accent-rgb) / 0.06) 0%, transparent 65%)",
          }}
        />
        {/* AI grid accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--hairline) / 0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--hairline) / 0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-screen-xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-10 hero-eyebrow">
            <span className="block w-8 h-px bg-accent" />
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-accent">
              {TAGLINE[lang]}
            </p>
          </div>

          <h1 className="hero-title text-[clamp(4.5rem,13vw,16rem)] font-extralight leading-[0.88] tracking-[-0.035em] mb-8">
            <span className="block text-text">Simple</span>
            <span className="block italic text-accent">Society.</span>
          </h1>

          {/* Data → AI flow tag */}
          <div className="hero-eyebrow flex items-center gap-3 mb-14">
            {PILLARS.map((p, i) => (
              <span key={p.word} className="flex items-center gap-3 text-[0.6rem] tracking-[0.25em] uppercase text-text-muted">
                {i > 0 && <span className="text-accent">·</span>}
                {p.word}
              </span>
            ))}
          </div>

          <div className="hero-line mb-14">
            <span className="block h-px bg-border w-full" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <p className="hero-body max-w-xl text-text-muted text-lg leading-relaxed font-light">
              {t(
                "방향을 잡고, 사람을 키우고, 시스템을 만들고, 새 제품을 내놓습니다. 불필요한 구조·프로세스·소음을 걷어내 팀이 진짜 일에 집중하게 만듭니다.",
                "We set direction, grow people, build systems, and ship new products — clearing out redundant structure, process, and noise so your teams can focus on work that matters."
              )}
            </p>
            <div className="hero-cta flex flex-wrap items-center gap-3 flex-shrink-0">
              <Link href="/services" className="btn-primary">
                {t("서비스 보기", "Our services")}
                <span className="text-accent">→</span>
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
        style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <div className="md:col-span-5">
              <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-accent mb-10">
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
              <p data-reveal className="text-text-muted text-lg leading-[1.9] font-light">
                {t(
                  "대부분의 조직은 무너져서가 아니라, 걷어낼 도구가 없었기 때문에 복잡성 속에 파묻힙니다. 겹겹이 쌓인 프로세스, 불분명한 책임, 끝없는 회의들 — 이제 그 도구가 있습니다.",
                  "Most organizations don't fail for lack of effort — they drown in complexity because they never had the tool to strip it away. Layers of process, blurred ownership, endless meetings. Now there's a tool."
                )}
              </p>
              <p data-reveal data-reveal-delay="1" className="text-text-muted text-lg leading-[1.9] font-light">
                {t(
                  "simplyciety는 데이터로 조직이 실제로 작동하는 방식을 분석하고, AI로 구조적 안개를 걷어냅니다. 무엇이 병목인지, 어디서 결정이 막히는지를 숫자로 보여주고 — 판단이 빠른 구조를 설계합니다.",
                  "simplyciety uses data to analyze how your organization actually works, then uses AI to clear the structural fog. Where are the bottlenecks? Where do decisions stall? We show it in numbers — then redesign for speed."
                )}
              </p>
              <p data-reveal data-reveal-delay="2"
                className="text-text-muted text-base leading-[1.9] font-light italic border-l-2 border-accent pl-6">
                {t(
                  "\"AI는 일을 자동화하는 것이 아니라, 하지 않아도 될 일을 없애는 것이다.\"",
                  "\"AI is not about automating work. It's about eliminating work that shouldn't exist.\""
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUR WAYS (Consult · Educate · Build · Create) ─── */}
      <section
        id="pillars"
        style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}
        className="py-24 md:py-32 px-8 md:px-16 bg-surface"
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-14">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-accent">
              {t("네 가지 방식", "Four ways")}
            </p>
            <Link href="/services" className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted hover:text-accent transition-colors">
              {t("서비스 전체 보기 →", "All services →")}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {PILLARS.map((p, i) => (
              <Link
                key={p.word}
                href={`/services#${p.id}`}
                data-reveal
                data-reveal-delay={String(i + 1)}
                className="bg-surface p-10 flex flex-col gap-6 group hover:bg-elevated transition-colors duration-500"
              >
                <span className="text-[0.6rem] tracking-[0.3em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[clamp(2rem,3vw,2.75rem)] font-extralight tracking-tight leading-none group-hover:text-accent transition-colors duration-500">
                  {p.word}
                </h3>
                <p className="text-text-secondary text-sm font-light">{p.name[lang]}</p>
                <p className="text-text-muted text-sm leading-[1.9] font-light flex-1">{p.desc[lang]}</p>
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-accent/50 group-hover:text-accent transition-colors">
                  {t("자세히 →", "Learn more →")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DATASIMPLR ─── */}
      <section
        className="py-28 md:py-40 px-5 md:px-16 relative overflow-hidden"
        style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}
      >
        <div className="absolute top-0 right-0 w-[50vw] h-full pointer-events-none" style={{ background: "radial-gradient(ellipse at right, rgb(var(--accent-rgb) / 0.06) 0%, transparent 65%)" }} />
        <div className="relative max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6">
            <div data-reveal className="flex flex-wrap items-center gap-3 mb-8">
              <span className="text-[0.65rem] tracking-[0.4em] uppercase text-accent">{t("제품", "Product")}</span>
              <span className="inline-flex items-center gap-2 text-[0.55rem] tracking-[0.2em] uppercase border border-accent/50 text-accent px-2.5 py-1">
                <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                {t(`${LAUNCH_LABEL.ko} 출시`, `Launching ${LAUNCH_LABEL.en}`)}
              </span>
            </div>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(3rem,7vw,6.5rem)] font-extralight leading-[0.92] tracking-[-0.03em] mb-8">
              data<span className="italic text-accent">Simplr</span>
            </h2>
            <p data-reveal data-reveal-delay="2" className="text-text-secondary text-lg md:text-xl leading-[1.7] font-extralight mb-10">
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
            <div className="grid grid-cols-2 gap-px bg-[rgb(var(--accent-rgb)/0.18)]" style={{ border: "1px solid rgb(var(--accent-rgb) / 0.3)" }}>
              {[
                ["RDB", t("표", "Tables")],
                ["NoSQL", t("문서", "Documents")],
                ["Graph", t("연결", "Relationships")],
                ["Ontology", t("의미", "Meaning")],
              ].map(([k, v]) => (
                <div key={k} className="bg-bg p-6 md:p-8">
                  <p className="text-[0.55rem] tracking-[0.3em] uppercase text-accent mb-3">{k}</p>
                  <p className="text-2xl md:text-3xl font-extralight tracking-tight">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-px p-5 flex items-center justify-between gap-4" style={{ border: "1px solid rgb(var(--accent-rgb) / 0.3)", background: "rgb(var(--accent-rgb) / 0.06)" }}>
              <span className="text-sm font-light text-text">{t("에이전트 · 자연어 질문 · MCP", "Agents · plain-language questions · MCP")}</span>
              <span className="text-accent">↑</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section
        className="py-28 md:py-36 px-5 md:px-16 bg-surface"
        style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-end">
          <div className="md:col-span-5">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-accent mb-8">Founder</p>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2.5rem,5vw,4.5rem)] font-extralight leading-[1] tracking-tight">
              {t("양성열", "Sungreul Yang")}
              <span className="block text-text-muted text-[clamp(1.1rem,2vw,1.5rem)] mt-4">
                {t("simplyciety 대표 · AWS Summit Seoul · 출판 데이터 마케팅 포럼 연사", "Founder & CEO · Speaker at AWS Summit Seoul and the Publishing Data Marketing Forum")}
              </span>
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col gap-8">
            <p data-reveal className="text-text-secondary text-base md:text-lg leading-[1.9] font-light">
              {t(
                "금융 → 데이터·AI → 유통·문화를 거치며, 데이터 조직에서 기반 → 확산 → AI → 수익화의 네 단계를 모두 이끌었습니다. 그 경험을 이제 다른 조직과 제품에 옮기고 있습니다.",
                "From finance to data & AI to retail and culture, I led a data organization through all four stages — foundation, adoption, AI, and monetization. Now I bring that to other organizations, and to a product."
              )}
            </p>
            <div data-reveal data-reveal-delay="1" className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
              {[
                ["Foundation", t("기반", "Foundation")],
                ["Adoption", t("확산", "Adoption")],
                ["Intelligence", t("AI 적용", "AI")],
                ["Monetization", t("수익화", "Monetization")],
              ].map(([k, v], i) => (
                <div key={k} className="bg-surface p-5">
                  <p className="text-[0.55rem] tracking-[0.2em] text-accent mb-2">0{i + 1}</p>
                  <p className="text-base font-light">{v}</p>
                </div>
              ))}
            </div>
            <div data-reveal data-reveal-delay="2" className="flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/ceo" className="text-[0.65rem] tracking-[0.25em] uppercase text-accent hover:text-text transition-colors">
                {t("대표 소개 →", "About the founder →")}
              </Link>
              <Link href="/ceo#speaking" className="text-[0.65rem] tracking-[0.25em] uppercase text-text-muted hover:text-accent transition-colors">
                {t("발표 · 인터뷰 →", "Talks & interviews →")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MANIFESTO ─── */}
      <section
        id="manifesto"
        className="py-40 md:py-60 px-8 md:px-16 bg-surface relative overflow-hidden"
        style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgb(var(--accent-rgb) / 0.04) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p data-reveal className="text-[0.65rem] tracking-[0.5em] uppercase text-accent mb-16">
            Manifesto
          </p>
          <blockquote
            data-reveal
            data-reveal-delay="1"
            className="text-[clamp(1.8rem,4vw,3.75rem)] font-extralight leading-[1.25] tracking-tight text-text"
          >
            {lang === "ko" ? (
              <>&ldquo;우리는 쉽게 만들려고 단순화하지 않는다. 중요한 것을{" "}
              <em className="text-accent not-italic">외면할 수 없게</em>{" "}
              만들기 위해 단순화한다.&rdquo;</>
            ) : (
              <>&ldquo;We don&apos;t simplify to make things easy. We simplify to make{" "}
              <em className="text-accent not-italic">what matters</em>{" "}
              impossible to ignore.&rdquo;</>
            )}
          </blockquote>
          <div
            data-reveal
            data-reveal-delay="2"
            className="mt-20 flex items-center justify-center gap-6"
          >
            <span className="gold-line block w-16" />
            <span className="text-[0.6rem] tracking-[0.35em] uppercase text-text-muted">
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
          borderTop: "1px solid rgb(var(--hairline) / 0.04)",
          borderBottom: "1px solid rgb(var(--hairline) / 0.04)",
        }}
      >
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "ticker 30s linear infinite" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-16 flex-shrink-0">
              {["Consult", "Educate", "Build", "Create", "AX/DX", "AI/Data", "Solution/Platform"].map((w) => (
                <span key={w} className="flex items-center gap-16">
                  <span className="text-[0.6rem] tracking-[0.35em] uppercase text-text-muted">{w}</span>
                  <span className="text-accent text-xs">·</span>
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
        style={{ borderBottom: "1px solid rgb(var(--hairline) / 0.06)" }}
      >
        <div
          className="absolute bottom-0 left-0 w-[50vw] h-[50vh] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom left, rgb(var(--accent-rgb) / 0.04) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
          <div>
            <h2 data-reveal className="text-[clamp(2.8rem,6vw,6.5rem)] font-extralight leading-[0.95] tracking-tight">
              {t("복잡성을", "Ready to")}<br />
              <span className="italic text-accent">{t("걷어낼 준비가", "cut through")}</span><br />
              {t("됐다면 —", "complexity?")}
            </h2>
          </div>
          <div data-reveal data-reveal-delay="1" className="flex flex-col gap-8">
            <p className="text-text-muted text-base leading-[1.9] font-light">
              {t("어떤 서비스가 맞는지 몰라도 됩니다.", "You don't need to know which service fits.")}<br />
              {t("현재 상황을 간단히 적어주시면, 맞는 방향을 제안드립니다.", "Just tell us where things break down, and we'll point you in the right direction.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-gold inline-flex">
                {t("지금 문의하기 →", "Contact us →")}
              </Link>
              <Link
                href="/services"
                className="inline-flex text-[0.65rem] tracking-[0.25em] uppercase px-6 py-3.5 text-text-muted border border-border hover:text-text hover:border-border transition-all duration-300"
              >
                {t("서비스 먼저 보기", "View services")}
              </Link>
            </div>
            <div style={{ borderTop: "1px solid rgb(var(--hairline) / 0.04)", paddingTop: "1.5rem" }}>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[0.6rem] tracking-[0.25em] uppercase text-text-muted hover:text-text-muted transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
