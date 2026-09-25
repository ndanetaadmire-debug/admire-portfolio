import { TechIcon } from "@/components/ui/TechIcon";
import { marqueeTech } from "@/content/skills";

/** Infinite CSS marquee — the list is rendered twice and translated -50%. */
export function TechMarquee() {
  return (
    <section aria-label="Technologies I work with" className="py-16 sm:py-20">
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused]">
          {[...marqueeTech, ...marqueeTech].map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              aria-hidden={i >= marqueeTech.length}
              className="border-line bg-surface text-muted flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm"
            >
              <TechIcon icon={t.icon} label={t.name} className="size-5" />
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
