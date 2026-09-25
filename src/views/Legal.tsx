import { legal } from "@/content/legal";
import { href, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Kind = keyof typeof legal;

export const legalMeta = (locale: Locale, kind: Kind) =>
  pageMetadata({
    locale,
    title: legal[kind][locale].title,
    description: legal[kind][locale].sections[0].p[0].slice(0, 150),
    paths: { es: href.page("es", kind), en: href.page("en", kind) },
    noindex: true,
  });

export function LegalView({ locale, kind }: { locale: Locale; kind: Kind }) {
  const doc = legal[kind][locale];
  return (
    <article className="wrap grid-12 gap-y-10 pt-14 pb-24 md:pt-24">
      <header className="col-span-12 md:col-span-4">
        <h1 className="t-h1">{doc.title}</h1>
        <p className="t-mono mt-6 text-ash">
          {locale === "es" ? "Actualizado" : "Updated"}: {site.legal.updated[locale]}
        </p>
      </header>
      <div className="prose-24 col-span-12 md:col-span-7 md:col-start-6">
        {doc.sections.map((s) => (
          <section key={s.h} className="rule-t py-6">
            <h2 className="t-h3 mb-3">{s.h}</h2>
            {s.p.map((p) => (
              <p key={p.slice(0, 40)} className="text-ash">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
