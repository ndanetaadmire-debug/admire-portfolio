"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { validateContact, type ContactErrors } from "@/lib/contact";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-white placeholder:text-subtle outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const errs = validateContact(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (res.status === 503) {
        // Email service not configured yet → hand off to the visitor's email app.
        const subject = encodeURIComponent(`Portfolio enquiry from ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center" role="status">
        <CheckCircle2 className="text-green size-12" aria-hidden />
        <h3 className="text-xl font-semibold">Message sent — thank you!</h3>
        <p className="text-muted max-w-sm text-sm">I&apos;ll get back to you within one business day.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-accent-soft text-sm underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-muted mb-1.5 block text-xs">
            Full name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            className={field}
            aria-invalid={!!errors.name}
            aria-describedby="name-err"
          />
          {errors.name && (
            <p id="name-err" className="text-rose mt-1.5 text-xs">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-muted mb-1.5 block text-xs">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className={field}
            aria-invalid={!!errors.email}
            aria-describedby="email-err"
          />
          {errors.email && (
            <p id="email-err" className="text-rose mt-1.5 text-xs">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="text-muted mb-1.5 block text-xs">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell me about the role or project…"
          className={cn(field, "resize-y")}
          aria-invalid={!!errors.message}
          aria-describedby="message-err"
        />
        {errors.message && (
          <p id="message-err" className="text-rose mt-1.5 text-xs">
            {errors.message}
          </p>
        )}
      </div>
      {/* Honeypot — hidden from people, visible to bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-subtle text-xs" role="status" aria-live="polite">
          {status === "error" ? (
            <span className="text-rose">Something went wrong — please email me directly.</span>
          ) : (
            "I usually reply within one business day."
          )}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-accent hover:bg-accent-soft inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition disabled:opacity-60"
        >
          {status === "sending" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
