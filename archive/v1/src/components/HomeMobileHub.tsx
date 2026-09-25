"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale, Service } from "@/lib/types";
import { getRoute } from "@/lib/i18n";
import { LightBand } from "./LightBand";
import { ServiceIcon } from "./icons/ServiceIcon";

type HubTab = "services" | "process" | "why";

interface ProcessStep {
  title: string;
  description: string;
}

interface WhyItem {
  title: string;
  description: string;
}

interface HomeMobileHubProps {
  locale: Locale;
  servicesTitle: string;
  servicesSubtitle: string;
  services: Service[];
  processTitle: string;
  processSubtitle: string;
  steps: ProcessStep[];
  whyTitle: string;
  whyItems: WhyItem[];
  viewLabel: string;
  allServicesLabel: string;
}

function tabLabel(locale: Locale, tab: HubTab): string {
  if (locale === "es") {
    switch (tab) {
      case "services":
        return "Servicios";
      case "process":
        return "Proceso";
      case "why":
        return "Por qué";
      default: {
        const _exhaustive: never = tab;
        return _exhaustive;
      }
    }
  }

  switch (tab) {
    case "services":
      return "Services";
    case "process":
      return "Process";
    case "why":
      return "Why";
    default: {
      const _exhaustive: never = tab;
      return _exhaustive;
    }
  }
}

const TABS: HubTab[] = ["process", "why", "services"];

export function HomeMobileHub({
  locale,
  servicesTitle,
  servicesSubtitle,
  services,
  processTitle,
  processSubtitle,
  steps,
  whyTitle,
  whyItems,
  viewLabel,
  allServicesLabel,
}: HomeMobileHubProps) {
  const [activeTab, setActiveTab] = useState<HubTab>("process");
  const [activeServiceId, setActiveServiceId] = useState(services[0]?.id ?? "");
  const servicesBase = getRoute(locale, "services");
  const activeService = services.find((s) => s.id === activeServiceId) ?? services[0];

  return (
    <LightBand accent="top" className="py-8 lg:hidden">
      <div
        role="tablist"
        aria-label={servicesTitle}
        className="mb-6 grid grid-cols-3 gap-1 rounded-sm border border-light-band-border bg-white/40 p-1"
      >
        {TABS.map((tab) => {
          const selected = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveTab(tab)}
              className={`rounded-sm px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
                selected
                  ? "bg-accent text-white shadow-sm"
                  : "text-light-band-muted hover:text-light-band-text"
              }`}
            >
              {tabLabel(locale, tab)}
            </button>
          );
        })}
      </div>

      {activeTab === "services" && (
        <div role="tabpanel">
          <div className="mb-4">
            <h2 className="text-xl font-light tracking-tight text-light-band-text">
              {servicesTitle}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-light-band-muted">
              {servicesSubtitle}
            </p>
          </div>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {services.map((service) => {
              const selected = service.id === activeService?.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveServiceId(service.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-sm border px-3 py-2 text-left transition ${
                    selected
                      ? "border-accent bg-white text-light-band-text"
                      : "border-light-band-border bg-white/50 text-light-band-muted"
                  }`}
                >
                  <ServiceIcon name={service.icon} className="h-3.5 w-3.5 text-accent" />
                  <span className="max-w-[9rem] truncate text-[11px] font-medium leading-tight">
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>

          {activeService && (
            <div className="mt-4 rounded-sm border border-light-band-border bg-white/55 p-3">
              {activeService.image && (
                <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-sm bg-light-band-surface">
                  <Image
                    src={activeService.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              )}
              <p className="text-sm leading-relaxed text-light-band-text/85">
                {activeService.shortDescription}
              </p>
              <Link
                href={`${servicesBase}/${activeService.slug}`}
                className="mt-3 inline-flex rounded-sm bg-accent px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
              >
                {viewLabel}
              </Link>
            </div>
          )}

          <div className="mt-4 text-center">
            <Link
              href={servicesBase}
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-light-band-muted"
            >
              {allServicesLabel} →
            </Link>
          </div>
        </div>
      )}

      {activeTab === "process" && (
        <div role="tabpanel">
          <div className="mb-4">
            <h2 className="text-xl font-light tracking-tight text-light-band-text">
              {processTitle}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-light-band-muted">
              {processSubtitle}
            </p>
          </div>

          <ol className="space-y-2">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-3 rounded-sm border border-light-band-border bg-white/50 px-3 py-3"
              >
                <span className="w-6 shrink-0 font-mono text-lg font-light text-accent/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-light-band-text">{step.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-light-band-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {activeTab === "why" && (
        <div role="tabpanel">
          <div className="mb-4">
            <h2 className="text-xl font-light tracking-tight text-light-band-text">
              {whyTitle}
            </h2>
          </div>

          <ul className="space-y-2">
            {whyItems.map((item, i) => (
              <li
                key={item.title}
                className="rounded-sm border border-light-band-border bg-white/50 px-3 py-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-sm font-medium text-light-band-text">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-light-band-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </LightBand>
  );
}
