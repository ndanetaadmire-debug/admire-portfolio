import { Gauge, Layers, LayoutTemplate, Server, ShieldCheck, Users, Check } from "lucide-react";
import type { Service } from "@/types/content";
import { accentStyles, cn } from "@/lib/utils";

const icons = {
  layout: LayoutTemplate,
  server: Server,
  layers: Layers,
  gauge: Gauge,
  shield: ShieldCheck,
  users: Users,
};

/** Card with a coloured glow in the corner and a gradient title (reference-design signature). */
export function ServiceCard({ service }: { service: Service }) {
  const a = accentStyles[service.accent];
  const Icon = icons[service.icon];
  return (
    <article className="group border-line bg-surface hover:border-line-strong relative h-full overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-1">
      <div
        className={cn(
          "pointer-events-none absolute -top-10 -right-10 size-40 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
          a.glow,
        )}
        aria-hidden
      />
      <span className={cn("relative mb-6 grid size-12 place-items-center rounded-2xl ring-1", a.soft, a.ring, a.text)}>
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className={cn("relative bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent", a.gradient)}>
        {service.title}
      </h3>
      <p className="text-muted relative mt-3 text-sm leading-relaxed">{service.summary}</p>
      <ul className="relative mt-6 space-y-2.5">
        {service.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-white/85">
            <Check className={cn("mt-0.5 size-4 shrink-0", a.text)} aria-hidden />
            {p}
          </li>
        ))}
      </ul>
    </article>
  );
}
