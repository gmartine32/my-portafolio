import { interpolate, useUi } from "../../i18n/hooks";
import { LOCALES, LOCALE_LABELS } from "../../i18n/locales";
import { useLocaleStore } from "../../stores/localeStore";

export function LanguageToggle() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const t = useUi();

  return (
    <div
      role="group"
      aria-label={t.lang.groupLabel}
      className="system-panel flex h-10 items-center rounded-full p-0.5"
    >
      {LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            aria-label={interpolate(t.lang.setTo, { name: LOCALE_LABELS[code] })}
            onClick={() => setLocale(code)}
            className={[
              "flex h-7 w-7 items-center justify-center rounded-full text-[0.7rem] font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              active
                ? "bg-primary/30 text-foreground"
                : "text-foreground/90 hover:text-foreground",
            ].join(" ")}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
