"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-500 sm:px-4",
          scrolled || open
            ? "border-line bg-surface/95 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)]"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.shortName} — home`}>
          <span className="from-accent to-purple grid size-10 place-items-center rounded-xl bg-gradient-to-br font-semibold tracking-tight text-white transition-transform duration-500 group-hover:rotate-[8deg]">
            {site.initials}
          </span>
          <span className="hidden text-sm leading-tight font-semibold sm:block">
            {site.shortName}
            <span className="block text-xs font-normal text-white/80">{site.role}</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  isActive(item.href) ? "bg-white/[0.08] text-white" : "text-muted hover:text-white",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="group border-line bg-surface-2 hidden items-center gap-3 rounded-full border py-1.5 pr-1.5 pl-5 text-sm font-medium sm:inline-flex"
          >
            Hire Me
            <span className="bg-accent grid size-8 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="border-line bg-surface-2 grid size-10 place-items-center rounded-xl border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "border-line bg-surface/95 mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border transition-all duration-500 lg:hidden",
          open ? "max-h-[32rem] opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0",
        )}
      >
        <ul className="flex flex-col p-2">
          {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                tabIndex={open ? 0 : -1}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3.5 text-base transition-colors",
                  (item.href === "/" ? pathname === "/" : isActive(item.href))
                    ? "bg-white/[0.07] text-white"
                    : "text-muted hover:bg-white/[0.04] hover:text-white",
                )}
              >
                <span>
                  <span className="text-subtle mr-3 font-mono text-xs">0{i + 1}</span>
                  {item.label}
                </span>
                <ArrowUpRight className="size-4 opacity-50" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
