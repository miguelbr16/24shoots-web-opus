# 24SHOOTS V2 — Auditoría + Master Plan

Fase 1. Todavía no hay cambios en el código de la web. Este documento recoge lo que he encontrado, lo que decido y lo que falta para construir.

Evidencia visual en [`docs/v2-audit/`](v2-audit/): hojas de contacto de cada vídeo (12 fotogramas por pieza) y capturas de la home actual en desktop y mobile.

---

## 0. Alcance real de esta auditoría

| Fuente | Estado |
|---|---|
| Repositorio (código, contenido, assets, historial) | Auditado a fondo. Build de producción local y capturas con Playwright a 1440 px y 390 px. |
| Vídeos e imágenes | Auditados fotograma a fotograma (6 películas y 11 reels). Así he identificado a los clientes reales. |
| `24shoots-web.vercel.app`, preview de Vercel, Lovable, oceanssocialclub.com | **No accesibles.** La política de red de este entorno cloud bloquea esos dominios. |

Para suplir la web publicada he levantado el mismo código en local (`next build && next start`); lo que ve un visitante debería coincidir. **Todavía no he podido estudiar el prototipo de Lovable ni Ocean's Social Club** y no voy a inventarme su contenido. Las decisiones de este plan se sostienen sin ellos. Cuando estén accesibles, los estudio y ajusto el Hero y el motion si aportan algo (§26).

---

## 1. Diagnosis

### 1.1 La conclusión más importante

**24SHOOTS tiene más prueba real de la que muestra la web, y la web muestra más prueba falsa de la que puede sostener.**

Al revisar los vídeos fotograma a fotograma aparecen clientes corporativos e institucionales de verdad:

| Archivo | Lo que dice la web | Lo que muestra el vídeo |
|---|---|---|
| `version-entrega-cliente-hutamaki-web.mp4` | "Aftermovie **Hutamaki**" | **Huhtamaki** (mal escrito en toda la web). Evento de su **50 aniversario (1976–2026)** en su planta: dron, discursos, brindis, comida, concierto, foto de grupo. |
| `aftemovie-imperia-mas-events-...mp4` | "Imperia Más Events", sin más contexto | Congreso corporativo **Imperia SCM** ("The New Era of Supply Chain — Renaissance"). El montaje del evento lo hace el equipo de **MAS Events** (sale en las camisetas). El póster actual es un render 3D, no un fotograma rodado. |
| `v3-premios-isabel-ferrer-web.mp4` | "Premios Isabel Ferrer" | **XXVIII Premios Isabel Ferrer** (8 de marzo), con identidad de la **Generalitat Valenciana**, en un claustro histórico. |
| `aftermovi-pivc-version-final-web.mp4` | "PIVC — Aftermovie" | **Premios de Innovación · València Innovation Capital**, del **Ajuntament de València**. También con equipo técnico de MAS Events. |
| `aftermovie-oicial-version-final-web.mp4` | "Aftermovie oficial", presentado como pieza propia de showreel y usado como vídeo del Hero | Pieza de **Sol y Luna Events**: montaje técnico y una fiesta privada, que parece una boda. **No es un showreel de 24SHOOTS.** |
| `version-cliente-web.mp4` | "Proyecto cliente · Cliente privado" | **Ajuntament de Manises: XXIV Gala de l'Esport.** Es un cliente institucional con nombre, no un "cliente privado". |

Reels de Instagram (`public/imagenes_insta/`): fiestas con marca **Vera Producciones** y **Sol y Luna Events**, vídeos inmobiliarios de **Aurum Capital** con presentador, perfil de un golfista (**Alex Navarro**) y un corte vertical de Huhtamaki.

Consecuencias:

1. **El pilar "Eventos corporativos" tiene prueba excelente**: una multinacional, la Generalitat, dos ayuntamientos y un congreso B2B.
2. **"Contenido de marca" tiene prueba parcial**: inmobiliaria y deportista, en vertical.
3. **"Campañas" no tiene ninguna prueba** en el repositorio.
4. Varias piezas se hicieron **para agencias y productoras de eventos** (MAS Events, Sol y Luna, Vera Producciones). Eso apunta a un segmento de cliente que nadie ha nombrado: **las agencias que subcontratan la producción audiovisual**. También abre una pregunta de derechos: ¿se puede nombrar al cliente final? (§26).

### 1.2 Contenido inventado o engañoso en la web actual (hay que eliminarlo)

- **12 de los 18 proyectos del portfolio son ficticios**: "María & Carlos", "Restaurante La Marina", "Empresa industrial", "Artista independiente", "Comisión fallera", "Promotora", "Marca retail"… Reutilizan vídeos de otros proyectos (la "Boda en Valencia" es el vídeo de Sol y Luna, el "Documental corporativo" es Isabel Ferrer) y se atribuyen **resultados inventados**: "más reservas atribuidas al contenido", "mejora del CTR", "más consultas en tres meses", "viralidad orgánica".
- **Reseñas inventadas** (María y Carlos, Restaurante La Marina, "Equipo de marketing") y un testimonio anónimo.
- **"+30 clientes eligen…"** sin respaldo.
- **Rueda de clientes** con logotipos de relleno (monogramas "CORP", "EVT", "GAST"…) y nombres institucionales puestos a mano.
- **Stats vacías o contradictorias**: "7 líneas de servicio" cuando la web lista 10, y "Respuesta 24h".
- **"Impacto medible… reservas, ventas"**: no hay ninguna métrica que lo respalde.
- El Instagram "Detrás del objetivo" enlaza todas las piezas al perfil, no a publicaciones, y en realidad reproduce los mismos 6 vídeos.

### 1.3 Contradicciones de datos

- **Email**: toda la web, los textos legales y la documentación usan `hola@24shootsmedia.com`. El email oficial es **`info@24shoots.es`**, que además sugiere que el dominio es `24shoots.es`, no `24shootsmedia.com` ni `vercel.app`.
- **Nombre**: conviven "24Shoots", "24SHOOTS", "24Shoots Media" y "@24shootsmedia". Para las señales de entidad (SEO/GEO) hay que fijar una sola forma.
- **Legal**: razón social y dirección siguen como `[PENDIENTE]`. El "CIF" `26761401G` tiene formato de NIF de persona física, así que hay que confirmar la titularidad.
- **Logo**: `public/logo.svg` no es el logo. Es un texto en Inter dibujado a mano. El único logo real es un JPG de 150×150 px. **Falta el logo vectorial.**
- **Claim**: "Domina el impacto" (logo y H1) es un eslogan genérico que choca con el posicionamiento de estudio creativo.

### 1.4 Producto / UX

