import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/ServiceDetailView";
import { getPages, getPortfolio, getServiceBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export async function generateStaticParams() {
  const { getServices } = await import("@/lib/content");
  return getServices("es").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isValidLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const service = getServiceBySlug(locale, slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    title: service.title,
    description: service.shortDescription,
    path: `/servicios/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const service = getServiceBySlug(locale, slug);
  if (!service) notFound();

  const pages = getPages(locale);
  const relatedProjects = getPortfolio(locale)
    .filter((p) => p.services.includes(service.id))
    .slice(0, 3);

  return (
    <ServiceDetailView
      service={service}
      locale={locale}
      pages={{ services: pages.services, nav: pages.nav, sectors: pages.portfolioCategories }}
      relatedProjects={relatedProjects}
    />
  );
}
