import { Hero24 } from "@/components/Hero24";
import { ProofSequence } from "@/components/ProofSequence";
import { IdeaBlock } from "@/components/IdeaBlock";
import { ClosingBlock } from "@/components/ClosingBlock";
import { t } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const homeMeta = (locale: Locale) =>
  pageMetadata({
    locale,
    title: t(locale).meta.homeTitle,
    description: t(locale).meta.homeDescription,
    paths: { es: "/", en: "/en" },
    absoluteTitle: true,
  });

/** Home as a trailer: IMPACT → PROOF → IDEA → CONVERSION. The full film is /trabajo. */
export function Home({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero24 locale={locale} />
      <ProofSequence locale={locale} />
      <IdeaBlock locale={locale} />
      <ClosingBlock locale={locale} />
    </>
  );
}
