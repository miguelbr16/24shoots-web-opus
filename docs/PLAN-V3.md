# Plan 24SHOOTS web: del estado actual a producción

## Contexto

La web (Next.js 15 en Cloudflare Workers, preview en workers.dev con noindex) cuenta bien una historia. Pero toda la prueba es de eventos, y 24SHOOTS no es una productora de eventos: es una marca de **contenido y marketing que guía al cliente**. Hace estrategia, contenido para redes, marketing para negocios, documental y retrato personal, y eventos.

Hay casos nuevos con permiso para publicar:
- **Oceans Social Club**, cliente nuevo de estrategia + contenido.
- **Physem VLC**.
- **Aurum Capital**.
- **Alex Navarro**.

Hay que:
- Reposicionar la Home.
- Dar entrada a esos casos y al **método** ("te guiamos").
- Dejar planificado el tablón de Instagram.
- Llevar la web a producción a 0 € de coste recurrente.

Reglas que siguen en vigor:
- Solo en la rama `claude/confident-galileo-rgun26`. No tocar `main` ni la web en producción.
- DNS y merge solo con confirmación explícita.
- No inventar datos.
- Los documentos de Oceans son confidenciales: no van al repo y no se citan.
- Secretos solo como `wrangler secret`, nunca por chat.

Cada fase termina con una **puerta de aprobación** (tú revisas la preview) antes de pasar a la siguiente.

---

## Fase 3. Narrativa nueva (solo texto, sin código)

**Entregable:** `docs/HOME-NARRATIVA-V3.md`, con los textos en ES y EN para aprobar.

Estructura propuesta para la Home (sustituye a la actual de 5 capítulos):

| # | Capítulo | Idea | Prueba |
|---|---|---|---|
| 0 | Apertura | De "Un evento dura un día" a la marca del cliente. Borrador: *"Tu marca ya tiene algo que contar. / Nosotros lo pensamos, lo grabamos y lo hacemos funcionar."* Abajo, una barra con la oferta: "Estrategia, contenido y producción audiovisual para marcas · Valencia" + CTA | Plano fuerte de un caso no-evento (Oceans o Physem) |
| 1 | El problema | Publicar sin rumbo / contenido que no se nota | — |
| 2 | **Cómo te guiamos** (método) | 4 pasos fijos (*sticky*), reutilizando `StorySteps`: **Pensar** (estrategia y calendario) → **Preparar** (brief plano a plano, sesión organizada) → **Grabar** (rodaje) → **Medir y ajustar** (informe mensual: dato, interpretación, decisión) | Material genérico y anonimizado, nunca documentos de Oceans |
| 3 | Lo que hacemos | 4 líneas en tarjetas: **Marcas y redes · Negocios · Personas y documental · Eventos**. Cada una lleva a su página de servicio | Un caso por línea: Oceans/Physem · Aurum · Alex Navarro · Huhtamaki |
| 4 | Un ejemplo, contado | Un caso de marca recurrente (Oceans o Physem) contado como historia, en lugar de Huhtamaki | Vídeo o fotos del caso |
| 5 | Quién hay detrás | Javier Renovell, con su frase: "Hago que el que no cree en las redes… no pueda vivir sin ellas" | Foto de Javier (pendiente) |
| 6 | Confianza | Clientes (todos, no solo eventos) + testimonio si lo hay | — |
| 7 | Empezar | Packs visibles (Completo / Audiovisual / Community) + "¿Algo puntual?" → contacto + WhatsApp | — |

**Más decisiones de esta fase:**
- **Menú:** Trabajo · Servicios · Packs · Estudio · Contacto. Más adelante, Diario.
- **Servicios: de 3 áreas a 4 líneas.** Hoy son `events`, `brand` y `campaigns` (`src/lib/i18n.ts` → `serviceSlugs`). Se añade `personal` (personas y documental) y `brand` pasa a llamarse "Marcas y redes". Eso implica:
  - Redirecciones si cambia algún slug.
  - Ajustar `ServicesIndex`.
- **Mensajes de WhatsApp:** pasar de "Tengo un evento / Contenido para mi marca / Otra" a "Quiero contenido para mi marca / Tengo un evento o rodaje / Otra consulta".

**Puerta:** apruebas el texto.

---

