import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";

/**
 * POST /api/contact
 * Sends the message with Resend (https://resend.com) when RESEND_API_KEY is set.
 * Without it, responds 503 and the form falls back to opening the visitor's mail app.
 *
 * Env vars (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY     – your Resend API key
 *   CONTACT_TO_EMAIL   – where messages go (defaults to the site email)
 *   CONTACT_FROM_EMAIL – verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 */
export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Silently accept bot submissions caught by the honeypot.
  if (body.company) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "Email service not configured." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? "ndanetaadmire@gmail.com"],
      reply_to: body.email,
      subject: `Portfolio enquiry from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "Could not send right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
