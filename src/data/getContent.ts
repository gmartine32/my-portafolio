import type { Locale } from "../i18n/locales";
import type {
  AboutCard,
  EducationCredential,
  Experience,
  ExperienceStat,
  OpenSourceItem,
  Profile,
  Project,
} from "../types/world";
import { enCopy } from "./copy.en";
import { esCopy } from "./copy.es";
import type { ContentCopy } from "./copy";
import {
  ABOUT_CARD_IDS,
  OPEN_SOURCE_IDS,
  educationCredential,
  experienceShared,
  experienceStatValues,
  getProjectChain,
  openSourceShared,
  profileShared,
  skills,
} from "./shared";

export type Content = {
  profile: Profile;
  skills: readonly string[];
  aboutCards: AboutCard[];
  educationCredential: EducationCredential;
  projects: Project[];
  experiences: Experience[];
  experienceStats: ExperienceStat[];
  openSourceItems: OpenSourceItem[];
};

const copies: Record<Locale, ContentCopy> = {
  es: esCopy,
  en: enCopy,
};

export function getContent(locale: Locale): Content {
  const copy = copies[locale];

  return {
    profile: {
      ...profileShared,
      stack: [...profileShared.stack],
      ...copy.profile,
    },
    skills,
    aboutCards: ABOUT_CARD_IDS.map((id) => ({
      id,
      ...copy.aboutCards[id],
    })),
    educationCredential: { ...educationCredential },
    projects: getProjectChain().map((shared) => {
      const overlay = copy.projects[shared.id];
      return {
        ...shared,
        ...overlay,
        title: overlay.title ?? shared.title,
      };
    }),
    experiences: experienceShared.map((shared, index) => {
      const overlay = copy.experiences[index];
      return {
        company: overlay?.company ?? shared.company,
        tech: [...shared.tech],
        position: overlay?.position ?? "",
        period: overlay?.period ?? "",
        description: overlay?.description ?? "",
        achievements: overlay?.achievements ?? [],
      };
    }),
    experienceStats: experienceStatValues.map((value, index) => ({
      value,
      label: copy.experienceStats[index]?.label ?? "",
    })),
    openSourceItems: OPEN_SOURCE_IDS.map((id) => ({
      id,
      ...openSourceShared[id],
      ...copy.openSource[id],
    })),
  };
}
