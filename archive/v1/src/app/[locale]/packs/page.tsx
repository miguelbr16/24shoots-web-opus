import { notFound } from "next/navigation";
import { PacksComparison } from "@/components/PacksComparison";
import { PacksGrid } from "@/components/PacksGrid";
import { Button, SectionHeading } from "@/components/ui";
import { getPages, getPacks } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getRoute, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const pages = getPages(locale);
  return buildMetadata({
    locale,
    title: pages.packs.title,
    description: pages.packs.subtitle,
    path: "/packs",
  });
}

export default async function PacksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const pages = getPages(locale);
  const packs = getPacks(locale);
  const { packs: copy } = pages;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading title={copy.title} subtitle={copy.subtitle} />
      <PacksGrid
        locale={locale}
        packs={packs}
        featuredBadge={copy.featuredBadge}
        ctaLabel={copy.ctaLabel}
        quoteNote={copy.quoteNote}
        showFooterCta={false}
      />
      <PacksComparison
        title={copy.compareTitle}
        packs={packs.map((p) => ({ id: p.id, title: p.title }))}
        rows={copy.comparisonRows}
        yesLabel={copy.compareYes}
        noLabel={copy.compareNo}
      />
      <div className="mt-16 text-center">
        <Button href={getRoute(locale, "contact")} showArrow>
          {copy.ctaLabel}
        </Button>
      </div>
    </div>
  );
}
