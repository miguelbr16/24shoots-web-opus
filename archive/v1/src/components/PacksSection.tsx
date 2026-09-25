import Link from "next/link";
import type { Locale, Pack } from "@/lib/types";
import { SectionHeading } from "./ui";
import { PacksGrid } from "./PacksGrid";

interface PacksSectionProps {
  locale: Locale;
  title: string;
  subtitle: string;
  quoteNote: string;
  featuredBadge: string;
  ctaLabel: string;
  packs: Pack[];
}

export function PacksSection({
  locale,
  title,
  subtitle,
  quoteNote,
  featuredBadge,
  ctaLabel,
  packs,
}: PacksSectionProps) {
  return (
    <section className="border-y border-border bg-panel py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading title={title} subtitle={subtitle} />
        <PacksGrid
          locale={locale}
          packs={packs}
          featuredBadge={featuredBadge}
          ctaLabel={ctaLabel}
          quoteNote={quoteNote}
        />
      </div>
    </section>
  );
}
