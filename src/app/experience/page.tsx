import { Download } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Highlight } from "@/components/ui/SectionHeading";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "Full-Stack Engineer at Gerko, React Full-Stack Developer at Sasol and Junior Full-Stack Developer at TCS — 6+ years of production experience.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title={
          <>
            6+ years of <Highlight>shipping</Highlight>
          </>
        }
        description="Healthcare SaaS, energy-sector enterprise apps and fintech — with measurable results at each stop."
      >
        <Button href={site.cvPath} variant="ghost" download icon={<Download className="size-4" aria-hidden />}>
          Download full CV
        </Button>
      </PageHeader>

      <section className="container-page">
        <ol className="border-line relative mx-auto max-w-4xl space-y-8 border-l pl-6 sm:pl-10">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.company} delay={i * 80} className="relative">
              <span
                className="border-accent bg-bg absolute top-9 -left-[31px] grid size-4 place-items-center rounded-full border-2 sm:-left-[47px]"
                aria-hidden
              >
                {i === 0 && <span className="bg-accent size-1.5 animate-ping rounded-full" />}
              </span>
              <ExperienceCard job={job} />
            </Reveal>
          ))}
        </ol>
      </section>
      <CtaBand />
    </>
  );
}
