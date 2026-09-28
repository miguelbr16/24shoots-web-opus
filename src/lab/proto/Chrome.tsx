"use client";

import Link from "next/link";
import { protoCopy } from "./data";
import { useClickTracking } from "./track";

/**
 * LAB ONLY — the same minimal chrome for A, D and E (the site header/footer are hidden
 * on these routes so every prototype is judged with identical navigation).
 */
export function ProtoChrome({ label }: { label: string }) {
  useClickTracking();
  return (
    <>
      <style>{`body>header,body>footer{display:none!important}#main{padding-top:0!important}html{scroll-padding-top:0!important}`}</style>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 bg-[linear-gradient(to_bottom,rgba(8,8,8,.7),rgba(8,8,8,0))] px-4 pt-3 pb-8 md:px-8 md:pt-5">
        <Link href="/" className="pointer-events-auto text-[1.05rem] font-semibold tracking-[-0.01em] [font-variation-settings:'wdth'_70] md:text-[1.25rem]" data-track="nav" data-to="home">
          24SHOOTS
        </Link>
        <nav aria-label="Principal" className="pointer-events-auto flex items-center gap-4 text-[0.95rem] md:gap-7">
          <Link href="/trabajo" className="py-2 text-white/85 hover:text-white" data-track="nav" data-to="work">
            Trabajo
          </Link>
          <Link href="/packs" className="py-2 text-white/85 hover:text-white" data-track="nav" data-to="packs">
            Packs
          </Link>
          <Link href="/contacto" className="rounded-full bg-white px-4 py-2 font-medium text-black hover:bg-white/85" data-track="cta" data-cta="hablemos" data-location="header">
            {protoCopy.cta}
          </Link>
        </nav>
      </header>
      <p className="sr-only">Prototipo {label} — laboratorio, no indexado.</p>
    </>
  );
}

/** Closing block shared by A/D/E; only the question changes. */
export function ProtoClosing({ question, id }: { question: string; id: string }) {
  return (
    <section id="contacto" className="flex min-h-[70svh] snap-start flex-col justify-center bg-[#080808] px-4 py-20 md:min-h-[80svh] md:px-8" data-section="contact">
      <h2 className="max-w-[16ch] text-[clamp(2.4rem,1.2rem+6vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.02em] [font-variation-settings:'wdth'_72]">{question}</h2>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Link href="/contacto" className="inline-flex min-h-12 items-center rounded-full bg-white px-7 text-[1.05rem] font-medium text-black hover:bg-white/85" data-track="cta" data-cta="hablemos" data-location={`closing-${id}`}>
          {protoCopy.cta} →
        </Link>
        <a href={`mailto:${protoCopy.email}`} className="py-2 text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white" data-track="contact_link" data-channel="email" data-location={`closing-${id}`}>
          {protoCopy.email}
        </a>
      </div>
      {/* WhatsApp / teléfono: pendientes de confirmar → no se muestran en el prototipo. */}
      <p className="mt-16 text-sm text-white/45">24SHOOTS · Valencia</p>
    </section>
  );
}
