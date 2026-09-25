import { localeFor, type LocaleParams } from "@/lib/page";
import { ContactView, contactMeta } from "@/views/Contact";

export async function generateMetadata({ params }: { params: LocaleParams }) {
  return contactMeta(await localeFor(params, "en"));
}

export default async function Page({ params }: { params: LocaleParams }) {
  const locale = await localeFor(params, "en");
  return <ContactView locale={locale} />;
}
