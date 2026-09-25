"use client";

import { useEffect, useRef, useState } from "react";

interface Review {
  quote: string;
  author: string;
  role: string;
  service: string;
}

interface ReviewsCarouselProps {
  title: string;
  subtitle: string;
  items: Review[];
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-accent">
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.35 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsCarousel({ title, subtitle, items }: ReviewsCarouselProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function syncArrows() {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  useEffect(() => {
    syncArrows();
  }, [items.length]);

  function scrollByDir(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("article");
    const step = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
    window.setTimeout(syncArrows, 350);
  }

  return (
    <div>
      <div className="mb-8 text-center md:mb-10">
        <h2 className="text-xl font-light tracking-tight text-foreground md:text-2xl">{title}</h2>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
      </div>

      <div className="relative flex items-stretch gap-2 md:gap-4">
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          disabled={!canPrev}
          aria-label="Anterior"
          className="hidden shrink-0 self-center rounded-full border border-border p-3 text-muted transition hover:border-accent hover:text-foreground disabled:opacity-25 md:flex"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <div
          ref={scroller}
          onScroll={syncArrows}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-5 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <article
              key={item.author}
              className="flex w-[min(88vw,340px)] shrink-0 snap-center flex-col rounded-2xl border border-border bg-elevated/80 p-6 backdrop-blur-sm md:w-[360px] md:p-8"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-sm font-medium text-accent">
                  {item.author.charAt(0)}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted">24Shoots</span>
              </div>
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/95 md:text-[15px]">
                {item.quote}
              </blockquote>
              <footer className="mt-6 border-t border-border/80 pt-4">
                <p className="text-sm font-medium">{item.author}</p>
                <p className="mt-1 text-xs text-muted">{item.role}</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {item.service}
                </p>
              </footer>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByDir(1)}
          disabled={!canNext}
          aria-label="Siguiente"
          className="hidden shrink-0 self-center rounded-full border border-border p-3 text-muted transition hover:border-accent hover:text-foreground disabled:opacity-25 md:flex"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