- **La home mide 9.300 px y tiene 14 bloques**: hero, marquee, diferenciador, líneas de producción, servicios, proceso, por qué, Instagram, stats, rueda, reseñas, FAQ, CTA y footer. Es un funnel de plantilla. Nada domina y la prueba real queda enterrada.
- **Posicionamiento diluido**: "De la boda al negocio", 10 líneas al mismo nivel (bodas, Fallas, fiestas, videoclips, dron, community…) y packs de community management. Transmite "hacemos de todo", lo contrario de un estudio con criterio.
- **Rutas duplicadas**: `/es/services` y `/es/servicios`, `/es/contact` y `/es/contacto`, `/es/about` y `/es/sobre-nosotros`… **Los dos juegos de rutas existen en los dos idiomas.** Es contenido duplicado y los `hreflang` apuntan a URLs cruzadas (por ejemplo, `/en/sobre-nosotros`).
- **Navegación**: 6 enlaces, EN y "Presupuesto", más un botón flotante de WhatsApp y un banner de cookies que **tapa cerca del 30 % de la pantalla en mobile** hasta que el usuario decide.

### 1.5 Hero actual (ScrollHero)

- **La primera pantalla está vacía**: fondo negro con "Scroll". El H1 y el póster tienen `opacity: 0` hasta que el usuario hace scroll. Es malo para comprender la página, para el LCP (el elemento LCP es invisible) y para la accesibilidad.
- Hace *scrubbing* de un MP4 de 32 MB fijando `currentTime` en cada frame. Con H.264 de GOP largo eso da saltos en Safari y en Android de gama media, y descarga el vídeo entero.
- `setState` en cada frame de scroll vuelve a renderizar todo el hero. Hay 240vh de scroll secuestrado *de facto* para montar letra a letra un logo que no es el logo.
- Blobs naranjas con `blur(120px)`, grano y glow en los botones: justo la estética que el brief quiere evitar.
- Usa como vídeo principal una pieza de otro productor (Sol y Luna).

### 1.6 Formulario

**Es una implementación falsa.** `src/app/api/contact/route.ts` hace `console.log` y devuelve `{ ok: true }`. Ninguna solicitud llega a nadie. Además:

- no valida en servidor (acepta cualquier JSON) y no tiene protección antispam;
- tiene 9 campos (nombre, email, teléfono, servicio, pack, sector, fecha, presupuesto y mensaje) y un checkbox obligatorio;
- los rangos de presupuesto empiezan en "Menos de 500 €", lo que posiciona a la baja justo al comprador B2B que se busca;
- los `<label>` no están asociados a sus inputs (`htmlFor`/`id`), el error no se anuncia (`aria-live`) y el botón de carga muestra "...".

### 1.7 SEO técnico

- `metadataBase`, canonical y sitemap apuntan a `24shoots-web.vercel.app`, no al dominio.
- El `<html lang="es">` está fijo en el layout raíz, así que **las páginas en inglés se declaran en español**.
- No hay `x-default`. Hay rutas duplicadas con canonical propio y la redirección `/` → `/es` pasa por middleware en cada visita.
- **No hay `og:image`**, así que al compartir por WhatsApp o LinkedIn sale sin imagen.
- El JSON-LD es un `LocalBusiness` genérico, sin dirección completa, teléfono, email ni geo, y con un `priceRange` inventado. Faltan `VideoObject`, `Service` y `BreadcrumbList`.
- Todas las páginas se renderizan en servidor bajo demanda (`ƒ Dynamic`). Deberían ser estáticas.
- Los proyectos no tienen URL propia: solo existen dentro de un modal, así que no se indexan.

### 1.8 Performance

- **342 MB de vídeo en el repositorio y en el historial de git.** Son 6 películas de 16 a 38 MB y 11 reels de 2,5 a 32 MB, servidos como MP4 progresivos a 1080p desde Vercel. La home llega a declarar 7 `<video>`.
- Los pósters son JPG de 1920×1080 entre 140 y 380 KB. Pasan por `next/image`, pero como el LCP es invisible no se aprovecha.
- JS: 122 kB de First Load en la home. No es grave, pero muchos componentes cliente (Header, rueda, carrusel, acordeón, hub mobile, modal) resuelven cosas que no deberían estar en la home.
- Hay animaciones infinitas: dos marquees, la rueda de clientes, `glow-drift` y `ken-burns`.

### 1.9 Código / repositorio

- Next.js 15.5 + React 19 + Tailwind 4 + TypeScript. La base técnica es sana y **el build compila sin errores**.
- Contenido en JSON sin tipado fuerte. `pages.json` es un monolito con todos los textos de todas las páginas.
- El repositorio mezcla la web con documentos personales y de negocio del desarrollador (`DEV-BUSINESS-PLAYBOOK/`, cuestionarios, `.bat`, `.ps1`, `backups/`, una imagen de Instagram suelta en la raíz). **Si el repositorio es público, eso está expuesto.**
- El README vende el proyecto como "plantilla reutilizable para futuras webs de clientes" (`new-site.mjs`). Ese objetivo, legítimo para el desarrollador, empuja hacia un diseño genérico. **V2 debe ser una web de autor para 24SHOOTS, no una plantilla.**

### 1.10 Qué funciona y conservo

- La **paleta de base** (negro cálido, crema y naranja), bien entendida.
- La intuición de los **metadatos de rodaje** (formato, localización, timecode) como lenguaje propio. Es la mejor idea visual del repositorio, aunque ahora esté mal ejecutada.
- El **material real**: las 6 películas y parte de los reels.
- El stack Next.js + TypeScript + Tailwind, el i18n ES/EN y la gestión de consentimiento (que simplificaré).
- La intención de los textos legales, que hay que completar con datos reales.

---

## 2. Posicionamiento estratégico

**Decisión: mantengo "Estudio creativo de contenido y comunicación visual para marcas", pero cambio el orden de los pilares y el argumento central.**

La hipótesis del brief presenta tres pilares iguales: Brand Content, Campañas y Eventos corporativos. La evidencia dice otra cosa: **el trabajo real y demostrable son eventos de marca e institucionales**, y los más fuertes ya son, de hecho, comunicación de marca. El vídeo del 50 aniversario de Huhtamaki no es "cobertura de un evento": es una pieza de marca empleadora y de comunicación corporativa.

Por eso, el argumento central es:

> **Un evento dura un día. Lo que se cuenta de él, todo el año.**
> 24SHOOTS convierte los momentos de una marca en comunicación: películas, piezas para redes, fotografía, antes, durante y después.

Esto une prueba y posicionamiento en lugar de enfrentarlos:

1. **Eventos y momentos de marca.** Es el pilar de entrada, con prueba fuerte. Encaja con un comprador que tiene un problema concreto y una fecha en el calendario.
2. **Contenido de marca.** Es el pilar de continuidad: rodajes de contenido, piezas para web y redes, perfiles, producto y espacio. Hay prueba parcial y hay que reforzarla con 1 o 2 casos documentados.
3. **Campañas.** Es el pilar de ambición. **No se presenta como probado.** Aparece en la arquitectura con un lenguaje honesto (qué hacemos y cómo), sin casos inventados. En cuanto exista un caso real, pasa a igualdad.

