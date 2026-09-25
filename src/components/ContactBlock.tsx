import { t } from "@/content/copy";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";

export function ContactBlock({ locale }: { locale: Locale }) {
  const c = t(locale).contactBlock;
  return (
    <section id="contacto" aria-labelledby="contact-title" className="rule-t py-20 md:py-28">
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <h2 id="contact-title" className="t-h1">
            {c.title}
          </h2>
          <p className="t-lead mt-6 max-w-[30ch] text-ash">{c.lead}</p>
          <div className="mt-10 space-y-2">
            <p className="t-mono text-ash">{c.direct}</p>
            <a className="link t-h3 block" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <ContactForm locale={locale} idPrefix="home" />
        </div>
      </div>
    </section>
  );
}
