# MASTER SPECIFICATION — 24SHOOTS V2

**Estado:** pre-lanzamiento / desarrollo  
**Fecha de auditoría:** 3 septiembre 2026  
**Live auditada:** `https://24shoots-web.vercel.app`  
**Repo:** `miguelbr16/24shoots-web` (Next.js 15, Vercel)  
**Este documento es la fuente de verdad estratégica.** No es un resumen de Claude ni de Gemini. Es un veredicto independiente con evidencia.

Cómo usar este documento:

1. Las **5 decisiones estratégicas** (sección 27) no se reabren sin un cambio de negocio.
2. El resto se implementa en el orden: estrategia → posicionamiento → arquitectura → UX/CRO → dirección de arte → copy → código → performance → Cloudflare → analytics.
3. Cada hallazgo lleva etiqueta de verificación y de tipo (A/B/C).

---

## Cómo leer las etiquetas

### Verificación

| Etiqueta | Significado |
| --- | --- |
| **[CONFIRMADO]** | Comprobado en código, HTML live, network o comportamiento de navegador. |
| **[PROBABLE]** | Evidencia fuerte, confirmación incompleta (p. ej. peso percibido, intención de usuario). |
| **[INFERENCIA]** | Interpretación estratégica razonable, no un hecho medible. |
| **[NO VERIFICADO]** | No hay evidencia suficiente. No se usa como base de decisión. |
| **[INCORRECTO]** | Claude o Gemini se equivocaron. |
| **[PENDIENTE DE DATOS]** | Falta un dato real de 24SHOOTS. No es un fallo de producto. |
| **[RECOMENDACIÓN]** | Propuesta. No es un bug. |

### Tipo de hallazgo

| Tipo | Significado |
| --- | --- |
| **A. PROBLEMA REAL** | Existe aunque mañana lleguen logos, razón social y testimonios. |
| **B. CONTENIDO PENDIENTE** | La estructura puede ser correcta; falta el contenido definitivo. |
| **C. IMPLEMENTACIÓN BLOQUEADA** | No se puede cerrar hasta un dato o activo externo. |

**Regla:** un placeholder no es automáticamente un error estratégico. Mostrar el placeholder *como si fuera prueba social real* sí lo es.

---

# 0. VEREDICTO EJECUTIVO

24SHOOTS no necesita convertirse en una agencia de marketing 360. Tampoco debe quedarse como productora generalista de bodas, Fallas, fiestas y “todo lo audiovisual”.

**Qué es hoy la web, de hecho:** una pieza de dirección de arte digital con carácter cinematográfico, construida sobre un negocio todavía híbrido (eventos + bodas + aftermovies + algo de marca). El craft visual es el activo. La oferta, el copy, el SEO y el cierre comercial todavía no están al mismo nivel.

**Qué no es:** un sitio “roto” ni un rediseño total de sistema. El stack, el tono oscuro, el naranja, el grano, la tipografía ligera y el ritmo de secciones son una base defendible.

### Reconstruir vs. evolucionar

| Superficie | Decisión |
| --- | --- |
| Sistema visual (color, tipo, grain, UI) | **Mantener y refinar** |
| Stack Next.js + Vercel (ahora) | **Mantener** |
| Homepage desktop | **Rediseñar arquitectura**, no solo copy |
| Homepage mobile | **Diseñar una experiencia distinta**, no un desktop encogido |
| Hero | **Replantear de raíz el mecanismo**, conservar el WOW |
| Páginas interiores (servicios, portfolio, packs, contacto, legal) | **Evolucionar**, no tirar |
| Cloudflare / R2 / Stream | **No ahora.** Preparar assets para no rehacer dos veces |

### Lo que está mal (independiente de datos pendientes)

1. El primer viewport no dice qué es 24SHOOTS. Dice “SCROLL”.
2. La promesa (“Domina el impacto”) no nombra oficio, cliente ni resultado.
3. Diez líneas al mismo nivel, incluyendo boda / fiesta / Fallas, diluyen el posicionamiento B2B en la home.
4. El portfolio demuestra rodaje, no resolución comercial. 17/18 piezas son vídeo.
5. El formulario **no envía**. Devuelve `{ok:true}` tras `console.log`. El email destino ya existe en config.
6. SEO de home apunta a un negocio generalista (bodas + dron + CM) con `title` = `24Shoots`, sin OG image, favicon 404.
7. Performance: el Hero carga un MP4 de ~32 MB y la home embebe varios `<video src>`.
8. Desktop y mobile comparten la misma dramaturgia de scroll. Mobile no es una experiencia de conversión.

### Lo que NO está mal (o no tanto como se dijo)

- No hay un “escándalo legal”. Razón social y domicilio están marcados como pendientes. **[PENDIENTE DE DATOS]**
- El formulario **existe**. Claude dijo que el contacto era solo mailto. **[INCORRECTO]**
- Los logos placeholder no demuestran fraude. Demuestran que se está enseñando un carrusel que todavía no debería publicarse. **[PENDIENTE DE DATOS]** + **A** de presentación.
- No hay que publicar precios para parecer premium. Los packs sin precio en web son una decisión correcta. **[CONFIRMADO]** en `pages.json` (`quoteNote`).
- No hay que matar el cine en desktop. Hay que **dejar de usarlo como candado** de la propuesta de valor.

### ¿Hace falta reconstruir la web?

**No el producto entero. Sí la home (sobre todo Hero + oferta + prueba + cierre) y sí la experiencia mobile como producto aparte.** El resto es reordenación, copy, contenido y fontanería.

---

# 1. OBJETIVO DE NEGOCIO (CONGELADO)

24SHOOTS es un **estudio / partner de contenido visual y creatividad** para marcas y empresas.

Atrae, en este orden:

1. Marcas, e-commerce y empresas (contenido recurrente, campañas, imagen)
2. Eventos corporativos e institucionales de mayor valor
3. Proyectos B2B a medida

No elimina bodas, Fallas, música ni fiestas como **capacidad**. Las saca del **primer plano de la home**.

La web debe transmitir: calidad visual + creatividad + profesionalidad + capacidad de producción + pensamiento estratégico.

No debe transmitir: agencia genérica, fotógrafo freelance, productora de aftermovies, ni “hacemos de todo”.

---

# 2. PUNTUACIONES GROK (PRE-LANZAMIENTO)

Gemini puntúa como si el sitio estuviera lanzado con datos definitivos. Eso infla a la baja Confianza y Legal. Estas notas asumen **fase de desarrollo** y no penalizan la ausencia de razón social, email definitivo, logos oficiales ni testimonios finales. Sí penalizan **enseñar** placeholders como prueba, **simular** envío, y fallos de estrategia/UX/SEO/perf.

| Área | Gemini | Grok | Por qué se mueve |
| --- | ---: | ---: | --- |
| Propuesta de valor | 3 | **3** | Abstracta y tardía. Problema real. |
| Branding | 5 | **6** | Identidad visual reconocible (naranja, grain, 24SHOOTS). Naming y tagline flojos. |
| Dirección de arte | 6 | **7** | El Hero y el tono son de estudio, no de plantilla. El mecanismo actual los sabotea. |
| UX | 4 | **4** | Desktop narrativo mal gated; mobile largo. El hub móvil existe y es un acierto a medias. |
| UI | 6 | **7** | Componentes, acordeón, light bands, tipografía: por encima de la media local. |
| Copywriting | 3 | **3** | Tagline + “de la boda al negocio” + servicios-lista. |
| CRO | 2 | **3** | Hay CTAs, WhatsApp y form. El form miente al usuario. Presupuesto “< 500 €”. |
| SEO | 3 | **3** | Title, description B2C, sin OG image, sin H1 en interiores, canonical de preview. |
| Performance | 3 | **3** | 32 MB Hero + grid de vídeos. Poster AVIF vía Next sí existe. |
| Mobile | 4 | **4** | `HomeMobileHub` (`lg:hidden`) es el germen correcto. El Hero sigue siendo 170vh de teatro. |
| Portfolio | 4 | **4** | Oficio sí, casos comerciales no. 1 foto / 17 vídeos. |
| Confianza | 2 | **4** | Estructura de prueba social existe. Contenido no. Castigar 2/10 es tratar pendientes como fraude. |
| Diferenciación | 3 | **5** | El cine y el craft diferencian. La oferta no. |
| Percepción de precio | 4 | **5** | Sin precios públicos (bien). “< 500 €” y bodas en home tiran hacia abajo. |
| Captación premium | 3 | **3** | Una marca media-alta no se ve reflejada en el primer scroll. |

**Media Grok ≈ 4.4/10.** No es un 2. Tampoco es lanzable como web de partner B2B.

---

# 3. EVIDENCIA DIRECTA (NO HIPÓTESIS)

## 3.1 Hero — [CONFIRMADO] / Tipo A

Archivo: `src/components/ScrollHero.tsx`

