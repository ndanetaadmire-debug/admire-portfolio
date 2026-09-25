import type { Metadata } from "next";
import { site } from "@/content/site";

/** Per-page metadata helper so every route gets consistent title/OG/canonical tags. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · ${site.shortName}`, description, url: path },
    twitter: { title: `${title} · ${site.shortName}`, description },
  };
}
