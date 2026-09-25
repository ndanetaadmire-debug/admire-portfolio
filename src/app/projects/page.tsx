import { PageHeader } from "@/components/ui/PageHeader";
import { Highlight } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { CtaBand } from "@/components/home/CtaBand";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Nine case studies across fintech, e-commerce, logistics, EdTech, PropTech, HR, retail and social — built with React, Next.js, Node.js and more.",
  path: "/projects",
});

export default function ProjectsPage() {
  // Cards render on the server; the grid only handles filtering in the browser.
  const cards = Object.fromEntries(
    projects.map((p, i) => [p.slug, <ProjectCard key={p.slug} project={p} priority={i < 3} />]),
  );
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={
          <>
            Ten case files, <Highlight>one bar of craft</Highlight>
          </>
        }
        description="Professional SaaS work, a live client store and full-stack products across nine industries. Open any card for the full case study."
      />
      <section className="container-page">
        <ProjectGrid
          projects={projects.map(({ slug, stack, category }) => ({ slug, stack, category }))}
          cards={cards}
        />
        <p className="text-subtle mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed">
          Gerko and Lwazi Hair screens are from the live products. Portfolio projects are shown with illustrative UI
          screens built to reflect each app&apos;s real features.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
