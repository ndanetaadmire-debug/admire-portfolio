import type { Experience } from "@/types/content";

export const experience: Experience[] = [
  {
    company: "Gerko",
    role: "Full-Stack Engineer",
    mode: "Remote",
    start: "Jun 2023",
    end: "Present",
    reportsTo: "Reports to the CTO · mentors a team of 3 junior developers",
    summary:
      "Leading end-to-end development of a multi-tenant healthcare Practice Management SaaS used by clinics for scheduling, records, billing and reviews.",
    highlights: [
      "Spearheaded full-stack development of a multi-tenant healthcare Practice Management SaaS, translating business requirements into scalable React, Node.js, Express.js and PostgreSQL solutions.",
      "Designed and maintained a reusable React component library with Webpack and Jest, improving UI consistency and lifting development velocity by 20%.",
      "Led telemetry-driven performance work on Core Web Vitals, cutting initial page load times by 35% and improving SEO.",
      "Designed secure, high-throughput REST APIs and Node.js microservices supporting real-time sync across segregated patient databases.",
      "Introduced automated component and integration testing that reduced production regression bottlenecks by 15%.",
      "Reviewed code and mentored junior developers on React, TypeScript, API design, testing, debugging and Git workflows.",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Webpack", "Jest"],
    caseStudy: "gerko",
    metrics: [
      { value: "35%", label: "faster initial load" },
      { value: "20%", label: "dev velocity gain" },
      { value: "15%", label: "fewer regressions" },
    ],
  },
  {
    company: "Sasol",
    role: "React Full-Stack Developer",
    mode: "Hybrid",
    start: "Apr 2021",
    end: "May 2023",
    reportsTo: "Reported to the Engineering Delivery Lead · cross-functional Agile pod",
    summary:
      "Delivered features and production support for enterprise web applications with a focus on responsive UX, accessibility and reliability.",
    highlights: [
      "Delivered end-to-end features for enterprise apps using React, Next.js and TypeScript with an emphasis on accessibility, reliability and maintainability.",
      "Integrated interactive task creation, dynamic forms and real-time field-worker geolocation tracking into the workforce hub over WebSockets.",
      "Optimised complex PostgreSQL queries, reducing latency by 40% for high-volume operational reporting.",
      "Debugged complex React state and rendering issues, contributing to 99.9% application uptime.",
      "Partnered with UI/UX designers and backend engineers on REST integration, secure authorisation flows and releases.",
    ],
    stack: ["React", "Next.js", "TypeScript", "PostgreSQL", "WebSockets", "REST"],
    metrics: [
      { value: "40%", label: "lower query latency" },
      { value: "99.9%", label: "uptime" },
    ],
  },
  {
    company: "Tata Consultancy Services",
    role: "Junior Full-Stack Developer",
    mode: "Remote",
    start: "Jan 2020",
    end: "Feb 2021",
    reportsTo: "Reported to the Regional Systems Engineering Manager",
    summary:
      "Frontend and API development for regional financial-services clients, including the RCS Merchant Portal and Standard Bank Engineering Connect App.",
    highlights: [
      "Built responsive interfaces with React and React Native, implementing Redux state management for transaction-focused apps.",
      "Built and documented RESTful endpoints connecting modern frontends to legacy financial databases and enterprise systems.",
      "Contributed to testing, debugging, environment troubleshooting and rendering optimisation within financial compliance requirements.",
    ],
    stack: ["React", "React Native", "Redux", "REST APIs", "SQL"],
  },
];
