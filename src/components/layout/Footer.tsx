import Link from "next/link";
import { nav, site } from "@/content/site";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function Footer() {
  return (
    <footer className="border-line relative mt-24 border-t">
      <div
        className="via-purple pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent to-transparent"
        aria-hidden
      />
      <div className="container-page flex flex-col items-center gap-8 py-12 text-center">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>
        <ul className="text-muted flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-3">
          {site.socials.map((s) => (
            <li key={s.key}>
              <a
                href={s.href}
                aria-label={s.label}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="border-line bg-surface-2 text-muted hover:border-line-strong grid size-10 place-items-center rounded-full border transition-colors hover:text-white"
              >
                <BrandIcon name={s.key} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-subtle text-xs">
          © {new Date().getFullYear()} {site.name} · Built with Next.js, TypeScript & Tailwind CSS · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
