"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import { useReveal } from "../components/useReveal";
import { useLang } from "../contexts/LanguageContext";
import { LAUNCH_AT, LAUNCH_LABEL, LAUNCH_LONG } from "../../lib/launch";
import ProductWindow from "./ProductWindow";
import WaitlistForm from "./WaitlistForm";

type S = { ko: string; en: string };
const s = (ko: string, en: string): S => ({ ko, en });

const LAUNCH_MS = new Date(LAUNCH_AT).getTime();

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, LAUNCH_MS - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (left === null) return null;
  const d = Math.floor(left / 86_400_000);
  const h = Math.floor((left % 86_400_000) / 3_600_000);
  const m = Math.floor((left % 3_600_000) / 60_000);
  const sec = Math.floor((left % 60_000) / 1000);
  return { d, h, m, s: sec };
}

const WORKS_WITH = ["Excel", "Google Sheets", "CSV", "PostgreSQL", "MySQL", "MongoDB", "JSON", "Neo4j", "PDF", "MCP"];

const COMPARE = [
  { before: s("파일을 합칠 때마다 숫자가 달라진다", "Numbers change every time files are merged"), after: s("연결 키를 자동으로 찾아 한 번에 잇는다", "Join keys detected and linked once") },
  { before: s("'매출'의 뜻이 부서마다 다르다", "“Revenue” means something different to every team"), after: s("용어와 규칙이 온톨로지 한 곳에 정의된다", "Terms and rules defined once, in an ontology") },
  { before: s("개인정보 때문에 AI에 못 넣는다", "Personal data keeps AI off-limits"), after: s("적재 시 자동으로 가리고 권한을 나눈다", "Masked on load, with scoped access") },
  { before: s("AI 답을 믿을 수 없다", "AI answers can't be trusted"), after: s("모든 답에 쿼리와 정의가 근거로 붙는다", "Every answer cites its query and definitions") },
];

const STEPS = [
  { k: "01", name: "Load", title: s("올리기", "Load"), desc: s("파일을 끌어놓거나 DB를 연결합니다. 스키마·연결 키·개인정보는 자동으로 찾습니다.", "Drop files or connect a database. Schemas, join keys and PII are detected automatically.") },
  { k: "02", name: "Understand", title: s("이해하기", "Understand"), desc: s("데이터 모양에 맞춰 표·문서·그래프로 정리하고, 용어를 의미 지도로 묶습니다.", "Data is shaped into tables, documents and graphs, and terms are tied into a map of meaning.") },
  { k: "03", name: "Ask & Act", title: s("묻고 맡기기", "Ask & act"), desc: s("자연어로 묻고 근거와 함께 답을 받습니다. 반복 업무는 에이전트에게 맡깁니다.", "Ask in plain language, get answers with sources, and hand repeat work to agents.") },
];

const AGENTS = [
  { name: "Analyst", role: s("질문 → SQL·그래프 쿼리 → 표·차트·근거", "Question → SQL/graph query → tables, charts, sources"), gate: s("읽기 전용", "Read-only") },
  { name: "Modeler", role: s("엔터티·관계·용어 정의 제안", "Proposes entities, relationships, definitions"), gate: s("사람 승인", "Human-approved") },
  { name: "Ingest", role: s("소스 연결 · 스키마 변화 대응", "Connects sources, handles schema drift"), gate: s("변경 시 승인", "Approve on change") },
  { name: "Monitor", role: s("이상치 · 동기화 실패 알림 · 주간 요약", "Anomalies, sync failures, weekly digest"), gate: s("알림", "Alerts") },
];

const FAQ = [
  { q: s("SQL이나 데이터 모델링을 몰라도 되나요?", "Do I need SQL or data-modeling skills?"), a: s("아니요. 저장 방식은 dataSimplr가 고르고, 여러분은 자연어로 묻고 제안된 정의를 확인만 하면 됩니다. 답마다 사용한 쿼리를 보여주므로 검증도 할 수 있습니다.", "No. dataSimplr chooses the storage model; you ask in plain language and confirm suggested definitions. Each answer shows its query, so it can be verified.") },
  { q: s("에이전트가 데이터를 마음대로 바꾸나요?", "Can agents change my data on their own?"), a: s("아니요. 분석은 읽기 전용이고, 데이터나 정의를 바꾸는 작업은 사람이 승인해야 실행됩니다.", "No. Analysis is read-only; anything that changes data or definitions requires human approval.") },
  { q: s("Claude 같은 외부 에이전트와 연결되나요?", "Does it work with external agents like Claude?"), a: s("출시 버전에 MCP 서버가 포함됩니다. 권한 범위 안에서 외부 에이전트가 정리된 데이터를 도구로 씁니다.", "Yes — launch includes an MCP server, so external agents can use your organized data within the permissions you set.") },
  { q: s("개인정보와 보안은요?", "What about privacy and security?"), a: s("적재 시 개인정보를 자동으로 찾아 가리고, 워크스페이스 단위로 데이터를 격리합니다.", "PII is detected and masked on load, and every workspace is isolated.") },
  { q: s("가격은 어떻게 되나요?", "What will it cost?"), a: s("베타 기간에는 무료입니다. 대기명단 등록자에게 요금제를 가장 먼저 안내합니다.", "Free during the beta. Waitlist members hear about pricing first.") },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-accent mb-6 flex items-center gap-3">
      <span className="w-6 h-px bg-accent" />
      {children}
    </p>
  );
}

