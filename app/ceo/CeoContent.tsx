"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import { useReveal } from "../components/useReveal";
import { useLang } from "../contexts/LanguageContext";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, LINKEDIN_URL } from "../../lib/contact";

type S = { ko: string; en: string };
const s = (ko: string, en: string): S => ({ ko, en });

// 첫 화면에 나란히 보이는 직함. 검증된 것만 넣는다.
const TITLES = [
  s("simplyciety 대표", "Founder & CEO, simplyciety"),
  s("AWS Summit Seoul 연사", "AWS Summit Seoul speaker"),
  s("출판 데이터 마케팅 포럼 연사", "Publishing Data Marketing Forum speaker"),
  s("AWS Solutions Architect", "AWS Solutions Architect"),
  s("AI · BigData MBA", "AI & Big Data MBA"),
];

type Stage = {
  date: string;
  kind: S;
  title: S;
  venue: S;
  note?: S;
  href?: string;
  /** 발표·인터뷰 사진. public/ceo/ 아래에 두고 경로를 적는다. 없으면 행사명 카드로 표시된다. */
  image?: string;
};

// 전 직장 이름은 쓰지 않는다(발표 슬라이드 기준). 제목은 실제 발표 제목에서 회사명만 뺐다.
const STAGES: Stage[] = [
  {
    date: "2026.09",
    kind: s("발표", "Talk"),
    title: s("서점은 독자를 어떻게 읽는가", "How a bookstore reads its readers"),
    venue: s("2026 출판 데이터 마케팅 포럼", "2026 Publishing Data Marketing Forum"),
    note: s("주최 한국출판문화산업진흥원", "Hosted by Korea Publication Industry Promotion Agency"),
  },
  {
    date: "2024",
    kind: s("인터뷰", "Interview"),
    title: s("전통산업의 디지털 전환(DX) 성공 스토리", "A digital transformation success story in a traditional industry"),
    venue: s("KMA 한국능률협회 D-Live", "Korea Management Association · D-Live"),
    note: s("도서·출판 산업의 디지털 혁신", "Digital innovation in books & publishing"),
    href: "https://www.youtube.com/watch?v=Vhnr-4xO9Rw&t=720s",
  },
  {
    date: "2023",
    kind: s("발표", "Talk"),
    title: s("신사업 개발과 경쟁력 강화를 이끈 디지털 혁신", "Digital innovation that drove new business and competitiveness"),
    venue: s("AWS Summit Seoul 2023", "AWS Summit Seoul 2023"),
    note: s("Track 5 · 리테일 및 디지털커머스", "Track 5 · Retail & digital commerce"),
    href: "https://www.youtube.com/watch?v=5eelypNFmN0&t=1s",
  },
];

// 자문위원·심사·멘토 이력. 기관명과 직함이 확인된 것만 넣는다. 비어 있으면 섹션이 숨겨진다.
const ROLES: { period: string; org: S; role: S }[] = [];

// 직무명 대신 해낸 일. 발표 자료의 "데이터 조직은 네 단계를 지난다"와 같은 구조.
const RECORD = [
  {
    k: "01",
    word: s("데이터 민주화", "Data democratization"),
    desc: s(
      "현업이 직접 데이터를 꺼내 쓰게 했습니다. 분석·시각화 플랫폼, 엑셀 직결 조회, 전사 교육으로 시민분석가를 키웠습니다.",
      "Let the business pull its own data — an analytics platform, direct queries from Excel, and company-wide training that grew citizen analysts."
    ),
  },
  {
    k: "02",
    word: s("AI를 현업에", "AI in operations"),
    desc: s(
      "반복되는 판단을 모델로 바꿨습니다. 수요예측, 자동발주 산식, 상담 음성 분석과 교차추천.",
      "Turned repeated judgment into models — demand forecasting, automated ordering, call-voice analysis, and cross-sell recommendations."
    ),
  },
  {
    k: "03",
    word: s("데이터를 상품으로", "Data as a product"),
    desc: s(
      "쌓인 데이터를 매출로 만들었습니다. 대안신용평가 데이터 공급, 데이터 공급 플랫폼, 이종 산업 협업.",
      "Turned stored data into revenue — alternative credit data supply, a data supply platform, and cross-industry partnerships."
    ),
  },
  {
    k: "04",
    word: s("플랫폼 구축", "Platform builds"),
    desc: s(
      "AI 플랫폼 개발팀을 이끌며 민간·공공 데이터·AI 프로젝트를 수행했고, 지금은 제조 분야 AI·데이터 플랫폼 구축을 PL로 이끕니다.",
      "Led an AI platform team through private and public data & AI projects; now leading an AI & data platform build in manufacturing as PL."
    ),
  },
];

