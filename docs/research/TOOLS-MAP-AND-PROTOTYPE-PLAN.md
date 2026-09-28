# 24SHOOTS — Mapa de herramientas + plan de prototipos

Rama: `claude/confident-galileo-rgun26` · Fecha: 28-09-2026 · **No se ha instalado, activado ni conectado nada.**

---

## A. MAPA DE HERRAMIENTAS

### Aclaración: lo que yo veo en esta sesión

Esta sesión corre en la nube (Claude Code en claude.ai). Los conectores de abajo **aparecen activos
en esta sesión**. Los he comprobado con una consulta de solo lectura o leyendo mi lista de
herramientas. No los he activado yo: la sesión los recibe de la configuración de vuestra cuenta de
claude.ai. Si no recordáis haberlos conectado, merece la pena revisarlo en *Settings → Connectors*.
Si queréis que no los use, basta con decírmelo.

No asumo nada más allá de esta lista. **En Cursor o en vuestro Claude Code local no tengo nada
conectado**, y todo lo que se configure allí va aparte.

### 1. YA DISPONIBLE (se puede usar ahora mismo, sin conectar nada)

| Herramienta | Qué permite | Para qué parte de 24SHOOTS | Gratis | Límites | Prioridad |
|---|---|---|---|---|---|
| **Claude Code (esta sesión)** + terminal | Leer y escribir el repo, hacer build, ejecutar scripts | Todo el desarrollo | Incluido en vuestro plan | Contenedor efímero: hay que hacer commit y push | Alta |
| **Node 22 + Playwright 1.56 + Chromium** (preinstalados) | Capturas y QA automático a 390/430/1440 | Comparar prototipos y hacer QA | 🟢 | **Chromium headless sin H.264**: los MP4 se ven negros. Hay que validar el vídeo en un navegador o móvil real | Alta |
| **ffmpeg 7** (preinstalado) | Fotogramas, loops, recortes 4:5/9:16, HLS | Seleccionar los 24 fotogramas y generar media de prototipo | 🟢 | — | Alta |
| **GitHub** (conector) | Ramas, commits, PRs | Trabajar en esta rama | 🟢 | Limitado a `miguelbr16/24shoots-web-opus` | Alta |
| **Lovable** (conector, workspace **Pro** verificado) | Crear e iterar proyectos, subir imágenes, obtener la URL de preview | Explorar composiciones A/D/E | Incluido en Pro | **Gasta vuestros créditos**. Os pediré confirmación antes de crear proyectos | Alta |
| **Vercel** (conector) | Leer deployments y logs de preview | Previews de `/lab/*` para verlas en el móvil | 🟢 (Hobby) | Hobby = no comercial: solo previews. Nada de producción | Media |
| **WebSearch / WebFetch** | Consultar documentación | Dudas puntuales | 🟢 | Behance y X bloqueados | Baja |
| Skills del sistema: `artifact-design`, `dataviz`, `security-review`, `code-review`, `simplify`, `run` | Revisiones y documentos visuales | QA de código; publicar la comparativa de prototipos como página | 🟢 | — | Media |
| Notion, Claude Docs (conectores) | Documentos compartidos | No hacen falta | 🟢 | — | Ninguna |

> **Corrección honesta**: en la fase 1 cité la skill `frontend-design`. **No está disponible en esta
> sesión** (no aparece en mi lista de skills). La usé como criterio de diseño que conozco, no como una
> herramienta instalada. Si la queréis como herramienta de verdad, está en «Conectar ahora».

### 2. CONECTAR AHORA (antes de los prototipos). Solo 3 cosas

