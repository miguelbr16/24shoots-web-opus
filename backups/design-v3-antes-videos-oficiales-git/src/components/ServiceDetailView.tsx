"use client";

import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem, Service } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getRoute } from "@/lib/i18n";
import { ShotMetadata } from "./ShotMetadata";
import { Button } from "./ui";
import { ServiceIcon } from "./icons/ServiceIcon";

interface ServiceDetailViewProps {
  service: Service;
  locale: Locale;
  pages: {
    services: Record<string, string>;
    nav: Record<string, string>;
    sectors: { id: string; label: string }[];
  };
  relatedProjects: PortfolioItem[];
}

export function ServiceDetailView({
  service,
  locale,
  pages,
  relatedProjects,
}: ServiceDetailViewProps) {
  const servicesBase = getRoute(locale, "services");
  const portfolioRoute = getRoute(locale, "portfolio");

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative border-b border-border bg-panel">
        {service.image && (
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt=""
              fill
              className="object-cover opacity-40"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          </div>
        )}
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Link
            href={servicesBase}
            className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted transition hover:text-accent"
          >
            ← {pages.services.title}
          </Link>
          <div className="mt-8 flex items-start gap-5">
            <div className="text-accent">
              <ServiceIcon name={service.icon} className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl font-light tracking-tight md:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-foreground/85">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Descripción + highlights */}
        <section className="grid gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
              {pages.services.aboutService ?? "Sobre este servicio"}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {service.description}
            </p>
          </div>

          <div className="border border-border bg-surface p-8 md:p-10">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              {pages.services.highlights}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {service.highlights.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 border border-border/60 bg-background p-4"
                >
                  <span className="font-mono text-[10px] text-accent/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Proyectos relacionados */}
        {relatedProjects.length > 0 && (
          <section className="border-t border-border py-16 md:py-20">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
              {pages.services.relatedWork ?? "Proyectos relacionados"}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  href={portfolioRoute}
                  className="group overflow-hidden border border-border bg-surface transition hover:border-accent/30"
                >
                  <div className="relative aspect-[4/3] bg-media">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    {project.format && (
                      <ShotMetadata
                        items={[project.format].filter(Boolean)}
                        className="mb-2"
                      />
                    )}
                    <h3 className="font-medium tracking-tight group-hover:text-accent">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border border-border bg-surface p-8 text-center md:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
            24Shoots · Valencia
          </p>
          <h2 className="mt-4 text-2xl font-light tracking-tight md:text-3xl">
            {pages.services.ctaHeadline ?? "¿Hablamos de tu próximo proyecto?"}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
            {pages.services.ctaSubline ??
              "Cuéntanos qué necesitas y te respondemos con una propuesta clara."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={getRoute(locale, "contact")} showArrow>
              {pages.services.cta}
            </Button>
            <Button href={portfolioRoute} variant="secondary">
              {pages.nav.portfolio}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
