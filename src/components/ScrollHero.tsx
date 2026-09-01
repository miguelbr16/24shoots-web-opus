"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
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

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

interface ScrollHeroProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  logoSrc?: string;
  videoSrc?: string | null;
  posterSrc?: string | null;
}

const LOGO_LETTERS = [
  { char: "2", accent: false, start: 0.1, end: 0.18 },
  { char: "4", accent: false, start: 0.14, end: 0.22 },
  { char: "S", accent: true, start: 0.2, end: 0.28 },
  { char: "H", accent: true, start: 0.24, end: 0.32 },
  { char: "O", accent: true, start: 0.28, end: 0.36 },
  { char: "O", accent: true, start: 0.32, end: 0.4 },
  { char: "T", accent: true, start: 0.36, end: 0.44 },
  { char: "S", accent: true, start: 0.4, end: 0.48 },
] as const;

function LogoAssembly({
  progress,
  compact = false,
  fadeOutStart = 0.62,
  fadeOutEnd = 0.78,
}: {
  progress: number;
  compact?: boolean;
  fadeOutStart?: number;
  fadeOutEnd?: number;
}) {
  const fadeIn = segment(progress, 0.06, 0.12);
  const fadeOut = 1 - segment(progress, fadeOutStart, fadeOutEnd);
  const masterOpacity = fadeIn * fadeOut;

  const barScale = segment(progress, 0.44, 0.56);
  const mediaOpacity = segment(progress, 0.5, 0.6);
  const topRuleScale = segment(progress, 0.08, 0.16);

  if (masterOpacity <= 0) return null;

  return (
    <div
      className="relative z-30 flex flex-col items-center px-2"
      style={{
        opacity: masterOpacity,
        transform: `scale(${lerp(0.96, compact ? 0.82 : 1, fadeIn) * lerp(1, 0.92, segment(progress, fadeOutStart, fadeOutEnd))})`,
      }}
    >
      <div
        className="mb-3 h-px w-14 origin-center bg-white/20 sm:mb-4 sm:w-20"
        style={{ transform: `scaleX(${topRuleScale})` }}
        aria-hidden
      />

      <div className="flex items-end gap-0.5 sm:gap-1">
        {LOGO_LETTERS.map((letter, index) => {
          const letterIn = segment(progress, letter.start, letter.end);
          const isSecondGroup = index >= 2;

          return (
            <span
              key={`${letter.char}-${index}`}
              className={`inline-block font-light leading-none tracking-tight ${
                compact
                  ? "text-[2rem] sm:text-5xl"
                  : "text-[2.75rem] sm:text-6xl md:text-7xl"
              } ${letter.accent ? "font-semibold text-accent" : "text-white"} ${
                isSecondGroup && index === 2 ? "ml-1 sm:ml-1.5" : ""
              }`}
              style={{
                opacity: letterIn,
                transform: `translateY(${lerp(18, 0, letterIn)}px)`,
              }}
            >
              {letter.char}
            </span>
          );
        })}
      </div>

      <div
        className={`mt-2 h-1 origin-left bg-accent ${compact ? "w-28 sm:w-36" : "w-36 sm:w-44 md:w-52"}`}
        style={{ transform: `scaleX(${barScale})` }}
        aria-hidden
      />

      {!compact && (
        <p
          className="mt-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-white/50 sm:mt-4"
          style={{
            opacity: mediaOpacity,
            transform: `translateY(${lerp(8, 0, mediaOpacity)}px)`,
          }}
        >
          Media
        </p>
      )}

      <div
        className="mt-2 h-px w-8 origin-center bg-white/15 sm:mt-3 sm:w-10"
        style={{ transform: `scaleX(${segment(progress, 0.54, 0.62)})` }}
        aria-hidden
      />
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
  logoSrc: _logoSrc = "/logo.svg",
  videoSrc = null,
  posterSrc = null,
}: ScrollHeroProps) {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const isMobile = useIsMobile();

  const syncVideoTime = useCallback(
    (p: number, mediaVisible: number) => {
      const video = videoRef.current;
      if (!video || !videoReady || !video.duration || mediaVisible <= 0) return;
      video.currentTime = clamp(p * video.duration, 0, video.duration);
    },
    [videoReady]
  );

  const updateProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const next = clamp(-rect.top / scrollable);
    setProgress(next);
  }, []);

  const setVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (!node || !videoSrc) return;

      const markReady = () => setVideoReady(true);

      if (node.readyState >= 1) {
        markReady();
      } else {
        node.addEventListener("loadedmetadata", markReady, { once: true });
        node.addEventListener("loadeddata", markReady, { once: true });
      }

      void node.load();
    },
    [videoSrc]
  );

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [updateProgress, pathname]);

  useEffect(() => {
    if (videoReady) {
      updateProgress();
    }
  }, [videoReady, updateProgress]);

  const logoIntro = segment(progress, 0.06, 0.12);
  const logoBuilt = segment(progress, 0.48, 0.58);

  const mediaIn = segment(progress, 0.04, 0.16);
  // Desktop: vídeo mientras se monta el logo; fuera cuando el logo está completo
  const mediaOutDesktop = segment(progress, 0.56, 0.7);
  const mediaOutMobile = segment(progress, 0.42, 0.58);
  const textInMobile = segment(progress, 0.68, 0.88);
  const textInDesktop = segment(progress, 0.52, 0.78);

  const textIn = isMobile ? textInMobile : textInDesktop;
  const mobileCopyKill = isMobile ? 1 - segment(progress, 0.62, 0.72) : 1;

  const mediaVisible = isMobile
    ? mediaIn * (1 - mediaOutMobile) * mobileCopyKill
    : mediaIn * (1 - mediaOutDesktop);

  const videoOpacity =
    videoReady && mediaVisible > 0
      ? mediaVisible * (isMobile ? Math.max(0.3, mediaIn) : Math.max(0.55, mediaIn))
      : 0;
  const posterOpacity =
    posterSrc && mediaVisible > 0
      ? mediaVisible * (isMobile ? 1 - videoOpacity * 0.85 : Math.max(0.35, 1 - videoOpacity * 0.7))
      : 0;

  useEffect(() => {
    syncVideoTime(progress, mediaVisible);
  }, [progress, mediaVisible, syncVideoTime]);

  const showCenterLogoDesktop = !isMobile && logoBuilt > 0 && textIn < 0.98;
  const showIntroLogo = logoIntro > 0 && (isMobile ? textInMobile < 0.12 : !showCenterLogoDesktop);

  const leftTextY = lerp(24, 0, textIn);
  const rightTextY = lerp(24, 0, textIn);
  const glowPulse = segment(progress, 0.05, 0.22) * 0.35 * mediaVisible;

  const titleWords = title.split(" ").map((word, i) =>
    word.toLowerCase() === "impacto" || word.toLowerCase() === "impact" ? (
      <span key={i} className="font-medium text-accent">
        {word}{" "}
      </span>
    ) : (
      <span key={i}>{word} </span>
    )
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[170vh] w-full sm:h-[200vh] lg:h-[240vh]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-background">
        <div
          className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]"
          style={{ opacity: glowPulse }}
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-accent/10 blur-[100px]"
          style={{ opacity: glowPulse * 0.6 }}
        />
        <div className="grain absolute inset-0" />

        {posterSrc && (
          <Image
            src={posterSrc}
            alt=""
            fill
            priority
            className="object-cover object-center transition-opacity duration-700"
            style={{ opacity: posterOpacity }}
            sizes="100vw"
          />
        )}

        {videoSrc && (
          <video
            ref={setVideoRef}
            src={videoSrc}
            muted
            playsInline
            preload="metadata"
            poster={posterSrc ?? undefined}
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-center transition-opacity duration-700"
            style={{ opacity: videoOpacity }}
          />
        )}

        {!posterSrc && !videoSrc && (
          <div className="absolute inset-0 bg-gradient-to-b from-panel via-background to-background" />
        )}

        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/60 transition-opacity duration-500"
          style={{
            opacity: isMobile
              ? lerp(0.92, 1, 1 - mediaVisible)
              : lerp(0.5, 1, mediaOutDesktop),
          }}
        />

        {showIntroLogo && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <LogoAssembly
              progress={progress}
              fadeOutStart={isMobile ? 0.6 : 0.48}
              fadeOutEnd={isMobile ? 0.72 : 0.56}
            />
          </div>
        )}

        <div className="absolute inset-0 z-40 flex items-end px-4 pb-20 pt-24 sm:items-center sm:pb-0 sm:pt-0 md:px-10 lg:px-14">
          <div
            className={`grid w-full gap-6 sm:gap-8 ${
              showCenterLogoDesktop
                ? "lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-8 xl:gap-12"
                : "lg:grid-cols-2 lg:items-end lg:gap-12 xl:gap-16"
            }`}
          >
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
              <h1 className="mt-3 max-w-xl text-3xl font-light leading-[1.08] tracking-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
                {titleWords}
              </h1>
              <p className="mt-4 text-base font-light leading-snug text-foreground/90 lg:hidden">
                {subtitle}
              </p>
            </div>

            {showCenterLogoDesktop && (
              <div
                className="pointer-events-none hidden justify-center lg:flex"
                style={{
                  opacity: clamp(textIn * 0.35 + logoBuilt * 0.65),
                  transform: `translateY(${lerp(12, 0, textIn)}px)`,
                }}
              >
                <LogoAssembly
                  progress={progress}
                  compact
                  fadeOutStart={0.9}
                  fadeOutEnd={0.98}
                />
              </div>
            )}

            <div
              className="pointer-events-none lg:pointer-events-auto lg:text-right"
              style={{
                opacity: textIn,
                transform: `translateY(${rightTextY}px)`,
              }}
            >
              <p className="hidden text-base font-light text-foreground/90 lg:block lg:text-lg xl:text-2xl">
                {subtitle}
              </p>
              <p className="mt-0 max-w-md text-sm leading-relaxed text-muted lg:ml-auto lg:mt-4">
                {description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 lg:mt-8 lg:justify-end pointer-events-auto">
                <Button
                  href={getRoute(locale, "contact")}
                  showArrow
                  className="!px-5 !py-3 text-[10px] lg:!text-xs"
                >
                  {ctaPrimary}
                </Button>
                <Button
                  href={getRoute(locale, "portfolio")}
                  variant="secondary"
                  showArrow
                  className="!border-accent/80 !bg-accent/25 !text-foreground shadow-[0_0_28px_rgba(232,131,58,0.22)] backdrop-blur-sm hover:!border-accent hover:!bg-accent/40 lg:!text-xs"
                >
                  {ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8"
          style={{ opacity: 1 - segment(progress, 0.08, 0.26) }}
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
