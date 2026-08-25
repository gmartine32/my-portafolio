import { useLocaleStore } from "../stores/localeStore";
import { getContent } from "../data/getContent";
import { interpolate } from "./interpolate";
import { getUi, type UiMessages } from "./ui";

export function useLocale() {
  return useLocaleStore((s) => s.locale);
}

export function useUi(): UiMessages {
  const locale = useLocale();
  return getUi(locale);
}

export function useContent() {
  const locale = useLocale();
  return getContent(locale);
}

export { interpolate };
