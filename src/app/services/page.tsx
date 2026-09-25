import { PageHeader } from "@/components/ui/PageHeader";
import { Highlight } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { services } from "@/content/skills";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Frontend engineering, backend & API development, full-stack SaaS delivery, performance optimisation and technical leadership.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            How I can <Highlight>help your team</Highlight>
          </>
        }
        description="Hire me full-time or bring me in for a focused engagement — here's where I add the most value."
      >
        <Button href="/contact" variant="pill">
          Discuss a project
        </Button>
      </PageHeader>
      <section className="container-page">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 100}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
