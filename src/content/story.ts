import type { Locale } from "@/lib/i18n";

/**
 * Home V3: the client's brand is the protagonist; events are one line among four.
 * Source: docs/HOME-NARRATIVA-V3.md (working version, may still change).
 * No figures, results or promises. Client internal documents are never quoted;
 * the method is described generically.
 */
const es = {
  chapters: ["El problema", "El método", "Lo que hacemos", "Un ejemplo", "Quién", "Confianza", "Empezar"],
  open: {
    p1: "Tu marca ya tiene algo que contar.",
    p2: "Casi nunca falta qué decir. Falta saber cómo y dónde.",
    p3a: "Lo pensamos. Lo grabamos.",
    p3b: "Lo hacemos funcionar.",
    descriptor: "Estudio de contenido y marketing audiovisual en Valencia. Estrategia, producción y redes con el mismo equipo.",
    scroll: "Desliza",
    offer: "Estrategia, contenido para redes y producción audiovisual para marcas, negocios y personas · Valencia",
    alt: "Detalle dorado del interior de Oceans Social Club, en Valencia",
  },
  problem: {
    title: "Subir contenido es fácil. Que sirva para algo, no tanto.",
    body: "Muchas marcas publican por obligación: una foto aquí, un vídeo cuando hay tiempo, sin saber qué funciona ni por qué. El resultado se parece a todos los demás y no lleva a nadie a tu puerta.",
    list: ["Sin plan", "Sin criterio visual", "Sin saber qué funciona", "Sin tiempo"],
  },
  method: {
    title: "Te guiamos de principio a fin.",
    items: [
      { k: "Pensar", d: "Entendemos tu marca, a quién le hablas y qué quieres conseguir. Con eso definimos la estrategia: de qué hablar, en qué formatos y con qué calendario." },
      { k: "Preparar", d: "Cada pieza tiene su guion antes de grabar: qué planos, en qué orden y para qué. Llegamos al rodaje sabiendo lo que hay que conseguir." },
      { k: "Grabar", d: "Rodamos y fotografiamos con un plan, y salimos con material para semanas, no para un post." },
      { k: "Medir", d: "Cada mes revisamos qué ha funcionado, por qué creemos que ha funcionado y qué cambiamos. Los datos, lo que significan y la siguiente decisión." },
    ],
    art: {
      example: "Ejemplo",
      days: ["L", "M", "X", "J", "V", "S", "D"],
      formats: ["Reel", "Carrusel", "Stories", "Post"],
      shots: [
        ["01", "Detalle", "0,6 s"],
        ["02", "Manos en acción", "0,7 s"],
        ["03", "Espacio", "1,2 s"],
        ["04", "Plano final", "1,5 s"],
      ],
      shotHead: ["Plano", "Qué grabar", "Montaje"],
      report: ["Dato", "Lectura", "Decisión"],
      shootAlt: "Sesión de contenido para la clínica Physem VLC",
      calendarAlt: "Ejemplo genérico de calendario mensual de contenido por formatos",
      shotsAlt: "Ejemplo genérico de guion de una pieza, plano a plano",
      reportAlt: "Ejemplo genérico de informe mensual: dato, lectura y decisión",
    },
  },
  lines: {
    title: "Una marca, muchas formas de contarla.",
    items: [
      { key: "brand", name: "Marcas y redes", d: "Estrategia y contenido mensual para que tu marca se vea, se entienda y se recuerde.", client: "Oceans Social Club · Physem VLC", alt: "Rótulo dorado de Oceans Social Club sobre una pared oscura" },
      { key: "business", name: "Negocios", d: "Vídeo y foto que explican lo que vendes: espacios, productos, servicios.", client: "Aurum Capital Properties", alt: "Vista aérea de una casa de campo valenciana para Aurum Capital Properties" },
      { key: "personal", name: "Personas y documental", d: "Historias reales contadas con calma: deportistas, profesionales, proyectos personales.", client: "Alex Navarro · This is my story", alt: "Alex Navarro camina con su bolsa de golf por un pasillo de taquillas" },
      { key: "events", name: "Eventos", d: "El día se acaba; el contenido sigue trabajando para ti.", client: "Huhtamaki · 50 aniversario", alt: "Foto de grupo del 50 aniversario de Huhtamaki frente a la planta" },
    ],
  },
  example: {
    kicker: "Oceans Social Club · Valencia",
    title: "Un sitio nuevo necesitaba que Valencia supiera que existía.",
    body: "Acompañamos a Oceans desde antes de abrir: qué contar, cómo contarlo y con qué imagen. Primero, la expectativa; después, la vida que pasa dentro.",
    whatTitle: "Qué hacemos con ellos",
    what: ["Estrategia mensual", "Guiones por pieza", "Sesiones de contenido", "Reels, carruseles y stories", "Informe mensual"],
    cta: "Verlo en su Instagram",
    alts: ["Interior de Oceans Social Club: busto dorado iluminado", "Estantería con objetos dorados en Oceans Social Club", "Detalle de un sofá capitoné en Oceans Social Club"],
  },
  who: {
    kicker: "Quién hay detrás",
    quote: "Hago que el que no cree en las redes sociales y en la creación de contenido no pueda vivir sin ellas.",
    name: "Javier Renovell",
    role: "Fundador de 24SHOOTS",
    body: "24SHOOTS nace en Valencia para que las marcas dejen de publicar por publicar. Detrás de cada pieza hay una persona que entiende tu negocio y responde cuando escribes.",
    cta: "Conoce el estudio",
  },
  trust: { title: "Marcas que ya cuentan con nosotros." },
  buy: {
    title: "¿Empezamos?",
    lead: "Cuéntanos qué haces y qué necesitas. Te responde una persona del equipo, no un formulario automático.",
    packsTitle: "Para marcas que quieren contenido cada mes",
    packs: [
      { slug: "completo", name: "Completo", d: "Estrategia, contenido, rodaje y gestión de redes." },
      { slug: "audiovisual", name: "Audiovisual", d: "Grabación y edición para tu equipo o agencia." },
      { slug: "community", name: "Community", d: "Tus redes gestionadas con el mismo criterio." },
    ],
    packsLink: "Ver los packs",
    cta: "Cuéntanos tu proyecto",
    oneOff: "¿Algo puntual: un evento, un vídeo, un rodaje? Escríbenos igual.",
    or: "O escríbenos a",
  },
};

