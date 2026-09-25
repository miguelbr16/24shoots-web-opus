import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui";
import { getPages } from "@/lib/content";
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
    title: pages.about.title,
    description: pages.about.subtitle,
    path: "/sobre-nosotros",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { about } = getPages(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading title={about.title} subtitle={about.subtitle} />
      {about.content.split("\n\n").map((paragraph) => (
        <p key={paragraph.slice(0, 20)} className="mb-4 leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}
      <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
        {about.values.map((value, i) => (
          <div key={value.title} className="border-t border-border bg-background p-8 md:border-t-0">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-medium tracking-tight">{value.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
