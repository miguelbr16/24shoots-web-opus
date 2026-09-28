"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ProtoCase, ProtoFrame } from "./data";
import { protoCopy as c } from "./data";
import { Loop } from "./Loop";
import { ProtoChrome, ProtoClosing } from "./Chrome";
import { Strip } from "./Strip";
import { track, useViewOnce } from "./track";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * LAB — E · 24 FOTOGRAMAS + SALA. Same 24 frames, organised on two axes on mobile
 * (vertical = the 5 pieces, horizontal = their frames) and, on every device, a "sala":
 * the real film opens full screen with its credits and two actions, and closing it
 * returns to the exact frame.
 */
export function ProtoE({ frames, cases }: { frames: ProtoFrame[]; cases: ProtoCase[] }) {
  const [sala, setSala] = useState<ProtoCase | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const top = useRef<HTMLDivElement>(null);
  useViewOnce(top, "hero_view", { variant: "e" }, 0, 0.3);

  const open = (k: ProtoCase, el: HTMLElement | null) => {
    opener.current = el;
    setSala(k);
    track("case_open", { slug: k.slug, from: "e-sala" });
  };
  const salaButton = (f: ProtoFrame) => (
    <button
      type="button"
      onClick={(e) => open(cases[f.chapter], e.currentTarget)}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/50 px-4 text-sm font-medium hover:bg-white hover:text-black"
    >
      ▶ Ver en sala
    </button>
  );

  return (
    <>
      <ProtoChrome label="E — 24 fotogramas + sala" />
      <style>{`@media (max-width: 767px){html{scroll-snap-type:y mandatory}}`}</style>
      <div className="relative">
        <div ref={top} className="pointer-events-none absolute inset-x-0 top-0 h-[100svh]" aria-hidden />
        <div className="md:hidden">
          <Chapters frames={frames} cases={cases} onSala={open} />
        </div>
        <div className="hidden md:block">
          <Strip frames={frames} id="e" mode="desktop" actions={salaButton} />
        </div>
      </div>
      <ProtoClosing question={c.closing24} id="e" />
      <Sala k={sala} onClose={() => { setSala(null); opener.current?.focus(); }} />
    </>
  );
}

