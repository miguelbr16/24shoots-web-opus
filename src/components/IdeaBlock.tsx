import Image from "next/image";
import Link from "next/link";
import { caseMedia } from "@/content/cases";
import { t } from "@/content/copy";
import { href, serviceSlugs, type Locale, type ServiceKey } from "@/lib/i18n";

/** IDEA — the proposition as a chain, the three territories inside one sentence, proof as frames. */
export function IdeaBlock({ locale }: { locale: Locale }) {
  const c = t(locale).idea;
  const m = caseMedia("huhtamaki-50");
  const frames = m.sheet!.filter((_, n) => [0, 1, 4, 6, 7, 9, 10, 11].includes(n));
  return (
    <section aria-labelledby="idea-title" className="on-paper py-16 md:py-28">
      <div className="wrap">
        <p className="t-mono text-soot">{c.kicker}</p>
        <ol className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1" aria-label={c.chain.join(" → ")}>
          {c.chain.map((w, n) => (
            <li key={w} className="flex items-baseline gap-x-3">
              <span className={`t-credit text-[clamp(1.9rem,1rem+3.4vw,4.6rem)] ${n === c.chain.length - 1 ? "text-rec-deep" : ""}`}>{w}</span>
              {n < c.chain.length - 1 && (
                <span aria-hidden className="text-[clamp(1.2rem,0.8rem+1.6vw,2.4rem)] text-soot">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="grid-12 mt-12 gap-y-8 md:mt-20">
          <h2 id="idea-title" className="t-h2 col-span-12 md:col-span-6">
            {c.title}
          </h2>
          <p className="t-lead col-span-12 md:col-span-6 md:pt-2">
            {c.body}{" "}
            {c.territories.map((tr) => (
              <span key={tr.key}>
                <Link href={href.service(locale, serviceSlugs[tr.key as ServiceKey][locale])} className="font-medium underline decoration-rec-deep decoration-2 underline-offset-[0.2em] hover:text-rec-deep">
                  {tr.text}
                </Link>
                {tr.after}
              </span>
            ))}
          </p>
        </div>

        <figure className="mt-12 md:mt-20">
          <ol className="grid grid-cols-4 gap-1 md:grid-cols-8">
            {frames.map((src) => (
              <li key={src} className="relative aspect-[4/5] overflow-hidden bg-ink md:aspect-[3/4]">
                <Image src={src} alt="" fill sizes="(min-width: 768px) 12vw, 25vw" quality={60} className="object-cover" />
              </li>
            ))}
          </ol>
          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <span className="t-mono text-soot">{c.sheetCaption}</span>
            <Link className="link t-mono" href={href.page(locale, "packs")}>
              {c.packs} →
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
