import * as icons from "simple-icons";
import { cn } from "@/lib/utils";

type SimpleIcon = { title: string; path: string; hex: string };

/** Very dark brand colours (Next.js, Express, Vercel…) are rendered white on our dark UI. */
function readableHex(hex: string) {
  const n = parseInt(hex, 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.35 ? "#ffffff" : `#${hex}`;
}

/**
 * Renders a brand logo from `simple-icons` by export name, e.g. "siReact".
 * Falls back to the first letters of `label` when no icon is available.
 * This is a Server Component, so only the SVG paths used end up in the HTML.
 */
export function TechIcon({ icon, label, className }: { icon?: string; label: string; className?: string }) {
  const data = icon ? (icons as unknown as Record<string, SimpleIcon>)[icon] : undefined;
  if (!data) {
    return (
      <span
        aria-hidden
        className={cn(
          "text-sky grid place-items-center rounded-md bg-white/10 font-mono text-[10px] font-semibold",
          className,
        )}
      >
        {label
          .replace(/[^A-Za-z]/g, "")
          .slice(0, 2)
          .toUpperCase()}
      </span>
    );
  }
  return (
    <svg role="img" viewBox="0 0 24 24" aria-hidden className={className} fill={readableHex(data.hex)}>
      <path d={data.path} />
    </svg>
  );
}
