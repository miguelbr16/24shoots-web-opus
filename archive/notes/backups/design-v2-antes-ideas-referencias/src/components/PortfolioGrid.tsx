"use client";

import { useMemo, useState } from "react";
import type { Locale, PortfolioItem, Sector, Service } from "@/lib/types";
import { ArrowRight, PlayIcon } from "./icons/ServiceIcon";
import { MediaCover } from "./MediaCover";

interface PortfolioGridProps {
  items: PortfolioItem[];
  services: Service[];
  sectors: Sector[];
  locale: Locale;
  labels: Record<string, string>;
}

export function PortfolioGrid({
  items,
  services,
  sectors,
  labels,
}: PortfolioGridProps) {
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchService =
        serviceFilter === "all" || item.services.includes(serviceFilter);
      const matchSector =
        sectorFilter === "all" || item.sectors.includes(sectorFilter);
      return matchService && matchSector;
    });
  }, [items, serviceFilter, sectorFilter]);

  const serviceMap = Object.fromEntries(services.map((s) => [s.id, s.title]));

  const filterBtn = (active: boolean) =>
    `rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition ${
      active
        ? "border-accent bg-accent/10 text-accent"
        : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
    }`;

  return (
    <div>
      <div className="mb-10 space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setServiceFilter("all")}
            className={filterBtn(serviceFilter === "all")}
          >
            {labels.filterAll}
          </button>
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setServiceFilter(s.id)}
              className={filterBtn(serviceFilter === s.id)}
            >
              {s.title}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {sectors.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSectorFilter(sectorFilter === s.id ? "all" : s.id)}
              className={filterBtn(sectorFilter === s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted">{labels.noResults}</p>
      ) : (
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group relative bg-background transition hover:bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <MediaCover
                  image={item.thumbnail}
                  video={item.videoUrl}
                  alt={item.title}
                  imageClassName="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center border border-foreground/20 bg-background/40 text-foreground backdrop-blur-sm transition group-hover:border-accent group-hover:text-accent">
                      <PlayIcon />
                    </span>
                  </div>
                )}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {item.services.slice(0, 2).map((sid) => (
                    <span
                      key={sid}
                      className="border border-border/80 bg-background/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted backdrop-blur-sm"
                    >
                      {serviceMap[sid] ?? sid}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-border p-6">
                <h3 className="text-base font-medium tracking-tight transition group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                  {item.description}
                </p>
                <a
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted transition hover:text-accent"
                >
                  {labels.viewInstagram}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
