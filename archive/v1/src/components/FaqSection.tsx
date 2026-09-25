"use client";

import { useState } from "react";
import { LightBand } from "./LightBand";
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
  const [open, setOpen] = useState<number | null>(null);

  return (
    <LightBand accent="top">
      <SectionHeading title={title} subtitle={subtitle} tone="light" />
      <div className="divide-y divide-light-band-border border-y border-light-band-border">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.question}
              className={isOpen ? "bg-white/50" : "hover:bg-white/25"}
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 px-1 py-4 text-left transition md:gap-6 md:py-6"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="flex gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium tracking-tight text-light-band-text md:text-lg">
                    {item.question}
                  </span>
                </span>
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm leading-none transition ${
                    isOpen
                      ? "bg-accent text-white"
                      : "bg-light-band-surface text-light-band-muted"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="pb-5 pl-10 pr-4 text-sm leading-relaxed text-light-band-muted md:pb-6 md:pl-14">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </LightBand>
  );
}
