"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { alternatePath, href, type Locale } from "@/lib/i18n";
import { t } from "@/content/copy";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Header({ locale }: { locale: Locale }) {
  const c = t(locale).nav;
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const other: Locale = locale === "es" ? "en" : "es";

  const links = [
    { href: href.page(locale, "work"), label: c.work },
    { href: href.page(locale, "services"), label: c.services },
    { href: href.page(locale, "studio"), label: c.studio },
  ];
  const contactHref = href.page(locale, "contact");
  const isCurrent = (h: string) => pathname === h || pathname.startsWith(h + "/");

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a,button"));
        const [a, b] = [items[0], items[items.length - 1]];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/92 backdrop-blur-[2px] rule-b">
      <a href="#main" className="skip-link">
        {c.skip}
      </a>
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href={href.home(locale)} className="relative z-10 -my-2 py-2" aria-label={`24SHOOTS — ${c.home}`}>
          <Wordmark />
        </Link>

        <nav aria-label={locale === "es" ? "Principal" : "Main"} className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.98rem]">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  className="group inline-flex items-center gap-2 py-3"
                >
                  <span className={`rec-dot transition-opacity ${isCurrent(l.href) ? "opacity-100" : "opacity-0"}`} aria-hidden />
                  <span className="link no-underline group-hover:underline">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-7 md:flex">
          <Link
            href={alternatePath(pathname, other)}
            hrefLang={other}
            lang={other}
            className="t-mono text-ash hover:text-bone py-3"
            aria-label={c.language}
          >
            {c.languageShort}
          </Link>
          <Link
            href={contactHref}
            aria-current={isCurrent(contactHref) ? "page" : undefined}
            className="inline-flex items-center gap-2 border-b-2 border-rec py-1.5 font-medium"
          >
            {c.cta}
          </Link>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="relative z-10 -mr-2 inline-flex min-h-11 items-center px-2 t-mono text-[0.8rem] md:hidden"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? c.close : c.menu}
        </button>
      </div>

      {/* Mobile menu: full screen, large type */}
      <div
        id="menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={c.menu}
        hidden={!open}
        className="fixed inset-0 top-[var(--header-h)] z-40 flex h-[calc(100dvh-var(--header-h))] flex-col justify-between bg-ink md:hidden"
      >
        <nav aria-label={locale === "es" ? "Menú" : "Menu"} className="wrap pt-8">
          <ul>
            {[...links, { href: contactHref, label: c.contact }].map((l, i) => (
              <li key={l.href} className="rule-b">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  className="flex items-baseline justify-between py-4"
                >
                  <span className="t-credit text-[3.4rem]">{l.label}</span>
                  <span className="t-mono text-ash">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="wrap flex items-end justify-between pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="t-mono space-y-2 text-ash">
            <a className="block text-bone" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            <a className="block" href={`tel:${site.contact.phone}`}>
              {site.contact.phoneDisplay}
            </a>
          </div>
          <Link href={alternatePath(pathname, other)} hrefLang={other} lang={other} className="t-mono min-h-11 inline-flex items-end">
            {c.language}
          </Link>
        </div>
      </div>
    </header>
  );
}