La ambición de estudio creativo se construye con **criterio visible** (selección, dirección, texto preciso y cómo se presenta cada caso), no con claims.

**Claim**: retiro "Domina el impacto" de todo lo editorial. Puede seguir en el logo mientras exista, pero no en el H1. Hipótesis de trabajo para el H1 (a validar con 24SHOOTS):

- ES: **"Imagen con idea."** Subtítulo: *Estudio creativo de contenido y comunicación visual para marcas. Eventos, contenido y campañas. Valencia.*
- EN: **"Images with an idea."**

Es corto, se puede defender y resume IDEA + CRITERIO sin prometer resultados.

---

## 3. Audiencia

| Segmento | Qué necesita saber rápido | Prueba que lo convence |
|---|---|---|
| **Comunicación / marketing corporativo** (ej.: Huhtamaki) | Que no les van a dar "un vídeo del evento", sino material para comunicar durante meses. | Caso Huhtamaki y lista de entregables. |
| **Instituciones públicas** (GVA, ayuntamientos) | Fiabilidad, protocolo, entregas a tiempo y respeto por la imagen institucional. | Isabel Ferrer, Innovación València, Manises. |
| **Agencias y productoras de eventos** (MAS Events, Sol y Luna, Vera) | Un equipo audiovisual en el que confiar para trabajar en *white label* o como partner. | Los mismos casos, más una línea explícita: "trabajamos también para agencias". |
| **Brand managers de pymes y marcas regionales** | Contenido continuo con estándar alto. | Contenido de marca (hay que reforzar la prueba). |

El segmento de agencias no estaba en el brief. Lo añado porque la evidencia muestra que ya es una fuente de negocio. Se resuelve con una frase en el Estudio y en Contacto, sin página propia.

---

## 4. Dirección de marca

- **Tono**: preciso, de oficio, en primera persona del plural y sin superlativos. Frases cortas. Nada de "soluciones", "impacto", "360" ni "llevamos tu marca al siguiente nivel". Se habla como habla un director de fotografía con un cliente: qué, dónde, con qué, para qué.
- **Personalidad**: *el que mira*. 24SHOOTS está en la sala antes que nadie, ve lo que otros no ven y lo ordena en un montaje.
- **Nombre**: propongo **24SHOOTS** en mayúsculas como marca, "24SHOOTS Media" solo como nombre legal o de redes si procede. Hay que confirmarlo (§26).

## 5. Dirección de arte

**Concepto: "La sala de montaje".** La web se comporta como una mesa de edición: material real, cortes con decisión y metadatos como tipografía. No es "cinematic" de plantilla (grano, lens flares, letterbox); es el lenguaje de oficio del montaje.

