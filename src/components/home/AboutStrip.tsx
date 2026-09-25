import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/content/site";
import { CodeCard } from "./CodeCard";

export function AboutStrip() {
  return (
    <section className="container-page" aria-labelledby="intro-heading">
      <Reveal className="glass grid gap-8 rounded-[2rem] p-4 sm:p-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:p-8">
        <CodeCard />
        <div className="flex flex-col justify-center gap-8 px-2 pb-2 lg:px-0">
          <div>
            <h2 id="intro-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Product-minded engineer, <span className="text-muted">obsessed with quality.</span>
            </h2>
            <p className="text-muted mt-4 leading-relaxed">
              Currently a Full-Stack Engineer at Gerko, reporting to the CTO and mentoring three junior developers while
              building a multi-tenant healthcare SaaS. I care about clean architecture, measurable performance and
              interfaces people enjoy using.
            </p>
            <Link
              href="/about"
              className="group text-accent-soft mt-5 inline-flex items-center gap-2 text-sm font-medium"
            >
              More about me
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <dl className="border-line grid grid-cols-3 gap-3 border-t pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
                <dd className="text-muted mt-1 text-xs leading-snug sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
