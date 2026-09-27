export type Direction = "up" | "down" | "left" | "right";

export type RoomComponentKey =
  | "home"
  | "about"
  | "projects"
  | "experience"
  | "contact"
  | "opensource"
  | "project-detail";

export type Room = {
  id: string;
  title: string;
  x: number;
  y: number;
  up?: string;
  down?: string;
  left?: string;
  right?: string;
  componentKey: RoomComponentKey;
  /** For project-detail rooms */
  projectId?: string;
};

export type Profile = {
  name: string;
  portrait?: string;
  title: string;
  subtitle: string;
  greeting: string;
  status: string;
  stack: string[];
  bio: string;
  location: string;
  yearsExperience: string;
  cvUrl: string;
  email: string;
  emailLabel: string;
  linkedin: string;
  github: string;
};

export type ExperienceStat = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  /** Cover / thumbnail for lists */
  image: string;
  /** Gallery images (at least the cover) */
  images: string[];
  tech: string[];
  github: string;
  demo: string;
  featured: boolean;
  problem?: string;
  solution?: string;
  learnings?: string[];
  layout?: "mobile" | "desktop";
};

export type Experience = {
  position: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
};

export type AboutCard = {
  id: string;
  title: string;
  summary: string;
  body: string[];
};

export type EducationCredential = {
  degree: string;
  institution: string;
  period: string;
  issuedDate: string;
  verifyUrl: string;
  badgeId: string;
  issuer: string;
  provider: string;
};

export type OpenSourceItem = {
  id: string;
  title: string;
  description: string;
  type: "github" | "npm" | "contribution" | "article";
  url: string;
};
