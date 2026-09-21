"use client";

import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import { useReveal } from "../components/useReveal";
import { useLang } from "../contexts/LanguageContext";

type S = { ko: string; en: string };
const s = (ko: string, en: string): S => ({ ko, en });

const LINKEDIN = "https://www.linkedin.com/in/%EC%84%B1%EC%97%B4-%EC%96%91-bab2b4153/";

const IMPACT = [
  { num: "4", label: s("산업 · 금융 → 데이터·AI → 유통·문화 → 창업", "Industries · finance → data/AI → retail & culture → founder") },
  { num: "13년+", label: s("데이터 · AI 현장 (2012 —)", "Years in the field (since 2012)") },
  { num: "4", label: s("단계 · 기반 → 확산 → AI → 수익화를 모두 경험", "Stages · foundation → adoption → AI → monetization") },
  { num: "2025 —", label: s("simplyciety 대표 · dataSimplr 개발", "Founder of simplyciety · building dataSimplr") },
];

// 발표 자료의 "데이터 조직은 네 단계를 지난다"와 같은 구조
const STAGES = [
  { num: "01", name: "Foundation", title: s("기반", "Foundation"), desc: s("흩어진 데이터를 한곳에", "Bring scattered data into one place"),
    items: [s("데이터 파이프라인", "Data pipelines"), s("클라우드 DW", "Cloud DW"), s("데이터 카탈로그", "Data catalog")] },
  { num: "02", name: "Adoption", title: s("확산", "Adoption"), desc: s("현업이 직접 쓰게", "Let the business use it directly"),
    items: [s("분석·시각화 플랫폼", "Analytics & BI platform"), s("엑셀 직결 조회", "Direct query from Excel"), s("전사 교육 · 시민분석가", "Company-wide training · citizen analysts")] },
  { num: "03", name: "Intelligence", title: s("AI 적용", "Intelligence"), desc: s("반복 판단을 모델로", "Turn repeated judgment into models"),
    items: [s("수요예측", "Demand forecasting"), s("자동발주 산식", "Automated ordering"), s("상담 음성 분석 · 교차추천", "Call-voice analysis · cross-sell recs")] },
  { num: "04", name: "Monetization", title: s("수익화", "Monetization"), desc: s("데이터를 상품으로", "Turn data into a product"),
    items: [s("대안신용평가 데이터 공급", "Alternative credit data supply"), s("데이터 공급 플랫폼", "Data supply platform"), s("이종 산업 협업", "Cross-industry partnerships")] },
];

const CAREER = [
  {
    step: "4",
    period: "2025 —",
    where: s("창업", "Founding"),
    role: s("SimplyCiety 대표", "Founder & CEO, SimplyCiety"),
    current: true,
    highlights: [
      s("AI · 데이터 플랫폼(제조) 구축 프로젝트", "AI & data platform build (manufacturing)"),
      s("데이터 · AI 멘토링 · 강의", "Data & AI mentoring and lectures"),
      s("AX 컨설팅 / AI Agent 구축", "AX consulting / AI agent builds"),
      s("AI를 위한 데이터 플랫폼 dataSimplr 개발", "Building dataSimplr, the data platform for AI"),
    ],
  },
  {
    step: "3",
    period: "2022 — 2025",
    where: s("유통 · 문화", "Retail & culture"),
    role: s("데이터기술 & 분석파트 리딩", "Led data engineering & analytics"),
    current: false,
    highlights: [
      s("사내 데이터 민주화 달성", "Achieved company-wide data democratization"),
      s("데이터 파이프라인 → 수익화", "Data pipeline → monetization"),
      s("그룹 데이터 프로젝트 참여", "Contributed to group-level data projects"),
    ],
  },
  {
    step: "2",
    period: "2019 — 2021",
    where: s("데이터 · AI", "Data & AI"),
    role: s("AI 플랫폼 개발팀장", "AI platform development lead"),
    current: false,
    highlights: [
      s("데이터분석 플랫폼 개발", "Built an analytics platform"),
      s("데이터 · AI 민간 · 공공 프로젝트", "Data & AI projects for private and public clients"),
    ],
  },
  {
    step: "1",
    period: "2012 — 2017",
    where: s("금융", "Finance"),
    role: s("금융보험사 마케팅 · 인사", "Marketing & HR at an insurance firm"),
    current: false,
    highlights: [
      s("마케팅 · 인사기획", "Marketing and HR planning"),
      s("데이터 추출 · 분석", "Data extraction and analysis"),
    ],
  },
];

