import { PageHeader } from "@/components/ui/PageHeader";
import { Highlight } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { CtaBand } from "@/components/home/CtaBand";
import { skillGroups } from "@/content/skills";
import { accentStyles, cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Skills",
  description:
    "React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, AWS, testing and CI/CD — the toolkit I use in production.",
  path: "/skills",
});

const levelWidth = { Expert: "w-full", Advanced: "w-4/5", Proficient: "w-3/5" };

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="My skills"
        title={
          <>
            The <Highlight>toolkit</Highlight> behind the work
          </>
        }
        description="Technologies I use in production every week, grouped by where they sit in the stack."
      />
      <section className="container-page">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const a = accentStyles[g.accent];
            return (
              <Reveal
                as="li"
                key={g.title}
                delay={(i % 3) * 100}
                className="border-line bg-surface relative overflow-hidden rounded-3xl border p-7"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -top-16 -left-16 size-40 rounded-full opacity-40 blur-3xl",
                    a.glow,
                  )}
                  aria-hidden
                />
                <h2
                  className={cn(
                    "relative bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent",
                    a.gradient,
                  )}
                >
                  {g.title}
                </h2>
                <p className="text-muted relative mt-2 text-sm">{g.description}</p>
                <ul className="relative mt-6 space-y-4">
                  {g.skills.map((s) => (
                    <li key={s.name}>
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.05]">
                          <TechIcon icon={s.icon} label={s.name} className="size-[18px]" />
                        </span>
                        <span className="flex-1 text-sm text-white/90">{s.name}</span>
                        <span className="text-subtle text-xs">{s.level}</span>
                      </div>
                      <div className="mt-2 ml-12 h-1 overflow-hidden rounded-full bg-white/[0.06]" aria-hidden>
                        <div className={cn("h-full rounded-full opacity-80", a.bg, levelWidth[s.level])} />
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
