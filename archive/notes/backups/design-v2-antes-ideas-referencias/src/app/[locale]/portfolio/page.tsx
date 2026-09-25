import { notFound } from "next/navigation";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { SectionHeading } from "@/components/ui";
import { getPages, getPortfolio, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale } from "@/lib/i18n";
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
    title: pages.portfolio.title,
    description: pages.portfolio.subtitle,
    path: "/portfolio",
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const pages = getPages(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        title={pages.portfolio.title}
        subtitle={pages.portfolio.subtitle}
      />
      <PortfolioGrid
        items={getPortfolio(locale)}
        services={getServices(locale)}
        sectors={pages.sectors}
        locale={locale}
        labels={pages.portfolio}
      />
    </div>
  );
}
