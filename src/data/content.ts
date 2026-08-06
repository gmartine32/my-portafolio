import type { AboutCard, Experience, OpenSourceItem, Project } from "../types/world";

export const profile = {
  name: "Gian Martínez",
  title: "Frontend Engineer",
  subtitle: "Frontend Developer | Ingeniero en Sistemas",
  greeting: "Hola, soy",
  status: "Disponible para nuevos retos",
  stack: ["React", "Next.js", "React Native"],
  bio: "Ingeniero en Sistemas y Desarrollador Full Stack con especialización en Frontend (React, Next.js, Node.js y React Native). Experto en despliegue de aplicaciones mediante Docker y Nginx, con experiencia en infraestructura en la nube.",
  location: "Colombia, disponible remoto",
  yearsExperience: "4+",
  cvUrl: "/documents/cv-gian-martinez.pdf",
  email: "mailto:gianfrancovillam@gmail.com",
  emailLabel: "gianfrancovillam@gmail.com",
  linkedin: "https://www.linkedin.com/in/gianmartinezvilla",
  github: "https://github.com/gmartine32",
};

export const skills = [
  "React",
  "React Native",
  "TypeScript",
  "Next.js",
  "Astro.js",
  "CSS3",
  "Tailwind CSS",
  "SASS",
  "Sprintboot",
  "Node.js",
  "Git",
  "Python",
  "FastAPI",
  "PosgresQL",
  "MongoDB",
  "Docker",
  "Nginx",
  "AWS",
  "Azure",
  "SOLID Principles",
  "Clean Architecture",
  "Hexagonal Architecture",
  "Agile Methodologies",
];