- Altura: `h-[170vh] sm:h-[200vh] lg:h-[240vh]`. Sticky `100dvh`.
- Primer viewport: fondo oscuro, ensamblaje de logo, indicador **“Scroll”**.
- Copy: `textInDesktop` 0.52–0.78; `textInMobile` 0.68–0.88.
- Vídeo se *scrubbea* con el scroll (`currentTime = progress * duration`), no es un loop de marca.
- H1 actual: “Domina el impacto”.
- Subtítulo: “Un solo equipo para vídeo, foto, redes y dron. **De la boda al negocio.**”
- CTAs: “Solicitar presupuesto” / “Ver portfolio” — existen, pero llegan tarde.

Gemini (170–240vh, textIn ~52–68%) está **en lo cierto**. Claude también. No es consenso vacío: está en el código.

**Decisión:** el cine se queda. El candado de scroll se va. Hay que sustituir “SCROLL” por otro mecanismo con función (sección 13).

## 3.2 Formulario — [CONFIRMADO] / Tipo A (no C)

Claude: el contacto es mailto. **[INCORRECTO]**  
Gemini: `route.ts` hace `console.log` y `{ok:true}`. **[CONFIRMADO]**

Archivos:

- UI: `src/components/ContactForm.tsx` → `POST /api/contact`
- API: `src/app/api/contact/route.ts`
- Destino ya definido: `config/site.json` → `contact.email` = `hola@24shootsmedia.com`

El comentario del código es explícito: *“MVP: log submission. Connect Resend/SendGrid in production.”*

**Esto no es “falta el email corporativo”.** El destinatario ya está en config. Falta el **sistema de envío**. El usuario ve “¡Gracias! Hemos recibido tu solicitud.” Eso es un problema real de CRO y de confianza, también en pre-lanzamiento.

Si el email definitivo cambia, se cambia una clave. No bloquea implementar Resend/Resend-like.

## 3.3 Logos — [CONFIRMADO] / Tipo A de presentación + B de activos

`content/clients.json`: **14/14** apuntan a `/clients/placeholders/p-XX.svg`.  
Los tres primeros **nombran** Generalitat Valenciana, Ayuntamiento de Valencia, Ayuntamiento de Manises sobre arte placeholder. El resto son etiquetas genéricas (“Empresa B2B”, “Marca retail”).

No acusar de falsedad. **[PENDIENTE DE DATOS]** los logos oficiales.  
**Tipo A:** no se debe publicar un rail de “clientes” con SVG genéricos y nombres institucionales. Mientras tanto: ocultar el carrusel, o mostrar solo marcas con logo autorizado, o un recuento sin marcas (“Proyectos para instituciones y empresas en Valencia”) sin fingir un logo wall.

## 3.4 Legal — [CONFIRMADO] / Tipo B + C

`config/site.json`:

- `companyName`: `[RAZÓN SOCIAL — PENDIENTE]`
- `address`: `[DIRECCIÓN FISCAL — PENDIENTE]`
- `cif`: `26761401G` (parece un dato real; **[NO VERIFICADO]** frente a registro)

No penalizar como “web poco profesional” en pre-lanzamiento. Sí: no indexar `/legal` con placeholders visibles, o no enlazar legal hasta tener el texto. **[RECOMENDACIÓN]**

## 3.5 Portfolio — [CONFIRMADO] / Tipo A (mix) + B (casos)

`content/es/portfolio.json`: **18 ítems, 17 video, 1 photo.**

Clientes con nombre propio en piezas: Hutamaki, Imperia Más Events, Premios Isabel Ferrer, PIVC. El resto: “Empresa B2B”, “Marca local”, “María & Carlos”, “Comisión fallera”, etc.

Reviews en `pages.json` reutilizan nombres que también aparecen en portfolio (“María y Carlos”, “Restaurante La Marina”). No están demostrados como testimonios reales. **[PENDIENTE DE DATOS]** Tratarlos como copy de desarrollo, no como prueba.

Gemini 17/18 vídeo: **correcto**. Claude “capacidad audiovisual ≠ capacidad comercial”: **correcto como inferencia**, no como recuento.

## 3.6 Servicios — [CONFIRMADO] / Tipo A

`content/es/services.json`: 10 servicios, **todos `featured: true`**.  
`StatsStrip` habla de “7 líneas” (inconsistencia). Typo: categoría “Campañas de pagos”.

Packs existen en `/es/packs` y en FAQ. **No están en la homepage** (`src/app/[locale]/page.tsx`).

## 3.7 SEO — [CONFIRMADO] / Tipo A

De `src/lib/seo.ts` + HTML live + `config/site.json`:

| Elemento | Estado |
| --- | --- |
| `<title>` home | `24Shoots` (site.name, sin claim) |
| description | Lista bodas, dron, CM — posicionamiento generalista |
| canonical | `https://24shoots-web.vercel.app/es` (URL de preview, no dominio final) **[PENDIENTE DE DATOS]** dominio |
| hreflang | es / en; **sin x-default** |
| og:image | **ausente** (`openGraph` no define `images`) |
| twitter card | `summary_large_image` sin imagen |
| favicon.ico | **404** (middleware excluye el path; no hay `app/icon` ni `public/favicon.ico`) |
| robots | `allow: /` + sitemap |
| sitemap | home, servicios (+ slugs), portfolio, about, contact, packs, legal |
| JSON-LD | `LocalBusiness`, `priceRange` €€, `image` = logo.svg, sin `telephone` |
| H1 | Solo el Hero de home. `SectionHeading` es siempre `<h2>` → portfolio/packs/about/contact **sin H1** |
| Indexability | Técnicamente indexable. **No debería indexarse** la preview con legal pendiente y title pobre. |

## 3.8 Performance — [CONFIRMADO] / Tipo A

- Hero: `/videos/web/aftermovie-oicial-version-final-web.mp4` ≈ **32.0 MB**, H.264, 1920×1080, 30 fps, ~3.7 Mbps, ~69 s. Poster `/videos/web/posters/oficial.jpg`.
- Poster con `sizes="100vw"` y `deviceSizes` por defecto de Next → srcset hasta **`w=3840`**. AVIF sí se sirve si `Accept: image/avif`.
- `preload="metadata"` en el `<video>`, pero el archivo es enorme: cualquier seek de scrub fuerza rango requests pesados.
- `InstagramGrid` en home: múltiples `<video src>` de aftermovies (carpeta Instagram ~186 MB en repo).
- `next.config.ts`: sin `deviceSizes` custom, sin `vercel.json`. Image optimization = Vercel `/_next/image`.
- GA: `AnalyticsScripts.tsx` exige `NEXT_PUBLIC_GA_MEASUREMENT_ID` — no está en el repo. **[PENDIENTE DE DATOS]** / no implementado.

## 3.9 CRO — [CONFIRMADO] / Tipo A

Funnel real hoy:

Visitante → teatro de scroll → lista de 10 servicios → grid Instagram de aftermovies → logos placeholder + reviews no verificadas → FAQ → CTA a `/contacto` → form que no envía + WhatsApp `wa.me/34661101863`.

Campos del form: nombre, email, teléfono, servicio, pack, sector, fecha, presupuesto, mensaje, privacidad. Incluye **“Menos de 500 €”** y sector **“Boda”**. Calendario: no existe. Email mailto en footer: sí.

## 3.10 Dual desktop/mobile hoy — [CONFIRMADO]

Ya hay un intento: `HomeMobileHub` (`lg:hidden`) vs acordeón + process + why (`hidden lg:block`). **La intención es correcta. La ejecución no llega:** el Hero mobile sigue siendo el mismo mecanismo de 170vh, Instagram grid completo, social proof completa, FAQ completa. Mobile no es una web corta de conversión.

`prefers-reduced-motion`: no gobierna el Hero. **[CONFIRMADO]**

---

# 4. TABLA DE VALIDACIÓN CRUZADA

