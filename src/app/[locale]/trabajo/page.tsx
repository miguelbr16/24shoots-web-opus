import { localeFor, type LocaleParams } from "@/lib/page";
import { WorkIndex, workMeta } from "@/views/Work";

export async function generateMetadata({ params }: { params: LocaleParams }) {
  return workMeta(await localeFor(params, "es"));
}

export default async function Page({ params }: { params: LocaleParams }) {
  const locale = await localeFor(params, "es");
  return <WorkIndex locale={locale} />;
}
