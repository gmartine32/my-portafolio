import type { Locale } from "../locales";
import { enUi } from "./en";
import { esUi, type UiMessages } from "./es";

export type { UiMessages };

export const ui: Record<Locale, UiMessages> = {
  es: esUi,
  en: enUi,
};

export function getUi(locale: Locale): UiMessages {
  return ui[locale];
}