| ID | Tema | Claude | Gemini | Grok / verificación | Evidencia | Confianza | Decisión |
| -- | --- | --- | --- | --- | --- | --- | --- |
| V01 | Hero tarde | Hipótesis | 170–240vh, textIn 52–68% | **[CONFIRMADO]** Gemini más preciso; Claude correcto en fondo | `ScrollHero.tsx` L287–438 | Alta | P0. Replantear mecanismo, no solo acortar. |
| V02 | “SCROLL” como propuesta | Implícito | Teatro vs valor | **[CONFIRMADO]** | Indicador Scroll L430–437; copy con opacity `textIn` | Alta | Sustituir por interacción con función. |
| V03 | PV abstracta | Sí | Sí | **[CONFIRMADO]** | H1 “Domina el impacto”; sub “de la boda al negocio” | Alta | Reescribir. Conservar tono, no la vaguedad. |
| V04 | Generalista | Sí | 10 líneas, B2B diluido | **[CONFIRMADO]** | 10× `featured: true`; sectors band = mismas 10 | Alta | 3 categorías en home. Resto en landings. |
| V05 | ¿Eliminar bodas/Fallas? | Abierto | Diluyen B2B | **[INFERENCIA]** | Capacidad real vs. lo que queremos que el mercado piense | Media | No eliminar negocio. Sacar de home. Landings propias. |
| V06 | Portfolio = showreel | Sí | 17/18 vídeo | **[CONFIRMADO]** recuento; inferencia comercial | `portfolio.json` | Alta | Home: 6 casos. Case studies cuando haya briefing. No inventar KPIs. |
| V07 | Prueba social falsa | Cautela | Placeholders + reviews genéricas | **[CONFIRMADO]** placeholders; **[PENDIENTE DE DATOS]** reviews | `clients.json`; `pages.json` reviews | Alta / media | Ocultar rail hasta logos reales. No publicar reviews no autorizadas. |
| V08 | Legal | No vio bien | `[RAZÓN SOCIAL]` | **[CONFIRMADO]** contenido; **no** es P0 de marca en pre-lanzamiento | `site.json` legal | Alta | Tipo B. No indexar. Completar cuando exista. |
| V09 | Form solo mailto | Afirmó | API dummy | Claude **[INCORRECTO]**; Gemini **[CONFIRMADO]** en envío | `ContactForm.tsx` + `api/contact/route.ts` | Alta | Implementar mailer. No fingir éxito. |
| V10 | Email no configurado | — | — | Destino **sí** está; transporte **no** | `hola@24shootsmedia.com` + `console.log` | Alta | Tipo A de implementación. El email definitivo es un replace. |
| V11 | Title `24Shoots` | Parcial | Sí | **[CONFIRMADO]** | `buildMetadata` usa `site.name` | Alta | Title con claim B2B. |
| V12 | OG image | No | Ausente | **[CONFIRMADO]** | `seo.ts` openGraph sin images | Alta | Añadir 1200×630. |
| V13 | Favicon 404 | No | Sí | **[CONFIRMADO]** | No hay icon en `app/` ni `public/favicon.ico` | Alta | Añadir `app/icon.png` + apple-touch. |
| V14 | Hero ~32 MB | Estimó impacto | 32 MB | **[CONFIRMADO]** | asset path + ffprobe previo | Alta | Poster LCP + loop corto. Master 69s no es Hero. |
| V15 | Packs | — | — | **[CONFIRMADO]** existen, no en home | `/es/packs` vs `page.tsx` | Alta | Home: 3 modos de trabajar, no 10 servicios. |
| V16 | “Campañas de pagos” | — | — | **[CONFIRMADO]** typo | `pages.json` categoría | Alta | “Campañas de pago / paid”. |
| V17 | 7 líneas vs 10 | — | — | **[CONFIRMADO]** | StatsStrip vs services.json | Alta | Alinear métricas a realidad o quitar. |
| V18 | Gemini JSX paste-ready | — | Propuso Hero.tsx nuevo, autoplay webm, CF loader | **[INCORRECTO]** como parche | No existe `Hero.tsx` ni `hero-reel.webm` | Alta | Editar `ScrollHero.tsx`. No pegar un Hero paralelo. |
| V19 | Claude SEO bodas en home | Tentación | — | **[RECOMENDACIÓN] rechazada** si el objetivo es B2B | description actual ya lista bodas | Alta | Bodas = `/bodas`. Home = marcas. |
| V20 | Migrar a CF ahora | — | A veces se cuela | **[RECOMENDACIÓN] rechazada** | Dependencia real: `/_next/image` | Alta | Ahora: Vercel. Assets listos para R2. CF en Fase 6. |

### Por qué una conclusión gana a otra

- **Hero:** gana Gemini en cifras porque midió el código; gana Claude en el diagnóstico de negocio (el usuario no entiende la oferta). Ambos aciertan. Nadie ofreció un reemplazo de “SCROLL” a la altura; eso es el hueco de esta spec.
- **Formulario:** gana Gemini. Claude no vio el POST. El matiz que ambos no cerraron: el destinatario **ya está**. No es bloqueo de datos.
- **Confianza:** Gemini sobre-penaliza pre-lanzamiento. Claude se queda corto en evidencia. Grok: ocultar, no dramatizar.
- **Rediseño blanco/neutral (Gemini, si se propuso):** rechazado. Destruye el único diferenciador actual.

---

# 5. QUÉ CONFIRMAR / RECHAZAR

## Confirmar (Claude)

- PV abstracta.
- Oferta demasiado ancha en primer plano.
- Portfolio = capacidad de rodaje, no de negocio.
- El usuario tarda demasiado en saber qué contratar.

## Confirmar (Gemini)

- Medidas del Hero.
- 17/18 vídeo.
- Placeholders de logos.
- Formulario sin transporte de correo.
- Title, OG, favicon, peso del Hero.
- “< 500 €” como ancla de precio.

## Rechazar (Claude)

- Contacto = solo mailto.
- Impulso a SEO de bodas en la home si el objetivo es partner de marcas.
- Cualquier lectura de “falta legal” como fallo de posicionamiento (es dato pendiente).

## Rechazar (Gemini)

- Notas 2/10 en confianza/CRO como si el site estuviera en producción con datos definitivos.
- Parche JSX de un Hero nuevo + autoplay + webm inexistente.
- Loader de Cloudflare `src?w=` sin resize (roto en local).
- Convertir la marca en UI corporativa clara/neutral.
- Tratar `[RAZÓN SOCIAL — PENDIENTE]` como prueba de amateurismo de negocio.

## Lo que ambos pasaron por alto (añadido Grok)

1. Destino de correo **ya configurado**; falta proveedor.
2. Packs construidos y ausentes de la home — la home vende 10 servicios en vez de 3 modos de engagement.
3. Typo “Campañas de pagos” + “7 líneas” vs 10.
4. Dual `HomeMobileHub` ya existe: no hay que inventar la idea, hay que llevarla hasta el final (home mobile corta).
5. Scrub de un aftermovie de 69 s como “Hero de marca” es el error de dirección: es un **recurso de portfolio**, no una firma.
6. H1 ausente en páginas interiores.
7. Preview indexable (`robots allow /`) con placeholders.
8. `sizes="100vw"` en poster full-bleed genera 3840 px.
9. Reviews y piezas de portfolio comparten nombres — riesgo de parecer stock.
10. Competencia valenciana de “contenido para marcas” ya habla de casos y de foto de producto; 24SHOOTS no puede reclamar e-commerce hasta tener stills.

---

# 6. MANTENER / ELIMINAR / CREAR

## Mantener

- Paleta oscura, accent `#E8833A`, grain, tipografía ligera con acentos semibold.
- Marca 24SHOOTS / 24SHOOTS MEDIA como firma audiovisual (no “agency” en el logo).
- WhatsApp real.
- Rutas i18n es/en.
- Páginas de servicio por slug.
- Packs como **modelos de trabajo**, sin precio público.
- Acordeón de servicios en desktop (reordenado, no 10 featured).
- `HomeMobileHub` como patrón mobile (contenido recortado).
- Piezas nombradas: Hutamaki, Imperia, Isabel Ferrer, PIVC — si hay autorización.
- Next.js en Vercel **ahora**.
- Poster + `next/image` (corregir sizes/deviceSizes).

## Eliminar u ocultar (home y comunicación principal)

- “SCROLL” como primer mensaje.
- “De la boda al negocio” en Hero.
- Bodas, fiestas, Fallas, videoclip como **ítems de igual peso** en la home.
- Rail de logos placeholder.
- Reviews no autorizadas / no definitivas.
- Grid Instagram de aftermovies como prueba B2B (desktop: 3–4 stills de making-of máximo; mobile: fuera o 1 clip).
- Presupuesto “Menos de 500 €”.
- Copy “Todo lo que necesitas para dominar el impacto visual”.
- Stats no ciertas (“7 líneas”).
- Legal con brackets en producción indexada.

## Crear / rediseñar

- Posicionamiento y IA dual (secciones 11–12, 29).
- Hero dual (sección 13).
- 3 categorías comerciales + landings B2C.
- Case studies (cuando haya briefing; si no, fichas honestas sin KPIs inventados).
- Bloque de prueba social vacío-seguro (texto institucional sin logos, o nada).
- Form con transporte real + microcopy honesto.
- Metadata, OG, favicon, Schema ProfessionalService/Organization.
- Pipeline de assets (poster, loop 6–8 s, masters, CDN).
- Eventos de analytics (sección 22).

---

# 7. POSICIONAMIENTO DEFINITIVO

### Categoría

**Estudio creativo de contenido visual** (foto + vídeo + dirección) para marcas y empresas.  
No: agencia 360. No: fotógrafo de bodas. No: productora genérica.

### Cliente principal

Director/a de marketing, founder, responsable de comunicación o de un e-commerce/marca que necesita imagen y contenido con criterio, no un pack de posts.

Cliente secundario (no en home): parejas, comisiones falleras, ocio — vía landings.

### Problema

Las marcas acaban con un fotógrafo, una productora, un community y un editor que no comparten dirección. El resultado es contenido que se publica y no construye imagen.

### Solución

Un equipo que **dirige, produce y entrega** foto y vídeo con la misma mirada, en formatos que se usan (web, campana, redes, evento).

### Diferenciador

Dirección de arte + capacidad real de rodaje. No un deck de “estrategia” sin oficio. No un highlight de boda reconvertido a marca.

