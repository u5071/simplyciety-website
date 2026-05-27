"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ko" | "en";

const Ctx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (ko: string, en: string) => string;
}>({ lang: "ko", setLang: () => {}, t: (ko) => ko });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("sc-lang") as Lang | null;
    if (saved === "ko" || saved === "en") {
      setLangState(saved);
    } else {
      // Non-Korean browser locales default to English
      setLangState(navigator.language.startsWith("ko") ? "ko" : "en");
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("sc-lang", l);
  };

  const t = (ko: string, en: string) => (lang === "ko" ? ko : en);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
