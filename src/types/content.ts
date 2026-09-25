/**
 * Content model for the whole site.
 * Every page reads from typed data in `src/content/*` — to update the portfolio
 * you edit data, not JSX. Adding a project = adding one object to `projects.ts`.
 */

export type SocialKey = "email" | "linkedin" | "github" | "whatsapp";

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
  handle: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  tagline: string;
  description: string;
  url: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  whatsapp: string; // digits only, international format
  cvPath: string;
  /** Optional intro video (e.g. "/video/intro.mp4" or a YouTube embed URL). Leave empty to hide the section. */
  introVideo?: string;
  /** Cover image shown before the intro video plays (e.g. "/images/intro-cover.webp"). */
  introVideoPoster?: string;
  socials: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface Experience {
  company: string;
  role: string;
  mode: "Remote" | "Hybrid" | "On-site";
  start: string;
  end: string;
  reportsTo: string;
  summary: string;
  highlights: string[];
  stack: string[];
  metrics?: { value: string; label: string }[];
  /** Slug of a related case study in projects.ts */
  caseStudy?: string;
}

export interface SkillGroup {
  title: string;
  accent: Accent;
  description: string;
  skills: { name: string; icon?: string; level: "Expert" | "Advanced" | "Proficient" }[];
}

export type Accent = "blue" | "green" | "purple" | "amber" | "rose" | "cyan";

export interface Service {
  title: string;
  accent: Accent;
  icon: "layout" | "server" | "layers" | "gauge" | "shield" | "users";
  summary: string;
  points: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  /** Mobile screenshots are portrait and are laid out differently. */
  orientation?: "landscape" | "portrait";
}

export interface Project {
  slug: string;
  title: string;
  industry: string;
  /** Professional = employer product, Client = freelance client, Portfolio = own live project. */
  category: "Professional" | "Client" | "Portfolio";
  /** Your role on this project (defaults to "Full-Stack Developer"). */
  role?: string;
  status: string;
  tagline: string;
  overview: string;
  features: string[];
  contributions: string[];
  stack: string[];
  skills: string[];
  accent: Accent;
  featured?: boolean;
  images: ProjectImage[];
  caseStudyPdf?: string;
  liveUrl?: string;
  /** Headline results shown as stat tiles on the case study. */
  metrics?: { value: string; label: string }[];
  /** Optional walkthrough video (mp4 path in /public or YouTube embed URL) with a cover image. */
  video?: { src: string; poster?: string };
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  detail?: string;
  kind: "degree" | "certification" | "school";
}