### Promesa

Contenido visual que se siente premium y se puede usar para vender, no solo para “tener algo en Instagram”.

### USP (una frase)

**Producimos la imagen con la que tu marca quiere que te recuerden.**

Alternativa más táctica: **Foto, vídeo y dirección para marcas — un solo criterio, de la campaña al recorte.**

No usar “Domina el impacto” como H1. Puede vivir como *claim interno / cierre*, no como definición.

---

# 8. SABER / VENDER / PARECER

Estas tres listas no coinciden. Esa es la decisión.

| | Contenido |
| --- | --- |
| **Sabemos hacer** | Foto, vídeo, dron, eventos, bodas, Fallas, aftermovies, música, redes, campañas |
| **Queremos vender (12–24 meses)** | Contenido de marca / e-commerce, campañas, eventos corporativos e institucionales, retainer de contenido |
| **Queremos que el mercado piense** | Estudio creativo valenciano de alto nivel visual, no la productora de la fiesta |

### Home (primer plano) — 3 categorías

1. **Contenido de marca** (foto + vídeo + formatos)
2. **Campañas y piezas de impacto**
3. **Eventos corporativos e institucionales**

### Segundo plano (existen, no lideran)

- Dron: **capacidad**, no línea. Se menciona dentro de producción.
- Redes / CM: **servicio satélite** o pack, no identidad. Si se mantiene, “publicación y adaptación de lo producido”, no “community 360”.
- Documental B2B: dentro de contenido de marca / casos.

### Landings / portfolio (no home)

- `/bodas`
- `/fallas` o filtro fuerte en portfolio
- `/musica` o “videoclips”
- Aftermovies de ocio: portfolio, no servicio de home

### Qué no fingir

No vender “estudio de producto / e-commerce” hasta haber **stills de producto** en el portfolio. Hoy hay 1 foto. **[CONFIRMADO]**

---

# 9. PRINCIPIO DESKTOP ≠ MOBILE

Misma identidad. Distinto producto de página.

| | Desktop | Mobile |
| --- | --- | --- |
| Rol | Obra + deseo (“quiero trabajar con ellos”) | Conversión (“entiendo y contacto”) |
| Longitud | Larga, narrativa | Corta: ~5–7 bloques |
| Motion | Rico, experimental, cursor, montaje | Mínimo; 1 gesto; respeta data |
| Portfolio | 6–8 piezas + 1 caso profundo | 3 piezas, un tap |
| Servicios | Explorables (acordeón / index) | 3 cards |
| Prueba | Logos reales o nada; 1 cita real | 1 línea de prueba o nada |
| CTA | Hero + final + casos | Hero visible + barra sticky |
| Instagram/aftermovies | Making-of editorial, no grid de fiesta | Fuera |
| FAQ | Completa | 3 preguntas o página contacto |

### Idéntico

Marca, color, tipo, tono, fotografía, motion language (cortes, grain, naranja), posicionamiento, H1 conceptual (no el layout).

### Adaptar

Tamaño tipo, recorte de vídeo 16:9 vs 9:16, densidad, hover → tap.

### Reordenar (mobile)

Hero (valor) → 3 ofertas → 3 trabajos → 1 prueba o proceso en 3 pasos → CTA/form corto.  
Proceso largo, FAQ, marquee, stats, Instagram: fuera o al final de `/estudio`.

### Simplificar (mobile)

Sin scrub de 69 s. Sin rail de logos. Sin 10 sectores.

### Desaparecer en mobile

Indicador Scroll, logo assembly por scrub, grid Instagram, acordeón de 10, FAQ de 7, stats dudosos.

---

# 10. ARQUITECTURA IDEAL DE HOMEPAGE

## Desktop — experiencia / obra

| # | Sección | Objetivo | Mensaje | Contenido | Visual | CTA | Por qué |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D0 | Preload/poster | LCP | — | Poster AVIF del frame firma | Still cinematográfico | — | Velocidad percibida |
| D1 | Hero firma | Parar + identificar + comprender | USP + para quién | H1, sub, 2 CTAs | Ver concepto elegido §13 | Portfolio / Contacto | Arte sin candado |
| D2 | Index de oferta | Mapear | 3 cosas que se contratan | 3 líneas, no 10 | Still por línea | Ancla o `/servicios#` | CRO: menú mental |
| D3 | Reel/mosaico | Deseo | “Así se ve el oficio” | 8–12 stills + 1 loop corto | Editorial, no fiesta | Ver proyectos | DA |
| D4 | Caso 1 | Confianza comercial | Problema → pieza | 1 proyecto nombrado | Mixto foto/vídeo | Caso o contacto | Cierra la tesis de Claude |
| D5 | Cómo trabajamos | Reducir miedo | Un equipo, fases claras | 4 pasos | Tipográfico + 1 still | Brief | B2B |
| D6 | Modos de engagement | Packs sin precio | Retainer / campaña / evento | 3 modos | Cards oscuras | Presupuesto | Ya existen en `/packs` |
| D7 | Prueba | Autoridad | Marcas que se puede nombrar | Logos reales o frase | Mono/blanco | — | Si no hay logos, **omitir** |
| D8 | Estudio | Humanizar | Valencia, equipo, criterio | 80–120 palabras | Retrato/making-of | Sobre nosotros | No “pasión por contar historias” |
| D9 | Cierre | Convertir | Siguiente paso claro | Agenda o form corto | Quiet | WhatsApp + form | Fricción baja |

Marquee: opcional, una sola, con palabras de oficio (no “BODA / FALLAS / FIESTA” al mismo nivel que “MARCA”).

## Mobile — conversión

| # | Bloque | Altura objetivo | Notas |
| --- | --- | --- | --- |
| M1 | Hero 9:16 | 100dvh | Valor + CTA en el primer viewport |
| M2 | 3 ofertas | ~80vh | Cards; sin accordion de 10 |
| M3 | 3 trabajos | ~100vh | Stills; play on tap |
| M4 | 3 pasos | ~60vh | Brief → producción → entrega |
| M5 | Cierre | ~70vh | WhatsApp + “Pedir propuesta” |
| M6 | Sticky bar | 56px | WhatsApp \| Propuesta |

Todo lo demás: otras rutas. El usuario mobile **no** recorre 15–20 pantallas.

---

# 11. HERO

## Objetivos simultáneos (0–15 s como criterio de diseño, no KPI inventado)

| t | Debe ocurrir |
| --- | --- |
| 0–1 s | Impacto: still o primer corte. Nunca pantalla negra vacía. |
| 1–3 s | Identidad: 24SHOOTS inequívoco. |
| 3–5 s | Comprensión: qué / para quién. |
| 5–8 s | Deseo: el material se mueve o se revela. |
| 8–15 s | CTA o entrada a obra. |

## Qué no hacer

- No sustituir SCROLL por un Hero de plantilla (foto + H1 + botón).
- No introducir interacción “porque se puede”.
- No autoplay de 32 MB.
- No H1 abstracto.

---

## Desktop — 5 conceptos radicalmente distintos

### CONCEPTO 1 — CINEMATIC BRAND

**Idea:** La web abre como un *title sequence* de 6–8 s que **ya lleva tipografía encima**. El cine no espera al scroll.

**Composición:** Full-bleed loop (no el aftermovie de 69 s). H1 anclado tercio inferior izquierdo desde el frame 0, con peso ligero. Logo pequeño esquina, no centro a construir.

**H1:** Contenido visual para marcas que se toman en serio su imagen.  
**Sub:** Estudio en Valencia. Foto, vídeo y dirección, un solo criterio.  
**CTA:** Ver el trabajo / Pedir propuesta.  
**Visual:** Loop 6–8 s, 15–20 Mbps no; bitrate ~4–6 Mbps 1080, más variante 720.  
**Movimiento:** Corte interno del montaje; ken burns mínimo en poster hasta que el vídeo está ready.  
**Interacción:** Cursor = grain/parallax suave (desktop only).  
**Transición:** Al primer scroll, el loop se convierte en mosaico de stills (no se pide otro 100vh de “revelar texto”).  
**Percepción:** Productora de alto nivel.  
**Ventajas:** Máximo WOW, copy inmediata.  
**Riesgos:** Si el loop es un aftermovie de fiesta, se confirma el mal posicionamiento. Hay que montar un loop **de marca**.

### CONCEPTO 2 — VISUAL COLLISION

**Idea:** Foto + vídeo + tipo en colisión. Una retícula 3×3 o 2×4 que se recalcula.

**Composición:** Celdas: stills de oficio (no confeti). Una celda es vídeo. El H1 ocupa una celda “tipo poster”.

**H1:** Un criterio. Todos los formatos.  
**Sub:** De la campaña al recorte de stories — producido por el mismo equipo.  
**CTA:** Entrar al estudio / Hablar.  
**Movimiento:** Celdas que intercambian cada 3–4 s.  
**Interacción:** Hover en celda = play / ficha. Click = caso.  
**Transición:** La retícula se expande al primer caso.  
**Percepción:** Estudio contemporáneo, no wedding film.  
**Ventajas:** Demuestra foto+vídeo (hoy el site es 94% vídeo). Fuerza a producir stills.  
**Riesgos:** Sin stills de calidad, se ve vacío. Dependencia de contenido real.

