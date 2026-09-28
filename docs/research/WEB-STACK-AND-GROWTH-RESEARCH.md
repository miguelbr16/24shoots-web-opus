# 24SHOOTS — Web Stack & Growth Research (fase 2)

Rama: `claude/confident-galileo-rgun26` · Fecha: 28-09-2026 · Estado: **investigación. Sin cambios en la web**
Complementa a `CREATIVE-RESEARCH-REPORT.md` (fase 1), sin repetirlo.

**Regla de coste aplicada en todo el documento**
🟢 gratuito / open source · 🟡 freemium con un nivel gratuito suficiente (se explica qué limita) · 🔴 de pago (solo como comparativa; nunca en el stack).
Las herramientas que ya tenéis (Claude, Cursor, Lovable Pro, GitHub, Vercel, Cloudflare) se usan donde tienen sentido.

**Cómo se ha verificado**: los límites de los planes gratuitos se han comprobado en la documentación oficial o
en fuentes de septiembre de 2026 (ver *Fuentes* al final). Las versiones, licencias y descargas de las
librerías salen del registro npm, consultado el 28-09-2026. La API de GitHub está bloqueada desde este
entorno, así que en lugar de estrellas doy **descargas semanales en npm**, que miden mejor el uso real.
Behance (403) y X/Twitter (402, requiere sesión) **bloquean el acceso automatizado**. De esas dos
plataformas solo he visto lo que está indexado en buscadores. Lo digo explícitamente en cada sección
correspondiente.

---

## 1. Resumen ejecutivo

1. **La web de 24SHOOTS se puede construir y operar con 0 € al mes.** La pieza clave es Cloudflare:
   Workers Free (100.000 peticiones/día), R2 (10 GB y salida de datos gratuita), D1 (5 GB), Turnstile
   (ilimitado) y Web Analytics (sin cookies). A eso se suman Resend Free (3.000 emails/mes,
   100/día) y Umami Cloud Hobby (100.000 eventos/mes). Todo con alternativa open source si algún día
   hay que salir.
2. **Vercel Hobby no sirve para producción.** Sus condiciones prohíben el uso comercial, y la web
   de un estudio que vende servicios lo es. Vercel se queda como entorno de desarrollo y preview
   (tal como habíais decidido). La producción va a Cloudflare, que en su plan gratuito sí permite uso
   comercial.
3. **Hay que desacoplar tres cosas del proveedor desde ya**: (a) los **vídeos** (hoy están en `public/`:
   142 MB en total, unos 37 MB por película) pasan a R2; (b) el **formulario/leads** pasa a un
   *Worker* propio (`api.24shoots.es`) que funciona igual con la web en Vercel o en Cloudflare; y
   (c) la **optimización de imágenes** se genera en el pipeline (sharp/ffmpeg) y deja de depender de
   `next/image` en el servidor.
4. **Sobre el formulario, una corrección**: no es un `console.log`. `src/app/api/contact/route.ts`
   valida, tiene honeypot, trampa de tiempo, rate-limit y envía por Resend. **El problema real es otro**:
   no guarda el lead en ningún sitio (si falla el email, se pierde), el rate-limit vive en memoria,
   no hay Turnstile y, en preview, sin `RESEND_API_KEY` solo se registra (`CONTACT_DRY_RUN`) o
   devuelve un error 503. La sección 19 propone la arquitectura real.
5. **Analytics: un único sistema.** Umami (open source, sin cookies y por tanto sin banner, con eventos
   y funnels) + Google Search Console + Bing Webmaster. En Cloudflare se añade Web Analytics, que es
   gratis y automático, para Core Web Vitals. **No uso GA4 ni Clarity de entrada**: los dos obligan a
   poner banner de consentimiento, y Clarity lo exige en la UE desde el 31-10-2025.
6. **Vídeo a 0 €**: loops cortos en AV1 + H.264 con póster, y películas completas en **HLS estático
   generado por nuestro propio pipeline de ffmpeg**, alojado en R2 y reproducido con `hls.js`
   (Apache-2.0). Cloudflare Stream queda 🔴: no tiene plan gratuito.
7. **Lovable** (tenéis plan Pro) sirve para **explorar y comparar variantes rápido**, no para el código
   final. Se prototipa allí, se decide «sí/no» y se implementa con Claude/Cursor en este repo.
8. **Skills y MCPs**: pocas y medibles. De skills, `web-quality-skills` (Addy Osmani), la
   `web-design-guidelines` de Vercel y una o dos de `marketingskills` (CRO/copy). De MCPs, Chrome
   DevTools MCP y Playwright para QA; el MCP de Cloudflare cuando migremos. **No se instala nada todavía.**
9. **Dirección**: después de esta fase recomiendo una **E — Híbrida «24 fotogramas + sala»**. Toma de D
   la idea de los 24 fotogramas y el contador, y de A la sala de proyección para ver las piezas, con
   WebGL solo como capa opcional. Es la que mejor puntúa en negocio, móvil y rendimiento sin
   perder diferenciación (sección 36).

---

## 2. Investigación visual adicional (lo nuevo respecto a la fase 1)

Hay 16 referencias nuevas, fuera del circuito de productoras. En cada una: **WOW → utilidad → conversión →
complejidad → coste → riesgo**, valorados de 1 a 5 (en coste y riesgo, 1 = bajo).

| Referencia | Patrón que interesa | WOW | Util. | Conv. | Compl. | Coste | Riesgo | Uso para 24SHOOTS |
|---|---|---|---|---|---|---|---|---|
| **Twice** (twice.tv) | Separa Stories / Commercials / Personal: el portfolio ordenado por territorios | 3 | 5 | 4 | 1 | 1 | 1 | Modelo para dividir `/trabajo` en Eventos · Marca · Campañas |
| **Working Stiff Films** | Textura y transiciones experimentales entre piezas | 4 | 3 | 2 | 3 | 1 | 2 | Tomar la **transición entre piezas**, no la textura |
| **Grit Pictures** | Collage tipo «cuaderno» con bordes rotos | 4 | 2 | 2 | 2 | 1 | 2 | No: la estética choca con un cliente B2B |
| **First Frame** | Lenguaje de cine sobrio; el nombre como concepto | 3 | 4 | 3 | 1 | 1 | 1 | Confirma que funciona hacer del nombre el sistema, como en nuestra D |
| **Jens Bosman** | Cada proyecto a pantalla completa, fotográfico e inmersivo | 4 | 4 | 3 | 2 | 1 | 1 | Referencia para el **detalle de caso** |
| **Bindery** (NY) | Motion + diseño + sonido en un solo estudio | 3 | 4 | 3 | 2 | 1 | 1 | Cómo presentar servicios sin texto largo |
| **Phantom Studios** | Rejillas cinéticas en WebGL | 5 | 2 | 2 | 5 | 1 | 4 | Solo estudiar. Demasiado protagonismo técnico |
| **Andrew McCarthy** (portfolio) | Un único scroll largo de vídeos; nombre y rol se ensamblan con «scramble» | 4 | 4 | 3 | 2 | 1 | 2 | **Muy aplicable**: tira de vídeos + crédito animado |
| **Irene Butenko** (portfolio) | Tira de unas 20 miniaturas en el primer viewport | 3 | 5 | 4 | 1 | 1 | 1 | Valida la tira como hero, que es la idea de la D |
| **Mathilde De Chiara** (GSAP SOTD) | ScrollTrigger + SplitText + OGL + Lenis | 4 | 3 | 2 | 4 | 1 | 3 | Referencia del stack «ligero» OGL (no Three.js) |
| **Luke Baffait** (GSAP SOTW) | Indicador de scroll y microinteracciones muy cuidadas | 4 | 3 | 2 | 3 | 1 | 2 | Nuestro contador `07/24` es el indicador de scroll |
| **Dribbble: «Video Production Studio Portfolio»** (Desire Agency) | Bloque en forma de película; al pasar el ratón por una foto se reproduce el vídeo | 3 | 4 | 3 | 2 | 1 | 1 | Hover-to-play en escritorio; en móvil, reproducción al entrar en pantalla |
| **Behance: «Station Six — Cinematic Web & Motion»** (≈1.500 appreciations) | Web cinematográfica con motion | ? | ? | ? | ? | 1 | ? | No lo he podido abrir (Behance bloquea el acceso automatizado). Lo dejo en la lista de revisión manual |
| **Behance: «VYNN — Production Studio Website»** (≈500) | Web de productora | ? | ? | ? | ? | 1 | ? | Revisión manual |
| **Codrops: galería horizontal con paralaje, de DOM a WebGL** (feb-2026) | Primero DOM/CSS y después el mismo layout en WebGL | 4 | 5 | 3 | 3 | 1 | 2 | **Es el patrón técnico de la D/E**: mejora progresiva real |
| **Codrops: galería 3D que reacciona al scroll** (mar-2026) | La velocidad del scroll afecta a la imagen y el color del fondo cambia con el «mood» | 5 | 3 | 2 | 4 | 1 | 3 | Idea: el fondo toma el color dominante del fotograma activo |