const TALKS = [
  {
    date: "2023",
    title: s("클라우드 데이터 파이프라인 구축 사례 발표", "Building a cloud data pipeline — conference talk"),
    venue: s("AWS Summit Seoul", "AWS Summit Seoul"),
    href: "https://www.youtube.com/watch?v=5eelypNFmN0&t=1s",
    external: true,
    label: s("영상 보기", "Watch"),
  },
  {
    date: "2024",
    title: s("데이터 조직과 AI 전환 인터뷰", "On data teams and AI transformation — interview"),
    venue: s("KMA 한국능률협회", "Korea Management Association"),
    href: "https://www.youtube.com/watch?v=Vhnr-4xO9Rw&t=720s",
    external: true,
    label: s("영상 보기", "Watch"),
  },
];

const CREDENTIALS = [
  { label: s("학력", "Education"), items: [s("경희대 사학 학사", "Kyung Hee University — B.A. History"), s("서울과학종합대학원 AI · BigData MBA", "aSSIST — AI & Big Data MBA")] },
  { label: s("자격", "Certification"), items: [s("AWS Solutions Architect", "AWS Solutions Architect")] },
  { label: s("공개 발표 · 인터뷰", "Talks & Interviews"), items: [s("AWS Summit Seoul", "AWS Summit Seoul"), s("KMA 한국능률협회", "Korea Management Association")] },
];

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="4" fill="#B8965A" opacity="0.15" />
      <path d="M7 10h2v7H7v-7zm1-3a1.1 1.1 0 110 2.2A1.1 1.1 0 018 7zm4 3h2v1h.03C14.42 10.37 15.22 10 16 10c2.21 0 3 1.49 3 3.43V17h-2v-3.17c0-.95-.35-1.6-1.18-1.6-.88 0-1.32.62-1.32 1.58V17h-2v-7z" fill="#B8965A" opacity="0.7" />
    </svg>
  );
}

