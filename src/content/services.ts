import type { L, ServiceKey } from "@/lib/i18n";

export interface Service {
  key: ServiceKey;
  index: string;
  name: L;
  /** One line for indexes. */
  line: L;
  /** SEO title fragment. */
  seoTitle: L;
  seoDescription: L;
  problem: L;
  approach: L<string[]>;
  capabilities: L<string[]>;
  deliverables: L<string[]>;
  faqs: L<{ q: string; a: string }[]>;
}

/**
 * Offer descriptions. They describe how 24SHOOTS works and what can be delivered;
 * they make no claims about past results. PENDING: review and approval by 24SHOOTS.
 */
export const services: Service[] = [
  {
    key: "events",
    index: "01",
    name: { es: "Eventos corporativos", en: "Corporate events" },
    line: {
      es: "Aniversarios, galas, congresos y presentaciones, convertidos en material para comunicar durante meses.",
      en: "Anniversaries, galas, conferences and launches, turned into material you can communicate with for months.",
    },
    seoTitle: { es: "Vídeo y fotografía para eventos corporativos en Valencia", en: "Corporate event film and photography in Valencia" },
    seoDescription: {
      es: "Películas de evento, cortes para redes y fotografía para aniversarios, galas, congresos y presentaciones. Estudio creativo en Valencia.",
      en: "Event films, social cuts and photography for anniversaries, galas, conferences and launches. Creative studio based in Valencia.",
    },
    problem: {
      es: "Un evento importante se prepara durante meses y dura unas horas. Si nadie lo cuenta bien, cuando se apagan las luces solo queda el recuerdo de quien estuvo.",
      en: "An important event takes months to prepare and lasts a few hours. If nobody tells it well, when the lights go off all that remains is the memory of those who were there.",
    },
    approach: {
      es: [
        "Antes del día hablamos con quien organiza: qué momentos importan, qué personas tienen que aparecer y dónde se va a usar el material.",
        "Durante el evento rodamos con un plan, sin interferir en el protocolo ni en el escenario.",
        "Después montamos una película principal y, del mismo material, las piezas que cada canal necesita.",
      ],
      en: [
        "Before the day we talk to the organisers: which moments matter, who needs to appear and where the material will be used.",
        "On the day we film to a plan, without getting in the way of protocol or the stage.",
        "Afterwards we cut a main film and, from the same footage, the pieces each channel needs.",
      ],
    },
    capabilities: {
      es: ["Rodaje multicámara", "Dron", "Fotografía", "Sonido de ambiente y discursos", "Montaje", "Color", "Versiones verticales"],
      en: ["Multi-camera filming", "Drone", "Photography", "Ambient and speech audio", "Editing", "Colour", "Vertical versions"],
    },
    deliverables: {
      es: ["Película del evento", "Cortes cortos para redes", "Selección de fotografías", "Piezas para comunicación interna o prensa"],
      en: ["Event film", "Short cuts for social media", "Photo selection", "Pieces for internal comms or press"],
    },
    faqs: {
      es: [
        { q: "¿Qué necesitáis saber para preparar la cobertura de un evento?", a: "El programa, los espacios, las personas clave y para qué se va a usar el material. Con eso proponemos el equipo y las piezas a entregar." },
        { q: "¿Podéis entregar piezas mientras el evento todavía está en marcha?", a: "Se puede plantear si se decide antes del día, porque cambia el equipo y el flujo de trabajo. Lo concretamos en la propuesta." },
        { q: "¿Trabajáis también para agencias de eventos?", a: "Sí. Podemos integrarnos en el equipo de una agencia o productora como responsables del audiovisual." },
        { q: "¿Cuánto cuesta cubrir un evento?", a: "Depende de la duración, el número de cámaras y las piezas que necesites. Tras hablar del proyecto enviamos una propuesta cerrada." },
      ],
      en: [
        { q: "What do you need to know to prepare an event shoot?", a: "The running order, the spaces, the key people and what the material will be used for. With that we propose the crew and the deliverables." },
        { q: "Can you deliver pieces while the event is still running?", a: "It can be arranged if it is agreed before the day, since it changes the crew and the workflow. We set it out in the proposal." },
        { q: "Do you also work for event agencies?", a: "Yes. We can join an agency's or producer's team as the people in charge of film and photography." },
        { q: "How much does event coverage cost?", a: "It depends on the length, the number of cameras and the pieces you need. After talking through the project we send a fixed proposal." },
      ],
    },
  },
  {
    key: "brand",
    index: "02",
    name: { es: "Contenido de marca", en: "Brand content" },
    line: {
      es: "Piezas de vídeo y fotografía para contar lo que hace una marca: su gente, sus espacios, su producto.",
      en: "Film and photography that show what a brand does: its people, its spaces, its product.",
    },
    seoTitle: { es: "Contenido audiovisual de marca en Valencia", en: "Brand film and photography content in Valencia" },
    seoDescription: {
      es: "Vídeo y fotografía de marca para web, redes y comunicación: personas, espacios y producto, con dirección creativa y producción propia.",
      en: "Brand film and photography for web, social and communications: people, spaces and product, with our own creative direction and production.",
    },
    problem: {
      es: "Las marcas necesitan imagen propia de forma constante, y casi nunca tienen un equipo interno para producirla con criterio.",
      en: "Brands need their own imagery all the time, and they rarely have an in-house team to produce it with judgement.",
    },
    approach: {
      es: [
        "Partimos de lo que la marca tiene que contar y de dónde lo va a publicar.",
        "Planificamos rodajes que den material para varias piezas, no una sola.",
        "Mantenemos una línea visual reconocible pieza tras pieza.",
      ],
      en: [
        "We start from what the brand has to say and where it will be published.",
        "We plan shoots that yield material for several pieces, not just one.",
        "We keep a recognisable visual line from one piece to the next.",
      ],
    },
    capabilities: {
      es: ["Dirección creativa", "Rodaje", "Fotografía", "Dron", "Montaje", "Color", "Formatos para cada red"],
      en: ["Creative direction", "Filming", "Photography", "Drone", "Editing", "Colour", "Formats for each platform"],
    },
    deliverables: {
      es: ["Piezas de vídeo para web y redes", "Retratos y fotografía de equipo", "Fotografía de espacios y producto", "Series verticales"],
      en: ["Films for web and social", "Portraits and team photography", "Space and product photography", "Vertical series"],
    },
    faqs: {
      es: [
        { q: "¿Podemos trabajar de forma continuada y no solo por proyecto?", a: "Sí. Se puede planificar un calendario de rodajes para producir material de forma regular." },
        { q: "¿Os encargáis también de la idea?", a: "Sí. Proponemos el enfoque y el guion de cada pieza, o trabajamos a partir de un briefing vuestro o de vuestra agencia." },
        { q: "¿Publicáis nosotros el contenido en redes?", a: "Nuestro trabajo es producir las piezas en los formatos que necesitéis. La publicación la gestiona vuestro equipo o vuestra agencia." },
      ],
      en: [
        { q: "Can we work on an ongoing basis rather than per project?", a: "Yes. A shooting calendar can be planned to produce material regularly." },
        { q: "Do you also come up with the idea?", a: "Yes. We propose the approach and script for each piece, or we work from a brief from you or your agency." },
        { q: "Do you publish the content on social media?", a: "Our job is to produce the pieces in the formats you need. Publishing is handled by your team or your agency." },
      ],
    },
  },
  {
    key: "campaigns",
    index: "03",
    name: { es: "Campañas", en: "Campaigns" },
    line: {
      es: "Una idea y su producción: de la pieza principal a todas las versiones que la campaña necesita.",
      en: "An idea and its production: from the hero piece to every version the campaign needs.",
    },
    seoTitle: { es: "Producción audiovisual para campañas en Valencia", en: "Film production for campaigns in Valencia" },
    seoDescription: {
      es: "Idea, rodaje y postproducción de piezas de campaña para medios digitales, redes y pantallas, con todas sus versiones.",
      en: "Concept, filming and post-production of campaign pieces for digital, social and screens, with every version they need.",
    },
    problem: {
      es: "Una campaña necesita una idea clara y una producción que aguante todos los formatos en los que se va a ver.",
      en: "A campaign needs a clear idea and a production that holds up in every format it will be seen in.",
    },
    approach: {
      es: [
        "Trabajamos la idea con vosotros o con vuestra agencia antes de hablar de cámaras.",
        "Diseñamos el rodaje pensando en todas las versiones: horizontal, vertical, corta y larga.",
        "Entregamos masters y versiones listas para cada medio.",
      ],
      en: [
        "We work on the idea with you or your agency before talking about cameras.",
        "We design the shoot with every version in mind: horizontal, vertical, short and long.",
        "We deliver masters and versions ready for each channel.",
      ],
    },
    capabilities: {
      es: ["Concepto y guion", "Producción", "Rodaje", "Fotografía", "Postproducción", "Color", "Versionado"],
      en: ["Concept and script", "Production", "Filming", "Photography", "Post-production", "Colour", "Versioning"],
    },
    deliverables: {
      es: ["Pieza principal", "Cortes de 6, 15 y 30 segundos", "Versiones verticales y cuadradas", "Fotografía de campaña"],
      en: ["Hero piece", "6, 15 and 30-second cuts", "Vertical and square versions", "Campaign photography"],
    },
    faqs: {
      es: [
        { q: "¿Trabajáis con agencias creativas?", a: "Sí. Podemos producir la idea de una agencia o desarrollarla juntos desde el principio." },
        { q: "¿Qué formatos entregáis?", a: "Los que pida el plan de medios: horizontales, verticales y cuadrados, en las duraciones necesarias, además de los masters." },
      ],
      en: [
        { q: "Do you work with creative agencies?", a: "Yes. We can produce an agency's idea or develop it together from the start." },
        { q: "Which formats do you deliver?", a: "Whatever the media plan requires: horizontal, vertical and square, in the lengths needed, plus the masters." },
      ],
    },
  },
];

export const getService = (key: ServiceKey) => services.find((s) => s.key === key)!;
