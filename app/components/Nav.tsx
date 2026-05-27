"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useLang } from "../contexts/LanguageContext";

const LINKS_KO = [["서비스", "/services"], ["CEO", "/ceo"], ["문의하기", "/contact"]];
const LINKS_EN = [["Services", "/services"], ["CEO", "/ceo"], ["Contact", "/contact"]];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between transition-all duration-700"
      style={{
        padding: scrolled ? "1.25rem 2.5rem" : "1.75rem 2.5rem",
        background: scrolled ? "rgba(8,8,8,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.05)"
          : "1px solid transparent",
      }}
    >
      <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
        <Logo />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {(lang === "ko" ? LINKS_KO : LINKS_EN).map(([label, href]) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="text-[0.65rem] tracking-[0.25em] uppercase transition-colors duration-300"
              style={{ color: active ? "#B8965A" : "#6A6A6A" }}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-5">
        {/* Language toggle */}
        <div className="flex items-center gap-1">
          {(["ko", "en"] as const).map((l, i) => (
            <span key={l} className="flex items-center gap-1">
              {i > 0 && <span className="text-[#2A2A2A] text-[0.5rem]">/</span>}
              <button
                onClick={() => setLang(l)}
                className="text-[0.5rem] tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ color: lang === l ? "#B8965A" : "#3A3A3A" }}
              >
                {l.toUpperCase()}
              </button>
            </span>
          ))}
        </div>
        <Link
          href="/contact"
          className="text-[0.65rem] tracking-[0.25em] uppercase border border-[#B8965A]/40 px-5 py-2.5 text-[#B8965A] hover:bg-[#B8965A] hover:text-[#080808] transition-all duration-300"
        >
          {t("문의하기", "Contact")}
        </Link>
      </div>
    </nav>
  );
}
