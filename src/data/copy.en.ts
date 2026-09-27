import type { ContentCopy } from "./copy";

export const enCopy: ContentCopy = {
  profile: {
    title: "Senior Full Stack & AI-Augmented Engineer",
    subtitle: "Complex Problem Solver | Frontend & Mobile Specialist | Systems Engineer",
    greeting: "Hi, I'm",
    status: "Available for new challenges",
    bio: "Systems Engineer and Senior Full Stack Engineer passionate about dissecting and solving complex engineering challenges. Pioneer in AI-augmented workflows (Cursor, Claude Code, RAG, Spec-Driven Development), building scalable, resilient, and high-impact systems with React, Next.js, React Native, Node.js, Spring Boot, Go, and PostgreSQL.",
    location: "Colombia, available remotely",
  },
  aboutCards: {
    historia: {
      title: "Story",
      summary: "4+ years breaking down hard problems and shipping digital products.",
      body: [
        "I am a Systems Engineer and Developer with more than 4 years of experience delivering high-impact digital solutions. I thrive on complex problems: where others see friction or blockers, I take pride in discovering the root cause and designing resilient, elegant software systems.",
        "I have led and evolved critical platforms across energy (750+ Terpel stations), government, and commercial sectors, combining clean architecture, SOLID principles, and cutting-edge AI-accelerated engineering workflows.",
      ],
    },
    estudios: {
      title: "Studies",
      summary: "Systems Engineering · blockchain-verified official credential.",
      body: [
        "Systems Engineering degree from Universidad de la Costa (CUC), graduated with academic honors, focused on software architecture, distributed systems, and product development.",
        "Official graduation credential issued by the university and publicly verifiable on blockchain through Certika.",
        "Continuous learning in generative AI, RAG pipelines, cloud architectures, and production-grade observability.",
      ],
    },
    tecnologias: {
      title: "Technologies & AI",
      summary: "React, Next, Spring Boot, Go, Cloud, and AI workflows.",
      body: [
        "AI-Augmented Development: Cursor, Claude Code, GitHub Copilot, Prompt & Context Engineering, Spec-Driven Development, RAG pipelines, and LLM APIs.",
        "Frontend & Mobile: React, Next.js, React Native (Expo/EAS), Electron, TypeScript, Tailwind CSS.",
        "Backend & Data: Node.js, Spring Boot (Java), Go, Python (FastAPI), PostgreSQL, PL/SQL, Kafka, Docker, Nginx, AWS, and Azure.",
      ],
    },
    filosofia: {
      title: "Philosophy",
      summary: "Passion for problems, focus on solutions, and technical excellence.",
      body: [
        "Problems are not obstacles; they are the genesis of innovation. I immerse myself into understanding the business and user problem deeply so that the architecture directly resolves it.",
        "I combine clean code (SOLID, Clean Architecture) with agentic AI tooling to accelerate delivery speed while preserving strict test coverage and maintainability.",
      ],
    },
    pasatiempos: {
      title: "Hobbies",
      summary: "Exploring UX, prototypes, and AI experimentation.",
      body: [
        "I enjoy exploring emergent AI developer tools, experimenting with agentic pipelines, and analyzing how modern games design interaction and feedback.",
        "I also love prototyping independent ideas and optimizing developer productivity tooling.",
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
    santacruz: {
      title: "Carnes Santa Cruz",
      description:
        "Corporate landing page built on WordPress / CMS for a premium meat boutique, delivered within a 3-month timeline following client requirements.",
      problem:
        "Establish a corporate digital footprint with an engaging product catalog, fast load times, and local SEO in a 3-month timeframe.",
      solution:
        "Tailored WordPress CMS development with 100% responsive design, WebP asset optimization, technical SEO, and production hosting configuration.",
      learnings: ["Custom WordPress CMS", "Conversion & local SEO", "Phased delivery over 3 months"],
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
      position: "Senior Full Stack & AI-Accelerated Engineer",
      period: "Nov 2021 – Present",
      description:
        "Fuel-management systems for 750+ Terpel stations; React/Next/RN/Electron stack, Node, Spring Boot and a migration to Go, with PostgreSQL, PL/SQL, and Kafka under goal-oriented Scrum.",
      achievements: [
        "Operational gains on systems used by 750+ stations (−40% load, −50% delivery time)",
        "Frontend with React, Next.js, React Native, and Electron; backends in Node.js, Spring Boot, and a migration to Go",
        "Data and messaging with PostgreSQL, PL/SQL, and Kafka",
        "Goal-adapted Scrum; CI/CD and AI-assisted workflows (−50% cycle time)",
      ],
    },
    {
      position: "Founder & AI / Full Stack Engineer",
      period: "Jan 2024 – Jan 2025",
      description:
        "Cross-platform EPUB and PDF reader with AI: React Native, Spring Boot, and FastAPI for agents, RAG, and indexing.",
      achievements: [
        "EPUB/PDF reading product with AI assistance in React Native",
        "Spring Boot and Python/FastAPI backends with a RAG pipeline",
        "Accelerated development using agentic workflows (Cursor, Claude Code) and executable specs",
      ],
    },
    {
      position: "Full Stack Developer (Contract by Projects)",
      company: "Populi S.A. – Independent",
      period: "2024 – 2025",
      description:
        "Personally responsible for Populi's development as an independent; fast end-to-end deliveries at production quality.",
      achievements: [
        "Premios Perrenque: Next.js + Spring Boot, payment gateway, email, and PostgreSQL",
        "Haceb landing: React + Vite and a Node.js backend",
        "ODR (routes/transport): React + Vite, Node.js, and Google Maps / Routes API",
      ],
    },
    {
      position: "Full Stack Developer (Consulting)",
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
      position: "Web Developer (Independent)",
      company: "Carnes Santa Cruz – Independent",
      period: "Oct 2024 – Dec 2024",
      description:
        "Developed and deployed a corporate landing page in WordPress CMS for Carnes Santa Cruz within a 3-month delivery window.",
      achievements: [
        "Responsive corporate landing with meat cuts catalog and conversion focus",
        "WebP asset optimization and fast load times",
        "Production hosting setup and local technical SEO",
      ],
    },
    {
      position: "Full Stack Developer (Temporary Project)",
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
      position: "Frontend Developer (Freelance)",
      company: "Begima (Mexico) – Freelance",
      period: "Sep 2023 – Nov 2023",
      description: "Ecommerce platform and promotional landing focused on conversion.",
      achievements: [
        "18% increase in online sales with the ecommerce platform",
        "Landing optimized for conversion (+12% leads)",
      ],
    },
    {
      position: "Full Stack Developer (Freelance)",
      period: "Jan 2022 – Jul 2022",
      description: "Reporting service for Etsy shops with Node.js.",
      achievements: [
        "50% reduction in data-analysis time",
        "API integrations and custom software for centralization",
      ],
    },
    {
      position: "Frontend Developer (Freelance)",
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
