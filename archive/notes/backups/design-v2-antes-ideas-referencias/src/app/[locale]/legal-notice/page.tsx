import { LegalContent, generateLegalMetadata } from "@/components/LegalPage";
import { getPages } from "@/lib/content";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateLegalMetadata(locale, "notice", "/legal-notice");
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();
  const { legal } = getPages(localeParam as Locale);
  return <LegalContent title={legal.notice.title} content={legal.notice.content} />;
}
