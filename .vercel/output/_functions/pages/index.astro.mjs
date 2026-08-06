/* empty css                                 */
import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, k as renderComponent, l as renderHead, u as unescapeHTML } from '../chunks/astro/server_CRnmwiCs.mjs';
import 'piccolore';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileDown, ChevronDown, BookOpen, GitBranch, Package, ExternalLink, ArrowRight, ChevronRight, ChevronLeft, ChevronUp } from 'lucide-react';
import { create } from 'zustand';
export { renderers } from '../renderers.mjs';

const profile = {
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
  github: "https://github.com/gmartine32"
};
const skills = [
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
  "Agile Methodologies"
];
const aboutCards = [
  {
    id: "historia",
    title: "Historia",
    summary: "Más de 4 años construyendo productos digitales.",
    body: [
      "Soy Ingeniero en Sistemas y Desarrollador con más de 4 años de experiencia creando soluciones digitales modernas. Desde mis inicios me apasionó el desarrollo frontend, pero he expandido mis habilidades hacia el backend, despliegues y bases de datos.",
      "He trabajado en sectores energético, gubernamental y comercial, aplicando principios SOLID, arquitectura limpia y arquitectura hexagonal."
    ]
  },
  {
    id: "estudios",
    title: "Estudios",
    summary: "Ingeniería en Sistemas y aprendizaje continuo.",
    body: [
      "Formación como Ingeniero en Sistemas con foco en ingeniería de software, arquitectura y desarrollo de productos.",
      "Aprendizaje continuo en frontend moderno, cloud, DevOps y prácticas de calidad de código."
    ]
  },
  {
    id: "tecnologias",
    title: "Tecnologías",
    summary: "React, TypeScript, Node y cloud.",
    body: [
      "Stack principal: React, Next.js, React Native, TypeScript y Node.js.",
      "También trabajo con Docker, Nginx, PostgreSQL, MongoDB, AWS y Azure para entregar soluciones completas."
    ]
  },
  {
    id: "filosofia",
    title: "Filosofía",
    summary: "Código limpio, UX clara, impacto real.",
    body: [
      "Priorizo experiencias fluidas, accesibles y mantenibles. Domino arquitecturas como SOLID, MVVM y Clean Architecture.",
      "Aplico enfoques como Atomic Design para sistemas de UI consistentes, creando impacto y experiencias memorables."
    ]
  },
  {
    id: "pasatiempos",
    title: "Pasatiempos",
    summary: "Explorar UX, juegos y prototipos.",
    body: [
      "Me gusta explorar interfaces, prototipar ideas y analizar cómo los videojuegos resuelven navegación y feedback.",
      "También disfruto documentar aprendizajes y experimentar con animaciones y herramientas nuevas."
    ]
  }
];
const projects = [
  {
    id: "devitech",
    title: "Landing page Devitech",
    description: "Desarrollo de landing page corporativa para una empresa tecnológica, optimizada para SEO y con diseño 100% responsivo.",
    image: "/img/devitech.webp",
    tech: ["Next.js", "TypeScript", "Node.js", "WP HEADLESS", "Tailwind CSS"],
    github: "#",
    demo: "https://devitech.com.co/home",
    featured: true,
    problem: "Necesidad de una presencia corporativa moderna, rápida y orientada a conversión.",
    solution: "Landing con Next.js + WordPress Headless, animaciones fluidas, formularios y métricas de conversión.",
    learnings: ["SEO técnico en headless CMS", "Arquitectura escalable de landing", "Optimización de conversión"]
  },
  {
    id: "kiexchange",
    title: "Landing page KIEXCHANGE",
    description: "Landing para plataforma de intercambio de criptomonedas con datos de mercado en tiempo real.",
    image: "/img/kiex.webp",
    tech: ["React.js", "Antd design"],
    github: "#",
    demo: "https://kiex-web.lmcdigitalriver.online/#/",
    featured: true,
    problem: "Comunicar valor de producto crypto con datos vivos y UX clara.",
    solution: "Integración de API en tiempo real y diseño adaptable enfocado en rendimiento.",
    learnings: ["Datos en tiempo real", "UI con Ant Design", "Optimización de carga"]
  },
  {
    id: "nvd-searcher",
    title: "NVD - Prueba técnica",
    description: "Aplicación web para consultar vulnerabilidades de la National Vulnerability Database (NVD).",
    image: "/img/nvd-searcher.webp",
    tech: ["React.js", "Axios", "Tailwind CSS"],
    github: "https://github.com/gmartine32/challenge-frontend?tab=readme-ov-file",
    demo: "https://challenge-front.lmcdigitalriver.online",
    featured: true,
    problem: "Consultar y filtrar grandes volúmenes de datos técnicos de vulnerabilidades.",
    solution: "Filtrado dinámico con Axios y UI responsiva orientada a rendimiento.",
    learnings: ["Consumo de APIs densas", "Filtrado client-side", "UI técnica usable"]
  },
  {
    id: "terpel-pos",
    title: "TERPEL POS MOBILE",
    description: "App móvil para puntos de venta con inventario, ventas y reportes en tiempo real.",
    image: "/img/devitech.webp",
    tech: ["Next.js", "SASS", "Framer Motion"],
    github: "#",
    demo: "#",
    featured: false,
    problem: "Simplificar operaciones POS en estaciones de servicio.",
    solution: "Interfaz modular con animaciones optimizadas para flujos de venta ágiles.",
    learnings: ["Flujos POS móviles", "Animaciones de productividad", "Modularidad de UI"]
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
    learnings: ["Landing de campaña", "Conversión móvil", "Mensajería de producto"]
  },
  {
    id: "movisai",
    title: "MOVISAI",
    description: "Plataforma web para caracterización socioeconómica en San Andrés con visualización de datos.",
    image: "/img/nvd-searcher.webp",
    tech: ["React", "API Integration", "Chart.js"],
    github: "#",
    demo: "#",
    featured: false,
    problem: "Analizar datos socioeconómicos de forma rápida y segmentada.",
    solution: "Integración de API y gráficos dinámicos para exploración de datos.",
    learnings: ["Visualización de datos", "APIs gubernamentales", "UX de análisis"]
  },
  {
    id: "censo-sai",
    title: "CENSO SAI",
    description: "App móvil censal con soporte offline y sincronización automática para más de 30 mil vehículos.",
    image: "/img/devitech.webp",
    tech: ["React Native", "Node.js", "TypeScript", "Oracle"],
    github: "#",
    demo: "#",
    featured: false,
    problem: "Levantar censo vehicular en condiciones de conectividad intermitente.",
    solution: "Offline-first con sincronización automática y base de datos relacional.",
    learnings: ["Offline sync", "React Native a escala", "Oracle + Node"]
  }
];
const experiences = [
  {
    position: "Full Stack Developer",
    company: "Devitech S.A.S – Terpel",
    period: "Abr 2022 - Presente",
    description: "Implementé sistemas de gestión de combustible usados por más de 750 estaciones, mejorando la eficiencia operativa en un 25%.",
    achievements: [
      "Mejora de eficiencia operativa en 25% en sistemas de gestión de combustible",
      "Reducción de tiempos de carga en 40% mediante optimización de React y PostgreSQL",
      "Desarrollo de app móvil que redujo en 30% los tiempos de registro",
      "Automatización de despliegues con Azure DevOps, reduciendo tiempos de entrega en 50%"
    ],
    tech: ["React", "TypeScript", "React Native", "Socket.io", "PostgreSQL", "Azure DevOps", "Ubuntu"]
  },
  {
    position: "Desarrollador Frontend",
    company: "Devitech – Proyecto Freelance",
    period: "Mayo 2025 - Junio 2025",
    description: "Desarrollé sitio corporativo en 30 días con Next.js y WordPress Headless, mejorando UX y SEO técnico.",
    achievements: [
      "Sitio corporativo desarrollado en 30 días con Next.js y WordPress Headless",
      "Mejora de SEO técnico y +20% tráfico orgánico",
      "Optimización de tiempos de carga en 35%",
      "Despliegue seguro en VPS con Nginx"
    ],
    tech: ["Next.js", "WordPress Headless", "Nginx", "VPS"]
  },
  {
    position: "Full Stack Developer",
    company: "MoviSAI – Gob. de San Andrés",
    period: "Sep 2024 - Dic 2024",
    description: "Plataforma web de caracterización vehicular y app móvil publicada en tiendas oficiales.",
    achievements: [
      "Reducción del tiempo de registro en 40% con plataforma web",
      "Desarrollo y despliegue de app móvil Android/iOS en tiendas oficiales"
    ],
    tech: ["React", "TypeScript", "Oracle", "Express", "React Native", "AWS EC2", "Nginx"]
  },
  {
    position: "Frontend Developer",
    company: "Begima (México) – Freelance",
    period: "Sep 2023 - Nov 2023",
    description: "Plataforma ecommerce y landing promocional orientadas a conversión.",
    achievements: [
      "Aumento de ventas en línea en 18% con plataforma ecommerce",
      "Landing optimizada para conversión (+12% leads)"
    ],
    tech: ["React", "Tailwind CSS", "JavaScript"]
  },
  {
    position: "Full Stack Developer",
    company: "Beefree – Freelance",
    period: "Ene 2022 - Jul 2022",
    description: "Servicio de reportería para tiendas Etsy con Node.js.",
    achievements: [
      "Reducción en 50% del tiempo de análisis de datos",
      "Integración de APIs y software propio para centralización"
    ],
    tech: ["Node.js", "Express", "Nginx", "MongoDB"]
  },
  {
    position: "Frontend Developer",
    company: "Kiiex – Freelance",
    period: "Ene 2022 - Jul 2022",
    description: "Landing promocional con despliegue optimizado en hosting propio.",
    achievements: [
      "Aumento en 15% de inscripciones",
      "Despliegue optimizado mejorando rendimiento y SEO"
    ],
    tech: ["React", "Tailwind CSS", "JavaScript"]
  }
];
const experienceStats = [
  { label: "Años de Experiencia", value: "4+" },
  { label: "Proyectos Completados", value: "25+" },
  { label: "Tecnologías Dominadas", value: "15+" },
  { label: "Clientes Satisfechos", value: "100%" }
];
const openSourceItems = [
  {
    id: "nvd-challenge",
    title: "NVD Searcher",
    description: "Cliente React para consultar vulnerabilidades NVD con filtrado dinámico.",
    type: "github",
    url: "https://github.com/gmartine32/challenge-frontend?tab=readme-ov-file"
  },
  {
    id: "github-profile",
    title: "GitHub @gmartine32",
    description: "Repositorios públicos, experimentos y código abierto.",
    type: "github",
    url: "https://github.com/gmartine32"
  },
  {
    id: "npm-placeholder",
    title: "Paquetes NPM",
    description: "Espacio para librerías y utilidades publicadas (próximamente).",
    type: "npm",
    url: "https://www.npmjs.com/"
  },
  {
    id: "articles-placeholder",
    title: "Artículos y notas",
    description: "Escritos técnicos sobre frontend, arquitectura y DX.",
    type: "article",
    url: "https://github.com/gmartine32"
  }
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function AboutRoom() {
  const [activeId, setActiveId] = useState(null);
  const reducedMotion = usePrefersReducedMotion();
  const active = aboutCards.find((c) => c.id === activeId);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-full w-full max-w-5xl flex-col px-6 py-20", children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-10 text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-heading mb-3 text-4xl font-bold md:text-6xl", children: [
        "Sobre ",
        /* @__PURE__ */ jsx("span", { className: "bg-gradient-primary bg-clip-text text-transparent", children: "mí" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mx-auto max-w-2xl text-muted-foreground", children: [
        profile.location,
        " · ",
        profile.yearsExperience,
        " años de experiencia"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: aboutCards.map((card) => {
      const isOpen = activeId === card.id;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          "aria-expanded": isOpen,
          onClick: () => setActiveId(isOpen ? null : card.id),
          className: `rounded-2xl border p-5 text-left backdrop-blur-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isOpen ? "border-primary/40 bg-primary/15" : "border-white/10 bg-white/5 hover:border-primary/30 hover:bg-white/10"}`,
          children: [
            /* @__PURE__ */ jsx("h2", { className: "font-heading mb-2 text-xl font-semibold text-primary", children: card.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: card.summary })
          ]
        },
        card.id
      );
    }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: active && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: reducedMotion ? false : { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: reducedMotion ? void 0 : { opacity: 0, y: 8 },
        transition: { duration: 0.25 },
        className: "mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md",
        role: "region",
        "aria-label": active.title,
        children: [
          /* @__PURE__ */ jsx("h3", { className: "font-heading mb-4 text-2xl font-semibold", children: active.title }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3 text-muted-foreground", children: active.body.map((paragraph) => /* @__PURE__ */ jsx("p", { children: paragraph }, paragraph.slice(0, 24))) }),
          active.id === "tecnologias" && /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: skills.map((skill) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80",
              children: skill
            },
            skill
          )) })
        ]
      },
      active.id
    ) })
  ] });
}

