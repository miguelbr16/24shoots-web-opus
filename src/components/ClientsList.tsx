import Link from "next/link";
import { cases } from "@/content/cases";
import { t } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";

/** Real clients only, each linked to its project. No logos, no wheel. */
export function ClientsList({ locale, headingLevel = "h2", agencies = true }: { locale: Locale; headingLevel?: "h2" | "h3"; agencies?: boolean }) {
  const c = t(locale).clients;
  const H = headingLevel;
  return (
    <section aria-labelledby="clients-title" className="rule-t py-20 md:py-28">
      <div className="wrap grid-12 gap-y-8">
        <H id="clients-title" className="t-mono col-span-12 text-ash md:col-span-3">
          {c.title}
        </H>
        <div className="col-span-12 md:col-span-9">
          <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
            {cases.map((k, i) => (
              <li key={k.slug} className="flex items-baseline gap-x-5">
                <Link href={href.case(locale, k.slug)} className="t-credit text-[clamp(2rem,1rem+3.6vw,4.4rem)] hover:text-rec transition-colors">
                  {k.client}
                </Link>
                {i < cases.length - 1 && (
                  <span aria-hidden className="text-[clamp(1.6rem,1rem+2vw,3rem)] font-light text-ash">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
          {agencies && <p className="mt-8 max-w-[52ch] text-ash">{c.agencies}</p>}
        </div>
      </div>
    </section>
  );
}
