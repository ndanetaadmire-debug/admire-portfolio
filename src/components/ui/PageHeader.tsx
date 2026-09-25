import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";

/** Top-of-page hero used by every inner page for a consistent entry point. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="bg-accent/20 pointer-events-none absolute top-0 left-1/2 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full blur-[120px]"
        aria-hidden
      />
      <div className="container-page relative">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </header>
  );
}