const CAREER = [
  { period: "2025 —", where: s("창업", "Founding"), role: s("simplyciety 대표", "Founder & CEO, simplyciety") },
  { period: "2022 — 2025", where: s("유통 · 문화", "Retail & culture"), role: s("데이터기술 & 분석파트 리딩", "Led data engineering & analytics") },
  { period: "2019 — 2021", where: s("데이터 · AI", "Data & AI"), role: s("AI 플랫폼 개발팀장", "AI platform development lead") },
  { period: "2012 — 2017", where: s("금융", "Finance"), role: s("금융보험사 마케팅 · 인사기획", "Marketing & HR planning at an insurance firm") },
];

const CREDENTIALS = [
  { label: s("학력", "Education"), items: [s("서울과학종합대학원 AI · BigData MBA", "aSSIST — AI & Big Data MBA"), s("경희대 사학 학사", "Kyung Hee University — B.A. History")] },
  { label: s("자격", "Certification"), items: [s("AWS Solutions Architect", "AWS Solutions Architect")] },
];

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="4" fill="var(--ds-accent)" opacity="0.15" />
      <path d="M7 10h2v7H7v-7zm1-3a1.1 1.1 0 110 2.2A1.1 1.1 0 018 7zm4 3h2v1h.03C14.42 10.37 15.22 10 16 10c2.21 0 3 1.49 3 3.43V17h-2v-3.17c0-.95-.35-1.6-1.18-1.6-.88 0-1.32.62-1.32 1.58V17h-2v-7z" fill="var(--ds-accent)" opacity="0.7" />
    </svg>
  );
}

