"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const EXPERTISE = [
  { label: "Data Engineering", desc: "온프레미스·클라우드 데이터 파이프라인 설계 및 구축" },
  { label: "Cloud Architecture", desc: "AWS 기반 대규모 데이터 인프라 운영 (SAA 인증)" },
  { label: "AI / ML", desc: "수요예측, LLM 기반 STT, 생성형 AI 서비스 기획·구현" },
  { label: "Data Monetization", desc: "데이터 비즈니스 구조화 및 수익화 모델 구축" },
  { label: "Data Governance", desc: "조직 전반의 데이터 거버넌스 체계 수립 및 실행" },
  { label: "Team Leadership", desc: "기술 조직 빌딩 및 스케일업 (2명 → 18명)" },
];

const CAREER = [
  {
    period: "2026.09 —",
    company: "SK 계열사",
    role: "AI/Data 프로젝트 PMO · PL",
    desc: "SK그룹 계열사의 AI/데이터 프로젝트에 PMO(프로젝트 관리 총괄) 및 PL(프로젝트 리더)로 참여. 대규모 엔터프라이즈 AI 전환 프로젝트를 총괄 기획 및 실행 주도.",
    tags: ["AI/Data", "PMO", "PL", "Enterprise"],
    badge: "Confirmed · 2026.09",
  },
  {
    period: "2022.01 — 현재",
    company: "교보문고",
    role: "데이터인텔리전스팀 차장",
    desc: "국내 최대 도서·문구·음반 유통사. 클라우드 기반 데이터 거버넌스 구축, AI 수요예측, 데이터 비즈니스 수익화 주도.",
    tags: ["AWS", "Snowflake", "Kafka", "Streamlit", "Bedrock", "Python"],
    badge: null,
  },
  {
    period: "2019.01 — 2021.12",
    company: "데이터마케팅코리아",
    role: "AI플랫폼개발팀 팀장 (책임)",
    desc: "AI·Bigdata 기반 마케팅 분석 솔루션 자사 개발 주도. 2년간 팀 350% 성장, 솔루션 매출 300% 달성.",
    tags: ["AWS", "ElasticSearch", "Apache Airflow", "Python", "ML/DL"],
    badge: null,
  },
  {
    period: "2012.12 — 2017.07",
    company: "흥국생명",
    role: "마케팅·인사팀 주임",
    desc: "CRM 기반 마케팅 전략 수립, 영업 데이터 분석, 인사 데이터 관리 및 채용 프로세스 운영.",
    tags: ["SQL (Oracle)", "DW", "Excel", "CRM"],
    badge: null,
  },
  {
    period: "2009.03 — 2011.06",
    company: "3군단 703특공연대",
    role: "8지역대 소대장",
    desc: "조직 리더십 및 팀 운영 경험 기반 확립.",
    tags: ["Leadership", "Operations"],
    badge: null,
  },
];

