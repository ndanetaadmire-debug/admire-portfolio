import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "border-line text-muted inline-flex items-center gap-1.5 rounded-full border bg-white/[0.04] px-3 py-1 text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
