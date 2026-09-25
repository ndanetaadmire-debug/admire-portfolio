import Image from "next/image";
import { Activity, Check, Download, Gauge, MousePointer2, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import portrait from "@/assets/admire.webp";

const trust = ["6+ years shipping production code", "React · Node.js · PostgreSQL", "Remote-ready from South Africa"];

const badges = [
  { icon: Gauge, value: "35%", label: "faster page loads", pos: "left-0 top-[18%] sm:-left-6", delay: "0s" },
  { icon: Activity, value: "99.9%", label: "uptime delivered", pos: "right-0 top-[8%] sm:-right-4", delay: "1.5s" },
  { icon: Users, value: "3 devs", label: "mentored at Gerko", pos: "bottom-[10%] right-2 sm:-right-2", delay: "3s" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:min-h-[92vh] lg:pt-40 lg:pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <p className="border-line text-muted mb-7 inline-flex items-center gap-2 rounded-full border bg-white/[0.04] px-4 py-1.5 text-xs">
            <span className="relative flex size-2">
              <span className="bg-green absolute inline-flex size-full animate-ping rounded-full opacity-75" />
              <span className="bg-green relative inline-flex size-2 rounded-full" />
            </span>
            {site.availability}
          </p>

          <h1 className="relative text-[2.6rem] leading-[1.12] font-bold tracking-tight sm:text-6xl lg:text-[4.4rem]">
            <span className="sr-only">
              {site.name}, {site.role}.{" "}
            </span>
            <span className="text-shine block">Scalable SaaS,</span>
            <span className="text-shine relative mx-auto block w-fit [animation-delay:0.4s] lg:mx-0">
              Clean APIs,
              {/* Name tag with cursor, as in the reference design */}
              <span
                aria-hidden
                className="animate-float absolute -top-3 left-full ml-3 hidden items-start sm:inline-flex"
              >
                <MousePointer2 className="size-5 -rotate-12 fill-white/80 text-white" />
                <span className="bg-accent mt-4 rounded-full px-3 py-1 font-mono text-[10px] font-medium tracking-widest whitespace-nowrap text-white uppercase shadow-lg">
                  {site.shortName}
                </span>
              </span>
            </span>
            <span className="text-shine block [animation-delay:0.8s]">Fast Interfaces.</span>
          </h1>

          <p className="text-muted mx-auto mt-7 max-w-xl text-base leading-relaxed text-pretty sm:text-lg lg:mx-0">
            I&apos;m <span className="font-medium text-white">Admire Ndaneta</span>, a full-stack engineer who designs,
            builds and ships React, Next.js and Node.js products end to end — from multi-tenant healthcare SaaS to
            real-time dashboards and live e-commerce.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href="/projects" variant="pill">
              View my work
            </Button>
            <Button href={site.cvPath} variant="ghost" download icon={<Download className="size-4" aria-hidden />}>
              Download CV
            </Button>
          </div>

          <ul className="text-muted mt-8 flex flex-col items-center gap-2 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="text-accent-soft size-4" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Portrait with concentric rings */}
        <div className="relative mx-auto aspect-square w-full max-w-[26rem] lg:max-w-[30rem]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden
              className="animate-pulse-ring absolute rounded-full border border-white/[0.06] bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.06),transparent_60%)] shadow-[inset_0_0_60px_rgb(0_0_0/0.6)]"
              style={{ inset: `${i * 12}%`, animationDelay: `${i * 0.6}s` }}
            />
          ))}
          <div className="bg-accent/25 absolute inset-[22%] rounded-full blur-3xl" aria-hidden />
          <div className="group border-line-strong absolute inset-[18%] overflow-hidden rounded-full border">
            <Image
              src={portrait}
              alt="Portrait of Admire Ndaneta"
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 20rem, 60vw"
              className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>

          {badges.map(({ icon: Icon, value, label, pos, delay }) => (
            <div
              key={label}
              className={`animate-float border-line bg-surface/90 absolute flex items-center gap-2.5 rounded-2xl border px-3 py-2 shadow-xl backdrop-blur-md sm:gap-3 sm:px-3.5 sm:py-2.5 ${pos}`}
              style={{ animationDelay: delay }}
            >
              <span className="bg-accent/20 text-accent-soft grid size-9 place-items-center rounded-xl">
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-sm font-semibold">{value}</span>
                <span className="text-muted block text-[11px]">{label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
