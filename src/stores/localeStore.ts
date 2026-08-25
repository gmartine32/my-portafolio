import { create } from "zustand";
import { applyHtmlLang, detectLocale, persistLocale } from "../i18n/detect";
import { DEFAULT_LOCALE, type Locale } from "../i18n/locales";

type LocaleState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

function initialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const locale = detectLocale();
  applyHtmlLang(locale);
  return locale;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: initialLocale(),
  setLocale: (locale) => {
    persistLocale(locale);
    applyHtmlLang(locale);
    set({ locale });
  },
}));
