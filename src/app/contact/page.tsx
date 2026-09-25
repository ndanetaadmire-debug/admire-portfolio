import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Highlight } from "@/components/ui/SectionHeading";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Admire Ndaneta about full-stack roles or React / Node.js contract work.",
  path: "/contact",
});

const iconBg = {
  email: "bg-accent",
  whatsapp: "bg-[#25d366]",
  linkedin: "bg-[#0a66c2]",
  github: "bg-surface-3",
} as const;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about your <Highlight>next great project</Highlight>
          </>
        }
        description="Recruiters, founders and engineering leads — I'd love to hear what you're building."
      />

      <section className="container-page">
        <Reveal className="glass grid gap-8 rounded-[2rem] p-4 sm:p-6 lg:grid-cols-[1fr_1.3fr] lg:p-8">
          <div className="min-w-0 space-y-4">
            {site.socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group border-line bg-surface hover:border-line-strong flex items-center gap-4 rounded-2xl border p-4 transition-colors"
              >
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-white ${iconBg[s.key]}`}>
                  <BrandIcon name={s.key} className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{s.label}</span>
                  <span className="text-muted block truncate text-xs">{s.handle}</span>
                </span>
                <span className="group-hover:bg-accent inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/80 transition-colors group-hover:text-white">
                  Message <ArrowUpRight className="size-3.5" aria-hidden />
                </span>
              </a>
            ))}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-line bg-surface rounded-2xl border p-4">
                <MapPin className="text-accent-soft size-4" aria-hidden />
                <p className="text-subtle mt-2 text-xs">Based in</p>
                <p className="text-sm">{site.location}</p>
              </div>
              <div className="border-line bg-surface rounded-2xl border p-4">
                <Clock className="text-accent-soft size-4" aria-hidden />
                <p className="text-subtle mt-2 text-xs">Timezone</p>
                <p className="text-sm">SAST · UTC+2</p>
              </div>
            </div>
          </div>
          <div className="border-line bg-surface relative min-w-0 rounded-2xl border p-5 sm:p-7">
            <h2 className="mb-6 text-xl font-semibold">Send a message</h2>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