### CONCEPTO 3 — EDITORIAL

**Idea:** Portada de revista de alta gama. El vídeo no es el fondo; es el “artículo”.

**Composición:** 60% still vertical/editorial, 40% columna de tipo (masthead 24SHOOTS, número de “issue”, pull-quote, H1, CTA). Papel de grano.

**H1:** Dirección de imagen para empresas y marcas.  
**Sub:** Producción propia. Valencia.  
**CTA:** Abrir el issue (portfolio) / Encargar.  
**Movimiento:** Tipografía que entra en 400–600 ms. El still es estático (lujo).  
**Interacción:** “Pasar página” (scroll o drag) hacia el primer caso maquetado como spread.  
**Percepción:** Premium, inteligente, menos “YouTube”.  
**Ventajas:** LCP excelente (imagen). Diferencia frente a productoras.  
**Riesgos:** Puede parecer menos “audiovisual” para el equipo interno. Mitigar con un spread 2 que sea cine.

### CONCEPTO 4 — CREATIVE STUDIO INDEX

**Idea:** Como los mejores estudios (lista de proyectos como Hero). 24SHOOTS se presenta por el trabajo, no por un slogan.

**Composición:** Columna izquierda: nombre + una línea de categoría. Centro/derecha: preview que cambia con hover (foto o vídeo corto). Abajo o arriba: una línea de posicionamiento.

**H1 (línea, no billboard):** Estudio de contenido visual — Valencia.  
**Sub:** Marcas, campañas, eventos corporativos.  
**CTA:** Un proyecto → caso. Secundario: Propuesta.  
**Movimiento:** Crossfade de preview 200 ms.  
**Interacción:** Hover/teclado. Muy desktop.  
**Percepción:** Estudio que ya trabaja a cierto nivel.  
**Ventajas:** Honestidad brutal si los nombres son reales.  
**Riesgos:** Con “Empresa B2B” y “Marca local” se cae. **No usar hasta tener 6 nombres autorizados.**

### CONCEPTO 5 — SIGNATURE “24”

**Idea:** La firma es el número. 24 fotogramas / 24 tomas. El usuario no lee “SCROLL”; **arrastra o deja correr 24 stills** que son el oficio.

**Composición:** Filmstrip horizontal de 24 frames (foto+frame de vídeo). El frame 01 es el poster de LCP. Overlay persistente: H1 + CTAs. El 24 se ve como contador `04 / 24`.

**H1:** 24 tomas. Una dirección.  
**Sub (obligatorio, no poético solo):** Contenido visual para marcas y empresas. Valencia.  
**CTA:** Ver proyectos / Pedir propuesta.  
**Visual:** 24 stills AVIF ligeros (~30–80 KB cada uno) + 1 loop opcional en el frame activo.  
**Movimiento:** Auto-advance 1.2 s/frame.  
**Interacción:** Drag / wheel horizontal *dentro del Hero* (no 140vh extra). Hold para pausar. Reemplazo **motivado** de SCROLL: estás pasando un rollo.  
**Transición:** Frame 24 hold → dissolve a la sección oferta.  
**Percepción:** Único, memorable, propio.  
**Ventajas:** Ownable. Enseña foto. Performance controlable. Copy visible desde t=0.  
**Riesgos:** Gimmick si los 24 frames son aftermovies de discoteca. Curaduría estricta B2B/craft.

---

## Selección

**Desktop ganador: Concepto 5 (24) + overlay de comprensión del Concepto 1.**

Razón: sustituye SCROLL por un gesto que *es* la marca; no es un Hero de plantilla; permite LCP de imagen; obliga a stills; el copy no espera. El loop cinematográfico (C1) puede vivir **dentro** de 2–3 frames, no como archivo de 32 MB full-page.

**Suplente si no hay 24 stills a tiempo:** Concepto 1 con loop de marca de 6–8 s montado ad hoc + copy desde frame 0. No lanzar C4 con nombres genéricos.

**Rechazar como default:** Hero de plantilla. Rechazar scrub del aftermovie oficial de 69 s.

---

## Tres variantes de copy (A/B/C) sobre el ganador

### A — CONVERSIÓN

- H1: Contenido visual para marcas.
- Sub: Foto, vídeo y dirección en Valencia. Un equipo, de la campaña al recorte.
- CTA: Pedir propuesta
- CTA2: Ver el trabajo
- Visual: 24 frames curados B2B + 1 loop
- Comportamiento: copy visible a opacity 1 desde el primer paint (poster)
- Animación: filmstrip auto + drag

### B — PREMIUM

- H1: La imagen con la que tu marca quiere que te recuerden.
- Sub: Estudio creativo. Producción propia. Empresas y campañas.
- CTA: Hablar con el estudio
- CTA2: Casos
- Visual: más still editorial, menos fiesta, motion más lento
- Animación: 1.6 s/frame, menos autoplay de vídeo

### C — CREATIVE AGENCY (cuidado)

- H1: Estudio creativo de contenido.
- Sub: Dirección, producción, entrega. No una agencia genérica ni un freelance.
- CTA: Brief
- CTA2: Showreel
- Riesgo: suena a 360. Usar solo si el resto de la página insiste en **producción**.

**Copy de lanzamiento recomendado: A, con el H1 de B si el still es suficientemente fuerte.** No C como default.

---

## Hero mobile — composición 9:16

No es el filmstrip de 24. No es 170vh.

**Primer viewport (100dvh):**

- Poster 9:16 (recorte específico, no letterbox del 16:9).
- Logo pequeño top.
- H1 2 líneas máximo.
- Sub 1 línea.
- CTA primario full-width.
- CTA secundario texto.
- Sin “SCROLL”. Un chevron mínimo o nada (el CTA ya empuja).

**0–3 s:** poster (LCP) + fade del H1. Vídeo loop 9:16 **solo si** pesa < ~1.5 MB y `prefers-reduced-motion: no`. Si no, still.

**Primer gesto:** scrollea a las 3 ofertas (no a más teatro).

**Scroll hasta el siguiente bloque:** ≤ 1 pantalla. Cero sticky de 170vh.

**Se elimina:** logo assembly, scrub, dual column, indicador Scroll, description larga del Hero.

**Se mantiene:** paleta, H1 (acortado), acento, grain ligero, mismos CTAs.

---

# 12. SERVICIOS — ARQUITECTURA

Máximo **3** en home. Máximo **6** en `/servicios` como cards. El resto son capacidades dentro de una ficha o landings.

| Slug | Rol |
| --- | --- |
| `/servicios/contenido-marca` | Primario |
| `/servicios/campanas` | Primario (renombrar “Campañas de pagos”) |
| `/servicios/eventos-corporativos` | Primario |
| `/servicios/produccion-aerea-dron` | Capacidad, no card hero |
| `/bodas` | Landing B2C, SEO propio |
| Fiestas / Fallas / videoclip | Portfolio + landing ligera si hay demanda SEO |
| CM | Pack o subsección de contenido, no identidad |

Páginas de servicio actuales: conservar layout, cambiar H1, quitar “featured todos”, CTAs a form cualificado.

---

# 13. PORTFOLIO Y CASOS

### Home desktop

6 piezas. Mix **objetivo 50/50 foto-vídeo** en comunicación (hoy 6% foto: hay que **producir o escanear stills** de trabajos existentes). Priorizar nombres reales autorizados.

### Home mobile

3 piezas. Stills. Tap = lightbox o ficha.

### `/portfolio`

Filtros: Marca / Evento corporativo / Campaña / Archivo (bodas, Fallas, música).  
Archivo no es tab por defecto.

### Case studies

Plantilla:

Cliente → Problema → Concepto → Producción → Aplicaciones → Resultado

**Resultado:** solo si existe (uso en LinkedIn, pieza para gala, etc.). Si no hay métrica, **no inventar**. Cerrar con entregables: “aftermovie 90s + 8 recortes + 40 fotos”.

**Hoy faltan casos B2B suficientes con briefing escrito.** [PENDIENTE DE DATOS] Hutamaki / Imperia / Isabel Ferrer / PIVC son los únicos candidatos a ficha nombrada. El resto no debe protagonizar la home con nombres ficticios.

### Qué baja de la home

Aftermovies de fiesta, “María & Carlos”, piezas “cliente privado” genéricas, 24Shoots Media self-promo como “caso”.

---

# 14. CRO

## Funnel objetivo

Interés (Hero) → evidencia (trabajo) → comprensión (3 ofertas) → confianza (caso o logo real) → contacto cualificado → reunión → cliente.

## CTAs

| | Desktop | Mobile |
| --- | --- | --- |
| Primario | Pedir propuesta | Pedir propuesta |
| Secundario | Ver el trabajo | WhatsApp |
| Terciario | — | — (no email como CTA principal hasta que el mailer exista y el buzón esté vivo) |

No “Solicitar presupuesto” como único verbo si el form no cotiza en automático. **Propuesta** es más honesto.

