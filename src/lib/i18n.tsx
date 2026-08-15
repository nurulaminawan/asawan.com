import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import {
  LANG_META,
  type Lang,
  parsePath,
} from "@/lib/site";
import { getDictionary } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

type I18nValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dictionary;
  rest: string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { lang, rest } = parsePath(location);
  const meta = LANG_META[lang];
  const t = useMemo(() => getDictionary(lang), [lang]);

  useEffect(() => {
    document.documentElement.lang = meta.locale;
    document.documentElement.dir = meta.dir;
    document.documentElement.classList.toggle("rtl", meta.dir === "rtl");
    document.documentElement.classList.toggle("lang-ur", lang === "ur");
    document.documentElement.classList.toggle("lang-ar", lang === "ar");
  }, [lang, meta]);

  const value = useMemo<I18nValue>(
    () => ({ lang, dir: meta.dir, t, rest }),
    [lang, meta.dir, t, rest],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