export default function DataSimplrContent() {
  const { lang, t } = useLang();
  const cd = useCountdown();
  useReveal();

  return (
    <div className="noise-bg bg-bg text-text min-h-screen overflow-x-hidden">
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative px-5 md:px-16 pt-32 md:pt-44 pb-20 md:pb-28">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgb(var(--hairline) / 0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--hairline) / 0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 20%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 20%, black 20%, transparent 70%)",
          }}
        />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[90vw] h-[70vh] pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgb(var(--accent-rgb) / 0.16) 0%, transparent 60%)" }} />

        <div className="relative max-w-screen-xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="hero-eyebrow inline-flex flex-wrap items-center justify-center gap-3 mb-10 px-4 py-2 rounded-full" style={{ border: "1px solid rgb(var(--accent-rgb) / 0.35)", background: "rgb(var(--accent-rgb) / 0.06)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-accent-strong">{t(`퍼블릭 베타 · ${LAUNCH_LABEL.ko}`, `Public beta · ${LAUNCH_LABEL.en}`)}</span>
              {cd && <span className="text-[0.65rem] tracking-[0.2em] text-text-muted">D-{cd.d}</span>}
            </div>

            <h1 className="hero-title font-extralight tracking-[-0.035em] leading-[1.02] mb-8">
              <span className="block text-[clamp(1rem,1.6vw,1.25rem)] tracking-[0.35em] uppercase text-text-muted mb-6">
                data<span className="italic text-accent">Simplr</span>
              </span>
              <span className="block text-[clamp(2.6rem,7vw,6.5rem)]">
                {t("데이터팀 없이도,", "AI-ready data.")}
              </span>
              <span className="block text-[clamp(2.6rem,7vw,6.5rem)] italic text-accent">
                {t("AI가 읽는 데이터.", "No data team required.")}
              </span>
            </h1>

            <p className="hero-body text-text-secondary text-base md:text-xl leading-[1.7] font-light max-w-2xl mx-auto mb-10">
              {t(
                "표·JSON·관계·문서를 그대로 올리세요. dataSimplr가 RDB·NoSQL·그래프·온톨로지로 정리하고, 에이전트가 그 위에서 분석하고 일합니다.",
                "Bring spreadsheets, databases, JSON and documents as they are. dataSimplr organizes them into relational, document, graph and ontology layers — and agents analyze and act on top."
              )}
            </p>

            <div className="hero-cta max-w-xl mx-auto">
              <WaitlistForm variant="compact" id="waitlist-hero" />
            </div>
          </div>

          {/* product window */}
          <div className="hero-cta relative mt-16 md:mt-24 max-w-5xl mx-auto">
            <ProductWindow />
          </div>

          {/* works with */}
          <div className="mt-16 flex flex-col items-center gap-5">
            <p className="text-[0.6rem] tracking-[0.35em] uppercase text-text-muted">{t("이런 데이터와 함께 동작합니다", "Works with the data you already have")}</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {WORKS_WITH.map((w) => (
                <span key={w} className="text-sm md:text-base font-light text-text-muted tracking-wide">{w}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Eyebrow>Why dataSimplr</Eyebrow>
            <h2 data-reveal className="text-[clamp(2rem,3.6vw,3.1rem)] font-extralight leading-[1.15] tracking-tight mb-8 break-keep">
              {lang === "ko" ? (
                <>AI는 누구나 빌려 씁니다.<br /><span className="italic text-accent">차이는 데이터에서</span> 납니다.</>
              ) : (
                <>Anyone can rent a model.<br /><span className="italic text-accent">Your data</span> is the edge.</>
              )}
            </h2>
            <p data-reveal className="text-text-muted text-base leading-[1.9] font-light">
              {t(
                "큰 회사는 데이터 엔지니어가 AI용 데이터를 준비합니다. 데이터팀이 없는 대부분의 팀에게는 그 일을 대신할 제품이 필요합니다.",
                "Large companies hire data engineers to make data AI-ready. Most teams don't have one — they need a product that does the job."
              )}
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 md:gap-x-8 text-[0.6rem] tracking-[0.3em] uppercase mb-4">
              <span className="text-text-muted">{t("지금", "Today")}</span>
              <span />
              <span className="text-accent">{t("dataSimplr와 함께", "With dataSimplr")}</span>
            </div>
            {COMPARE.map((c, i) => (
              <div key={i} data-reveal className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 md:gap-x-8 py-5" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.07)" }}>
                <p className="text-text-muted text-sm md:text-base font-light line-through decoration-border">{c.before[lang]}</p>
                <span className="text-accent">→</span>
                <p className="text-text text-sm md:text-base font-light">{c.after[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (flow illustration) ─── */}
      <section className="py-24 md:py-32 px-5 md:px-16 bg-surface" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-accent mb-6">How it works</p>
            <h2 data-reveal className="text-[clamp(2rem,4.5vw,3.75rem)] font-extralight leading-[1.1] tracking-tight">
              {t("올리고, 이해하고, 맡긴다.", "Load. Understand. Delegate.")}
            </h2>
          </div>
          <div data-reveal className="surface-dark relative mb-14 overflow-x-auto p-4 md:p-8" style={{ border: "1px solid rgb(var(--accent-rgb) / 0.18)" }}>
            <Image src="/datasimplr/flow.svg" alt={t("흩어진 소스가 dataSimplr를 거쳐 질문·에이전트·MCP로 이어지는 흐름", "Scattered sources flow through dataSimplr into questions, agents and MCP")} width={960} height={380} unoptimized className="w-full min-w-[640px] h-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {STEPS.map((st, i) => (
              <div key={st.k} data-reveal data-reveal-delay={String(i + 1)} className="bg-surface p-8 md:p-10 flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.6rem] tracking-[0.3em] text-accent">{st.k}</span>
                  <span className="text-[0.55rem] tracking-[0.3em] uppercase text-text-muted">{st.name}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extralight tracking-tight">{st.title[lang]}</h3>
                <p className="text-text-muted text-sm leading-[1.9] font-light">{st.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MULTI-MODEL (layers illustration) ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16 relative overflow-hidden" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div data-reveal className="surface-dark order-2 lg:order-1 p-4 md:p-8" style={{ border: "1px solid rgb(var(--accent-rgb) / 0.18)" }}>
            <Image src="/datasimplr/layers.svg" alt={t("RDB·NoSQL·그래프·온톨로지 네 개 레이어 위에서 에이전트가 동작하는 구조", "Four layers — relational, document, graph and ontology — with agents on top")} width={680} height={640} unoptimized className="w-full h-auto" />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>Multi-model</Eyebrow>
            <h2 data-reveal className="text-[clamp(2rem,4.5vw,3.75rem)] font-extralight leading-[1.08] tracking-tight mb-8">
              {lang === "ko" ? (
                <>데이터 모양에 맞는<br /><span className="italic text-accent">네 개의 레이어</span></>
              ) : (
                <>Four layers,<br /><span className="italic text-accent">one map of meaning</span></>
              )}
            </h2>
            <p data-reveal className="text-text-muted text-base leading-[1.9] font-light mb-10">
              {t(
                "어떤 DB를 써야 할지 고민하지 마세요. 데이터마다 맞는 레이어에 담고, 온톨로지가 네 레이어를 하나의 의미로 잇습니다.",
                "Stop choosing databases. Each dataset lands in the layer that fits, and the ontology ties all four into a single meaning."
              )}
            </p>
            <dl className="grid grid-cols-2 gap-px bg-border">
              {[
                ["RDB", s("주문·재고·정산", "Orders, inventory, billing")],
                ["NoSQL", s("이벤트·API·로그", "Events, APIs, logs")],
                ["Graph", s("고객–상품–채널 관계", "Customer–product–channel links")],
                ["Ontology", s("용어·지표·규칙", "Terms, metrics, rules")],
              ].map(([k, v]) => (
                <div key={k as string} data-reveal className="bg-bg p-5">
                  <dt className="text-[0.6rem] tracking-[0.3em] uppercase text-accent mb-2">{k as string}</dt>
                  <dd className="text-sm text-text font-light">{(v as S)[lang]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─── BENTO ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16 bg-surface" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-2xl mb-14">
            <Eyebrow>Built for agents</Eyebrow>
            <h2 data-reveal className="text-[clamp(2rem,4.5vw,3.75rem)] font-extralight leading-[1.08] tracking-tight">
              {lang === "ko" ? (
                <>데이터 담당자 대신,<br /><span className="italic text-accent">믿을 수 있는 에이전트 팀</span></>
              ) : (
                <>Instead of a data hire,<br /><span className="italic text-accent">a team of trustworthy agents</span></>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* agents */}
            <div data-reveal className="md:col-span-4 p-7 md:p-9 bg-elevated border border-border flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-light">{t("에이전트", "Agents")}</h3>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted">human-in-the-loop</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AGENTS.map((a) => (
                  <div key={a.name} className="p-4 border border-border bg-surface-tint flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text flex items-center gap-2">
                        <span className="text-accent">✦</span>
                        {a.name}
                      </span>
                      <span className="text-[0.55rem] tracking-[0.15em] uppercase text-accent/80">{a.gate[lang]}</span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">{a.role[lang]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MCP */}
            <div data-reveal data-reveal-delay="1" className="md:col-span-2 p-7 md:p-9 bg-elevated border border-border flex flex-col gap-5">
              <h3 className="text-xl font-light">MCP</h3>
              <p className="text-sm text-text-muted leading-relaxed font-light">
                {t("Claude 같은 외부 에이전트가 정리된 데이터를 권한 범위 안에서 도구로 씁니다.", "External agents such as Claude use your organized data as a tool, within scope.")}
              </p>
              <pre className="mt-auto text-[11px] leading-[1.7] font-mono text-text-secondary p-4 bg-black/40 border border-border overflow-x-auto">
{`{
  "mcpServers": {
    "datasimplr": {
      "url": "https://mcp.…/acme",
      "scope": "read:sales"
    }
  }
}`}
              </pre>
            </div>

            {/* sources cited */}
            <div data-reveal className="md:col-span-2 p-7 md:p-9 bg-elevated border border-border flex flex-col gap-5">
              <h3 className="text-xl font-light">{t("근거가 붙은 답", "Cited answers")}</h3>
              <p className="text-sm text-text-muted leading-relaxed font-light">
                {t("모든 답에 사용한 테이블·정의·쿼리를 보여줍니다.", "Every answer shows the tables, definitions and query it used.")}
              </p>
              <div className="mt-auto flex flex-col gap-2 text-[11px] font-mono">
                {["orders ⋈ customers", "def: repeat_buyer", "SELECT … GROUP BY sku"].map((x) => (
                  <span key={x} className="px-3 py-1.5 border border-accent/25 text-accent-strong bg-accent/[0.05] self-start">{x}</span>
                ))}
              </div>
            </div>

            {/* PII */}
            <div data-reveal data-reveal-delay="1" className="md:col-span-2 p-7 md:p-9 bg-elevated border border-border flex flex-col gap-5">
              <h3 className="text-xl font-light">{t("개인정보 자동 가림", "PII masked by default")}</h3>
              <p className="text-sm text-text-muted leading-relaxed font-light">
                {t("이름·연락처는 적재 시 가려지고, 워크스페이스마다 격리됩니다.", "Names and contacts are masked on load; every workspace is isolated.")}
              </p>
              <div className="mt-auto font-mono text-[11px] border border-border">
                {[["name", "Kim ●●"], ["phone", "010-●●●●-12●●"], ["email", "k●●●@●●●.com"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between px-3 py-2 border-b border-border last:border-0">
                    <span className="text-text-muted">{k}</span>
                    <span className="text-accent-strong">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* freshness */}
            <div data-reveal data-reveal-delay="2" className="md:col-span-2 p-7 md:p-9 bg-elevated border border-border flex flex-col gap-5">
              <h3 className="text-xl font-light">{t("항상 최신", "Always fresh")}</h3>
              <p className="text-sm text-text-muted leading-relaxed font-light">
                {t("바뀐 것만 동기화하고, 멈추면 바로 알립니다.", "Syncs only what changed, and alerts you the moment it stops.")}
              </p>
              <svg viewBox="0 0 220 60" className="mt-auto w-full h-14" aria-hidden>
                <polyline points="0,44 20,40 40,42 60,30 80,34 100,22 120,26 140,16 160,20 180,10 200,14 220,6" fill="none" stroke="var(--ds-accent)" strokeWidth="1.5" />
                <polyline points="0,44 20,40 40,42 60,30 80,34 100,22 120,26 140,16 160,20 180,10 200,14 220,6 220,60 0,60" fill="url(#fg)" stroke="none" />
                <defs>
                  <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--ds-accent)" stopOpacity=".25" />
                    <stop offset="1" stopColor="var(--ds-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="220" cy="6" r="3" fill="var(--ds-accent-strong)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section className="py-24 md:py-32 px-5 md:px-16" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <blockquote data-reveal className="text-[clamp(1.35rem,2.8vw,2.25rem)] font-extralight leading-[1.55] tracking-tight text-text">
            {t(
              "“유통·문화 분야 데이터 조직에서 기반 → 확산 → AI → 수익화, 네 단계를 모두 지났습니다. 그때 사람 손으로 반복하던 준비 작업을, 데이터팀이 없는 어느 팀이든 쓸 수 있는 제품으로 만들고 있습니다.”",
              "“In a retail data organization I went through every stage — foundation, adoption, AI, monetization. dataSimplr turns the prep work we repeated by hand into a product any team can use.”"
            )}
          </blockquote>
          <Link data-reveal href="/ceo" className="inline-flex items-center gap-4 mt-10 group">
            <span className="w-11 h-11 rounded-full flex items-center justify-center text-accent" style={{ border: "1px solid rgb(var(--accent-rgb) / 0.5)" }}>
              {t("양", "SY")}
            </span>
            <span className="text-left">
              <span className="block text-sm text-text group-hover:text-accent transition-colors">{t("양성열", "Sungreul Yang")}</span>
              <span className="block text-xs text-text-muted">{t("simplyciety 대표 · dataSimplr 메이커", "Founder, simplyciety · maker of dataSimplr")}</span>
            </span>
          </Link>
        </div>
      </section>

      {/* ─── WAITLIST ─── */}
      <section id="waitlist" className="py-24 md:py-36 px-5 md:px-16 relative overflow-hidden scroll-mt-20" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 100%, rgb(var(--accent-rgb) / 0.12) 0%, transparent 55%)" }} />
        <div className="relative max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5 flex flex-col">
            <Eyebrow>Early access</Eyebrow>
            <h2 data-reveal className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-extralight leading-[0.98] tracking-tight mb-10">
              {lang === "ko" ? (
                <>{LAUNCH_LONG.ko.replace("2026년 ", "")},<br /><span className="italic text-accent">가장 먼저.</span></>
              ) : (
                <>{LAUNCH_LONG.en.replace(", 2026", "")}.<br /><span className="italic text-accent">Be first in.</span></>
              )}
            </h2>

            {cd && (
              <div data-reveal className="grid grid-cols-4 gap-px bg-border mb-10 max-w-md">
                {[
                  [cd.d, t("일", "days")],
                  [cd.h, t("시간", "hrs")],
                  [cd.m, t("분", "min")],
                  [cd.s, t("초", "sec")],
                ].map(([v, l]) => (
                  <div key={l as string} className="bg-bg py-4 text-center">
                    <p className="text-3xl md:text-4xl font-extralight tabular-nums text-text">{String(v).padStart(2, "0")}</p>
                    <p className="text-[0.55rem] tracking-[0.25em] uppercase text-text-muted mt-1">{l as string}</p>
                  </div>
                ))}
              </div>
            )}

            <ul data-reveal className="flex flex-col gap-3 text-text-secondary text-sm font-light">
              {[
                s("등록 순서대로 퍼블릭 베타 초대", "Public-beta invites in signup order"),
                s("베타 기간 무료", "Free during the beta"),
                s("요금제·신규 기능 우선 안내", "First to hear about pricing and features"),
                s("선정 팀은 디자인 파트너로 1:1 온보딩", "Selected teams get 1:1 onboarding as design partners"),
              ].map((b, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-accent mt-0.5">✓</span>
                  {b[lang]}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal data-reveal-delay="1" className="lg:col-span-7 p-6 md:p-10 bg-elevated/80 border border-border backdrop-blur">
            <WaitlistForm variant="full" id="waitlist-form" />
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 md:py-32 px-5 md:px-16 bg-surface" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-accent mb-6">FAQ</p>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              {t("도입·파트너십 문의는 ", "For partnerships or enterprise questions, ")}
              <Link href="/contact?service=datasimplr" className="text-accent hover:underline">{t("문의하기", "contact us")}</Link>
              {t("로 남겨주세요.", ".")}
            </p>
          </div>
          <div className="lg:col-span-8 flex flex-col">
            {FAQ.map((item, i) => (
              <details key={i} className="group py-6" style={{ borderBottom: "1px solid rgb(var(--hairline) / 0.07)" }}>
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none text-base md:text-lg font-light text-text">
                  {item.q[lang]}
                  <span className="text-accent transition-transform group-open:rotate-45 text-xl">+</span>
                </summary>
                <p className="text-text-muted text-sm leading-[1.9] font-light mt-4 max-w-2xl">{item.a[lang]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
