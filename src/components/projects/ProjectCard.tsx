import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { accentStyles, cn } from "@/lib/utils";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const a = accentStyles[project.accent];
  const cover = project.images[0];
  return (
    <article className="group border-line bg-surface hover:border-line-strong relative flex h-full flex-col overflow-hidden rounded-3xl border p-3 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
      <div className="bg-surface-2 relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden />
        <span
          className={cn(
            "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md",
            project.category === "Professional"
              ? "bg-accent/90 text-white"
              : project.category === "Client"
                ? "bg-green/90 text-black"
                : "bg-black/60 text-white/90",
          )}
        >
          {project.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <p className={cn("font-mono text-xs tracking-[0.18em] uppercase", a.text)}>{project.industry}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="text-muted mt-2 line-clamp-2 text-sm leading-relaxed">{project.tagline}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((t) => (
            <li key={t} className="rounded-md bg-white/[0.05] px-2 py-1 text-xs text-white/75">
              {t}
            </li>
          ))}
          {project.stack.length > 4 && (
            <li className="text-subtle rounded-md px-1 py-1 text-xs">+{project.stack.length - 4}</li>
          )}
        </ul>
        <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-white/90">
          View case study
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </article>
  );
}
