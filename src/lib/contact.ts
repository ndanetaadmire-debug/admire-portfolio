/** Shared validation for the contact form — used by both the client and the API route. */
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string; // honeypot — real users never fill this
}

export type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(data: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};
  if (!data.name || data.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!data.email || !EMAIL_RE.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (!data.message || data.message.trim().length < 10) errors.message = "Tell me a little more (10+ characters).";
  if (data.message && data.message.length > 5000) errors.message = "Please keep it under 5,000 characters.";
  return errors;
}