const PROJECTS = [
  {
    num: "01",
    company: "교보문고",
    title: "대안신용평가 데이터 공급 시스템",
    period: "2022.07 —",
    desc: "도서 구매 이력 기반 신용평가 데이터셋 구축. 200여 개 변수 분석 후 유효 항목 선별. AWS DynamoDB·Lambda·API Gateway 기반 API 서비스화. 나이스평가정보 및 카카오뱅크에 운영 중.",
    impact: "메이저 금융사 PoC 데이터셋 구축 및 판매 프로세스 확립",
    stack: ["AWS DynamoDB", "Lambda", "API Gateway", "Snowflake", "MWAA"],
  },
  {
    num: "02",
    company: "교보문고",
    title: "AI 수요예측 시스템 (도서 MVP)",
    period: "2022.11 — 2023.04",
    desc: "신·구간 도서 판매량 예측 모델 구축. 내부 판매 데이터·외부 SNS·OpenAPI 데이터 결합. FastAPI 기반 ECS API로 사내 시스템 연동.",
    impact: "물류·재고비용 절감 및 수요 예측 체계 최초 수립",
    stack: ["Python", "FastAPI", "AWS EC2", "MWAA", "ECS", "Lambda"],
  },
  {
    num: "03",
    company: "교보문고",
    title: "클라우드 데이터 파이프라인 시스템",
    period: "2022.09 —",
    desc: "Sybase·Postgres RDBMS, BigQuery GA 데이터, 외부 소스를 통합하는 파이프라인 구축. S3·MWAA·DMS·EMR 기반으로 Snowflake DW까지 적재.",
    impact: "데이터 거버넌스 기반 마련 및 전사 데이터 분석 환경 확보",
    stack: ["AWS S3", "MWAA", "DMS", "EMR", "Snowflake", "Kafka"],
  },
  {
    num: "04",
    company: "교보문고",
    title: "VoC 고객상담음원 AI 분석",
    period: "2024.12",
    desc: "Whisper LLM 기반 STT로 고객 상담 음원 텍스트 변환. 비정형 텍스트 데이터 분석을 통한 고객 인사이트 도출.",
    impact: "비정형 데이터 분석 파이프라인 최초 구축",
    stack: ["Whisper", "LLM", "Python", "AWS"],
  },
  {
    num: "05",
    company: "데이터마케팅코리아",
    title: "오픈소스 기반 AI 빅데이터 분석 솔루션",
    period: "2019.07 — 2021.12",
    desc: "채널·키워드 기반 Digital CDJ 분석 솔루션 자사 개발 주도. 검색량·SNS Buzz·웹 데이터 수집부터 DV(디지털밸류) 지수 산출까지 전 파이프라인 구축.",
    impact: "솔루션 매출 300% 성장 / AWS 예산 $100,000 규모 R&D",
    stack: ["ElasticSearch", "Apache Airflow", "AWS", "Python", "NLP"],
  },
  {
    num: "06",
    company: "데이터마케팅코리아",
    title: "문화 빅데이터 플랫폼 구축",
    period: "2019.09 — 2021.12",
    desc: "문화관련 Buzz 데이터 수집·분석·유통 플랫폼. Apache Airflow 기반 스케줄링 시스템 구축, 공연 리뷰 데이터 NLP 연관어 추출.",
    impact: "공공기관 문화 데이터 플랫폼 운영 기반 수립",
    stack: ["Apache Airflow", "ElasticSearch", "NLP", "Python", "AWS"],
  },
];

const CREDENTIALS = [
  { label: "AWS Solutions Architect Associate", year: "2023" },
  { label: "AI.Bigdata MBA — 서울과학종합대학원", year: "2021" },
  { label: "외환관리사", year: "2012" },
  { label: "AFPK", year: "2012" },
  { label: "증권투자상담사", year: "2011" },
];

const PRESS = [
  {
    label: "AWS Summit Seoul 2023 발표",
    sub: "클라우드 기반 데이터 파이프라인 아키텍처 — 교보문고 사례",
    year: "2023",
    url: "https://www.youtube.com/watch?v=5eelypNFmN0&t=1s",
    videoId: "5eelypNFmN0",
    tag: "Conference Talk",
  },
  {
    label: "KMA 인터뷰",
    sub: "데이터 거버넌스와 조직 혁신, 그리고 AI 전환",
    year: "2024",
    url: "https://www.youtube.com/watch?v=Vhnr-4xO9Rw&t=720s",
    videoId: "Vhnr-4xO9Rw",
    tag: "Interview",
  },
];

