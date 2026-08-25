import type { ContentCopy } from "./copy";

export const enCopy: ContentCopy = {
  profile: {
    title: "Frontend Engineer",
    subtitle: "Frontend Developer | Systems Engineer",
    greeting: "Hi, I'm",
    status: "Available for new challenges",
    bio: "Systems Engineer and Full Stack Developer (React, Next.js, React Native, Electron, Node.js, Spring Boot, Go, and PostgreSQL). Experienced in Docker and Nginx deployments, cloud work, and end-to-end delivery.",
    location: "Colombia, available remotely",
  },
  aboutCards: {
    historia: {
      title: "Story",
      summary: "4+ years building digital products.",
      body: [
        "I'm a Systems Engineer and developer with more than 4 years of experience creating modern digital solutions. I started in love with frontend, then grew into backend, deployments, and databases.",
        "I have worked in energy, government, and commercial sectors, applying SOLID principles, clean architecture, and hexagonal architecture.",
      ],
    },
    estudios: {
      title: "Studies",
      summary: "Systems Engineering and continuous learning.",
      body: [
        "Trained as a Systems Engineer with a focus on software engineering, architecture, and product development.",
        "Ongoing learning in modern frontend, cloud, DevOps, and code-quality practices.",
      ],
    },
    tecnologias: {
      title: "Technologies",
      summary: "React, TypeScript, Node, and cloud.",
      body: [
        "Core stack: React, Next.js, React Native, Electron, TypeScript, Node.js, Spring Boot, and Go.",
        "I also work with Docker, Nginx, PostgreSQL, PL/SQL, Kafka, MongoDB, AWS, and Azure to ship complete solutions.",
      ],
    },
    filosofia: {
      title: "Philosophy",
      summary: "Clean code, clear UX, real impact.",
      body: [
        "I prioritize fluid, accessible, and maintainable experiences. I work with architectures such as SOLID, MVVM, and Clean Architecture.",
        "I apply approaches like Atomic Design for consistent UI systems, aiming for memorable experiences and real impact.",
      ],
    },
    pasatiempos: {
      title: "Hobbies",
      summary: "Exploring UX, games, and prototypes.",
      body: [
        "I enjoy exploring interfaces, prototyping ideas, and studying how games solve navigation and feedback.",
        "I also like documenting what I learn and experimenting with animation and new tools.",
      ],
    },
  },
  projects: {
    docusaas: {
      description:
        "Custom multitenant software for enterprise document management, with a modern frontend and a robust backend.",
      problem: "Need for a secure, scalable, multi-company document platform.",
      solution:
        "Multitenant architecture with Next.js on the frontend, Spring Boot on the backend, and PostgreSQL as the database.",
      learnings: ["Multitenancy", "Custom software", "Next.js + Spring Boot integration"],
    },
    papyria: {
      description:
        "Cross-platform EPUB and PDF reader with AI: React Native, Spring Boot, and FastAPI for agents, RAG, and indexing.",
      problem: "Read EPUB/PDF on mobile with AI assistance and contextual knowledge of the document.",
      solution:
        "A React Native intelligent reading app backed by Spring Boot and a Python/FastAPI service for AI agents and RAG.",
      learnings: ["EPUB/PDF reading", "Agent architecture", "RAG in production"],
    },
    "terpel-pos": {
      title: "TERPEL Mobile POS",
      description:
        "Mobile POS system for Terpel service stations: inventory, sales, and reports aimed at reducing operation times.",
      problem: "Speed up POS operations at service stations with clear, reliable flows.",
      solution:
        "Maintenance and evolution of the React Native mobile POS during my time at Devitech / Terpel, focusing on UX and checkout time.",
      learnings: ["Mobile POS flows", "Field operations", "Product maintenance at scale"],
    },
    "premios-perrenque": {
      description:
        "End-to-end platform for the Premios Perrenque campaign: Next.js frontend, Spring Boot backend, payments, email, and PostgreSQL.",
      problem:
        "Run the Premios Perrenque campaign with registration, admin, and payments in production.",
      solution:
        "Next.js frontend and Spring Boot backend with a payment gateway, email delivery, and PostgreSQL; a fast end-to-end delivery for Populi.",
      learnings: ["Next.js + Spring Boot", "Payment gateways", "Fast production deliveries"],
    },
    haceb: {
      title: "Haceb landing",
      description:
        "Landing page for Haceb with React and Vite; attendance registration was handled by a Node backend.",
      problem: "Give Haceb a digital presence and capture attendance in a simple way.",
      solution:
        "React + Vite frontend and a Node.js attendance API (independent work for Populi).",
      learnings: ["Vite landings", "Registration forms", "Frontend–Node integration"],
    },
    odr: {
      title: "ODR – Routes and transport",
      description:
        "Logbook and routing app for transport logistics, with React + Vite, Node.js, and Google Maps / Routes API.",
      problem: "Record trips and route times in transport operations reliably.",
      solution:
        "React + Vite app with a Node.js backend and Google Maps / Routes API; a fast end-to-end delivery for Populi.",
      learnings: ["Google Maps / Routes API", "Route logistics", "Fast production deliveries"],
    },
    devitech: {
      title: "Devitech landing page",
      description:
        "Corporate landing page for a tech company, optimized for SEO with a fully responsive design.",
      problem: "Need for a modern, fast, conversion-oriented corporate presence.",
      solution:
        "Landing with Next.js + WordPress Headless, fluid animations, forms, and conversion metrics.",
      learnings: [
        "Technical SEO on a headless CMS",
        "Scalable landing architecture",
        "Conversion optimization",
      ],
    },
    kiexchange: {
      title: "KIEXCHANGE landing page",
      description:
        "Landing for a cryptocurrency exchange with real-time market data.",
      problem: "Communicate crypto product value with live data and clear UX.",
      solution: "Real-time API integration and an adaptive design focused on performance.",
      learnings: ["Real-time data", "Ant Design UI", "Load optimization"],
    },
    "nvd-searcher": {
      title: "NVD – Technical challenge",
      description:
        "Web app for querying vulnerabilities from the National Vulnerability Database (NVD).",
      problem: "Query and filter large volumes of technical vulnerability data.",
      solution: "Dynamic filtering with Axios and a responsive, performance-oriented UI.",
      learnings: ["Dense API consumption", "Client-side filtering", "Usable technical UI"],
    },
    movisai: {
      description:
        "Web platform for socioeconomic characterization in San Andrés with data visualization.",
      problem: "Analyze socioeconomic data quickly and in segments.",
      solution: "API integration and dynamic charts for data exploration.",
      learnings: ["Data visualization", "Government APIs", "Analytics UX"],
    },
    "censo-sai": {
      description:
        "Census mobile app with offline support and automatic sync for more than 30 thousand vehicles.",
      problem: "Run a vehicle census under intermittent connectivity.",
      solution: "Offline-first with automatic synchronization and a relational database.",
      learnings: ["Offline sync", "React Native at scale", "Oracle + Node"],
    },
  },
  experiences: [
    {
      position: "Full Stack Developer",
      period: "Nov 2021 – Present",
      description:
        "Fuel-management systems for 750+ Terpel stations; React/Next/RN/Electron stack, Node, Spring Boot and a migration to Go, with PostgreSQL, PL/SQL, and Kafka under goal-oriented Scrum.",
      achievements: [
        "Operational gains on systems used by 750+ stations (−40% load, −50% delivery time)",
        "Frontend with React, Next.js, React Native, and Electron; backends in Node.js, Spring Boot, and a migration to Go",
        "Data and messaging with PostgreSQL, PL/SQL, and Kafka",
        "Goal-adapted Scrum; CI/CD with Azure DevOps (−50% delivery times)",
      ],
    },
    {
      position: "Founder & Full Stack Engineer",
      period: "Jan 2024 – Present",
      description:
        "Cross-platform EPUB and PDF reader with AI: React Native, Spring Boot, and FastAPI for agents, RAG, and indexing.",
      achievements: [
        "EPUB/PDF reading product with AI assistance in React Native",
        "Spring Boot and Python/FastAPI backends with a RAG pipeline",
        "Clean architecture, sync, and mobile product flows",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "Populi S.A. – Independent",
      period: "2025 – Present",
      description:
        "Personally responsible for Populi's development as an independent; fast end-to-end deliveries at production quality.",
      achievements: [
        "Premios Perrenque: Next.js + Spring Boot, payment gateway, email, and PostgreSQL",
        "Haceb landing: React + Vite and a Node.js backend",
        "ODR (routes/transport): React + Vite, Node.js, and Google Maps / Routes API",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "Devitech – One-off project",
      period: "May 2025 – June 2025",
      description:
        "Built a corporate site in 30 days with Next.js and WordPress Headless, improving UX and technical SEO.",
      achievements: [
        "Corporate site delivered in 30 days with Next.js and WordPress Headless",
        "Technical SEO improvements and +20% organic traffic",
        "35% faster load times",
        "Secure VPS deploy with Nginx",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "MoviSAI – Gov. of San Andrés",
      period: "Sep 2024 – Dec 2024",
      description:
        "Web platform for vehicle characterization and a mobile app published on official stores.",
      achievements: [
        "40% faster registration time with the web platform",
        "Built and shipped an Android/iOS app to official stores",
      ],
    },
    {
      position: "Frontend Developer",
      company: "Begima (Mexico) – Freelance",
      period: "Sep 2023 – Nov 2023",
      description: "Ecommerce platform and promotional landing focused on conversion.",
      achievements: [
        "18% increase in online sales with the ecommerce platform",
        "Landing optimized for conversion (+12% leads)",
      ],
    },
    {
      position: "Full Stack Developer",
      period: "Jan 2022 – Jul 2022",
      description: "Reporting service for Etsy shops with Node.js.",
      achievements: [
        "50% reduction in data-analysis time",
        "API integrations and custom software for centralization",
      ],
    },
    {
      position: "Frontend Developer",
      period: "Jan 2022 – Jul 2022",
      description: "Promotional landing with an optimized deploy on self-hosted infrastructure.",
      achievements: [
        "15% increase in sign-ups",
        "Optimized deploy improving performance and SEO",
      ],
    },
  ],
  experienceStats: [
    { label: "Years of Experience" },
    { label: "Completed Projects" },
    { label: "Technologies Mastered" },
    { label: "Satisfied Clients" },
  ],
  openSource: {
    "nvd-challenge": {
      title: "NVD Searcher",
      description: "React client for querying NVD vulnerabilities with dynamic filtering.",
    },
    "github-profile": {
      title: "GitHub @gmartine32",
      description: "Public repositories, experiments, and open source.",
    },
    "npm-placeholder": {
      title: "NPM packages",
      description: "Space for published libraries and utilities (coming soon).",
    },
    "articles-placeholder": {
      title: "Articles and notes",
      description: "Technical writing on frontend, architecture, and DX.",
    },
  },
};
