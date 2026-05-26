"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["서비스", "/services"],
  ["CEO", "/ceo"],
  ["문의하기", "/contact"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
      <Link
        href="/"
        className="text-xs tracking-[0.35em] uppercase font-medium text-[#F0EDE8] hover:text-[#B8965A] transition-colors duration-300"
      >
        simplyciety
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {LINKS.map(([label, href]) => {
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

      <Link
        href={isHome ? "#waitlist" : "/contact"}
        className="hidden md:inline-flex text-[0.65rem] tracking-[0.25em] uppercase border border-[#B8965A]/40 px-5 py-2.5 text-[#B8965A] hover:bg-[#B8965A] hover:text-[#080808] transition-all duration-300"
      >
        {isHome ? "사전등록" : "문의하기"}
      </Link>
    </nav>
  );
}