**Qué se repite en todo lo anterior** (y confirma la fase 1):
- Las webs que venden dejan que **el trabajo sea la interfaz**. La tira o secuencia de piezas funciona
  a la vez como navegación y como prueba de trabajo.
- La **microinteracción que más vende es barata**: hover o entrada en pantalla → el vídeo se reproduce.
  No hace falta WebGL para conseguirla.
- Lo experimental (Phantom, Grit) gana premios, pero **convierte peor** en B2B.

## 3. Behance

- **Acceso**: HTTP 403 para herramientas automatizadas. Solo he visto títulos y cifras indexados.
- **Hallazgo**: en Behance, lo que más se aprecia en la categoría de productoras es de estética
  «cinematic dark UI» (Station Six, VYNN, Hoodyakov Production, SVOY). Son **conceptos** de diseño, no
  webs en producción, así que valen para dirección de arte y no como prueba de que convierten.
- **Lista para revisar a mano** (15 minutos con sesión iniciada): búsquedas `cinematic ui`,
  `production studio website`, `video production website`, `showreel website`. Hay que fijarse en cómo se
  presenta **un caso** (plano → crédito → vídeo → ficha), que es donde Behance es fuerte.
- **Veredicto**: 🟢 gratuito. Útil **para dirección de arte**, poco útil como referencia técnica.

## 4. Dribbble

- Más «shots» que webs. Útil para **heros y microinteracciones**.
- Encontrados: *Video production hero* (Kirill Epler), *Movie production company website hero*
  (Michal Ocilka) y *Video Production Studio Portfolio* (Desire Agency: bloque de película y
  hover-to-play).
- **Riesgo**: en Dribbble abunda el diseño que no aguanta contenido real (textos ideales, vídeos
  perfectos). Hay que validar cualquier idea **con nuestros fotogramas reales**.
- **Veredicto**: 🟢 gratuito. Sirve para hero y microinteracción, no para decidir la arquitectura.

## 5. X / Twitter

- **Acceso**: HTTP 402 / requiere sesión. Solo he visto posts indexados.
- **Cuentas que merece seguir** (gratis): `@greensock` (Site of the Day/Week con el stack de cada web:
  ScrollTrigger, SplitText, OGL, Lenis), `@codrops`, `@threejs`. Ahí aparecen las webs **con su stack
  desglosado**, algo que ninguna galería da.
- **Aviso**: en X circulan muchos *«mega-prompts para generar webs 3D con IA»*. Son ruido y
  producen justo la estética genérica que queremos evitar.
- **Veredicto**: 🟢 gratuito. Es la mejor fuente para **saber qué stack usa una web premiada**.

## 6. Codrops

La fuente técnica más útil de todas: tutoriales con código.
- *Creating a Smooth Horizontal Parallax Gallery: From DOM to WebGL* (19-02-2026). Vite + TS +
  Three.js. **Primero** DOM con `transform` y `lerp` y **después** el mismo layout con shaders, con
  el sistema de coordenadas sincronizado (1 px = 1 unidad). Se mantiene fluido a 60 fps con 10–15 imágenes;
  por encima de eso, IntersectionObserver para descartar lo que no está en pantalla.
  **Es el patrón exacto para la tira de 24 fotogramas.** Ojo: el artículo no indica licencia; hay que
  comprobarla en el repo antes de copiar código.
- *Scroll-Revealed WebGL Gallery* (GSAP + Three.js + Astro + Barba, 02-02-2026): reveals con
  shader al hacer scroll y transiciones entre páginas.
- *Scroll-Driven 3D Gallery con recorrido de cámara de Blender* (07-07-2026): espectacular, pero
  con un coste de producción alto. **No aplica.**
- *Scroll-Reactive 3D Gallery* (09-03-2026): fondo que cambia de color según el «mood» de la imagen.
- **Veredicto**: 🟢 gratuito. **Estudiar**; copiar solo lo que tenga una licencia compatible.

## 7. GitHub / open source (visión general; el detalle está en §14–§30)

Métricas de npm del 28-09-2026: versión, fecha de publicación, licencia, descargas/semana.

| Paquete | Versión (fecha) | Licencia | Descargas/sem | Estado | Uso |
|---|---|---|---|---|---|
| `gsap` (+ScrollTrigger, SplitText, Flip) | 3.15.0 (abr-2026) | «Standard no-charge» (gratis incluso con fines comerciales; **no** es OSI) | 5,8 M | Mantenido | **Usar** |
| `lenis` | 1.3.26 (ago-2026) | MIT | 1,7 M | Mantenido | Opcional, solo escritorio |
| `motion` (antes Framer Motion) | 13.4.4 (sep-2026) | MIT | 24,9 M | Muy activo | Microinteracciones de UI si hacen falta; **no duplicar con GSAP** |
| `three` | 0.186.1 (sep-2026) | MIT | 19,4 M | Muy activo | Solo si se hace la capa WebGL |
| `ogl` | 1.0.11 (ene-2025) | Unlicense | 0,74 M | Estable, poca actividad | Alternativa ligera a Three para una textura de vídeo |
| `@react-three/fiber` + `drei` | 9.8.1 / 10.7.9 | MIT | 6,1 M / 4,4 M | Muy activo | No: demasiado para lo que necesitamos |
| `hls.js` | 1.7.3 (sep-2026) | Apache-2.0 | 10 M | Muy activo | **Usar** para las películas en HLS |
| `media-chrome` | 4.19.2 (jun-2026) | MIT | 4,4 M | Activo | Controles de reproductor accesibles (web components) |
| `@vidstack/react` | 0.6.15 (abr-2024 en `latest`) | MIT | 0,36 M | Etiqueta npm desfasada | Solo como referencia |
| `lite-youtube-embed` | 0.3.4 (nov-2025) | Apache-2.0 | 91 k | Estable | Plan B si alguna pieza vive en YouTube |
| `sharp` | 0.35.5 (sep-2026) | Apache-2.0 | 114 M | Muy activo | **Usar** en el pipeline (AVIF/WebP/JPG por tamaños) |
| `thumbhash` | 0.1.1 (2023) | MIT | 0,69 M | Terminado (estable) | Placeholders de 25 bytes |
| `web-vitals` | 6.2.2 (sep-2026) | Apache-2.0 | 49 M | Muy activo | **Usar**: CWV de campo → analytics |
| `zod` / `valibot` | 4.6.5 / 1.5.0 | MIT | 336 M / 22 M | Muy activo | Validación compartida entre cliente y Worker (valibot pesa menos) |
| `hono` | 4.13.10 (sep-2026) | MIT | 72 M | Muy activo | **Usar** en el Worker de leads (funciona en Workers, Node y Vercel) |
| `drizzle-orm` | 0.45.3 | Apache-2.0 | 27 M | Muy activo | Opcional: SQL tipado sobre D1 (para una tabla basta SQL a mano) |
| `@marsidev/react-turnstile` | 1.6.1 (ago-2026) | MIT | 2,5 M | Activo | Widget de Turnstile |
| `@opennextjs/cloudflare` | 1.20.6 (sep-2026) | MIT | 1,5 M | Muy activo | **Usar** para desplegar Next en Workers |
| `wrangler` | 4.142.0 (sep-2026) | MIT/Apache | 25,8 M | Muy activo | CLI de Cloudflare |
| `@playwright/test` | 1.63.0 (sep-2026) | Apache-2.0 | 72 M | Muy activo | **Usar** (ya lo usamos en scripts de QA) |
| `@axe-core/playwright` | 4.13.0 (ago-2026) | MPL-2.0 | 12 M | Muy activo | **Usar** |
| `@lhci/cli` | 0.15.1 (jun-2025) | Apache-2.0 | 1,7 M | Mantenido, poco activo | Lighthouse en CI con presupuestos |
| `vitest` | 5.0.2 (sep-2026) | MIT | 120 M | Muy activo | Tests unitarios (validación, i18n, eventos) |
| `schema-dts` | 2.0.0 (mar-2026) | Apache-2.0 | 3,2 M | Activo | Tipado del JSON-LD |
| `satori` / `@vercel/og` | 0.33.5 / 1.0.3 | MPL-2.0 | 4,2 M / 2,2 M | Activo | OG dinámicas. **No hacen falta**: las generamos con ffmpeg |
| `posthog-js` | 1.434.16 | Apache/MIT | 16,6 M | Muy activo | Alternativa a Umami (ver §23) |
| `@sentry/nextjs` | 11.0.0 | MIT (SDK) | 11,8 M | Muy activo | SDK compatible con GlitchTip |
| `@react-email/components` | 1.0.12 | MIT | 7,3 M | **DEPRECATED** | **No usar** así; un email en texto/HTML simple basta |
| `@studio-freight/lenis` | 1.0.42 | MIT | — | **DEPRECATED** (ahora `lenis`) | No usar |
| `curtainsjs` | 8.1.6 (2024) | MIT | 1,6 k | Casi abandonado | No usar |
| `@14islands/r3f-scroll-rig` | 8.15.0 (dic-2024) | ISC | 594 | Poco uso | No usar |
| `next` | **16.3.6** (sep-2026) | MIT | 67 M | — | Estamos en 15.5. Hay que planificar la subida a 16 (OpenNext soporta ambas) |

