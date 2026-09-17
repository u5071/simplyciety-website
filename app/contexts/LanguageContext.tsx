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

  // The server renders Korean; the saved choice and browser locale are only
  // readable on the client, so the first client render corrects it once.
  useEffect(() => {
    const saved = localStorage.getItem("sc-lang") as Lang | null;
    // Non-Korean browser locales default to English.
    const next: Lang = saved === "ko" || saved === "en" ? saved : navigator.language.startsWith("ko") ? "ko" : "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    if (next !== "ko") setLangState(next);
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
