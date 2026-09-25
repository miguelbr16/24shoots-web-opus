import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CaseRow } from "@/components/CaseRow";
import { DaySection } from "@/components/DaySection";
import { ServicesIndex } from "@/components/ServicesIndex";
import { ClientsList } from "@/components/ClientsList";
import { ContactBlock } from "@/components/ContactBlock";
import { cases } from "@/content/cases";
import { t } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const homeMeta = (locale: Locale) =>
  pageMetadata({
    locale,
    title: t(locale).meta.homeTitle,
    description: t(locale).meta.homeDescription,
    paths: { es: "/", en: "/en" },
    absoluteTitle: true,
  });

export function Home({ locale }: { locale: Locale }) {
  const c = t(locale);
  return (
    <>
      <Hero locale={locale} />

      <section aria-labelledby="work-title" className="pt-16 pb-10 md:pt-24">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-4 pb-8">
            <h2 id="work-title" className="t-h2 col-span-12 md:col-span-7">
              {c.work.title}
            </h2>
            <p className="col-span-12 max-w-[42ch] text-ash md:col-span-5 md:justify-self-end md:text-right">{c.work.intro}</p>
          </div>
          {cases.map((k, i) => (
            <CaseRow key={k.slug} c={k} locale={locale} index={i} flip={i % 2 === 1} />
          ))}
          <div className="rule-t flex justify-end pt-6">
            <Link href={href.page(locale, "work")} className="cta">
              {c.work.all} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <DaySection locale={locale} />
      <ServicesIndex locale={locale} />
      <ClientsList locale={locale} />
      <ContactBlock locale={locale} />
    </>
  );
}