- **Imagen primero, y solo imagen real.** Nada de stock, renders ni fondos abstractos. Los fotogramas se extraen de los masters (§22).
- **Corte frente a exposición.** Dos únicos gestos de movimiento con significado: *corte* (cambio seco, 0 ms, como en montaje) y *exposición* (la imagen sube de negro a su luz en unos 900 ms, como al revelar). Es lo que conservo de *Aperture Reveal*: la luz, no el iris.
- **Metadatos como identidad.** Cada imagen lleva su pie de montaje en mono: `03 · HUHTAMAKI · 50 ANIVERSARIO · EVENTO CORPORATIVO · 2026`. Solo con datos reales y verificados.
- **Día y noche.** El negro cálido (#0E0D0C) es la sala; el crema (#EEE8DF) es el papel, la parte editorial (Estudio, textos largos). La web alterna ambos con intención, no por decoración.
- **El naranja es la luz de REC.** Solo marca estado: el elemento activo, el punto de "grabando" en el timecode, el foco, el subrayado del enlace en hover y el CTA principal. Nunca aparece como fondo de sección ni como gradiente. Sobre crema, el naranja de texto se oscurece (#A94F12) para cumplir contraste AA.
- **Tipografía**:
  - Display y texto: **Archivo** (variable, eje de anchura 62–125). En versión condensada y en mayúsculas funciona como los créditos de una película; en anchura normal, como texto de lectura. Una sola familia, con el carácter en el eje de anchura. Libre (OFL), servida en local con `next/font`.
  - Metadatos: **IBM Plex Mono**, solo en pesos 400 y 500.
  - Si hay presupuesto para licencia, se valora una grotesk con más autoría (§26). La decisión por defecto es Archivo + Plex Mono.
- **Composición**: grid de 12 columnas con asimetría deliberada. Las imágenes pueden romper el grid a sangre. Márgenes grandes. **Sin tarjetas redondeadas, sombras ni glass.** `border-radius: 0` en todo, y las separaciones son reglas de 1 px.
- **Imperfección controlada**: los pies de foto van alineados a la imagen, no al grid; hay números de plano; algún texto en vertical en el borde de un fotograma, como en una claqueta. Siempre con función de orientación.

## 6. Arquitectura de información

Castellano en la raíz (sin `/es`) e inglés bajo `/en`. Como el dominio cambia de todos modos, es el momento de simplificar las URLs y quitar la redirección de middleware en cada visita.

```
/                                   Home
/trabajo                            Índice de trabajo (5–8 casos)
/trabajo/[caso]                     Caso (URL propia, indexable)
/servicios/eventos-corporativos     Área 1
/servicios/contenido-de-marca       Área 2
/servicios/campanas                 Área 3
/estudio                            Quiénes, cómo, con quién
/contacto                           Formulario + email + teléfono/WhatsApp
/aviso-legal  /privacidad  /cookies

/en, /en/work, /en/work/[case], /en/services/{corporate-events|brand-content|campaigns}, /en/studio, /en/contact, …
```

- **Se eliminan**: `/packs`, las 10 fichas de servicio actuales y las rutas duplicadas. Todas las URLs antiguas redirigen con **301** a su equivalente (`next.config` → `redirects`).
- **Bodas, Fallas y fiestas no se construyen en el lanzamiento** (§11).
- La navegación principal tiene 4 destinos: **Trabajo · Servicios · Estudio · Contacto**.

## 7. Narrativa de la home

El recorrido "entender → sentir → ver prueba → comprender → confiar → actuar" es correcto. En la home actual, "ver prueba" llega en el paso 8. En V2 la prueba **es** el Hero: se entiende y se ve prueba a la vez.

| # | Sección | Función | Contenido |
|---|---|---|---|
| 1 | **Hero: "El corte"** | Entender, sentir y ver prueba | H1 y subtítulo visibles desde el primer render, con 4–5 planos reales en corte (§8). |
| 2 | **Trabajo seleccionado** | Prueba | 4–5 casos en filas editoriales a sangre alterna, con título, cliente, tipo, año y un loop silencioso cuando la fila está en pantalla. Enlace a cada caso. |
| 3 | **"Un día, todo el año"** | Comprender la propuesta | Un caso real desglosado en sus entregables: una película, cortes verticales, fotografía y piezas para prensa o interna, en una fila de fotogramas reales. Sustituye al "proceso en 4 pasos" genérico. **Necesita confirmar con 24SHOOTS qué se entregó de verdad.** |
| 4 | **Qué hacemos** | Comprender la oferta | Las 3 áreas como índice tipográfico grande, no tarjetas. Cada una con una línea de problema y enlace a su página. Las capacidades (rodaje, dron, foto, edición, color, sonido, piezas sociales) van en una línea de metadatos, no en iconos. |
| 5 | **Con quién** | Confiar | Lista tipográfica de clientes reales (Huhtamaki, Generalitat Valenciana, Ajuntament de València, Ajuntament de Manises, Imperia SCM, MAS Events, Sol y Luna Events), **solo con permiso**, sin logos y sin rueda. Debajo, 1–2 testimonios **reales** con nombre y cargo si se consiguen; si no, no hay sección de testimonios. |
| 6 | **Contacto** | Actuar | Frase y formulario corto directamente en la home. El footer incluye email, teléfono, Instagram, LinkedIn si existe y Valencia. |

Resultado: **6 bloques en lugar de 14** y una home de aproximadamente la mitad de largo, sin perder información: cada caso, servicio y respuesta frecuente tiene su página indexable.

**Se eliminan de la home**: marquees, diferenciador "en vez de / con", líneas de producción, acordeón de servicios, hub mobile con pestañas, "Por qué 24Shoots", Instagram, stats, rueda, reseñas, FAQ, antes/después y packs. Motivo: o no son verdad, o repiten lo que ya dice otra sección, o son relleno de plantilla.

## 8. Concepto de Hero: "El corte"

**Evaluación de *Aperture Reveal*.** La intuición (luz, revelación, imagen) es buena. La ejecución como iris y secuencia bloqueada por scroll, no:

1. retrasa la comprensión: la marca y la propuesta llegan al final de una secuencia;
2. el iris de cámara es el cliché visual más gastado del sector;
3. si depende del scroll, penaliza el LCP y el uso en mobile; si depende del tiempo, es una intro que el usuario espera sin poder saltar;
4. "revela" **una** imagen, cuando lo que diferencia a 24SHOOTS es **el montaje de muchas**.

**Decisión: la evoluciono en "El corte".**

- **t = 0 ms (HTML de servidor)**: fondo negro. H1 "Imagen con idea.", subtítulo y dos CTA ya presentes y legibles. A la derecha, o a sangre detrás en mobile, el primer fotograma real como AVIF `priority`. **El LCP es imagen o texto real desde el primer paint.**
- **0–900 ms, exposición**: el fotograma sube de negro a su exposición correcta (`filter: brightness()` y `opacity`, solo en compositor). Es el único guiño a *Aperture*: la imagen se revela como en el laboratorio. El texto no se anima; ya está ahí.
- **Después, cortes**: cuando el primer loop está listo (cargado después del LCP), el hero reproduce 4–5 planos de unos 2,5 s de proyectos distintos, con **cortes secos**. Cada corte actualiza el pie de montaje en mono: `01/05 · HUHTAMAKI · 50 ANIVERSARIO` y un timecode que avanza, con un punto naranja de REC.
- **Interacción**: el pie de montaje es un enlace al caso. Los controles pausa/reproducir son accesibles (WCAG 2.2.2). Al hacer scroll no pasa nada especial: la página sigue con normalidad.
- **Mobile**: el vídeo va a sangre en formato 4:5 con recortes verticales propios, no en 16:9 centrado; el H1 se superpone abajo sobre un degradado de legibilidad de solo 30 %. Si el dispositivo está en ahorro de datos o de batería (y el autoplay falla), se queda el fotograma con el pie de montaje. Es un estado diseñado, no un error.
- **`prefers-reduced-motion`**: no hay exposición ni cortes automáticos. Se muestra un fotograma fijo y los 5 pies de montaje como índice clicable.
- **Peso**: un único archivo de vídeo de loop de unos 12 s (los 5 planos concatenados, sin audio, 1280 px, AV1 + H.264 de respaldo, GOP corto) de **≤1,5 MB**, más un póster AVIF de ≤90 KB. Nada de *scrubbing*.

Es memorable porque es **el oficio de 24SHOOTS (montar) hecho interfaz**, no por el efecto.

## 9. Navegación

- **Desktop**: barra superior fina y transparente sobre el hero, que se vuelve sólida (negro 92 % con regla inferior de 1 px) tras el primer viewport. A la izquierda, el logo 24SHOOTS (SVG real). En el centro, `Trabajo · Servicios · Estudio`. A la derecha, `ES/EN` y **"Cuéntanos tu proyecto"** como enlace subrayado en naranja, no como botón píldora. La página actual se marca con el punto REC naranja delante del enlace.
- **Mobile**: logo y un botón de texto **"Menú"**, sin hamburguesa de tres rayas. El overlay a pantalla completa lleva los enlaces grandes en Archivo condensado, email y teléfono visibles y el último caso como miniatura. El foco queda atrapado mientras el menú está abierto y se cierra con Esc.
- Se eliminan el **botón flotante de WhatsApp** (WhatsApp se ofrece como canal en Contacto y en el menú) y el **CTA "Presupuesto"** de la barra.
- Hay un *skip link* a contenido.

## 10. Portfolio

**Decisión: 5 casos en el lanzamiento, con URL propia. Nada más.**

| Orden | Caso | Por qué |
|---|---|---|
| 1 | **Huhtamaki · 50 aniversario** | Multinacional, variedad de planos (dron, discursos, grupo, concierto) y el mejor ejemplo de "un día → comunicación". |
| 2 | **Premios Isabel Ferrer · Generalitat Valenciana** | Institucional, localización patrimonial y la mejor fotografía del corpus. |
| 3 | **Premios de Innovación · Ajuntament de València** | Escenario LED y gala. Muestra la capacidad técnica en entornos oscuros. |
| 4 | **Imperia SCM · congreso** | Evento B2B de empresa tecnológica, cercano al ICP. |
| 5 | **Ajuntament de Manises · Gala de l'Esport** | Exterior al atardecer y cercanía institucional. |

- **Sol y Luna Events** queda **fuera del portfolio principal** hasta aclarar el rol de 24SHOOTS y los derechos. Si se confirma, entra como caso de "producción para agencias".
- **Aurum Capital y Alex Navarro**: candidatos a los primeros casos de **Contenido de marca** si hay permiso y masters.
- **Plantilla de caso**:
  1. Película a pantalla completa (reproducción con sonido al hacer clic; streaming HLS).
  2. Una línea de contexto: qué era el momento.
  3. Qué hizo 24SHOOTS: rodaje, dron, edición, color, sonido.
  4. Entregables reales.
  5. Ficha: cliente, fecha, lugar, formato y créditos.
  6. 6–9 fotogramas.
  7. Siguiente caso.
- **Nunca** "reto / enfoque / resultado" con resultados inventados. Si el cliente da un dato real con permiso ("usado en la convención interna de 2026"), entra citado.
- **Índice `/trabajo`**: lista editorial con filtro simple por área (3 valores). Sin chips de 10 categorías.

## 11. Servicios

**Tres páginas de área**, con la misma estructura:

1. **Problema**: una frase ("Un evento importante acaba cuando se apagan las luces. Su comunicación no debería.").
2. **Enfoque**: cómo lo aborda 24SHOOTS (preproducción con el equipo de comunicación, plan de planos, equipo, entregas escalonadas).
3. **Capacidades**: lista en mono (multicámara, dron, foto, sonido, edición, color, versiones sociales, subtitulado…).
4. **Entregables típicos**: lista concreta, sin precios.
5. **Casos relacionados**: solo reales.
6. **Preguntas frecuentes** (3–5, respondidas con claridad; sirven para AEO).
7. CTA.

**Bodas, Fallas, fiestas, videoclips, dron, community management y packs.** Decisión:

- **Dron, foto y edición** son **capacidades**, no servicios. Viven dentro de las áreas.
- **Community management y packs**: fuera. Contradicen "estudio creativo" y no hay prueba. Si es una línea de ingresos importante, se habla aparte (§26).
- **Bodas y fiestas privadas**: fuera de la web principal. Si 24SHOOTS quiere vender bodas, merece **una web o subdominio aparte** con su propio portfolio y tono. Mezclarlo contamina el posicionamiento B2B.
- **Fallas y videoclips**: fuera. No hay ni un asset real.

Así se retira también el contenido SEO de las 10 fichas actuales, que eran textos genéricos sin prueba.

## 12. Estudio / About

Una página, no un bloque de "valores" (Creatividad, Profesionalidad, Impacto se eliminan):

- quién es 24SHOOTS: nombres reales, roles y **foto real del equipo trabajando**;
- desde cuándo y desde dónde (Valencia; trabajo en toda España solo si es cierto);
- cómo trabajan (un solo equipo de rodaje a entrega, trato directo), con prueba y sin superlativos;
- "También producimos para agencias y productoras de eventos";
- lista de clientes (con permiso);
- equipo técnico solo si aporta confianza (p. ej. operadores de dron certificados, si es cierto: **no se afirma sin confirmar**).

**Bloqueante: faltan contenidos y fotos** (§21–22).

## 13. Contacto / CRO

- **CTA principal**: "Cuéntanos tu proyecto". Es lo que el comprador tiene (un proyecto), no lo que teme (un presupuesto). Versión corta en nav y botones pequeños: "Hablemos".
- **CTA secundario**: "Ver trabajo".
- En cada caso: "¿Tienes un momento así? Hablemos" (mejor que el "Quiero algo así" previsto).
- **Formulario (5 campos, 3 obligatorios)**:
  1. Nombre\*
  2. Email\*
  3. Empresa
  4. Tipo, como botones de selección única y opcionales: *Evento · Contenido de marca · Campaña · Otra cosa*
  5. "¿Qué tienes entre manos?"\* (textarea con placeholder de ejemplo: "Aniversario de la empresa en junio, unas 300 personas…")
  - Opcional y plegado: "¿Tienes fecha?". **El presupuesto no se pregunta en el lanzamiento** (§26).
  - Privacidad: texto informativo con enlace bajo el botón (la base legal es la gestión de la solicitud y las medidas precontractuales; no hace falta checkbox si no se usa para marketing, pero **hay que validarlo con su asesoría**).
- **Microcopy**: "Te responde una persona del equipo, normalmente en 1–2 días laborables" (solo si es cierto) y email directo visible: `info@24shoots.es`.
- **Éxito**: la pantalla confirma, repite el email del usuario y enlaza a "Mientras tanto, mira el trabajo". El usuario recibe un email automático breve.

## 14. Sistema de motion

| Token | Valor | Uso |
|---|---|---|
| `cut` | 0 ms | Cambio de plano en el hero y en las miniaturas. |
| `expose` | 900 ms, `cubic-bezier(.2,0,0,1)` | Entrada de una imagen la primera vez que aparece en pantalla. Una vez por imagen, nunca en bucle. |
| `ui` | 180 ms, `ease-out` | Hover, foco, menú, subrayados. |
| `enter` | 480 ms | Aparición de texto de sección: **solo opacidad y 8 px**, nada de deslizamientos grandes. |
| Transición de página | View Transitions (React `<ViewTransition>` o CSS `@view-transition`) | La miniatura de un caso "se convierte" en el hero del caso. Si no hay soporte, navegación normal. |

- **Sin librerías de animación en el lanzamiento**: CSS, IntersectionObserver y View Transitions nativas. GSAP o Motion solo entrarían si una interacción concreta lo justificara, y no hay ninguna prevista.
- **Sin smooth-scroll JS (Lenis), sin scroll hijacking, sin parallax, sin marquees y sin animaciones infinitas**, excepto el loop del hero, que es contenido y se puede pausar.
- `prefers-reduced-motion` desactiva `expose`, `enter`, los cortes automáticos y las view transitions.

## 15. Responsive

Composiciones propias por contexto, no reducciones de la de escritorio:

- **Hero**: en desktop, texto a la izquierda y plano en 16:9 a la derecha y a sangre. En mobile, plano 4:5 a sangre, texto abajo y los CTA al alcance del pulgar.
- **Trabajo**: en desktop, filas alternas con imagen de 7 columnas y texto de 5. En mobile, fotograma 4:5 a sangre y metadatos debajo, con 1 loop activo a la vez (el que está en pantalla).
- **Tipografía fluida** con `clamp()`: H1 de 40 a 120 px, texto de 17 a 19 px y mono de 11 a 12 px con tracking.
- **Casos**: en mobile, el reproductor ocupa todo el ancho y los fotogramas pasan a carrusel horizontal nativo (`scroll-snap`), sin librería.
- **Formulario**: en mobile, un campo por fila, `inputmode` y `autocomplete` correctos y botón a ancho completo.
- **Breakpoints de QA**: 360, 375, 390, 430, 768, 1024, 1280, 1440 y 1920 px.

## 16. Estrategia SEO

- **Dominio**: `24shoots.es` (a confirmar). Todas las URLs absolutas, el canonical, el sitemap y `metadataBase` salen de una sola variable.
- **Titles** con patrón legible:
  - `24SHOOTS — Estudio creativo de contenido y comunicación visual · Valencia`
  - `Vídeo para eventos corporativos en Valencia — 24SHOOTS`
  - `Huhtamaki · 50 aniversario — Trabajo de 24SHOOTS`
- **Description** específica por página, escrita a mano.
- **Headings**: un H1 por página y H2 por sección, siempre visibles en el HTML de servidor.
- **hreflang** `es`, `en` y `x-default` (→ castellano), con mapa de rutas traducidas correcto, y `lang` correcto por idioma en `<html>`.
- **Sitemap** solo con URLs canónicas y `lastModified` real (fecha de contenido, no `new Date()` en cada build). **robots** permite todo excepto `/api`.
- **Structured data**:
  - `Organization` y `ProfessionalService` (nombre, logo, email, teléfono, `areaServed`, dirección si hay local o domicilio publicable, `sameAs`: Instagram, LinkedIn, Google Business Profile). Sin `priceRange` inventado.
  - `Service` por área.
  - **`VideoObject` por caso** (nombre, descripción, miniatura, `uploadDate`, `duration`, `contentUrl`/`embedUrl`). Es la mayor oportunidad de resultados enriquecidos en vídeo.
  - `BreadcrumbList` en casos y servicios.
  - No se usa `FAQPage` para rich results (Google lo limita desde 2023), aunque las FAQ sigan en el contenido.
- **Open Graph y social cards**: imagen por página generada a partir de un fotograma real y el logo, en 1200×630 estático para cada caso. Se valida en WhatsApp y LinkedIn.
- **Imágenes**: `alt` descriptivo y real ("Discurso del 50 aniversario de Huhtamaki en su planta"), nombres de archivo con significado y AVIF/WebP.
- **Enlazado interno**: home → caso → área → contacto; área → casos; caso → área → siguiente caso.
- **SEO local**: **Google Business Profile** (acción de 24SHOOTS) con categoría "Productora de vídeo", mismo nombre, teléfono y web. Las páginas de área mencionan Valencia donde es natural, sin landings de keywords vacías.
- **Migración**: redirecciones 301 de todas las URLs antiguas; si se puede, la antigua `vercel.app` redirige al dominio nuevo (decisión de 24SHOOTS, porque es producción).

## 17. GEO / AEO

Los motores generativos citan fuentes **claras, consistentes y factuales**. Se integra en el producto:

- **Consistencia de entidad**: el mismo nombre, descripción corta, ciudad y email en web, Instagram, LinkedIn, Google Business Profile y directorios.
- **Página de Estudio con un párrafo factual** del tipo "24SHOOTS es un estudio… con base en Valencia… trabaja para…", que se puede citar tal cual.
- **Casos como hechos verificables**: quién, qué, cuándo y dónde, con texto HTML real, no metido en un modal.
- **Preguntas frecuentes reales en cada área**, respondidas en la primera frase. Por ejemplo: "¿Cuánto tarda la entrega de un vídeo de evento?", solo con los datos que confirme 24SHOOTS.
- **Datos estructurados completos** (§16).
- `llms.txt`: mínimo coste y beneficio incierto. Se incluye uno sencillo con el índice del sitio, sin esperar gran cosa.

## 18. Performance

**Presupuestos** (móvil, 4G simulada; se comprueban en CI):

- LCP < 2,0 s
- CLS < 0,05
- INP < 200 ms
- JS de la home ≤ el runtime base de React/Next + 25 kB de código propio (gzip)
- Peso inicial de la home sin vídeo: < 400 kB

Decisiones:

- **Vídeo fuera de git y fuera de Vercel.** Las películas completas van a un servicio de streaming con HLS adaptativo. La elección por defecto es **Bunny Stream** (almacenamiento en la UE, coste muy bajo, reproductor ligero y miniaturas); la alternativa es Mux (mejor experiencia de desarrollo, más caro). La película solo se carga cuando el usuario pulsa reproducir; antes, póster AVIF.
- **Loops cortos** (hero y filas de trabajo): archivos propios de ≤1,5 MB en AV1 + H.264, sin audio, `preload="none"`. Se inician con IntersectionObserver y se pausan fuera de pantalla. Solo 1 loop activo a la vez en mobile.
- **Pipeline reproducible** (`scripts/media/`, ffmpeg): a partir de los masters genera póster AVIF, fotogramas para galería, loop y metadatos (duración, dimensiones) en un JSON tipado que usan la web y el JSON-LD.
- **Todas las páginas estáticas (SSG)**: `generateStaticParams` y `dynamicParams = false`. El único endpoint dinámico es el del formulario. Sin middleware (la raíz ya es castellano).
- **Fuentes**: 2 familias, variables y en subset *latin*, con `display: swap` y precarga solo de la de display.
- **Sin terceros en la carga inicial**: nada de GA ni embeds de Instagram. Analítica **sin cookies** (Vercel Web Analytics), que además **permite eliminar el banner de cookies** (§19).
- **El historial de git** sigue pesando 342 MB aunque se borren los vídeos. Purgarlo requiere reescribir el historial de `main` (force-push), que es una decisión de 24SHOOTS (§26).

## 19. Accesibilidad

- H1 y contenido presentes sin JS y sin depender de ninguna animación.
- Contraste AA en todos los pares: crema sobre negro ~15:1; naranja sobre negro ~7:1 (válido para texto); sobre crema se usa naranja oscuro.
- Foco visible y propio: contorno de 2 px naranja con 2 px de separación, nunca `outline: none`.
- Menú mobile con `dialog` o foco atrapado, Esc y `aria-expanded`.
- Vídeo: el loop del hero se puede pausar; las películas tienen controles nativos accesibles y **subtítulos (VTT) en las piezas con discursos** (Isabel Ferrer, Innovación, Huhtamaki, Manises), que es un asset a producir.
- Formulario: `<label for>`, `autocomplete`, errores por campo con `aria-describedby`, resumen en `aria-live` y botón con estado de envío legible ("Enviando…").
- `prefers-reduced-motion` respetado en todo (§14).
- `lang` correcto por idioma, *skip link*, orden de foco lógico y objetivos táctiles ≥ 44 px.
- **Banner de cookies**: con analítica sin cookies y sin embeds de terceros, **no hace falta banner**. Solo queda la política de cookies, que declara las técnicas. Es una ganancia enorme en mobile, pero **debe validarlo su asesoría**.
- Se audita con axe (automático) y con VoiceOver y NVDA (manual) en home, caso y contacto.

## 20. Arquitectura técnica

**Decisión: mantengo Next.js + React + TypeScript + Tailwind CSS y reconstruyo la aplicación prácticamente entera por dentro.**

¿Por qué no cambiar de framework (Astro, por ejemplo)? Astro sería una opción excelente para una web tan estática. Pero Next ya está desplegado en Vercel, el equipo lo conoce, React 19 con Server Components deja la home con muy poco JS de cliente y las View Transitions y el `next/image` con AVIF resuelven lo necesario. Cambiar de framework cuesta un coste de migración sin una mejora de producto que lo justifique.

¿Por qué reconstruir? La arquitectura actual (rutas duplicadas, `pages.json` monolítico, componentes de plantilla, middleware, renderizado dinámico) no sirve para V2. Se conserva el conocimiento, no el código.

```
src/
  app/
    (es)/…              rutas en castellano (raíz)
    en/…                rutas en inglés
    api/contact/route.ts
    sitemap.ts  robots.ts  opengraph assets
  components/           pocos y propios: Hero, CaseRow, CasePlayer, Slate, Nav, Menu,
                        ContactForm, Prose, MediaImage, LoopVideo
  content/              contenido tipado en TS (casos, áreas, estudio, textos UI) por idioma,
                        validado en tiempo de compilación con `satisfies`
  lib/                  i18n (mapa de rutas), seo (metadata + JSON-LD), media (manifest)
scripts/media/          pipeline ffmpeg → posters/loops/frames + media-manifest.json
```

- **Contenido**: módulos TypeScript tipados, sin CMS. Hay pocos casos y cambian poco. Si 24SHOOTS necesita editar sin desarrollador, se evalúa un CMS ligero (Keystatic, basado en git) en una fase posterior (§26).
- **Límites cliente/servidor**: todo Server Components salvo 5 islas cliente (Hero, LoopVideo, CasePlayer, Menu y ContactForm).
- **Formulario**: Route Handler con **validación en servidor** (una función tipada escrita a mano, sin librería), honeypot, trampa de tiempo mínimo y rate limit básico por IP (Vercel Firewall o KV). Envío con **Resend** a `info@24shoots.es` con `reply-to` del usuario, más un email automático de confirmación. Las respuestas de error son reales (4xx/5xx). Requiere verificar el dominio `24shoots.es` en Resend (DNS SPF/DKIM), que es acción de 24SHOOTS. Si aparece spam, se añade Cloudflare Turnstile.
- **Dependencias nuevas**: `resend` (o `fetch` directo a su API, lo que evita incluso esta dependencia). Nada más.
- **Calidad**: TypeScript `strict`, ESLint, Playwright para capturas y flujo del formulario (con Resend en modo test), axe y Lighthouse CI con los presupuestos de §18.
- **Limpieza del repositorio**: `DEV-BUSINESS-PLAYBOOK/`, los cuestionarios, `backups/`, los `.bat`/`.ps1`, los `.txt` de continuidad, la imagen suelta y `new-site.mjs` salen del repositorio de la web. Se conservan en otro repositorio privado o carpeta si el desarrollador los quiere.
- **Despliegue**: solo en **previews de Vercel de la rama de trabajo**. Nunca se toca la producción (`24shoots-web.vercel.app`) ni `main` sin aprobación explícita.

## 21. Contenido necesario

| Contenido | Quién | Bloquea |
|---|---|---|
| Confirmación de marca: nombre (24SHOOTS), dominio y email `info@24shoots.es` | 24SHOOTS | SEO y formulario |
| Por cada uno de los 5 casos: rol de 24SHOOTS (productor o subcontratado), permiso para nombrar al cliente, fecha, lugar, qué hizo el equipo y qué se entregó | 24SHOOTS | Portfolio |
| Texto del Estudio: quiénes son, desde cuándo, cómo trabajan | 24SHOOTS (lo redacto con sus respuestas) | Estudio |
| Clientes que se pueden nombrar | 24SHOOTS | Sección "Con quién" |
| 1–2 testimonios reales, con nombre, cargo y permiso escrito | 24SHOOTS | Opcional |
| Datos legales completos (titular, NIF/CIF, domicilio) | 24SHOOTS / asesoría | Legal |
| Respuestas reales a las FAQ de cada área (plazos, cobertura geográfica, formatos) | 24SHOOTS | Servicios |
| Copy final ES + revisión nativa EN | Yo redacto; 24SHOOTS aprueba | Todo |

## 22. Assets necesarios

| Asset | Estado | Prioridad |
|---|---|---|
| **Logo vectorial** (SVG/AI/PDF) en versión positiva y negativa | **Falta.** Solo existe un JPG de 150 px. | Alta |
| **Masters** de las 5 películas (ProRes o H.264 de alta calidad, 1080p o 4K) | Falta. Solo hay versiones web a 2–3 Mbps. | Alta: fotogramas y loops de calidad |
| Selección de 4–5 planos de ~3 s para el hero, idealmente 4K, con planos que funcionen también en 4:5 | Se extraen de los masters. | Alta |
| **Fotos del equipo trabajando** (rodaje real, no pose) | Falta | Alta para el Estudio |
| Subtítulos (VTT) de las piezas con discursos | Falta; se pueden generar y revisar | Media |
| Casos de contenido de marca (Aurum Capital, Alex Navarro u otros) con permiso | Por confirmar | Media |
| Fotografía fija (si 24SHOOTS hace foto en eventos) | Desconocido | Media |
| Perfil de LinkedIn de empresa y Google Business Profile | Desconocido | Media (SEO/GEO) |
| Tipografía con licencia (solo si se decide invertir) | Opcional | Baja |

## 23. Roadmap de implementación

Cada fase termina en un **preview de Vercel** revisable. Nada va a producción sin aprobación.

| Fase | Contenido | Depende de |
|---|---|---|
| **0 · Decisiones** | Respuestas a §26 y envío de logo, masters y fotos. | 24SHOOTS |
| **1 · Base** | Limpieza del repositorio; nueva estructura de rutas ES/EN; tokens (color, tipo, espacio, motion); fuentes; layout; nav y menú; pipeline de media; modelo de contenido tipado con los 5 casos verificados; SEO base (metadata, hreflang, sitemap, robots, JSON-LD); redirecciones 301. | — |
| **2 · Formulario real** | Endpoint validado, antispam, Resend y emails. Prueba de entrega real a `info@24shoots.es`. | Dominio verificado en Resend |
| **3 · Home y Hero** | "El corte"; trabajo seleccionado; "Un día, todo el año"; qué hacemos; con quién; contacto. | Loops y fotogramas |
| **4 · Trabajo** | Índice y plantilla de caso con reproductor HLS, `VideoObject` y OG por caso. | Vídeos en Bunny |
| **5 · Servicios, Estudio y legal** | 3 áreas, Estudio y páginas legales con datos reales. | Contenidos de §21 |
| **6 · EN** | Traducción cuidada de todo. | Copy ES aprobado |
| **7 · QA y pulido** | §24 completo, iteración visual y rendimiento. | — |
| **8 · Lanzamiento** | Dominio, Google Business Profile, Search Console, redirección de la URL antigua. | Aprobación de 24SHOOTS |

Las fases 1–4 se pueden construir ya con los assets actuales, usando las versiones web de los vídeos como provisionales y marcándolas así en el código. Los masters mejoran la calidad pero no bloquean el desarrollo.

## 24. Metodología de QA

- **Visual**: script de Playwright que captura cada ruta a 360, 375, 390, 430, 768, 1024, 1280, 1440 y 1920 px, en modo normal y con `prefers-reduced-motion`. Revisión manual en iPhone (Safari, modo de bajo consumo, que bloquea el autoplay) y en Android de gama media.
- **Funcional**: flujo del formulario de extremo a extremo (validación, error de red, éxito y email recibido), enlaces rotos (crawler interno), redirecciones 301 y conmutador de idioma que conserva la página equivalente.
- **Rendimiento**: Lighthouse CI con presupuestos (§18) en cada preview; comprobación del CLS del hero y de la carga diferida de loops.
- **Accesibilidad**: axe en CI, teclado completo (tab por toda la home, menú y formulario) y lector de pantalla manual.
- **SEO**: validación de JSON-LD (Rich Results Test), `hreflang`, canonical y comparación del sitemap con las rutas reales; previsualización OG en WhatsApp y LinkedIn.
- **Consola**: 0 errores y 0 avisos de hidratación.
- **Criterio final**: la lista del brief (§27), respondida por escrito en el PR de entrega.

## 25. Riesgos

1. **Derechos de uso del trabajo.** Parte del material se hizo para agencias (MAS Events, Sol y Luna, Vera Producciones). Si no se puede nombrar al cliente final, el portfolio pierde fuerza. *Mitigación*: preguntar ya; en el peor caso, presentar el caso sin marca ("Congreso tecnológico · 600 asistentes") solo con datos reales.
2. **Prueba insuficiente en Contenido de marca y Campañas.** *Mitigación*: estructura honesta (§2) y prioridad para documentar 1–2 casos nuevos.
3. **Calidad de los assets.** Con las versiones web actuales, las imágenes grandes pueden verse pobres. *Mitigación*: conseguir masters.
4. **Dependencias de 24SHOOTS**: DNS, Resend, Google Business Profile y datos legales. *Mitigación*: lista de §21 y fases desbloqueadas.
5. **Copy**: sin respuestas reales, el Estudio queda fino. *Mitigación*: prefiero una página corta y verdadera antes que una rellena.
6. **Soporte de navegadores**: las View Transitions no están en todos los navegadores. *Mitigación*: mejora progresiva sin dependencia funcional.
7. **Historial de git pesado**: purgarlo exige force-push en `main`. *Mitigación*: decisión explícita y coordinada; mientras tanto, no se añade ningún binario más.

## 26. Preguntas abiertas (necesito respuesta)

1. **Dominio y email**: ¿la web irá en `24shoots.es`? ¿Quién tiene acceso al DNS, para verificar Resend y apuntar a Vercel? ¿`info@24shoots.es` recibe hoy correo?
2. **Nombre de marca**: ¿"24SHOOTS" en mayúsculas? ¿"24SHOOTS Media" desaparece?
3. **Por caso** (Huhtamaki, Isabel Ferrer, Innovación València, Imperia SCM, Manises y Sol y Luna): ¿fue 24SHOOTS contratado directamente o a través de una agencia? ¿Podemos nombrar al cliente? ¿Qué hizo exactamente el equipo? ¿Qué se entregó? ¿Fecha y lugar?
4. **Contenido de marca**: ¿Aurum Capital y Alex Navarro son trabajo propio y publicable? ¿Hay más trabajo de marca o de campaña, aunque no esté en el repositorio?
5. **Bodas, fiestas y community management**: ¿son una parte importante de la facturación? Si lo son, ¿aceptáis que vivan fuera de la web principal (web o subdominio propio más adelante)?
6. **Presupuesto en el formulario**: ¿cuál es el proyecto mínimo razonable? ¿Queréis filtrar leads por presupuesto o prefieres hablarlo en la respuesta?
7. **Equipo**: ¿quiénes sois (nombres, roles), desde cuándo trabajáis y tenéis fotos reales de rodaje?
8. **Tipografía**: ¿hay presupuesto para licenciar una tipografía de autor? Si no, se usa Archivo + IBM Plex Mono.
9. **Git**: ¿autorizáis purgar los vídeos del historial de git (reescribe `main` y obliga a reclonar)?
10. **Previews y acceso de red**: ¿podéis permitir en la configuración de red de este entorno `24shoots-web.vercel.app`, `*.vercel.app`, `iris-exposure-art.lovable.app` y `oceanssocialclub.com`? Así podré completar el estudio de Lovable y Ocean's Social Club y hacer QA sobre los previews desplegados.
11. **Asesoría legal**: ¿validará la eliminación del banner de cookies (analítica sin cookies) y el formulario sin checkbox?
12. **Inglés**: ¿hay clientes o prospects internacionales que justifiquen EN desde el día 1, o lanzamos solo en castellano y EN en una segunda fase? Recomiendo lanzar EN solo cuando el copy esté revisado por un nativo.

---

## 27. Resumen de decisiones

| Área | Conservo | Reconstruyo | Elimino |
|---|---|---|---|
| Estrategia | Estudio creativo B2B | Pilares ordenados por prueba: Eventos → Contenido → Campañas. Argumento "un día, todo el año". Segmento de agencias. | "De la boda al negocio", 10 líneas, packs, community management |
| Marca | Negro, crema, naranja | Naranja como "REC"; Archivo + Plex Mono; metadatos de montaje | Inter por defecto, glow, blobs, grano, "Domina el impacto" como H1 |
| Hero | La idea de luz y revelación | "El corte": texto visible al instante, exposición y cortes de trabajo real | Scroll-scrub de 32 MB, logo letra a letra, pantalla negra |
| Home | — | 6 bloques | 8 secciones de plantilla y todo lo inventado |
| Portfolio | Los 6 vídeos reales | 5 casos con URL propia, nombres correctos y ficha verificada | 12 casos ficticios, resultados y reseñas inventados, rueda de logos |
| Navegación | ES/EN | 4 destinos, "Menú" a pantalla completa, CTA de texto | WhatsApp flotante, 6 enlaces, botón "Presupuesto" |
| Formulario | La intención de brief | 5 campos, validación, antispam, Resend y emails reales | `console.log` + `{ ok: true }` y 9 campos |
| Técnica | Next.js, React, TS, Tailwind y Vercel | Rutas limpias (ES en raíz), SSG, contenido tipado, 5 islas cliente, pipeline de media, streaming HLS | Rutas duplicadas, middleware, `pages.json` monolítico, 342 MB de vídeo en git, documentos ajenos a la web |
| SEO | Sitemap y robots | Dominio, hreflang con x-default, `lang` por idioma, VideoObject, OG por página, 301 | Canonical a vercel.app, `priceRange` inventado, fichas genéricas |
| Legal y cookies | Textos base | Datos reales, analítica sin cookies | Banner que tapa el 30 % de la pantalla en mobile (si lo valida la asesoría) |

**Siguiente paso propuesto**: con tu aprobación de este plan, empiezo las fases 1–2 (base, limpieza y formulario real) en `claude/confident-galileo-rgun26` con los assets actuales, mientras llegan las respuestas de §26.
