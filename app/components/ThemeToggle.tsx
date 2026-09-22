"use client";

import { useLang } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

/** Cycles dark → light → system. Shows the theme currently in effect. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, resolved, setTheme } = useTheme();
  const { t } = useLang();

  const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
  const labels = {
    dark: t("어두운 테마", "Dark theme"),
    light: t("밝은 테마", "Light theme"),
    system: t("시스템 설정 따름", "Follows your system"),
  } as const;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={`inline-flex items-center gap-1.5 p-1.5 text-text-muted hover:text-accent transition-colors ${className}`}
      title={`${labels[theme]} → ${labels[next]}`}
      aria-label={`${labels[theme]}. ${t("눌러서 전환", "Press to switch")}`}
    >
      {resolved === "dark" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )}
      {theme === "system" && <span className="text-[0.5rem] tracking-[0.15em] uppercase">auto</span>}
    </button>
  );
}
