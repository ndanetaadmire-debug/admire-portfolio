# Admire Ndaneta — Portfolio

Personal portfolio of **Admire T. Ndaneta**, Full-Stack Software Engineer.
Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**, deployed on **Vercel**.

- Multi-page site: a hero home page plus separate routes for About, Services, Skills, Experience, Projects (with a page per case study) and Contact.
- Every page is pre-rendered to static HTML at build time → fast first load, great SEO, cheap to host.
- Only a handful of small client components ship JavaScript (nav, filters, gallery, contact form, chat widget). No animation library: motion is pure CSS + `IntersectionObserver`.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

| Script              | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Local dev server with hot reload                 |
| `npm run build`     | Production build (what Vercel runs)              |
| `npm run start`     | Serve the production build locally               |
| `npm run lint`      | ESLint                                           |
| `npm run typecheck` | TypeScript, no emit                              |
| `npm run format`    | Prettier (+ Tailwind class sorting)              |
| `npm run check`     | lint + typecheck + build — run before every push |

---

## Project structure

```
src/
├── app/                      # Routes (one folder = one URL)
│   ├── layout.tsx            # <html>, fonts, navbar, footer, WhatsApp widget, SEO defaults
│   ├── template.tsx          # Page-enter animation (re-mounts per navigation)
│   ├── page.tsx              # /            — hero + previews of each section
│   ├── about/page.tsx        # /about
│   ├── services/page.tsx     # /services
│   ├── skills/page.tsx       # /skills
│   ├── experience/page.tsx   # /experience
│   ├── projects/page.tsx     # /projects    — filterable grid
│   ├── projects/[slug]/      # /projects/financeflow, … — static case-study pages
│   ├── contact/page.tsx      # /contact
│   ├── api/contact/route.ts  # POST endpoint for the contact form (Resend)
│   ├── sitemap.ts, robots.ts, icon.tsx, opengraph-image.tsx, not-found.tsx
│   └── globals.css           # Design tokens (colours, fonts, animations) + utilities
├── components/
│   ├── layout/               # Navbar, Footer, WhatsAppWidget
│   ├── home/                 # Hero, CodeCard, AboutStrip, TechMarquee, CtaBand
│   ├── projects/             # ProjectCard, ProjectGrid (filter), Gallery (lightbox)
│   ├── contact/              # ContactForm
│   └── ui/                   # Reusable primitives: Button, SectionHeading, PageHeader, Reveal, …
├── content/                  # ← ALL site content lives here as typed data
│   ├── site.ts               # name, links, nav, stats, CV path, intro video
│   ├── experience.ts
│   ├── skills.ts             # skills, services, process, education
│   └── projects.ts           # every case study
├── lib/                      # helpers (cn, accent colours, SEO, form validation)
├── types/content.ts          # TypeScript types for the content model
├── fonts/                    # self-hosted Poppins + JetBrains Mono
└── assets/                   # images imported by components (portrait)
public/
├── projects/<slug>/*.webp    # case-study screenshots
├── docs/                     # CV + case-study PDFs
└── images/
```

### The rule that keeps this maintainable

**Content is data, components are presentation.** You should almost never need to touch JSX to update the site:

- **New job?** Add an object to `src/content/experience.ts`.
- **New project?** Drop screenshots in `public/projects/<slug>/`, add one object to `src/content/projects.ts`. The card, the filter, the case-study page, the sitemap and the social preview are all generated from it.
- **New skill?** Add it to a group in `src/content/skills.ts`. `icon` is a [simple-icons](https://simpleicons.org) export name, e.g. `siDocker`.
- **Change colours or fonts?** Edit the `@theme` block at the top of `src/app/globals.css`.
- **Add your intro video?** Put `intro.mp4` in `public/video/` (or use a YouTube embed URL) and set `introVideo` in `src/content/site.ts` — the About page shows the section automatically.

TypeScript enforces the shape of every entry, so a typo fails the build instead of breaking the live site.

---

## Git workflow (GitHub → Vercel)

First time:

```bash
git init            # already done if you unzipped this repo
git add -A
git commit -m "feat: rebuild portfolio with Next.js 16"
git branch -M main
git remote add origin https://github.com/<your-username>/admire-portfolio.git
git push -u origin main
```

Then in Vercel: **Add New → Project → Import** the repo → Framework is auto-detected as Next.js → **Deploy**.
Add `NEXT_PUBLIC_SITE_URL` (and optionally the Resend keys from `.env.example`) under **Settings → Environment Variables**.

Day to day:

```bash
git pull                                 # start from the latest main
git switch -c feat/add-new-project       # one branch per change
# …edit…
npm run check                            # lint + types + build
git add -A && git commit -m "feat(projects): add Acme dashboard"
git push -u origin feat/add-new-project  # open a Pull Request on GitHub
```

- Every PR gets a **Vercel preview URL** and runs the **GitHub Actions CI** (`.github/workflows/ci.yml`).
- Merge to `main` when both are green → Vercel deploys production automatically.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- Tip: in GitHub → Settings → Branches, protect `main` and require the CI check to pass.

---

## Performance notes

- Static generation for every page and case study (`generateStaticParams`, `dynamicParams = false`).
- `next/image` with AVIF/WebP, responsive `sizes`, and `priority` only on above-the-fold images.
- Fonts self-hosted via `next/font/local` — no layout shift, no third-party request.
- Brand icons are rendered as inline SVG on the server; no icon font.
- Server Components by default; client components are small and isolated.
- `prefers-reduced-motion` is respected everywhere.

## Contact form

`POST /api/contact` validates input (shared rules in `src/lib/contact.ts`), has a honeypot for bots, and sends mail through [Resend](https://resend.com) when `RESEND_API_KEY` is set. Without a key the form gracefully opens the visitor's email app instead, so it works from day one.
