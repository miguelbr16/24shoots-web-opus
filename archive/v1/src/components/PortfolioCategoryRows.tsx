"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale, PortfolioItem, Sector } from "@/lib/types";
import { getPortfolioCaseLabels } from "@/lib/portfolio-labels";
import { ArrowRight, PlayIcon } from "./icons/ServiceIcon";
import { MediaCover } from "./MediaCover";
import { PortfolioCaseModal } from "./PortfolioCaseModal";
import { ShotMetadata } from "./ShotMetadata";

interface PortfolioCategoryRowsProps {
  items: PortfolioItem[];
  categories: Sector[];
  locale: Locale;
  labels: Record<string, string>;
  serviceTitles: Record<string, string>;
}

function PortfolioTile({
  item,
  labels,
  serviceTitles,
  onOpen,
}: {
  item: PortfolioItem;
  labels: Record<string, string>;
  serviceTitles: Record<string, string>;
  onOpen: (item: PortfolioItem) => void;
}) {
  return (
    <article className="group flex w-[min(78vw,300px)] shrink-0 snap-start flex-col overflow-hidden border border-border bg-background transition hover:border-accent/35 sm:w-[320px]">
      <button type="button" onClick={() => onOpen(item)} className="block w-full text-left">
        <div className="relative aspect-[4/5] overflow-hidden bg-media sm:aspect-[3/4]">
          <MediaCover
            image={item.thumbnail}
            video={item.videoUrl}
            alt={item.title}
            imageClassName="object-cover transition duration-700 group-hover:scale-105"
            sizes="320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-85" />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-11 w-11 items-center justify-center border border-foreground/20 bg-background/40 backdrop-blur-sm transition group-hover:border-accent group-hover:text-accent">
                <PlayIcon />
              </span>
            </div>
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {item.services.slice(0, 2).map((sid) => (
              <span
                key={sid}
                className="border border-border/80 bg-background/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted backdrop-blur-sm"
              >
                {serviceTitles[sid] ?? sid}
              </span>
            ))}
          </div>
        </div>
      </button>
      <div className="flex flex-1 flex-col border-t border-border p-4">
        {item.format && (
          <ShotMetadata
            items={[item.format, item.location ?? ""].filter(Boolean)}
            className="mb-2"
          />
        )}
        <h3 className="text-sm font-medium tracking-tight group-hover:text-accent">{item.title}</h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
          {item.description}
        </p>
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="mt-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted transition group-hover:text-accent"
        >
          {labels.openProject}
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </article>
  );
}

function CategoryRow({
  title,
  items,
  scrollHint,
  labels,
  serviceTitles,
  onOpen,
}: {
  title: string;
  items: PortfolioItem[];
  scrollHint: string;
  labels: Record<string, string>;
  serviceTitles: Record<string, string>;
  onOpen: (item: PortfolioItem) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function syncArrows() {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  function scrollByDir(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (320 + 16), behavior: "smooth" });
    window.setTimeout(syncArrows, 350);
  }

  useEffect(() => {
    syncArrows();
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section className="border-b border-border py-5 last:border-b-0 md:py-7">
      <div className="mb-4 flex items-end justify-between gap-4 md:mb-5">
        <div>
          <h2 className="text-xl font-light tracking-tight text-foreground md:text-2xl">{title}</h2>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted/80">{scrollHint}</p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            disabled={!canPrev}
            aria-label="Anterior"
            className="rounded-full border border-border p-2.5 text-muted transition hover:border-accent hover:text-foreground disabled:opacity-25"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            disabled={!canNext}
            aria-label="Siguiente"
            className="rounded-full border border-border p-2.5 text-muted transition hover:border-accent hover:text-foreground disabled:opacity-25"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={syncArrows}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:-mx-6 md:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <PortfolioTile
            key={item.id}
            item={item}
            labels={labels}
            serviceTitles={serviceTitles}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}

export function PortfolioCategoryRows({
  items,
  categories,
  locale,
  labels,
  serviceTitles,
}: PortfolioCategoryRowsProps) {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const caseLabels = getPortfolioCaseLabels(labels);
  const scrollHint = labels.scrollRow ?? "Desliza para ver más";
  const filterToggleLabel = labels.filterToggle ?? "Filtros";

  const rows = categories.map((category) => ({
    category,
    items: items.filter((item) => item.categories?.includes(category.id)),
  }));

  const listed = new Set(rows.flatMap((r) => r.items.map((i) => i.id)));
  const uncategorized = items.filter(
    (item) => !item.categories?.length || !listed.has(item.id)
  );
  if (uncategorized.length > 0) {
    rows.push({
      category: { id: "otros", label: labels.categoryOther ?? "Otros" },
      items: uncategorized,
    });
  }

  const visibleRows = rows.filter((r) => r.items.length > 0);
  const filteredRows =
    activeFilter === "all"
      ? visibleRows
      : visibleRows.filter((r) => r.category.id === activeFilter);

  if (visibleRows.length === 0) {
    return <p className="text-sm text-muted">{labels.noResults}</p>;
  }

  const activeFilterLabel =
    activeFilter === "all"
      ? labels.filterAll
      : (visibleRows.find((r) => r.category.id === activeFilter)?.category.label ??
        labels.filterAll);

  function selectFilter(id: string) {
    setActiveFilter(id);
    setFiltersOpen(false);
  }

  return (
    <>
      <div className="mb-4 border-b border-border pb-4">
        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          className="flex w-full items-center justify-between gap-3 rounded-sm border border-border bg-surface px-4 py-3 text-left transition hover:border-accent/40"
        >
          <span className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
              {filterToggleLabel}
            </span>
            <span className="truncate text-[10px] uppercase tracking-[0.08em] text-muted">
              {activeFilterLabel}
            </span>
          </span>
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 shrink-0 text-muted transition ${filtersOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {filtersOpen && (
          <div className="mt-3 flex max-h-[min(40vh,16rem)] flex-wrap gap-2 overflow-y-auto rounded-sm border border-border/80 bg-background p-3">
            <button
              type="button"
              onClick={() => selectFilter("all")}
              className={`rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] transition ${
                activeFilter === "all"
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-surface text-muted hover:border-accent/50 hover:text-foreground"
              }`}
            >
              {labels.filterAll}
            </button>
            {visibleRows.map(({ category }) => (
              <button
                key={category.id}
                type="button"
                onClick={() => selectFilter(category.id)}
                className={`rounded-full border px-3.5 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.06em] transition ${
                  activeFilter === category.id
                    ? "border-accent bg-accent text-background"
                    : "border-border bg-surface text-muted hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredRows.length === 0 ? (
        <p className="text-sm text-muted">{labels.noResults}</p>
      ) : (
        filteredRows.map(({ category, items: rowItems }) => (
          <CategoryRow
            key={category.id}
            title={category.label}
            items={rowItems}
            scrollHint={scrollHint}
            labels={labels}
            serviceTitles={serviceTitles}
            onOpen={setActiveItem}
          />
        ))
      )}

      <PortfolioCaseModal
        item={activeItem}
        labels={caseLabels}
        locale={locale}
        onClose={() => setActiveItem(null)}
      />
    </>
  );
}
