import type { Accent } from "@/types/content";

/** Tiny className joiner — avoids pulling in an extra dependency. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Accent colour classes. Written out in full so Tailwind can statically
 * detect them (never build class names with string interpolation).
 */
export const accentStyles: Record<
  Accent,
  { text: string; bg: string; soft: string; ring: string; glow: string; gradient: string }
> = {
  blue: {
    text: "text-blue",
    bg: "bg-blue",
    soft: "bg-blue/10",
    ring: "ring-blue/30",
    glow: "bg-blue/40",
    gradient: "from-blue to-white",
  },
  green: {
    text: "text-green",
    bg: "bg-green",
    soft: "bg-green/10",
    ring: "ring-green/30",
    glow: "bg-green/35",
    gradient: "from-green to-white",
  },
  purple: {
    text: "text-purple",
    bg: "bg-purple",
    soft: "bg-purple/10",
    ring: "ring-purple/30",
    glow: "bg-purple/40",
    gradient: "from-purple to-white",
  },
  amber: {
    text: "text-amber",
    bg: "bg-amber",
    soft: "bg-amber/10",
    ring: "ring-amber/30",
    glow: "bg-amber/35",
    gradient: "from-amber to-white",
  },
  rose: {
    text: "text-rose",
    bg: "bg-rose",
    soft: "bg-rose/10",
    ring: "ring-rose/30",
    glow: "bg-rose/35",
    gradient: "from-rose to-white",
  },
  cyan: {
    text: "text-cyan",
    bg: "bg-cyan",
    soft: "bg-cyan/10",
    ring: "ring-cyan/30",
    glow: "bg-cyan/35",
    gradient: "from-cyan to-white",
  },
};

export const whatsappLink = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
