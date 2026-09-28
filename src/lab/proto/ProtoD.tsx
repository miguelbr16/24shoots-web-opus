"use client";

import { useRef } from "react";
import type { ProtoFrame } from "./data";
import { protoCopy as c } from "./data";
import { ProtoChrome, ProtoClosing } from "./Chrome";
import { Strip } from "./Strip";
import { useViewOnce } from "./track";

/**
 * LAB — D · 24 FOTOGRAMAS. The home is one second of film: 24 real frames, numbered,
 * cases as chapters inside the sequence. `every` = 2 tests the 12-frame mobile variant.
 */
export function ProtoD({ frames, id = "d" }: { frames: ProtoFrame[]; id?: string }) {
  const top = useRef<HTMLDivElement>(null);
  useViewOnce(top, "hero_view", { variant: id }, 0, 0.3);
  return (
    <>
      <ProtoChrome label={`D — 24 fotogramas${id !== "d" ? " (12 en móvil)" : ""}`} />
      <style>{`@media (max-width: 767px){html{scroll-snap-type:y mandatory}}`}</style>
      <div className="relative">
        <div ref={top} className="pointer-events-none absolute inset-x-0 top-0 h-[100svh]" aria-hidden />
        <Strip frames={frames} id={id} />
      </div>
      <ProtoClosing question={c.closing24} id={id} />
    </>
  );
}
