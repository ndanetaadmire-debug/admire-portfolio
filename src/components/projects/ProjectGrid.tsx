"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Client-side filter. Cards are rendered on the server and passed in as
 * `cards` (a map of slug → element), so this component only ships the tiny
 * filter logic — not the card markup — to the browser.
 */
export function ProjectGrid({
  projects,
  cards,
}: {
  projects: Pick<Project, "slug" | "stack" | "category">[];
  cards: Record<string, React.ReactNode>;
}) {
  const filters = useMemo(() => {
    const tech = ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB"];
    return ["All", "Professional", "Client work", ...tech];
  }, []);
  const [active, setActive] = useState("All");

  const visible = projects.filter((p) => {
    if (active === "All") return true;
    if (active === "Professional") return p.category === "Professional";
    if (active === "Client work") return p.category === "Client";
    return p.stack.includes(active);
  });

  return (
    <>
      <div role="toolbar" aria-label="Filter projects" className="mb-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all",
              active === f
                ? "border-accent bg-accent text-white"
                : "border-line bg-surface text-muted hover:border-line-strong hover:text-white",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug} className="animate-page-in">
            {cards[p.slug]}
          </li>
        ))}
      </ul>
    </>
  );
}
