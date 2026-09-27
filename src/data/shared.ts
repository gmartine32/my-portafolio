import type { OpenSourceItem, Project } from "../types/world";

export const profileShared = {
  name: "Gian Martínez",
  portrait: "/img/profile/gian-portrait.webp",
  stack: ["React", "Next.js", "React Native"],
  yearsExperience: "4+",
  cvUrl: "/documents/cv-gian-martinez.pdf",
  email: "mailto:gianfrancovillam@gmail.com",
  emailLabel: "gianfrancovillam@gmail.com",
  linkedin: "https://www.linkedin.com/in/gianmartinezvilla",
  github: "https://github.com/gmartine32",
} as const;

export const skills = [
  "React",
  "React Native",
  "TypeScript",
  "Next.js",
  "Electron",
  "Astro.js",
  "CSS3",
  "Tailwind CSS",
  "SASS",
  "Spring Boot",
  "Node.js",
  "Go",
  "Git",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "PL/SQL",
  "Kafka",
  "MongoDB",
  "Docker",
  "Nginx",
  "AWS",
  "Azure",
  "AI-Augmented Development",
  "RAG Pipelines",
  "Prompt Engineering",
  "Spec-Driven Development",
  "Cursor & Claude Code",
  "SOLID Principles",
  "Clean Architecture",
  "Hexagonal Architecture",
  "Agile Methodologies",
] as const;

export const ABOUT_CARD_IDS = [
  "historia",
  "estudios",
  "tecnologias",
  "filosofia",
  "pasatiempos",
] as const;

export type AboutCardId = (typeof ABOUT_CARD_IDS)[number];

export const educationCredential = {
  degree: "Ingeniería de Sistemas",
  institution: "Universidad de la Costa",
  period: "2025",
  issuedDate: "06-05-2025",
  verifyUrl: "https://app.certika.co/badges/MjA2NTU=",
  badgeId: "MjA2NTU=",
  issuer: "Universidad de la Costa",
  provider: "Certika",
} as const;

export const PROJECT_IDS = [
  "docusaas",
  "papyria",
  "terpel-pos",
  "premios-perrenque",
  "haceb",
  "odr",
  "santacruz",
  "devitech",
  "kiexchange",
  "nvd-searcher",
  "movisai",
  "censo-sai",
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

type ProjectShared = Pick<
  Project,
  "image" | "images" | "tech" | "github" | "demo" | "featured" | "layout"
> & {
  title: string;
};

export const projectShared: Record<ProjectId, ProjectShared> = {
  docusaas: {
    title: "Docusaas",
    image: "/img/projects/docusaas/01.webp",
    images: ["/img/projects/docusaas/01.webp"],
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "TypeScript"],
    github: "#",
    demo: "#",
    featured: true,
  },
  papyria: {
    title: "Papyria",
    image: "/img/projects/papyria/01.webp",
    images: [
      "/img/projects/papyria/01.webp",
      "/img/projects/papyria/02.webp",
      "/img/projects/papyria/03.webp",
      "/img/projects/papyria/04.webp",
      "/img/projects/papyria/05.webp",
    ],
    tech: ["React Native", "Spring Boot", "Python", "FastAPI", "RAG"],
    github: "#",
    demo: "#",
    featured: true,
  },
  "terpel-pos": {
    title: "TERPEL POS Móvil",
    image: "/img/projects/terpel-pos/01.webp",
    images: [
      "/img/projects/terpel-pos/01.webp",
      "/img/projects/terpel-pos/02.webp",
      "/img/projects/terpel-pos/03.webp",
      "/img/projects/terpel-pos/04.webp",
      "/img/projects/terpel-pos/05.webp",
    ],
    tech: ["React Native", "TypeScript"],
    github: "#",
    demo: "#",
    featured: true,
  },
  "premios-perrenque": {
    title: "Premios Perrenque",
    image: "/img/projects/premios-perrenque/01.webp",
    images: [
      "/img/projects/premios-perrenque/01.webp",
      "/img/projects/premios-perrenque/02.webp",
      "/img/projects/premios-perrenque/03.webp",
      "/img/projects/premios-perrenque/04.webp",
      "/img/projects/premios-perrenque/05.webp",
      "/img/projects/premios-perrenque/06.webp",
    ],
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "Pasarela de pago"],
    github: "#",
    demo: "#",
    featured: true,
  },
  haceb: {
    title: "Landing Haceb",
    image: "/img/projects/haceb/01.webp",
    images: [
      "/img/projects/haceb/01.webp",
      "/img/projects/haceb/02.webp",
      "/img/projects/haceb/03.webp",
    ],
    tech: ["React", "Vite", "Node.js"],
    github: "#",
    demo: "#",
    featured: true,
  },
  odr: {
    title: "ODR – Rutas y transporte",
    image: "/img/projects/odr/01.webp",
    images: [
      "/img/projects/odr/01.webp",
      "/img/projects/odr/02.webp",
    ],
    tech: ["React", "Vite", "Node.js", "Google Maps API"],
    layout: "mobile",
    github: "#",
    demo: "#",
    featured: true,
  },
  santacruz: {
    title: "Carnes Santa Cruz",
    image: "/img/projects/santacruz/01.webp",
    images: [
      "/img/projects/santacruz/01.webp",
      "/img/projects/santacruz/02.webp",
      "/img/projects/santacruz/03.webp",
    ],
    tech: ["WordPress", "CMS", "SEO", "Responsive Design"],
    github: "#",
    demo: "#",
    featured: true,
  },
  devitech: {
    title: "Landing page Devitech",
    image: "/img/devitech.webp",
    images: ["/img/devitech.webp"],
    tech: ["Next.js", "TypeScript", "Node.js", "WP HEADLESS", "Tailwind CSS"],
    github: "#",
    demo: "https://devitech.com.co/home",
    featured: true,
  },
  kiexchange: {
    title: "Landing page KIEXCHANGE",
    image: "/img/kiex.webp",
    images: ["/img/kiex.webp"],
    tech: ["React.js", "Antd design"],
    github: "#",
    demo: "https://kiex-web.lmcdigitalriver.online/#/",
    featured: true,
  },
  "nvd-searcher": {
    title: "NVD - Prueba técnica",
    image: "/img/nvd-searcher.webp",
    images: ["/img/nvd-searcher.webp"],
    tech: ["React.js", "Axios", "Tailwind CSS"],
    github: "https://github.com/gmartine32/challenge-frontend?tab=readme-ov-file",
    demo: "https://challenge-front.lmcdigitalriver.online",
    featured: true,
  },
  movisai: {
    title: "MOVISAI",
    image: "/img/projects/movisai/02.webp",
    images: [
      "/img/projects/movisai/02.webp",
    ],
    tech: ["React", "API Integration", "Chart.js"],
    github: "#",
    demo: "#",
    featured: false,
  },
  "censo-sai": {
    title: "CENSO SAI",
    image: "/img/movisai/01.webp",
    images:[
      "/img/projects/movisai/01.webp",
      "/img/projects/movisai/03.webp",
      "/img/projects/movisai/04.webp",
      "/img/projects/movisai/05.webp",
    ],
    tech: ["React Native", "Node.js", "TypeScript", "Oracle"],
    github: "#",
    demo: "#",
    featured: false,
  },
};

