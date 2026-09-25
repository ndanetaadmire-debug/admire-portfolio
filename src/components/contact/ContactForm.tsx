"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { AlertCircle, Check, CheckCircle2, Copy, Loader2, Send } from "lucide-react";
import { validateContact, type ContactErrors } from "@/lib/contact";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Contact form.
 *
 * - Inputs are uncontrolled (defaultValue) so browser autofill and password managers can never
 *   be overwritten or ignored by React; on submit we read the real values with FormData.
 * - React state mirrors every keystroke for live validation and the character counter.
 * - Errors show after a field is touched or on submit, and every outcome shows a clear result.
 */

type Field = "name" | "email" | "message";
type Values = Record<Field, string> & { company: string }; // `company` = honeypot
type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

const EMPTY: Values = { name: "", email: "", message: "", company: "" };
const MAX_MESSAGE = 5000;

const inputBase =
  "w-full rounded-xl border bg-surface-2 px-4 py-3 text-sm text-white placeholder:text-subtle outline-none transition focus:ring-2";

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, email: false, message: false });
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  // Derived state: recomputed on every render from the current values, so it can never go stale.
  const errors: ContactErrors = validateContact(values);
  const isValid = Object.keys(errors).length === 0;
  const visibleError = (f: Field) => (touched[f] ? errors[f] : undefined);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (status === "error" || status === "unavailable") setStatus("idle");
  }

  function onBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as Field;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setTouched({ name: true, email: true, message: true }); // reveal all errors on submit

    // Browser autofill can put text in the inputs without firing React's onChange.
    // Read what is actually in the form and sync it into state before validating.
    const fd = new FormData(e.currentTarget);
    const current: Values = {
      name: String(fd.get("name") ?? values.name),
      email: String(fd.get("email") ?? values.email),
      message: String(fd.get("message") ?? values.message),
      company: values.company,
    };
    setValues(current);
    if (Object.keys(validateContact(current)).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: current.name.trim(),
          email: current.email.trim(),
          message: current.message.trim(),
          company: current.company,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setValues(EMPTY);
        setTouched({ name: false, email: false, message: false });
      } else {
        setStatus(res.status === 503 ? "unavailable" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the address is visible anyway */
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

  const fieldClass = (f: Field) =>
    cn(
      inputBase,
      visibleError(f)
        ? "border-rose/70 focus:border-rose focus:ring-rose/25"
        : "border-line focus:border-accent focus:ring-accent/30",
    );

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-muted mb-1.5 block text-xs">
            Full name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={values.name}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete="name"
            placeholder="Jane Doe"
            className={fieldClass("name")}
            aria-invalid={!!visibleError("name")}
            aria-describedby={visibleError("name") ? "name-err" : undefined}
          />
          {visibleError("name") && (
            <p id="name-err" className="text-rose mt-1.5 text-xs">
              {visibleError("name")}
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
            defaultValue={values.email}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete="email"
            placeholder="jane@company.com"
            className={fieldClass("email")}
            aria-invalid={!!visibleError("email")}
            aria-describedby={visibleError("email") ? "email-err" : undefined}
          />
          {visibleError("email") && (
            <p id="email-err" className="text-rose mt-1.5 text-xs">
              {visibleError("email")}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="message" className="text-muted block text-xs">
            Message
          </label>
          <span
            className={cn("text-xs tabular-nums", values.message.length > MAX_MESSAGE ? "text-rose" : "text-subtle")}
            aria-hidden
          >
            {values.message.length}/{MAX_MESSAGE}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={6}
          defaultValue={values.message}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Tell me about the role or project…"
          className={cn(fieldClass("message"), "resize-y")}
          aria-invalid={!!visibleError("message")}
          aria-describedby={visibleError("message") ? "message-err" : undefined}
        />
        {visibleError("message") && (
          <p id="message-err" className="text-rose mt-1.5 text-xs">
            {visibleError("message")}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from people, filled in by bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="hp-field">Leave this field empty</label>
        <input
          id="hp-field"
          name="hp_field"
          defaultValue={values.company}
          onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
          tabIndex={-1}
          autoComplete="new-password"
        />
      </div>

      {(status === "unavailable" || status === "error") && (
        <div
          role="alert"
          className="border-amber/30 bg-amber/10 flex flex-col gap-3 rounded-xl border p-4 text-sm sm:flex-row sm:items-center"
        >
          <AlertCircle className="text-amber size-5 shrink-0" aria-hidden />
          <p className="flex-1 text-white/85">
            {status === "unavailable" ? "The form can't send right now." : "Something went wrong sending your message."}{" "}
            Please email me directly at <span className="font-medium text-white">{site.email}</span>.
          </p>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15 sm:self-auto"
          >
            {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
      )}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-subtle text-xs">I usually reply within one business day.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "bg-accent hover:bg-accent-soft inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition disabled:opacity-60",
            !isValid && "opacity-70",
          )}
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
