"use client";

import Link from "next/link";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import { useLang } from "../../contexts/LanguageContext";
import type { Post } from "../../../lib/posts";

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

export default function PostContent({ post }: { post: Post }) {
  const { lang, t } = useLang();
  const cat = CATEGORY_LABELS[post.category] ?? CATEGORY_LABELS.consulting;

  return (
    <div className="bg-[#080808] text-[#F0EDE8] font-[var(--font-geist-sans)] min-h-screen">
      <Nav />

      <article className="px-8 md:px-16 pt-40 pb-32">
        <div className="max-w-screen-xl mx-auto">

          {/* Back link */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-[0.55rem] tracking-[0.25em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors mb-16"
          >
            ← {t("인사이트 목록", "All Insights")}
          </Link>

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span
                className="text-[0.5rem] tracking-[0.2em] uppercase px-2.5 py-1"
                style={{ border: "1px solid rgba(184,150,90,0.25)", color: "#B8965A" }}
              >
                {cat[lang]}
              </span>
              <span className="text-[0.5rem] tracking-[0.15em] uppercase text-[#2A2A2A]">
                {formatDate(post.date, lang)}
              </span>
              <span className="text-[0.5rem] tracking-[0.15em] uppercase text-[#2A2A2A]">
                {t(`${post.readTime}분 읽기`, `${post.readTime} min read`)}
              </span>
            </div>

            <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-extralight leading-[1.1] tracking-tight mb-6">
              {lang === "ko" ? post.title : post.title_en}
            </h1>
            <p className="text-[#5A5A5A] text-lg font-light leading-[1.8]">
              {lang === "ko" ? post.excerpt : post.excerpt_en}
            </p>
          </div>

          {/* Divider */}
          <div className="max-w-3xl mb-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

          {/* Body */}
          <div
            className="max-w-3xl post-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* CTA */}
          <div className="max-w-3xl mt-24 pt-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#B8965A] mb-6">
              {t("다음 단계", "Next Step")}
            </p>
            <p className="text-[#5A5A5A] text-sm leading-[1.9] font-light mb-8 max-w-lg">
              {t(
                "이 글에서 다룬 문제를 직접 겪고 있다면, 무료 초기 상담에서 현황을 함께 살펴봅니다.",
                "If what you read here resonates with what you're experiencing, let's look at your situation together in a free initial consultation."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnosis" className="btn-gold inline-flex">
                {t("AI 준비도 진단 →", "Take the AI readiness check →")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex text-[0.65rem] tracking-[0.25em] uppercase px-6 py-3.5 text-[#4A4A4A] border border-[rgba(255,255,255,0.06)] hover:text-[#F0EDE8] hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
              >
                {t("바로 문의하기", "Contact us")}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