const links = [
  {
    name: "GitHub",
    href: profile.github,
    icon: Github,
    label: "@gmartine32"
  },
  {
    name: "LinkedIn",
    href: profile.linkedin,
    icon: Linkedin,
    label: "/in/gianmartinezvilla"
  },
  {
    name: "Correo",
    href: profile.email,
    icon: Mail,
    label: profile.emailLabel
  },
  {
    name: "CV",
    href: profile.cvUrl,
    icon: FileDown,
    label: "Descargar CV",
    download: true
  }
];
function ContactRoom() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-6 py-20 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-heading mb-4 text-4xl font-bold md:text-6xl", children: "¿Construimos algo?" }),
    /* @__PURE__ */ jsx("p", { className: "mb-14 max-w-xl text-lg text-muted-foreground", children: "Escríbeme o revisa mi trabajo. Estoy disponible para nuevos retos remotos." }),
    /* @__PURE__ */ jsx("ul", { className: "grid w-full gap-4 sm:grid-cols-2", children: links.map((link) => {
      const Icon = link.icon;
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: link.href,
          ...link.download ? { download: "Gian-Martinez-CV.pdf" } : { target: "_blank", rel: "noopener noreferrer" },
          className: "group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-md transition hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary transition group-hover:border-primary/30", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5", "aria-hidden": true }) }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("span", { className: "block font-heading text-lg font-semibold", children: link.name }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: link.label })
            ] })
          ]
        }
      ) }, link.name);
    }) })
  ] });
}

