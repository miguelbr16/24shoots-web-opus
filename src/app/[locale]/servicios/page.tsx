import { localeFor, type LocaleParams } from "@/lib/page";
import { ServicesView, servicesMeta } from "@/views/Services";

export async function generateMetadata({ params }: { params: LocaleParams }) {
  return servicesMeta(await localeFor(params, "es"));
}

export default async function Page({ params }: { params: LocaleParams }) {
  const locale = await localeFor(params, "es");
  return <ServicesView locale={locale} />;
}
