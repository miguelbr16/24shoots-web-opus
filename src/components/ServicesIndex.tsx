import Link from "next/link";
import { services } from "@/content/services";
import { t } from "@/content/copy";
import { href, serviceSlugs, type Locale } from "@/lib/i18n";

/** Typographic index of the three areas. */
export function ServicesIndex({ locale, headingLevel = "h2", title = true }: { locale: Locale; headingLevel?: "h2" | "h1"; title?: boolean }) {
  const c = t(locale);
  const H = headingLevel;
  return (
    <section aria-labelledby={title ? "services-title" : undefined} className="py-20 md:py-28">
      <div className="wrap">
        {title && (
          <div className="grid-12 mb-10 items-end gap-y-4">
            <H id="services-title" className="t-h2 col-span-12 md:col-span-6">
              {c.servicesBlock.title}
            </H>
            <p className="t-mono col-span-12 text-ash md:col-span-6 md:text-right">{c.servicesBlock.capabilities}</p>
          </div>
        )}
        <ul>
          {services.map((s) => (
            <li key={s.key} className="rule-t last:rule-b" data-reveal>
              <Link href={href.service(locale, serviceSlugs[s.key][locale])} className="group grid-12 items-baseline gap-y-2 py-7 md:py-9">
                <span className="t-mono col-span-2 text-ash md:col-span-1">{s.index}</span>
                <span className="t-credit col-span-10 text-[clamp(2.4rem,1.2rem+4.6vw,6rem)] transition-colors group-hover:text-rec md:col-span-6">
                  {s.name[locale]}
                </span>
                <span className="col-span-10 col-start-3 max-w-[46ch] text-ash md:col-span-4 md:col-start-8">{s.line[locale]}</span>
                <span aria-hidden className="col-span-1 hidden text-right text-2xl transition-transform group-hover:translate-x-1 md:block">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
