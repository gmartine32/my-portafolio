import { DEFAULT_LOCALE } from "../i18n/locales";
import { getContent } from "./getContent";

export { getContent } from "./getContent";
export { getProjectChain } from "./shared";

/** Spanish corpus for static SEO / noscript in `index.astro`. */
const spanish = getContent(DEFAULT_LOCALE);

export const profile = spanish.profile;
export const skills = spanish.skills;
export const aboutCards = spanish.aboutCards;
export const projects = spanish.projects;
export const experiences = spanish.experiences;
export const experienceStats = spanish.experienceStats;
export const openSourceItems = spanish.openSourceItems;