export default function CeoPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll("[data-reveal], .gold-line").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#080808] text-[#F0EDE8] font-[var(--font-geist-sans)] min-h-screen">

      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between transition-all duration-700"
        style={{
          padding: scrolled ? "1.25rem 2.5rem" : "1.75rem 2.5rem",
          background: scrolled ? "rgba(8,8,8,0.93)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        }}
      >
        <Link
          href="/"
          className="text-xs tracking-[0.35em] uppercase font-medium text-[#6A6A6A] hover:text-[#F0EDE8] transition-colors duration-300"
        >
          ← simplyciety
        </Link>
        <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#3A3A3A]">
          CEO
        </span>
        <Link
          href="/#waitlist"
          className="hidden md:inline-flex text-[0.65rem] tracking-[0.25em] uppercase border border-[#B8965A]/40 px-5 py-2.5 text-[#B8965A] hover:bg-[#B8965A] hover:text-[#080808] transition-all duration-300"
        >
          사전등록
        </Link>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] flex flex-col justify-end px-8 md:px-16 pb-24 pt-40 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[55vw] h-[65vh] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(184,150,90,0.05) 0%, transparent 65%)",
          }}
        />

        <div className="relative max-w-screen-xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
            <div className="md:col-span-7">
              <p className="hero-eyebrow text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8 flex items-center gap-3">
                <span className="block w-6 h-px bg-[#B8965A]" />
                Founder & CEO
              </p>
              <h1 className="hero-title text-[clamp(4rem,10vw,11rem)] font-extralight leading-[0.88] tracking-[-0.03em] mb-8">
                Yang
                <br />
                <span className="italic text-[#B8965A]">Sungyeol</span>
              </h1>
              <p className="hero-body text-[#4A4A4A] text-sm tracking-[0.2em] uppercase">
                양성열 — 데이터 엔지니어링 · AI · 클라우드 아키텍처
              </p>
            </div>
            <div className="md:col-span-5 md:pb-3">
              <p className="hero-body text-[#6A6A6A] text-lg leading-[1.9] font-light">
                15년간 금융, 리테일, 스타트업을 가로지르며 데이터를 수익으로,
                복잡성을 단순함으로 바꿔온 데이터 엔지니어이자 비즈니스 빌더.
                조직이 데이터로 더 명확하게 판단하고, 더 빠르게 움직일 수 있도록 —
                그것이 simplyciety를 만든 이유입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-5 flex items-center justify-between">
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#2A2A2A]">
            15년 경력
          </span>
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#2A2A2A]">
            AWS SAA 인증
          </span>
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#2A2A2A]">
            AI.Bigdata MBA
          </span>
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#2A2A2A] hidden md:block">
            AWS Summit 2023 연사
          </span>
        </div>
      </div>

      {/* ─── EXPERTISE ─── */}
      <section
        className="py-32 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-16">
            Core Expertise
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(255,255,255,0.04)]">
            {EXPERTISE.map((item, i) => (
              <div
                key={item.label}
                data-reveal
                data-reveal-delay={String(Math.min(i + 1, 4)) as "1" | "2" | "3" | "4"}
                className="bg-[#080808] p-8 md:p-10 group hover:bg-[#0C0C0C] transition-colors duration-500"
              >
                <h3 className="text-base font-light tracking-wide text-[#F0EDE8] mb-3 group-hover:text-[#B8965A] transition-colors duration-400">
                  {item.label}
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAREER ─── */}
      <section
        className="py-32 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-16">
            Career
          </p>
          <div className="relative">
            {/* vertical line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
            <div className="flex flex-col gap-0">
              {CAREER.map((item, i) => (
                <div
                  key={item.company}
                  data-reveal
                  data-reveal-delay={String(Math.min(i + 1, 4)) as "1" | "2" | "3" | "4"}
                  className="group relative md:pl-12 py-10 md:py-12"
                  style={{
                    borderBottom:
                      i < CAREER.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  {/* dot */}
                  <div
                    className="absolute left-[-4.5px] top-12 w-2.5 h-2.5 rounded-full border border-[#B8965A]/40 bg-[#080808] hidden md:block group-hover:bg-[#B8965A] transition-colors duration-500"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16">
                    <div className="md:col-span-3">
                      <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#3A3A3A] mb-2">
                        {item.period}
                      </p>
                      <p className="text-sm font-light text-[#B8965A]">{item.company}</p>
                      <p className="text-xs text-[#4A4A4A] mt-1">{item.role}</p>
                      {item.badge && (
                        <span className="inline-flex items-center gap-1.5 mt-3 text-[0.5rem] tracking-[0.2em] uppercase border border-[#B8965A]/40 text-[#B8965A] px-2 py-1">
                          <span className="w-1 h-1 rounded-full bg-[#B8965A] animate-pulse" />
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="md:col-span-6">
                      <p className="text-[#6A6A6A] text-base leading-[1.9] font-light">
                        {item.desc}
                      </p>
                    </div>
                    <div className="md:col-span-3 flex flex-wrap gap-2 content-start">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[0.55rem] tracking-[0.2em] uppercase text-[#3A3A3A] border border-[rgba(255,255,255,0.06)] px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section
        className="py-32 px-8 md:px-16 bg-[#050505]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A]">
              Selected Projects
            </p>
            <p data-reveal className="text-[#2A2A2A] text-[0.6rem] tracking-widest uppercase hidden md:block">
              대표 프로젝트
            </p>
          </div>

          <div className="flex flex-col gap-px bg-[rgba(255,255,255,0.03)]">
            {PROJECTS.map((proj, i) => (
              <div
                key={proj.num}
                data-reveal
                data-reveal-delay={String(Math.min((i % 3) + 1, 4)) as "1" | "2" | "3" | "4"}
                className="bg-[#050505] p-8 md:p-12 group hover:bg-[#080808] transition-colors duration-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                  <div className="md:col-span-1">
                    <span className="text-[0.6rem] tracking-[0.3em] text-[#B8965A]">
                      {proj.num}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A] mb-2">
                      {proj.company} · {proj.period}
                    </p>
                    <h3 className="text-xl md:text-2xl font-extralight tracking-tight text-[#F0EDE8] group-hover:text-[#B8965A] transition-colors duration-400 leading-snug">
                      {proj.title}
                    </h3>
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-[#5A5A5A] text-sm leading-[1.9] font-light">
                      {proj.desc}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#3A3A3A] mb-3">
                      Impact
                    </p>
                    <p className="text-[#B8965A]/70 text-xs leading-relaxed mb-5">
                      {proj.impact}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((s) => (
                        <span
                          key={s}
                          className="text-[0.5rem] tracking-[0.15em] uppercase text-[#2A2A2A] border border-[rgba(255,255,255,0.05)] px-2 py-1"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CREDENTIALS + PRESS ─── */}
      <section
        className="py-32 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
          {/* Credentials */}
          <div>
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-12">
              Credentials
            </p>
            <div className="flex flex-col gap-0">
              {CREDENTIALS.map((c, i) => (
                <div
                  key={c.label}
                  data-reveal
                  data-reveal-delay={String(Math.min(i + 1, 4)) as "1" | "2" | "3" | "4"}
                  className="flex items-start justify-between py-5"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span className="text-[#6A6A6A] text-sm font-light">{c.label}</span>
                  <span className="text-[0.6rem] tracking-[0.2em] text-[#3A3A3A] flex-shrink-0 ml-4">
                    {c.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Press */}
          <div>
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-12">
              발표 · 인터뷰
            </p>
            <div className="flex flex-col gap-6">
              {PRESS.map((p, i) => (
                <div
                  key={p.label}
                  data-reveal
                  data-reveal-delay={String(i + 1) as "1" | "2"}
                  className="group border border-[rgba(255,255,255,0.06)] hover:border-[#B8965A]/30 transition-all duration-500 overflow-hidden"
                >
                  {/* YouTube thumbnail */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden"
                    style={{ aspectRatio: "16/7" }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${p.videoId}/maxresdefault.jpg`}
                      alt={p.label}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                      style={{ filter: "grayscale(30%)" }}
                    />
                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
                    {/* play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-[#B8965A]/50 flex items-center justify-center bg-[#080808]/60 group-hover:border-[#B8965A] group-hover:bg-[#B8965A]/10 transition-all duration-400">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="ml-1"
                        >
                          <polygon
                            points="5,3 19,12 5,21"
                            fill="#B8965A"
                            opacity="0.8"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* tag */}
                    <span className="absolute top-4 right-4 text-[0.5rem] tracking-[0.2em] uppercase border border-[#B8965A]/40 text-[#B8965A] px-2 py-1 bg-[#080808]/80">
                      {p.tag}
                    </span>
                  </a>
                  {/* meta */}
                  <div className="p-5 flex items-start justify-between">
                    <div>
                      <p className="text-[0.55rem] tracking-[0.25em] uppercase text-[#3A3A3A] mb-1.5">
                        {p.year}
                      </p>
                      <h4 className="text-sm font-light text-[#F0EDE8] group-hover:text-[#B8965A] transition-colors duration-400 mb-1">
                        {p.label}
                      </h4>
                      <p className="text-[#3A3A3A] text-xs">{p.sub}</p>
                    </div>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B8965A]/40 group-hover:text-[#B8965A] transition-colors text-sm flex-shrink-0 ml-4 mt-1"
                    >
                      ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING QUOTE ─── */}
      <section
        className="py-32 md:py-48 px-8 md:px-16 bg-[#050505] relative overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(184,150,90,0.035) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <blockquote
            data-reveal
            className="text-[clamp(1.6rem,3.5vw,3rem)] font-extralight leading-[1.3] tracking-tight text-[#D4D0CA]"
          >
            &ldquo;데이터는 방향이고, AI는 속도다.
            <br />
            그리고 단순함은 그 둘을 <em className="text-[#B8965A] not-italic">지속 가능하게</em> 만드는 힘이다.&rdquo;
          </blockquote>
          <div data-reveal data-reveal-delay="1" className="mt-12 flex items-center justify-center gap-4">
            <span className="gold-line block w-10" />
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#3A3A3A]">
              Yang Sungyeol — Founder & CEO, simplyciety
            </span>
            <span className="gold-line block w-10" />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="px-8 md:px-16 py-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Link
            href="/"
            className="text-[0.6rem] tracking-[0.3em] uppercase text-[#3A3A3A] hover:text-[#6A6A6A] transition-colors"
          >
            ← simplyciety
          </Link>
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#2A2A2A]">
            Less noise. More signal.
          </span>
        </div>
      </footer>
    </div>
  );
}
