import Link from "next/link";
import { packs } from "@/content/packs";
import { ClosingBlock } from "@/components/ClosingBlock";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const copy = {
  es: {
    title: "Packs",
    intro: "Para marcas que necesitan contenido de forma continuada. Tres formas de trabajar con nosotros mes a mes; cada una se presupuesta según alcance, frecuencia y canales.",
    includes: "Incluye",
    ask: "Pedir propuesta",
    note: "Sin precios publicados: cada pack se ajusta a tu marca. Para proyectos puntuales —un evento, una campaña— mira los servicios.",
    services: "Servicios",
    meta: "Pack Completo, Pack Audiovisual y Pack Community Management: contenido continuado para marcas, con presupuesto a medida. 24SHOOTS, Valencia.",
  },
  en: {
    title: "Packs",
    intro: "For brands that need content on an ongoing basis. Three ways of working with us month by month; each is quoted to scope, frequency and channels.",
    includes: "Includes",
    ask: "Ask for a proposal",
    note: "No published prices: each pack is fitted to your brand. For one-off projects —an event, a campaign— see services.",
    services: "Services",
    meta: "Full Pack, Audiovisual Pack and Community Management Pack: ongoing content for brands, quoted to scope. 24SHOOTS, Valencia.",
  },
};

export const packsMeta = (locale: Locale) =>
  pageMetadata({ locale, title: copy[locale].title, description: copy[locale].meta, paths: { es: href.page("es", "packs"), en: href.page("en", "packs") } });

export function PacksView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <header className="wrap grid-12 gap-y-6 pt-12 pb-10 md:pt-20 md:pb-16">
        <h1 className="t-display col-span-12 md:col-span-6">{c.title}</h1>
        <p className="t-lead col-span-12 max-w-[40ch] text-ash md:col-span-6 md:self-end">{c.intro}</p>
      </header>
      <ol className="wrap pb-12 md:pb-20">
        {packs.map((p) => (
          <li key={p.slug} className="grid-12 rule-t gap-y-5 py-8 md:py-12">
            <p className="t-credit col-span-2 text-[clamp(2.4rem,1rem+3vw,4.5rem)] text-rec md:col-span-1">{p.index}</p>
            <div className="col-span-10 md:col-span-5">
              <h2 className="t-credit text-[clamp(2.2rem,1rem+3.2vw,4.4rem)]">{p.name[locale]}</h2>
              <p className="mt-3 max-w-[40ch] text-ash">{p.forWhom[locale]}</p>
            </div>
            <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-7">
              <p className="t-mono text-ash">{c.includes}</p>
              <ul className="mt-2">
                {p.includes[locale].map((it) => (
                  <li key={it} className="rule-b py-2">
                    {it}
                  </li>
                ))}
                {p.optional && <li className="py-2 text-ash">+ {p.optional[locale]}</li>}
              </ul>
            </div>
            <div className="col-span-10 col-start-3 md:col-span-2 md:col-start-11 md:justify-self-end">
              <Link href={`${href.page(locale, "contact")}?pack=${p.slug}`} className="link whitespace-nowrap">
                {c.ask} →
              </Link>
            </div>
          </li>
        ))}
      </ol>
      <p className="wrap t-mono pb-16 text-ash">
        {c.note}{" "}
        <Link className="link" href={href.page(locale, "services")}>
          {c.services} →
        </Link>
      </p>
      <ClosingBlock locale={locale} />
    </>
  );
}
