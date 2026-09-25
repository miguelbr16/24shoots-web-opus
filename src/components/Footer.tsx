import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { t } from "@/content/copy";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Footer({ locale }: { locale: Locale }) {
  const c = t(locale);
  const year = 2026;
  return (
    <footer className="rule-t">
      <div className="wrap grid-12 gap-y-10 py-14 md:py-20">
        <div className="col-span-12 md:col-span-5">
          <Wordmark className="text-[2.6rem]" />
          <p className="mt-4 max-w-[28ch] text-ash">{c.footer.tagline}</p>
          <p className="t-mono mt-6 text-ash">{site.city[locale]}</p>
        </div>
        <nav aria-label={locale === "es" ? "Pie de página" : "Footer"} className="col-span-6 md:col-span-3">
          <ul className="space-y-2">
            <li><Link className="link no-underline hover:underline" href={href.page(locale, "work")}>{c.nav.work}</Link></li>
            <li><Link className="link no-underline hover:underline" href={href.page(locale, "services")}>{c.nav.services}</Link></li>
            <li><Link className="link no-underline hover:underline" href={href.page(locale, "studio")}>{c.nav.studio}</Link></li>
            <li><Link className="link no-underline hover:underline" href={href.page(locale, "contact")}>{c.nav.contact}</Link></li>
          </ul>
        </nav>
        <address className="col-span-6 not-italic md:col-span-4">
          <ul className="space-y-2">
            <li><a className="link" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            <li><a className="link no-underline hover:underline" href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a></li>
            <li><a className="link no-underline hover:underline" href={site.contact.instagram} rel="me noopener" target="_blank">Instagram {site.contact.instagramHandle}</a></li>
          </ul>
        </address>
      </div>
      <div className="wrap t-mono flex flex-col gap-3 pb-8 text-ash sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} 24SHOOTS. {c.footer.rights}</p>
        <ul className="flex gap-5">
          <li><Link className="hover:text-bone" href={href.page(locale, "legal")}>{c.footer.legal}</Link></li>
          <li><Link className="hover:text-bone" href={href.page(locale, "privacy")}>{c.footer.privacy}</Link></li>
          <li><Link className="hover:text-bone" href={href.page(locale, "cookies")}>{c.footer.cookies}</Link></li>
        </ul>
      </div>
    </footer>
  );
}