export const OPEN_SOURCE_IDS = [
  "nvd-challenge",
  "github-profile",
  "npm-placeholder",
  "articles-placeholder",
] as const;

export type OpenSourceId = (typeof OPEN_SOURCE_IDS)[number];

export const openSourceShared: Record<
  OpenSourceId,
  Pick<OpenSourceItem, "type" | "url">
> = {
  "nvd-challenge": {
    type: "github",
    url: "https://github.com/gmartine32/challenge-frontend?tab=readme-ov-file",
  },
  "github-profile": {
    type: "github",
    url: "https://github.com/gmartine32",
  },
  "npm-placeholder": {
    type: "npm",
    url: "https://www.npmjs.com/",
  },
  "articles-placeholder": {
    type: "article",
    url: "https://github.com/gmartine32",
  },
};

export const experienceShared = [
  {
    company: "Devitech S.A.S – Terpel",
    tech: [
      "React",
      "Next.js",
      "React Native",
      "Electron",
      "Node.js",
      "Spring Boot",
      "Go",
      "PostgreSQL",
      "PL/SQL",
      "Kafka",
      "Azure DevOps",
    ],
  },
  {
    company: "Papyria",
    tech: ["React Native", "Spring Boot", "Python", "FastAPI", "RAG"],
  },
  {
    company: "Populi S.A. – Independiente",
    tech: ["Next.js", "Spring Boot", "React", "Vite", "Node.js", "PostgreSQL", "Google Maps API"],
  },
  {
    company: "Devitech – Proyecto puntual",
    tech: ["Next.js", "WordPress Headless", "Nginx", "VPS"],
  },
  {
    company: "Carnes Santa Cruz – Independiente",
    tech: ["WordPress", "CMS", "SEO", "Responsive Design"],
  },
  {
    company: "MoviSAI – Gob. de San Andrés",
    tech: ["React", "TypeScript", "Oracle", "Express", "React Native", "AWS EC2", "Nginx"],
  },
  {
    company: "Begima (México) – Freelance",
    tech: ["React", "Tailwind CSS", "JavaScript"],
  },
  {
    company: "Beefree – Freelance",
    tech: ["Node.js", "Express", "Nginx", "MongoDB"],
  },
  {
    company: "Kiiex – Freelance",
    tech: ["React", "Tailwind CSS", "JavaScript"],
  },
] as const;

export const experienceStatValues = ["4+", "25+", "15+", "100%"] as const;

export function getProjectChain() {
  const list = PROJECT_IDS.map((id) => ({ id, ...projectShared[id] }));
  const featured = list.filter((project) => project.featured);
  const others = list.filter((project) => !project.featured);
  return [...featured, ...others];
}
