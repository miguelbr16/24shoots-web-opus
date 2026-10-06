"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Floating WhatsApp: a few ready-made first messages so starting a conversation is one tap.
 * Each option opens wa.me with the text prefilled (the user can still edit it before sending).
 * The number comes from site.contact.phone.
 */
const copy = {
  es: {
    open: "Escríbenos por WhatsApp",
    close: "Cerrar",
    title: "¿Sobre qué quieres hablar?",
    note: "Se abre WhatsApp con el mensaje escrito; puedes cambiarlo antes de enviarlo.",
    options: [
      { id: "brand", label: "Quiero contenido para mi marca", text: "Hola, 24SHOOTS. Me interesa que llevéis el contenido de mi marca. ¿Me contáis cómo trabajáis?" },
      { id: "shoot", label: "Tengo un evento o rodaje", text: "Hola, 24SHOOTS. Tengo un evento o rodaje y me gustaría pedir presupuesto." },
      { id: "other", label: "Otra consulta", text: "Hola, 24SHOOTS. Quería consultaros un proyecto." },
    ],
  },
  en: {
    open: "Message us on WhatsApp",
    close: "Close",
    title: "What would you like to talk about?",
    note: "WhatsApp opens with the message written; you can edit it before sending.",
    options: [
      { id: "brand", label: "Content for my brand", text: "Hi 24SHOOTS, I’d like you to handle my brand’s content. How do you work?" },
      { id: "shoot", label: "I have an event or shoot", text: "Hi 24SHOOTS, I have an event or shoot and would like a quote." },
      { id: "other", label: "Something else", text: "Hi 24SHOOTS, I’d like to ask you about a project." },
    ],
  },
} as const;

const waNumber = site.contact.phone.replace(/[^\d]/g, "");
const waLink = (text: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

export function WhatsApp({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panelId = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // Don't sit on top of the home opening's own call to action.
  useEffect(() => {
    const offer = document.querySelector(".st-offer");
    if (!offer) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.2 });
    io.observe(offer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={root} className={`fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 transition-opacity duration-300 md:bottom-6 md:right-6 ${hidden && !open ? "pointer-events-none opacity-0" : "opacity-100"}`} inert={hidden && !open ? true : undefined}>
      {open && (
        <div id={panelId} role="dialog" aria-label={c.title} className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-bone/15 bg-ink-2 p-4 text-bone shadow-[0_12px_40px_rgba(0,0,0,.5)]">
          <p className="font-medium">{c.title}</p>
          <ul className="mt-3 grid gap-2">
            {c.options.map((o) => (
              <li key={o.id}>
                <a
                  href={waLink(o.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-between gap-3 rounded-full border border-bone/20 px-4 py-2 transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                  data-track="contact_link"
                  data-channel="whatsapp"
                  data-preset={o.id}
                  onClick={() => setOpen(false)}
                >
                  <span>{o.label}</span>
                  <span aria-hidden>→</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-snug text-ash">{c.note}</p>
        </div>
      )}
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? c.close : c.open}
        className="grid size-14 place-items-center rounded-full bg-[#25D366] text-[#08310f] shadow-[0_6px_24px_rgba(0,0,0,.45)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
        data-track="whatsapp_open"
      >
        {open ? (
          <span aria-hidden className="text-2xl leading-none">×</span>
        ) : (
          <svg aria-hidden viewBox="0 0 24 24" className="size-7" fill="currentColor">
            <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.95 3.85Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.7c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