## Formulario: cualificador B2B, no mínimo

Menos campos no es siempre mejor en B2B. Un campo de presupuesto bien escrito **filtra**.

**Campos V2:**

1. Nombre  
2. Email de empresa  
3. Empresa / marca  
4. Qué necesitas (select: Contenido de marca / Campaña / Evento / Recurrente / Otro)  
5. Alcance (select: una pieza / campaña / retainer)  
6. Presupuesto orientativo (**sin** “< 500 €”; suelo “Hasta 1.500 €” / “1.500–4.000” / “4.000–8.000” / “+8.000” / “Aún no lo sé”)  
7. Mensaje  
8. Privacidad  

Quitar de la home/contact principal: pack (se infiere), fecha de boda, sector “Boda”. Esos campos viven en `/bodas`.

Teléfono: opcional. WhatsApp cubre el canal caliente.

**Pasos:** 1 pantalla. No wizard de 4 steps en V2.

**Microcopy:** “Te respondemos en 1–2 días laborables con una propuesta o con las preguntas que falten.”  
Éxito: solo tras respuesta 200 del **proveedor de correo**, no del `console.log`.

**Calendario:** no en V2. Añadir Cal.com cuando el cierre humano esté estable (Fase 7). Meterlo ahora es teatro de CRO.

**WhatsApp:** mensaje prefijado: “Hola, vengo de 24shoots. Quiero contenido para [marca].”

## Comparativa

| | Form mínimo (3 campos) | Cualificador (8) |
| --- | --- | --- |
| Volumen | Más | Menos |
| Calidad | Peor | Mejor |
| Encaje premium | Bajo | Alto |

**Decisión: cualificador.** El objetivo no es inflar leads de bodas a 300 €.

---

# 15. PRECIOS

**No publicar tarifas en home ni en packs.**

Ventajas de ocultar (este posicionamiento): evita ancla low-ticket, obliga a conversación, protege trabajos a medida, coherente con “partner”.

Desventajas: más fricción, peor SEO de “precio videoclip Valencia”. Irrelevante para el cliente B2B objetivo.

**Excepción:** `/bodas` puede tener “desde” más adelante si el negocio lo necesita. No contagiar la home.

Packs: **modos** (Retainer visual / Campaña / Evento), no SKUs con €.

---

# 16. COPY — DEUDA Y REESCRITURA

Formato: **Actual → Problema → Nueva**

| Actual | Problema | Nueva |
| --- | --- | --- |
| Domina el impacto | No dice oficio ni cliente | La imagen con la que tu marca quiere que te recuerden / Contenido visual para marcas |
| De la boda al negocio | Ancla B2C en el primer mensaje | Para marcas, empresas y campañas |
| Un solo equipo para vídeo, foto, redes y dron | Lista de herramientas | Foto, vídeo y dirección. Un criterio. |
| Todo lo que necesitas para dominar el impacto visual | Relleno | Tres formas de trabajarnos: contenido, campaña, evento. |
| Proyectos que hablan por sí solos | Cliché; además no hablan de negocio | Trabajo reciente — marcas y empresas |
| Pasión por contar historias que impactan | Genérico de about | Estudio en Valencia. Producimos nosotros. |
| Socio visual… criterio cinematográfico… destaques donde importa | Tres promesas, cero prueba | Montamos y entregamos las piezas que tu marca va a usar. |
| Somos una marca pequeña, ¿podemos empezar con poco? (FAQ) | Ancla low | ¿Hacéis proyectos puntuales o solo retainer? → Ambos. Una campaña bien hecha es un buen inicio. |

### Copy recomendado por bloque

**Hero:** ver §11 A/B.

**Servicios (home):**  
“Tres encargos. El resto son capacidades.” + una línea por categoría.

**Portfolio:**  
“Una selección. El archivo (bodas, Fallas, música) está en el portfolio completo.”

**Prueba:**  
Si hay logos: “Han confiado equipos de comunicación e instituciones.”  
Si no: **no pongas el bloque**.

**Proceso:**  
1 Brief y criterio  
2 Dirección y producción  
3 Entrega en formatos de uso  
4 (Opcional) Recortes y continuidad  

**CTA final:**  
“Cuéntanos la marca y el encargo. Te devolvemos una propuesta.”

**Contacto:**  
“No es un presupuesto automático. Es el inicio de un encargo.”

---

# 17. SEO

Dominio final **[PENDIENTE DE DATOS]**. Hasta entonces: `robots.txt` **disallow** en preview o `noindex` global. Indexar esta Vercel con title pobre y legal pendiente es un problema real evitable.

## Arquitectura de URLs (es)

```
/                     → B2B, USP, 3 ofertas
/trabajo              → portfolio (opcional alias de /portfolio)
/trabajo/[slug]       → caso
/servicios
/servicios/contenido-marca
/servicios/campanas
/servicios/eventos-corporativos
/packs                → modos de trabajo
/estudio              → about
/contacto
/bodas                → cluster B2C (no enlazado como igual en nav principal)
/fallas               → opcional
/legal /privacidad /cookies
/en/...               → mirror
```

Nav principal: Trabajo / Servicios / Estudio / Contacto.  
“Bodas” no en la nav primaria. Footer sí.

## Clusters

- **Transaccional B2B:** contenido audiovisual empresas Valencia, vídeo corporativo, foto marca, producción campañas.
- **Local:** Valencia + desplazamiento España (ya está en FAQ).
- **B2C aislado:** fotógrafo/videógrafo bodas Valencia **solo en /bodas**.

No mezclar en title de home.

## Metadata home (propuesta)

- Title: `24SHOOTS — Contenido visual para marcas | Valencia`
- Description: `Estudio de foto, vídeo y dirección para empresas y campañas. Producción propia en Valencia.`
- H1: el del Hero (una sola H1).
- Interiores: `SectionHeading` debe poder renderizar `h1` en página de sección.

## Schema

- `Organization` + `ProfessionalService` (mejor que solo LocalBusiness genérico).
- `telephone` cuando se quiera indexar el número (ya existe WhatsApp).
- `ImageObject` para OG.
- No `priceRange €€` si no hay oferta de consumo.

## Internal linking

Home → 3 servicios → 6 trabajos → contacto.  
Cada caso → servicio → contacto.  
`/bodas` no apunta a packs B2B como equivalente.

---

# 18. PERFORMANCE — AGENCIA VISUAL

Objetivo: **premium percibido, peso razonable.** No Lighthouse vanity.

## Imágenes

Cadena: **Original → Master TIFF/JPG 4K → derivados AVIF/WebP → CDN → srcset**.

| Uso | Lado largo | Formato | Peso guía |
| --- | --- | --- | --- |
| LCP poster Hero | 1920 (desk) / 1080 (mob 9:16) | AVIF | 80–180 KB |
| Card portfolio | 1200 | AVIF | 40–90 KB |
| Logo cliente | 256 | SVG/PNG | < 15 KB |
| OG | 1200×630 | JPG/PNG | < 200 KB |

`next.config.ts`: `deviceSizes: [640, 750, 828, 1080, 1200, 1920]` — **quitar 3840 del camino crítico**.  
Hero poster: `sizes="100vw"` está mal para DPR 3 en 1280 CSS px si Next ofrece 3840. Usar `sizes="100vw"` + deviceSizes cap 1920.

## Vídeo

| Pieza | Max | Codec | Notas |
| --- | --- | --- | --- |
| Hero loop desktop | 4–8 s, 1080, ~3–6 MB | H.264 + WebM VP9/AV1 si se puede | `preload="none"` + poster. Play when in view / after idle |
| Hero loop mobile 9:16 | < 1.5 MB | H.264 720 | Opcional; still-first |
| Caso | Stream o MP4 8–15 MB | H.264 | Click to play |
| Aftermovie 69 s 32 MB | **Nunca en Hero** | — | Página de proyecto / modal |
| Instagram grid | No en home V2 | — | |

Scrub scroll del master 69 s: **eliminar**. Es el peor patrón posible (descarga + seek continuo).

Poster → LCP → vídeo diferido. Carga inmediata del MP4 largo: prohibido.

## Fuentes

Una familia, 2 pesos (300/600). `font-display: swap`. No 4 cuts.

## JS

Mantener dynamic import de grids. Hero **no** debe parsear scrub RAF + video seek.

---

# 19. CLOUDFLARE — AHORA / MIGRACIÓN / DESPUÉS

**No migrar la app en V2 de lanzamiento.** El trabajo de assets debe hacerse una vez.

### Ahora (Vercel)

- Seguir con `next/image` (Vercel optimization).
- Caps de `deviceSizes`.
- No atar URLs a `x-vercel-*`.
- Formularios: Route Handler + Resend (o similar) en Vercel.
- Subir **derivados** pensados para objeto storage (nombres estables `/media/hero/poster-1920.avif`).

### Migración (cuando duela el coste de egress o se quiera R2)

```
Cloudflare DNS / WAF / CDN
        ↓
Next.js (Vercel o, más tarde, Workers)
        ↓
R2 = masters y derivados de foto/vídeo
```

