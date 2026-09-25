import { ClientsList } from "@/components/ClientsList";
import { ContactBlock } from "@/components/ContactBlock";
import { t } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const studioMeta = (locale: Locale) =>
  pageMetadata({
    locale,
    title: t(locale).studio.title,
    description: t(locale).studio.lead.slice(0, 158).replace(/\s+\S*$/, "") + "…",
    paths: { es: href.page("es", "studio"), en: href.page("en", "studio") },
  });

/**
 * PENDING: team (names, roles, photos) and founding year. They are rendered
 * only once supplied — until then the page states only what is verifiable.
 */
export function StudioView({ locale }: { locale: Locale }) {
  const c = t(locale).studio;
  return (
    <>
      <header className="wrap grid-12 gap-y-8 pt-14 pb-16 md:pt-24 md:pb-24">
        <h1 className="t-display col-span-12">{c.title}</h1>
        <p className="t-lead col-span-12 max-w-[46ch] md:col-span-8 md:col-start-5">{c.lead}</p>
      </header>

      <section aria-labelledby="how-title" className="on-paper py-16 md:py-24">
        <div className="wrap grid-12 gap-y-10">
          <h2 id="how-title" className="t-h2 col-span-12 md:col-span-4">
            {c.howTitle}
          </h2>
          <ol className="col-span-12 md:col-span-7 md:col-start-6">
            {c.how.map((h, i) => (
              <li key={h.t} className="rule-t grid grid-cols-[3rem_1fr] gap-y-2 py-6 md:grid-cols-[3rem_10rem_1fr]" data-reveal>
                <span className="t-mono text-soot">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3">{h.t}</h3>
                <p className="col-start-2 max-w-[48ch] text-soot md:col-start-3">{h.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="agencies-title" className="wrap grid-12 gap-y-6 py-16 md:py-24">
        <h2 id="agencies-title" className="t-mono col-span-12 text-ash md:col-span-3">
          {c.agenciesTitle}
        </h2>
        <p className="t-h3 col-span-12 max-w-[34ch] md:col-span-8">{c.agencies}</p>
      </section>

      <ClientsList locale={locale} />
      <ContactBlock locale={locale} />
    </>
  );
}