## 8. Creative coding: qué técnica usar para qué

| Efecto | Técnica gratuita | Coste en rendimiento | ¿Lo necesitamos? |
|---|---|---|---|
| Revelar imagen/vídeo con máscara | CSS `clip-path` + `animation-timeline: view()` | Casi nulo | **Sí** (entrada de cada fotograma) |
| Tipografía cinética / scramble del crédito | GSAP SplitText o 30 líneas de JS | Bajo | **Sí** (crédito que «se monta») |
| Contador / timecode ligado al scroll | ScrollTrigger `onUpdate` o scroll-driven CSS | Nulo | **Sí** (`07/24`) |
| Hover-to-play / play al entrar en pantalla | IntersectionObserver + `<video>` | Bajo | **Sí** |
| Transición de fotograma a caso | View Transitions API (Chrome, Safari 18.2+) + GSAP Flip de respaldo | Bajo | **Sí** |
| Distorsión o desplazamiento en hover | Shader en OGL o Three.js | GPU y batería | Opcional, solo escritorio |
| Grano/halación de película | Shader | GPU constante | **No**: el grano ya está en el metraje |
| Fondo con el color del fotograma | Color dominante calculado **en build** (sharp) y guardado en JSON | Nulo | **Sí**: da atmósfera sin coste |
| Cursor personalizado | JS | Bajo | No: resta accesibilidad y no aporta en B2B |
| Secuencia de imágenes que se «frota» con el scroll | Canvas + 24 AVIF | 1–2 MB | Opcional: un solo momento y solo en escritorio |

## 9. Skills (Claude Code / agentes)

Criterio: **qué problema de 24SHOOTS resuelve**. Todas son 🟢 gratuitas (texto open source que se carga
en el agente). No añaden dependencias al código de la web.

| Skill | Qué hace | Problema de 24SHOOTS | Cuándo | ¿Merece la pena? |
|---|---|---|---|---|
| `frontend-design` (Anthropic, ya disponible) | Criterios contra el diseño «genérico de IA» | Ya detectó la paleta crema/terracota | En cada iteración visual | 🟢 **Sí** (ya se usa) |
| `web-quality-skills` (addyosmani, 🟢 OSS) | Auditorías tipo Lighthouse: CWV, WCAG 2.2, SEO, buenas prácticas, con arreglos priorizados | Rendimiento con mucho vídeo; accesibilidad del scroll | Antes de cada merge | 🟢 **Sí** |
| `web-design-guidelines` (vercel-labs/agent-skills, 🟢 OSS) | Más de 100 reglas de interfaz: foco, formularios, animación, touch, i18n | Calidad de microinteracción y formularios en ES/EN | Revisión de UI | 🟢 **Sí** |
| `react-best-practices` (vercel-labs) | 70 reglas de rendimiento para React/Next | Bundle y waterfalls con GSAP y vídeo | Revisión de código | 🟡 Útil |
| `marketingskills` (coreyhaines31, 🟢 OSS, ≈45 k★): **solo** `cro`, `copywriting`, `seo-audit`, `analytics-tracking` | Marcos de CRO, copy, SEO y plan de tracking | Convertir sin llenar la web de texto; definir eventos | Al escribir copy y el plan de medición | 🟡 **Sí, pero solo esas 4** de las ~50 |
| `webapp-testing` (Anthropic) | Probar la web con Playwright | Ya tenemos scripts propios de QA | — | 🔴 Duplicaría lo que ya hay |
| `security-review`, `code-review`, `simplify` (ya disponibles) | Revisión del diff | Formulario/Worker de leads | Antes de publicar el backend | 🟢 Sí |
| `artifact-design` / `dataviz` (ya disponibles) | Informes visuales y dashboards | Informe mensual de analytics | Mensual | 🟡 Útil |
| Skills de «generar webs 3D con un prompt» (X, marketplaces) | — | — | — | 🔴 No: producen justo el cliché |

## 10. MCPs

Para cada uno: función → problema → beneficio → coste → complejidad → dependencia → decisión.

| MCP | Función | Problema que resuelve | Coste | Complejidad | Dependencia | Decisión |
|---|---|---|---|---|---|---|
| **GitHub** (ya conectado) | Ramas, commits, PRs | Flujo de trabajo en la rama | 🟢 | Baja | Ninguna nueva | 🟢 NECESARIO |
| **Lovable** (ya conectado, plan Pro) | Crear e iterar prototipos | Explorar direcciones rápido | 🟢 incluido en vuestro plan | Baja | Solo en la fase de prototipo | 🟢 NECESARIO en prototipado |
| **Vercel** (ya conectado) | Deployments y logs de preview | Revisar previews | 🟢 | Baja | Solo dev | 🟡 ÚTIL (nada de producción) |
| **Chrome DevTools MCP** (Google, 🟢 OSS) | Traza de rendimiento (LCP/CLS con desglose) + Lighthouse (a11y/SEO/buenas prácticas) | Medir de verdad el peso del vídeo y el LCP | 🟢 | Baja | Chrome local | 🟢 NECESARIO en QA |
| **Playwright MCP** (Microsoft, 🟢 OSS) | Controlar el navegador desde el agente | QA interactivo | 🟢 | Baja | — | 🟡 ÚTIL: ya tenemos scripts Playwright |
| **Cloudflare MCP servers** (🟢 OSS) | Bindings, D1, R2, observabilidad de Workers | Operar la migración y consultar leads/logs | 🟢 | Media | Cloudflare | 🟢 NECESARIO **al migrar** |
| **Notion** (ya conectado) | Tablero de decisiones «sí/no» e informes | Registro de decisiones | 🟢 | Baja | — | 🔵 OPCIONAL |
| **Figma MCP** | De diseño a código | No usáis Figma como fuente | 🔴 El plan Starter tiene **6 llamadas/mes** (inservible); hace falta asiento de pago | — | — | 🔴 NO MERECE LA PENA |
| **Google Analytics MCP** (oficial, OSS) | Consultar GA4 | Solo si usamos GA4, y no lo recomiendo | 🟢 | Media | Google | 🔴 No por ahora |
| MCP de **Search Console** (comunitarios) | Consultas de rendimiento de búsqueda | Informe SEO mensual | 🟢 | Media | Paquetes no oficiales | 🔵 EXPERIMENTAL |
| **Resend MCP** | Enviar emails desde el agente | Nada que no haga el Worker | 🟢 | Baja | — | 🔴 No |
| **Supabase MCP** | Gestionar la BD | Solo si se elige Supabase (no se recomienda) | 🟢 | — | — | 🔴 No |
| **Sentry MCP** | Consultar errores | Solo con Sentry | 🟡 | — | — | 🔵 Si se usa Sentry |

## 11. Conectores (pipeline diseño → código → testing → analytics → mejora)

```
Lovable (explorar) ──> decisión «sí/no» ──> Claude/Cursor (implementar en GitHub)
     ▲                                             │
     │                                  Playwright + axe + Lighthouse CI + Chrome DevTools MCP
     │                                             │
     └── hipótesis <── informe mensual <── Umami (eventos) + Search Console + CF Web Analytics
```
**Todos son 🟢.** No hace falta Zapier ni Make (🔴/🟡): el Worker de leads envía un webhook
opcional cuando haga falta un CRM.

## 12. Plugins

- **Claude Code plugins/marketplace**: el único que merece la pena es *Chrome DevTools* (el MCP de §10).
- **Next.js**: no hacen falta plugins de terceros para sitemap/robots/metadata; Next ya los genera
  (y el repo ya lo hace).
- **Tailwind**: v4 ya cubre lo necesario. **No** añadir librerías de componentes (shadcn/ui, etc.) a
  la web final: nos llevan al look de plantilla. En Lovable, en cambio, vienen por defecto.
- **VS Code/Cursor**: Tailwind IntelliSense, ESLint y axe Linter (🟢).

## 13. Lovable / Lovable AI

**Situación**: workspace «miguelbr's Lovable», **plan Pro**, 1 proyecto. El plan gratuito serían 5
créditos al día (máximo 30/mes) y no incluye Dev Mode ni exportar código; con Pro ambas cosas están
disponibles.

**Qué aporta de verdad**
1. **Velocidad de exploración**: un hero o layout completo en minutos, con preview compartible por
   URL para decidir con el equipo desde el móvil.
2. **Comparar variantes lado a lado**: un proyecto por dirección (A, D, E) con **los mismos fotogramas
   reales**.
3. **Visual edits**: ajustar espaciado y tipografía sin tocar código para acordar el «tono».
4. **Conocimiento de proyecto** (*project knowledge*): cargar reglas fijas (sin crema ni terracota,
   solo material real, email `info@24shoots.es`, no inventar nada) para que no se desvíe.

**Cuándo usarlo**: validar **concepto, ritmo y composición**, sobre todo en móvil.

**Qué NO merece la pena hacer en Lovable**
- El código final. Lovable genera Vite + React + shadcn con su backend por defecto; nuestra web es
  Next.js con SSG, i18n, SEO y un pipeline de media. Migrar ese código cuesta más que reescribir.
