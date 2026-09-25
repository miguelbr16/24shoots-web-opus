import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getRoute } from "@/lib/i18n";
import { ServiceIcon, ArrowRight } from "./icons/ServiceIcon";

interface ServiceCardProps {
  service: Service;
  locale: Locale;
  cta?: string;
  index?: number;
}

export function ServiceCard({ service, locale, cta, index }: ServiceCardProps) {
  const servicesBase = getRoute(locale, "services");

  return (
    <Link
      href={`${servicesBase}/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden border border-border bg-surface transition duration-500 hover:border-accent/40"
    >
      {service.image && (
        <div className="relative aspect-[16/10] overflow-hidden bg-media">
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="text-accent/80 transition group-hover:text-accent">
            <ServiceIcon name={service.icon} className="h-7 w-7" />
          </div>
          {index !== undefined && (
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted/50">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        <h3 className="mt-6 text-lg font-medium tracking-tight transition group-hover:text-accent md:text-xl">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">
          {service.shortDescription}
        </p>

        {service.highlights.length > 0 && (
          <ul className="mt-5 space-y-2 border-t border-border pt-5">
            {service.highlights.slice(0, 3).map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-xs leading-relaxed text-muted"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {cta && (
          <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted transition group-hover:text-accent">
            {cta}
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </Link>
  );
}