function ExperienceRoom() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-full w-full max-w-4xl flex-col px-6 py-20", children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-heading mb-3 text-4xl font-bold md:text-6xl", children: [
        "Mi ",
        /* @__PURE__ */ jsx("span", { className: "bg-gradient-primary bg-clip-text text-transparent", children: "Experiencia" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Un recorrido por mi carrera profesional y los logros alcanzados" })
    ] }),
    /* @__PURE__ */ jsx("ol", { className: "relative space-y-8 border-l border-white/10 pl-8", children: experiences.map((exp) => /* @__PURE__ */ jsxs("li", { className: "relative", children: [
      /* @__PURE__ */ jsx("span", { className: "absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full bg-primary shadow-glow" }),
      /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm font-medium text-primary", children: exp.period }),
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-xl font-semibold", children: exp.position }),
        /* @__PURE__ */ jsx("p", { className: "mb-3 text-accent", children: exp.company }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm leading-relaxed text-muted-foreground", children: exp.description }),
        /* @__PURE__ */ jsx("ul", { className: "mb-4 space-y-1.5", children: exp.achievements.map((item) => /* @__PURE__ */ jsxs("li", { className: "text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2 text-accent", children: "•" }),
          item
        ] }, item)) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: exp.tech.map((tech) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs",
            children: tech
          },
          tech
        )) })
      ] })
    ] }, `${exp.company}-${exp.period}`)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-2 gap-4 md:grid-cols-4", children: experienceStats.map((stat) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-heading text-2xl font-bold text-primary", children: stat.value }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: stat.label })
        ]
      },
      stat.label
    )) })
  ] });
}

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);
const projectChain = [...featured, ...others];
function buildProjectRooms() {
  const rooms2 = {};
  projectChain.forEach((project, index) => {
    const id = `project-${project.id}`;
    const prevId = index === 0 ? "projects" : `project-${projectChain[index - 1].id}`;
    const nextId = index < projectChain.length - 1 ? `project-${projectChain[index + 1].id}` : void 0;
    rooms2[id] = {
      id,
      title: project.title,
      x: 1 + index + 1,
      y: 0,
      left: prevId,
      right: nextId,
      up: "projects",
      down: index === projectChain.length - 1 ? "opensource" : void 0,
      componentKey: "project-detail",
      projectId: project.id
    };
  });
  return rooms2;
}
const projectRooms = buildProjectRooms();
const firstProjectId = projectChain[0] ? `project-${projectChain[0].id}` : void 0;
const lastProjectId = projectChain[projectChain.length - 1] ? `project-${projectChain[projectChain.length - 1].id}` : void 0;
const rooms = {
  home: {
    id: "home",
    title: "Inicio",
    x: 0,
    y: 0,
    left: "about",
    right: "projects",
    componentKey: "home"
  },
  about: {
    id: "about",
    title: "Sobre mí",
    x: -1,
    y: 0,
    right: "home",
    down: "experience",
    componentKey: "about"
  },
  projects: {
    id: "projects",
    title: "Proyectos",
    x: 1,
    y: 0,
    left: "home",
    right: firstProjectId,
    down: "opensource",
    componentKey: "projects"
  },
  experience: {
    id: "experience",
    title: "Experiencia",
    x: -1,
    y: 1,
    up: "about",
    down: "contact",
    componentKey: "experience"
  },
  contact: {
    id: "contact",
    title: "Contacto",
    x: -1,
    y: 2,
    up: "experience",
    componentKey: "contact"
  },
  opensource: {
    id: "opensource",
    title: "Open Source",
    x: 1,
    y: 2,
    up: "projects",
    left: lastProjectId,
    componentKey: "opensource"
  },
  ...projectRooms
};
const DEFAULT_ROOM_ID = "home";
const roomList = Object.values(rooms);
function getRoom(id) {
  return rooms[id];
}

