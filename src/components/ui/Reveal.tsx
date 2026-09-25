"use client";

import { useEffect, useRef, type ReactNode, type ElementType, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades children in when they scroll into view. Uses one IntersectionObserver
 * per element and no animation library — keeps the JS bundle tiny.
 * Content is fully visible when JS is disabled (see `.js .reveal` in globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn("reveal", className)} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
