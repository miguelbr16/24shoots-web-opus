"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { SectionHeading } from "./ui";

interface BeforeAfterSectionProps {
  title: string;
  subtitle: string;
  rawLabel: string;
  editedLabel: string;
  dragHint: string;
  image: string;
}

export function BeforeAfterSection({
  title,
  subtitle,
  rawLabel,
  editedLabel,
  dragHint,
  image,
}: BeforeAfterSectionProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(98, Math.max(2, x)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className="border-y border-border bg-surface py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading title={title} subtitle={subtitle} />

        <div
          ref={containerRef}
          className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden border border-border bg-media sm:aspect-[16/10] md:aspect-[21/9]"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {/* RAW / sin editar */}
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            style={{
              filter: "saturate(0.45) contrast(0.88) brightness(0.82) sepia(0.15)",
            }}
            sizes="(max-width: 768px) 100vw, 1152px"
            draggable={false}
            priority={false}
          />

          {/* Editado / color */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1152px"
              draggable={false}
            />
          </div>

          {/* Divider */}
          <div
            className="absolute inset-y-0 z-10 w-0.5 bg-accent shadow-[0_0_20px_rgba(232,131,58,0.6)]"
            style={{ left: `${position}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-accent bg-background/90 backdrop-blur-sm md:h-12 md:w-12">
              <span className="text-[10px] font-bold text-accent md:text-xs">⟷</span>
            </div>
          </div>

          <span className="absolute left-3 top-3 z-20 border border-white/20 bg-black/50 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm md:left-5 md:top-5">
            {rawLabel}
          </span>
          <span className="absolute right-3 top-3 z-20 border border-accent/40 bg-black/50 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm md:right-5 md:top-5">
            {editedLabel}
          </span>

          <p className="absolute bottom-3 left-0 right-0 z-20 text-center text-[9px] uppercase tracking-[0.25em] text-white/50 md:bottom-5">
            {dragHint}
          </p>
        </div>
      </div>
    </section>
  );
}
