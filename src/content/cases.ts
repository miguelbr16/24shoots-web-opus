import type { L, ServiceKey } from "@/lib/i18n";
import media from "./media.generated.json";

/**
 * Verified work only. Every statement below is visible in the delivered film
 * (client identity, event, edition, date on screen, what the film shows).
 * Nothing about results, budgets or audience figures is claimed.
 *
 * PENDING per case (see docs/V2-PENDIENTES.md): confirmation that the client can be
 * named, 24SHOOTS' exact role/credits, deliverables beyond the film, date and venue.
 */
export interface Case {
  slug: keyof typeof media.cases;
  client: string;
  title: L;
  /** Short line for lists and cards. */
  kind: L;
  service: ServiceKey;
  /** Only when shown in the film itself. */
  when?: L;
  /** Company credited in the film (end card / crew branding). */
  with?: string;
  summary: L;
  /** What the film covers, taken from the footage. */
  shows: L<string[]>;
  /** Alt text for each still, same order as media stills. */
  stillAlts: L<string[]>;
}

export const cases: Case[] = [
  {
    slug: "huhtamaki-50",
    client: "Huhtamaki",
    title: { es: "50 aniversario", en: "50th anniversary" },
    kind: { es: "Evento corporativo", en: "Corporate event" },
    service: "events",
    when: { es: "1976–2026", en: "1976–2026" },
    summary: {
      es: "Huhtamaki celebró sus cincuenta años en sus propias instalaciones: discursos, brindis, arroz, música en directo y una foto de grupo con la fachada de fondo. La película cuenta el día entero en minuto y medio.",
      en: "Huhtamaki celebrated fifty years at its own site: speeches, a toast, paella, live music and a group photo in front of the building. The film tells the whole day in a minute and a half.",
    },
    shows: {
      es: ["Planos aéreos de la planta y del ambiente", "Discursos y brindis de dirección", "Photocall, comida y música en directo", "Foto de grupo final"],
      en: ["Aerial shots of the site and the atmosphere", "Leadership speeches and toast", "Photocall, lunch and live music", "Closing group photo"],
    },
    stillAlts: {
      es: [
        "Vista aérea de la planta de Huhtamaki con el rótulo en la fachada",
        "Invitados en el photocall del 50 aniversario de Huhtamaki",
        "Discurso en el escenario con el logotipo del 50 aniversario",
        "Brindis en el escenario junto a la tarta del aniversario",
        "Foto de grupo aérea frente a la fachada de Huhtamaki",
        "Paella servida durante la comida del aniversario",
        "Banda tocando en directo durante la celebración",
        "Concierto en el escenario con el lema «Construyendo futuro · 1976–2026»",
        "Vista aérea de los asistentes bailando",
        "Foto de grupo de toda la celebración frente a la planta",
      ],
      en: [
        "Aerial view of the Huhtamaki site with the sign on the facade",
        "Guests at the Huhtamaki 50th anniversary photocall",
        "Speech on stage with the 50th anniversary logo",
        "Toast on stage next to the anniversary cake",
        "Aerial group photo in front of the Huhtamaki facade",
        "Paella served during the anniversary lunch",
        "Band playing live during the celebration",
        "Concert on stage under the line “Building the future · 1976–2026”",
        "Aerial view of guests dancing",
        "Group photo of the whole celebration in front of the site",
      ],
    },
  },
  {
    slug: "premios-isabel-ferrer",
    client: "Generalitat Valenciana",
    title: { es: "XXVIII Premios Isabel Ferrer", en: "28th Isabel Ferrer Awards" },
    kind: { es: "Gala institucional", en: "Institutional awards" },
    service: "events",
    when: { es: "8 de marzo", en: "8 March" },
    with: "MAS Events",
    summary: {
      es: "Los Premios Isabel Ferrer se entregan cada 8 de marzo, Día Internacional de la Mujer. Recepción en un claustro, sala en penumbra con luz de color, discursos y premiadas: una gala institucional contada con calma.",
      en: "The Isabel Ferrer Awards are presented every 8 March, International Women's Day. A reception in a cloister, a dim hall lit in colour, speeches and award winners: an institutional gala told without rush.",
    },
    shows: {
      es: ["Recepción en el claustro", "Discursos institucionales", "Entrega de premios y fotos oficiales", "Ambiente de sala"],
      en: ["Reception in the cloister", "Institutional speeches", "Awards and official photos", "The room"],
    },
    stillAlts: {
      es: [
        "Estatuillas de los Premios Isabel Ferrer",
        "Foto oficial ante el photocall del 8 de marzo",
        "Sala con columnas de luz de colores antes de la gala",
        "Saludo entre invitados durante la gala",
        "Entrega de un premio ante la pantalla de la gala",
        "Invitada en la sala con músicos al fondo",
        "Discurso en el atril con iluminación rosa",
        "Vista general de la sala durante la gala",
        "Catering de la recepción",
      ],
      en: [
        "Isabel Ferrer Awards statuettes",
        "Official photo at the 8 March photocall",
        "Hall with columns of coloured light before the gala",
        "Guests greeting each other during the gala",
        "An award presented in front of the gala screen",
        "A guest in the hall with musicians behind",
        "Speech at the lectern in pink light",
        "Wide view of the hall during the gala",
        "Reception catering",
      ],
    },
  },
  {
    slug: "premios-innovacion-valencia",
    client: "Ajuntament de València",
    title: { es: "Premios de Innovación · València Innovation Capital", en: "Innovation Awards · València Innovation Capital" },
    kind: { es: "Gala de premios", en: "Awards gala" },
    service: "events",
    with: "MAS Events",
    summary: {
      es: "Una gala sobre un escenario de pantallas LED. La película empieza antes que el público: el montaje técnico, las pruebas, los nervios. Después, la entrega de premios y la foto final.",
      en: "A gala on a stage built from LED screens. The film starts before the audience arrives: the technical build, the rehearsals, the nerves. Then the awards and the final photo.",
    },
    shows: {
      es: ["Montaje técnico del escenario", "Presentación y entrega de premios", "Actuaciones en directo", "Foto de grupo de premiados"],
      en: ["Technical build of the stage", "Presentation and awards", "Live performances", "Group photo of the winners"],
    },
    stillAlts: {
      es: [
        "Invitados llegando a la entrada del edificio",
        "Técnicos montando las pantallas LED",
        "Pasillo iluminado en azul antes de la gala",
        "Repaso del guion entre bastidores",
        "Escenario con marcos de luz LED",
        "Presentación en el escenario de los Premios de Innovación",
        "Actuación de violín en el escenario",
        "Premiada con su galardón en el escenario",
        "Actuación musical en directo",
        "Foto de grupo de premiados en el escenario",
      ],
      en: [
        "Guests arriving at the building entrance",
        "Technicians building the LED screens",
        "Blue-lit corridor before the gala",
        "Going over the script backstage",
        "Stage with LED light frames",
        "Presentation on the Innovation Awards stage",
        "Violin performance on stage",
        "Award winner with her award on stage",
        "Live music performance",
        "Group photo of the winners on stage",
      ],
    },
  },
  {
    slug: "imperia-scm",
    client: "Imperia SCM",
    title: { es: "The New Era of Supply Chain", en: "The New Era of Supply Chain" },
    kind: { es: "Congreso corporativo", en: "Corporate conference" },
    service: "events",
    with: "MAS Events",
    summary: {
      es: "Un congreso de empresa tecnológica con escenografía propia: ponencias, entrevistas en el photocall, networking y cierre. La película mantiene el tono de la marca —azul, sobrio, preciso— de principio a fin.",
      en: "A tech company conference with its own staging: keynotes, interviews at the photocall, networking and a close. The film keeps the brand's tone —blue, sober, precise— from start to finish.",
    },
    shows: {
      es: ["Entrevistas en el photocall", "Ponencias en el escenario", "Público y networking", "Cierre y cóctel"],
      en: ["Interviews at the photocall", "Keynotes on stage", "Audience and networking", "Closing and drinks"],
    },
    stillAlts: {
      es: [
        "Acreditaciones a la llegada",
        "Cámara grabando una entrevista en el photocall",
        "Ponente de Imperia en el escenario",
        "Ponente en el escenario junto al logotipo de Imperia",
        "Auditorio con el logotipo de Imperia",
        "Ponente en el escenario iluminado en azul",
        "Pantalla con el logotipo de Imperia en el auditorio",
        "Pantalla con una ilustración de manos durante una ponencia",
        "Abrazo entre asistentes al terminar",
      ],
      en: [
        "Accreditation on arrival",
        "Camera filming an interview at the photocall",
        "Imperia speaker on stage",
        "Speaker on stage next to the Imperia logo",
        "Auditorium with the Imperia logo",
        "Speaker on a stage lit in blue",
        "Screen with the Imperia logo in the auditorium",
        "Screen showing an illustration of hands during a talk",
        "Guests embracing at the end",
      ],
    },
  },
  {
    slug: "gala-esport-manises",
    client: "Ajuntament de Manises",
    title: { es: "XXIV Gala de l'Esport", en: "24th Sports Gala" },
    kind: { es: "Gala institucional", en: "Institutional gala" },
    service: "events",
    when: { es: "4 de junio de 2026", en: "4 June 2026" },
    summary: {
      es: "La gala anual del deporte de Manises, al aire libre y a la hora dorada. Discursos, reconocimientos a deportistas y clubes, y un público que se va quedando a contraluz mientras cae el sol.",
      en: "Manises' annual sports gala, outdoors and at golden hour. Speeches, awards for athletes and clubs, and an audience slowly turning to silhouettes as the sun goes down.",
    },
    shows: {
      es: ["Gala al aire libre al atardecer", "Discursos institucionales", "Reconocimientos a deportistas y clubes", "Público y ambiente"],
      en: ["Outdoor gala at sunset", "Institutional speeches", "Awards for athletes and clubs", "Audience and atmosphere"],
    },
    stillAlts: {
      es: [
        "Vista general de la Gala de l'Esport con el escenario al fondo",
        "Banderas junto a la pantalla de la gala",
        "Discurso en el atril del Ajuntament de Manises",
        "Público ante el escenario",
        "Discurso institucional en el atril",
        "Abrazo en el escenario tras un reconocimiento",
        "Público de la gala al atardecer",
        "Joven a contraluz con el cielo del atardecer",
        "Premiados ante la pantalla de la Gala de l'Esport",
      ],
      en: [
        "Wide view of the sports gala with the stage behind",
        "Flags next to the gala screen",
        "Speech at the Ajuntament de Manises lectern",
        "Audience facing the stage",
        "Institutional speech at the lectern",
        "An embrace on stage after an award",
        "Gala audience at sunset",
        "Young woman silhouetted against the sunset",
        "Award winners in front of the gala screen",
      ],
    },
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
export interface CaseMedia {
  duration: number;
  stills: string[];
  cover: string;
  preview: { webm: string; mp4: string };
  film: string;
  og: string;
  sheet?: string[];
  sheetTimes?: number[];
}
export const caseMedia = (slug: Case["slug"]): CaseMedia => media.cases[slug];
export const heroMedia = media.hero;
