import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

export function CtaBand() {
  return (
    <section className="container-page mt-24">
      <Reveal className="conic-border rounded-[2rem]">
        <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            className="bg-accent/25 pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 max-w-md rounded-full blur-[90px]"
            aria-hidden
          />
          <p className="text-sky font-mono text-xs tracking-[0.2em] uppercase">Let&apos;s work together</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Have a role or a product in mind? <span className="text-muted">Let&apos;s build it.</span>
          </h2>
          <p className="text-muted mx-auto mt-5 max-w-xl">
            I&apos;m open to full-time full-stack roles and React / Node.js contract work — remote or hybrid.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="primary" icon={<Mail className="size-4" aria-hidden />}>
              Start a conversation
            </Button>
            <Button
              href={whatsappLink(site.whatsapp, "Hi Admire, I saw your portfolio and would like to chat.")}
              variant="ghost"
              icon={<BrandIcon name="whatsapp" className="size-4 text-[#25d366]" />}
            >
              WhatsApp me
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
