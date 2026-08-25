import {
  DEFAULT_LOCALE,
  STORAGE_KEY,
  isLocale,
  type Locale,
} from "./locales";

function readStored(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

/** Map a BCP-47 tag (`en-US`, `es_CO`) onto a supported locale. */
export function matchLocale(tag: string): Locale | null {
  const normalized = tag.toLowerCase().replace(/_/g, "-");
  if (isLocale(normalized)) return normalized;
  const base = normalized.split("-")[0];
  return isLocale(base) ? base : null;
}

export function detectLocale(): Locale {
  const stored = readStored();
  if (stored) return stored;

  if (typeof navigator === "undefined") return DEFAULT_LOCALE;

  const languages =
    navigator.languages?.length > 0
      ? navigator.languages
      : navigator.language
        ? [navigator.language]
        : [];

  for (const tag of languages) {
    const matched = matchLocale(tag);
    if (matched) return matched;
  }

  return DEFAULT_LOCALE;
}

export function persistLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Private mode / blocked storage: preference lasts for this session only.
  }
}

export function applyHtmlLang(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
}
