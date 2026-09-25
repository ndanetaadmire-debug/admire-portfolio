import type { Education, Service, SkillGroup } from "@/types/content";

/** `icon` is a simple-icons export name (see src/components/ui/TechIcon.tsx). */
export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    accent: "blue",
    description: "Accessible, responsive interfaces and reusable component systems.",
    skills: [
      { name: "React", icon: "siReact", level: "Expert" },
      { name: "Next.js", icon: "siNextdotjs", level: "Expert" },
      { name: "TypeScript", icon: "siTypescript", level: "Expert" },
      { name: "JavaScript (ES6+)", icon: "siJavascript", level: "Expert" },
      { name: "Tailwind CSS", icon: "siTailwindcss", level: "Advanced" },
      { name: "Redux", icon: "siRedux", level: "Advanced" },
      { name: "React Native", icon: "siReact", level: "Proficient" },
      { name: "HTML5 / CSS3 / Sass", icon: "siHtml5", level: "Expert" },
    ],
  },
  {
    title: "Backend & APIs",
    accent: "green",
    description: "Secure REST APIs, microservices and real-time features.",
    skills: [
      { name: "Node.js", icon: "siNodedotjs", level: "Expert" },
      { name: "Express.js", icon: "siExpress", level: "Expert" },
      { name: "REST & Microservices", level: "Advanced" },
      { name: "WebSockets", icon: "siSocketdotio", level: "Advanced" },
      { name: "Django", icon: "siDjango", level: "Proficient" },
    ],
  },
  {
    title: "Databases",
    accent: "purple",
    description: "Relational modelling, multi-tenant data and query optimisation.",
    skills: [
      { name: "PostgreSQL", icon: "siPostgresql", level: "Expert" },
      { name: "MongoDB", icon: "siMongodb", level: "Advanced" },
      { name: "MySQL", icon: "siMysql", level: "Advanced" },
      { name: "SQL query optimisation", level: "Advanced" },
    ],
  },
  {
    title: "Cloud & DevOps",
    accent: "cyan",
    description: "Shipping safely with automated pipelines and preview deploys.",
    skills: [
      { name: "AWS", level: "Advanced" },
      { name: "Vercel", icon: "siVercel", level: "Expert" },
      { name: "GitHub Actions", icon: "siGithubactions", level: "Advanced" },
      { name: "Git & GitHub", icon: "siGit", level: "Expert" },
      { name: "Webpack", icon: "siWebpack", level: "Advanced" },
    ],
  },
  {
    title: "Testing & Quality",
    accent: "rose",
    description: "Confidence through automated tests and thoughtful review.",
    skills: [
      { name: "Jest", icon: "siJest", level: "Expert" },
      { name: "React Testing Library", icon: "siTestinglibrary", level: "Expert" },
      { name: "Integration testing", level: "Advanced" },
      { name: "Code review", level: "Expert" },
    ],
  },
  {
    title: "Engineering & AI",
    accent: "amber",
    description: "Architecture, performance and modern AI-assisted workflows.",
    skills: [
      { name: "SaaS & multi-tenant architecture", level: "Advanced" },
      { name: "Core Web Vitals & SEO", level: "Expert" },
      { name: "Agile & mentorship", level: "Advanced" },
      { name: "AI-assisted & agentic coding", level: "Advanced" },
      { name: "Schema validation", level: "Advanced" },
    ],
  },
];

/** Flat list used by the tech marquee on the home page. */
export const marqueeTech = [
  { name: "React", icon: "siReact" },
  { name: "Next.js", icon: "siNextdotjs" },
  { name: "TypeScript", icon: "siTypescript" },
  { name: "Node.js", icon: "siNodedotjs" },
  { name: "Express", icon: "siExpress" },
  { name: "PostgreSQL", icon: "siPostgresql" },
  { name: "MongoDB", icon: "siMongodb" },
  { name: "Tailwind CSS", icon: "siTailwindcss" },
  { name: "Redux", icon: "siRedux" },
  { name: "Jest", icon: "siJest" },
  { name: "GitHub Actions", icon: "siGithubactions" },
  { name: "Vercel", icon: "siVercel" },
  { name: "Socket.io", icon: "siSocketdotio" },
  { name: "Shopify", icon: "siShopify" },
];

export const services: Service[] = [
  {
    title: "Frontend Engineering",
    accent: "blue",
    icon: "layout",
    summary: "Turning designs into fast, accessible React and Next.js interfaces that feel great on every screen size.",
    points: [
      "React, Next.js & TypeScript",
      "Reusable component libraries",
      "Accessibility (WCAG) & SEO",
      "Responsive, mobile-first UI",
    ],
  },
  {
    title: "Backend & API Development",
    accent: "green",
    icon: "server",
    summary:
      "Designing secure, well-documented REST APIs, microservices and real-time features on Node.js with PostgreSQL or MongoDB.",
    points: [
      "Node.js & Express.js APIs",
      "Auth, RBAC & idempotency",
      "WebSockets & real-time sync",
      "Schema design & query tuning",
    ],
  },
  {
    title: "Full-Stack SaaS Delivery",
    accent: "purple",
    icon: "layers",
    summary:
      "Owning features end to end — from requirements and data model to deployment — for multi-tenant SaaS and enterprise products.",
    points: [
      "Multi-tenant architecture",
      "End-to-end feature ownership",
      "AWS & Vercel deployments",
      "CI/CD with GitHub Actions",
    ],
  },
  {
    title: "Performance Optimisation",
    accent: "amber",
    icon: "gauge",
    summary:
      "Measuring first, then fixing: telemetry-driven Core Web Vitals work, code splitting and query optimisation.",
    points: ["Core Web Vitals audits", "Code splitting & caching", "Database latency reduction"],
  },
  {
    title: "Testing & Quality",
    accent: "rose",
    icon: "shield",
    summary: "Automated component and integration tests plus review practices that stop regressions before they ship.",
    points: ["Jest & React Testing Library", "Integration test suites", "Code review standards"],
  },
  {
    title: "Technical Leadership",
    accent: "cyan",
    icon: "users",
    summary: "Mentoring developers, explaining trade-offs to non-technical stakeholders and keeping teams shipping.",
    points: ["Mentoring junior engineers", "Stakeholder communication", "Agile delivery"],
  },
];

export const workProcess = [
  {
    step: "01",
    title: "Understand",
    body: "Clarify the business goal, users and constraints before writing a line of code.",
  },
  {
    step: "02",
    title: "Design",
    body: "Model the data, define the API contract and agree on the UI states up front.",
  },
  {
    step: "03",
    title: "Build",
    body: "Ship in small, tested, reviewed increments behind preview deployments.",
  },
  {
    step: "04",
    title: "Measure",
    body: "Monitor Core Web Vitals, errors and usage — then iterate on what the data says.",
  },
];

export const education: Education[] = [
  {
    title: "BSc Computer Science",
    institution: "IU International University of Applied Sciences",
    period: "In progress · Expected 2027",
    kind: "degree",
  },
  {
    title: "React — The Complete Guide (Hooks, Router, Redux)",
    institution: "Udemy",
    period: "2023",
    kind: "certification",
  },
  {
    title: "Full Stack Web Developer Bootcamp (Node.js, Express, Databases)",
    institution: "Udemy",
    period: "2022",
    kind: "certification",
  },
  {
    title: "A-Levels — Mathematics, Physics, Chemistry",
    institution: "Cambridge International Examinations",
    period: "2012",
    kind: "school",
  },
];