| Herramienta | Qué permite | Para qué | Gratis | Límites | Prioridad |
|---|---|---|---|---|---|
| **Skill `frontend-design`** (repo público `anthropics/skills`, licencia abierta) | Guía de dirección visual contra el diseño genérico | Calidad visual de los prototipos | 🟢 | Ninguno. Son archivos de texto en `.claude/skills/` | **Alta** |
| **Skill `web-design-guidelines`** (`vercel-labs/agent-skills`, OSS) | Más de 100 reglas de interfaz: foco, touch, animación, formularios, i18n | Que los prototipos sean usables en móvil desde el primer día | 🟢 | Descarga las reglas de una URL pública al ejecutarse | **Alta** |
| **Vuestro móvil** (iPhone y/o Android) abriendo las previews | Probar vídeo, scroll y gestos de verdad | Validar A/D/E en 390/430 reales | 🟢 | — | **Imprescindible**: es lo único que el headless no puede simular (H.264, inercia de scroll, autoplay en iOS) |

**Cómo instalar las dos skills** (lo hacéis vosotros o me autorizáis a hacerlo): copiar las
carpetas en `.claude/skills/` de este repo y hacer commit. Quedan versionadas y las ven tanto Claude
Code como Cursor. **No hay nada más que conectar para prototipar.**

### 3. CONECTAR MÁS ADELANTE (por fase)

| Fase | Herramienta | Qué permite | Gratis / límites | Prioridad |
|---|---|---|---|---|
| **Implementación / QA** | Skill `web-quality-skills` (addyosmani) | Auditoría de CWV, WCAG 2.2 y SEO con arreglos priorizados | 🟢 | Alta en esa fase |
| Implementación / QA | **Chrome DevTools MCP** (en Cursor o en vuestro Claude Code local, con Chrome de verdad) | Trazas de LCP/CLS y Lighthouse **con H.264 real** | 🟢 open source | Alta en esa fase |
| Implementación | GitHub Actions (en el repo, sin conector) | CI: Playwright + axe + Lighthouse CI | 🟢 (minutos gratuitos en repos privados, sobran) | Media |
| **Leads** | Cuenta **Cloudflare** (Workers, D1, Turnstile) | Worker del formulario + base de datos + antispam | 🟢 Free: 100 k peticiones/día, D1 5 GB, Turnstile ilimitado | Alta, **antes de publicar** |
| Leads | Cuenta **Resend** + verificar dominio | Aviso de lead a `info@24shoots.es` | 🟡 3.000/mes, **100/día** | Alta, antes de publicar |
| **Cloudflare** | **Cloudflare MCP** (servidores oficiales, OSS) | Gestionar R2, D1 y Workers y leer logs desde el agente | 🟢 | Alta **en la migración** |
| Cloudflare | R2 + dominio `media.24shoots.es` | Alojar vídeo sin coste de salida | 🟢 10 GB (usaríamos ~0,6 GB) | Alta en la migración |
| **Analytics** | Cuenta **Umami Cloud** (Hobby) | Eventos, funnels, UTM, sin cookies | 🟡 100 k eventos/mes, 6 meses de retención | Alta al publicar |
| Analytics | Cloudflare Web Analytics | Core Web Vitals de campo | 🟢 sin eventos personalizados | Media, al migrar |
| **SEO** | Google Search Console + Bing Webmaster Tools | Indexación y consultas | 🟢 | Alta al publicar |
| SEO local | Google Business Profile | Búsquedas locales en Valencia | 🟢 | Alta al publicar (necesita dirección o área de servicio) |
| **Copy / CRO** | Skills `marketingskills`: **solo** `copywriting`, `cro`, `analytics-tracking`, `seo-audit` | Copy corto, CTA, plan de eventos | 🟢 | Media, cuando se escriba el copy final |
| Monitorización | Sentry (plan Developer) | Errores del formulario y del cliente | 🟡 5.000 errores/mes, 1 usuario | Baja, después de publicar |

### 4. NO NECESARIO

