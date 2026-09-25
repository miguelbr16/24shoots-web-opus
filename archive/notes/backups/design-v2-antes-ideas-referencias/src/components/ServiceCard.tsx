import Link from "next/link";
import type { Service } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getRoute } from "@/lib/i18n";
import { ServiceIcon, ArrowRight } from "./icons/ServiceIcon";

interface ServiceCardProps {
  service: Service;
  locale: Locale;
  cta?: string;
}

export function ServiceCard({ service, locale, cta }: ServiceCardProps) {
  const servicesBase = getRoute(locale, "services");

  return (
    <Link
      href={`${servicesBase}/${service.slug}`}
      className="group relative flex flex-col border border-border bg-surface p-8 transition duration-500 hover:border-accent/50"
    >
      <div className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
      <div className="text-accent/80 transition group-hover:text-accent">
        <ServiceIcon name={service.icon} className="h-7 w-7" />
      </div>
      <h3 className="mt-8 text-lg font-medium tracking-tight transition group-hover:text-accent">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {service.shortDescription}
      </p>
      {cta && (
        <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted transition group-hover:text-accent">
          {cta}
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </span>
      )}
    </Link>
  );
}
