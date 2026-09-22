"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "system" | "dark" | "light";

const STORAGE_KEY = "sc-theme";

/** Runs before paint so the saved theme is applied without a flash. Kept in sync with this file. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`;

const Ctx = createContext<{ theme: Theme; resolved: "dark" | "light"; setTheme: (t: Theme) => void }>({
  theme: "system",
  resolved: "dark",
  setTheme: () => {},
});

function systemTheme(): "dark" | "light" {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"dark" | "light">("dark");

  // Read the saved choice once on the client and keep `resolved` in step with the OS.
  useEffect(() => {
    let saved: Theme = "system";
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "dark" || v === "light") saved = v;
    } catch {
      /* storage blocked */
    }
    const apply = () => setResolved(saved === "system" ? systemTheme() : saved);
    // The server renders the dark default; the saved choice and OS setting are
    // client-only, so the first client render corrects them once.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    setThemeState(saved);
    apply();
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    setResolved(t === "system" ? systemTheme() : t);
    try {
      if (t === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* storage blocked */
    }
    if (t === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }, []);

  return <Ctx.Provider value={{ theme, resolved, setTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  return useContext(Ctx);
}