## Fase 4. Casos nuevos y material

**Dependencias del cliente:** originales sin logo de Oceans, Physem, Aurum y Alex Navarro; qué se hizo en cada caso; fechas. Mientras tanto se trabaja con lo que hay en `archive/media/instagram/` y con las descargas de Instagram.

Pasos:
1. **Modelo de caso** (`src/content/cases.ts`). Añadir:
   - `format: "film" | "social"`: los casos de redes son verticales 9:16 y llevan varias piezas.
   - `pieces[]`: reels o fotos, cada uno con su póster, loop y texto alternativo.
   - `deliverables`.
   - `role`: estrategia, rodaje, gestión.
   Los textos no afirman nada que no se vea en las piezas.
2. **Pipeline de medios** (`scripts/media/build.mjs`). Rama nueva para reels verticales:
   - Fotogramas 1080×1920.
   - Loop corto en WebM y MP4.
   - Imagen para compartir (OG).
   - Mismo patrón de `CASES` con tiempos elegidos a mano.
   - Los MP4 de más de 25 MiB van a R2, como las películas (`.assetsignore` + `NEXT_PUBLIC_FILM_BASE`).
3. **Vistas.**
   - `CaseRow` y la página de caso (`src/app/[locale]/trabajo/[slug]`) admiten una variante vertical: tira de 3–5 reels en móvil y en escritorio.
   - Reutilizar `FilmLoop`, `FilmPlayer` e `img()` de `src/lib/media.ts`.
4. **Trabajo** (`src/views/Work.tsx`): activar el filtro por línea, ahora que hay casos de varias áreas.
5. **Casos en orden:**
   1. Oceans (con material de su Instagram y web cuando lleguen los originales).
   2. Physem.
   3. Aurum.
   4. Alex Navarro.
   5. Los de eventos se mantienen.
   6. Vera y Sol y Luna no entran, por las marcas de agua de terceros.
6. **SEO:** JSON-LD `CreativeWork` y `VideoObject` por caso, sitemap e `llms.txt` actualizados.

**Puerta:** revisas la preview de Trabajo y de los casos.

---

## Fase 5. Implementar la Home nueva y el resto de páginas

1. **`src/content/story.ts`:** reescribir con el texto aprobado en la fase 3 (ES y EN).
2. **`src/views/Home.tsx`:** nueva secuencia de capítulos. Se reutilizan:
   - `StoryOpening`: nuevas frases e imagen con dirección de arte vertical y horizontal.
   - `StorySteps`: para el método, con 4 pasos en vez de 3.
   - `Lines` y `ChapterRail`: el número de capítulos sale de `chapters.length`.
   - `FilmLoop`.
3. **Componentes nuevos** en `src/components/story/`:
   - `LinesGrid`: las 4 líneas.
   - `Founder`: quién hay detrás.
   - `PacksStrip`: los packs en la Home.
4. **Páginas:**
   - **Estudio:** quién, método completo, equipo.
   - **Packs:** el método asociado a cada pack y CTA a WhatsApp con mensaje según el pack.
   - **Servicios:** 4 líneas y sus preguntas frecuentes.
5. **Rodajes personales:** solo en su página de servicio, no en la Home.
6. **Pruebas:**
   - Actualizar `scripts/qa/interact.mjs` con las frases de apertura, los 4 pasos, la tira de líneas y los mensajes de WhatsApp.
   - Pasar axe (accesibilidad) y capturas a 390, 430 y 1440 px.

**Puerta:** revisas la preview desplegada en workers.dev.

---

## Fase 6. Pestaña "Diario" (Instagram). Planificada, empieza cuando el cliente la active

Necesita del cliente: cuenta Profesional, app en Meta for Developers y R2 activado.

1. Worker con **Cron Trigger** cada hora. La API de Instagram (`graph.instagram.com/me/media`) devuelve las publicaciones; se guardan en **D1** (id, tipo, texto, fecha, permalink, línea, `hidden`).
2. **Copiar imagen y portada a R2**, porque las URLs de Instagram caducan.
3. **Renovar el token** de larga duración antes de los 60 días. El token va en un secreto del Worker y en KV.
4. **Clasificar por hashtags** acordados con el cliente. Si una publicación no lleva ninguno, queda "sin línea".
5. Página `/diario` (`/en/journal`), servida desde el Worker (no es estática):
   - Rejilla con filtros por línea y vista ampliada de cada pieza con "¿Quieres algo así?" → WhatsApp.
   - Tira de 4–6 publicaciones en la Home.