function resolveNeighbor(roomId, direction) {
  const room = getRoom(roomId);
  if (!room) return void 0;
  const neighborId = room[direction];
  return neighborId ? getRoom(neighborId) : void 0;
}
function getAvailableDirections(roomId) {
  const room = getRoom(roomId);
  if (!room) return [];
  return ["up", "down", "left", "right"].filter(
    (dir) => Boolean(room[dir])
  );
}
function roomFromSearchParams(search, fallback = "home") {
  const params = new URLSearchParams(search);
  const room = params.get("room");
  return room && getRoom(room) ? room : fallback;
}
function syncRoomToUrl(roomId) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (roomId === "home") {
    url.searchParams.delete("room");
  } else {
    url.searchParams.set("room", roomId);
  }
  window.history.replaceState({ room: roomId }, "", url.toString());
}

const TRANSITION_MS = 400;
const useNavigationStore = create((set, get) => ({
  currentRoomId: DEFAULT_ROOM_ID,
  isTransitioning: false,
  announcement: "Inicio",
  setTransitioning: (value) => set({ isTransitioning: value }),
  hydrateFromUrl: () => {
    if (typeof window === "undefined") return;
    const roomId = roomFromSearchParams(window.location.search);
    const room = getRoom(roomId);
    if (!room) return;
    set({
      currentRoomId: room.id,
      announcement: room.title
    });
  },
  goTo: (roomId) => {
    const { currentRoomId, isTransitioning } = get();
    if (isTransitioning || roomId === currentRoomId) return false;
    const room = getRoom(roomId);
    if (!room) return false;
    set({ isTransitioning: true, currentRoomId: room.id, announcement: room.title });
    syncRoomToUrl(room.id);
    window.setTimeout(() => {
      set({ isTransitioning: false });
    }, TRANSITION_MS);
    return true;
  },
  move: (direction) => {
    const { currentRoomId, isTransitioning, goTo } = get();
    if (isTransitioning) return false;
    const neighbor = resolveNeighbor(currentRoomId, direction);
    if (!neighbor) return false;
    return goTo(neighbor.id);
  }
}));
const CAMERA_TRANSITION_MS = TRANSITION_MS;

