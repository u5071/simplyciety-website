"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useLang } from "../contexts/LanguageContext";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, LINKEDIN_LABEL, LINKEDIN_URL, PILLARS, TAGLINE } from "../../lib/contact";

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
            <Logo textColor="var(--ds-text-secondary)" />
          </Link>
          <p className="text-[0.65rem] text-text-muted tracking-wide leading-relaxed">
            {lang === "ko" ? "대표 양성열" : "Founder & CEO Sungreul Yang"} ·{" "}
            <a href={CONTACT_PHONE_HREF} className="hover:text-accent transition-colors">{CONTACT_PHONE}</a> ·{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent transition-colors">{CONTACT_EMAIL}</a>
            <br />
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              {LINKEDIN_LABEL}
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
        <div className="flex flex-col gap-2 lg:items-end">
          <span className="text-[0.75rem] text-text-secondary">{TAGLINE[lang]}</span>
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-text-muted">{PILLARS}</span>
        </div>
      </div>
    </footer>
  );
}