- Backend, formularios, base de datos (Lovable Cloud/Supabase): crearían una dependencia que no queremos.
- Microajustes de rendimiento, accesibilidad o SEO.
- Cualquier cosa con vídeo pesado: subir 140 MB a Lovable no tiene sentido. Mejor fotogramas + 2–3 loops.

**Workflow propuesto (el más eficiente)**
1. Claude prepara un **paquete de prototipo**: 24 fotogramas elegidos (JPG de 1600 px), 3 loops de
   ≤ 2 MB, copy real ES y las reglas del proyecto.
2. Lovable: **un proyecto por dirección**, 2–3 iteraciones como máximo en cada uno. Lovable no es
   el sitio donde pulir.
3. Revisión en móvil real (390/430) y en escritorio (1440). Decisión «sí/no» **por elemento** (hero,
   tira, crédito, transición, CTA).
4. Claude/Cursor implementan lo aprobado **en esta rama**, en `/lab/*`, con QA. De Lovable solo se
   copian ideas y, como mucho, CSS puntual.
5. Coste: créditos del plan Pro que ya pagáis. Nada nuevo.

## 14. Frontend

| Decisión | Herramienta | Estado | Por qué |
|---|---|---|---|
| Framework | **Next.js** (App Router, SSG) | 🟢 IMPRESCINDIBLE | Ya construido; SSG = HTML estático, rápido y portable |
| Versión | 15.5 → **16.x** | 🟡 RECOMENDADO antes de migrar | OpenNext soporta 15 y 16; mejor migrar ya en la versión que vamos a mantener |
| Estilos | Tailwind v4 + tokens | 🟢 | Ya está hecho; se cambian solo los tokens de color |
| Componentes | Propios, sin librería de UI | 🟢 | La identidad no admite plantilla |
| JS en cliente | Mínimo: islas `"use client"` solo para la tira, el reproductor y el formulario | 🟢 | INP y batería en móvil |
| Imágenes | Derivadas en build y `<picture>` con AVIF/WebP/JPG | 🟢 | Quita la dependencia del optimizador de imágenes del proveedor |

## 15. Animación

- **GSAP 3.15 (gratis, con todos los plugins)** como motor único para la secuencia: ScrollTrigger,
  SplitText, Flip. **No** mezclar con Motion en la misma vista.
- **CSS scroll-driven** para revelados simples. Es mejora progresiva: si no hay soporte, el contenido
  se ve estático, nunca oculto (es la lección del bug de `Reveal`).
- **Lenis** solo en escritorio y nunca con `prefers-reduced-motion`.
- **Reglas**: animar solo `transform`/`opacity`/`clip-path`; nada de `pin` en iOS (en móvil, scroll-snap
  nativo); con `prefers-reduced-motion` se muestra el estado final sin animación.

## 16. Vídeo: estrategia específica para 24SHOOTS (0 €)

**Punto de partida**: 5 películas de 53–94 s (≈ 7,2 min en total), unos 37 MB por película (≈ 3,3 Mbps),
más previews de ~1 MB (AV1 + H.264) y un montaje del hero en 16:9 y 4:5. En total, 142 MB en `public/`.

**Tres usos y tres tratamientos**

| Uso | Formato | Objetivo de peso | Carga |
|---|---|---|---|
| **Póster** (siempre) | AVIF + WebP + JPG, 3 anchos (640/1280/1920) + thumbhash | 40–120 kB | Inmediata: es el LCP |
| **Loop** (tira, hero, tarjetas) | 2–4 s, sin audio. **AV1 (WebM)** + **H.264 (MP4)** de respaldo. 540p en móvil y 720p en escritorio. `-g 24`, `faststart` | 250 kB–1 MB | `preload="none"`, arranca al entrar en pantalla (IntersectionObserver), pausa al salir |
| **Película completa** (caso) | **HLS estático** (CMAF/fMP4) con 3 calidades: 540p ≈ 1,2 Mbps, 720p ≈ 2,5 Mbps, 1080p ≈ 5 Mbps. Segmentos de 4 s. Audio AAC 128 kb/s | Adaptativo | Solo al pulsar play; `hls.js` (Safari usa HLS nativo) |

**Reglas de reproducción**
- `muted playsinline autoplay loop` solo en los loops. Con `prefers-reduced-motion` o
  `navigator.connection.saveData`, **no hay autoplay**: se muestra el póster con un botón de play.
- Como mucho **dos loops reproduciéndose a la vez** en móvil (el activo y el siguiente).
- Nunca `preload="auto"` en películas.
- Subtítulos/transcripción (VTT) en las películas con voz: mejora accesibilidad y SEO.

**Dónde alojar (comparativa)**

| Opción | Coste | Límite relevante | Veredicto |
|---|---|---|---|
| `public/` en Vercel (actual) | Hobby 0 € | **Hobby prohíbe el uso comercial**, y el ancho de banda tiene límite: 100 GB ≈ 2.700 reproducciones completas de 37 MB | 🔴 para producción |
| **Cloudflare R2** + dominio propio (`media.24shoots.es`) | 🟢 0 € hasta 10 GB almacenados, 1 M escrituras y 10 M lecturas al mes. **Salida de datos gratis** | Con dominio propio, las lecturas servidas desde la caché no cuentan como operaciones. Las condiciones de Cloudflare **permiten servir vídeo por la CDN si está alojado en R2** | 🟢 **ELEGIDO** |
| Cloudflare Stream | 🔴 5 $/1.000 min almacenados + 1 $/1.000 min entregados. **Sin plan gratuito** | — | Solo como evolución futura si el volumen lo exigiera |
| YouTube sin listar + `lite-youtube-embed` | 🟢 | Marca de YouTube, vídeos recomendados al final, cookies (hay que usar `youtube-nocookie`) | 🔵 Plan B para piezas largas |
| Vimeo Free | 🟡 | Límites de subida y marca visible | 🔴 |
| Bunny Stream y otros | 🔴 | — | No |

**Pipeline** (ampliación de `scripts/media/build.mjs`, **no implementado todavía**): añadir la salida HLS
(`ffmpeg -f hls -hls_segment_type fmp4 -hls_time 4` en 3 calidades), pósters multi-ancho con
sharp, thumbhash y color dominante. Después, `wrangler r2 object put` (o `rclone`, 🟢) para subir a R2.
Todo reproducible a partir de `film.mp4`: si llega un máster mejor, basta con volver a ejecutarlo.

**Estimación de R2**: 5 películas × (3 calidades HLS + MP4 de descarga) ≈ 0,5 GB; loops y pósters
< 100 MB. **Usaríamos un 6 % del plan gratuito.**

## 17. Imagen

- **Generar en build y no en el servidor**: sharp → AVIF (calidad ~50), WebP (~75) y JPG (~80) en
  640/1080/1600/1920 px. `<picture>` con `srcset`/`sizes`. Así evitamos depender de `next/image`
  en el servidor: en Cloudflare, esa optimización pasaría por Cloudflare Images (el plan gratuito da 5.000
  transformaciones únicas al mes y, si se superan, las nuevas devuelven error).
- **LCP**: el primer fotograma lleva `fetchpriority="high"` y `preload` con media query (ya hecho para los
  pósters del hero).
- **Placeholder**: thumbhash o el color dominante de fondo. Nada de «blur» pesado.
- **CLS**: `width`/`height` o `aspect-ratio` siempre explícitos.
- **Recortes** 16:9, 4:5 y 9:16 decididos a mano por fotograma (`cropX`, como ya hace el pipeline).
  Picsart Pro es opcional para retoques puntuales, no forma parte del stack.

## 18. Backend

**Principio**: la web es estática. El único backend es **un Worker de leads**, independiente
del hosting de la web.
- **Hono** (MIT) sobre Cloudflare Workers Free: 100.000 peticiones/día y 10 ms de CPU por petición.
  Lo que dura esperar a la respuesta de Resend o D1 no cuenta como CPU, así que el límite sobra para un
  formulario.
- Se despliega en `api.24shoots.es` (o en `24shoots.es/api/*` mediante una ruta de Cloudflare).
- **Funciona igual si la web sigue en Vercel**: el formulario hace `POST` a la URL del Worker. Con
  eso queda desacoplado desde el primer día.

## 19. Formularios

**Estado actual (real)**: validación, honeypot, trampa de tiempo (2,5 s), rate-limit en memoria,
comprobación de `Origin`, alternativa sin JS (303) y envío por Resend. **Qué le falta**: guardar el
lead, un anti-spam robusto, un rate-limit persistente, confirmación al usuario y trazabilidad.

