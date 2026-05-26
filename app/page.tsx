"use client";

import { useEffect, useState } from "react";
import Logo from "./components/Logo";

const PILLARS = [
  {
    num: "01",
    title: "Clarity",
    desc: "AI가 조직 내 커뮤니케이션, 의사결정, 업무 흐름을 분석합니다. 복잡성이 숨어 있는 곳을 찾아내고, 명확성이 회복될 수 있는 지점을 정확히 짚어냅니다.",
  },
  {
    num: "02",
    title: "Connection",
    desc: "조직도가 아닌 실제 협업 패턴을 기반으로 — AI가 팀이 어떻게 연결되는지를 파악하고, 진짜 네트워크를 강화합니다. 더 적은 보고, 더 깊은 신뢰.",
  },
  {
    num: "03",
    title: "Impact",
    desc: "단순화된 조직은 더 빠르게 움직이고, 더 오래 유지됩니다. ROI는 추상적이지 않습니다. AI가 측정 가능한 결과로 즉시 보여줍니다.",
  },
];

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins: Math.floor((diff % 3600000) / 60000),
      secs: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const countdown = useCountdown(new Date("2026-06-01T00:00:00+09:00"));

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

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="noise-bg bg-[#080808] text-[#F0EDE8] font-[var(--font-geist-sans)]">

      {/* ─── GRAND OPENING BANNER ─── */}
      <div className="relative z-[60] bg-[#0D0D0D] border-b border-[rgba(184,150,90,0.2)]">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B8965A] animate-pulse" />
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A]">
              Grand Opening — June 1, 2026
            </span>
          </div>
          <div className="flex items-center gap-5">
            {[
              { label: "Days", val: countdown.days },
              { label: "Hrs", val: countdown.hours },
              { label: "Min", val: countdown.mins },
              { label: "Sec", val: countdown.secs },
            ].map(({ label, val }, i) => (
              <div key={label} className="flex items-center gap-5">
                <div className="text-center">
                  <span className="block text-base font-light tabular-nums text-[#F0EDE8] leading-none">
                    {pad(val)}
                  </span>
                  <span className="text-[0.5rem] tracking-[0.25em] uppercase text-[#4A4A4A] mt-0.5 block">
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <span className="text-[#3A3A3A] text-sm font-light leading-none pb-3">:</span>
                )}
              </div>
            ))}
          </div>
          <a
            href="#waitlist"
            className="text-[0.6rem] tracking-[0.25em] uppercase text-[#B8965A] hover:text-[#F0EDE8] transition-colors border-b border-[#B8965A]/40 hover:border-[#F0EDE8]/40 pb-px"
          >
            사전등록 →
          </a>
        </div>
      </div>

      {/* ─── NAVIGATION ─── */}
      <nav
        className="fixed top-[52px] inset-x-0 z-50 flex items-center justify-between transition-all duration-700"
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
          href="#waitlist"
          className="hidden md:inline-flex text-[0.65rem] tracking-[0.25em] uppercase border border-[#B8965A]/40 px-5 py-2.5 text-[#B8965A] hover:bg-[#B8965A] hover:text-[#080808] transition-all duration-300"
        >
          사전등록
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
              AI-Powered Organizational Simplification
            </p>
          </div>

          <h1 className="hero-title text-[clamp(4.5rem,13vw,16rem)] font-extralight leading-[0.88] tracking-[-0.035em] mb-14">
            <span className="block text-[#F0EDE8]">Simple</span>
            <span className="block italic text-[#B8965A]">Society.</span>
          </h1>

          <div className="hero-line mb-14">
            <span className="block h-px bg-[rgba(255,255,255,0.08)] w-full" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <p className="hero-body max-w-xl text-[#6A6A6A] text-lg leading-relaxed font-light">
              AI로 조직의 복잡성을 제거합니다. 불필요한 구조, 프로세스, 소음을 걷어내고 —
              팀과 조직이 진정으로 연결될 수 있는 본질만 남깁니다.
            </p>
            <div className="hero-cta flex items-center gap-6 flex-shrink-0">
              <a href="#philosophy" className="btn-primary">
                Our Vision
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
                복잡함은
                <br />
                정교함이 아니다.
              </h2>
              <div data-reveal data-reveal-delay="2" className="mt-12">
                <span className="gold-line block w-24" />
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-center gap-8">
              <p data-reveal className="text-[#6A6A6A] text-lg leading-[1.9] font-light">
                대부분의 조직은 무너져서가 아니라, 걷어낼 도구가 없었기 때문에
                복잡성 속에 파묻힙니다. 겹겹이 쌓인 프로세스, 불분명한 책임,
                끝없는 회의들 — 이제 그 도구가 생겼습니다.
              </p>
              <p data-reveal data-reveal-delay="1" className="text-[#6A6A6A] text-lg leading-[1.9] font-light">
                simplyciety는 AI를 활용해 조직이 실제로 작동하는 방식을 분석하고,
                구조적 안개를 걷어내어 진짜 중요한 것을 드러냅니다.
                더 적은 회의. 더 명확한 책임. 더 빠른 결정.
              </p>
              <p
                data-reveal
                data-reveal-delay="2"
                className="text-[#8A8780] text-base leading-[1.9] font-light italic border-l-2 border-[#B8965A] pl-6"
              >
                &ldquo;AI는 일을 자동화하는 것이 아니라, 하지 않아도 될 일을
                없애는 것이다.&rdquo;
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
                title: "진단",
                sub: "AI Diagnosis",
                desc: "조직의 커뮤니케이션 패턴, 의사결정 구조, 협업 흐름을 AI가 자동으로 분석합니다.",
              },
              {
                step: "Step 2",
                title: "단순화",
                sub: "AI Simplification",
                desc: "불필요한 프로세스와 보고 구조를 제거하고, 핵심 연결만 남긴 조직 청사진을 제안합니다.",
              },
              {
                step: "Step 3",
                title: "성장",
                sub: "Continuous Optimization",
                desc: "변화를 실시간으로 추적하며, AI가 지속적으로 조직을 최적화합니다.",
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
                  {pillar.desc}
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
            &ldquo;우리는 쉽게 만들려고 단순화하지 않는다. 중요한 것을{" "}
            <em className="text-[#B8965A] not-italic">
              외면할 수 없게
            </em>{" "}
            만들기 위해 단순화한다.&rdquo;
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
              {["Clarity", "AI", "Connection", "Simplification", "Impact", "Automation"].map((w) => (
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

      {/* ─── WAITLIST / PRE-LAUNCH ─── */}
      <section
        id="waitlist"
        className="py-40 md:py-56 px-8 md:px-16 relative overflow-hidden"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute bottom-0 left-0 w-[50vw] h-[50vh] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(184,150,90,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <div data-reveal className="inline-flex items-center gap-2 mb-10 border border-[#B8965A]/30 px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8965A] animate-pulse" />
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A]">
                  Grand Opening D-{countdown.days}
                </span>
              </div>
              <h2
                data-reveal
                data-reveal-delay="1"
                className="text-[clamp(3rem,7vw,7rem)] font-extralight leading-[0.95] tracking-tight"
              >
                6월 1일,
                <br />
                <span className="italic text-[#B8965A]">오픈합니다.</span>
              </h2>
              <p data-reveal data-reveal-delay="2" className="mt-8 text-[#4A4A4A] text-sm leading-relaxed">
                June 1, 2026 — Grand Opening
              </p>
            </div>

            <div data-reveal data-reveal-delay="2" className="flex flex-col gap-8 md:pt-24">
              <p className="text-[#6A6A6A] text-lg leading-[1.9] font-light">
                오픈 전 사전등록하시면 그랜드오픈 혜택과 첫 번째 소식을
                가장 먼저 받아보실 수 있습니다.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row gap-0">
                  <input
                    type="email"
                    placeholder="이메일 주소를 입력해주세요"
                    className="flex-1 bg-transparent border border-[rgba(255,255,255,0.1)] px-5 py-4 text-sm text-[#F0EDE8] placeholder:text-[#3A3A3A] outline-none focus:border-[#B8965A]/50 transition-colors duration-300 font-light tracking-wide"
                  />
                  <button
                    type="submit"
                    className="bg-[#B8965A] text-[#080808] px-8 py-4 text-[0.65rem] tracking-[0.25em] uppercase font-medium hover:bg-[#C9A96B] transition-colors duration-300 flex-shrink-0"
                  >
                    사전등록
                  </button>
                </div>
                <p className="text-[#2A2A2A] text-[0.6rem] tracking-widest uppercase">
                  스팸 없음. 언제든 해제 가능.
                </p>
              </form>
              <div
                className="flex items-center gap-8 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <a
                  href="mailto:hello@simplyciety.com"
                  className="text-[0.6rem] tracking-[0.25em] uppercase text-[#3A3A3A] hover:text-[#6A6A6A] transition-colors"
                >
                  hello@simplyciety.com
                </a>
              </div>
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
              ["Philosophy", "#philosophy"],
              ["How It Works", "#pillars"],
              ["사전등록", "#waitlist"],
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
