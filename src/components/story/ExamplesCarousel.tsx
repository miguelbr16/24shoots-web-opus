"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface ExampleSlide {
  key: string;
  kicker: string;
  title: string;
  body: string;
  what: string[];
  cta: string;
  href: string;
  /** Loop + stills, rendered on the server and passed in. */
  media: ReactNode;
}

interface Props {
  slides: ExampleSlide[];
  labels: { prev: string; next: string; of: string; whatTitle: string; region: string };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Several client examples, one at a time: native horizontal swipe (scroll-snap) on touch,
 * arrows and a counter everywhere. Without JS the slides are still a swipeable row.
 */
export function ExamplesCarousel({ slides, labels }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setI(Math.round(el.scrollLeft / Math.max(1, el.clientWidth))));
    };
    el.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", on);
    };
  }, []);

  const go = (n: number) => {
    const el = track.current;
    if (!el) return;
    const to = Math.max(0, Math.min(slides.length - 1, n));
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: to * el.clientWidth, behavior: smooth ? "smooth" : "auto" });
  };

  const arrow = "grid size-11 place-items-center rounded-full border border-bone/25 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink disabled:pointer-events-none disabled:opacity-30";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={labels.region}>
      <div className="flex items-center justify-between gap-4">
        <p className="t-mono text-ash" aria-live="polite">
          <span className="text-bone">{pad(i + 1)}</span> {labels.of} {pad(slides.length)} · {slides[i].kicker}
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" className={arrow} onClick={() => go(i - 1)} disabled={i === 0} aria-label={labels.prev} data-track="example_nav" data-dir="prev">
            <span aria-hidden>←</span>
          </button>
          <button type="button" className={arrow} onClick={() => go(i + 1)} disabled={i === slides.length - 1} aria-label={labels.next} data-track="example_nav" data-dir="next">
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div ref={track} className="ex-track mt-6 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain">
        {slides.map((s, n) => (
          <div key={s.key} className="w-full shrink-0 snap-start snap-always pr-4" role="group" aria-roledescription="slide" aria-label={`${n + 1} ${labels.of} ${slides.length}: ${s.kicker}`}>
            <div className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10">
              <div className="flex flex-col">
                <h3 className="t-h2 max-w-[18ch]">{s.title}</h3>
                <p className="mt-4 max-w-[44ch] text-[1.05rem] text-bone/80 md:text-[1.2rem]">{s.body}</p>
                <div className="mt-6 hidden md:block">
                  <p className="t-mono text-ash">{labels.whatTitle}</p>
                  <ul className="mt-3 space-y-1">
                    {s.what.map((w, k) => (
                      <li key={w} className="flex gap-4">
                        <span className="t-mono pt-1 text-ash">{pad(k + 1)}</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 md:mt-auto md:pt-8">
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link text-bone" tabIndex={n === i ? 0 : -1} data-track="cta" data-cta={`example-${s.key}`} data-location="home-examples">
                    {s.cta} ↗
                  </a>
                </p>
              </div>
              {s.media}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