export const aboutCards: AboutCard[] = [
  {
    id: "historia",
    title: "Historia",
    summary: "Más de 4 años construyendo productos digitales.",
    body: [
      "Soy Ingeniero en Sistemas y Desarrollador con más de 4 años de experiencia creando soluciones digitales modernas. Desde mis inicios me apasionó el desarrollo frontend, pero he expandido mis habilidades hacia el backend, despliegues y bases de datos.",
      "He trabajado en sectores energético, gubernamental y comercial, aplicando principios SOLID, arquitectura limpia y arquitectura hexagonal.",
    ],
  },
  {
    id: "estudios",
    title: "Estudios",
    summary: "Ingeniería en Sistemas y aprendizaje continuo.",
    body: [
      "Formación como Ingeniero en Sistemas con foco en ingeniería de software, arquitectura y desarrollo de productos.",
      "Aprendizaje continuo en frontend moderno, cloud, DevOps y prácticas de calidad de código.",
    ],
  },
  {
    id: "tecnologias",
    title: "Tecnologías",
    summary: "React, TypeScript, Node y cloud.",
    body: [
      "Stack principal: React, Next.js, React Native, TypeScript y Node.js.",
      "También trabajo con Docker, Nginx, PostgreSQL, MongoDB, AWS y Azure para entregar soluciones completas.",
    ],
  },
  {
    id: "filosofia",
    title: "Filosofía",
    summary: "Código limpio, UX clara, impacto real.",
    body: [
      "Priorizo experiencias fluidas, accesibles y mantenibles. Domino arquitecturas como SOLID, MVVM y Clean Architecture.",
      "Aplico enfoques como Atomic Design para sistemas de UI consistentes, creando impacto y experiencias memorables.",
    ],
  },
  {
    id: "pasatiempos",
    title: "Pasatiempos",
    summary: "Explorar UX, juegos y prototipos.",
    body: [
      "Me gusta explorar interfaces, prototipar ideas y analizar cómo los videojuegos resuelven navegación y feedback.",
      "También disfruto documentar aprendizajes y experimentar con animaciones y herramientas nuevas.",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "devitech",
    title: "Landing page Devitech",
    description:
      "Desarrollo de landing page corporativa para una empresa tecnológica, optimizada para SEO y con diseño 100% responsivo.",
    image: "/img/devitech.webp",
    tech: ["Next.js", "TypeScript", "Node.js", "WP HEADLESS", "Tailwind CSS"],
    github: "#",
    demo: "https://devitech.com.co/home",
    featured: true,
    problem: "Necesidad de una presencia corporativa moderna, rápida y orientada a conversión.",
    solution:
      "Landing con Next.js + WordPress Headless, animaciones fluidas, formularios y métricas de conversión.",
    learnings: ["SEO técnico en headless CMS", "Arquitectura escalable de landing", "Optimización de conversión"],
  },
  {
    id: "kiexchange",
    title: "Landing page KIEXCHANGE",
    description:
      "Landing para plataforma de intercambio de criptomonedas con datos de mercado en tiempo real.",
    image: "/img/kiex.webp",
    tech: ["React.js", "Antd design"],
    github: "#",
    demo: "https://kiex-web.lmcdigitalriver.online/#/",
    featured: true,
    problem: "Comunicar valor de producto crypto con datos vivos y UX clara.",
    solution: "Integración de API en tiempo real y diseño adaptable enfocado en rendimiento.",
    learnings: ["Datos en tiempo real", "UI con Ant Design", "Optimización de carga"],
  },
  {
    id: "nvd-searcher",
    title: "NVD - Prueba técnica",
    description:
      "Aplicación web para consultar vulnerabilidades de la National Vulnerability Database (NVD).",
    image: "/img/nvd-searcher.webp",
    tech: ["React.js", "Axios", "Tailwind CSS"],
    github: "https://github.com/gmartine32/challenge-frontend?tab=readme-ov-file",
    demo: "https://challenge-front.lmcdigitalriver.online",
    featured: true,
    problem: "Consultar y filtrar grandes volúmenes de datos técnicos de vulnerabilidades.",
    solution: "Filtrado dinámico con Axios y UI responsiva orientada a rendimiento.",
    learnings: ["Consumo de APIs densas", "Filtrado client-side", "UI técnica usable"],
  },
  {
    id: "terpel-pos",
    title: "TERPEL POS MOBILE",
    description:
      "App móvil para puntos de venta con inventario, ventas y reportes en tiempo real.",
    image: "/img/devitech.webp",
    tech: ["Next.js", "SASS", "Framer Motion"],
    github: "#",
    demo: "#",
    featured: false,
    problem: "Simplificar operaciones POS en estaciones de servicio.",
    solution: "Interfaz modular con animaciones optimizadas para flujos de venta ágiles.",
    learnings: ["Flujos POS móviles", "Animaciones de productividad", "Modularidad de UI"],
  },
  {
    id: "haceb",
    title: "Landing page campaña Haceb",
    description: "Landing para campaña publicitaria de electrodomésticos enfocada en conversión.",
    image: "/img/kiex.webp",
    tech: ["React Native", "Socket.io", "Express"],
    github: "#",
    demo: "#",
    featured: false,
    problem: "Aumentar conversión en campaña publicitaria.",
    solution: "CTAs claros, diseño atractivo y optimización móvil.",
    learnings: ["Landing de campaña", "Conversión móvil", "Mensajería de producto"],
  },
  {
    id: "movisai",
    title: "MOVISAI",
    description:
      "Plataforma web para caracterización socioeconómica en San Andrés con visualización de datos.",
    image: "/img/nvd-searcher.webp",
    tech: ["React", "API Integration", "Chart.js"],
    github: "#",
    demo: "#",
    featured: false,
    problem: "Analizar datos socioeconómicos de forma rápida y segmentada.",
    solution: "Integración de API y gráficos dinámicos para exploración de datos.",
    learnings: ["Visualización de datos", "APIs gubernamentales", "UX de análisis"],
  },
  {
    id: "censo-sai",
    title: "CENSO SAI",
    description:
      "App móvil censal con soporte offline y sincronización automática para más de 30 mil vehículos.",
    image: "/img/devitech.webp",
    tech: ["React Native", "Node.js", "TypeScript", "Oracle"],
    github: "#",
    demo: "#",
    featured: false,
    problem: "Levantar censo vehicular en condiciones de conectividad intermitente.",
    solution: "Offline-first con sincronización automática y base de datos relacional.",
    learnings: ["Offline sync", "React Native a escala", "Oracle + Node"],
  },
];

export const experiences: Experience[] = [
  {
    position: "Full Stack Developer",
    company: "Devitech S.A.S – Terpel",
    period: "Abr 2022 - Presente",
    description:
      "Implementé sistemas de gestión de combustible usados por más de 750 estaciones, mejorando la eficiencia operativa en un 25%.",
    achievements: [
      "Mejora de eficiencia operativa en 25% en sistemas de gestión de combustible",
      "Reducción de tiempos de carga en 40% mediante optimización de React y PostgreSQL",
      "Desarrollo de app móvil que redujo en 30% los tiempos de registro",
      "Automatización de despliegues con Azure DevOps, reduciendo tiempos de entrega en 50%",
    ],
    tech: ["React", "TypeScript", "React Native", "Socket.io", "PostgreSQL", "Azure DevOps", "Ubuntu"],
  },
  {
    position: "Desarrollador Frontend",
    company: "Devitech – Proyecto Freelance",
    period: "Mayo 2025 - Junio 2025",
    description:
      "Desarrollé sitio corporativo en 30 días con Next.js y WordPress Headless, mejorando UX y SEO técnico.",
    achievements: [
      "Sitio corporativo desarrollado en 30 días con Next.js y WordPress Headless",
      "Mejora de SEO técnico y +20% tráfico orgánico",
      "Optimización de tiempos de carga en 35%",
      "Despliegue seguro en VPS con Nginx",
    ],
    tech: ["Next.js", "WordPress Headless", "Nginx", "VPS"],
  },
  {
    position: "Full Stack Developer",
    company: "MoviSAI – Gob. de San Andrés",
    period: "Sep 2024 - Dic 2024",
    description:
      "Plataforma web de caracterización vehicular y app móvil publicada en tiendas oficiales.",
    achievements: [
      "Reducción del tiempo de registro en 40% con plataforma web",
      "Desarrollo y despliegue de app móvil Android/iOS en tiendas oficiales",
    ],
    tech: ["React", "TypeScript", "Oracle", "Express", "React Native", "AWS EC2", "Nginx"],
  },
  {
    position: "Frontend Developer",
    company: "Begima (México) – Freelance",
    period: "Sep 2023 - Nov 2023",
    description: "Plataforma ecommerce y landing promocional orientadas a conversión.",
    achievements: [
      "Aumento de ventas en línea en 18% con plataforma ecommerce",
      "Landing optimizada para conversión (+12% leads)",
    ],
    tech: ["React", "Tailwind CSS", "JavaScript"],
  },
  {
    position: "Full Stack Developer",
    company: "Beefree – Freelance",
    period: "Ene 2022 - Jul 2022",
    description: "Servicio de reportería para tiendas Etsy con Node.js.",
    achievements: [
      "Reducción en 50% del tiempo de análisis de datos",
      "Integración de APIs y software propio para centralización",
    ],
    tech: ["Node.js", "Express", "Nginx", "MongoDB"],
  },
  {
    position: "Frontend Developer",
    company: "Kiiex – Freelance",
    period: "Ene 2022 - Jul 2022",
    description: "Landing promocional con despliegue optimizado en hosting propio.",
    achievements: [
      "Aumento en 15% de inscripciones",
      "Despliegue optimizado mejorando rendimiento y SEO",
    ],
    tech: ["React", "Tailwind CSS", "JavaScript"],
  },
];

export const experienceStats = [
  { label: "Años de Experiencia", value: "4+" },
  { label: "Proyectos Completados", value: "25+" },
  { label: "Tecnologías Dominadas", value: "15+" },
  { label: "Clientes Satisfechos", value: "100%" },
];

export const openSourceItems: OpenSourceItem[] = [
  {
    id: "nvd-challenge",
    title: "NVD Searcher",
    description: "Cliente React para consultar vulnerabilidades NVD con filtrado dinámico.",
    type: "github",
    url: "https://github.com/gmartine32/challenge-frontend?tab=readme-ov-file",
  },
  {
    id: "github-profile",
    title: "GitHub @gmartine32",
    description: "Repositorios públicos, experimentos y código abierto.",
    type: "github",
    url: "https://github.com/gmartine32",
  },
  {
    id: "npm-placeholder",
    title: "Paquetes NPM",
    description: "Espacio para librerías y utilidades publicadas (próximamente).",
    type: "npm",
    url: "https://www.npmjs.com/",
  },
  {
    id: "articles-placeholder",
    title: "Artículos y notas",
    description: "Escritos técnicos sobre frontend, arquitectura y DX.",
    type: "article",
    url: "https://github.com/gmartine32",
  },
];
