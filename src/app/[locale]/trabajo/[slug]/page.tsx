import { notFound } from "next/navigation";
import { cases, getCase } from "@/content/cases";
import { localeFor, type SlugParams } from "@/lib/page";
import { CaseView, caseMeta } from "@/views/Work";

export const dynamicParams = false;
export const generateStaticParams = () => cases.map((c) => ({ slug: c.slug }));

async function load(params: SlugParams) {
  const locale = await localeFor(params, "es");
  const k = getCase((await params).slug);
  if (!k) notFound();
  return { locale, k };
}

export async function generateMetadata({ params }: { params: SlugParams }) {
  const { locale, k } = await load(params);
  return caseMeta(locale, k);
}

export default async function Page({ params }: { params: SlugParams }) {
  const { locale, k } = await load(params);
  return <CaseView locale={locale} k={k} />;
}