function HomeRoom() {
  const reducedMotion = usePrefersReducedMotion();
  const goTo = useNavigationStore((s) => s.goTo);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-full w-full max-w-4xl flex-col items-center justify-center px-6 py-20 text-center", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: reducedMotion ? false : { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "relative flex h-3 w-3", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" }),
            /* @__PURE__ */ jsx("span", { className: "relative inline-flex h-3 w-3 rounded-full bg-green-500" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium tracking-wide text-foreground/80", children: profile.status })
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "mb-3 text-lg font-light tracking-wider text-neon-blue", children: profile.greeting }),
    /* @__PURE__ */ jsx("h1", { className: "font-heading mb-4 text-5xl font-bold md:text-7xl lg:text-8xl", children: profile.name }),
    /* @__PURE__ */ jsx("h2", { className: "mb-8 text-xl font-light text-accent md:text-3xl", children: profile.title }),
    /* @__PURE__ */ jsx("div", { className: "mb-12 flex flex-wrap items-center justify-center gap-3", children: profile.stack.map((tech) => /* @__PURE__ */ jsx(
      "span",
      {
        className: "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground/85 backdrop-blur-sm",
        children: tech
      },
      tech
    )) }),
    /* @__PURE__ */ jsx("p", { className: "mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg", children: profile.bio }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => goTo("projects"),
          className: "inline-flex items-center gap-2 rounded-md bg-gradient-primary px-8 py-3 font-medium text-primary-foreground shadow transition hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          children: "Explorar"
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4", "aria-hidden": true }),
        "Flechas, WASD o desliza"
      ] })
    ] })
  ] });
}

const ICONS$1 = {
  github: Github,
  npm: Package,
  contribution: GitBranch,
  article: BookOpen
};
function OpenSourceRoom() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-full w-full max-w-4xl flex-col px-6 py-20", children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-heading mb-3 text-4xl font-bold md:text-6xl", children: [
        "Open ",
        /* @__PURE__ */ jsx("span", { className: "bg-gradient-primary bg-clip-text text-transparent", children: "Source" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Proyectos públicos, contribuciones y recursos" })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2", children: openSourceItems.map((item) => {
      const Icon = ICONS$1[item.type];
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: item.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          children: [
            /* @__PURE__ */ jsx("span", { className: "mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5", "aria-hidden": true }) }),
            /* @__PURE__ */ jsx("h2", { className: "font-heading mb-2 text-xl font-semibold", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: item.description })
          ]
        }
      ) }, item.id);
    }) })
  ] });
}

function ProjectDetailRoom({ projectId }) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-full items-center justify-center px-6", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Proyecto no encontrado" }) });
  }
  const hasGithub = project.github && project.github !== "#";
  const hasDemo = project.demo && project.demo !== "#";
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-full w-full max-w-4xl flex-col px-6 py-20", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: project.image,
        alt: "",
        loading: "lazy",
        className: "aspect-video w-full object-cover"
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "font-heading mb-4 text-3xl font-bold md:text-5xl", children: project.title }),
    /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg text-muted-foreground", children: project.description }),
    /* @__PURE__ */ jsx("div", { className: "mb-8 flex flex-wrap gap-2", children: project.tech.map((tech) => /* @__PURE__ */ jsx(
      "span",
      {
        className: "rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm",
        children: tech
      },
      tech
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 grid gap-4 md:grid-cols-2", children: [
      project.problem && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading mb-2 text-lg font-semibold text-primary", children: "Problema" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: project.problem })
      ] }),
      project.solution && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading mb-2 text-lg font-semibold text-primary", children: "Solución" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: project.solution })
      ] })
    ] }),
    project.learnings && project.learnings.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-heading mb-3 text-lg font-semibold", children: "Aprendizajes" }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: project.learnings.map((item) => /* @__PURE__ */ jsxs("li", { className: "text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "mr-2 text-accent", children: "•" }),
        item
      ] }, item)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
      hasGithub && /* @__PURE__ */ jsxs(
        "a",
        {
          href: project.github,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium transition hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          children: [
            /* @__PURE__ */ jsx(Github, { className: "h-4 w-4", "aria-hidden": true }),
            "GitHub"
          ]
        }
      ),
      hasDemo && /* @__PURE__ */ jsxs(
        "a",
        {
          href: project.demo,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          children: [
            /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4", "aria-hidden": true }),
            "Demo"
          ]
        }
      )
    ] })
  ] });
}

