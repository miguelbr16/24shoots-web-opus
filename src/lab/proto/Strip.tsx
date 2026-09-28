"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ProtoFrame } from "./data";
import { protoCopy as c } from "./data";
import { Loop } from "./Loop";
import { track } from "./track";

const pad = (n: number) => String(n).padStart(2, "0");

interface Props {
  frames: ProtoFrame[];
  id: string;
  /** "both": vertical snap stack on mobile + horizontal strip on desktop. "desktop": strip only (E). */
  mode?: "both" | "desktop" | "never";
  /** Extra actions under the credit (E adds the sala button). */
  actions?: (f: ProtoFrame) => ReactNode;
}

/**
 * LAB — the 24-frame system. Mobile: one real frame per swipe (scroll-snap, native scroll,
 * no pinning). Desktop: vertical scroll scrubs a horizontal strip (sticky + transform).
 * The fixed counter is the scroll indicator: 07/24.
 */
export function Strip({ frames, id, mode = "both", actions }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [desk, setDesk] = useState(false);
  const [active, setActive] = useState(0);
  const [inStrip, setInStrip] = useState(true);
  const reached = useRef(new Set<number>());
  const enabled = mode === "both" || desk;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const up = () => setDesk(mq.matches);
    up();
    mq.addEventListener("change", up);
    return () => mq.removeEventListener("change", up);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = wrap.current;
        if (!w) return;
        const r = w.getBoundingClientRect();
        const vh = window.innerHeight;
        let idx: number;
        if (desk) {
          const max = Math.max(1, w.offsetHeight - vh);
          const p = Math.min(1, Math.max(0, -r.top / max));
          const t = rail.current!;
          t.style.transform = `translate3d(${-p * (t.scrollWidth - window.innerWidth)}px,0,0)`;
          idx = Math.round(p * (frames.length - 1));
        } else {
          idx = Math.min(frames.length - 1, Math.max(0, Math.round(-r.top / vh)));
        }
        setActive(idx);
        setInStrip(r.top < vh * 0.5 && r.bottom > vh * 0.5);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [desk, enabled, frames.length]);

  // Scroll depth measured in frames: 25/50/75/100 % of the sequence.
  useEffect(() => {
    if (!enabled || !inStrip) return;
    const q = (active + 1) / frames.length;
    for (const step of [0.25, 0.5, 0.75, 1]) {
      if (q >= step && !reached.current.has(step)) {
        reached.current.add(step);
        track("frame_reach", { n: frames[active].n, pct: step * 100, variant: id });
      }
    }
  }, [active, enabled, inStrip, frames, id]);

  const f = frames[active];
  const n = frames.length;

  return (
    <div
      ref={wrap}
      className="relative bg-black md:h-[calc(var(--n)*38vh+100vh)]"
      style={{ ["--n" as string]: n }}
      aria-label="24 fotogramas de trabajo real"
      data-section="strip"
    >
      <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden">
        <div
          ref={rail}
          className="flex flex-col will-change-transform md:flex-row md:items-center md:gap-[2vw] md:px-[calc(50vw-30vh*16/9)]"
        >
          {frames.map((fr, k) => (
            <figure
              key={fr.n}
              className={`relative h-[100svh] w-full shrink-0 snap-start snap-always md:h-[60vh] md:w-[calc(60vh*16/9)] md:transition-[opacity,transform] md:duration-500 ${
                k !== active ? "md:scale-[0.9] md:opacity-35" : ""
              }`}
              data-frame={fr.n}
            >
              <Loop frame={fr} active={enabled && inStrip && k === active} near={enabled && k === active + 1} priority={k === 0} context={`${id}-strip`} className="absolute inset-0" />
              {/* mobile credit lives on the frame */}
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(0,0,0,.8),rgba(0,0,0,0))] px-4 pt-16 pb-6 md:hidden">
                {fr.first ? (
                  <>
                    <span className="block text-sm text-white/65">
                      Capítulo {fr.chapter + 1} · {fr.kind}
                    </span>
                    <span className="mt-1 block text-[2rem] font-semibold leading-[0.95] [font-variation-settings:'wdth'_70]">{fr.client}</span>
                    <span className="block text-white/80">{fr.title}</span>
                  </>
                ) : (
                  <span className="block text-sm text-white/80">
                    {fr.client} — {fr.title}
                  </span>
                )}
                {(fr.last || actions) && (
                  <span className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {fr.last && (
                      <Link href={fr.url} className="py-1 text-sm font-medium underline decoration-white/40 underline-offset-4" data-track="case_open" data-slug={fr.slug} data-from={`${id}-strip`}>
                        Ver pieza →
                      </Link>
                    )}
                    {actions?.(fr)}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* desktop: intro title + credit + counter, anchored to the sticky viewport */}
        {mode !== "never" && (
          <>
            <div className={`pointer-events-none absolute left-8 right-8 top-[4.5rem] hidden items-baseline justify-between gap-8 md:flex transition-opacity duration-500 ${active < 2 ? "opacity-100" : "opacity-0"}`}>
              <h1 className="text-[clamp(1.6rem,0.8rem+1.6vw,2.6rem)] font-semibold leading-none [font-variation-settings:'wdth'_74]">
                {c.line1} <span className="text-white/60">{c.line2}</span>
              </h1>
              <p className="shrink-0 text-white/70">{c.descriptor} · Valencia</p>
            </div>
            <div className="absolute inset-x-8 bottom-7 hidden items-end md:flex justify-between gap-8">
              <p className="leading-none" aria-live="polite">
                <span className="text-[clamp(5rem,2rem+7vw,9rem)] font-semibold tracking-[-0.03em] [font-variation-settings:'wdth'_60]">{pad(f.n)}</span>
                <span className="ml-2 text-2xl text-white/50">/24</span>
              </p>
              <div className="min-w-0 max-w-[46ch] pb-3 text-right">
                <p className="text-sm text-white/55">
                  Capítulo {f.chapter + 1} · {f.kind}
                  {f.with ? ` · con ${f.with}` : ""}
                </p>
                <p className="text-xl font-medium">
                  {f.client} <span className="text-white/65">— {f.title}</span>
                </p>
                <p className="mt-2 flex justify-end gap-6">
                  <Link href={f.url} className="py-1 text-sm font-medium underline decoration-white/40 underline-offset-4" data-track="case_open" data-slug={f.slug} data-from={`${id}-strip`}>
                    Ver pieza →
                  </Link>
                  {actions?.(f)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* mobile: fixed counter = scroll indicator; intro title over the first frame */}
      {mode === "both" && (
        <>
          <p className={`pointer-events-none fixed right-4 md:hidden top-16 z-40 leading-none transition-opacity ${inStrip ? "opacity-100" : "opacity-0"}`} aria-live="polite">
            <span className="text-[3.4rem] font-semibold tracking-[-0.03em] [font-variation-settings:'wdth'_60] [text-shadow:0_2px_16px_rgba(0,0,0,.5)]">{pad(f.n)}</span>
            <span className="ml-1 text-lg text-white/70">/24</span>
          </p>
          <div className={`pointer-events-none absolute inset-x-4 top-[38svh] z-30 md:hidden transition-opacity duration-500 ${active === 0 ? "opacity-100" : "opacity-0"}`}>
            <p className="text-white/80 [text-shadow:0_1px_10px_rgba(0,0,0,.6)]">{c.descriptor} · Valencia</p>
            <h1 className="mt-2 text-[2.6rem] font-semibold leading-[0.92] [font-variation-settings:'wdth'_72] [text-shadow:0_2px_20px_rgba(0,0,0,.5)]">
              {c.line1} {c.line2}
            </h1>
            <p className="mt-4 text-sm text-white/75">24 fotogramas de trabajo real ↓</p>
          </div>
        </>
      )}
    </div>
  );
}