/** Mobile: 5 vertical snaps (pieces) × horizontal snaps (frames). ≈ 7 gestures to contact. */
function Chapters({ frames, cases, onSala }: { frames: ProtoFrame[]; cases: ProtoCase[]; onSala: (k: ProtoCase, el: HTMLElement | null) => void }) {
  const [desk, setDesk] = useState(true);
  const [chapter, setChapter] = useState(0);
  const [inside, setInside] = useState(true);
  const [pos, setPos] = useState<number[]>(() => cases.map(() => 0));
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const reached = useRef(new Set<number>());

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const up = () => setDesk(mq.matches);
    up();
    mq.addEventListener("change", up);
    return () => mq.removeEventListener("change", up);
  }, []);

  useEffect(() => {
    if (desk) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setChapter(Number((e.target as HTMLElement).dataset.chapter))),
      { threshold: 0.6 }
    );
    sections.current.forEach((s) => s && io.observe(s));
    const vis = new Map<Element, boolean>();
    const io2 = new IntersectionObserver((es) => {
      es.forEach((e) => vis.set(e.target, e.isIntersecting));
      setInside([...vis.values()].some(Boolean));
    }, { threshold: 0.35 });
    sections.current.forEach((s) => s && io2.observe(s));
    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, [desk]);

  const globalN = cases[chapter].frames[pos[chapter]];
  useEffect(() => {
    if (desk) return;
    const q = globalN / 24;
    for (const step of [0.25, 0.5, 0.75, 1])
      if (q >= step && !reached.current.has(step)) {
        reached.current.add(step);
        track("frame_reach", { n: globalN, pct: step * 100, variant: "e" });
      }
  }, [globalN, desk]);
  useEffect(() => {
    if (desk) return;
    const t = window.setTimeout(() => track("piece_view", { slug: cases[chapter].slug, variant: "e" }), 2000);
    return () => window.clearTimeout(t);
  }, [chapter, desk, cases]);

  return (
    <>
      {!desk && (
        <p className={`pointer-events-none fixed right-4 top-16 z-40 leading-none transition-opacity ${inside ? "opacity-100" : "opacity-0"}`} aria-live="polite">
          <span className="text-[3.4rem] font-semibold tracking-[-0.03em] [font-variation-settings:'wdth'_60] [text-shadow:0_2px_16px_rgba(0,0,0,.5)]">{pad(globalN)}</span>
          <span className="ml-1 text-lg text-white/70">/24</span>
        </p>
      )}
      {cases.map((k) => {
        const fs = k.frames.map((n) => frames[n - 1]);
        const p = pos[k.chapter];
        return (
          <section
            key={k.slug}
            ref={(el) => {
              sections.current[k.chapter] = el;
            }}
            data-chapter={k.chapter}
            className="relative h-[100svh] snap-start snap-always overflow-hidden bg-black"
            aria-label={`${k.client} — ${k.title}`}
          >
            <div
              ref={(el) => {
                rows.current[k.chapter] = el;
              }}
              className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none]"
              onScroll={(e) => {
                const el = e.currentTarget;
                const i = Math.round(el.scrollLeft / el.clientWidth);
                if (i !== p) setPos((x) => x.map((v, j) => (j === k.chapter ? i : v)));
              }}
            >
              {fs.map((f, i) => (
                <div key={f.n} className="relative h-full w-full shrink-0 snap-start" data-frame={f.n}>
                  <Loop frame={f} active={!desk && chapter === k.chapter && p === i} near={!desk && chapter === k.chapter && i === p + 1} priority={f.n === 1} context="e-chapter" className="absolute inset-0" />
                </div>
              ))}
            </div>

            {k.chapter === 0 && (
              <div className="pointer-events-none absolute inset-x-4 top-[30svh] z-20">
                <p className="text-white/80 [text-shadow:0_1px_10px_rgba(0,0,0,.6)]">{c.descriptor} · Valencia</p>
                <h1 className="mt-2 text-[2.6rem] font-semibold leading-[0.92] [font-variation-settings:'wdth'_72] [text-shadow:0_2px_20px_rgba(0,0,0,.5)]">
                  {c.line1} {c.line2}
                </h1>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-20 bg-[linear-gradient(to_top,rgba(0,0,0,.85),rgba(0,0,0,0))] px-4 pt-20 pb-6">
              <p className="text-sm text-white/65">
                Pieza {k.chapter + 1}/5 · {k.kind}
                {k.with ? ` · con ${k.with}` : ""}
              </p>
              <p className="mt-1 text-[2rem] font-semibold leading-[0.95] [font-variation-settings:'wdth'_70]">{k.client}</p>
              <p className="text-white/80">{k.title}</p>
              <div className="mt-3 flex items-center gap-1.5" aria-hidden>
                {fs.map((f, i) => (
                  <span key={f.n} className={`h-[3px] flex-1 ${i === p ? "bg-white" : "bg-white/25"}`} />
                ))}
              </div>
              <p className="mt-1 text-xs text-white/55">Desliza → {fs.length} fotogramas</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="button"
                  onClick={(e) => onSala(k, e.currentTarget)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 font-medium text-black"
                >
                  ▶ Ver en sala
                </button>
                <Link href="/contacto" className="py-2 text-sm underline decoration-white/40 underline-offset-4" data-track="cta" data-cta="hablemos" data-location={`e-chapter-${k.chapter + 1}`}>
                  Hablemos de algo así
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

/** The sala: native <dialog>, real film with controls, credits, two actions. */
function Sala({ k, onClose }: { k: ProtoCase | null; onClose: () => void }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const marks = useRef(new Set<number>());

  useEffect(() => {
    const d = dlg.current!;
    if (k && !d.open) {
      marks.current.clear();
      d.showModal();
    }
    if (!k && d.open) d.close();
  }, [k]);

  return (
    <dialog
      ref={dlg}
      onClose={() => {
        vid.current?.pause();
        onClose();
      }}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-black p-0 text-white backdrop:bg-black"
      aria-label={k ? `Sala — ${k.client}, ${k.title}` : "Sala"}
    >
      {k && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 pt-3 md:px-8 md:pt-5">
            <p className="text-sm text-white/60">Sala · Pieza {k.chapter + 1}/5</p>
            <button type="button" onClick={() => dlg.current?.close()} className="grid size-11 place-items-center text-2xl" aria-label="Cerrar sala" autoFocus>
              ×
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center px-0 md:px-8">
            <video
              ref={vid}
              key={k.slug}
              controls
              playsInline
              preload="none"
              poster={k.cover.src}
              className="aspect-video max-h-[62dvh] w-full bg-black md:max-h-[68vh]"
              onPlay={() => track("video_play", { slug: k.slug, context: "e-sala" })}
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (!v.duration) return;
                const pct = (v.currentTime / v.duration) * 100;
                for (const m of [25, 50, 75, 100])
                  if (pct >= m - 0.5 && !marks.current.has(m)) {
                    marks.current.add(m);
                    track("video_progress", { slug: k.slug, pct: m, context: "e-sala" });
                  }
              }}
            >
              <source src={k.film} type="video/mp4" />
            </video>
          </div>
          <div className="px-4 pb-6 pt-4 md:flex md:items-end md:justify-between md:px-8 md:pb-8">
            <div>
              <p className="text-sm text-white/60">
                {k.kind}
                {k.when ? ` · ${k.when}` : ""}
                {k.with ? ` · con ${k.with}` : ""}
              </p>
              <p className="mt-1 text-[clamp(1.8rem,1rem+3vw,3.4rem)] font-semibold leading-[0.95] [font-variation-settings:'wdth'_70]">{k.client}</p>
              <p className="text-white/80">{k.title}</p>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-0">
              <Link href="/contacto" className="inline-flex min-h-12 items-center rounded-full bg-white px-6 font-medium text-black" data-track="cta" data-cta="hablemos" data-location="e-sala">
                Hablemos de algo así →
              </Link>
              <Link href={k.url} className="py-2 text-sm underline decoration-white/40 underline-offset-4" data-track="case_open" data-slug={k.slug} data-from="e-sala-full">
                Ficha completa
              </Link>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