function ProjectsRoom() {
  const goTo = useNavigationStore((s) => s.goTo);
  const featured = projects.filter((p) => p.featured);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-full w-full max-w-5xl flex-col px-6 py-20", children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-heading mb-3 text-4xl font-bold md:text-6xl", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-primary bg-clip-text text-transparent", children: "Proyectos" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "El corazón del portfolio. Usa ← → para recorrer cada proyecto." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2", children: featured.map((project) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => goTo(`project-${project.id}`),
        className: "group overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left backdrop-blur-md transition hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-video overflow-hidden bg-muted", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: project.image,
              alt: "",
              loading: "lazy",
              className: "h-full w-full object-cover transition duration-500 group-hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-heading text-xl font-semibold", children: project.title }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "mt-1 h-5 w-5 shrink-0 text-primary opacity-70 transition group-hover:translate-x-1 group-hover:opacity-100" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 line-clamp-2 text-sm text-muted-foreground", children: project.description }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.tech.slice(0, 4).map((tech) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs",
                children: tech
              },
              tech
            )) })
          ] })
        ]
      },
      project.id
    )) }),
    /* @__PURE__ */ jsxs("p", { className: "mt-10 text-center text-sm text-muted-foreground", children: [
      projects.length,
      " proyectos · desliza a la derecha para entrar al detalle"
    ] })
  ] });
}

const SWIPE_THRESHOLD = 64;
const KEY_MAP = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  W: "up",
  s: "down",
  S: "down",
  a: "left",
  A: "left",
  d: "right",
  D: "right"
};
function isTypingTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}
function isInteractive(target) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("a, button, input, textarea, select, [role='button']")
  );
}
function getActiveScrollContainer() {
  return document.querySelector(
    '[data-room-frame][data-active="true"]'
  );
}
function useWorldControls() {
  const move = useNavigationStore((s) => s.move);
  const pointerStart = useRef(
    null
  );
  const onKeyDown = useCallback(
    (event) => {
      if (isTypingTarget(event.target)) return;
      const direction = KEY_MAP[event.key];
      if (!direction) return;
      event.preventDefault();
      move(direction);
    },
    [move]
  );
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);
  const onPointerDown = useCallback((event) => {
    if (event.button !== 0) return;
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
      interactive: isInteractive(event.target)
    };
  }, []);
  const onPointerUp = useCallback(
    (event) => {
      if (!pointerStart.current) return;
      const { x, y, interactive } = pointerStart.current;
      pointerStart.current = null;
      if (interactive) return;
      const dx = event.clientX - x;
      const dy = event.clientY - y;
      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) {
        return;
      }
      const horizontal = Math.abs(dx) > Math.abs(dy);
      if (horizontal) {
        move(dx > 0 ? "left" : "right");
        return;
      }
      const scroller = getActiveScrollContainer();
      if (scroller) {
        const atTop = scroller.scrollTop <= 0;
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
        if (dy > 0 && !atTop) return;
        if (dy < 0 && !atBottom) return;
      }
      move(dy > 0 ? "up" : "down");
    },
    [move]
  );
  const onPointerCancel = useCallback(() => {
    pointerStart.current = null;
  }, []);
  return { onPointerDown, onPointerUp, onPointerCancel };
}

function Camera({ currentRoomId, children }) {
  const reducedMotion = usePrefersReducedMotion();
  const room = getRoom(currentRoomId);
  const x = room?.x ?? 0;
  const y = room?.y ?? 0;
  return /* @__PURE__ */ jsx("div", { className: "relative h-full w-full overflow-hidden", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "absolute left-0 top-0 will-change-transform",
      animate: {
        x: `${-x * 100}vw`,
        y: `${-y * 100}vh`
      },
      transition: reducedMotion ? { duration: 0 } : {
        duration: CAMERA_TRANSITION_MS / 1e3,
        ease: [0.22, 1, 0.36, 1]
      },
      children
    }
  ) });
}

