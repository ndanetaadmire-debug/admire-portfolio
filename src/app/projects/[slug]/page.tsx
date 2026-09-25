import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ExternalLink, FileText } from "lucide-react";
import { Gallery } from "@/components/projects/Gallery";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { getAdjacentProjects, getProject, projects } from "@/content/projects";
import { accentStyles, cn } from "@/lib/utils";

// Every case study is pre-rendered to static HTML at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.industry}`,
    description: project.tagline,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [{ url: project.images[0].src, width: 1600, height: 1000, alt: project.images[0].alt }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const a = accentStyles[project.accent];
  const { prev, next } = getAdjacentProjects(slug);
  const cover = project.images[0];

  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
        <div
          className={cn(
            "pointer-events-none absolute top-0 left-1/2 h-72 w-[40rem] max-w-full -translate-x-1/2 rounded-full opacity-30 blur-[120px]",
            a.bg,
          )}
          aria-hidden
        />
        <div className="container-page relative">
          <nav aria-label="Breadcrumb" className="text-muted mb-8 text-sm">
            <Link href="/projects" className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <ArrowLeft className="size-4" aria-hidden /> All projects
            </Link>
          </nav>
          <p className={cn("font-mono text-xs tracking-[0.2em] uppercase", a.text)}>{project.industry}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-6xl">{project.title}</h1>
          <p className="text-muted mt-5 max-w-2xl text-lg leading-relaxed text-pretty">{project.tagline}</p>

          <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Role", project.role ?? "Full-Stack Developer"],
              [
                "Type",
                { Professional: "Live company product", Client: "Live client project", Portfolio: "Live project" }[
                  project.category
                ],
              ],
              ["Status", project.status],
              ["Stack", `${project.stack.length} technologies`],
            ].map(([k, v]) => (
              <div key={k} className="border-line rounded-2xl border bg-white/[0.03] px-4 py-3">
                <dt className="text-subtle text-xs tracking-wider uppercase">{k}</dt>
                <dd className="mt-1 text-sm text-white/90">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button href={project.liveUrl} variant="primary" icon={<ExternalLink className="size-4" aria-hidden />}>
                {project.category === "Professional" ? "Visit product" : "Visit live site"}
              </Button>
            )}
            {project.caseStudyPdf && (
              <Button
                href={project.caseStudyPdf}
                variant="ghost"
                icon={<FileText className="size-4" aria-hidden />}
                target="_blank"
              >
                Case study PDF
              </Button>
            )}
          </div>
        </div>
      </header>

      {project.metrics && (
        <section aria-label="Results" className="container-page mb-10">
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="glass rounded-3xl p-5 sm:p-6">
                <dt className="sr-only">{m.label}</dt>
                <dd className={cn("text-3xl font-bold tracking-tight sm:text-4xl", a.text)}>{m.value}</dd>
                <dd className="text-muted mt-1 text-sm">{m.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="container-page">
        {project.video ? (
          <VideoPlayer
            src={project.video.src}
            poster={project.video.poster ?? cover.src}
            title={`${project.title} — walkthrough`}
            subtitle="Press play to see it in action"
          />
        ) : (
          <div className="border-line bg-surface relative overflow-hidden rounded-3xl border p-2 sm:p-3">
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl",
                cover.orientation === "portrait" ? "aspect-[9/16] max-h-[80vh]" : "aspect-[16/10]",
              )}
            >
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(min-width: 1216px) 1180px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        )}
      </div>

      <section className="container-page mt-20 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
          <p className="text-muted mt-4 leading-relaxed">{project.overview}</p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight">Key features</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.features.map((f) => (
              <li
                key={f}
                className="border-line bg-surface flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed text-white/85"
              >
                <Check className={cn("mt-0.5 size-4 shrink-0", a.text)} aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} as="aside" className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-3xl p-6">
            <h2 className="font-semibold">My contributions</h2>
            <ul className="mt-4 space-y-3">
              {project.contributions.map((c) => (
                <li key={c} className="text-muted flex gap-3 text-sm leading-relaxed">
                  <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", a.bg)} aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-line bg-surface rounded-3xl border p-6">
            <h2 className="font-semibold">Tech stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li key={t} className="border-line rounded-full border bg-white/[0.04] px-3 py-1 text-xs text-white/85">
                  {t}
                </li>
              ))}
            </ul>
            <h2 className="mt-6 font-semibold">Skills demonstrated</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.skills.map((t) => (
                <li key={t} className={cn("rounded-full px-3 py-1 text-xs", a.soft, a.text)}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="container-page mt-20" aria-labelledby="screens-heading">
        <h2 id="screens-heading" className="mb-8 text-2xl font-semibold tracking-tight">
          Selected screens
        </h2>
        <Gallery images={project.images} />
      </section>

      <nav aria-label="More projects" className="container-page mt-20 grid gap-4 sm:grid-cols-2">
        {[
          { p: prev, label: "Previous", Icon: ArrowLeft },
          { p: next, label: "Next", Icon: ArrowRight },
        ].map(({ p, label, Icon }) => (
          <Link
            key={label}
            href={`/projects/${p.slug}`}
            className={cn(
              "group border-line bg-surface hover:border-line-strong flex items-center gap-4 rounded-3xl border p-6 transition-colors",
              label === "Next" && "sm:flex-row-reverse sm:text-right",
            )}
          >
            <span className="group-hover:bg-accent grid size-11 shrink-0 place-items-center rounded-full bg-white/[0.06] transition-colors">
              <Icon className="size-4" aria-hidden />
            </span>
            <span>
              <span className="text-subtle block text-xs tracking-wider uppercase">{label} project</span>
              <span className="mt-1 block font-semibold">{p.title}</span>
            </span>
          </Link>
        ))}
      </nav>

      <CtaBand />
    </>
  );
}
