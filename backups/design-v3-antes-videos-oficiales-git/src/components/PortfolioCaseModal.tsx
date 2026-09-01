"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { PortfolioItem, Locale } from "@/lib/types";
import { ShotMetadata } from "./ShotMetadata";
import { Button } from "./ui";
import { getRoute } from "@/lib/i18n";

export interface PortfolioCaseLabels {
  client: string;
  challenge: string;
  approach: string;
  deliverables: string;
  result: string;
  close: string;
  viewInstagram: string;
}

interface PortfolioCaseModalProps {
  item: PortfolioItem | null;
  labels: PortfolioCaseLabels;
  locale?: Locale;
  onClose: () => void;
}

export function PortfolioCaseModal({
  item,
  labels,
  locale = "es",
  onClose,
}: PortfolioCaseModalProps) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  const meta = [
    item.format,
    item.location,
    item.type === "video" ? "Video" : "Photo",
  ].filter(Boolean) as string[];

  const isVertical = Boolean(item.format?.includes("9:16"));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden border border-border bg-background shadow-2xl md:max-h-[90vh] md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 border border-border bg-background/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm transition hover:border-accent hover:text-accent"
        >
          {labels.close}
        </button>

        <div
          className={`flex shrink-0 items-center justify-center bg-black ${
            isVertical
              ? "max-h-[45vh] w-full border-b border-border p-3 md:max-h-none md:w-[min(42%,340px)] md:border-b-0 md:border-r"
              : "w-full border-b border-border p-3 md:w-[58%] md:border-b-0 md:border-r"
          }`}
        >
          {item.videoUrl ? (
            <video
              src={item.videoUrl}
              controls
              playsInline
              preload="metadata"
              poster={item.thumbnail}
              className={`object-contain ${
                isVertical
                  ? "max-h-[40vh] w-auto max-w-[min(100%,280px)] md:max-h-[78vh]"
                  : "max-h-[40vh] w-full max-w-full md:max-h-[78vh]"
              }`}
            />
          ) : (
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={1080}
              height={1920}
              className={`object-contain ${
                isVertical
                  ? "max-h-[40vh] w-auto max-w-[min(100%,280px)] md:max-h-[78vh]"
                  : "max-h-[40vh] w-full max-w-full md:max-h-[78vh]"
              }`}
              priority
            />
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
          {meta.length > 0 && <ShotMetadata items={meta} size="md" />}
          <h2 className="mt-3 text-xl font-light tracking-tight sm:text-2xl md:text-3xl">
            {item.title}
          </h2>
          {item.client && (
            <p className="mt-1 text-sm text-muted">
              {labels.client}: {item.client}
            </p>
          )}

          <p className="mt-5 text-sm leading-relaxed text-foreground/85 sm:text-base">
            {item.description}
          </p>

          <div className="mt-8 space-y-6">
            {item.challenge && (
              <div className="border-l-2 border-accent/50 pl-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                  {labels.challenge}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.challenge}</p>
              </div>
            )}
            {item.approach && (
              <div className="border-l-2 border-border pl-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/70">
                  {labels.approach}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.approach}</p>
              </div>
            )}
          </div>

          {item.deliverables && item.deliverables.length > 0 && (
            <div className="mt-8">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/70">
                {labels.deliverables}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.deliverables.map((d) => (
                  <li
                    key={d}
                    className="border border-border bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.result && (
            <div className="mt-8 border border-border bg-surface p-5">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-premium">
                {labels.result}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{item.result}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={getRoute(locale, "contact")} showArrow className="!text-[10px]">
              {locale === "es" ? "Pedir presupuesto" : "Get a quote"}
            </Button>
            <a
              href={item.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted transition hover:text-accent"
            >
              {labels.viewInstagram} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