- Hero e imágenes de portfolio: **R2 + dominio de media** (`media.24shoots…`) **antes** de mover el compute.
- Cloudflare Images: solo si el recorte dinámico ahorra de verdad; si los derivados ya existen, **sobra**.
- Stream: solo si hay **biblioteca de vídeos largos** (casos, making-of). Para un loop de 6 s es overkill y coste. **No Stream para el Hero corto.**

### Después

- Valorar OpenNext/Workers cuando la app sea estable (i18n, form, no image optimizer de Vercel).
- No reescribir componentes a un `loader` que concatena `?w=` sin transform.

Dependencias Vercel actuales: `next/image`, middleware de locale, headers de preview. No hay `vercel.json`. Eso facilita un futuro split compute/assets.

---

# 20. ANALYTICS

GA4 (cuando exista ID) + eventos con nombres estables. No vanidad de “scroll 90%” como KPI de negocio.

| Evento | Trigger |
| --- | --- |
| `hero_impression` | Hero painted |
| `hero_cta_primary` / `hero_cta_secondary` | Click |
| `offer_click` | Card de las 3 ofertas |
| `portfolio_item_open` | Pieza (id, type photo/video) |
| `case_view` | Case study |
| `cta_contact_nav` | Nav |
| `form_start` | Focus primer campo |
| `form_submit_attempt` | Submit |
| `form_submit_success` / `form_submit_error` | Respuesta API real |
| `whatsapp_click` | wa.me (param `page`) |
| `email_click` | mailto |
| `calendar_click` | cuando exista |
| `lead_qualified` | server: presupuesto ≥ umbral o tipo ≠ boda |
| `meeting_booked` | más adelante |
| `client_won` | no es web; CRM |

`scroll_depth` 25/50/75/100 **separado desktop/mobile** porque las páginas no miden lo mismo.

---

# 21. MATRIZ DEFINITIVA

| ID | Problema | Evidencia | Impacto | Esfuerzo | Prioridad | Acción |
| -- | --- | --- | --- | --- | --- | --- |
| P0-01 | Hero oculta la oferta | ScrollHero 170–240vh, textIn ≥0.52 | Alto | Alto | **P0** | Nuevo mecanismo §11; copy t=0 |
| P0-02 | PV y subtítulo B2C | pages.json hero | Alto | Bajo | **P0** | Copy A/B |
| P0-03 | 10 servicios featured | services.json | Alto | Medio | **P0** | 3 en home; landings B2C |
| P0-04 | Form no envía y finge éxito | route.ts console.log | Alto | Bajo | **P0** | Resend + error honesto |
| P0-05 | Logos placeholder públicos | clients.json p-XX.svg | Alto | Bajo | **P0** | Ocultar rail |
| P0-06 | Preview indexable | robots allow | Medio | Bajo | **P0** | noindex hasta dominio/legal |
| P0-07 | Hero 32 MB + scrub | mp4 32 MB | Alto | Medio | **P0** | Poster LCP + loop corto; matar scrub |
| P1-08 | Portfolio 17/18 vídeo, pocos nombres | portfolio.json | Alto | Alto | **P1** | Stills + 6 piezas home + fichas honestas |
| P1-09 | SEO title/OG/favicon/H1 | seo.ts, 404 favicon | Alto | Bajo | **P1** | Metadata + icon + h1 interiores |
| P1-10 | Mobile = desktop largo | page.tsx + ScrollHero | Alto | Alto | **P1** | Home mobile de 5–7 bloques |
| P1-11 | Reviews no definitivas | pages.json | Medio | Bajo | **P1** | Quitar hasta autorización |
| P1-12 | Ancla <500 € y sector Boda en form B2B | budgetOptions | Medio | Bajo | **P1** | Qualifier §14 |
| P1-13 | Packs invisibles en home | page.tsx | Medio | Bajo | **P1** | 3 modos |
| P1-14 | Typo campañas / 7 líneas | pages.json, StatsStrip | Bajo | Bajo | **P1** | Corregir o eliminar stats |
| P2-15 | Schema y x-default | seo.ts | Medio | Bajo | **P2** | ProfessionalService |
| P2-16 | deviceSizes 3840 | Next default + sizes 100vw | Medio | Bajo | **P2** | Cap 1920 |
| P2-17 | GA ausente | env | Medio | Bajo | **P2** | ID + eventos §20 |
| P2-18 | reduced-motion | ScrollHero | Medio | Bajo | **P2** | Still only |
| P2-19 | Case studies | falta briefing | Alto | Alto | **P2** | Cuando haya datos |
| P3-20 | Cal.com | no existe | Bajo | Medio | **P3** | Fase 7 |
| P3-21 | Cloudflare compute | — | — | Alto | **P3** | Fase 6 |
| P3-22 | Stream | — | — | Alto | **P3** | Solo si hay archivo largo |
| B-23 | Razón social, domicilio, email definitivo, logos oficiales, testimonios | site.json / clientes | — | — | **B/C** | Completar; no bloquear P0-04 |

---

# 22. ROADMAP

### FASE 0 — Críticos y datos

noindex; ocultar logos; quitar reviews no autorizadas; mailer; no fingir éxito; copy Hero; typo; stats; “< 500 €”.  
Paralelo **[PENDIENTE DE DATOS]:** razón social, domicilio, logos, testimonios, dominio, GA ID.

### FASE 1 — Posicionamiento + IA

3 ofertas; nav; landings B2C desacopladas; packs como modos; quitar sectors band de 10 en home.

### FASE 2 — Hero + UX + CRO dual

Hero 24 + overlay; Hero 9:16; home mobile corta; form cualificador; sticky mobile.

### FASE 3 — Portfolio + casos

Stills; 6+3 selección; fichas sin KPI ficticio; 1–3 case studies cuando haya briefing.

### FASE 4 — SEO

Dominio; title/description; OG; favicon; H1; schema; clusters; internal linking.

### FASE 5 — Performance + assets

Pipeline derivados; loops; cap srcset; matar grid de vídeos en home; reduced-motion.

### FASE 6 — Cloudflare

R2 para media. DNS. Images/Stream solo con caso de uso. Compute más tarde.

### FASE 7 — Analytics + experimentación

Eventos; A/B H1 A vs B; no experimentar el posicionamiento cada semana.

---

# 23. ESPECIFICACIONES PARA DESARROLLO

Regla: **no crear `Hero.tsx` paralelo.** Intervenir los archivos reales.

---

### SPEC-01 — Copy Hero

- **Página:** Home  
- **Archivo:** `content/es/pages.json` → `home.hero` (+ `en`)  
- **Problema:** H1 abstracto; sub B2C.  
- **Cambio exacto:**  
  - `title`: `Contenido visual para marcas` (o H1 B)  
  - `subtitle`: `Foto, vídeo y dirección. Un equipo. Valencia.`  
  - `description`: `Producimos la imagen que tu marca va a usar en campaña, web y redes — con el mismo criterio.`  
  - `ctaPrimary`: `Pedir propuesta`  
  - `ctaSecondary`: `Ver el trabajo`  
  - `eyebrow`: `Estudio · Valencia`  
- **Razón:** comprensión en t=3–5 s.  
- **Impacto / prioridad:** P0.  
- **Deps:** ninguna.  
- **Tech:** JSON only. i18n mirror.

### SPEC-02 — Hero: copy visible sin scrub

- **Archivo:** `src/components/ScrollHero.tsx`  
- **Problema:** `textInDesktop` 0.52–0.78; `textInMobile` 0.68–0.88; indicador Scroll.  
- **Cambio exacto:**  
  1. `textIn` inicial = 1 en el primer paint (o fade 300 ms al mount), independiente de `progress`.  
  2. Eliminar el bloque L430–437 “Scroll”.  
  3. Dejar de atar `video.currentTime = progress * duration`.  
  4. Vídeo: `preload="none"`, play/pause por `IntersectionObserver` + `prefers-reduced-motion`.  
  5. Altura de sección: desktop máximo `min-h-[100dvh]` más filmstrip interno; **prohibido** `h-[240vh]` para revelar texto.  
  6. Mobile: layout 9:16 distinto (`isMobile`): una columna, CTA above the fold, sin `LogoAssembly` por scrub.  
- **Razón:** WOW sin candado.  
- **Prioridad:** P0.  
- **Deps:** loop corto + poster recortado (SPEC-07).  
- **Tech:** no añadir librería de scrolljacking.

### SPEC-03 — Filmstrip 24 (desktop)

- **Nuevo módulo:** `src/components/hero/Frames24.tsx` usado **dentro** de ScrollHero o sucesor.  
- **Cambio:** 24 imágenes en `/public/media/hero/frames/01.avif` … `24.avif`. Auto-advance; drag pointer; contador `n / 24`.  
- **Prioridad:** P0/P1 según assets.  
- **Fallback:** si hay < 8 frames, Concepto 1 (loop) solamente.  
- **Tech:** no cargar 24 JPG de 2 MB. Presupuesto ~2 MB el set completo.

### SPEC-04 — Home: 3 ofertas, no 10 sectores

