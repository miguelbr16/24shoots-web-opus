import { localeFor, type LocaleParams } from "@/lib/page";
import { StudioView, studioMeta } from "@/views/Studio";

export async function generateMetadata({ params }: { params: LocaleParams }) {
  return studioMeta(await localeFor(params, "es"));
}

export default async function Page({ params }: { params: LocaleParams }) {
  const locale = await localeFor(params, "es");
  return <StudioView locale={locale} />;
}