**Flujo propuesto**
```
Usuario → <form> (funciona sin JS; con JS: fetch + estados)
  → Turnstile (widget invisible/managed, 🟢 ilimitado)
  → Worker /lead
      1. Límite de tamaño + Origin permitido (24shoots.es, previews)
      2. Validación con esquema compartido (valibot/zod) — el mismo que usa el cliente
      3. Honeypot + tiempo mínimo
      4. Turnstile siteverify (servidor)
      5. Rate-limit por IP con hash (tabla D1 o binding de Rate Limiting de Workers)
      6. INSERT en D1  ← el lead queda guardado ANTES de notificar
      7. Resend → info@24shoots.es (reply-to = cliente)
      8. (opcional) Resend → acuse al cliente, solo si Turnstile ha pasado
      9. (opcional) webhook → CRM futuro
      10. Respuesta: JSON o 303 → /contacto?enviado=1
  → evento analytics `contact_success` (sin datos personales)
```
Si Resend falla, **el lead ya está en D1** y el Worker marca `notified=0`. Un *Cron Trigger* (🟢
incluido en Workers Free) reintenta cada hora.

## 20. Leads

- **Esquema mínimo** (tabla `leads`): `id`, `created_at`, `locale`, `name`, `email`, `company`, `type`,
  `pack`, `date_hint`, `message`, `source_page`, `utm_source/medium/campaign`, `notified`,
  `status` (nuevo/contactado/ganado/perdido), `consent_version`.
- **UTM de primer toque**: se guardan en `sessionStorage` al llegar y se envían con el formulario, sin
  cookies.
- **Acceso**: al principio, consultas desde el panel de D1 o con `wrangler d1 execute`. Más adelante, una
  página `/admin` protegida con **Cloudflare Access** (🟢 gratis hasta 50 usuarios).
- **CRM**: todavía no. Cuando lo haya, se añade un webhook desde el Worker (HubSpot Free 🟡, Notion 🟢 o
  Google Sheets 🟢).

## 21. Base de datos

| Opción | Coste 0 € | Seguridad | Mantenimiento | Privacidad/GDPR | Cloudflare | Veredicto |
|---|---|---|---|---|---|---|
| **Cloudflare D1** | 🟢 5 GB, 5 M lecturas y 100 k escrituras al día. Desde el 1-9-2026, si se supera el límite diario **falla** (no cobra) | Binding privado, sin credenciales expuestas | Casi nulo; no se pausa | *Location hint* `weur` (Europa occidental) | Nativo | 🟢 **ELEGIDO** |
| Supabase Free | 🟡 500 MB; el proyecto **se pausa por inactividad** | Buena (RLS) | Riesgo real: un formulario con poco tráfico puede encontrarse la BD pausada | Región UE disponible | Externo | 🔴 para este caso |
| Cloudflare KV | 🟢 | — | — | — | Nativo | 🔴 No es una BD relacional |
| Google Sheets vía API | 🟢 | Credenciales de servicio | Frágil | Google | Externo | 🔵 Solo como copia o CRM ligero |
| Neon/Turso Free | 🟡 | Buena | Bajo | UE posible | Externo | 🔵 Alternativa si D1 no encajara |

Un formulario B2B genera como mucho unas decenas de filas al mes. **D1 va a estar siempre muy por debajo de sus límites.**

## 22. Email

- **Resend Free** 🟡: 3.000 emails al mes, **100 al día**, 1 dominio y 30 días de retención. Al llegar
  al límite, los envíos se pausan (no cobra). Da **de sobra** para avisos de lead (x1) más el acuse al
  cliente (x2).
  Hace falta verificar `24shoots.es` (SPF/DKIM) y, con el dominio en Cloudflare, poner DMARC con `p=none` al
  principio.
- **Alternativa sin coste ni proveedor**: *Email Routing* de Cloudflare (🟢) para **recibir** en
  `@24shoots.es` y reenviar al buzón actual. No sirve para enviar desde el Worker a cualquier dirección,
  así que Resend sigue siendo el emisor.
- **Plantilla**: texto + HTML mínimo (como hoy). **No** usar `@react-email/components` (deprecated).
- GDPR: Resend es un encargado de tratamiento en EE. UU.; hay que citarlo en la política de privacidad
  (DPA disponible).

## 23. Analytics

**Principio**: un único sistema de producto más las herramientas gratuitas de los buscadores.

| Herramienta | Coste | Cookies/banner | Eventos y funnels | Decisión |
|---|---|---|---|---|
| **Umami Cloud Hobby** | 🟡 100 k eventos/mes, 3 sitios, 6 meses de retención, funnels, UTM, journeys, export. Open source (MIT): si algún día no basta, se puede autoalojar | **Sin cookies → sin banner** | Sí | 🟢 **ELEGIDO** |
| PostHog Cloud EU | 🟡 1 M eventos/mes, 5 k grabaciones de sesión, modo sin cookies | Las grabaciones requieren consentimiento | Sí, más potente | 🔵 Alternativa si hacen falta grabaciones o heatmaps. Script más pesado |
| Cloudflare Web Analytics | 🟢 | Sin cookies | **No** (sin eventos personalizados) | 🟢 Complemento automático para CWV **al migrar** |
| Google Search Console | 🟢 | — | — | 🟢 IMPRESCINDIBLE |
| Bing Webmaster Tools | 🟢 | — | — | 🟢 Recomendado: alimenta Copilot y búsquedas con IA que usan Bing |
| GA4 | 🟢 | **Banner y Consent Mode obligatorios** | Sí | 🔴 Por ahora. Solo si se lanzan Google Ads |
| Microsoft Clarity | 🟢 | **Consentimiento obligatorio en EEE/UK/CH desde el 31-10-2025** | Heatmaps y grabaciones | 🔵 Solo en fase de CRO, con banner y durante un periodo acotado |
| Plausible Cloud | 🔴 | — | — | Solo el autoalojado (AGPL) sería 🟢, pero exige mantener un servidor |
| Vercel Analytics (actual) | Solo Vercel | Sin cookies | Limitado | 🔴 Se retira al migrar (lock-in) |
| Sentry | 🟡 5 k errores/mes, 1 usuario | — | — | Ver §30 |

**Presupuesto de eventos**: con ~3.000 visitas/mes × ~8 eventos útiles ≈ 24 k/mes. Holgado dentro de 100 k.
Si se superara, se autoaloja Umami o se pasa a PostHog.

## 24. SEO

**Lo que ya existe**: metadata, hreflang ES/EN, canonical, sitemap, robots, OG por caso, JSON-LD
`ProfessionalService` y `VideoObject`, `llms.txt`, redirecciones 301 desde V1.

**Lo que genera negocio de verdad** (en orden):
1. **Google Business Profile** 🟢: es el canal local nº 1 para «productora audiovisual Valencia». Categoría,
   zona de servicio, fotos reales de los 5 trabajos y enlace a `/contacto`. Hay que confirmar la dirección
   o el área de servicio (**pendiente**: datos legales en `V2-PENDIENTES`).
2. **Páginas de servicio con intención clara**, una por territorio (ya existen). Cada una necesita un
   H1 que responda a la búsqueda, 2–3 casos reales como prueba y un CTA. Keywords candidatas (sin datos
   de volumen todavía; se validarán con Search Console y el planificador gratuito de Google Ads):
   *vídeo eventos corporativos Valencia*, *productora vídeo corporativo Valencia*, *contenido
   audiovisual para marcas*, *vídeo resumen evento empresa*, *cobertura audiovisual congresos/galas*.
3. **Cada caso como una página que se pueda indexar**: `VideoObject` completo (miniatura, duración,
   `uploadDate` real, `contentUrl`/`embedUrl`), transcripción o descripción breve y cliente con su
   permiso (**pendiente**: permisos de nombre, ver `V2-PENDIENTES`).
4. **Sitemap de vídeo** (extensión `video:`) para que Google indexe las películas.
5. **Técnico**: CWV en verde en móvil, cero enlaces rotos, redirecciones 301 conservadas en la migración
   (en Cloudflare, `_redirects` o reglas de Worker) e IndexNow mediante *Crawler Hints* de
   Cloudflare (🟢).

**Lo que NO hace falta**: blog, artículos de relleno ni «SEO de texto largo» en la Home.

## 25. AEO / GEO (respuestas de IA)

- **Datos verificables y consistentes** en todas partes: nombre, qué hacéis, dónde, contacto y
  clientes reales. Son los mismos en la web, Google Business Profile, LinkedIn e Instagram.
- **Un bloque de «ficha» por caso** (cliente, formato, fecha, rol de 24SHOOTS y partner si lo hubo,
  como MAS Events): frases cortas que una IA pueda citar sin inventar nada.
- `llms.txt` (ya existe) actualizado con los servicios y casos.
- **Un FAQ breve por página de servicio** (3–4 preguntas reales: plazos de entrega, formatos,
  desplazamiento, derechos de uso), con `FAQPage` en JSON-LD. Es texto útil, no relleno.
- Bing Webmaster Tools: parte de las búsquedas con IA tira de ese índice.

## 26. CRO

Qué convierte en un estudio B2B sin llenar la web de texto:
1. **La prueba antes que la promesa**: el trabajo real en los primeros 3 segundos (la tira).
2. **Un CTA principal y uno secundario, siempre los mismos**: «Hablemos» (formulario) y
   email/WhatsApp. El teléfono está **pendiente de confirmar** antes de publicarlo.