- **Archivos:** `page.tsx`, `SectorsBand`, `content/es/services.json` (`featured: false` salvo 3), `ServicesAccordion`.  
- **Cambio:** `SectorsBand` en home recibe solo 3. Acordeón desktop: 3 featured + link “Capacidades y archivo”. Mobile hub: 3 cards, no 10.  
- **Prioridad:** P0.

### SPEC-05 — Ocultar prueba social no lista

- **Archivos:** `page.tsx`, `ClientSocialProofSection.tsx`, `content/clients.json`.  
- **Cambio:** no renderizar el bloque si `logo` contiene `placeholders/` o si `featured` clientes < 4 con logo real. Reviews: array vacío hasta autorización.  
- **Prioridad:** P0.  
- **No:** inventar logos. No: dejar GVA sobre SVG genérico.

### SPEC-06 — Mailer

- **Archivo:** `src/app/api/contact/route.ts`  
- **Cambio exacto:**  
  1. Validar body (zod u equivalente ya usado en el repo; si no, validación manual estricta).  
  2. Enviar con Resend (o proveedor elegido) `to: site.contact.email`, `replyTo: body.email`.  
  3. `{ok:true}` **solo** si el proveedor confirma.  
  4. Log de error en server; cliente muestra `form.error`.  
  5. Env: `RESEND_API_KEY` (no commitear).  
- **El email definitivo es un cambio de `site.json`, no un bloqueo.**  
- **Prioridad:** P0.  
- **Deps:** buzón que reciba (aunque sea el actual `hola@24shootsmedia.com`).

### SPEC-07 — Media Hero

- **Problema:** `aftermovie-oicial-version-final-web.mp4` 32 MB como Hero.  
- **Cambio:**  
  - Poster: `oficial` recorte 1920 y 1080 9:16, AVIF.  
  - Loop: nuevo encode 6–8 s, 1080p H.264, target 3–6 MB, + 720p mobile.  
  - `config/site.json` `heroVideo` / `heroPoster` apuntan a los nuevos paths.  
  - El 32 MB queda para página de proyecto, no home.  
- **Prioridad:** P0.  
- **Tech:** `ffmpeg` `-movflags +faststart` `-an` para loop. No H.265 único (Safari).

### SPEC-08 — next/image

- **Archivo:** `next.config.ts`  
- **Cambio:**

```ts
images: {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [64, 96, 128, 256, 384],
  formats: ["image/avif", "image/webp"],
}
```

- Poster Hero: `priority`, `sizes="100vw"` OK **con cap 1920**.  
- **Prioridad:** P2 (barato, hacerlo en el mismo PR de Hero).

### SPEC-09 — SEO head

- **Archivo:** `src/lib/seo.ts`, `config/site.json` `description`, `src/app/icon.png`, OG en `public/og.jpg`.  
- **Cambio:** `title` template `24SHOOTS`; default title con claim; `openGraph.images`; `twitter.images`; `alternates.languages["x-default"]`; `robots: { index: false }` hasta corte de lanzamiento.  
- **`SectionHeading`:** prop `as?: "h1" | "h2"` default h2; páginas de sección usan h1.  
- **Prioridad:** P0 noindex + P1 resto.

### SPEC-10 — Form CRO

- **Archivos:** `ContactForm.tsx`, `content/es/pages.json` contact.  
- **Cambio:** campos §14; eliminar “Menos de 500 €”; sector Boda solo en ruta bodas; success copy condicionado a SPEC-06.  
- **Prioridad:** P1 (P0 el no-mentir).

### SPEC-11 — Home mobile corta

- **Archivos:** `page.tsx`, `HomeMobileHub.tsx`, no montar en mobile: `InstagramGrid`, `FaqSection` completa, `StatsStrip`, `ClientSocialProofSection` si no hay logos.  
- **Cambio:** wrapper `lg:hidden` con secuencia M1–M5. Desktop unchanged sequence D1–D9.  
- **Prioridad:** P1.  
- **Tech:** CSS hide no basta si los `<video>` de Instagram se hidratan igual: **no renderizar** en server para mobile es difícil sin UA; usar `dynamic` + matchMedia o recortar `instagramPosts` a `[]` en un `HomeMobile` dedicado. Preferir componente `HomeDesktop` / `HomeMobile` separados para no descargar 6 vídeos.

### SPEC-12 — Favicon

- Añadir `src/app/icon.png` (32–512) y `apple-icon.png`. El matcher de middleware ya excluye `favicon.ico`; App Router icon cubre el 404.  
- **Prioridad:** P1.

---

# 24. LAS 10 COSAS QUE CAMBIARÍA MAÑANA

Ordenadas por impacto comercial (no por gusto estético):

1. **Dejar de mentir en el formulario** — conectar envío o no decir “hemos recibido”.  
2. **H1 + subtítulo B2B visibles en el primer viewport** — fuera “Domina el impacto” + “de la boda al negocio” como definición.  
3. **Matar el candado SCROLL / 240vh / scrub de 32 MB** — poster + copy ya; cine después.  
4. **Ocultar logos placeholder e institucionales sin marca gráfica real.**  
5. **Home de 3 ofertas, no 10 líneas al mismo nivel.**  
6. **noindex** de la preview hasta dominio y legal.  
7. **Quitar “< 500 €” y el sesgo boda del form principal.**  
8. **Seleccionar 6 trabajos que parezcan encargos de marca** (aunque el archivo B2C viva en `/portfolio`).  
9. **Hero mobile 9:16 propio** — una pantalla, un CTA.  
10. **Title + OG + favicon** — para cuando se indexe, no parecer un proyecto sin nombre.

---

# 25. LAS 5 DECISIONES ESTRATÉGICAS

Si solo se pueden tomar cinco decisiones antes de rediseñar:

1. **Posicionamiento:** 24SHOOTS es un estudio de contenido visual para marcas y empresas. No una agencia 360. No una productora de “todo lo que se mueve”.  
2. **Oferta en primer plano:** tres encargos (contenido de marca, campañas, eventos corporativos). Bodas / Fallas / fiestas / música son archivo y landings, no la definición.  
3. **Hero:** cine + firma “24” (o loop de marca), **con la propuesta visible desde el primer frame**. El scroll no es la llave de la comprensión. Desktop puede ser obra; no puede ser un acertijo.  
4. **Portfolio:** dejar de enseñar un showreel de aftermovies como prueba B2B. Enseñar stills + pocos nombres reales. Case studies solo con briefing; cero KPIs inventados.  
5. **Conversión:** desktop enamora y cierra; mobile cierra en 5–7 bloques. Formulario cualificador que **envía de verdad**. Sin logos ni reviews hasta que existan.

Todo lo demás (Cloudflare, Stream, calendario, precios públicos, SEO de bodas en home, Hero de plantilla blanca) se subordina a estas cinco.

---

# 26. COMPETENCIA (PARA NO COPIAR ESTÉTICA)

Comparar captura de **el mismo cliente** (marca / empresa / evento corporativo en Valencia–ES), no solo moodboards.

| Player (público) | Cómo ganan | Qué no copiar | Lectura para 24SHOOTS |
| --- | --- | --- | --- |
| Estudios tipo archivo/editorial | Foto fuerte, casos, tono culto | Volverse solo stills y perder cine | Hay que **subir la foto** o no se entra en esa conversación |
| Productoras corporativas | Casos con logo de cliente, procesos, CTAs tempranos | PowerPoint visual, stock | Ellos ganan claridad; 24SHOOTS puede ganar deseo **si** aclara |
| Agencias de contenido RRSS | Volumen, retainer, packs | Convertirse en CM genérico | CM es satélite, no USP |
| Wedding films | Emoción, showreel, SEO bodas | Traer ese lenguaje a la home B2B | Aislar en `/bodas` |

**[INFERENCIA]** 24SHOOTS gana si ocupa el hueco: **más arte que la productora corporativa, más empresa que el wedding film.** Ese hueco no se ocupa con diez pictogramas de servicio.

No se han auditado cifras de tráfico ajenas. No afirmar rankings.

---

# 27. QUÉ NO CAMBIARÍA

- El carácter oscuro, el naranja, el grano, la soberbia visual cuando está justificada.
- WhatsApp como canal real.
- Packs sin precio público.
- Next.js. Vercel **ahora**.
- i18n es/en (el copy EN se reescribe después del ES, no al revés).
- La ambición de que **desktop sea una pieza de DA**. Eso es correcto. Estaba mal **implementado como delay**.

---

# 28. REGLA DE ORO PARA IMPLEMENTACIÓN

> La creatividad debe aumentar la percepción de valor y el deseo de contratar 24SHOOTS, no convertirse en un obstáculo para entenderla.

Desktop demuestra de qué es capaz el estudio.  
Mobile demuestra por qué contratarlo.  
Ninguno de los dos puede fallar en decir **qué es**.

---

*Fin de la Master Specification V2. Cualquier PR de diseño o código que contradiga las 5 decisiones de la sección 25 debe justificarse como cambio de negocio, no como preferencia de implementación.*
