import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "pill";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-offset-4 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent px-6 py-3 text-white shadow-[0_10px_30px_-10px_rgb(37_99_235/0.8)] hover:bg-accent-soft hover:-translate-y-0.5",
  ghost: "border border-line-strong bg-white/[0.03] px-6 py-3 text-fg hover:border-white/30 hover:bg-white/[0.07]",
  // "Hire me" style: dark pill with a blue icon square on the right
  pill: "bg-surface-2 border border-line py-1.5 pl-5 pr-1.5 text-fg hover:border-line-strong group",
};

type Props = {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href">;

export function Button({ href, variant = "primary", icon, children, className, external, ...rest }: Props) {
  const content =
    variant === "pill" ? (
      <>
        <span>{children}</span>
        <span className="bg-accent grid size-9 place-items-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45">
          {icon ?? <ArrowUpRight className="size-4" aria-hidden />}
        </span>
      </>
    ) : (
      <>
        {children}
        {icon}
      </>
    );

  const classes = cn(base, variants[variant], className);
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal || href.endsWith(".pdf")) {
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal && href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
