import { localeFor, type LocaleParams } from "@/lib/page";
import { Home, homeMeta } from "@/views/Home";

export async function generateMetadata({ params }: { params: LocaleParams }) {
  return homeMeta(await localeFor(params));
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <Home locale={await localeFor(params)} />;
}
