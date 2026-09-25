import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "center", as = "h2", className }: Props) {
  const Tag = as;
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && (
        <p className="text-sky mb-3 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase">
          <span className="bg-sky/60 h-px w-6" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "text-fg font-semibold tracking-tight text-balance",
          as === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Tag>
      {description && <p className="text-muted mt-4 text-base leading-relaxed text-pretty sm:text-lg">{description}</p>}
    </div>
  );
}

/** Blue→white gradient span for highlighted words in headings. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="from-accent-soft via-sky bg-gradient-to-r to-white bg-clip-text text-transparent">{children}</span>
  );
}
