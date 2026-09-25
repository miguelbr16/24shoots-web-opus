import { notFound } from "next/navigation";
import { getService } from "@/content/services";
import { serviceKeyFromSlug, serviceSlugs } from "@/lib/i18n";
import { localeFor, type SlugParams } from "@/lib/page";
import { ServiceView, serviceMeta } from "@/views/Services";

export const dynamicParams = false;
export const generateStaticParams = () => Object.values(serviceSlugs).map((s) => ({ slug: s.en }));

async function load(params: SlugParams) {
  const locale = await localeFor(params, "en");
  const key = serviceKeyFromSlug(locale, (await params).slug);
  if (!key) notFound();
  return { locale, s: getService(key) };
}

export async function generateMetadata({ params }: { params: SlugParams }) {
  const { locale, s } = await load(params);
  return serviceMeta(locale, s);
}

export default async function Page({ params }: { params: SlugParams }) {
  const { locale, s } = await load(params);
  return <ServiceView locale={locale} s={s} />;
}
