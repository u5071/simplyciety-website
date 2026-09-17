"use client";

import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import { useLang } from "../contexts/LanguageContext";
import type { PostMeta } from "../../lib/posts";

const CATEGORY_LABELS: Record<string, { ko: string; en: string }> = {
  consulting: { ko: "AX 컨설팅", en: "AX Consulting" },
  platform: { ko: "플랫폼 구축", en: "Platform" },
  education: { ko: "교육·문화", en: "Education" },
  culture: { ko: "조직문화", en: "Culture" },
};

function formatDate(dateStr: string, lang: "ko" | "en") {
  const d = new Date(dateStr);
  if (lang === "ko") {
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  }
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function InsightsContent({ posts }: { posts: PostMeta[] }) {
  const { lang, t } = useLang();

  return (
    <div className="bg-[#080808] text-[#F0EDE8] font-[var(--font-geist-sans)] min-h-screen">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-[55vh] flex flex-col justify-end px-8 md:px-16 pb-20 pt-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[60vh] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(184,150,90,0.04) 0%, transparent 65%)" }} />
        <div className="relative max-w-screen-xl mx-auto w-full">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8 flex items-center gap-3">
            <span className="w-6 h-px bg-[#B8965A]" />
            Insights
          </p>
          <h1 className="text-[clamp(3rem,8vw,9rem)] font-extralight leading-[0.92] tracking-[-0.03em] mb-8">
            {t("현장에서 꺼낸", "From the field,")}<br />
            <span className="italic text-[#B8965A]">{t("진짜 이야기.", "real stories.")}</span>
          </h1>
          <p className="text-[#4A4A4A] text-sm font-light tracking-wide max-w-lg">
            {t(
              "AI·데이터 전환의 현장을 직접 뛰며 얻은 인사이트. 이론이 아닌 실전의 관점에서.",
              "Insights from actually being in the field on AI and data transformations. No theory — just practice."
            )}
          </p>
        </div>
      </section>

      {/* POST LIST */}
      <section className="px-8 md:px-16 pb-32" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {posts.map((post, i) => {
              const cat = CATEGORY_LABELS[post.category] ?? CATEGORY_LABELS.consulting;
              return (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 py-10 md:py-14 hover:bg-[#0A0A0A] transition-colors duration-300 -mx-8 md:-mx-16 px-8 md:px-16"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}
                >
                  {/* Number */}
                  <div className="hidden md:flex md:col-span-1 items-start pt-1">
                    <span className="text-[0.5rem] tracking-[0.2em] text-[#2A2A2A]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className="text-[0.5rem] tracking-[0.2em] uppercase px-2.5 py-1"
                        style={{ border: "1px solid rgba(184,150,90,0.25)", color: "#B8965A" }}
                      >
                        {cat[lang]}
                      </span>
                      <span className="text-[0.5rem] tracking-[0.15em] uppercase text-[#2A2A2A]">
                        {t(`${post.readTime}분 읽기`, `${post.readTime} min read`)}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-extralight leading-[1.3] tracking-tight text-[#D4D0CA] group-hover:text-[#F0EDE8] transition-colors duration-300 mb-3">
                      {lang === "ko" ? post.title : post.title_en}
                    </h2>
                    <p className="text-[#4A4A4A] text-sm leading-[1.85] font-light line-clamp-2">
                      {lang === "ko" ? post.excerpt : post.excerpt_en}
                    </p>
                  </div>

                  {/* Date + arrow */}
                  <div className="md:col-span-3 flex md:flex-col md:items-end justify-between md:justify-start gap-4 md:pt-1">
                    <span className="text-[0.5rem] tracking-[0.2em] uppercase text-[#2A2A2A]">
                      {formatDate(post.date, lang)}
                    </span>
                    <span className="text-[#B8965A]/30 group-hover:text-[#B8965A] transition-colors duration-300 text-sm">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 md:px-16 bg-[#050505]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-4">
              {t("다음 단계", "Next Step")}
            </p>
            <h2 className="text-[clamp(2rem,4vw,4rem)] font-extralight leading-[1.0] tracking-tight">
              {t("인사이트를 내 조직에", "Put these insights")}<br />
              <span className="italic text-[#B8965A]">{t("적용하고 싶다면.", "to work.")}</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link href="/diagnosis" className="btn-gold">
              {t("AI 준비도 진단 →", "Take the AI readiness check →")}
            </Link>
            <Link
              href="/contact"
              className="text-[0.6rem] tracking-[0.25em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors text-center"
            >
              {t("또는 바로 문의하기", "Or contact us directly")}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
