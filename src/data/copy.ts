import type { AboutCardId, OpenSourceId, ProjectId } from "./shared";

export type ProfileCopy = {
  title: string;
  subtitle: string;
  greeting: string;
  status: string;
  bio: string;
  location: string;
};

export type AboutCardCopy = {
  title: string;
  summary: string;
  body: string[];
};

export type ProjectCopy = {
  title?: string;
  description: string;
  problem?: string;
  solution?: string;
  learnings?: string[];
};

export type ExperienceCopy = {
  position: string;
  period: string;
  description: string;
  achievements: string[];
  company?: string;
};

export type ContentCopy = {
  profile: ProfileCopy;
  aboutCards: Record<AboutCardId, AboutCardCopy>;
  projects: Record<ProjectId, ProjectCopy>;
  experiences: ExperienceCopy[];
  experienceStats: { label: string }[];
  openSource: Record<OpenSourceId, { title: string; description: string }>;
};

