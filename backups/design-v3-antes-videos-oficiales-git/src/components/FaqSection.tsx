"use client";

import { useState } from "react";
import { SectionHeading } from "./ui";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export function FaqSection({ title, subtitle, items }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <SectionHeading title={title} subtitle={subtitle} />
      <div className="divide-y divide-border border-y border-border">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition hover:text-accent"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="flex gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium tracking-tight md:text-lg">
                    {item.question}
                  </span>
                </span>
                <span className="mt-1 shrink-0 text-xl leading-none text-muted">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="pb-6 pl-10 pr-4 text-sm leading-relaxed text-muted md:pl-14">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
