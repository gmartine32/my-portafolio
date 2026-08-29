import type { ContentCopy } from "./copy";

export const esCopy: ContentCopy = {
  profile: {
    title: "Full Stack Engineer",
    subtitle: "Frontend Developer | Ingeniero en Sistemas",
    greeting: "Hola, soy",
    status: "Disponible para nuevos retos",
    bio: "Ingeniero en Sistemas y Desarrollador Full Stack (React, Next.js, React Native, Electron, Node.js, Spring Boot, Go y PostgreSQL). Experto en despliegue con Docker y Nginx; experiencia cloud y entregas end-to-end.",
    location: "Colombia, disponible remoto",
  },
  aboutCards: {
    historia: {
      title: "Historia",
      summary: "Más de 4 años construyendo productos digitales.",
      body: [
        "Soy Ingeniero en Sistemas y Desarrollador con más de 4 años de experiencia creando soluciones digitales modernas. Desde mis inicios me apasionó el desarrollo frontend, pero he expandido mis habilidades hacia el backend, despliegues y bases de datos.",
        "He trabajado en sectores energético, gubernamental y comercial, aplicando principios SOLID, arquitectura limpia y arquitectura hexagonal.",
      ],
    },
    estudios: {
      title: "Estudios",
      summary: "Ingeniería en Sistemas y aprendizaje continuo.",
      body: [
        "Formación como Ingeniero en Sistemas con foco en ingeniería de software, arquitectura y desarrollo de productos.",
        "Aprendizaje continuo en frontend moderno, cloud, DevOps y prácticas de calidad de código.",
      ],
    },
    tecnologias: {
      title: "Tecnologías",
      summary: "React, TypeScript, Node y cloud.",
      body: [
        "Stack principal: React, Next.js, React Native, Electron, TypeScript, Node.js, Spring Boot y Go.",
        "También trabajo con Docker, Nginx, PostgreSQL, PL/SQL, Kafka, MongoDB, AWS y Azure para entregar soluciones completas.",
      ],
    },
    filosofia: {
      title: "Filosofía",
      summary: "Código limpio, UX clara, impacto real.",
      body: [
        "Priorizo experiencias fluidas, accesibles y mantenibles. Domino arquitecturas como SOLID, MVVM y Clean Architecture.",
        "Aplico enfoques como Atomic Design para sistemas de UI consistentes, creando impacto y experiencias memorables.",
      ],
    },
    pasatiempos: {
      title: "Pasatiempos",
      summary: "Explorar UX, juegos y prototipos.",
      body: [
        "Me gusta explorar interfaces, prototipar ideas y analizar cómo los videojuegos resuelven navegación y feedback.",
        "También disfruto documentar aprendizajes y experimentar con animaciones y herramientas nuevas.",
      ],
    },
  },
  projects: {
    docusaas: {
      description:
        "Software a la medida multitenant para gestión documental empresarial, con frontend moderno y backend robusto.",
      problem: "Necesidad de una plataforma documental multiempresa, segura y escalable.",
      solution:
        "Arquitectura multitenant con Next.js en el frontend, Spring Boot en el backend y PostgreSQL como base de datos.",
      learnings: ["Multitenancy", "Software a la medida", "Integración Next.js + Spring Boot"],
    },
    papyria: {
      description:
        "Lector multiplataforma de EPUB y PDF con IA: React Native, Spring Boot y FastAPI para agentes, RAG e indexación.",
      problem: "Leer EPUB/PDF en móvil con asistencia de IA y conocimiento contextual del documento.",
      solution:
        "App React Native de lectura inteligente respaldada por Spring Boot y un servicio Python/FastAPI para agentes IA y RAG.",
      learnings: ["Lectura EPUB/PDF", "Arquitectura de agentes", "RAG en producción"],
    },
    "terpel-pos": {
      description:
        "Sistema POS móvil para estaciones de servicio Terpel: inventario, ventas y reportes orientados a reducir tiempos de operación.",
      problem: "Agilizar operaciones POS en estaciones de servicio con flujos claros y confiables.",
      solution:
        "Mantenimiento y evolución del POS móvil en React Native durante mi etapa en Devitech / Terpel, enfocando UX y tiempos de venta.",
      learnings: ["Flujos POS móviles", "Operación en campo", "Mantenimiento de producto a escala"],
    },
    "premios-perrenque": {
      description:
        "Plataforma end-to-end para la campaña Premios Perrenque: frontend Next.js, backend Spring Boot, pagos, correos y PostgreSQL.",
      problem:
        "Operar la campaña Premios Perrenque con inscripción, administración y cobros en producción.",
      solution:
        "Frontend Next.js y backend Spring Boot con pasarela de pago, envío de correos y PostgreSQL; entrega rápida end-to-end para Populi.",
      learnings: ["Next.js + Spring Boot", "Pasarelas de pago", "Entregas rápidas productivas"],
    },
    haceb: {
      description:
        "Landing page para Haceb con React y Vite; el registro de asistencia se resolvió con un backend en Node.",
      problem: "Dar presencia digital a Haceb y capturar registros de asistencia de forma simple.",
      solution:
        "Frontend en React + Vite y API de registro de asistencia en Node.js (desarrollo independiente para Populi).",
      learnings: ["Landings con Vite", "Formularios de registro", "Integración frontend–Node"],
    },
    odr: {
      description:
        "Aplicación de bitácora y rutas para logística de transporte, con React + Vite, Node.js e integración de Google Maps / Routes API.",
      problem: "Registrar trayectos y tiempos de ruta en operaciones de transporte de forma confiable.",
      solution:
        "App React + Vite con backend Node.js e integración de Google Maps / Routes API; entrega rápida end-to-end para Populi.",
      learnings: ["Google Maps / Routes API", "Logística de rutas", "Entregas rápidas productivas"],
    },
    devitech: {
      description:
        "Desarrollo de landing page corporativa para una empresa tecnológica, optimizada para SEO y con diseño 100% responsivo.",
      problem: "Necesidad de una presencia corporativa moderna, rápida y orientada a conversión.",
      solution:
        "Landing con Next.js + WordPress Headless, animaciones fluidas, formularios y métricas de conversión.",
      learnings: [
        "SEO técnico en headless CMS",
        "Arquitectura escalable de landing",
        "Optimización de conversión",
      ],
    },
    kiexchange: {
      description:
        "Landing para plataforma de intercambio de criptomonedas con datos de mercado en tiempo real.",
      problem: "Comunicar valor de producto crypto con datos vivos y UX clara.",
      solution: "Integración de API en tiempo real y diseño adaptable enfocado en rendimiento.",
      learnings: ["Datos en tiempo real", "UI con Ant Design", "Optimización de carga"],
    },
    "nvd-searcher": {
      description:
        "Aplicación web para consultar vulnerabilidades de la National Vulnerability Database (NVD).",
      problem: "Consultar y filtrar grandes volúmenes de datos técnicos de vulnerabilidades.",
      solution: "Filtrado dinámico con Axios y UI responsiva orientada a rendimiento.",
      learnings: ["Consumo de APIs densas", "Filtrado client-side", "UI técnica usable"],
    },
    movisai: {
      description:
        "Plataforma web para caracterización socioeconómica en San Andrés con visualización de datos.",
      problem: "Analizar datos socioeconómicos de forma rápida y segmentada.",
      solution: "Integración de API y gráficos dinámicos para exploración de datos.",
      learnings: ["Visualización de datos", "APIs gubernamentales", "UX de análisis"],
    },
    "censo-sai": {
      description:
        "App móvil censal con soporte offline y sincronización automática para más de 30 mil vehículos.",
      problem: "Levantar censo vehicular en condiciones de conectividad intermitente.",
      solution: "Offline-first con sincronización automática y base de datos relacional.",
      learnings: ["Offline sync", "React Native a escala", "Oracle + Node"],
    },
  },
  experiences: [
    {
      position: "Full Stack Developer",
      period: "Nov 2021 - Presente",
      description:
        "Sistemas de gestión de combustible para más de 750 estaciones Terpel; stack React/Next/RN/Electron, Node, Spring Boot y migración a Go, con PostgreSQL, PL/SQL y Kafka bajo Scrum orientado a objetivos.",
      achievements: [
        "Mejora operativa en sistemas usados por 750+ estaciones (−40% carga, −50% entrega)",
        "Frontend con React, Next.js, React Native y Electron; backends Node.js, Spring Boot y migración a Go",
        "Datos y mensajería con PostgreSQL, PL/SQL y Kafka",
        "Scrum adaptado a objetivos; CI/CD con Azure DevOps (−50% tiempos de entrega)",
      ],
    },
    {
      position: "Founder & Full Stack Engineer",
      period: "Ene 2024 - Presente",
      description:
        "Lector multiplataforma de EPUB y PDF con IA: React Native, Spring Boot y FastAPI para agentes, RAG e indexación.",
      achievements: [
        "Producto de lectura EPUB/PDF con asistencia de IA en React Native",
        "Backends Spring Boot y Python/FastAPI con pipeline RAG",
        "Arquitectura limpia, sincronización y flujos de producto móvil",
      ],
    },
    {
      position: "Full Stack Developer",
      period: "2025 - Presente",
      description:
        "Encargado personal de los desarrollos de Populi en modalidad independiente; entregas end-to-end rápidas con calidad productiva.",
      achievements: [
        "Premios Perrenque: Next.js + Spring Boot, pasarela de pago, correos y PostgreSQL",
        "Landing Haceb: React + Vite y backend Node.js",
        "ODR (rutas/transporte): React + Vite, Node.js e integración Google Maps / Routes API",
      ],
    },
    {
      position: "Desarrollador Full Stack",
      period: "Mayo 2025 - Junio 2025",
      description:
        "Desarrollé sitio corporativo en 30 días con Next.js y WordPress Headless, mejorando UX y SEO técnico.",
      achievements: [
        "Sitio corporativo desarrollado en 30 días con Next.js y WordPress Headless",
        "Mejora de SEO técnico y +20% tráfico orgánico",
        "Optimización de tiempos de carga en 35%",
        "Despliegue seguro en VPS con Nginx",
      ],
    },
    {
      position: "Full Stack Developer",
      period: "Sep 2024 - Dic 2024",
      description:
        "Plataforma web de caracterización vehicular y app móvil publicada en tiendas oficiales.",
      achievements: [
        "Reducción del tiempo de registro en 40% con plataforma web",
        "Desarrollo y despliegue de app móvil Android/iOS en tiendas oficiales",
      ],
    },
    {
      position: "Frontend Developer",
      period: "Sep 2023 - Nov 2023",
      description: "Plataforma ecommerce y landing promocional orientadas a conversión.",
      achievements: [
        "Aumento de ventas en línea en 18% con plataforma ecommerce",
        "Landing optimizada para conversión (+12% leads)",
      ],
    },
    {
      position: "Full Stack Developer",
      period: "Ene 2022 - Jul 2022",
      description: "Servicio de reportería para tiendas Etsy con Node.js.",
      achievements: [
        "Reducción en 50% del tiempo de análisis de datos",
        "Integración de APIs y software propio para centralización",
      ],
    },
    {
      position: "Frontend Developer",
      period: "Ene 2022 - Jul 2022",
      description: "Landing promocional con despliegue optimizado en hosting propio.",
      achievements: [
        "Aumento en 15% de inscripciones",
        "Despliegue optimizado mejorando rendimiento y SEO",
      ],
    },
  ],
  experienceStats: [
    { label: "Años de Experiencia" },
    { label: "Proyectos Completados" },
    { label: "Tecnologías Dominadas" },
    { label: "Clientes Satisfechos" },
  ],
  openSource: {
    "nvd-challenge": {
      title: "NVD Searcher",
      description: "Cliente React para consultar vulnerabilidades NVD con filtrado dinámico.",
    },
    "github-profile": {
      title: "GitHub @gmartine32",
      description: "Repositorios públicos, experimentos y código abierto.",
    },
    "npm-placeholder": {
      title: "Paquetes NPM",
      description: "Espacio para librerías y utilidades publicadas (próximamente).",
    },
    "articles-placeholder": {
      title: "Artículos y notas",
      description: "Escritos técnicos sobre frontend, arquitectura y DX.",
    },
  },
};
