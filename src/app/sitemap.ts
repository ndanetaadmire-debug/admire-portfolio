import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...nav.map((n) => ({ url: `${site.url}${n.href}`, lastModified: now, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