6. **Ocultar publicaciones:** columna `hidden` en D1, editable con `wrangler d1 execute`. Sin panel de administración, para no pagar ni mantener uno.
7. **Antes de conectar,** la página puede funcionar con un JSON estático de las piezas ya disponibles.

---

## Fase 7. Producción

Todo sigue en preview hasta que des la confirmación explícita.

1. **R2** (lo activas tú) → `wrangler r2 bucket create 24shoots-media` → `scripts/cloudflare/upload-films.sh` → `NEXT_PUBLIC_FILM_BASE` → volver a desplegar.
2. **Resend:** verificar `24shoots.es` (SPF y DKIM en DNS, con confirmación) → `wrangler secret put RESEND_API_KEY` → envío real a `info@24shoots.es`.
3. **Turnstile** (antispam gratuito de Cloudflare) en el formulario.
4. **Analítica Umami:**
   - Script con su ID en una variable de entorno.
   - Los `data-track` que ya existen se convierten en eventos de Umami: CTA, WhatsApp, apertura de casos, envío del formulario.
   - Quitar `@vercel/analytics` y `@vercel/speed-insights`.
5. **Legal:** datos del titular en `src/lib/site.ts`, revisión de la asesoría y teléfono confirmado.
6. **Dominio** (con confirmación):
   - `24shoots.es` a Cloudflare.
   - Asociar el Worker al dominio.
   - `SITE_ENV=production` (quita el noindex).
   - Redirigir `24shoots-web.vercel.app` y la V1 (decisión tuya, fuera del alcance hasta entonces).
7. **Merge a `main`:** solo cuando lo pidas.

---

## Fase 8. Crecimiento (después de producción)

- Google Business Profile, LinkedIn de empresa, `sameAs` en `src/lib/seo.ts`.
- Una landing por línea para anuncios en buscadores (SEM).
- Ampliar las preguntas frecuentes.
- Rendimiento: el bloqueo del hilo principal (TBT) mide 350 ms; revisar la hidratación de los componentes de la historia.
- Revisión mensual con los datos de Umami. Es el mismo "medir y ajustar" que vende 24SHOOTS.

---

## Lo que necesitamos del cliente, por fase

| Fase | Qué |
|---|---|
| 3 | Aprobar la narrativa · confirmar la frase de Javier |
| 4 | Originales sin logo (Oceans, Physem, Aurum, Alex Navarro) · qué se hizo y fechas · OK para "estrategia + contenido mensual" en Oceans y para el nombre de Alex |
| 5 | Foto de Javier y del equipo · contenido de cada pack y precio "desde" (opcional) · 1–2 testimonios · logo en SVG · OK para un ejemplo de método anonimizado |
| 6 | Cuenta Profesional · app de Meta · hashtags por línea |
| 7 | Activar R2 · cuenta de Resend · datos legales (nombre y domicilio) · revisión legal · cuenta de Umami · confirmación para DNS y dominio |

Aviso para el cliente: la V1 muestra `hola@24shootsmedia.com`, un dominio que no existe.

## Verificación (en cada fase con código)

1. `npm run lint && npm run typecheck && npm run build`.
2. `npm run cf:preview` en local (workerd), comprobando:
   - Rutas ES y EN, redirecciones.
   - `robots.txt` con `Disallow` en preview.
   - Formulario en modo de prueba.
3. `node scripts/qa/run.mjs --axe` (accesibilidad) y `node scripts/qa/interact.mjs` (interacciones): todo en verde.
4. Capturas a 390, 430 y 1440 px en `docs/`.
5. `npm run cf:deploy` a workers.dev y comprobación con curl de las rutas, el `noindex` y las imágenes.
6. Commit y push a `claude/confident-galileo-rgun26`. `docs/V2-PENDIENTES.md` se actualiza al cerrar cada fase.

## Siguiente acción si apruebas

Fase 3: escribir `docs/HOME-NARRATIVA-V3.md` con todos los textos y enviártelo para revisar. Sin tocar código.
