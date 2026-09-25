import { localeFor, type LocaleParams } from "@/lib/page";
import { StudioView, studioMeta } from "@/views/Studio";

export async function generateMetadata({ params }: { params: LocaleParams }) {
  return studioMeta(await localeFor(params, "en"));
}

export default async function Page({ params }: { params: LocaleParams }) {
  const locale = await localeFor(params, "en");
  return <StudioView locale={locale} />;
}