| Herramienta | Por qué no |
|---|---|
| Figma MCP | No usáis Figma como fuente, y el plan gratuito permite **6 llamadas al mes** |
| Google Analytics 4 (+ su MCP) | Obliga a poner banner de cookies; Umami cubre lo necesario. Solo si algún día hacéis Google Ads |
| Microsoft Clarity | Consentimiento obligatorio en la UE; como mucho, más adelante y de forma puntual para CRO |
| Supabase (+ MCP) | Los proyectos gratuitos se pausan por inactividad: mal sitio para leads. D1 lo cubre |
| Resend MCP | El envío lo hace el Worker; no hace falta enviar emails desde el agente |
| Playwright MCP | Ya tenemos Playwright directamente, con scripts propios |
| Skill `webapp-testing` | Duplica `scripts/qa/*` |
| Zapier / Make | De pago o limitados; un webhook desde el Worker basta |
| Cloudflare Stream / Images de pago | Hay alternativa gratuita (R2 + pipeline propio) |
| PostHog | Solo si más adelante hacen falta grabaciones de sesión |
| Notion / Claude Docs | Los documentos viven en `docs/` del repo |
| Skills de «webs 3D con un prompt» | Producen justo la estética genérica que queremos evitar |

**Resumen**: para prototipar hacen falta **2 skills + vuestro móvil**. Todo lo demás se conecta cuando
llegue su fase.

---

## B. PLAN DE PROTOTIPOS (preparado; no se ejecuta hasta que confirméis)

### Principios comunes (en las tres direcciones)

- **La Home es el tráiler; `/trabajo` es la película.** Como máximo 5–7 gestos en móvil para
  llegar al contacto. Nada de casos-bloque, tarjetas de catálogo, párrafos ni lista larga de servicios.
- **Móvil primero, de verdad**: cada prototipo se diseña **a 390×844** y después se comprueba a 430×932 y
  1440×900. Si una idea solo funciona en escritorio, se descarta.
- **Solo material real** (fotogramas y loops de las 5 películas), copy real ya aprobado y email
  `info@24shoots.es`. Teléfono y WhatsApp como *placeholder* marcado «pendiente» hasta que los confirméis.
- **Paleta**: negro de sala y blanco; el color lo pone el metraje. Sin crema ni terracota.

### Dónde se hace cada cosa

| Herramienta | Qué se prueba | Por qué ahí |
|---|---|---|
| **Lovable** (3 proyectos: A, D, E) | Composición, jerarquía, tipografía, ritmo, gestos: con **fotogramas fijos** y como mucho 1–2 loops ligeros | Rápido para comparar variantes y compartir la URL. **No** se usa su código ni su backend |
| **Repo `/lab/a`, `/lab/d`, `/lab/e`** (noindex, preview de Vercel) | La experiencia real: **vídeo**, scroll, snap, transiciones, rendimiento | El vídeo y el rendimiento solo se pueden juzgar con nuestro stack y nuestra media |

Orden: **1) seleccionar los 24 fotogramas → 2) Lovable (composición) → 3) `/lab` (experiencia) →
4) comparar.**

### Patrón, por qué, qué aporta y riesgo

**A — Cinemática («el tráiler»)**
- *Patrón*: un reel a pantalla completa con cortes de montaje reales; un crédito corto por pieza
  (cliente · formato); numeración 01–05; flechas o swipe. (Park Pictures, Academy en móvil, Iconoclast.)
- *Por qué*: es el patrón que más rápido pasa de IMPACTO a PRUEBA; el trabajo habla en 3 segundos.
- *Qué aporta*: máxima claridad y el mejor móvil (un gesto por pieza).
- *Riesgo*: se parece a otras productoras. La diferenciación depende del montaje y del copy.
- *Estructura*: Tráiler (5 piezas, autoavance de 6 s) → frase de posicionamiento → 3 territorios en una
  línea → «¿Tienes algo que contar?» + CTA.

**D — 24 fotogramas**
- *Patrón*: una tira de 24 fotogramas reales numerados 01/24…24/24; un contador fijo que hace de
  indicador de scroll; loop de 2 s al detenerse. (Irene Butenko y Andrew McCarthy como tira de trabajo;
  Codrops «DOM → WebGL» para la técnica.)
- *Por qué*: convierte el nombre en la mecánica; enseña 5 veces más imagen que hoy.
- *Qué aporta*: diferenciación máxima y el recuerdo de marca.
- *Riesgo*: claridad (¿qué es cada fotograma?) y 24 gestos en móvil pueden ser demasiados. **Hay que
  probar una versión de 12 fotogramas en móvil.**

