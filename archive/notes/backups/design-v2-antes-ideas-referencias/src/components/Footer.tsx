import Link from "next/link";
import type { Locale } from "@/lib/types";
import { getRoute } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  footer: Record<string, string>;
  contact: {
    email: string;
    instagram: string;
    location: string;
  };
  siteName: string;
}

export function Footer({ locale, footer, contact, siteName }: FooterProps) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-12 md:px-6">
        <div className="md:col-span-5">
          <p className="text-sm font-light tracking-[0.2em] text-foreground">
            <span className="text-accent">24</span> SHOOTS
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {contact.location}
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-muted/70">
            Domina el impacto
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            Legal
          </p>
          <div className="flex flex-col gap-3 text-sm text-muted">
            <Link href={getRoute(locale, "legal")} className="transition hover:text-foreground">
              {footer.legal}
            </Link>
            <Link href={getRoute(locale, "privacy")} className="transition hover:text-foreground">
              {footer.privacy}
            </Link>
            <Link href={getRoute(locale, "cookies")} className="transition hover:text-foreground">
              {footer.cookies}
            </Link>
          </div>
        </div>

        <div className="md:col-span-4">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            Contacto
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <a href={`mailto:${contact.email}`} className="text-muted transition hover:text-foreground">
              {contact.email}
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition hover:text-foreground"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-[11px] uppercase tracking-widest text-muted/60">
        © {new Date().getFullYear()} {siteName}. {footer.rights}
      </div>
    </footer>
  );
}
