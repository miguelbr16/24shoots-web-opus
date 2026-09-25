"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale, Service } from "@/lib/types";
import { getRoute } from "@/lib/i18n";
import { LightBand } from "./LightBand";
import { ServiceIcon } from "./icons/ServiceIcon";

interface ServicesAccordionProps {
  title: string;
  subtitle: string;
  services: Service[];
  locale: Locale;
  viewLabel: string;
  highlightsLabel: string;
  allServicesLabel: string;
}

function ServiceItem({
  service,
  index,
  isOpen,
  onToggle,
  servicesBase,
  viewLabel,
  highlightsLabel,
  compact,
}: {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  servicesBase: string;
  viewLabel: string;
  highlightsLabel: string;
  compact: boolean;
}) {
  return (
    <div
      className={`transition-colors ${
        isOpen ? "bg-white/55 lg:bg-white/40" : "hover:bg-white/30"
      }`}
    >
      <button
        type="button"
        className={`flex w-full items-center gap-3 text-left transition md:gap-4 ${
          compact ? "px-1 py-3.5" : "px-2 py-4 md:py-4"
        }`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="w-5 shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-light-band-muted md:text-[10px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="shrink-0 text-accent">
          <ServiceIcon name={service.icon} className="h-4 w-4 md:h-5 md:w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium leading-snug tracking-tight text-light-band-text md:text-base">
            {service.title}
          </span>
          {!isOpen && !compact && (
            <span className="mt-0.5 hidden truncate text-xs text-light-band-muted sm:block">
              {service.shortDescription}
            </span>
          )}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm leading-none transition ${
            isOpen
              ? "bg-accent text-white"
              : "bg-light-band-surface text-light-band-muted"
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="px-1 pb-4 md:px-2 md:pb-5">
          {service.image && (
            <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-sm bg-light-band-surface">
              <Image
                src={service.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-light-band-text/35 to-transparent" />
            </div>
          )}

          <p className="text-sm leading-relaxed text-light-band-text/80">
            {service.shortDescription}
          </p>

          {service.highlights.length > 0 && (
            <div className="mt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-light-band-muted">
                {highlightsLabel}
              </p>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {service.highlights.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-relaxed text-light-band-muted"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href={`${servicesBase}/${service.slug}`}
            className="mt-4 inline-flex rounded-sm bg-accent px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-accent-hover"
          >
            {viewLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

export function ServicesAccordion({
  title,
  subtitle,
  services,
  locale,
  viewLabel,
  highlightsLabel,
  allServicesLabel,
}: ServicesAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const servicesBase = getRoute(locale, "services");
  const midpoint = Math.ceil(services.length / 2);
  const columns = [services.slice(0, midpoint), services.slice(midpoint)];

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <LightBand accent="top">
      <div className="mb-8 max-w-2xl md:mb-10">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent md:text-[11px]">
          24Shoots
        </p>
        <h2 className="text-balance text-2xl font-light tracking-tight text-light-band-text md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-sm leading-relaxed text-light-band-muted md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {/* Móvil: una columna compacta */}
      <div className="divide-y divide-light-band-border border-y border-light-band-border lg:hidden">
          {services.map((service, i) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={i}
              isOpen={openId === service.id}
              onToggle={() => toggle(service.id)}
              servicesBase={servicesBase}
              viewLabel={viewLabel}
              highlightsLabel={highlightsLabel}
              compact
            />
          ))}
        </div>

        {/* Escritorio: 5 + 5 en dos columnas */}
        <div className="hidden gap-10 lg:grid lg:grid-cols-2">
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`divide-y divide-light-band-border ${
                colIndex === 0 ? "border-r border-light-band-border pr-5" : "pl-5"
              }`}
            >
              {column.map((service, i) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  index={colIndex * midpoint + i}
                  isOpen={openId === service.id}
                  onToggle={() => toggle(service.id)}
                  servicesBase={servicesBase}
                  viewLabel={viewLabel}
                  highlightsLabel={highlightsLabel}
                  compact={false}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:mt-10">
          <Link
            href={servicesBase}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-light-band-muted transition hover:text-accent"
          >
            {allServicesLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
    </LightBand>
  );
}