function StageCard({ stage, lang }: { stage: Stage; lang: "ko" | "en" }) {
  const visual = stage.image ? (
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image src={stage.image} alt={`${stage.venue[lang]} — ${stage.title[lang]}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
    </div>
  ) : (
    <div className="surface-dark relative aspect-[16/10] overflow-hidden flex flex-col justify-between p-6">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgb(var(--accent-rgb) / 0.18) 0%, transparent 60%)" }} />
      <span className="relative text-[0.55rem] tracking-[0.3em] uppercase text-accent">{stage.kind[lang]}</span>
      <p className="relative text-[clamp(1.4rem,2.4vw,2rem)] font-extralight leading-[1.15] tracking-tight text-text">{stage.venue[lang]}</p>
    </div>
  );
  const body = (
    <>
      {visual}
      <div className="flex flex-col gap-3 p-6 md:p-7 flex-1">
        <div className="flex items-center justify-between gap-4 text-[0.6rem] tracking-[0.2em] uppercase">
          <span className="text-text-muted">{stage.date} · {stage.kind[lang]}</span>
          {stage.href && <span className="text-accent/70 group-hover:text-accent transition-colors">{lang === "ko" ? "영상 ↗" : "Watch ↗"}</span>}
        </div>
        <h3 className="text-lg md:text-xl font-extralight tracking-tight leading-snug group-hover:text-accent transition-colors">{stage.title[lang]}</h3>
        {stage.image && <p className="text-text-secondary text-sm font-light">{stage.venue[lang]}</p>}
        {stage.note && <p className="text-text-muted text-xs">{stage.note[lang]}</p>}
      </div>
    </>
  );
  const cls = "group bg-bg flex flex-col";
  return stage.href ? (
    <a href={stage.href} target="_blank" rel="noopener noreferrer" className={cls} data-reveal>{body}</a>
  ) : (
    <div className={cls} data-reveal>{body}</div>
  );
}

export default function CeoContent() {
  const { lang, t } = useLang();
  useReveal();

  return (
    <div className="bg-bg text-text min-h-screen">
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[88vh] flex flex-col justify-between px-5 md:px-16 pt-36 md:pt-44 pb-16 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[55vw] h-[70vh] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgb(var(--accent-rgb) / 0.06) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-screen-xl mx-auto w-full">
          <p className="hero-eyebrow text-[0.65rem] tracking-[0.4em] uppercase text-accent mb-10 flex items-center gap-3">
            <span className="block w-6 h-px bg-accent" />
            Founder & CEO, simplyciety
          </p>
          <h1 className="hero-title font-extralight leading-[0.95] tracking-[-0.03em]">
            <span className="block text-[clamp(3.5rem,10vw,10rem)]">{t("양성열", "Sungreul Yang")}</span>
            <span className="block text-[clamp(1.5rem,3.5vw,3rem)] mt-6 text-text-muted">
              {lang === "ko" ? (
                <>AI와 데이터로 비즈니스를 <span className="italic text-accent">단순하게.</span></>
              ) : (
                <>Simplifying business with <span className="italic text-accent">AI and data.</span></>
              )}
            </span>
          </h1>
        </div>

        <div className="relative max-w-screen-xl mx-auto w-full mt-16">
          <div className="hero-line mb-10">
            <span className="block h-px bg-border w-full" />
          </div>
          <ul className="hero-body flex flex-wrap gap-2 mb-10">
            {TITLES.map((ti, i) => (
              <li
                key={ti.en}
                className={`text-xs md:text-sm font-light px-3.5 py-1.5 border ${i === 0 ? "border-accent/60 text-accent" : "border-border text-text-secondary"}`}
              >
                {ti[lang]}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <p className="md:col-span-7 hero-body text-text-secondary text-lg md:text-xl leading-[1.75] font-extralight tracking-tight">
              {t(
                "13년 넘게 데이터의 기반을 깔고, 현업에 퍼뜨리고, AI를 붙이고, 데이터를 상품으로 만들었습니다. 지금은 그 순서 그대로 기업의 AI 전환을 돕고, AI를 위한 데이터 플랫폼 dataSimplr를 만듭니다.",
                "For 13+ years I've laid data foundations, spread them across the business, put AI on top, and turned data into products. Now I help companies through that same sequence — and I'm building dataSimplr, the data platform for AI."
              )}
            </p>
            <div className="md:col-span-5 hero-cta flex flex-wrap items-end md:justify-end gap-6">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 group">
                <LinkedInIcon />
                <span className="text-[0.6rem] tracking-[0.25em] uppercase text-text-muted group-hover:text-accent transition-colors duration-300">
                  LinkedIn ↗
                </span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[0.6rem] tracking-[0.25em] uppercase text-text-muted hover:text-accent transition-colors">
                {CONTACT_EMAIL}
              </a>
              <a href={CONTACT_PHONE_HREF} className="text-[0.6rem] tracking-[0.25em] uppercase text-text-muted hover:text-accent transition-colors">
                {CONTACT_PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ON STAGE ─── */}
      <section id="speaking" className="py-24 md:py-36 px-5 md:px-16 bg-surface" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)", borderBottom: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-accent mb-8">On Stage</p>
              <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.1] tracking-tight">
                {lang === "ko" ? (
                  <>현장에서 한 일을<br /><span className="italic text-accent">무대에서 나눕니다</span></>
                ) : (
                  <>What I did in the field,<br /><span className="italic text-accent">shared on stage</span></>
                )}
              </h2>
            </div>
            <Link href="/contact?service=lecture" className="btn-gold self-start md:self-end">
              {t("강연 · 인터뷰 요청 →", "Request a talk →")}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {STAGES.map((st) => (
              <StageCard key={st.title.en} stage={st} lang={lang} />
            ))}
          </div>

          {ROLES.length > 0 && (
            <div className="mt-20">
              <p data-reveal className="text-[0.6rem] tracking-[0.3em] uppercase text-text-muted mb-6">{t("자문 · 심사 · 멘토링", "Advisory · judging · mentoring")}</p>
              <ul className="flex flex-col">
                {ROLES.map((r) => (
                  <li key={r.org.en + r.role.en} data-reveal className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-5" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}>
                    <span className="md:col-span-2 text-[0.65rem] tracking-[0.15em] text-text-muted">{r.period}</span>
                    <span className="md:col-span-6 text-lg font-extralight tracking-tight">{r.org[lang]}</span>
                    <span className="md:col-span-4 text-text-secondary text-sm font-light">{r.role[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ─── TRACK RECORD ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16" style={{ borderBottom: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
              <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-accent mb-8">Track Record</p>
              <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.1] tracking-tight">
                {lang === "ko" ? (
                  <>직함보다<br /><span className="italic text-accent">해낸 일</span></>
                ) : (
                  <>Not titles —<br /><span className="italic text-accent">what got done</span></>
                )}
              </h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p data-reveal className="text-text-muted text-base md:text-lg leading-[1.9] font-light">
                {t(
                  "금융에서 시작해 데이터·AI, 유통·문화를 거쳐 창업까지. 데이터 조직이 지나는 네 단계를 모두 직접 겪었습니다.",
                  "From finance through data & AI, retail & culture, to founding — I've been through all four stages a data organization goes through."
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {RECORD.map((r, i) => (
              <div key={r.k} data-reveal data-reveal-delay={String(i + 1)} className="bg-bg p-8 flex flex-col gap-5">
                <span className="text-[0.6rem] tracking-[0.3em] text-accent">{r.k}</span>
                <h3 className="text-2xl md:text-[1.75rem] font-extralight tracking-tight leading-tight">{r.word[lang]}</h3>
                <p className="text-text-muted text-sm leading-[1.85] font-light">{r.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOW ─── */}
      <section className="py-24 md:py-36 px-5 md:px-16 bg-surface" style={{ borderBottom: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-accent mb-8">Now</p>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.1] tracking-tight">
              {lang === "ko" ? (
                <>지금<br /><span className="italic text-accent">하고 있는 일</span></>
              ) : (
                <>What I&apos;m<br /><span className="italic text-accent">working on</span></>
              )}
            </h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              { k: "01", title: "dataSimplr", desc: s("AI를 위한 데이터 플랫폼을 개발하고 있습니다. 흩어진 데이터를 잇고, 뜻을 맞추고, 안전하게 AI에 건넵니다.", "Building a data platform for AI — connecting scattered data, aligning definitions, and handing it to AI safely."), href: "/datasimplr", cta: s("제품 보기 →", "See the product →") },
              { k: "02", title: t("AX 컨설팅 · 구축", "AX consulting · builds"), desc: s("제조 분야 AI·데이터 플랫폼 구축을 PL로 이끌고, 기업의 AI 전환 방향을 함께 잡습니다.", "Leading an AI & data platform build in manufacturing and helping companies set their AI direction."), href: "/services", cta: s("서비스 보기 →", "See services →") },
              { k: "03", title: t("강연 · 멘토링", "Talks · mentoring"), desc: s("데이터 조직을 만들고 운영하며 겪은 일을 기업 현장과 나눕니다. 데이터·AX 멘토링과 강의를 합니다.", "Sharing what I learned building and running data teams with corporate audiences."), href: "/contact?service=lecture", cta: s("강연 요청 →", "Request a talk →") },
            ].map((n) => (
              <Link key={n.k} href={n.href} data-reveal className="group bg-surface p-8 flex flex-col gap-4 hover:bg-elevated transition-colors">
                <span className="text-[0.6rem] tracking-[0.3em] text-accent">{n.k}</span>
                <h3 className="text-xl font-extralight tracking-tight group-hover:text-accent transition-colors">{n.title}</h3>
                <p className="text-text-muted text-sm leading-[1.85] font-light flex-1">{n.desc[lang]}</p>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-accent/60 group-hover:text-accent transition-colors">{n.cta[lang]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING QUOTE ─── */}
      <section className="py-28 md:py-44 px-5 md:px-16 relative overflow-hidden" style={{ borderBottom: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgb(var(--accent-rgb) / 0.04) 0%, transparent 65%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <blockquote data-reveal className="text-[clamp(1.6rem,3.5vw,3rem)] font-extralight leading-[1.35] tracking-tight text-text">
            {lang === "ko" ? (
              <>&ldquo;도구는 6개월마다 바뀌지만,<br /><em className="text-accent not-italic">오늘부터 쌓은 데이터는 10년 간다.</em>&rdquo;</>
            ) : (
              <>&ldquo;Tools change every six months.<br /><em className="text-accent not-italic">The data you start collecting today lasts ten years.</em>&rdquo;</>
            )}
          </blockquote>
          <div data-reveal data-reveal-delay="1" className="mt-12 flex items-center justify-center gap-5">
            <span className="gold-line block w-12" />
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-text-muted">
              {t("양성열 · simplyciety 대표", "Sungreul Yang · Founder & CEO, simplyciety")}
            </span>
            <span className="gold-line block w-12" />
          </div>
        </div>
      </section>

      {/* ─── BACKGROUND (folded) ─── */}
      <section className="px-5 md:px-16 bg-surface" style={{ borderBottom: "1px solid rgb(var(--hairline) / 0.06)" }}>
        <details className="group max-w-screen-xl mx-auto py-10">
          <summary className="flex items-center justify-between cursor-pointer list-none text-[0.65rem] tracking-[0.3em] uppercase text-text-muted hover:text-accent transition-colors">
            {t("경력 · 학력 자세히", "Career & education")}
            <span className="text-accent text-base group-open:rotate-45">+</span>
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-10">
            <ul className="md:col-span-7 flex flex-col">
              {CAREER.map((c) => (
                <li key={c.period} className="grid grid-cols-12 gap-4 py-4" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}>
                  <span className="col-span-4 md:col-span-3 text-[0.65rem] tracking-[0.15em] text-text-muted pt-1">{c.period}</span>
                  <span className="col-span-8 md:col-span-9 text-sm font-light">
                    {c.where[lang]}
                    <span className="text-text-muted"> · {c.role[lang]}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="md:col-span-5 flex flex-col gap-8">
              {CREDENTIALS.map((cr) => (
                <div key={cr.label.en}>
                  <p className="text-[0.55rem] tracking-[0.3em] uppercase text-text-muted mb-3">{cr.label[lang]}</p>
                  <ul className="flex flex-col gap-2">
                    {cr.items.map((it) => (
                      <li key={it.en} className="text-text-secondary text-sm font-light">{it[lang]}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </details>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 md:py-44 px-5 md:px-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <h2 data-reveal className="text-[clamp(2.5rem,6vw,5.5rem)] font-extralight leading-[0.98] tracking-tight">
            {lang === "ko" ? (
              <>데이터와 AI,<br /><span className="italic text-accent">같이 봅시다.</span></>
            ) : (
              <>Data and AI —<br /><span className="italic text-accent">let&apos;s look together.</span></>
            )}
          </h2>
          <div data-reveal data-reveal-delay="1" className="flex flex-col gap-6">
            <p className="text-text-secondary text-base md:text-lg leading-[1.9] font-light">
              {t(
                "컨설팅, dataSimplr 얼리 액세스, 강연 요청 모두 편하게 연락 주세요. 어떤 규모든, 어떤 단계든 함께 생각해볼 수 있습니다.",
                "Consulting, dataSimplr early access, or a speaking request — reach out anytime. Whatever your size or stage, we can think it through together."
              )}
            </p>
            <div className="flex flex-col gap-4">
              <Link href="/contact" className="btn-gold self-start">{t("문의하기 →", "Get in touch →")}</Link>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 group self-start">
                <LinkedInIcon />
                <span className="text-[0.6rem] tracking-[0.25em] uppercase text-text-muted group-hover:text-accent transition-colors duration-300">
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
