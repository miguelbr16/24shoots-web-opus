"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui";
import { getRoute } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function segment(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

interface ScrollHeroProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  videoSrc?: string | null;
}

function Clapperboard({ progress }: { progress: number }) {
  const frameIn = segment(progress, 0.38, 0.55);
  const snap = segment(progress, 0.58, 0.72);
  const topRotate = lerp(-38, -8, snap);

  if (frameIn <= 0) return null;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ opacity: frameIn }}
    >
      <div className="relative h-[min(52vw,320px)] w-[min(72vw,440px)]">
        <div
          className="absolute inset-x-0 bottom-0 top-[18%] rounded-sm border-2 border-white/25 bg-black/40 backdrop-blur-sm"
          style={{ transform: `scale(${lerp(0.88, 1, frameIn)})` }}
        >
          <div className="absolute inset-x-4 top-4 h-px bg-white/15" />
          <div className="absolute bottom-4 left-4 text-[9px] font-semibold uppercase tracking-[0.35em] text-white/40">
            24Shoots · Valencia
          </div>
          <div className="absolute bottom-4 right-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
            Take 01
          </div>
        </div>

        <div
          className="absolute inset-x-[-2%] top-0 h-[22%] origin-bottom-left"
          style={{ transform: `rotate(${topRotate}deg)` }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-sm border-2 border-white/25 bg-surface">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "repeating-linear-gradient(-12deg, #fff 0 14px, #111 14px 28px)",
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoAssembly({ progress }: { progress: number }) {
  const assemble = segment(progress, 0.1, 0.4);
  if (assemble <= 0) return null;

  const leftX = lerp(-180, 0, assemble);
  const rightX = lerp(180, 0, assemble);
  const opacity = assemble;
  const mediaOpacity = segment(progress, 0.22, 0.38);

  return (
    <div
      className="relative z-30 flex flex-col items-center"
      style={{ opacity }}
    >
      <div className="relative mb-3 flex items-end gap-1 overflow-hidden md:gap-2">
        <span
          className="text-5xl font-light tracking-tight text-white md:text-7xl"
          style={{ transform: `translateX(${leftX}px)` }}
        >
          24
        </span>
        <span
          className="text-5xl font-semibold tracking-tight text-accent md:text-7xl"
          style={{ transform: `translateX(${rightX}px)` }}
        >
          SHOOTS
        </span>
      </div>
      <div
        className="h-1 w-40 origin-left bg-accent md:w-52"
        style={{ transform: `scaleX(${assemble})` }}
      />
      <p
        className="mt-4 text-[10px] font-semibold uppercase tracking-[0.45em] text-white/50"
        style={{ opacity: mediaOpacity }}
      >
        Media
      </p>
    </div>
  );
}

export function ScrollHero({
  locale,
  eyebrow,
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  videoSrc = null,
}: ScrollHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const next = clamp(-rect.top / scrollable);
      setProgress(next);

      if (useVideo && videoRef.current?.duration) {
        videoRef.current.currentTime = next * videoRef.current.duration;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [useVideo]);

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;
    const video = videoRef.current;
    const onReady = () => setUseVideo(true);
    video.addEventListener("loadedmetadata", onReady);
    return () => video.removeEventListener("loadedmetadata", onReady);
  }, [videoSrc]);

  const sceneIn = segment(progress, 0.08, 0.14);
  const sceneOut = 1 - segment(progress, 0.72, 0.92);
  const textIn = segment(progress, 0.76, 0.92);
  const leftTextY = lerp(40, 0, textIn);
  const rightTextY = lerp(40, 0, textIn);
  const glowPulse = segment(progress, 0.05, 0.25) * 0.5;

  return (
    <section ref={sectionRef} className="relative h-[200vh] w-full sm:h-[240vh] lg:h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <div
          className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]"
          style={{ opacity: glowPulse }}
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-accent/10 blur-[100px]"
          style={{ opacity: glowPulse * 0.6 }}
        />
        <div className="grain absolute inset-0" />

        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              useVideo ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {!useVideo && (
          <div className="absolute inset-0 bg-gradient-to-b from-panel via-background to-background" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/40" />

        {/* Logo + clapper — hidden until scroll starts */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative"
            style={{
              opacity: sceneIn * sceneOut,
              transform: `scale(${lerp(1.12, 1, segment(progress, 0.48, 0.68))})`,
            }}
          >
            <LogoAssembly progress={progress} />
            <Clapperboard progress={progress} />
          </div>
        </div>

        <div className="absolute inset-0 z-40 flex items-end px-4 pb-24 pt-28 sm:items-center sm:pb-0 sm:pt-0 md:px-12 lg:px-20">
          <div className="grid w-full gap-6 sm:gap-8 lg:grid-cols-2 lg:items-end">
            <div
              className="pointer-events-none lg:pointer-events-auto"
              style={{
                opacity: textIn,
                transform: `translateY(${leftTextY}px)`,
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/70 sm:text-[11px] sm:tracking-[0.35em]">
                {eyebrow}
              </p>
              <h1 className="mt-3 max-w-xl text-3xl font-light leading-[1.08] tracking-tight sm:mt-5 sm:text-4xl md:text-6xl">
                {title.split(" ").map((word, i) =>
                  word.toLowerCase() === "impacto" ||
                  word.toLowerCase() === "impact" ? (
                    <span key={i} className="font-medium text-accent">
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h1>
            </div>

            <div
              className="pointer-events-none lg:pointer-events-auto lg:text-right"
              style={{
                opacity: textIn,
                transform: `translateY(${rightTextY}px)`,
              }}
            >
              <p className="text-base font-light text-foreground/90 sm:text-lg md:text-2xl">
                {subtitle}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted lg:ml-auto">
                {description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4 lg:justify-end pointer-events-auto">
                <Button href={getRoute(locale, "contact")} showArrow className="!px-5 !py-3 text-[10px] sm:!text-xs">
                  {ctaPrimary}
                </Button>
                <Button href={getRoute(locale, "portfolio")} variant="secondary" className="!px-5 !py-3 text-[10px] sm:!text-xs">
                  {ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: 1 - segment(progress, 0.08, 0.3) }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  );
}
