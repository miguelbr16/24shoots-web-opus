"use client";

import { useState } from "react";
import type { Service } from "@/lib/types";
import { Button } from "./ui";

interface ContactFormProps {
  services: Service[];
  labels: {
    form: Record<string, string>;
    budgetOptions: string[];
    sectorOptions: string[];
  };
  locale: string;
}

export function ContactForm({ services, labels, locale }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-sm border border-border bg-background px-4 py-3.5 text-sm outline-none transition focus:border-accent";
  const labelClass = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted";

  if (status === "success") {
    return (
      <div className="border border-accent/30 bg-surface p-10 text-center">
        <p className="text-base font-light text-foreground">
          {labels.form.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{labels.form.name} *</label>
          <input name="name" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{labels.form.email} *</label>
          <input name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{labels.form.phone}</label>
          <input name="phone" type="tel" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{labels.form.service} *</label>
          <select name="service" required className={inputClass}>
            <option value="">—</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{labels.form.sector}</label>
          <select name="sector" className={inputClass}>
            <option value="">—</option>
            {labels.sectorOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{labels.form.date}</label>
          <input name="date" type="date" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>{labels.form.budget}</label>
          <select name="budget" className={inputClass}>
            <option value="">—</option>
            {labels.budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>{labels.form.message} *</label>
          <textarea name="message" required rows={5} className={inputClass} />
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{labels.form.error}</p>
      )}

      <Button type="submit" disabled={status === "loading"} showArrow>
        {status === "loading" ? "..." : labels.form.submit}
      </Button>
    </form>
  );
}
