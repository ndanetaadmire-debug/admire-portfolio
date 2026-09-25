import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { AboutStrip } from "@/components/home/AboutStrip";
import { TechMarquee } from "@/components/home/TechMarquee";
import { CtaBand } from "@/components/home/CtaBand";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { SectionHeading, Highlight } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/skills";
import { featuredProjects } from "@/content/projects";
import { experience } from "@/content/experience";

/**
 * Home = the "hero page". It previews each section and links to its own page,
 * so every route stays small, fast and individually shareable.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutStrip />
      <TechMarquee />

      <section className="container-page" aria-labelledby="services-heading">
        <SectionHeading
          eyebrow="What I do"
          title={
            <span id="services-heading">
              Services that <Highlight>ship outcomes</Highlight>
            </span>
          }
          description="From pixel-perfect interfaces to secure APIs and the pipelines that deploy them."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {services.slice(0, 3).map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button href="/services" variant="ghost" icon={<ArrowRight className="size-4" aria-hidden />}>
            All services
          </Button>
        </div>
      </section>

      <section className="container-page mt-28" aria-labelledby="work-heading">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Selected work"
            title={
              <span id="work-heading">
                Featured <Highlight>case studies</Highlight>
              </span>
            }
            description="A live client store and full-stack products across fintech and e-commerce."
            className="text-center md:text-left"
          />
          <Link
            href="/projects"
            className="group text-accent-soft inline-flex shrink-0 items-center gap-2 text-sm font-medium"
          >
            View all 9 projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 100}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-page mt-28" aria-labelledby="exp-heading">
        <SectionHeading
          eyebrow="Where I am now"
          title={
            <span id="exp-heading">
              Currently building at <Highlight>Gerko</Highlight>
            </span>
          }
        />
        <Reveal className="mx-auto mt-12 max-w-4xl">
          <ExperienceCard job={experience[0]} compact />
        </Reveal>
        <div className="mt-10 flex justify-center">
          <Button href="/experience" variant="ghost" icon={<ArrowRight className="size-4" aria-hidden />}>
            Full career timeline
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
