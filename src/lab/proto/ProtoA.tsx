"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProtoCase, ProtoFrame } from "./data";
import { protoCopy as c } from "./data";
import { Loop } from "./Loop";
import { ProtoChrome, ProtoClosing } from "./Chrome";
import { motionAllowed, track, useViewOnce } from "./track";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * LAB — A · CINEMÁTICA. The home is a trailer: the 24 real shots play back to back with
 * hard cuts, grouped by piece (01–05). Credits only; one line of positioning; one CTA.
 */
export function ProtoA({ frames, cases }: { frames: ProtoFrame[]; cases: ProtoCase[] }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const hero = useRef<HTMLElement>(null);
  const f = frames[i];
  const piece = cases[f.chapter];
  const inPiece = piece.frames.indexOf(f.n);

  useViewOnce(hero, "hero_view", { variant: "a" }, 0, 0.5);

  useEffect(() => setAuto(motionAllowed()), []);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    if (hero.current) io.observe(hero.current);
    return () => io.disconnect();
  }, []);

  const next = useCallback(() => setI((x) => (x + 1) % frames.length), [frames.length]);
  const goPiece = (d: number) => {
    const p = (f.chapter + d + cases.length) % cases.length;
    setI(cases[p].frames[0] - 1);
    track("piece_nav", { dir: d > 0 ? "next" : "prev", to: cases[p].slug });
  };

  // "Proyecto visto": a piece counts once it has been on screen for 2 s while the hero is visible.
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => track("piece_view", { slug: piece.slug, variant: "a" }), 2000);
    return () => window.clearTimeout(t);
  }, [piece.slug, inView]);

  // Fallback cadence when the loop cannot play (codec, autoplay policy): still-based cuts.
  useEffect(() => {
    if (!auto || paused || !inView) return;
    const t = window.setTimeout(next, 3200);
    return () => window.clearTimeout(t);
  }, [i, auto, paused, inView, next]);

  // Swipe / tap zones
  const start = useRef<{ x: number; y: number } | null>(null);

  return (
    <>
      <ProtoChrome label="A — Cinemática" />
      <section
        ref={hero}
        className="relative h-[100svh] min-h-[560px] select-none overflow-hidden bg-black"
        aria-roledescription="tráiler"
        aria-label="Tráiler de trabajos reales"
        onPointerDown={(e) => (start.current = { x: e.clientX, y: e.clientY })}
        onPointerUp={(e) => {
          const s = start.current;
          start.current = null;
          if (!s || (e.target as HTMLElement).closest("a,button")) return;
          const dx = e.clientX - s.x;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) goPiece(dx < 0 ? 1 : -1);
          else if (Math.abs(dx) < 8) goPiece(e.clientX < window.innerWidth / 3 ? -1 : 1);
        }}
      >
        {/* current shot; the next one is warmed so the cut is instant */}
        {frames.map((fr, k) =>
          k === i || k === (i + 1) % frames.length ? (
            <Loop
              key={fr.n}
              frame={fr}
              active={k === i && auto && !paused && inView}
              near={k !== i}
              loop={false}
              onEnded={next}
              priority={k === 0}
              context="a-trailer"
              className={`absolute inset-0 ${k === i ? "z-10" : "z-0 opacity-0"}`}
            />
          ) : null
        )}
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_top,rgba(0,0,0,.85)_0%,rgba(0,0,0,.35)_38%,rgba(0,0,0,0)_60%)]" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-5 md:px-8 md:pb-8">
          <p className="text-[0.95rem] text-white/75 md:text-base">{c.descriptor} · Valencia</p>
          <h1 className="mt-2 max-w-[18ch] text-[clamp(1.7rem,0.9rem+4.2vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.02em] [font-variation-settings:'wdth'_74]">
            {c.line1} <span className="text-white/60">{c.line2}</span>
          </h1>

          {/* credit + progress */}
          <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/20 pt-4">
            <div className="min-w-0">
              <p className="flex items-baseline gap-3">
                <span className="text-[2.2rem] font-semibold leading-none [font-variation-settings:'wdth'_62] md:text-[3rem]">{pad(f.chapter + 1)}</span>
                <span className="text-sm text-white/55">/ {pad(cases.length)}</span>
              </p>
              <p className="mt-1 truncate text-[1rem] md:text-lg">
                <span className="font-medium">{piece.client}</span> <span className="text-white/65">— {piece.title}</span>
              </p>
              <p className="text-sm text-white/55">
                {piece.kind}
                {piece.with ? ` · con ${piece.with}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button type="button" onClick={() => goPiece(-1)} className="grid size-11 place-items-center text-xl text-white/80 hover:text-white" aria-label="Pieza anterior">
                ←
              </button>
              <button type="button" onClick={() => goPiece(1)} className="grid size-11 place-items-center text-xl text-white/80 hover:text-white" aria-label="Pieza siguiente">
                →
              </button>
              {auto && (
                <button type="button" onClick={() => setPaused((p) => !p)} className="grid size-11 place-items-center text-sm text-white/80 hover:text-white" aria-label={paused ? "Reproducir" : "Pausar"}>
                  {paused ? "▶" : "❚❚"}
                </button>
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="grid flex-1 grid-cols-5 gap-1" aria-hidden>
              {cases.map((p) => (
                <span key={p.slug} className="h-[3px] overflow-hidden bg-white/20">
                  <span
                    className="block h-full bg-white transition-[width] duration-300"
                    style={{ width: p.chapter < f.chapter ? "100%" : p.chapter === f.chapter ? `${((inPiece + 1) / p.frames.length) * 100}%` : "0%" }}
                  />
                </span>
              ))}
            </div>
            <Link href={piece.url} className="shrink-0 py-2 text-sm font-medium underline decoration-white/40 underline-offset-4" data-track="case_open" data-slug={piece.slug} data-from="a-trailer">
              Ver pieza →
            </Link>
          </div>
        </div>
      </section>

      {/* What you can hire — one line, three doors */}
      <section className="border-t border-white/10 bg-black px-4 py-14 md:px-8 md:py-20" data-section="territories">
        <p className="text-sm text-white/55">Lo que hacemos</p>
        <ul className="mt-4 flex flex-col gap-2 md:flex-row md:gap-10">
          {c.territories.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="text-[clamp(1.6rem,1rem+2.4vw,2.8rem)] font-semibold leading-tight [font-variation-settings:'wdth'_74] hover:text-white/70" data-track="cta" data-cta="service" data-location="a-territories">
                {t.label} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ProtoClosing question={c.closing} id="a" />
    </>
  );
}
