import Link from "next/link";
import { t } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/** The close: orange = the thing you can act on. Short, then the footer. */
export function ClosingBlock({ locale, title }: { locale: Locale; title?: string }) {
  const c = t(locale).closing;
  return (
    <section aria-labelledby="closing-title" className="bg-rec text-ink">
      <div className="wrap grid-12 gap-y-8 py-16 md:py-24">
        <h2 id="closing-title" className="t-credit col-span-12 text-[clamp(3.2rem,1rem+8vw,10rem)] md:col-span-8">
          {title ?? c.title}
        </h2>
        <div className="col-span-12 flex flex-col justify-end gap-6 md:col-span-4">
          <p className="max-w-[34ch] text-[1.05rem]">{c.lead}</p>
          <Link
            href={href.page(locale, "contact")}
            className="group inline-grid min-h-14 w-full grid-cols-[1fr_3.5rem] items-stretch bg-ink text-bone transition-colors hover:bg-bone hover:text-ink focus-visible:outline-ink"
          >
            <span className="t-credit flex items-center px-5 text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] tracking-normal">{t(locale).hero.primary}</span>
            <span aria-hidden className="grid place-items-center border-l border-bone/25 text-xl transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <p className="t-mono">
            {c.or}{" "}
            <a className="underline underline-offset-4" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
