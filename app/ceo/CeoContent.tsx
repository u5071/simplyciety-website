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
  { num: "4", label: s("산업 · 금융 → 데이터·AI → 유통 → 창업", "Industries · finance → data/AI → retail → founder") },
  { num: "2→18", label: s("명 데이터 조직 빌딩", "Data team scaled") },
  { num: "300%", label: s("데이터 솔루션 매출 성장", "Data solution revenue growth") },
  { num: "4", label: s("단계 · 기반 → 확산 → AI → 수익화를 모두 경험", "Stages · foundation → adoption → AI → monetization") },
];

// 발표 자료의 "데이터 조직은 네 단계를 지난다"와 같은 구조
const STAGES = [
  { num: "01", name: "Foundation", title: s("기반", "Foundation"), desc: s("흩어진 데이터를 한곳에", "Bring scattered data into one place"),
    items: [s("데이터 파이프라인", "Data pipelines"), s("클라우드 DW", "Cloud DW"), s("데이터 카탈로그", "Data catalog")] },
  { num: "02", name: "Adoption", title: s("확산", "Adoption"), desc: s("현업이 직접 쓰게", "Let the business use it directly"),
    items: [s("분석·시각화 플랫폼", "Analytics & BI platform"), s("엑셀 직결 조회", "Direct query from Excel"), s("전사 교육 · 시민분석가", "Company-wide training · citizen analysts")] },
  { num: "03", name: "Intelligence", title: s("AI 적용", "Intelligence"), desc: s("반복 판단을 모델로", "Turn repeated judgment into models"),
    items: [s("도서 수요예측", "Book demand forecasting"), s("자동발주 산식", "Automated ordering"), s("상담 음성 분석 · 교차추천", "Call-voice analysis · cross-sell recs")] },
  { num: "04", name: "Monetization", title: s("수익화", "Monetization"), desc: s("데이터를 상품으로", "Turn data into a product"),
    items: [s("대안신용평가 데이터 공급", "Alternative credit data supply"), s("데이터 공급 플랫폼", "Data supply platform"), s("이종 산업 협업", "Cross-industry partnerships")] },
];

const CAREER = [
  {
    period: "2025 —",
    where: s("simplyciety", "simplyciety"),
    role: s("대표 (Founder & CEO)", "Founder & CEO"),
    tag: s("창업", "Founder"),
    current: true,
    highlights: [
      s("AI를 위한 데이터 플랫폼 dataSimplr 개발 중 — 흩어진 데이터를 AI가 바로 쓸 수 있는 형태로 정리", "Building dataSimplr, a data platform for AI — turning scattered data into something AI can use right away"),
      s("제조 분야 AI·데이터 플랫폼 구축 프로젝트 · PL — 아키텍처 수립과 기술 방향 지원", "AI & data platform project in manufacturing · Project Lead — architecture and technical direction"),
      s("데이터·AX 멘토링과 강의 · 기업 AX 컨설팅", "Data & AX mentoring and lectures · corporate AX consulting"),
    ],
  },
  {
    period: "2022 — 2025",
    where: s("교보문고", "Kyobo Book Centre"),
    role: s("데이터기술 & 분석파트 리딩 · 데이터인텔리전스팀", "Led Data Engineering & Analytics · Data Intelligence Team"),
    tag: s("유통", "Retail"),
    current: false,
    highlights: [
      s("데이터 엔지니어로 입사해 기반 → 확산 → AI → 수익화 네 단계를 모두 이끎", "Joined as a data engineer and led all four stages — foundation, adoption, AI, monetization"),
      s("AWS 기반 데이터 파이프라인 · 사내 데이터 민주화 (조회 한 시간 → 엑셀에서 즉시)", "AWS data pipelines · company-wide data democratization (an hour-long query → instant, in Excel)"),
      s("도서 수요예측 · 상담 음성 분석 · 인터넷은행 대안신용평가 데이터 공급", "Book demand forecasting · call-voice analytics · alternative credit data for an internet bank"),
      s("데이터 조직 2 → 18명 확장", "Scaled the data team from 2 to 18"),
    ],
  },
  {
    period: "2019 — 2021",
    where: s("데이터마케팅코리아", "Data Marketing Korea"),
    role: s("AI 플랫폼 개발팀장", "AI Platform Development Lead"),
    tag: s("데이터 · AI", "Data · AI"),
    current: false,
    highlights: [
      s("데이터 분석 플랫폼 자체 개발 주도 — ElasticSearch · Airflow · AWS 전 구간 파이프라인", "Led in-house analytics platform — end-to-end ElasticSearch · Airflow · AWS pipeline"),
      s("데이터·AI 민간·공공 프로젝트 · 엔지니어링팀 신설, 솔루션 매출 300%↑", "Private & public data/AI projects · founded the engineering team, solution revenue +300%"),
    ],
  },
  {
    period: "2012 — 2017",
    where: s("흥국생명", "Heungkuk Life Insurance"),
    role: s("마케팅 · 인사기획", "Marketing · HR Planning"),
    tag: s("금융", "Finance"),
    current: false,
    highlights: [
      s("데이터 추출·분석 기반 CRM · 영업실적 보고 체계", "Data extraction & analysis for CRM and sales reporting"),
      s("그룹 데이터 프로젝트 참여 · 수시채용 체계 구축", "Group data project · built a rolling-recruitment system"),
    ],
  },
];

