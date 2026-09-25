import { localeFor, type LocaleParams } from "@/lib/page";
import { ContactView, contactMeta } from "@/views/Contact";

export async function generateMetadata({ params }: { params: LocaleParams }) {
  return contactMeta(await localeFor(params, "es"));
}

export default async function Page({ params }: { params: LocaleParams }) {
  const locale = await localeFor(params, "es");
  return <ContactView locale={locale} />;
}
