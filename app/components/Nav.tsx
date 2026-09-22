"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useLang } from "../contexts/LanguageContext";

const LINKS: { href: string; ko: string; en: string }[] = [
  { href: "/services", ko: "서비스", en: "Services" },
  { href: "/datasimplr", ko: "dataSimplr", en: "dataSimplr" },
  { href: "/insights", ko: "인사이트", en: "Insights" },
  { href: "/diagnosis", ko: "진단", en: "Diagnose" },
  { href: "/ceo", ko: "대표 소개", en: "Founder" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  const langToggle = (
    <div className="flex items-center gap-1">
      {(["ko", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-text-muted text-[0.55rem]">/</span>}
          <button
            onClick={() => setLang(l)}
            className="text-[0.6rem] tracking-[0.2em] uppercase transition-colors duration-200 px-1 py-1"
            style={{ color: lang === l ? "var(--ds-accent)" : "var(--ds-text-muted)" }}
            aria-pressed={lang === l}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-700"
      style={{
        background: solid ? "color-mix(in srgb, var(--ds-bg) 95%, transparent)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid ? "1px solid rgb(var(--hairline) / 0.05)" : "1px solid transparent",
      }}
    >
      <div
        className="flex items-center justify-between px-5 md:px-10 transition-all duration-700"
        style={{ paddingTop: scrolled ? "1.1rem" : "1.6rem", paddingBottom: scrolled ? "1.1rem" : "1.6rem" }}
      >
        <Link href="/" className="hover:opacity-80 transition-opacity duration-300" aria-label="simplyciety home">
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="text-[0.65rem] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-text"
                style={{ color: active ? "var(--ds-accent)" : "var(--ds-text-muted)" }}
              >
                {l[lang]}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          {langToggle}
          <Link
            href="/contact"
            className="text-[0.65rem] tracking-[0.25em] uppercase border border-accent/40 px-5 py-2.5 text-accent hover:bg-accent hover:text-bg transition-all duration-300"
          >
            {t("문의하기", "Contact")}
          </Link>
        </div>

        <button
          className="lg:hidden flex flex-col justify-center items-end gap-[5px] w-10 h-10 -mr-2"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t("메뉴 닫기", "Close menu") : t("메뉴 열기", "Open menu")}
          aria-expanded={open}
        >
          <span
            className="block h-px bg-accent transition-all duration-300"
            style={{ width: 22, transform: open ? "translateY(3px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-px bg-accent transition-all duration-300"
            style={{ width: open ? 22 : 14, transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-5 pb-8 pt-2 flex flex-col" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)} style={{ borderTop: "1px solid rgb(var(--hairline) / 0.05)" }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-4 text-lg font-extralight tracking-tight"
              style={{
                color: pathname === l.href ? "var(--ds-accent)" : "var(--ds-text)",
                borderBottom: "1px solid rgb(var(--hairline) / 0.04)",
              }}
            >
              {l[lang]}
            </Link>
          ))}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              {langToggle}
              <ThemeToggle />
            </div>
            <Link href="/contact" className="btn-gold">
              {t("문의하기 →", "Contact →")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
