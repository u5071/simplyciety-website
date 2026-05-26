"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

const IMPACT = [
  { num: "15+", label: "년 데이터·AI 현장 경험" },
  { num: "2→18", label: "명 기술 조직 빌딩" },
  { num: "300%", label: "솔루션 매출 성장" },
  { num: "2개사", label: "금융사 데이터 서비스 운영 중\n(카카오뱅크·나이스평가정보)" },
];

const EDUCATION = [
  {
    degree: "AI.Bigdata MBA",
    school: "서울과학종합대학원",
    period: "2019 — 2021",
    note: "석사 · AI·빅데이터 경영 전략",
  },
  {
    degree: "사학과 학사",
    school: "경희대학교",
    period: "2005 — 2009",
    note: "학사",
  },
];

const CAREER = [
  {
    period: "2026.09 —",
    where: "대기업 계열사",
    role: "AI/Data 플랫폼 구축 전문 지원 · PL",
    badge: "Upcoming",
    highlights: [
      "AI·데이터 전문성 기반으로 플랫폼 아키텍처 수립 및 기술 방향성 지원",
      "PL로서 이해관계자 조율·산출물·일정 관리 총괄",
    ],
    videos: [],
  },
  {
    period: "2022 — 현재",
    where: "교보문고",
    role: "데이터인텔리전스팀 차장",
    badge: null,
    highlights: [
      "AWS·Snowflake 데이터 파이프라인 구축 · AI 수요예측·LLM VoC 분석 도입",
      "카카오뱅크·나이스평가정보 대안신용평가 API 운영 — 대외 데이터 비즈니스 구조 설계",
      "데이터 조직 2 → 18명 확장 · AWS Summit 2023 발표",
    ],
    videos: [
      {
        label: "AWS Summit Seoul 2023 — 교보문고 사례 발표",
        desc: "클라우드 기반 데이터 파이프라인 아키텍처 구축 실전 사례",
        year: "2023",
        tag: "Conference Talk",
        videoId: "5eelypNFmN0",
        url: "https://www.youtube.com/watch?v=5eelypNFmN0&t=1s",
      },
      {
        label: "KMA 인터뷰 — 데이터 조직과 AI 전환",
        desc: "데이터 조직 빌딩·AI 거버넌스·실질적 데이터 활용에 대해",
        year: "2024",
        tag: "Interview",
        videoId: "Vhnr-4xO9Rw",
        url: "https://www.youtube.com/watch?v=Vhnr-4xO9Rw&t=720s",
      },
    ],
  },
  {
    period: "2019 — 2021",
    where: "데이터마케팅코리아",
    role: "엔지니어링 팀장 (책임)",
    badge: null,
    highlights: [
      "AI 빅데이터 분석 솔루션 자사 개발 주도 — ElasticSearch·Airflow·AWS 전 파이프라인 구축",
      "엔지니어링팀 신설 · 개발 인력 350%↑ · 솔루션 매출 300%↑ · AWS R&D $100K 집행",
    ],
    videos: [],
  },
  {
    period: "2012 — 2017",
    where: "흥국생명",
    role: "마케팅·인사팀 주임",
    badge: null,
    highlights: [
      "Oracle SQL 기반 CRM 분석·DW 영업실적 보고 체계 구축",
      "수시채용 시스템 구축 · Junior Board로 조직문화 개선안 임원진 직접 제안",
    ],
    videos: [],
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
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        }),
      { threshold: 0.07, rootMargin: "0px 0px -50px 0px" }
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
        <Link href="/" className="inline-flex items-center gap-2 group hover:opacity-80 transition-opacity duration-300">
          <span className="text-[#3A3A3A] group-hover:text-[#6A6A6A] transition-colors text-xs">←</span>
          <Logo markColor="rgba(184,150,90,0.6)" textColor="#6A6A6A" />
        </Link>
        <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#2A2A2A]">Founder</span>
        <Link
          href="/#waitlist"
          className="hidden md:inline-flex text-[0.65rem] tracking-[0.25em] uppercase border border-[#B8965A]/40 px-5 py-2.5 text-[#B8965A] hover:bg-[#B8965A] hover:text-[#080808] transition-all duration-300"
        >
          사전등록
        </Link>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-between px-8 md:px-16 pt-40 pb-16 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[55vw] h-[70vh] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(184,150,90,0.05) 0%, transparent 65%)" }}
        />

        <div className="relative max-w-screen-xl mx-auto w-full">
          <p className="hero-eyebrow text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-10 flex items-center gap-3">
            <span className="block w-6 h-px bg-[#B8965A]" />
            Founder & CEO, simplyciety
          </p>
          <h1 className="hero-title text-[clamp(4.5rem,11vw,13rem)] font-extralight leading-[0.88] tracking-[-0.03em]">
            Mr.<br />
            <span className="italic text-[#B8965A]">Simpler</span>
          </h1>
        </div>

        <div className="relative max-w-screen-xl mx-auto w-full">
          <div className="hero-line mb-12">
            <span className="block h-px bg-[rgba(255,255,255,0.07)] w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 hero-body">
              <p className="text-[#6A6A6A] text-xl md:text-2xl leading-[1.7] font-extralight tracking-tight">
                데이터 엔지니어로 시작해, 팀을 키우고, 비즈니스를 만들었습니다.
                그 과정에서 깨달은 것 — 조직은 복잡해지려는 관성이 있고,
                그것을 걷어내는 데 AI가 답이 될 수 있다는 것.
              </p>
            </div>
            <div className="md:col-span-5 hero-cta flex flex-col justify-end gap-4">
              <p className="text-[#3A3A3A] text-xs leading-loose font-light tracking-wide">
                AI.Bigdata MBA · AWS SAA Certified<br />
                교보문고 · 데이터마케팅코리아 · 대기업계열사(예정)
              </p>
              <a
                href="https://www.linkedin.com/in/%EC%84%B1%EC%97%B4-%EC%96%91-bab2b4153/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 self-start group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#B8965A" opacity="0.15" />
                  <path d="M7 10h2v7H7v-7zm1-3a1.1 1.1 0 110 2.2A1.1 1.1 0 018 7zm4 3h2v1h.03C14.42 10.37 15.22 10 16 10c2.21 0 3 1.49 3 3.43V17h-2v-3.17c0-.95-.35-1.6-1.18-1.6-.88 0-1.32.62-1.32 1.58V17h-2v-7z" fill="#B8965A" opacity="0.7"/>
                </svg>
                <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#3A3A3A] group-hover:text-[#B8965A] transition-colors duration-300">
                  LinkedIn ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPACT NUMBERS ─── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(255,255,255,0.04)]">
          {IMPACT.map((item) => (
            <div key={item.num} className="py-10 px-6 first:pl-0 last:pr-0">
              <p className="text-[clamp(2rem,4vw,3.5rem)] font-extralight text-[#B8965A] leading-none mb-2">
                {item.num}
              </p>
              <p className="text-[#4A4A4A] text-xs leading-relaxed whitespace-pre-line">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── WHY SIMPLYCIETY ─── */}
      <section
        className="py-36 md:py-52 px-8 md:px-16"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          <div className="md:col-span-4">
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-10">
              Why simplyciety
            </p>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2rem,4vw,3.5rem)] font-extralight leading-[1.1] tracking-tight">
              데이터가 있어도<br />
              <span className="italic text-[#B8965A]">움직이지 못하는</span><br />
              조직들
            </h2>
          </div>
          <div className="md:col-span-8 flex flex-col justify-center gap-9">
            <p data-reveal className="text-[#6A6A6A] text-lg leading-[2] font-light">
              교보문고에서 데이터 파이프라인을 구축하고, 팀을 18명으로 키우고,
              금융사와 데이터 비즈니스를 만들면서 — 저는 항상 같은 장면을 봤습니다.
              데이터는 있는데, 조직이 그것으로 판단하지 못하는 상황.
            </p>
            <p data-reveal data-reveal-delay="1" className="text-[#6A6A6A] text-lg leading-[2] font-light">
              문제는 기술이 아니었습니다. 구조였습니다. 너무 많은 보고 단계,
              불명확한 책임 소재, 데이터를 보는 언어가 팀마다 달랐습니다.
              AI를 도입해도 그 위에 복잡성이 쌓이면 결국 같은 결과였습니다.
            </p>
            <p data-reveal data-reveal-delay="2" className="text-[#6A6A6A] text-lg leading-[2] font-light">
              simplyciety는 그 문제를 푸는 회사입니다.
              AI로 조직의 복잡성을 진단하고, 걷어내고, 판단이 빠른 구조를 만드는 것.
              기술을 파는 게 아니라, 단순함을 설계합니다.
            </p>
            <div data-reveal data-reveal-delay="3" className="mt-2">
              <span className="gold-line block w-16" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section
        className="py-20 px-8 md:px-16 bg-[#060606]"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-12">
            Education
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.03)]">
            {EDUCATION.map((edu, i) => (
              <div
                key={edu.school}
                data-reveal
                data-reveal-delay={String(i + 1) as "1" | "2"}
                className="bg-[#060606] p-8 md:p-10 flex flex-col gap-3 group hover:bg-[#0A0A0A] transition-colors duration-500"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[0.55rem] tracking-[0.25em] uppercase text-[#2A2A2A]">{edu.period}</span>
                  <span className="text-[0.5rem] tracking-[0.2em] uppercase border border-[rgba(255,255,255,0.06)] text-[#3A3A3A] px-2 py-1">{edu.note}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extralight tracking-tight text-[#F0EDE8] group-hover:text-[#B8965A] transition-colors duration-400">
                  {edu.degree}
                </h3>
                <p className="text-[#4A4A4A] text-sm">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAREER ─── */}
      <section
        className="py-32 px-8 md:px-16"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-16">
            Career
          </p>

          <div className="flex flex-col gap-px bg-[rgba(255,255,255,0.03)]">
            {CAREER.map((c, i) => (
              <div
                key={c.where}
                data-reveal
                data-reveal-delay={String(Math.min(i + 1, 4)) as "1" | "2" | "3" | "4"}
                className="bg-[#080808] p-8 md:p-12"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 mb-8">
                  <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#2A2A2A] w-32 flex-shrink-0">
                    {c.period}
                  </span>
                  <div className="flex items-center gap-4 flex-1">
                    <h3 className="text-xl md:text-2xl font-extralight tracking-tight text-[#F0EDE8]">
                      {c.where}
                    </h3>
                    <span className="text-[#4A4A4A] text-sm font-light hidden md:inline">—</span>
                    <span className="text-[#4A4A4A] text-sm font-light hidden md:inline">{c.role}</span>
                  </div>
                  {c.badge && (
                    <span className="inline-flex items-center gap-1.5 text-[0.5rem] tracking-[0.2em] uppercase border border-[#B8965A]/40 text-[#B8965A] px-2.5 py-1 flex-shrink-0">
                      <span className="w-1 h-1 rounded-full bg-[#B8965A] animate-pulse" />
                      {c.badge}
                    </span>
                  )}
                </div>
                <p className="text-[#3A3A3A] text-xs font-light mb-8 md:hidden">{c.role}</p>

                {/* Highlights */}
                <ul className="flex flex-col gap-3">
                  {c.highlights.map((h, hi) => (
                    <li key={hi} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-[#B8965A]/50 flex-shrink-0 mt-[0.45rem]" />
                      <span className="text-[#5A5A5A] text-sm leading-relaxed font-light">{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Videos (Kyobo only) */}
                {c.videos.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.03)]">
                    {c.videos.map((v) => (
                      <div
                        key={v.videoId}
                        className="group bg-[#080808] hover:bg-[#0C0C0C] transition-colors duration-500"
                      >
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative block overflow-hidden"
                          style={{ aspectRatio: "16/7" }}
                        >
                          <img
                            src={`https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg`}
                            alt={v.label}
                            className="w-full h-full object-cover opacity-30 group-hover:opacity-50 scale-105 group-hover:scale-100"
                            style={{
                              filter: "grayscale(20%)",
                              transition: "opacity 0.6s ease, transform 0.8s ease",
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full border border-[#B8965A]/40 flex items-center justify-center bg-[#080808]/70 group-hover:border-[#B8965A] group-hover:scale-110 transition-all duration-400">
                              <svg width="14" height="14" viewBox="0 0 24 24" className="ml-1">
                                <polygon points="5,3 19,12 5,21" fill="#B8965A" opacity="0.85" />
                              </svg>
                            </div>
                          </div>
                          <span className="absolute top-3 left-3 text-[0.45rem] tracking-[0.2em] uppercase border border-[#B8965A]/40 text-[#B8965A] px-2 py-0.5 bg-[#080808]/80">
                            {v.tag} · {v.year}
                          </span>
                        </a>
                        <div className="px-5 py-4 flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-light text-[#6A6A6A] group-hover:text-[#B8965A] transition-colors duration-400 mb-1 leading-snug">
                              {v.label}
                            </p>
                            <p className="text-[#2A2A2A] text-[0.6rem] leading-relaxed">{v.desc}</p>
                          </div>
                          <a
                            href={v.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B8965A]/30 group-hover:text-[#B8965A] transition-colors flex-shrink-0 text-xs mt-0.5"
                          >
                            ↗
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING QUOTE ─── */}
      <section
        className="py-36 md:py-48 px-8 md:px-16 bg-[#050505] relative overflow-hidden"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(184,150,90,0.04) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <blockquote
            data-reveal
            className="text-[clamp(1.6rem,3.5vw,3rem)] font-extralight leading-[1.35] tracking-tight text-[#D4D0CA]"
          >
            &ldquo;데이터는 방향이고, AI는 속도다.
            <br />
            단순함은 그 둘을{" "}
            <em className="text-[#B8965A] not-italic">지속 가능하게</em>{" "}
            만드는 힘이다.&rdquo;
          </blockquote>
          <div data-reveal data-reveal-delay="1" className="mt-12 flex items-center justify-center gap-5">
            <span className="gold-line block w-12" />
            <span className="text-[0.55rem] tracking-[0.3em] uppercase text-[#3A3A3A]">
              Mr. Simpler · Founder & CEO, simplyciety
            </span>
            <span className="gold-line block w-12" />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-40 md:py-52 px-8 md:px-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8">대화합시다</p>
            <h2 data-reveal data-reveal-delay="1" className="text-[clamp(2.5rem,6vw,6rem)] font-extralight leading-[0.95] tracking-tight">
              조직의 복잡성,<br />
              <span className="italic text-[#B8965A]">같이 봅시다.</span>
            </h2>
          </div>
          <div data-reveal data-reveal-delay="2" className="flex flex-col gap-6">
            <p className="text-[#5A5A5A] text-lg leading-[1.9] font-light">
              어떤 규모든, 어떤 단계든 — 데이터와 AI로 조직을 단순화하는 문제라면
              함께 생각해볼 수 있습니다.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@simplyciety.com" className="btn-gold self-start">
                hello@simplyciety.com →
              </a>
              <a
                href="https://www.linkedin.com/in/%EC%84%B1%EC%97%B4-%EC%96%91-bab2b4153/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 group self-start"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#B8965A" opacity="0.12" />
                  <path d="M7 10h2v7H7v-7zm1-3a1.1 1.1 0 110 2.2A1.1 1.1 0 018 7zm4 3h2v1h.03C14.42 10.37 15.22 10 16 10c2.21 0 3 1.49 3 3.43V17h-2v-3.17c0-.95-.35-1.6-1.18-1.6-.88 0-1.32.62-1.32 1.58V17h-2v-7z" fill="#B8965A" opacity="0.6"/>
                </svg>
                <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#3A3A3A] group-hover:text-[#B8965A] transition-colors duration-300">
                  LinkedIn 프로필 보기 ↗
                </span>
              </a>
              <Link href="/#waitlist" className="text-[0.6rem] tracking-[0.25em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors">
                또는 6/1 오픈 사전등록 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-8 md:px-16 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity">
            <span className="text-[#2A2A2A] text-xs">←</span>
            <Logo markColor="rgba(184,150,90,0.25)" textColor="#2A2A2A" />
          </Link>
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#1A1A1A]">
            Mr. Simpler · Founder & CEO
          </span>
          <a
            href="https://www.linkedin.com/in/%EC%84%B1%EC%97%B4-%EC%96%91-bab2b4153/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#B8965A" opacity="0.1" />
              <path d="M7 10h2v7H7v-7zm1-3a1.1 1.1 0 110 2.2A1.1 1.1 0 018 7zm4 3h2v1h.03C14.42 10.37 15.22 10 16 10c2.21 0 3 1.49 3 3.43V17h-2v-3.17c0-.95-.35-1.6-1.18-1.6-.88 0-1.32.62-1.32 1.58V17h-2v-7z" fill="#B8965A" opacity="0.5"/>
            </svg>
            <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#2A2A2A] group-hover:text-[#B8965A] transition-colors duration-300">
              LinkedIn
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
