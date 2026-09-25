import Link from "next/link";
import type { Locale, Pack } from "@/lib/types";
import { getRoute } from "@/lib/i18n";
import { Button } from "./ui";

interface PacksGridProps {
  locale: Locale;
  packs: Pack[];
  featuredBadge: string;
  ctaLabel: string;
  quoteNote?: string;
  showFooterCta?: boolean;
}

export function PacksGrid({
  locale,
  packs,
  featuredBadge,
  ctaLabel,
  quoteNote,
  showFooterCta = true,
}: PacksGridProps) {
  const contactHref = getRoute(locale, "contact");

  return (
    <>
      {quoteNote && (
        <p className="mb-12 max-w-2xl text-sm text-muted">{quoteNote}</p>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {packs.map((pack) => (
          <article
            key={pack.id}
            className={`relative flex flex-col border bg-surface p-8 transition duration-300 ${
              pack.featured
                ? "border-accent/50 ring-1 ring-accent/20"
                : "border-border hover:border-accent/30"
            }`}
          >
            {pack.featured && (
              <span className="absolute -top-3 left-6 bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-background">
                {featuredBadge}
              </span>
            )}
            <h3 className="text-xl font-medium tracking-tight">{pack.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{pack.tagline}</p>
            <ul className="mt-8 flex flex-1 flex-col gap-3 border-t border-border pt-8">
              {pack.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`${contactHref}?pack=${pack.slug}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:underline"
            >
              {ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </article>
        ))}
      </div>

      {showFooterCta && (
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href={contactHref} showArrow>
            {ctaLabel}
          </Button>
          <Link
            href={getRoute(locale, "packs")}
            className="text-sm text-muted transition hover:text-accent"
          >
            {locale === "es" ? "Ver comparativa" : "View comparison"}
          </Link>
        </div>
      )}
    </>
  );
}