3. **Formulario corto**: nombre, email, empresa, tipo (Evento/Marca/Campaña), fecha aproximada y
   mensaje. El pack se precarga con `?pack=` (ya existe).
4. **Reducir el riesgo percibido junto al CTA**: qué pasa después («Te respondemos con una propuesta»).
   Cualquier promesa de plazo, por ejemplo «en 24 h» (encajaría con la marca), **solo si es verdad y la
   confirmáis**.
5. **Contexto de confianza**: nombres de clientes reales y el partner MAS Events donde corresponda. Sin
   testimonios inventados. Si los conseguís de verdad, una cita corta por caso.
6. **Móvil**: CTA fijo discreto en la parte inferior después del primer tercio del scroll, y `mailto:`
   y `wa.me` con un mensaje predefinido.
7. **Experimentos** (cuando haya tráfico suficiente): no hacer A/B con pocas visitas. Mejor un cambio,
   un periodo y comparar el funnel (§35).

## 27. Performance (presupuesto)

| Métrica (p75 móvil) | Objetivo |
|---|---|
| LCP | ≤ 2,0 s (el póster del primer fotograma) |
| CLS | ≤ 0,05 |
| INP | ≤ 150 ms |
| JS inicial | ≤ 120 kB gz (GSAP ≈ 45–60 kB incluido) |
| Peso del primer viewport | ≤ 400 kB sin contar el loop, que llega después |

**Herramientas**: Lighthouse CI con presupuestos en cada PR, `web-vitals` → Umami (datos de campo) y
Chrome DevTools MCP para trazas.

## 28. Seguridad

- **Cabeceras**: se mantienen las actuales y se añade una **CSP** estricta (self + `challenges.cloudflare.com`
  para Turnstile + el dominio de analytics + `media.24shoots.es`) y HSTS al tener dominio.
- **Worker**: lista de orígenes permitidos, límite de tamaño, validación de esquema, Turnstile, rate-limit y
  escapado en el email. Los secretos van en `wrangler secret`, nunca en el repo.
- **Datos personales**: solo los necesarios; retención de **12 meses** y después borrado (con un Cron
  Trigger). La política de privacidad se actualiza con D1, Resend y Umami.
- **Repo**: la purga del historial de git queda pendiente y **solo con vuestra confirmación**.
- Revisión con la skill `security-review` antes de publicar el backend.

## 29. Testing

| Capa | Herramienta | Estado |
|---|---|---|
| Unitario (validación, i18n, eventos) | Vitest | 🟡 Añadir |
| E2E + responsive (390/430/768/1024/1440) | Playwright (`scripts/qa/*` ya existe) | 🟢 Ya hecho → pasarlo a CI |
| Accesibilidad | `@axe-core/playwright` | 🟢 Ya hecho (`--axe`) |
| Rendimiento | Lighthouse CI con presupuestos | 🟡 Añadir |
| Regresión visual | `toHaveScreenshot()` de Playwright (🟢, sin servicios de pago) | 🟡 Añadir |
| Vídeo | Prueba en Chrome de verdad (el headless del entorno no tiene H.264) y en un iPhone real | Manual en cada release |
| CI | GitHub Actions (🟢, minutos gratis) | 🟡 Añadir |

## 30. Monitorización

- **Errores**: Sentry Developer 🟡 (5.000 errores/mes y 1 usuario; basta para esta web) **o** GlitchTip
  (MIT, compatible con el SDK de Sentry, autoalojado; hay que mantener un servidor). **Recomendado:
  Sentry Free** solo en el Worker y en el cliente con muestreo. Si algún día molesta, se cambia el DSN
  a GlitchTip sin tocar código.
- **Worker**: *Workers Logs/Observability* (🟢 incluido) + Cloudflare MCP para consultarlo.
- **Disponibilidad**: un Cron Trigger que compruebe `/` y `/api/health` cada 30 minutos y avise por email
  (🟢). También se puede usar UptimeRobot Free (🟡, 50 monitores).
- **SEO**: alertas de Search Console (🟢).

## 31. Cloudflare

| Pieza | Plan | Uso |
|---|---|---|
| DNS + dominio `24shoots.es` | 🟢 Free | Cambio de nameservers **solo con vuestra confirmación** |
| Web | 🟢 **Workers** (Free) con **OpenNext** + assets estáticos | Límite de tamaño del Worker: 64 MiB sin comprimir (igual en Free y Paid) |
| Media | 🟢 **R2** + dominio `media.24shoots.es` | Vídeo, pósters y HLS |
| Leads | 🟢 Worker + **D1** + **Turnstile** + Cron Triggers | §18–§21 |
| Email entrante | 🟢 Email Routing | `info@` → buzón actual |
| Analytics | 🟢 Web Analytics | Core Web Vitals |
| Seguridad | 🟢 WAF gestionado básico, *Bot Fight Mode*, Access (hasta 50 usuarios) | — |
| **No usar** | 🔴 Stream, Images de pago, Argo, Workers Paid | Innecesario para este tráfico |

**Ruta de migración (se prepara, no se ejecuta)**: rama `cloudflare` → `@opennextjs/cloudflare` +
`wrangler.jsonc` → redirecciones y cabeceras trasladadas → preview en `*.workers.dev` → QA completo →
DNS del dominio (con confirmación) → Vercel queda como preview.

**Alternativa más simple** si OpenNext diera problemas: `output: "export"` (web 100 % estática en Workers
Static Assets) + el Worker de leads aparte. Exige mover el rewrite de ES a una estructura de carpetas
real y las redirecciones a `_redirects`. Es algo más de trabajo de rutas, pero **cero servidor**.

## 32. Stack recomendado — «24SHOOTS Recommended Web Stack v1»

Formato: **herramienta → función → problema → impacto → coste → complejidad → dependencia → decisión**

| # | Área | Herramienta | Función | Problema que resuelve | Impacto | Coste | Compl. | Dependencia | Decisión |
|---|---|---|---|---|---|---|---|---|---|
| A | Dirección creativa | Dirección E «24 fotogramas + sala» + skill `frontend-design` | Concepto y sistema | Web genérica que no enamora | Muy alto | 🟢 | Media | Ninguna | 🟢 IMPRESCINDIBLE |
| B | UX/UI | Lovable (prototipos) + `web-design-guidelines` | Explorar y validar | Decidir sin haber visto nada | Alto | 🟢 (Pro ya pagado) | Baja | Solo en fase de prototipo | 🟢 |
| C | Frontend | Next.js 16 SSG + Tailwind v4 | Web estática y rápida | Rendimiento y SEO | Muy alto | 🟢 MIT | Ya hecho | Portable (OpenNext) | 🟢 |
| D | Animación | GSAP 3.15 + CSS scroll-driven (+ Lenis en escritorio) | Secuencia y crédito | Web plana | Alto | 🟢 | Media | GSAP con licencia gratuita propia | 🟢 |
| E | Creative coding | OGL o Three.js (transición y hover) | Capa WOW opcional | Diferenciación en escritorio | Medio | 🟢 | Alta | GPU | 🔵 OPCIONAL |
| F | Vídeo | ffmpeg → AV1/H.264 loops + HLS estático; `hls.js`; `media-chrome` | Calidad y peso | Vídeos de 37 MB servidos tal cual | Muy alto | 🟢 | Media | Ninguna | 🟢 |
| F' | Vídeo (hosting) | Cloudflare R2 + dominio propio | CDN sin coste de salida | Lock-in y límites de Vercel | Muy alto | 🟢 (6 % del plan gratuito) | Baja | Cloudflare (S3-compatible → portable) | 🟢 |
| F'' | Vídeo | Cloudflare Stream | Streaming gestionado | — | — | 🔴 | — | — | 🔴 NO UTILIZAR |
| G | Imágenes | sharp en build → AVIF/WebP/JPG + thumbhash + color dominante | Nitidez y peso | LCP; dependencia de `next/image` | Alto | 🟢 | Baja | Ninguna | 🟢 |
| H | Backend | Cloudflare Worker + Hono | Endpoint de leads desacoplado | Backend atado al host | Alto | 🟢 | Media | Cloudflare (Hono también corre en Node) | 🟢 |
| I | Formularios | Esquema valibot/zod compartido + Turnstile + honeypot + fallback sin JS | Validar y frenar spam | Spam y errores | Alto | 🟢 | Baja | — | 🟢 |
| J | Leads | Tabla `leads` + UTM + estado + reintento por cron | No perder ninguno | Hoy, si falla el email, el lead se pierde | Muy alto | 🟢 | Baja | — | 🟢 |
| K | Base de datos | Cloudflare D1 (weur) | Guardado | — | Alto | 🟢 | Baja | Cloudflare (SQLite → exportable) | 🟢 |
| K' | Base de datos | Supabase Free | — | Se pausa por inactividad | — | 🟡 | — | — | 🔴 |
| L | Email | Resend Free + Email Routing | Aviso y acuse de recibo | — | Alto | 🟡 100 al día | Baja | Resend (fácil de cambiar: es una llamada HTTP) | 🟢 |
| M | Analytics | Umami Cloud Hobby + Search Console + Bing WMT (+ CF Web Analytics) | Medir y mejorar | Hoy no se mide nada útil | Muy alto | 🟢/🟡 | Baja | Umami (MIT, autoalojable) | 🟢 |
| M' | Analytics | GA4 / Clarity | — | Obligan a poner banner | — | 🟢 pero con coste legal y de UX | — | — | 🔴 por ahora / 🔵 Clarity en CRO |
| N | SEO | Metadata/JSON-LD actuales + sitemap de vídeo + Google Business Profile | Que os encuentren | Visibilidad local | Muy alto | 🟢 | Baja | — | 🟢 |
| O | AEO/GEO | `llms.txt` + fichas de caso + FAQ breve + Bing | Aparecer en respuestas de IA | Nuevo canal | Medio | 🟢 | Baja | — | 🟡 |
| P | CRO | Skills `cro`/`copywriting` + funnel en Umami | Convertir | Visitas que no escriben | Alto | 🟢 | Baja | — | 🟡 |
| Q | Performance | Presupuestos + Lighthouse CI + `web-vitals` + Chrome DevTools MCP | Que la web siga rápida | Deriva con vídeo y animación | Alto | 🟢 | Baja | — | 🟢 |
| R | Seguridad | CSP + HSTS + Turnstile + secretos en Wrangler + retención de 12 meses | Proteger datos | GDPR y spam | Alto | 🟢 | Baja | — | 🟢 |
| S | Testing | Playwright + axe + Vitest + screenshots + GitHub Actions | QA automático | Regresiones visuales (ya pasó el bug de `Reveal`) | Alto | 🟢 | Media | — | 🟢 |
| T | Monitorización | Sentry Free (o GlitchTip) + Workers Logs + cron de disponibilidad | Enterarse antes que el cliente | Errores silenciosos | Medio | 🟡/🟢 | Baja | SDK estándar | 🟡 |
| U | Deploy | Vercel (solo previews) → Cloudflare Workers (producción) | Publicar | Hobby = no comercial | Muy alto | 🟢 | Media | OpenNext | 🟢 |
| V | Cloudflare | DNS, R2, D1, Workers, Turnstile, Email Routing, Web Analytics | Plataforma de producción | Coste 0 € y portabilidad | Muy alto | 🟢 | Media | Cloudflare (cada pieza tiene alternativa) | 🟢 |

