"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import { useReveal } from "../components/useReveal";
import { useLang } from "../contexts/LanguageContext";
import WaitlistForm from "./WaitlistForm";

type S = { ko: string; en: string };
const s = (ko: string, en: string): S => ({ ko, en });

const LAUNCH = new Date("2026-10-18T00:00:00+09:00");

function useDaysLeft() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const calc = () => setDays(Math.max(0, Math.ceil((LAUNCH.getTime() - Date.now()) / 86_400_000)));
    calc();
    const id = setInterval(calc, 60_000);
    return () => clearInterval(id);
  }, []);
  return days;
}

const STEPS = [
  { k: "Load", title: s("올린다", "Load"), desc: s("파일을 끌어놓거나 DB를 연결하면 끝. 스키마·연결 키·개인정보를 자동으로 찾아냅니다.", "Drop a file or connect a database. Schemas, join keys and personal data are detected for you.") },
  { k: "Understand", title: s("이해한다", "Understand"), desc: s("데이터 모양에 맞춰 표·문서·그래프로 정리하고, '매출'·'고객' 같은 용어를 하나의 의미 지도로 묶습니다.", "Data is shaped into tables, documents and graphs, and terms like “revenue” or “customer” are tied into one map of meaning.") },
  { k: "Ask", title: s("묻고 맡긴다", "Ask & delegate"), desc: s("자연어로 묻고 근거와 함께 답을 받습니다. 반복 작업은 에이전트에게 맡깁니다.", "Ask in plain language and get answers with their sources. Hand repeat work to agents.") },
];

const MODELS = [
  {
    tag: "RDB", title: s("표", "Tables"), when: s("주문 · 재고 · 정산처럼 행과 열이 맞는 데이터", "Orders, inventory, billing — anything with rows and columns"),
    from: "CSV · Excel · Google Sheets · Postgres · MySQL",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <rect x="6" y="9" width="32" height="26" stroke="#B8965A" strokeOpacity=".5" />
        <line x1="6" y1="17" x2="38" y2="17" stroke="#B8965A" strokeOpacity=".5" />
        <line x1="6" y1="26" x2="38" y2="26" stroke="#B8965A" strokeOpacity=".25" />
        <line x1="17" y1="9" x2="17" y2="35" stroke="#B8965A" strokeOpacity=".25" />
        <line x1="28" y1="9" x2="28" y2="35" stroke="#B8965A" strokeOpacity=".25" />
      </svg>
    ),
  },
  {
    tag: "NoSQL", title: s("문서", "Documents"), when: s("이벤트 로그 · API 응답처럼 구조가 자주 바뀌는 데이터", "Event logs and API payloads whose shape keeps changing"),
    from: "JSON · MongoDB · Webhooks",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <path d="M16 8c-4 0-4 3-4 6v4c0 2-1 4-4 4 3 0 4 2 4 4v4c0 3 0 6 4 6" stroke="#B8965A" strokeOpacity=".55" />
        <path d="M28 8c4 0 4 3 4 6v4c0 2 1 4 4 4-3 0-4 2-4 4v4c0 3 0 6-4 6" stroke="#B8965A" strokeOpacity=".55" />
        <line x1="18" y1="17" x2="26" y2="17" stroke="#B8965A" strokeOpacity=".3" />
        <line x1="18" y1="22" x2="24" y2="22" stroke="#B8965A" strokeOpacity=".3" />
        <line x1="18" y1="27" x2="26" y2="27" stroke="#B8965A" strokeOpacity=".3" />
      </svg>
    ),
  },
  {
    tag: "Graph", title: s("연결", "Relationships"), when: s("고객–상품–채널처럼 관계가 답이 되는 질문", "Questions where the connections are the answer — customer, product, channel"),
    from: s("자동 추출된 관계 · Neo4j import", "Auto-extracted relationships · Neo4j import").en,
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <line x1="12" y1="14" x2="30" y2="12" stroke="#B8965A" strokeOpacity=".3" />
        <line x1="12" y1="14" x2="20" y2="32" stroke="#B8965A" strokeOpacity=".3" />
        <line x1="30" y1="12" x2="20" y2="32" stroke="#B8965A" strokeOpacity=".3" />
        <line x1="30" y1="12" x2="36" y2="28" stroke="#B8965A" strokeOpacity=".3" />
        <circle cx="12" cy="14" r="4" fill="#080808" stroke="#B8965A" strokeOpacity=".6" />
        <circle cx="30" cy="12" r="4" fill="#080808" stroke="#B8965A" strokeOpacity=".6" />
        <circle cx="20" cy="32" r="4" fill="#B8965A" fillOpacity=".5" />
        <circle cx="36" cy="28" r="3" fill="#080808" stroke="#B8965A" strokeOpacity=".6" />
      </svg>
    ),
  },
  {
    tag: "Ontology", title: s("의미", "Meaning"), when: s("'매출'·'활성 고객'처럼 팀마다 다르게 쓰던 용어와 규칙", "Terms and rules every team used differently — “revenue”, “active customer”"),
    from: s("업종 템플릿 · 자동 제안", "Industry templates · auto-suggested").en,
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <rect x="16" y="6" width="12" height="8" stroke="#B8965A" strokeOpacity=".6" />
        <rect x="6" y="28" width="12" height="8" stroke="#B8965A" strokeOpacity=".4" />
        <rect x="26" y="28" width="12" height="8" stroke="#B8965A" strokeOpacity=".4" />
        <path d="M22 14v7M12 28v-7h20v7" stroke="#B8965A" strokeOpacity=".35" />
      </svg>
    ),
  },
];