const TALKS = [
  {
    date: "2026.09.18",
    title: s("서점은 독자를 어떻게 읽는가 — 대형서점의 데이터·AI 활용 전략", "How Bookstores Read Their Readers — Data & AI Strategy at a Major Bookstore"),
    venue: s("2026 출판 데이터 마케팅 포럼 · 한국출판문화산업진흥원", "2026 Publishing Data Marketing Forum · KPIPA"),
    href: "/forum",
    external: false,
    label: s("발표 자료 보기", "Talk resources"),
  },
  {
    date: "2024",
    title: s("KMA 인터뷰 — 데이터 조직과 AI 전환", "KMA Interview — Data Teams & AI Transformation"),
    venue: s("KMA 한국능률협회", "Korea Management Association"),
    href: "https://www.youtube.com/watch?v=Vhnr-4xO9Rw&t=720s",
    external: true,
    label: s("영상 보기", "Watch"),
  },
  {
    date: "2023",
    title: s("교보문고 클라우드 데이터 파이프라인 구축 사례", "Kyobo Book Centre — Cloud Data Pipeline Case Study"),
    venue: s("AWS Summit Seoul 2023", "AWS Summit Seoul 2023"),
    href: "https://www.youtube.com/watch?v=5eelypNFmN0&t=1s",
    external: true,
    label: s("영상 보기", "Watch"),
  },
];

const CREDENTIALS = [
  { label: s("학력", "Education"), items: [s("서울과학종합대학원 AI·BigData MBA", "aSSIST — AI & Big Data MBA"), s("경희대학교 사학 학사", "Kyung Hee University — B.A. History")] },
  { label: s("자격", "Certification"), items: [s("AWS Solutions Architect", "AWS Solutions Architect")] },
  { label: s("공개 발표 · 인터뷰", "Talks & Interviews"), items: [s("2026 출판 데이터 마케팅 포럼", "2026 Publishing Data Marketing Forum"), s("AWS Summit Seoul", "AWS Summit Seoul"), s("KMA 한국능률협회", "Korea Management Association")] },
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
                  "금융사 마케팅에서 시작해, 데이터 엔지니어로 플랫폼을 만들고, 대형서점의 데이터 조직을 이끌었습니다. 지금은 simplyciety 대표로서 AI와 데이터를 기반으로 더 나은 조직과 삶을 만들도록 돕고, AI를 위한 데이터 플랫폼 dataSimplr를 만들고 있습니다.",
                  "I started in marketing at a financial firm, built platforms as a data engineer, and led the data organization at a major Korean bookstore. Today, as founder of simplyciety, I help organizations work better with AI and data — and I'm building dataSimplr, a data platform for AI."
                )}
              </p>
            </div>
            <div className="md:col-span-5 hero-cta flex flex-col justify-end gap-5">
              <p className="text-[#5A5A5A] text-xs leading-loose font-light tracking-wide">
                AI·BigData MBA · AWS Solutions Architect
                <br />
                {t("흥국생명 · 데이터마케팅코리아 · 교보문고 · simplyciety", "Heungkuk Life · Data Marketing Korea · Kyobo Book Centre · simplyciety")}
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
              { k: "03", title: t("강연 · 멘토링", "Talks · mentoring"), desc: s("서점 데이터 조직에서 겪은 일을 출판·유통·기업 현장과 나눕니다. 데이터·AX 멘토링과 강의를 합니다.", "Sharing what I learned in a bookstore data team with publishing, retail and corporate audiences."), href: "/contact?service=lecture", cta: s("강연 요청 →", "Request a talk →") },
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
                    className="inline-flex items-center gap-1.5 text-[0.55rem] tracking-[0.2em] uppercase px-2 py-0.5 border"
                    style={{
                      borderColor: c.current ? "rgba(184,150,90,0.5)" : "rgba(255,255,255,0.08)",
                      color: c.current ? "#B8965A" : "#5A5A5A",
                    }}
                  >
                    {c.current && <span className="w-1 h-1 rounded-full bg-[#B8965A] animate-pulse" />}
                    {c.tag[lang]}
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
                    {talk.label[lang]} {talk.external ? "↗" : "→"}
                  </span>
                </>
              );
              const cls = "group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-baseline py-8";
              const style = { borderTop: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none", borderBottom: "1px solid rgba(255,255,255,0.06)" };
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
