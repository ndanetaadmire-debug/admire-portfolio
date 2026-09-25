import Image from "next/image";
import { Award, GraduationCap, MapPin, School, Download } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { education, workProcess } from "@/content/skills";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import portrait from "@/assets/admire.webp";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Background, approach and education of Admire Ndaneta, Full-Stack Software Engineer based in South Africa.",
  path: "/about",
});

const values = [
  { title: "Ownership", body: "I take features from a vague requirement to a monitored production release." },
  { title: "Clarity", body: "Readable code, typed contracts and docs so the next engineer moves faster." },
  { title: "Measurable quality", body: "Tests, Core Web Vitals and uptime — quality you can put a number on." },
];

const eduIcon = { degree: GraduationCap, certification: Award, school: School };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About me"
        title={
          <>
            Engineer, mentor, <Highlight>builder.</Highlight>
          </>
        }
        description="The short version: I turn business problems into reliable, fast software — and help teams do the same."
      />

      <section className="container-page grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="conic-border rounded-[2rem] p-2">
            <Image
              src={portrait}
              alt="Admire Ndaneta"
              placeholder="blur"
              sizes="(min-width: 1024px) 24rem, 90vw"
              className="aspect-square w-full rounded-[1.6rem] object-cover"
            />
          </div>
          <p className="text-muted mt-4 flex items-center justify-center gap-2 text-sm">
            <MapPin className="text-accent-soft size-4" aria-hidden /> {site.location}
          </p>
        </Reveal>

        <Reveal delay={100} className="text-muted space-y-5 text-base leading-relaxed sm:text-lg">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Hi, I&apos;m Admire — a full-stack engineer with 6+ years in production.
          </h2>
          <p>
            I design, build, test and maintain scalable enterprise web applications and SaaS products across the{" "}
            <span className="text-white">
              React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB and AWS
            </span>{" "}
            ecosystem.
          </p>
          <p>
            I&apos;m comfortable owning a feature end to end: responsive frontends, RESTful APIs, database-backed
            systems, reusable component libraries and real-time features — plus the automated testing, CI/CD,
            accessibility and code review that keep all of it maintainable.
          </p>
          <p>
            Today I&apos;m a Full-Stack Engineer at <span className="text-white">Gerko</span>, reporting to the CTO and
            mentoring three junior developers while building a multi-tenant healthcare Practice Management SaaS. Before
            that I shipped enterprise apps at <span className="text-white">Sasol</span> and fintech interfaces at{" "}
            <span className="text-white">Tata Consultancy Services</span>.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <Button href={site.cvPath} variant="primary" download icon={<Download className="size-4" aria-hidden />}>
              Download CV
            </Button>
            <Button href="/experience" variant="ghost">
              See experience
            </Button>
          </div>
        </Reveal>
      </section>

      {site.introVideo && (
        <section className="container-page mt-28" aria-labelledby="video-heading">
          <SectionHeading
            eyebrow="For recruiters"
            title={<span id="video-heading">A 2-minute video introduction</span>}
            description="Who I am, what I've built and what I'm looking for next."
          />
          <div className="border-line bg-surface mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-3xl border">
            {site.introVideo.includes("youtube") || site.introVideo.includes("vimeo") ? (
              <iframe
                src={site.introVideo}
                title="Video introduction"
                loading="lazy"
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            ) : (
              <video src={site.introVideo} controls preload="none" playsInline className="size-full" />
            )}
          </div>
        </section>
      )}

      <section className="container-page mt-28" aria-labelledby="values-heading">
        <SectionHeading eyebrow="How I work" title={<span id="values-heading">Principles & process</span>} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 100} className="glass rounded-3xl p-7">
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="text-muted mt-2 text-sm leading-relaxed">{v.body}</p>
            </Reveal>
          ))}
        </ul>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 80} className="border-line bg-surface rounded-3xl border p-6">
              <span className="text-accent-soft font-mono text-sm">{p.step}</span>
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <p className="text-muted mt-2 text-sm leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-page mt-28" aria-labelledby="edu-heading">
        <SectionHeading eyebrow="Learning" title={<span id="edu-heading">Education & certifications</span>} />
        <ul className="mx-auto mt-12 grid max-w-4xl gap-4">
          {education.map((e, i) => {
            const Icon = eduIcon[e.kind];
            return (
              <Reveal
                as="li"
                key={e.title}
                delay={i * 80}
                className="border-line bg-surface flex items-start gap-5 rounded-3xl border p-6"
              >
                <span className="bg-accent/15 text-accent-soft ring-accent/30 grid size-12 shrink-0 place-items-center rounded-2xl ring-1">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="flex-1">
                  <h3 className="leading-snug font-semibold">{e.title}</h3>
                  <p className="text-muted mt-1 text-sm">{e.institution}</p>
                </div>
                <span className="text-sky hidden shrink-0 font-mono text-xs sm:block">{e.period}</span>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
