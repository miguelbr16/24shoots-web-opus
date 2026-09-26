import Image from "next/image";
import Link from "next/link";
import { FilmLoop } from "./FilmLoop";
import { caseFilm } from "@/lib/media";
import { cases, caseMedia } from "@/content/cases";
import { t } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";

const get = (slug: string, locale: Locale) => {
  const k = cases.find((c) => c.slug === slug)!;
  return { k, m: caseMedia(k.slug), url: href.case(locale, k.slug) };
};

/** PRUEBA — a trailer, not an index: three projects, three different framings. */
export function ProofSequence({ locale }: { locale: Locale }) {
  const c = t(locale);
  const h = get("huhtamaki-50", locale);
  const i = get("premios-isabel-ferrer", locale);
  const im = get("imperia-scm", locale);
  const hFilm = caseFilm(h.m.cover, h.m.preview);

  return (
    <section aria-label={c.proof.label} className="pb-14 md:pb-24">
      {/* 01 — full bleed, moving */}
      <Link href={h.url} className="group relative block aspect-[4/5] max-h-[78svh] w-full sm:aspect-video md:h-[86svh] md:max-h-none md:aspect-auto">
        <FilmLoop {...hFilm} className="absolute inset-0" alt={h.k.stillAlts[locale][9]} position="50% 45%" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(14,13,12,.85),rgba(14,13,12,0)_55%)]" aria-hidden />
        <div className="wrap absolute inset-x-0 bottom-5 flex items-end justify-between gap-6 md:bottom-10">
          <div>
            <p className="t-mono text-bone/75">
              01 · {h.k.kind[locale]} · {h.k.when?.[locale]}
            </p>
            <p className="t-credit mt-2 text-[clamp(3.2rem,1rem+8.6vw,10.5rem)] transition-colors group-hover:text-rec">{h.k.client}</p>
            <p className="t-h3 mt-1">{h.k.title[locale]}</p>
          </div>
          <span className="t-mono hidden shrink-0 text-bone md:inline">{c.proof.film} →</span>
        </div>
      </Link>

      {/* 02 + 03 — an asymmetric pair: tall frame, wide frame, offset */}
      <div className="wrap grid-12 mt-10 gap-y-10 md:mt-24">
        <Link href={i.url} className="group col-span-12 md:col-span-5">
          <span className="relative block aspect-[16/10] overflow-hidden bg-ink-2 md:aspect-[4/5]">
            <Image src={i.m.stills[2]} alt={i.k.stillAlts[locale][2]} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          </span>
          <span className="t-mono mt-3 block text-ash">
            02 · {i.k.kind[locale]} · {i.k.when?.[locale]}
          </span>
          <span className="t-credit mt-2 block text-[clamp(2rem,1rem+2.6vw,3.6rem)] transition-colors group-hover:text-rec">{i.k.client}</span>
          <span className="block text-ash">{i.k.title[locale]}</span>
        </Link>

        <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-[22%]">
          <p className="mb-6 max-w-[18ch] text-[clamp(1.6rem,1rem+2vw,3rem)] leading-[1.05] tracking-tight max-md:hidden">{c.proof.isabelLine}</p>
          <Link href={im.url} className="group block">
            <span className="relative block aspect-video overflow-hidden bg-ink-2 max-md:ml-[18%]">
              <Image src={im.m.stills[5]} alt={im.k.stillAlts[locale][5]} fill sizes="(min-width: 768px) 50vw, 82vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </span>
            <span className="max-md:ml-[18%] block">
              <span className="t-mono mt-3 block text-ash">03 · {im.k.kind[locale]}</span>
              <span className="t-credit mt-2 block text-[clamp(2rem,1rem+2.6vw,3.6rem)] transition-colors group-hover:text-rec">{im.k.client}</span>
              <span className="block text-ash">{im.k.title[locale]}</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="wrap mt-10 flex justify-end md:mt-16">
        <Link href={href.page(locale, "work")} className="link">
          {c.proof.all} →
        </Link>
      </div>
    </section>
  );
}
