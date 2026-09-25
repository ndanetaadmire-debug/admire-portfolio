import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { site } from "@/content/site";
import "./globals.css";

// Fonts are committed to the repo (src/fonts) and served from our own domain:
// no third-party request, no build-time network dependency, no layout shift.
const poppins = localFont({
  src: [
    { path: "../fonts/poppins-latin-300-normal.woff2", weight: "300" },
    { path: "../fonts/poppins-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/poppins-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/poppins-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/poppins-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-poppins",
  display: "swap",
});
const jetbrains = localFont({
  src: "../fonts/jetbrains-mono-latin-400-normal.woff2",
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.shortName} — ${site.role}`, template: `%s · ${site.shortName}` },
  description: site.description,
  keywords: [
    "Full-Stack Software Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "South Africa",
    "Remote",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: site.shortName,
    title: `${site.shortName} — ${site.role}`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0f",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressCountry: "ZA" },
  sameAs: site.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrains.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-dvh overflow-x-clip antialiased">
        {/* Enables scroll-reveal styles only when JS runs (content stays visible without JS). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <a
          href="#main"
          className="focus:bg-accent sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
