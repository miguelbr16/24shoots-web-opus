import { notFound } from "next/navigation";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/ui";
import { getPages, getServices } from "@/lib/content";
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
    title: pages.services.title,
    description: pages.services.subtitle,
    path: "/services",
  });
}

export default async function ServicesEnPage({
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
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        title={pages.services.title}
        subtitle={pages.services.subtitle}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            locale={locale}
            cta={pages.services.cta}
          />
        ))}
      </div>
    </div>
  );
}
