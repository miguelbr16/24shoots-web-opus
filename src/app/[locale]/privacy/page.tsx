import { localeFor, type LocaleParams } from "@/lib/page";
import { LegalView, legalMeta } from "@/views/Legal";

export async function generateMetadata({ params }: { params: LocaleParams }) {
  return legalMeta(await localeFor(params, "en"), "privacy");
}

export default async function Page({ params }: { params: LocaleParams }) {
  const locale = await localeFor(params, "en");
  return <LegalView locale={locale} kind="privacy" />;
}
