import { notFound } from "next/navigation";
import { Button, SectionHeading } from "@/components/ui";
import { getPages, getServiceBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getRoute, isValidLocale } from "@/lib/i18n";
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
        {pages.services.title}
      </p>
      <h1 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">{service.title}</h1>
      <p className="mt-8 text-lg font-light leading-relaxed text-muted">
        {service.description}
      </p>

      <div className="mt-12 border border-border bg-surface p-8 md:p-10">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          {pages.services.highlights}
        </h2>
        <ul className="mt-6 space-y-4">
          {service.highlights.map((item) => (
            <li key={item} className="flex items-start gap-4 text-sm text-muted">
              <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <Button href={getRoute(locale, "contact")} showArrow>{pages.services.cta}</Button>
      </div>
    </div>
  );
}