**E — 24 fotogramas + sala** *(no aprobada; se prueba en igualdad de condiciones)*
- *Patrón*: la tira de la D, pero cada caso tiene un **momento de sala** (el loop pasa a pantalla completa con
  su crédito y «Ver pieza»), y al cerrar se vuelve al fotograma exacto.
- *Por qué*: resuelve la claridad y la conversión de la D sin perder el sistema de los 24.
- *Qué aporta*: equilibrio entre WOW, prueba y CTA.
- *Riesgo*: es la más compleja (una capa superpuesta accesible, foco, Esc, historial) y lo más fácil
  es que se sienta «recargada».

**¿Una cuarta dirección?** Con lo investigado, **no veo ninguna claramente mejor** que merezca un cuarto
prototipo. La variante que sí voy a probar dentro de A es darle **estructura de tráiler en tres actos**
(Evento · Marca · Campaña), usando el mismo metraje. Si en las pruebas resulta mejor que la A base, os la
propondré como dirección propia.

### Especificación móvil (la misma vara para las tres)

| Viewport | Qué tiene que pasar |
|---|---|
| **390×844** | Primer fotograma o vídeo visible sin scroll, crédito legible (≥ 14 px), CTA alcanzable con el pulgar, **contacto en ≤ 7 gestos**, nada fuera de pantalla ni tapado por la barra del navegador (`svh`/`dvh`) |
| **430×932** | Lo mismo, aprovechando la altura (el 4:5 pasa a 9:16 si queda mejor) |
| **1440×900** | La misma experiencia ampliada, no otra distinta. El hover y el WebGL, si los hay, son extras |

### Medición: preparado desde el diseño (sin implementar analytics)

Cada elemento que se pueda medir llevará en el prototipo **atributos `data-track`** estables, que ya
fijan qué se va a medir aunque todavía no se envíe nada:

| Evento pedido | Cómo se hará medible |
|---|---|
| hero viewed | `data-track-view="hero"` (IntersectionObserver ≥ 50 % visible) |
| scroll depth | En D/E: fotograma alcanzado (`data-frame="n"`). En A: pieza alcanzada (`data-piece="n"`) |
| proyecto visto | `data-track-view="piece:<slug>"` durante ≥ 2 s |
| case abierto | `data-track="case_open" data-slug` (sala en E; enlace a `/trabajo/...` en todas) |
| video play / progress | Un único componente de vídeo que emite play y 25/50/75/100 % |
| CTA click | `data-track="cta" data-cta="hablemos|pack|…" data-location` |
| WhatsApp / teléfono / email | `data-track="contact_link" data-channel="whatsapp|phone|email"` |
| form start / completion / error | `data-track="form"` con estados `start|success|error` |

Regla de diseño que se deriva de esto: **nada importante puede ocurrir sin una acción o un umbral
observable**. Por ejemplo, el autoavance de A registra `piece_view` solo si la pieza se ha visto de
verdad; un carrusel automático no cuenta como «proyecto visto» si el usuario no está mirando.

### Comparativa final (C) que os entregaré

Tabla puntuada (impacto, deseo, diferenciación, claridad, conversión, mobile, performance, complejidad,
mantenimiento) **a partir de lo que se vea en los prototipos**, con capturas a 390/430/1440, el peso real
de cada página (kB), el LCP medido y una recomendación final. Puede no coincidir con la puntuación
teórica de la fase 2.

### Lo que necesito que confirméis para arrancar

1. **Skills**: ¿instaláis vosotros `frontend-design` y `web-design-guidelines`, o me autorizáis a
   añadirlas a `.claude/skills/` en esta rama?
2. **Lovable**: ¿autorizáis crear **3 proyectos** en vuestro workspace Pro (gastan créditos)?
3. **Previews**: ¿puedo desplegar las rutas `/lab/a|d|e` en la preview de Vercel de esta rama? Sin
   producción y con noindex.
4. Si podéis, el **teléfono/WhatsApp confirmados**, para no usar placeholders en los CTA.