const AGENTS = [
  { name: "Analyst Agent", role: s("질문을 SQL·그래프 쿼리로 바꿔 표·차트와 근거로 답합니다.", "Turns questions into SQL or graph queries and answers with tables, charts and sources."), approve: s("읽기 전용", "Read-only") },
  { name: "Modeling Agent", role: s("엔터티·관계·용어 정의 초안을 제안합니다.", "Proposes entities, relationships and term definitions."), approve: s("사람이 승인", "You approve") },
  { name: "Ingest Agent", role: s("새 소스를 연결하고 스키마 변화를 감지해 대응합니다.", "Connects new sources and handles schema changes."), approve: s("변경 시 승인", "Approve on change") },
  { name: "Monitor Agent", role: s("지표 이상치와 갱신 실패를 알리고 주간 요약을 보냅니다.", "Flags metric anomalies and sync failures; sends a weekly digest."), approve: s("알림만", "Alerts only") },
];

const READY = [
  s("이어져 있다", "Connected"),
  s("뜻이 같다", "Consistent"),
  s("글과 숫자가 된다", "Machine-readable"),
  s("안전하다", "Safe"),
  s("최신이다", "Fresh"),
  s("설명돼 있다", "Documented"),
];

const FAQ = [
  { q: s("SQL이나 데이터 모델링을 몰라도 쓸 수 있나요?", "Do I need to know SQL or data modeling?"), a: s("아니요. 어떤 저장 방식을 쓸지는 dataSimplr가 고르고, 여러분은 자연어로 묻고 제안된 정의를 확인만 하면 됩니다. 답마다 사용한 쿼리를 보여주므로 아는 분은 검증도 할 수 있습니다.", "No. dataSimplr picks the storage model; you ask in plain language and confirm suggested definitions. Every answer shows the query it used, so those who know SQL can check it.") },
  { q: s("에이전트가 제 데이터를 마음대로 바꾸나요?", "Will agents change my data on their own?"), a: s("아니요. 분석은 읽기 전용이고, 데이터나 정의를 바꾸는 작업은 사람이 승인해야 실행됩니다.", "No. Analysis is read-only, and anything that changes data or definitions runs only after a person approves it.") },
  { q: s("다른 AI 에이전트(Claude 등)와 연결할 수 있나요?", "Can I connect other AI agents, like Claude?"), a: s("출시 버전에 MCP 서버를 포함합니다. 권한 범위 안에서 외부 에이전트가 정리된 데이터를 도구로 쓸 수 있습니다.", "Yes — launch includes an MCP server, so external agents can use your organized data as a tool within the permissions you set.") },
  { q: s("개인정보는 어떻게 다루나요?", "How is personal data handled?"), a: s("적재 시 이름·연락처 같은 개인정보를 자동으로 찾아 가리고, 워크스페이스 단위로 데이터를 분리합니다.", "Personal data such as names and contacts is detected and masked on load, and each workspace is isolated.") },
  { q: s("가격은 얼마인가요?", "How much will it cost?"), a: s("베타 기간에는 무료입니다. 대기명단 등록자에게 정식 요금제를 먼저 안내합니다.", "Free during the beta. Waitlist members hear about pricing first.") },
];

