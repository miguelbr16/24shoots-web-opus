import Image from "next/image";
import Link from "next/link";
import { caseMedia, type Case } from "@/content/cases";
import { href, type Locale } from "@/lib/i18n";
import { t } from "@/content/copy";
import { PreviewLoop } from "./PreviewLoop";

/** Editorial row: large frame + credit block. Alternates sides on desktop. */
export function CaseRow({ c, locale, index, flip, headingLevel = "h3" }: { c: Case; locale: Locale; index: number; flip?: boolean; headingLevel?: "h2" | "h3" }) {
  const m = caseMedia(c.slug);
  const url = href.case(locale, c.slug);
  const H = headingLevel;
  const coverIndex = m.stills.indexOf(m.cover);
  return (
    <article className="grid-12 gap-y-5 py-10 rule-t md:py-14" data-reveal>
      <Link
        href={url}
        tabIndex={-1}
        aria-hidden
        className={`group relative col-span-12 -mx-[var(--gutter)] block aspect-[4/5] max-h-[80svh] w-[calc(100%+2*var(--gutter))] md:w-auto overflow-hidden bg-ink-2 sm:aspect-video md:mx-0 md:col-span-8 ${flip ? "md:col-start-5 md:row-start-1" : ""}`}
      >
        <Image
          src={m.cover}
          alt={c.stillAlts[locale][coverIndex] ?? ""}
          fill
          sizes="(min-width: 768px) 66vw, 100vw"
          quality={70}
          className="object-cover transition-transform duration-700 ease-[var(--ease-cut)] group-hover:scale-[1.015]"
        />
        <PreviewLoop webm={m.preview.webm} mp4={m.preview.mp4} />
      </Link>
      <div className={`col-span-12 flex flex-col justify-between gap-6 md:col-span-4 ${flip ? "md:col-start-1 md:row-start-1" : ""}`}>
        <div>
          <p className="t-mono text-ash">
            {String(index + 1).padStart(2, "0")} · {c.kind[locale]}
            {c.when ? ` · ${c.when[locale]}` : ""}
          </p>
          <H className="mt-4">
            <Link href={url} className="group block">
              <span className="t-credit block text-[clamp(2.4rem,1.4rem+3.2vw,4.6rem)] group-hover:text-rec transition-colors">{c.client}</span>
              <span className="t-h3 mt-3 block">{c.title[locale]}</span>
            </Link>
          </H>
        </div>
        <div>
          <p className="max-w-[44ch] text-ash">{c.summary[locale]}</p>
          <Link href={url} className="cta cta--quiet mt-5" aria-label={`${t(locale).work.view}: ${c.client} — ${c.title[locale]}`}>
            {t(locale).work.view} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
