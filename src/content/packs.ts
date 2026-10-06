import type { L } from "@/lib/i18n";

/**
 * Packs as defined by 24SHOOTS (archive/notes/legal/PACKS-24SHOOTS-ES.txt).
 * No public prices: every pack is quoted to scope, frequency and platforms.
 */
export interface Pack {
  slug: string;
  index: string;
  name: L;
  forWhom: L;
  includes: L<string[]>;
  optional?: L;
}

export const packs: Pack[] = [
  {
    slug: "completo",
    index: "A",
    name: { es: "Pack Completo", en: "Full Pack" },
    forWhom: {
      es: "Para marcas que quieren delegar estrategia, producción y gestión en un solo equipo.",
      en: "For brands that want to hand strategy, production and management to a single team.",
    },
    includes: {
      es: ["Plan de contenido", "Estrategia de contenido", "Contenido para redes sociales", "Grabación y edición", "Seguimiento de mensajes directos"],
      en: ["Content plan", "Content strategy", "Social media content", "Filming and editing", "Direct message follow-up"],
    },
    optional: { es: "Dron, como extra opcional", en: "Drone, as an optional extra" },
  },
  {
    slug: "audiovisual",
    index: "B",
    name: { es: "Pack Audiovisual", en: "Audiovisual Pack" },
    forWhom: {
      es: "Para equipos que ya tienen community o agencia de redes y necesitan piezas con criterio.",
      en: "For teams that already have a community manager or social agency and need well-made pieces.",
    },
    includes: { es: ["Grabación", "Edición"], en: ["Filming", "Editing"] },
    optional: { es: "Dron, como extra opcional", en: "Drone, as an optional extra" },
  },
  {
    slug: "community",
    index: "C",
    name: { es: "Pack Community Management", en: "Community Management Pack" },
    forWhom: {
      es: "Para marcas que necesitan sus redes gestionadas con el mismo criterio visual.",
      en: "For brands that need their social channels run with the same visual judgement.",
    },
    includes: {
      es: ["Gestión de redes sociales", "Calendario y publicación", "Interacción"],
      en: ["Social media management", "Calendar and publishing", "Community interaction"],
    },
  },
];

/**
 * Side-by-side comparison, from archive/notes/legal/PACKS-24SHOOTS-ES.txt.
 * Order of `has`: completo, audiovisual, community. "opt" = optional extra.
 * PENDING (confirm with 24SHOOTS): monthly report in the Full Pack (the source lists
 * reporting under Community Management; the Full Pack is "strategy + production + management").
 */
export type Has = "yes" | "no" | "opt";
export const compare: { label: L; has: [Has, Has, Has] }[] = [
  { label: { es: "Estrategia de contenido", en: "Content strategy" }, has: ["yes", "no", "no"] },
  { label: { es: "Plan y calendario de contenido", en: "Content plan and calendar" }, has: ["yes", "no", "yes"] },
  { label: { es: "Grabación y edición", en: "Filming and editing" }, has: ["yes", "yes", "no"] },
  { label: { es: "Publicación y gestión de redes", en: "Publishing and social management" }, has: ["yes", "no", "yes"] },
  { label: { es: "Interacción y mensajes directos", en: "Community interaction and DMs" }, has: ["yes", "no", "yes"] },
  { label: { es: "Informe mensual", en: "Monthly report" }, has: ["yes", "no", "yes"] },
  { label: { es: "Dron", en: "Drone" }, has: ["opt", "opt", "no"] },
];