export default function DataSimplrContent() {
  const { lang, t } = useLang();
  const days = useDaysLeft();
  useReveal();

  return (
    <div className="noise-bg bg-[#080808] text-[#F0EDE8] min-h-screen">
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-end px-5 md:px-16 pb-16 md:pb-20 pt-32 md:pt-40 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute top-0 right-0 w-[70vw] h-[80vh] pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(184,150,90,0.09) 0%, transparent 60%)" }} />

        <div className="relative max-w-screen-xl mx-auto w-full">
          <div className="hero-eyebrow flex flex-wrap items-center gap-3 md:gap-5 mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 text-[0.6rem] tracking-[0.25em] uppercase border border-[#B8965A]/60 text-[#B8965A] px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8965A] animate-pulse" />
              {t("2026.10.18 출시", "Launching Oct 18, 2026")}
            </span>
            {days !== null && days > 0 && (
              <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#8A8780]">D-{days}</span>
            )}
            <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#6A6A6A]">by simplyciety</span>
          </div>

          <h1 className="hero-title text-[clamp(3.8rem,12vw,12rem)] font-extralight leading-[0.9] tracking-[-0.04em] mb-8">
            data<span className="italic text-[#B8965A]">Simplr</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="hero-body lg:col-span-7">
              <p className="text-[clamp(1.5rem,3.2vw,2.75rem)] font-extralight leading-[1.25] tracking-tight mb-6">
                {t("데이터팀이 없는 팀을 위한", "The data platform for teams")}
                <br />
                <span className="text-[#B8965A]">{t("AI 데이터 플랫폼.", "without a data team.")}</span>
              </p>
              <p className="text-[#8A8780] text-base md:text-lg leading-[1.8] font-light max-w-xl">
                {t(
                  "표든 JSON이든 관계 데이터든 그대로 올리세요. dataSimplr가 RDB·NoSQL·그래프·온톨로지로 정리하고, 에이전트가 그 위에서 분석하고 일합니다.",
                  "Upload tables, JSON or relationship data as they are. dataSimplr organizes them into relational, document, graph and ontology layers — and agents analyze and work on top."
                )}
              </p>
            </div>
            <div className="hero-cta lg:col-span-5">
              <WaitlistForm variant="compact" id="waitlist-hero" />
            </div>
          </div>

          {/* model chips */}
          <div className="hero-line mt-14 pt-6 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {["RDB", "NoSQL", "Graph", "Ontology", "Agents", "MCP"].map((w, i) => (
              <span key={w} className="flex items-center gap-6">
                {i > 0 && <span className="text-[#B8965A]/40 text-xs">·</span>}
                <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#6A6A6A]">{w}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-5">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8">Why</p>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2rem,4.5vw,4rem)] font-extralight leading-[1.08] tracking-tight">
              {lang === "ko" ? (
                <>AI는 누구나 빌려 쓰는데,<br /><span className="italic text-[#B8965A]">데이터 정리는</span><br />아직 사람 몫입니다</>
              ) : (
                <>Anyone can rent AI.<br /><span className="italic text-[#B8965A]">Getting data ready</span><br />is still manual work.</>
              )}
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center gap-6">
            <p data-reveal className="text-[#A8A49E] text-base md:text-lg leading-[1.9] font-light">
              {t(
                "AI의 답이 틀리는 이유는 대부분 모델이 아니라 데이터입니다. 흩어져 있고, 부서마다 뜻이 다르고, 개인정보 때문에 넣지 못하고, 무엇이 어디 있는지 아무도 설명해두지 않았습니다.",
                "When AI gets it wrong, the cause is usually the data, not the model. It's scattered, means different things to different teams, can't be shared because of personal data, and nobody documented what lives where."
              )}
            </p>
            <p data-reveal data-reveal-delay="1" className="text-[#A8A49E] text-base md:text-lg leading-[1.9] font-light">
              {t(
                "큰 회사는 데이터 엔지니어가 이걸 해결합니다. 데이터팀이 없는 전 세계 대부분의 팀에게는 그 일을 대신할 제품이 필요합니다.",
                "Big companies hire data engineers to fix this. Most teams around the world don't have one — they need a product that does the job."
              )}
            </p>
            <div data-reveal data-reveal-delay="2" className="flex flex-wrap gap-2 pt-2">
              {READY.map((r, i) => (
                <span key={i} className="text-[0.65rem] tracking-[0.1em] px-3 py-1.5 text-[#D4D0CA]" style={{ border: "1px solid rgba(184,150,90,0.3)" }}>
                  <span className="text-[#B8965A] mr-1.5">0{i + 1}</span>
                  {r[lang]}
                </span>
              ))}
            </div>
            <p data-reveal className="text-[#6A6A6A] text-xs">
              {t("AI Ready 데이터의 여섯 조건 — dataSimplr는 이 여섯 가지를 기본값으로 채웁니다.", "Six conditions of AI-ready data — dataSimplr makes them the default.")}
            </p>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 md:py-32 px-5 md:px-16 bg-[#060606]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-14">How it works</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(255,255,255,0.06)]">
            {STEPS.map((st, i) => (
              <div key={st.k} data-reveal data-reveal-delay={String(i + 1)} className="bg-[#060606] p-8 md:p-10 flex flex-col gap-5 relative">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.6rem] tracking-[0.3em] text-[#B8965A]">0{i + 1}</span>
                  <span className="text-[0.55rem] tracking-[0.3em] uppercase text-[#5A5A5A]">{st.k}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extralight tracking-tight">{st.title[lang]}</h3>
                <p className="text-[#8A8780] text-sm leading-[1.9] font-light">{st.desc[lang]}</p>
                {i < STEPS.length - 1 && (
                  <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#B8965A] bg-[#060606] px-1" aria-hidden>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUR MODELS ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-6">
              <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8">Multi-model</p>
              <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2rem,4.5vw,4rem)] font-extralight leading-[1.08] tracking-tight">
                {lang === "ko" ? (
                  <>데이터 모양에 맞는<br /><span className="italic text-[#B8965A]">네 가지 그릇</span></>
                ) : (
                  <>Four shapes,<br /><span className="italic text-[#B8965A]">one place</span></>
                )}
              </h2>
            </div>
            <div className="md:col-span-6 flex items-end">
              <p data-reveal className="text-[#8A8780] text-sm md:text-base leading-[1.9] font-light">
                {t(
                  "어떤 DB를 써야 할지 고민하지 않아도 됩니다. 데이터마다 맞는 그릇에 담고, 네 그릇을 하나의 의미 지도로 이어서 한 번에 묻게 합니다.",
                  "No need to pick a database. Each dataset lands in the shape that fits it, and all four are tied into a single map of meaning you can query at once."
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.06)]">
            {MODELS.map((m, i) => (
              <div key={m.tag} data-reveal data-reveal-delay={String(i + 1)} className="bg-[#080808] p-8 flex flex-col gap-5 group hover:bg-[#0C0C0C] transition-colors duration-500">
                <div className="flex items-start justify-between">
                  {m.icon}
                  <span className="text-[0.55rem] tracking-[0.25em] uppercase text-[#B8965A] border border-[#B8965A]/30 px-2 py-0.5">{m.tag}</span>
                </div>
                <h3 className="text-3xl font-extralight tracking-tight group-hover:text-[#B8965A] transition-colors duration-500">{m.title[lang]}</h3>
                <p className="text-[#A8A49E] text-sm leading-[1.8] font-light flex-1">{m.when[lang]}</p>
                <p className="text-[#5A5A5A] text-[0.7rem] leading-relaxed pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>{m.from}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AGENTS ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16 bg-[#060606]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8">Agents</p>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2rem,4.5vw,4rem)] font-extralight leading-[1.08] tracking-tight mb-8">
              {lang === "ko" ? (
                <>데이터 담당자 대신,<br /><span className="italic text-[#B8965A]">에이전트 팀</span></>
              ) : (
                <>Instead of a data hire,<br /><span className="italic text-[#B8965A]">a team of agents</span></>
              )}
            </h2>
            <p data-reveal className="text-[#8A8780] text-sm md:text-base leading-[1.9] font-light mb-8">
              {t(
                "에이전트는 항상 의미 지도를 거쳐 데이터에 접근합니다. 같은 정의, 같은 권한으로 일하고 모든 답에 근거를 남깁니다. 데이터를 바꾸는 일은 사람이 승인합니다.",
                "Agents always go through the map of meaning — same definitions, same permissions — and every answer shows its sources. Anything that changes data needs a human's approval."
              )}
            </p>
            {/* chat mock */}
            <div data-reveal className="p-5 text-sm font-light" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#080808" }}>
              <p className="text-[#D4D0CA] mb-3">
                <span className="text-[#5A5A5A] mr-2">you</span>
                {t("지난달 재구매 고객이 가장 많이 산 상품 3개는?", "Top 3 products among repeat buyers last month?")}
              </p>
              <p className="text-[#A8A49E] mb-3">
                <span className="text-[#B8965A] mr-2">analyst</span>
                {t("1위 여름 에세이 세트 · 2위 리필 노트 · 3위 북커버 L", "1. Summer essay set · 2. Refill notebook · 3. Book cover L")}
              </p>
              <p className="text-[0.65rem] text-[#5A5A5A] leading-relaxed">
                {t("근거 · orders ⋈ customers (graph: BOUGHT) · 정의: 재구매 고객 = 90일 내 2회 이상 구매", "Sources · orders ⋈ customers (graph: BOUGHT) · Definition: repeat buyer = 2+ orders in 90 days")}
              </p>
              <p className="text-[0.55rem] text-[#3A3A3A] mt-3">{t("화면 예시 · 가상 데이터", "Illustrative · sample data")}</p>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col">
            {AGENTS.map((a, i) => (
              <div key={a.name} data-reveal className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-7 items-baseline" style={{ borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="sm:col-span-4 text-lg font-extralight tracking-tight">{a.name}</h3>
                <p className="sm:col-span-6 text-[#A8A49E] text-sm leading-relaxed font-light">{a.role[lang]}</p>
                <span className="sm:col-span-2 sm:text-right text-[0.55rem] tracking-[0.2em] uppercase text-[#B8965A]/80">{a.approve[lang]}</span>
              </div>
            ))}
            <div data-reveal className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-7 items-baseline" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="sm:col-span-4 text-lg font-extralight tracking-tight">
                MCP Server
              </h3>
              <p className="sm:col-span-6 text-[#A8A49E] text-sm leading-relaxed font-light">
                {t("Claude 같은 외부 에이전트가 정리된 데이터를 도구로 바로 씁니다.", "External agents such as Claude use your organized data as a tool.")}
              </p>
              <span className="sm:col-span-2 sm:text-right text-[0.55rem] tracking-[0.2em] uppercase text-[#B8965A]/80">{t("권한 범위 내", "Scoped")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOR WHOM + ORIGIN ─── */}
      <section className="py-24 md:py-32 px-5 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-14">{t("이런 팀을 위해", "Built for")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 mb-24">
            {[
              { title: s("작은 브랜드 · 커머스 · 출판 팀", "Small brands, shops & publishers"), desc: s("주문·재고·광고 데이터가 스프레드시트와 SaaS에 흩어진 5~30명 팀.", "5–30 person teams with orders, inventory and ads spread across spreadsheets and SaaS tools.") },
              { title: s("혼자인 데이터 담당자", "The only data person"), desc: s("요청은 쌓이는데 파이프라인을 짤 시간이 없는 스타트업·중견기업 담당자.", "Startup and mid-size analysts with a growing queue and no time to build pipelines.") },
              { title: s("AI 에이전트 빌더", "AI agent builders"), desc: s("에이전트는 만들었지만 사내 데이터를 연결하고 설명하는 데서 막힌 개발자.", "Developers whose agents stall at connecting and explaining company data.") },
            ].map((f, i) => (
              <div key={i} data-reveal data-reveal-delay={String(i + 1)} className="flex flex-col gap-4 pt-6" style={{ borderTop: "1px solid rgba(184,150,90,0.35)" }}>
                <h3 className="text-xl font-extralight tracking-tight leading-snug">{f.title[lang]}</h3>
                <p className="text-[#8A8780] text-sm leading-[1.9] font-light">{f.desc[lang]}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <blockquote data-reveal className="text-[clamp(1.3rem,2.8vw,2.25rem)] font-extralight leading-[1.5] tracking-tight text-[#D4D0CA]">
              {t(
                "“대형서점 데이터 조직에서 기반 → 확산 → AI → 수익화, 네 단계를 모두 지났습니다. 그때 사람 손으로 반복하던 준비 작업을, 데이터팀이 없는 어느 팀이든 쓸 수 있게 만들고 있습니다.”",
                "“At a major bookstore's data team I went through all four stages — foundation, adoption, AI, monetization. I'm turning the prep work we repeated by hand into something any team without a data team can use.”"
              )}
            </blockquote>
            <Link data-reveal href="/ceo" className="inline-flex items-center gap-3 mt-10 text-[0.65rem] tracking-[0.25em] uppercase text-[#8A8780] hover:text-[#B8965A] transition-colors">
              <span className="gold-line block w-10" />
              {t("양성열 · simplyciety 대표 →", "Sungreul Yang · Founder, simplyciety →")}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WAITLIST ─── */}
      <section id="waitlist" className="py-24 md:py-36 px-5 md:px-16 bg-[#050505] relative overflow-hidden scroll-mt-20" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom left, rgba(184,150,90,0.08) 0%, transparent 60%)" }} />
        <div className="relative max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8">Waitlist</p>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2.5rem,5.5vw,5rem)] font-extralight leading-[0.98] tracking-tight mb-8">
              {lang === "ko" ? (
                <>10월 18일,<br /><span className="italic text-[#B8965A]">먼저 써보세요.</span></>
              ) : (
                <>October 18.<br /><span className="italic text-[#B8965A]">Be first in.</span></>
              )}
            </h2>
            <ul data-reveal className="flex flex-col gap-3 text-[#A8A49E] text-sm font-light">
              {[
                s("등록 순서대로 베타 초대", "Beta invites in signup order"),
                s("베타 기간 무료", "Free during the beta"),
                s("요금제와 신규 기능 먼저 안내", "First to hear about pricing and new features"),
                s("선정된 팀은 디자인 파트너로 1:1 온보딩", "Selected teams get 1:1 onboarding as design partners"),
              ].map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#B8965A]">—</span>
                  {b[lang]}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal data-reveal-delay="1" className="lg:col-span-7">
            <WaitlistForm variant="full" id="waitlist-form" />
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 md:py-32 px-5 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-12">FAQ</p>
          <div className="flex flex-col">
            {FAQ.map((item, i) => (
              <details key={i} className="group py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none text-base md:text-lg font-light text-[#F0EDE8]">
                  {item.q[lang]}
                  <span className="text-[#B8965A] transition-transform group-open:rotate-45 text-xl">+</span>
                </summary>
                <p className="text-[#8A8780] text-sm leading-[1.9] font-light mt-4 max-w-3xl">{item.a[lang]}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-sm text-[#6A6A6A] font-light">
            {t("도입·파트너십 문의는 ", "For partnerships or enterprise questions, ")}
            <Link href="/contact?service=datasimplr" className="text-[#B8965A] hover:underline">
              {t("문의하기", "contact us")}
            </Link>
            {t("로 남겨주세요.", ".")}
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
