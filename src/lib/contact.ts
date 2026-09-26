/** Shared contact-form contract (client + server). */
export const CONTACT_LIMITS = { name: 120, email: 200, company: 160, type: 60, pack: 60, date: 120, message: 4000, minMessage: 20 };

export interface ContactInput {
  name: string;
  email: string;
  company: string;
  type: string;
  pack: string;
  date: string;
  message: string;
  locale: "es" | "en";
  /** Honeypot: must stay empty. */
  website: string;
  /** Milliseconds since the form was rendered (bot timing trap). */
  elapsed: number;
}

export type ContactField = "name" | "email" | "message";
export type ContactErrors = Partial<Record<ContactField, true>>;

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function normalise(raw: Record<string, unknown>): ContactInput {
  return {
    name: str(raw.name, CONTACT_LIMITS.name),
    email: str(raw.email, CONTACT_LIMITS.email),
    company: str(raw.company, CONTACT_LIMITS.company),
    type: str(raw.type, CONTACT_LIMITS.type),
    pack: str(raw.pack, CONTACT_LIMITS.pack),
    date: str(raw.date, CONTACT_LIMITS.date),
    message: str(raw.message, CONTACT_LIMITS.message),
    locale: raw.locale === "en" ? "en" : "es",
    website: str(raw.website, 200),
    elapsed: Number(raw.elapsed) || 0,
  };
}

export function validate(input: Pick<ContactInput, "name" | "email" | "message">): ContactErrors {
  const errors: ContactErrors = {};
  if (input.name.trim().length < 2) errors.name = true;
  if (!EMAIL.test(input.email.trim())) errors.email = true;
  if (input.message.trim().length < CONTACT_LIMITS.minMessage) errors.message = true;
  return errors;
}