const ICONS = {
  up: ChevronUp,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight
};
const POSITIONS = {
  up: "top-6 left-1/2 -translate-x-1/2",
  down: "bottom-6 left-1/2 -translate-x-1/2",
  left: "left-4 top-1/2 -translate-y-1/2 sm:left-6",
  right: "right-4 top-1/2 -translate-y-1/2 sm:right-6"
};
const LABEL = {
  up: "arriba",
  down: "abajo",
  left: "a la izquierda",
  right: "a la derecha"
};
function HUD() {
  const currentRoomId = useNavigationStore((s) => s.currentRoomId);
  const announcement = useNavigationStore((s) => s.announcement);
  const isTransitioning = useNavigationStore((s) => s.isTransitioning);
  const move = useNavigationStore((s) => s.move);
  const room = getRoom(currentRoomId);
  const directions = getAvailableDirections(currentRoomId);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "pointer-events-none fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md",
        "aria-hidden": true,
        children: /* @__PURE__ */ jsx("p", { className: "font-heading text-sm font-medium tracking-wide text-foreground/90", children: room?.title ?? "Mundo" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", children: [
      "Habitación: ",
      announcement
    ] }),
    directions.map((direction) => {
      const Icon = ICONS[direction];
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": `Ir ${LABEL[direction]}`,
          disabled: isTransitioning,
          onClick: () => move(direction),
          className: `fixed z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-foreground shadow-elevated backdrop-blur-md transition hover:border-primary/40 hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 ${POSITIONS[direction]}`,
          children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5", "aria-hidden": true })
        },
        direction
      );
    })
  ] });
}

const HINTS = {
  up: "↑",
  down: "↓",
  left: "←",
  right: "→"
};
function NavigatorHints() {
  const currentRoomId = useNavigationStore((s) => s.currentRoomId);
  const room = getRoom(currentRoomId);
  const directions = getAvailableDirections(currentRoomId);
  if (!room || directions.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "pointer-events-none fixed left-1/2 top-16 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-md", children: [
    /* @__PURE__ */ jsx("span", { className: "mr-2 hidden sm:inline", children: "Navegar" }),
    directions.map((dir) => /* @__PURE__ */ jsx("span", { className: "mx-0.5 inline-block font-medium text-foreground/80", children: HINTS[dir] }, dir))
  ] });
}

function RoomFrame({ children, title, isActive }) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      "data-room-frame": true,
      "data-active": isActive ? "true" : "false",
      "aria-label": title,
      "aria-hidden": !isActive,
      tabIndex: isActive ? -1 : -1,
      className: "absolute inset-0 h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain",
      style: { scrollbarGutter: "stable" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsla(220,100%,60%,0.08),transparent_55%)]" }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 flex min-h-full w-full flex-col", children })
      ]
    }
  );
}

