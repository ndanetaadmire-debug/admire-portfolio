import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80vh] flex-col items-center justify-center pt-24 text-center">
      <p className="text-accent-soft font-mono text-sm">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">This page took a wrong turn.</h1>
      <p className="text-muted mt-4 max-w-md">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex gap-3">
        <Button href="/" variant="primary">
          Back home
        </Button>
        <Button href="/projects" variant="ghost">
          See projects
        </Button>
      </div>
    </section>
  );
}