## 33. Arquitectura recomendada

```
                         ┌───────────────── 24shoots.es (Cloudflare DNS) ─────────────────┐
Navegador ──HTML/CSS/JS──▶ Web (Next.js SSG) ── Vercel [dev/preview] │ CF Workers+OpenNext [prod]
   │                                                                                       
   ├──póster/loop/HLS──▶ media.24shoots.es  (R2 + caché de la CDN)       ← pipeline ffmpeg/sharp
   ├──POST /lead──────▶ api.24shoots.es   (Worker Hono) ─▶ D1 · Turnstile · Resend · webhook
   ├──eventos─────────▶ Umami (cloud → autoalojable)
   └──beacon CWV──────▶ CF Web Analytics
Search Console · Bing WMT · Google Business Profile  (fuera de la web)
```

**Qué debe ser independiente del proveedor (y cómo)**

| Pieza | Cómo se desacopla |
|---|---|
| Vídeo e imágenes | URL base configurable `NEXT_PUBLIC_MEDIA_URL`. Hoy `/media`, mañana `https://media.24shoots.es`. Los archivos se generan en build y no los transforma el proveedor |
| Leads | `NEXT_PUBLIC_LEAD_ENDPOINT` apunta al Worker. La lógica vive en `packages/lead` (Hono + esquema), que corre igual en Workers, Node o Vercel |
| Analytics | Una sola función `track(event, props)` en `src/lib/analytics.ts`. Cambiar de Umami a PostHog es tocar un archivo |
| Redirecciones y cabeceras | Una sola fuente de verdad (`routes.config.ts`) que genera tanto `next.config` como `_redirects`/`_headers` |
| Secretos | Nombres de variables idénticos en Vercel y en Wrangler (`RESEND_API_KEY`, `TURNSTILE_SECRET`…) |
| Imágenes OG | Generadas en build (ya se hace con ffmpeg) |
| **Evitar** | `@vercel/analytics`, `@vercel/og` en tiempo de ejecución, Edge Config, KV de Vercel, middleware exclusivo de un proveedor |

**Componentes (frontend)**: `FrameStrip` (tira de 24, SSR + isla de cliente), `Frame` (póster + loop +
crédito), `Counter` (00/24), `CaseTheatre` (reproductor HLS + ficha), `CtaBar`, `LeadForm`, `Track`
(delegación de eventos con `data-track`). Los datos de los 24 fotogramas van en `content/frames.ts`
(timecode, caso, recorte, color y alt ES/EN) y se generan desde el pipeline.

## 34. Arquitectura de datos

```
content/cases.ts ─┐                    ┌─▶ HTML estático (SSG)
content/frames.ts ├─ build (pipeline) ─┼─▶ media derivada ──▶ R2
media/*/film.mp4 ─┘                    └─▶ media.generated.json (duraciones, colores, thumbhash)

Formulario ─▶ Worker ─▶ D1.leads ─▶ Resend (aviso) ─▶ [webhook CRM]
                           └─ cron: reintentos de notified=0 · borrado a los 12 meses
```
**Datos personales**: solo en D1 y en el email. **Nunca** en analytics. Los eventos de formulario van sin
nombre ni email.

## 35. Arquitectura de analytics

**Ciclo**: usuario → evento → datos → análisis → hipótesis → cambio → medición.

**Plan de eventos (máximo 12; nombres estables, siempre en inglés)**

| Evento | Propiedades | Para qué |
|---|---|---|
| `pageview` (automático) | UTM, referrer, dispositivo | Tráfico y fuentes |
| `frame_reach` | `n` = 6/12/18/24 | **Profundidad de scroll medida en fotogramas**: dónde se pierde la gente |
| `case_open` | `slug`, `from` (strip/work/service) | Qué trabajo atrae |
| `video_play` | `slug`, `context` (loop/film) | Interés real |
| `video_progress` | `slug`, `pct` = 25/50/75/100 | Qué piezas se ven hasta el final |
| `cta_click` | `id` (hablemos/pack/email/whatsapp/phone), `location` | Qué CTA funciona |
| `pack_select` | `pack` | Demanda por pack |
| `contact_start` | `source_page` | Inicio del formulario (primer foco) |
| `contact_submit` | — | Intento de envío |
| `contact_success` / `contact_error` | `code` | Conversión y fallos |
| `lang_switch` | `to` | ¿Hace falta el inglés? |
| `web_vital` | `name`, `value`, `rating` | Rendimiento de campo |

**Funnels en Umami**: (1) Home → `frame_reach 12` → `case_open` → `cta_click` → `contact_success`;
(2) Servicio → `case_open` → `contact_start` → `contact_success`; (3) Packs → `pack_select` →
`contact_success`.

**Rutina mensual** (30 minutos, se puede automatizar con Claude): exportar Umami y Search Console →
informe con 3 hallazgos → **1 hipótesis** → **1 cambio** → medir 4 semanas. Ejemplo: «el 60 % abandona
antes del fotograma 12 en móvil → subir el primer caso al fotograma 4 → medir `frame_reach 12` y
`case_open`».

**GDPR**: Umami no usa cookies ni guarda IPs completas, así que no necesita banner. Hay que describirlo en
la política de cookies y privacidad. Si más adelante se activa Clarity o GA4, antes hay que poner un CMP
gratuito (por ejemplo, `vanilla-cookieconsent`, MIT).

## 36. Evaluación A/B/C/D/E

Pesos: MUY ALTO = 3, ALTO = 2, MEDIO = 1. Nota de 1 a 5 (en complejidad y mantenimiento, 5 = más fácil).

| Criterio (peso) | A Cinemática | B Editorial | C Experimental | D 24 fotogramas | **E Híbrida** |
|---|---|---|---|---|---|
| Impacto visual (3) | 4 | 3 | 5 | 4 | **5** |
| Diferenciación (3) | 2 | 3 | 4 | 5 | **5** |
| Mostrar trabajo real (3) | 5 | 4 | 3 | 4 | **5** |
| Conversión (3) | 4 | 3 | 2 | 4 | **5** |
| Claridad (2) | 5 | 4 | 2 | 3 | **4** |
| Mobile (3) | 5 | 4 | 2 | 4 | **5** |
| Performance (2) | 4 | 5 | 2 | 4 | **4** |
| Complejidad (1) | 5 | 4 | 1 | 3 | **3** |
| Mantenimiento (1) | 5 | 4 | 2 | 3 | **3** |
| Cloudflare (1) | 5 | 5 | 4 | 5 | **5** |
| **Total ponderado (máx. 110)** | **93** | **82** | **63** | **88** | **102** |

Suma (nota × peso), por ejemplo E: 15+15+15+15+8+15+8+3+3+5 = 102.