function RoomContent({
  componentKey,
  projectId
}) {
  switch (componentKey) {
    case "home":
      return /* @__PURE__ */ jsx(HomeRoom, {});
    case "about":
      return /* @__PURE__ */ jsx(AboutRoom, {});
    case "projects":
      return /* @__PURE__ */ jsx(ProjectsRoom, {});
    case "experience":
      return /* @__PURE__ */ jsx(ExperienceRoom, {});
    case "contact":
      return /* @__PURE__ */ jsx(ContactRoom, {});
    case "opensource":
      return /* @__PURE__ */ jsx(OpenSourceRoom, {});
    case "project-detail":
      return /* @__PURE__ */ jsx(ProjectDetailRoom, { projectId: projectId ?? "" });
    default:
      return null;
  }
}
function World() {
  const currentRoomId = useNavigationStore((s) => s.currentRoomId);
  const hydrateFromUrl = useNavigationStore((s) => s.hydrateFromUrl);
  const reducedMotion = usePrefersReducedMotion();
  const { onPointerDown, onPointerUp, onPointerCancel } = useWorldControls();
  useEffect(() => {
    hydrateFromUrl();
  }, [hydrateFromUrl]);
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-10 h-[100dvh] w-screen bg-background",
      role: "application",
      "aria-label": "Developer World — portfolio exploratorio",
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", "aria-hidden": true, children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-[12%] top-[18%] h-40 w-40 rounded-full bg-primary/20 blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-[20%] right-[10%] h-48 w-48 rounded-full bg-accent/15 blur-3xl" })
        ] }),
        /* @__PURE__ */ jsx(HUD, {}),
        /* @__PURE__ */ jsx(NavigatorHints, {}),
        /* @__PURE__ */ jsx(Camera, { currentRoomId, children: roomList.map((room) => {
          const isActive = room.id === currentRoomId;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute",
              style: {
                left: `${room.x * 100}vw`,
                top: `${room.y * 100}vh`,
                width: "100vw",
                height: "100vh"
              },
              children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "h-full w-full",
                  animate: reducedMotion ? { opacity: 1, scale: 1 } : {
                    opacity: isActive ? 1 : 0.55,
                    scale: isActive ? 1 : 0.985
                  },
                  transition: { duration: 0.35 },
                  children: /* @__PURE__ */ jsx(RoomFrame, { title: room.title, isActive, children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: isActive ? "pointer-events-auto" : "pointer-events-none",
                      children: /* @__PURE__ */ jsx(
                        RoomContent,
                        {
                          componentKey: room.componentKey,
                          projectId: room.projectId
                        }
                      )
                    }
                  ) })
                }
              )
            },
            room.id
          );
        }) })
      ]
    }
  );
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("http://localhost:4321");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const siteBase = Astro2.site || Astro2.url.origin;
  const canonicalURL = new URL(Astro2.url.pathname, siteBase);
  const ogImage = new URL("/img/kiex.webp", siteBase);
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="generator"', '><link rel="canonical"', '><title>Gian Mart\xEDnez - Frontend Developer & Ingeniero de Software</title><meta name="description" content="Portafolio exploratorio de Gian Mart\xEDnez. Desarrollador Full Stack, Frontend Developer e Ingeniero de Software experto en React, Astro, Next.js y ecosistema Node.js."><meta name="keywords" content="Gian Martinez, Gian Martinez Frontend, Gian Martinez Software, Gian Martinez Developer, Ingeniero de Software, Full Stack Developer, React Developer"><meta name="author" content="Gian Mart\xEDnez"><meta property="og:title" content="Portafolio de Gian Mart\xEDnez | Full Stack Developer"><meta property="og:description" content="Explora el universo profesional de Gian Mart\xEDnez: proyectos, experiencia y contacto en un mundo interactivo."><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:image"', '><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Portafolio de Gian Mart\xEDnez | Full Stack Developer"><meta name="twitter:description" content="Explora el universo profesional de Gian Mart\xEDnez: proyectos, experiencia y contacto en un mundo interactivo."><meta name="twitter:image"', '><script type="application/ld+json">', '<\/script><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">', '</head> <body class="bg-background text-foreground antialiased"> <div class="noise-bg" aria-hidden="true"></div> <main> ', ' </main> <section class="sr-only" aria-label="Contenido del portfolio para lectores y buscadores"> <h1>', " \u2014 ", "</h1> <p>", "</p> <h2>Proyectos</h2> <ul> ", " </ul> <h2>Experiencia</h2> <ul> ", " </ul> <h2>Contacto</h2> <p> <a", ">", "</a> ", " <a", ">LinkedIn</a> ", " <a", ">GitHub</a> ", " <a", '>CV</a> </p> </section> <noscript> <div class="mx-auto max-w-3xl space-y-8 px-6 py-16"> <h1 class="font-heading text-4xl font-bold">', '</h1> <p class="text-lg text-muted-foreground">', "</p> <p>", '</p> <p>\nActiva JavaScript para explorar el portfolio como un mundo de habitaciones conectadas,\n					o usa los enlaces de contacto.\n</p> <ul class="space-y-2"> <li><a', ">GitHub</a></li> <li><a", ">LinkedIn</a></li> <li><a", ">Email</a></li> <li><a", ">Descargar CV</a></li> </ul> </div> </noscript> </body></html>"])), addAttribute(Astro2.generator, "content"), addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "content"), addAttribute(ogImage, "content"), addAttribute(ogImage, "content"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Gian Mart\xEDnez",
    "jobTitle": "Frontend Developer & Software Engineer",
    "url": "https://gianmartinez.dev",
    "sameAs": [
      "https://www.linkedin.com/in/gianmartinezvilla",
      "https://github.com/gmartine32"
    ],
    "knowsAbout": ["Frontend Development", "Software Engineering", "React", "Next.js", "Astro", "Full Stack"]
  })), renderHead(), renderComponent($$result, "World", World, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Devitech/Desktop/Projects/PV/my-portafolio/src/components/world/World.tsx", "client:component-export": "default" }), profile.name, profile.title, profile.bio, projects.map((project) => renderTemplate`<li> <strong>${project.title}</strong>: ${project.description} </li>`), experiences.map((exp) => renderTemplate`<li> <strong>${exp.position}</strong> en ${exp.company} (${exp.period}). ${exp.description} </li>`), addAttribute(profile.email, "href"), profile.emailLabel, " \xB7 ", addAttribute(profile.linkedin, "href"), " \xB7 ", addAttribute(profile.github, "href"), " \xB7 ", addAttribute(profile.cvUrl, "href"), profile.name, profile.subtitle, profile.bio, addAttribute(profile.github, "href"), addAttribute(profile.linkedin, "href"), addAttribute(profile.email, "href"), addAttribute(profile.cvUrl, "href"));
}, "C:/Users/Devitech/Desktop/Projects/PV/my-portafolio/src/pages/index.astro", void 0);

const $$file = "C:/Users/Devitech/Desktop/Projects/PV/my-portafolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