export default function CeoContent() {
  const { lang, t } = useLang();
  useReveal();

  return (
    <div className="bg-[#080808] text-[#F0EDE8] min-h-screen">
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex flex-col justify-between px-5 md:px-16 pt-36 md:pt-44 pb-16 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[55vw] h-[70vh] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(184,150,90,0.06) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-screen-xl mx-auto w-full">
          <p className="hero-eyebrow text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-10 flex items-center gap-3">
            <span className="block w-6 h-px bg-[#B8965A]" />
            Founder & CEO, simplyciety
          </p>
          <h1 className="hero-title font-extralight leading-[0.95] tracking-[-0.03em]">
            <span className="block text-[clamp(3.5rem,10vw,10rem)]">{t("양성열", "Sungreul Yang")}</span>
            <span className="block text-[clamp(1.5rem,3.5vw,3rem)] mt-6 text-[#8A8780]">
              {t("AI와 데이터를 ", "Making AI & data ")}
              <span className="italic text-[#B8965A]">{t("더 쉽게.", "simpler.")}</span>
            </span>
          </h1>
        </div>

        <div className="relative max-w-screen-xl mx-auto w-full mt-16">
          <div className="hero-line mb-12">
            <span className="block h-px bg-[rgba(255,255,255,0.07)] w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-7 hero-body">
              <p className="text-[#8A8780] text-lg md:text-2xl leading-[1.7] font-extralight tracking-tight">
                {t(
                  "AI와 데이터를 기반으로 더 나은 조직과 삶을 만들도록 도움을 드리고 있습니다. 금융에서 시작해 데이터·AI 플랫폼을 만들고 유통·문화 분야 데이터 조직을 이끈 뒤, 지금은 simplyciety 대표로 AX 컨설팅과 AI 에이전트 구축, 그리고 AI를 위한 데이터 플랫폼 dataSimplr를 만들고 있습니다.",
                  "I help organizations and people work better with AI and data. Starting in finance, I built data and AI platforms, then led a data organization in retail and culture. Today, as founder of simplyciety, I do AX consulting and AI agent builds — and I'm building dataSimplr, the data platform for AI."
                )}
              </p>
            </div>
            <div className="md:col-span-5 hero-cta flex flex-col justify-end gap-5">
              <p className="text-[#5A5A5A] text-xs leading-loose font-light tracking-wide">
                AI·BigData MBA · AWS Solutions Architect
                <br />
                {t("금융 · 데이터/AI · 유통·문화 · 창업", "Finance · Data & AI · Retail & culture · Founder")}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 group">
                  <LinkedInIcon />
                  <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#5A5A5A] group-hover:text-[#B8965A] transition-colors duration-300">
                    LinkedIn ↗
                  </span>
                </a>
                <a href="mailto:yang5071@gmail.com" className="text-[0.6rem] tracking-[0.25em] uppercase text-[#5A5A5A] hover:text-[#B8965A] transition-colors">
                  yang5071@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPACT NUMBERS ─── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto px-5 md:px-16 grid grid-cols-2 md:grid-cols-4">
          {IMPACT.map((item, i) => (
            <div key={i} className="py-10 pr-4 md:px-6 md:first:pl-0">
              <p className="text-[clamp(2rem,4vw,3.5rem)] font-extralight text-[#B8965A] leading-none mb-3">{item.num}</p>
              <p className="text-[#5A5A5A] text-xs leading-relaxed">{item.label[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── NOW ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8">Now</p>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.1] tracking-tight">
              {lang === "ko" ? (
                <>지금<br /><span className="italic text-[#B8965A]">하고 있는 일</span></>
              ) : (
                <>What I&apos;m<br /><span className="italic text-[#B8965A]">working on</span></>
              )}
            </h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(255,255,255,0.05)]">
            {[
              { k: "01", title: "dataSimplr", desc: s("AI를 위한 데이터 플랫폼을 개발하고 있습니다. 흩어진 데이터를 잇고, 뜻을 맞추고, 안전하게 AI에 건넵니다.", "Building a data platform for AI — connecting scattered data, aligning definitions, and handing it to AI safely."), href: "/datasimplr", cta: s("제품 보기 →", "See the product →") },
              { k: "02", title: t("AX 컨설팅 · 구축", "AX consulting · builds"), desc: s("제조 분야 AI·데이터 플랫폼 구축을 PL로 이끌고, 기업의 AI 전환 방향을 함께 잡습니다.", "Leading an AI & data platform build in manufacturing and helping companies set their AI direction."), href: "/services", cta: s("서비스 보기 →", "See services →") },
              { k: "03", title: t("강연 · 멘토링", "Talks · mentoring"), desc: s("데이터 조직을 만들고 운영하며 겪은 일을 기업 현장과 나눕니다. 데이터·AX 멘토링과 강의를 합니다.", "Sharing what I learned building and running data teams with corporate audiences."), href: "/contact?service=lecture", cta: s("강연 요청 →", "Request a talk →") },
            ].map((n) => (
              <Link key={n.k} href={n.href} data-reveal className="group bg-[#080808] p-8 flex flex-col gap-4 hover:bg-[#0C0C0C] transition-colors">
                <span className="text-[0.6rem] tracking-[0.3em] text-[#B8965A]">{n.k}</span>
                <h3 className="text-xl font-extralight tracking-tight group-hover:text-[#B8965A] transition-colors">{n.title}</h3>
                <p className="text-[#6A6A6A] text-sm leading-[1.85] font-light flex-1">{n.desc[lang]}</p>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#B8965A]/60 group-hover:text-[#B8965A] transition-colors">{n.cta[lang]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUR STAGES ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16 bg-[#060606]" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
              <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8">Four Stages</p>
              <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.1] tracking-tight">
                {lang === "ko" ? (
                  <>데이터 조직은<br /><span className="italic text-[#B8965A]">네 단계를 지난다</span></>
                ) : (
                  <>Every data team<br /><span className="italic text-[#B8965A]">goes through four stages</span></>
                )}
              </h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p data-reveal className="text-[#6A6A6A] text-base md:text-lg leading-[1.9] font-light">
                {t(
                  "데이터 엔지니어로 입사해 네 단계를 모두 지났습니다. 조직 규모와 상관없이 순서는 같았습니다. simplyciety는 지금 이 순서 중 어디에 있는지부터 함께 봅니다.",
                  "I joined as a data engineer and went through all four. The order was the same regardless of company size. At simplyciety, we start by finding where you are in this sequence."
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.05)]">
            {STAGES.map((st, i) => (
              <div key={st.num} data-reveal data-reveal-delay={String(i + 1) as "1"} className="bg-[#060606] p-8 flex flex-col gap-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.6rem] tracking-[0.3em] text-[#B8965A]">{st.num}</span>
                  <span className="text-[0.55rem] tracking-[0.25em] uppercase text-[#4A4A4A]">{st.name}</span>
                </div>
                {/* rising bar */}
                <div className="h-16 flex items-end">
                  <div className="w-full bg-[#B8965A]" style={{ height: `${25 + i * 25}%`, opacity: 0.12 + i * 0.12 }} />
                </div>
                <div>
                  <h3 className="text-2xl font-extralight tracking-tight">{st.title[lang]}</h3>
                  <p className="text-[#8A8780] text-sm font-light mt-1">{st.desc[lang]}</p>
                </div>
                <ul className="flex flex-col gap-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {st.items.map((it, ii) => (
                    <li key={ii} className="text-[#6A6A6A] text-xs font-light flex gap-2">
                      <span className="text-[#B8965A]/50">·</span>
                      {it[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAREER ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-14">Career</p>
          <div className="flex flex-col gap-px bg-[rgba(255,255,255,0.04)]">
            {CAREER.map((c, i) => (
              <div key={i} data-reveal className="bg-[#080808] p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                <div className="md:col-span-3 flex md:flex-col gap-3 md:gap-2 items-center md:items-start">
                  <span className="text-[0.65rem] tracking-[0.15em] text-[#6A6A6A]">{c.period}</span>
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[0.7rem]"
                    style={{
                      border: `1px solid ${c.current ? "rgba(184,150,90,0.6)" : "rgba(255,255,255,0.12)"}`,
                      background: c.current ? "#B8965A" : "transparent",
                      color: c.current ? "#080808" : "#6A6A6A",
                    }}
                  >
                    {c.step}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-xl md:text-2xl font-extralight tracking-tight">
                    {c.where[lang]}
                    <span className="block md:inline text-[#6A6A6A] text-sm font-light md:ml-4 mt-1 md:mt-0">{c.role[lang]}</span>
                  </h3>
                  <ul className="flex flex-col gap-2.5 mt-5">
                    {c.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-[#B8965A]/60 flex-shrink-0 mt-[0.55rem]" />
                        <span className="text-[#7A7A7A] text-sm leading-relaxed font-light">{h[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPEAKING ─── */}
      <section id="speaking" className="py-24 md:py-36 px-5 md:px-16 bg-[#060606]" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-14 gap-6">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A]">Speaking</p>
            <Link href="/contact?service=lecture" className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6A6A6A] hover:text-[#B8965A] transition-colors">
              {t("강연 요청 →", "Request a talk →")}
            </Link>
          </div>
          <div className="flex flex-col">
            {TALKS.map((talk, i) => {
              const body = (
                <>
                  <span className="md:col-span-2 text-[0.65rem] tracking-[0.15em] text-[#6A6A6A]">{talk.date}</span>
                  <div className="md:col-span-8">
                    <p className="text-lg md:text-xl font-extralight tracking-tight leading-snug group-hover:text-[#B8965A] transition-colors">
                      {talk.title[lang]}
                    </p>
                    <p className="text-[#5A5A5A] text-xs mt-2">{talk.venue[lang]}</p>
                  </div>
                  <span className="md:col-span-2 md:text-right text-[0.6rem] tracking-[0.2em] uppercase text-[#B8965A]/60 group-hover:text-[#B8965A] transition-colors">
                    {talk.label[lang] && `${talk.label[lang]} ${talk.external ? "↗" : "→"}`}
                  </span>
                </>
              );
              const cls = "group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-baseline py-8";
              const style = { borderTop: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none", borderBottom: "1px solid rgba(255,255,255,0.06)" };
              if (!talk.href) return <div key={i} className={cls} style={style} data-reveal>{body}</div>;
              return talk.external ? (
                <a key={i} href={talk.href} target="_blank" rel="noopener noreferrer" className={cls} style={style} data-reveal>{body}</a>
              ) : (
                <Link key={i} href={talk.href} className={cls} style={style} data-reveal>{body}</Link>
              );
            })}
          </div>

          {/* Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
            {CREDENTIALS.map((cr) => (
              <div key={cr.label.en} data-reveal>
                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#5A5A5A] mb-4">{cr.label[lang]}</p>
                <ul className="flex flex-col gap-2">
                  {cr.items.map((it, ii) => (
                    <li key={ii} className="text-[#A8A49E] text-sm font-light">{it[lang]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING QUOTE ─── */}
      <section className="py-28 md:py-44 px-5 md:px-16 bg-[#050505] relative overflow-hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(184,150,90,0.04) 0%, transparent 65%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <blockquote data-reveal className="text-[clamp(1.6rem,3.5vw,3rem)] font-extralight leading-[1.35] tracking-tight text-[#D4D0CA]">
            {lang === "ko" ? (
              <>&ldquo;도구는 6개월마다 바뀌지만,<br /><em className="text-[#B8965A] not-italic">오늘부터 쌓은 데이터는 10년 간다.</em>&rdquo;</>
            ) : (
              <>&ldquo;Tools change every six months.<br /><em className="text-[#B8965A] not-italic">The data you start collecting today lasts ten years.</em>&rdquo;</>
            )}
          </blockquote>
          <div data-reveal data-reveal-delay="1" className="mt-12 flex items-center justify-center gap-5">
            <span className="gold-line block w-12" />
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#5A5A5A]">
              {t("양성열 · simplyciety 대표", "Sungreul Yang · Founder & CEO, simplyciety")}
            </span>
            <span className="gold-line block w-12" />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 md:py-44 px-5 md:px-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <h2 data-reveal className="text-[clamp(2.5rem,6vw,5.5rem)] font-extralight leading-[0.98] tracking-tight">
            {lang === "ko" ? (
              <>데이터와 AI,<br /><span className="italic text-[#B8965A]">같이 봅시다.</span></>
            ) : (
              <>Data and AI —<br /><span className="italic text-[#B8965A]">let&apos;s look together.</span></>
            )}
          </h2>
          <div data-reveal data-reveal-delay="1" className="flex flex-col gap-6">
            <p className="text-[#7A7A7A] text-base md:text-lg leading-[1.9] font-light">
              {t(
                "컨설팅, dataSimplr 얼리 액세스, 강연 요청 모두 편하게 연락 주세요. 어떤 규모든, 어떤 단계든 함께 생각해볼 수 있습니다.",
                "Consulting, dataSimplr early access, or a speaking request — reach out anytime. Whatever your size or stage, we can think it through together."
              )}
            </p>
            <div className="flex flex-col gap-4">
              <Link href="/contact" className="btn-gold self-start">{t("문의하기 →", "Get in touch →")}</Link>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 group self-start">
                <LinkedInIcon />
                <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#5A5A5A] group-hover:text-[#B8965A] transition-colors duration-300">
                  {t("LinkedIn 프로필 ↗", "LinkedIn profile ↗")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
