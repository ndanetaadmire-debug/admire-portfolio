import { Briefcase, MapPin } from "lucide-react";
import type { Experience } from "@/types/content";

export function ExperienceCard({ job, compact = false }: { job: Experience; compact?: boolean }) {
  const current = job.end === "Present";
  return (
    <article className="border-line bg-surface relative rounded-3xl border p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sky font-mono text-xs tracking-[0.18em] uppercase">
            {job.start} — {job.end}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{job.role}</h3>
          <p className="text-muted mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="size-3.5" aria-hidden /> {job.company}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden /> {job.mode}
            </span>
          </p>
        </div>
        {current && (
          <span className="bg-green/10 text-green ring-green/30 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1">
            <span className="bg-green size-1.5 rounded-full" /> Current role
          </span>
        )}
      </div>

      <p className="mt-5 leading-relaxed text-white/85">{job.summary}</p>
      <p className="text-subtle mt-2 text-sm">{job.reportsTo}</p>

      {job.metrics && (
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {job.metrics.map((m) => (
            <div key={m.label} className="border-line rounded-2xl border bg-white/[0.03] px-4 py-3">
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-accent-soft text-2xl font-bold tracking-tight">{m.value}</dd>
              <dd className="text-muted text-xs">{m.label}</dd>
            </div>
          ))}
        </dl>
      )}

      {!compact && (
        <ul className="mt-6 space-y-3">
          {job.highlights.map((h) => (
            <li key={h} className="text-muted flex gap-3 text-sm leading-relaxed">
              <span className="bg-accent-soft mt-2 size-1.5 shrink-0 rounded-full" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {job.stack.map((t) => (
          <li key={t} className="rounded-md bg-white/[0.05] px-2 py-1 text-[11px] text-white/75">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}
