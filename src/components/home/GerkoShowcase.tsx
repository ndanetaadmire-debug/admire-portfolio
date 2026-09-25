import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock, Sparkles, Stethoscope } from "lucide-react";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";

/**
 * Home-page spotlight for Gerko: a browser-framed view of the live product
 * with a floating dashboard window, next to the current-role card.
 */
export function GerkoShowcase() {
  const gerko = getProject("gerko");
  const job = experience.find((e) => e.caseStudy === "gerko") ?? experience[0];
  if (!gerko) return null;
  const [site, dashboard] = gerko.images;

  return (
    <section className="container-page mt-28" aria-labelledby="gerko-heading">
      <SectionHeading
        eyebrow="Where I am now"
        title={
          <span id="gerko-heading">
            Currently building at <Highlight>Gerko</Highlight>
          </span>
        }
        description="Practice management software for health practitioners — built and scaled by a small team I help lead."
      />

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <Reveal className="relative pb-10 sm:pb-16">
          {/* Glow behind the frame */}
          <div
            className="bg-accent/25 pointer-events-none absolute inset-x-10 top-10 bottom-16 rounded-full blur-[90px]"
            aria-hidden
          />

          {/* Browser frame */}
          <div className="border-line-strong relative overflow-hidden rounded-2xl border bg-[#0b0b0c] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
            <div className="border-line flex items-center gap-3 border-b px-4 py-3">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[#fc605b]" />
                <span className="size-2.5 rounded-full bg-[#fdbc40]" />
                <span className="size-2.5 rounded-full bg-[#33c748]" />
              </span>
              <span className="text-muted mx-auto flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-1 font-mono text-xs">
                <Lock className="text-green size-3" aria-hidden /> app.gerko.io
              </span>
              <span className="w-10" aria-hidden />
            </div>
            <div className="relative aspect-[16/10]">
              <Image
                src={site.src}
                alt={site.alt}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Floating dashboard window */}
          {dashboard && (
            <div className="animate-float border-line-strong absolute -bottom-2 left-3 w-[52%] overflow-hidden rounded-xl border bg-white shadow-2xl sm:-left-6">
              <div className="flex items-center gap-2 border-b border-black/10 bg-[#f4f6fb] px-3 py-1.5">
                <span className="size-1.5 rounded-full bg-[#fc605b]" />
                <span className="size-1.5 rounded-full bg-[#fdbc40]" />
                <span className="size-1.5 rounded-full bg-[#33c748]" />
                <span className="ml-1 text-[10px] font-medium text-slate-600 sm:text-xs">Practice analytics</span>
              </div>
              <div className="relative aspect-[4/3]">
                <Image src={dashboard.src} alt={dashboard.alt} fill sizes="340px" className="object-cover object-top" />
              </div>
            </div>
          )}

          {/* Floating feature chips */}
          <div className="absolute -right-2 bottom-4 hidden flex-col gap-2 sm:flex">
            <span className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-white/90 shadow-xl">
              <Stethoscope className="text-accent-soft size-3.5" aria-hidden /> 15+ health professions
            </span>
            <span className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-white/90 shadow-xl [animation-delay:1s]">
              <Sparkles className="text-amber size-3.5" aria-hidden /> AI medical scribe
            </span>
          </div>
        </Reveal>

        <Reveal delay={120} className="space-y-5">
          <ExperienceCard job={job} compact />
          <div className="flex flex-wrap gap-3">
            <a
              href={gerko.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-line-strong inline-flex items-center gap-2 rounded-full border bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition hover:bg-white/[0.07]"
            >
              Visit app.gerko.io <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/experience"
              className="text-muted inline-flex items-center gap-1.5 px-2 py-2.5 text-sm hover:text-white"
            >
              Full career timeline <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
