"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useLang } from "../contexts/LanguageContext";

const LINKS: { href: string; ko: string; en: string }[] = [
  { href: "/services", ko: "서비스", en: "Services" },
  { href: "/datasimplr", ko: "dataSimplr", en: "dataSimplr" },
  { href: "/insights", ko: "인사이트", en: "Insights" },
  { href: "/ceo", ko: "대표 소개", en: "Founder" },
  { href: "/contact", ko: "문의하기", en: "Contact" },
];

export default function SiteFooter() {
  const { lang } = useLang();

  return (
    <footer className="px-5 md:px-16 py-12" style={{ borderTop: "1px solid rgb(var(--hairline) / 0.06)" }}>
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="flex flex-col gap-3">
          <Link href="/" className="hover:opacity-70 transition-opacity self-start">
            <Logo markColor="rgb(var(--accent-rgb) / 0.35)" textColor="var(--ds-text-muted)" />
          </Link>
          <p className="text-[0.65rem] text-text-muted tracking-wide">
            {lang === "ko" ? "대표 양성열" : "Founder & CEO Sungreul Yang"} ·{" "}
            <a href="mailto:yang5071@gmail.com" className="hover:text-text-muted transition-colors">
              yang5071@gmail.com
            </a>{" "}
            · © 2026
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.6rem] tracking-[0.25em] uppercase text-text-muted hover:text-accent transition-colors"
            >
              {l[lang]}
            </Link>
          ))}
        </div>
        <span className="text-[0.6rem] tracking-[0.35em] uppercase text-text-muted">
          Less noise. More signal.
        </span>
      </div>
    </footer>
  );
}
