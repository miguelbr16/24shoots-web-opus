import type { Locale } from "@/lib/i18n";

/**
 * Home as a story: the brand idea → what we do → one proof → trust → how to start.
 * Built from copy already on the site (copy.ts: hero, day, studio.how, closing).
 * New narrative lines are marked NEW and are PENDING approval by 24SHOOTS.
 * No figures, results or promises that are not verifiable.
 */
const es = {
  chapters: ["La idea", "Lo que hacemos", "Un ejemplo", "Confianza", "Empezar"],
  open: {
    p1: "Un evento dura un día.",
    p2: "Después, se apagan las luces.", // NEW
    p3a: "Un evento termina.",
    p3b: "El contenido continúa.",
    scroll: "Desliza",
    offer: "Vídeo y fotografía para eventos corporativos, contenido de marca y campañas · Valencia",
    alt: "Celebración del 50 aniversario de Huhtamaki",
  },
  idea: {
    title: "Lo que se cuenta de él dura todo el año.",
    body: "Un aniversario, una gala, un congreso: momentos que una organización prepara durante meses y que duran unas horas. Nuestro trabajo es que se puedan seguir contando después.",
    uses: ["En la web", "En redes", "En comunicación interna", "En la próxima presentación"],
  },
  steps: {
    title: "Lo pensamos, lo rodamos y lo montamos el mismo equipo.",
    items: [
      { k: "Antes", d: "Entendemos qué hay que contar, a quién y dónde se va a ver, antes de decidir cómo grabarlo." },
      { k: "Durante", d: "Rodamos con un plan pactado: qué momentos importan, qué personas deben aparecer y qué formatos hacen falta." },
      { k: "Después", d: "Montaje, color y sonido pensados para cada canal: la pieza principal y todas las que salen de ella." },
    ],
  },
  proof: {
    kicker: "Huhtamaki · 50 aniversario",
    title: "Huhtamaki cumplía cincuenta años.",
    line: "Un día entero, contado en un minuto y medio.", // NEW (film duration 1:33)
    film: "Ver la película",
    more: "Ver más trabajo",
    fromOne: "De un mismo rodaje pueden salir",
    outputs: ["La película del evento", "Cortes verticales para redes", "Una selección de fotografía", "Piezas cortas para comunicación interna o prensa"],
  },
  trust: { title: "Han contado su momento con nosotros." }, // NEW
  buy: {
    title: "¿Tienes algo que contar?",
    lead: "Cuéntanos qué es, cuándo es y para quién. Te responde una persona del equipo.",
    stepsTitle: "Cómo empezamos", // NEW
    steps: ["Nos cuentas qué es y cuándo.", "Te proponemos cómo contarlo.", "Lo rodamos y lo montamos."], // NEW
    cta: "Cuéntanos tu proyecto",
    packs: "¿Algo recurrente? Ver los packs",
    or: "O escríbenos a",
  },
};

type Story = typeof es;

const en: Story = {
  chapters: ["The idea", "What we do", "An example", "Trust", "Get started"],
  open: {
    p1: "An event lasts a day.",
    p2: "Then the lights go down.",
    p3a: "An event ends.",
    p3b: "The content lives on.",
    scroll: "Scroll",
    offer: "Film and photography for corporate events, brand content and campaigns · Valencia",
    alt: "Huhtamaki’s 50th anniversary celebration",
  },
  idea: {
    title: "The story of it lasts all year.",
    body: "An anniversary, a gala, a conference: moments an organisation prepares for months and that last a few hours. Our job is to make sure they can keep being told afterwards.",
    uses: ["On the website", "On social media", "In internal comms", "In the next presentation"],
  },
  steps: {
    title: "Conceived, filmed and edited by the same team.",
    items: [
      { k: "Before", d: "We work out what needs telling, to whom and where it will be seen, before deciding how to film it." },
      { k: "During", d: "We shoot to an agreed plan: which moments matter, who needs to appear and which formats are needed." },
      { k: "After", d: "Edit, colour and sound designed for each channel: the main piece and everything that comes out of it." },
    ],
  },
  proof: {
    kicker: "Huhtamaki · 50th anniversary",
    title: "Huhtamaki was turning fifty.",
    line: "A whole day, told in a minute and a half.",
    film: "Watch the film",
    more: "See more work",
    fromOne: "One shoot can produce",
    outputs: ["The event film", "Vertical cuts for social media", "A photo selection", "Short pieces for internal comms or press"],
  },
  trust: { title: "They told their moment with us." },
  buy: {
    title: "Got something to tell?",
    lead: "Tell us what it is, when it is and who it’s for. A person from the team will reply.",
    stepsTitle: "How we start",
    steps: ["You tell us what it is and when.", "We propose how to tell it.", "We film it and edit it."],
    cta: "Tell us about your project",
    packs: "Something recurring? See the packs",
    or: "Or write to",
  },
};

export const story = (locale: Locale): Story => (locale === "en" ? en : es);
