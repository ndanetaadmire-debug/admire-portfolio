import type { NavItem, SiteConfig, Stat } from "@/types/content";

export const site: SiteConfig = {
  name: "Admire T. Ndaneta",
  shortName: "Admire Ndaneta",
  initials: "AN",
  role: "Full-Stack Software Engineer",
  tagline: "I build fast, scalable web products end to end.",
  description:
    "Full-Stack Software Engineer with 6+ years building scalable SaaS and enterprise web apps with React, Next.js, TypeScript, Node.js, PostgreSQL and AWS.",
  // Set NEXT_PUBLIC_SITE_URL in Vercel → Settings → Environment Variables once you have a custom domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://admiredevportfolio.vercel.app",
  location: "South Africa · Remote",
  availability: "Open to full-stack roles & contract work",
  email: "ndanetaadmire@gmail.com",
  phone: "+27 81 844 1047",
  whatsapp: "27818441047",
  cvPath: "/docs/Admire_Ndaneta_CV.pdf",
  introVideo: "",
  socials: [
    {
      key: "email",
      label: "Email",
      href: "mailto:ndanetaadmire@gmail.com",
      handle: "ndanetaadmire@gmail.com",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/27818441047",
      handle: "+27 81 844 1047",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/admire-ndaneta-a3272711a",
      handle: "in/admire-ndaneta",
    },
  ],
};

export const nav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const stats: Stat[] = [
  { value: 6, suffix: "+", label: "Years shipping production code" },
  { value: 9, label: "Case studies across 8 industries" },
  { value: 35, suffix: "%", label: "Faster page loads delivered at Gerko" },
];