**Ranking: E 102 · A 93 · D 88 · B 82 · C 63.**
C (experimental) sale última porque falla justo en lo que más pesa para el negocio: móvil,
conversión y claridad. A sale segunda porque es segura, pero puntúa bajo en diferenciación. E coge
lo mejor de D y A.

### E — Híbrida «24 fotogramas + sala»

- **Idea**: la Home es **un segundo de cine**: 24 fotogramas reales numerados, como en la D. Cuando la
  tira se detiene en una pieza, **se convierte en sala**: el loop se amplía a pantalla completa con su
  crédito (cliente · formato · partner) y un «Ver pieza» que lleva a la película completa (la
  disciplina de la A). Al cerrar, se vuelve exactamente al fotograma donde estabas.
- **Por qué supera a D**: la D arriesgaba claridad (¿qué es cada fotograma?) y conversión. La E da a cada
  caso un **momento de sala** con un CTA claro sin salir de la Home, y en `/trabajo` las películas se
  ordenan por territorio (Eventos / Marca / Campañas, como hace Twice).
- **Por qué supera a A**: mantiene la diferenciación (el número 24 como sistema y el contador como
  indicador de scroll) y enseña mucho más trabajo por pantalla.
- **Móvil (390/430)**: tira vertical con scroll-snap, un fotograma por gesto, contador arriba y
  «sala» = el vídeo a pantalla completa con controles nativos. Sin `pin` y sin WebGL.
- **Escritorio (1440)**: tira horizontal (ScrollTrigger), color de fondo que sigue al fotograma y
  transición Flip/View Transition a la sala. WebGL opcional para el hover.
- **Estructura de la Home (compacta)**: 00 hero-fotograma + frase → 01–20 la tira (5 casos × ~4
  fotogramas, cada caso abre su sala) → 21 territorios (3 fotogramas-título) → 22 clientes + Packs
  (una línea) → 23–24 «¿Qué cuentas tú en los próximos 24?» + formulario corto.
- **Riesgos**: la selección de los 24 fotogramas es crítica; la sala hay que hacerla accesible (foco,
  Esc, `aria-modal`, volver al punto exacto); y hay que controlar que haya como mucho 2 vídeos a la vez.

## 37. Priorización impacto/esfuerzo

| Prioridad | Acción | Impacto | Esfuerzo |
|---|---|---|---|
| **P0** | Guardar leads (Worker + D1 + Turnstile), dejar de perderlos | Muy alto | Bajo |
| **P0** | Plan de eventos + Umami + Search Console | Muy alto | Bajo |
| **P0** | Seleccionar los 24 fotogramas (con timecodes) | Muy alto | Bajo |
| **P1** | Prototipos E/A/D en Lovable → decisión «sí/no» | Muy alto | Bajo |
| **P1** | Pipeline de vídeo: HLS + pósters multi-ancho + thumbhash + color | Alto | Medio |
| **P1** | Implementar E en `/lab/e` → Home | Muy alto | Medio-alto |
| **P2** | Google Business Profile + sitemap de vídeo + FAQ breves | Alto | Bajo |
| **P2** | Migración a Cloudflare (preview en `workers.dev`) | Alto | Medio |
| **P2** | CI: Playwright + axe + Lighthouse CI + screenshots | Medio | Bajo |
| **P3** | Capa WebGL opcional (hover o transición) | Medio | Alto |
| **P3** | Clarity con consentimiento durante un periodo de CRO | Medio | Bajo |

## 38. Qué utilizar

Next.js (SSG) · Tailwind v4 · GSAP 3.15 · CSS scroll-driven · Lenis (solo escritorio) · ffmpeg · sharp ·
hls.js · media-chrome · thumbhash · web-vitals · Hono · valibot/zod · Turnstile · Cloudflare Workers ·
D1 · R2 · Email Routing · Web Analytics · Resend Free · Umami Cloud · Search Console · Bing WMT ·
Google Business Profile · Playwright · axe · Vitest · Lighthouse CI · GitHub Actions · Sentry Free ·
OpenNext · Lovable (solo prototipos) · skills: `frontend-design`, `web-quality-skills`,
`web-design-guidelines`, `marketingskills` (cro, copywriting, seo-audit, analytics-tracking) ·
MCP: GitHub, Lovable, Chrome DevTools y Cloudflare (al migrar).

## 39. Qué estudiar (sin adoptar todavía)

Tutoriales de Codrops (galería horizontal de DOM a WebGL; galería con fondo según el mood) · OGL
para una textura de vídeo · PostHog (si hacen falta grabaciones) · GlitchTip (si Sentry se queda
corto) · `output: "export"` como plan B de despliegue · la API de View Transitions entre documentos ·
Behance *Station Six / VYNN* y las cuentas `@greensock` y `@codrops` (revisión manual).

## 40. Qué NO utilizar

Cloudflare Stream y Cloudflare Images de pago · Vercel Hobby como producción · Vercel Analytics y
`@vercel/og` en tiempo de ejecución (lock-in) · Supabase Free para leads (se pausa) · GA4 y Clarity sin
consentimiento · Figma MCP (6 llamadas/mes) · React Three Fiber, r3f-scroll-rig y curtainsjs · shadcn/ui
en la web final · `@react-email/components` (deprecated) · `@studio-freight/lenis` (deprecated) ·
Zapier o Make · shaders de grano · loaders con porcentaje · cursor personalizado · «mega-prompts» de
webs 3D · el código generado por Lovable como base de producción.

## 41. Próximos pasos (pendientes de vuestra aprobación; no se implementa nada)

1. **Validar la dirección E** (o pedir ajustes).
2. **Selección de los 24 fotogramas**: propuesta con timecodes y recortes 16:9 / 4:5 / 9:16 sacados del
   material real, para que la aprobéis.
3. **Prototipos en Lovable** (E, A y D) con esos fotogramas → revisión en móvil y escritorio → «sí/no»
   por elemento.
4. **P0 técnico en paralelo** (no toca la Home): Worker de leads + D1 + Turnstile en una cuenta de
   Cloudflare **que tengáis que autorizar vosotros**. Umami + Search Console.
5. Implementar E en `/lab/e` con QA completo → sustituir la Home.
6. Preparar la migración a Cloudflare (documentada, **sin tocar el DNS** hasta que lo confirméis).

**Datos que necesito de vosotros**: acceso o creación de la cuenta de Cloudflare; si el dominio
`24shoots.es` ya está registrado y dónde; la clave de Resend; confirmación del teléfono y del WhatsApp;
permisos para nombrar a los clientes; y si podéis prometer un plazo de respuesta real.

---

### Fuentes

- Cloudflare R2 pricing — https://developers.cloudflare.com/r2/pricing
- Cloudflare D1 pricing / enforcement — https://developers.cloudflare.com/d1/platform/pricing/ · https://developers.cloudflare.com/changelog/post/2026-09-01-d1-free-tier-limit-enforcement/
- Workers limits (64 MiB, 10 ms CPU, 100 k/día) — https://developers.cloudflare.com/workers/platform/limits/
- Workers pricing — https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare Images pricing (5.000 transformaciones gratis) — https://developers.cloudflare.com/images/pricing/
- Cloudflare Stream pricing — https://developers.cloudflare.com/stream/pricing/
- Vídeo en la CDN / condiciones — https://developers.cloudflare.com/fundamentals/reference/policies-compliances/delivering-videos-with-cloudflare/ · https://blog.cloudflare.com/updated-tos
- Turnstile gratuito — https://blog.cloudflare.com/turnstile-ga/ · https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- OpenNext Cloudflare — https://opennext.js.org/cloudflare · https://opennext.js.org/cloudflare/howtos/image
- Vercel Hobby (no comercial) — https://vercel.com/docs/plans/hobby · https://vercel.com/docs/limits/fair-use-guidelines
- Resend cuotas — https://resend.com/docs/knowledge-base/account-quotas-and-limits
- PostHog — https://posthog.com/faq
- Umami Cloud — https://umami.is/pricing · https://docs.umami.is/docs/cloud/faq
- Cloudflare Web Analytics sin eventos — https://plausible.io/vs-cloudflare-web-analytics
- Clarity consentimiento — https://clarity.microsoft.com/blog/clarity-cookie-consent-update/ · https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode
- Sentry Free / GlitchTip — https://sentrypricing.com/free-plan · https://glitchtip.com/
- Lovable créditos — https://docs.lovable.dev/introduction/plans-and-credits · https://docs.lovable.dev/integrations/github
- Figma MCP límites — https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/
- Chrome DevTools MCP — https://www.debugbear.com/blog/chrome-devtools-mcp-performance-debugging
- Skills — https://github.com/addyosmani/web-quality-skills · https://github.com/vercel-labs/agent-skills · https://github.com/coreyhaines31/marketingskills
- Codrops — https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/ · https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/ · https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/
- Portfolios — https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/ · https://colorlib.com/wp/developer-portfolios/
- Dribbble — https://dribbble.com/shots/22094791-Video-Production-Studio-Portfolio-Website
- X (GSAP SOTW) — https://x.com/greensock/status/2054430779023749353
- npm registry (versiones, licencias, descargas) — https://registry.npmjs.org · https://api.npmjs.org/downloads
