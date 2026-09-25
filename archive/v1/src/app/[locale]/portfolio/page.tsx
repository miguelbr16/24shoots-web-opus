import { notFound } from "next/navigation";
import { PortfolioCategoryRows } from "@/components/PortfolioCategoryRows";
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

  const services = getServices(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <SectionHeading
        title={pages.portfolio.title}
        subtitle={pages.portfolio.subtitle}
        className="!mb-4 md:!mb-5"
      />
      <PortfolioCategoryRows
        items={getPortfolio(locale)}
        categories={pages.portfolioCategories}
        locale={locale}
        labels={pages.portfolio}
        serviceTitles={Object.fromEntries(services.map((s) => [s.id, s.title]))}
      />
    </div>
  );
}