type Story = typeof es;

const en: Story = {
  chapters: ["The problem", "The method", "What we do", "An example", "Who", "Trust", "Get started"],
  open: {
    p1: "Your brand already has something to say.",
    p2: "It rarely lacks something to say. It lacks knowing how, and where.",
    p3a: "We think it. We shoot it.",
    p3b: "We make it work.",
    descriptor: "Content and audiovisual marketing studio in Valencia. Strategy, production and social, by the same team.",
    scroll: "Scroll",
    offer: "Strategy, social content and audiovisual production for brands, businesses and people · Valencia",
    alt: "Gold detail inside Oceans Social Club, Valencia",
  },
  problem: {
    title: "Posting is easy. Making it count is not.",
    body: "Many brands post out of obligation: a photo here, a video when there’s time, without knowing what works or why. It ends up looking like everyone else’s and brings no one to your door.",
    list: ["No plan", "No visual direction", "No idea what works", "No time"],
  },
  method: {
    title: "We guide you from start to finish.",
    items: [
      { k: "Think", d: "We get to know your brand, who you’re talking to and what you want to achieve. From that we set the strategy: what to talk about, in which formats and on what calendar." },
      { k: "Prepare", d: "Every piece is scripted before filming: which shots, in what order and why. We arrive at the shoot knowing what we need." },
      { k: "Shoot", d: "We film and photograph to a plan, and leave with material for weeks, not for one post." },
      { k: "Measure", d: "Every month we review what worked, why we think it worked and what we change. The data, what it means and the next decision." },
    ],
    art: {
      example: "Example",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      formats: ["Reel", "Carousel", "Stories", "Post"],
      shots: [
        ["01", "Detail", "0.6 s"],
        ["02", "Hands at work", "0.7 s"],
        ["03", "The space", "1.2 s"],
        ["04", "Closing shot", "1.5 s"],
      ],
      shotHead: ["Shot", "What to film", "Edit"],
      report: ["Data", "Reading", "Decision"],
      shootAlt: "Content session for the Physem VLC clinic",
      calendarAlt: "Generic example of a monthly content calendar by format",
      shotsAlt: "Generic example of a shot-by-shot script for one piece",
      reportAlt: "Generic example of a monthly report: data, reading and decision",
    },
  },
  lines: {
    title: "One brand, many ways to tell it.",
    items: [
      { key: "brand", name: "Brands & social", d: "Monthly strategy and content so your brand is seen, understood and remembered.", client: "Oceans Social Club · Physem VLC", alt: "Gold Oceans Social Club lettering on a dark wall" },
      { key: "business", name: "Businesses", d: "Film and photo that explain what you sell: spaces, products, services.", client: "Aurum Capital Properties", alt: "Aerial view of a Valencian country house for Aurum Capital Properties" },
      { key: "personal", name: "People & documentary", d: "Real stories told with care: athletes, professionals, personal projects.", client: "Alex Navarro · This is my story", alt: "Alex Navarro walks with his golf bag down a locker-room corridor" },
      { key: "events", name: "Events", d: "The day ends; the content keeps working for you.", client: "Huhtamaki · 50th anniversary", alt: "Group photo of Huhtamaki’s 50th anniversary in front of the site" },
    ],
  },
  example: {
    kicker: "Oceans Social Club · Valencia",
    title: "A new place needed Valencia to know it existed.",
    body: "We’ve been with Oceans since before it opened: what to say, how to say it and with which look. First, the anticipation; then, the life inside.",
    whatTitle: "What we do with them",
    what: ["Monthly strategy", "Scripts for every piece", "Content sessions", "Reels, carousels and stories", "Monthly report"],
    cta: "See it on their Instagram",
    alts: ["Inside Oceans Social Club: a lit gold bust", "Shelf with gold objects at Oceans Social Club", "Detail of a tufted sofa at Oceans Social Club"],
  },
  who: {
    kicker: "Who’s behind it",
    quote: "I make people who don’t believe in social media and content creation unable to live without them.",
    name: "Javier Renovell",
    role: "Founder of 24SHOOTS",
    body: "24SHOOTS was born in Valencia so brands stop posting for the sake of it. Behind every piece there’s a person who understands your business and answers when you write.",
    cta: "Meet the studio",
  },
  trust: { title: "Brands that already count on us." },
  buy: {
    title: "Shall we start?",
    lead: "Tell us what you do and what you need. A person from the team will reply, not an automated form.",
    packsTitle: "For brands that want content every month",
    packs: [
      { slug: "completo", name: "Full", d: "Strategy, content, filming and social management." },
      { slug: "audiovisual", name: "Audiovisual", d: "Filming and editing for your team or agency." },
      { slug: "community", name: "Community", d: "Your social channels run with the same judgement." },
    ],
    packsLink: "See the packs",
    cta: "Tell us about your project",
    oneOff: "Something one-off, an event, a video, a shoot? Write to us anyway.",
    or: "Or write to",
  },
};

export const story = (locale: Locale): Story => (locale === "en" ? en : es);

/** Clients shown in the trust list that don't have a case page yet. */
export const newClients = ["Oceans Social Club", "Physem VLC", "Aurum Capital Properties"];
export const oceansInstagram = "https://www.instagram.com/oceans_socialclub/";
