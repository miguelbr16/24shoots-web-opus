"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { t } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { CONTACT_LIMITS, validate, type ContactErrors, type ContactField } from "@/lib/contact";
import { packs } from "@/content/packs";

type Status = "idle" | "sending" | "sent" | "failed";

/**
 * Works without JavaScript (plain POST to /api/contact, which redirects back);
 * with JavaScript it validates inline and submits with fetch.
 */
export function ContactForm({ locale, idPrefix = "cf", tone = "ink" }: { locale: Locale; idPrefix?: string; tone?: "ink" | "paper" }) {
  const c = t(locale).form;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");
  const [pack, setPack] = useState("");
  const started = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    started.current = Date.now();
    // Server-side (no-JS) result via query string
    const params = new URLSearchParams(window.location.search);
    const p = packs.find((x) => x.slug === params.get("pack"));
    if (p) setPack(p.name[locale]);
    const q = params.get("enviado");
    if (q === "1") setStatus("sent");
    if (q === "0") setStatus("failed");
  }, [locale]);

  useEffect(() => {
    if (status === "sent" || status === "failed") resultRef.current?.focus();
  }, [status]);

  const id = (f: string) => `${idPrefix}-${f}`;
  const muted = tone === "paper" ? "text-soot" : "text-ash";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const errs = validate({ name: data.name ?? "", email: data.email ?? "", message: data.message ?? "" });
    setErrors(errs);
    setServerError(null);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
        const first = (["name", "email", "message"] as ContactField[]).find((f) => errs[f]);
        if (first) form.querySelector<HTMLElement>(`#${id(first)}`)?.focus();
      });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, locale, elapsed: Date.now() - started.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: ContactErrors; code?: string };
      if (res.ok && body.ok) {
        setSentTo(data.email);
        setStatus("sent");
        form.reset();
        return;
      }
      if (body.errors) {
        setErrors(body.errors);
        setStatus("idle");
        return;
      }
      setServerError(body.code === "rate" ? c.errors.rate : c.errors.generic);
      setStatus("failed");
    } catch {
      setServerError(c.errors.generic);
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="outline-none">
        <p className="t-h2">{c.successTitle}</p>
        <p className={`mt-4 max-w-[40ch] ${muted}`}>{sentTo ? c.success(sentTo) : c.success(locale === "es" ? "tu email" : "your email")}</p>
        <Link href={href.page(locale, "work")} className="cta mt-6">
          {t(locale).work.all} <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  const fieldError = (f: ContactField) => (errors[f] ? c.errors[f] : null);
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form ref={formRef} action="/api/contact" method="post" noValidate onSubmit={onSubmit} className="space-y-8">
      <input type="hidden" name="locale" value={locale} />
      {pack && (
        <p className="t-mono flex items-center gap-3">
          <input type="hidden" name="pack" value={pack} />
          <span className="rec-dot" aria-hidden />
          <span>Pack: {pack}</span>
          <button type="button" className="text-ash underline hover:text-bone" onClick={() => setPack("")}>
            {locale === "es" ? "quitar" : "remove"}
          </button>
        </p>
      )}
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p ref={summaryRef} tabIndex={-1} className={`t-mono outline-none ${hasErrors ? "text-rec" : "sr-only"}`} aria-live="polite">
        {hasErrors ? c.summary : ""}
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id={id("name")} name="name" label={c.name} required autoComplete="name" maxLength={CONTACT_LIMITS.name} error={fieldError("name")} muted={muted} requiredLabel={c.required} />
        <Field id={id("email")} name="email" type="email" label={c.email} required autoComplete="email" inputMode="email" maxLength={CONTACT_LIMITS.email} error={fieldError("email")} muted={muted} requiredLabel={c.required} />
      </div>
      <Field id={id("company")} name="company" label={c.company} autoComplete="organization" maxLength={CONTACT_LIMITS.company} muted={muted} optionalLabel={c.optional} />

      <fieldset>
        <legend className={`t-mono mb-3 ${muted}`}>
          {c.type} <span className="normal-case">({c.optional})</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {c.types.map((type, i) => (
            <label key={type} className="chip relative">
              <input type="radio" name="type" value={type} id={id(`type-${i}`)} />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        id={id("message")}
        name="message"
        label={c.message}
        required
        textarea
        placeholder={c.messageHint}
        maxLength={CONTACT_LIMITS.message}
        error={fieldError("message")}
        muted={muted}
        requiredLabel={c.required}
      />
      <Field id={id("date")} name="date" label={c.date} maxLength={CONTACT_LIMITS.date} muted={muted} optionalLabel={c.optional} />

      {status === "failed" && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="border-l-2 border-rec pl-4 outline-none">
          <p className="font-medium">{c.errorTitle}</p>
          <p className={muted}>
            {serverError ? `${serverError} ` : ""}
            {c.errorBody}{" "}
            <a className="link" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
        <button type="submit" disabled={status === "sending"} className="cta-slab cta-slab--block cursor-pointer disabled:opacity-60 sm:!inline-grid sm:!w-auto" aria-busy={status === "sending"}>
          <span>{status === "sending" ? c.sending : c.submit}</span>
          <span aria-hidden>→</span>
        </button>
        <p className={`max-w-[40ch] text-sm ${muted}`}>
          {c.privacy}{" "}
          <Link className="link" href={href.page(locale, "privacy")}>
            {c.privacyLink}
          </Link>
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  error,
  textarea,
  required,
  muted,
  requiredLabel,
  optionalLabel,
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  error?: string | null;
  textarea?: boolean;
  required?: boolean;
  muted: string;
  requiredLabel?: string;
  optionalLabel?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const errId = `${id}-error`;
  const common = {
    id,
    name,
    required,
    "aria-required": required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
  };
  return (
    <div className="field" data-invalid={error ? "true" : undefined}>
      <label htmlFor={id} className={`t-mono ${muted}`}>
        {label}
        {required ? <span aria-hidden> *</span> : optionalLabel ? <span className="normal-case"> ({optionalLabel})</span> : null}
        {required && <span className="sr-only"> ({requiredLabel})</span>}
      </label>
      {textarea ? (
        <textarea {...common} rows={4} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input {...common} type="text" {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && (
        <p id={errId} className="t-mono mt-2 text-rec">
          {error}
        </p>
      )}
    </div>
  );
}
