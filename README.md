# 24SHOOTS — web V2

Estudio creativo de contenido y comunicación visual. Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4.

- Auditoría y decisiones: [`docs/V2-MASTER-PLAN.md`](docs/V2-MASTER-PLAN.md)
- **Lo que falta de 24SHOOTS** (datos, permisos, assets, DNS): [`docs/V2-PENDIENTES.md`](docs/V2-PENDIENTES.md)

## Arrancar

```bash
npm install
cp .env.example .env.local   # CONTACT_DRY_RUN=1 para probar el formulario sin enviar
npm run dev                   # http://localhost:3000
npm run build && npm start    # producción local
```

Comprobaciones: `npm run typecheck`, `npm run lint`, y QA con Playwright (ver abajo).

## Estructura

```
src/
  app/[locale]/        Rutas. ES en la raíz (/trabajo), EN en /en (/en/work).
                       Cada carpeta localizada solo existe en su idioma.
  app/api/contact/     Envío del formulario (Resend)
  app/sitemap.ts, robots.ts
  views/               Una vista por tipo de página (Home, Work, Services, Studio, Contact, Legal)
  components/          Hero + HeroReel, CaseRow, PreviewLoop, FilmPlayer, DaySection,
                       ServicesIndex, ClientsList, ContactForm, Header, Footer…
  content/             Contenido tipado: cases.ts (solo trabajo verificado), services.ts,
                       copy.ts (textos ES/EN), legal.ts, media.generated.json
  lib/                 i18n (rutas y mapa de idioma), seo (metadata + JSON-LD), site (datos), contact
scripts/media/         Pipeline de vídeo/imagen (ffmpeg)
scripts/qa/            QA: barrido de rutas × viewports, axe, interacciones
archive/               V1, notas, cuestionarios, backups y media no usada. No se despliega.
```

`next.config.ts` contiene el rewrite de idioma (raíz → `/es` interno), las redirecciones 301 de todas las URLs de V1 y las cabeceras.

## Contenido

- **Casos**: `src/content/cases.ts`. Solo hechos visibles en la película. Para añadir uno: poner `film.mp4` en `public/media/<slug>/`, añadir los tiempos de fotogramas en `scripts/media/build.mjs`, ejecutar el pipeline y crear la entrada en `cases.ts`.
- **Servicios**: `src/content/services.ts`. **Textos**: `src/content/copy.ts`. **Datos de contacto y legales**: `src/lib/site.ts`.

## Media

```bash
FFMPEG=/ruta/a/ffmpeg npm run media            # todo
FFMPEG=… npm run media -- --only=hero          # hero | stills | previews | og
```

Genera, a partir de `public/media/<caso>/film.mp4`: fotogramas 1920×1080 (servidos en AVIF/WebP por `next/image`), loops de preview (AV1 + H.264), el montaje del Hero en 16:9 y 4:5, pósters y tarjetas OG. Sustituir `film.mp4` por un master de más calidad y relanzar mejora todo.

## Formulario

`POST /api/contact` (JSON con JavaScript; `form-data` + redirección 303 sin JavaScript). Validación en servidor, honeypot, trampa de tiempo, límite por IP y comprobación de origen. Envía con Resend a `info@24shoots.es` (`reply_to` = quien escribe). Sin `RESEND_API_KEY` responde 503 y la interfaz muestra el email: nunca finge un envío.

## QA

```bash
npm run build && npm start &
BASE=http://localhost:3000 OUT=qa-out node scripts/qa/run.mjs --axe [--full] [--vp=390,1440] [--reduced]
BASE=http://localhost:3000 OUT=qa-out node scripts/qa/interact.mjs
```

Necesita Playwright (global o `npx playwright`). `run.mjs` recorre 16 rutas × 9 viewports (360–1920) y comprueba errores de consola, recursos fallidos, overflow horizontal, H1, alt, CLS, LCP y axe (WCAG 2.2 AA). `interact.mjs` prueba el menú, el formulario, el cambio de idioma, el Hero, `prefers-reduced-motion` y la página sin JavaScript.

## Despliegue

Vercel. Variables: ver `.env.example`. Las previews no se indexan (`VERCEL_ENV !== production` → `noindex`, `robots.txt` bloquea). Analítica: Vercel Web Analytics y Speed Insights (sin cookies), que hay que activar en el proyecto de Vercel.
