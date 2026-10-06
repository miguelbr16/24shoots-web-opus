import Link from "next/link";
import { compare, packs, type Has } from "@/content/packs";
import { ClosingBlock } from "@/components/ClosingBlock";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const copy = {
  es: {
    title: "Packs",
    intro: "Para marcas que necesitan contenido de forma continuada. Tres formas de trabajar con nosotros mes a mes; cada una se presupuesta según alcance, frecuencia y canales.",
    includes: "Incluye",
    ask: "Pedir propuesta",
    full: "Todo en uno",
    compareTitle: "Qué incluye cada pack",
    compareLead: "De un vistazo: lo que lleva cada uno y lo que no.",
    feature: "Qué incluye",
    yes: "Incluido",
    no: "No incluido",
    opt: "Opcional",
    note: "Sin precios publicados: cada pack se ajusta a tu marca. Para proyectos puntuales —un evento, una campaña— mira los servicios.",
    services: "Servicios",
    meta: "Pack Completo, Pack Audiovisual y Pack Community Management: contenido continuado para marcas, con presupuesto a medida. 24SHOOTS, Valencia.",
  },
  en: {
    title: "Packs",
    intro: "For brands that need content on an ongoing basis. Three ways of working with us month by month; each is quoted to scope, frequency and channels.",
    includes: "Includes",
    ask: "Ask for a proposal",
    full: "All in one",
    compareTitle: "What each pack includes",
    compareLead: "At a glance: what each one has and what it doesn’t.",
    feature: "What’s included",
    yes: "Included",
    no: "Not included",
    opt: "Optional",
    note: "No published prices: each pack is fitted to your brand. For one-off projects —an event, a campaign— see services.",
    services: "Services",
    meta: "Full Pack, Audiovisual Pack and Community Management Pack: ongoing content for brands, quoted to scope. 24SHOOTS, Valencia.",
  },
};

export const packsMeta = (locale: Locale) =>
  pageMetadata({ locale, title: copy[locale].title, description: copy[locale].meta, paths: { es: href.page("es", "packs"), en: href.page("en", "packs") } });

/** Short column names for the comparison table ("Pack" is implied). */
const short = (name: string) => name.replace(/^Pack\s+|\s+Pack$/i, "");

function Cell({ v, c }: { v: Has; c: (typeof copy)["es"] }) {
  if (v === "yes")
    return (
      <span className="inline-grid size-7 place-items-center rounded-full bg-rec text-ink" title={c.yes}>
        <span aria-hidden>✓</span>
        <span className="sr-only">{c.yes}</span>
      </span>
    );
  if (v === "opt") return <span className="t-mono text-[0.75rem] text-bone/80">{c.opt}</span>;
  return (
    <span className="text-ash" title={c.no}>
      <span aria-hidden>—</span>
      <span className="sr-only">{c.no}</span>
    </span>
  );
}

export function PacksView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <header className="wrap grid-12 gap-y-6 pt-12 pb-10 md:pt-20 md:pb-16">
        <h1 className="t-display col-span-12 md:col-span-6">{c.title}</h1>
        <p className="t-lead col-span-12 max-w-[40ch] text-ash md:col-span-6 md:self-end">{c.intro}</p>
      </header>

      {/* Three packs side by side (stacked on phones). */}
      <ol className="wrap grid gap-4 pb-16 md:grid-cols-3 md:pb-24">
        {packs.map((p, i) => (
          <li key={p.slug} id={p.slug} className={`flex flex-col rounded-3xl border p-6 md:p-8 ${i === 0 ? "border-rec" : "border-bone/15"}`}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="t-credit text-[3rem] leading-none text-rec">{p.index}</span>
              {i === 0 && <span className="t-mono rounded-full bg-rec px-3 py-1 text-[0.7rem] text-ink">{c.full}</span>}
            </div>
            <h2 className="t-credit mt-6 text-[clamp(2rem,1rem+2vw,3rem)] leading-[0.95]">{p.name[locale]}</h2>
            <p className="mt-3 text-ash">{p.forWhom[locale]}</p>
            <p className="t-mono mt-8 text-ash">{c.includes}</p>
            <ul className="mt-2 mb-8">
              {p.includes[locale].map((it) => (
                <li key={it} className="rule-b flex gap-3 py-2">
                  <span aria-hidden className="text-rec">✓</span>
                  {it}
                </li>
              ))}
              {p.optional && <li className="py-2 text-ash">+ {p.optional[locale]}</li>}
            </ul>
            <Link href={`${href.page(locale, "contact")}?pack=${p.slug}`} className={`cta-slab cta-slab--block mt-auto ${i === 0 ? "" : "cta-slab--ghost"}`} data-track="cta" data-cta={`pack-${p.slug}`} data-location="packs">
              <span>{c.ask}</span>
              <span aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Comparison: what each includes and what the others don't. */}
      <section className="wrap pb-16 md:pb-24" aria-labelledby="compare-title">
        <h2 id="compare-title" className="t-h2">
          {c.compareTitle}
        </h2>
        <p className="mt-3 text-ash">{c.compareLead}</p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-bone/15">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">{c.compareTitle}</caption>
            <thead>
              <tr className="bg-ink-2">
                <th scope="col" className="t-mono w-[40%] p-3 align-bottom text-[0.7rem] font-normal text-ash md:w-[46%] md:p-5">
                  {c.feature}
                </th>
                {packs.map((p) => (
                  <th key={p.slug} scope="col" className="p-2 text-center align-bottom md:p-5">
                    {/* Phones: the pack letter (as on the cards); larger screens: the name. */}
                    <span className="t-credit block text-[1.6rem] leading-none text-rec md:hidden" aria-hidden>
                      {p.index}
                    </span>
                    <span className="t-mono mt-1 block text-[0.6rem] leading-tight text-ash md:hidden">{short(p.name[locale]).split(" ")[0]}</span>
                    <span className="t-credit hidden text-[clamp(0.95rem,0.7rem+1.2vw,1.6rem)] leading-tight md:block">{short(p.name[locale])}</span>
                    <span className="sr-only md:hidden">{p.name[locale]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.map((row) => (
                <tr key={row.label.es} className="border-t border-bone/10">
                  <th scope="row" className="p-3 text-[0.95rem] font-normal md:p-5 md:text-base">
                    {row.label[locale]}
                  </th>
                  {row.has.map((v, i) => (
                    <td key={i} className="p-2 text-center md:p-5">
                      <Cell v={v} c={c} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="hidden border-t border-bone/10 md:table-row">
                <td className="p-3 md:p-5" />
                {packs.map((p) => (
                  <td key={p.slug} className="p-2 text-center md:p-5">
                    <Link href={`${href.page(locale, "contact")}?pack=${p.slug}`} className="link t-mono text-[0.7rem] md:text-[0.8rem]" data-track="cta" data-cta={`pack-${p.slug}`} data-location="packs-table">
                      {c.ask}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

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
