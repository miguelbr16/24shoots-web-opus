import { localeFor, type LocaleParams } from "@/lib/page";
import { PacksView, packsMeta } from "@/views/Packs";

export async function generateMetadata({ params }: { params: LocaleParams }) {
  return packsMeta(await localeFor(params));
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <PacksView locale={await localeFor(params)} />;
}
