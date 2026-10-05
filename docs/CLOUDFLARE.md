# 24SHOOTS en Cloudflare (Workers + R2) — guía de despliegue

Estado: **preparado y verificado en local** con el runtime real de Workers (`workerd`).
**No se ha desplegado nada.** Hace falta tu cuenta de Cloudflare y, para el dominio, tu confirmación.

## Qué hay en el repo

| Archivo | Para qué |
|---|---|
| `open-next.config.ts` | Adaptador OpenNext. Las páginas prerenderizadas se sirven desde los assets estáticos del Worker (sin KV/R2/D1 para caché). |
| `wrangler.jsonc` | Worker `24shoots-web`: assets, binding `IMAGES` (optimización de imágenes), observabilidad y `SITE_ENV=preview` (noindex). |
| `scripts/cloudflare/post-build.mjs` | Excluye del upload las películas completas: superan el límite de 25 MiB por asset. |
| `scripts/cloudflare/upload-films.sh` | Sube las películas a R2 (se ejecuta a mano). |
| `package.json` → `cf:build`, `cf:preview`, `cf:deploy`, `cf:typegen` | Comandos. |

El código ya no depende de Vercel:
- La indexación depende de `SITE_ENV`.
- Vercel Analytics solo se carga si `VERCEL=1`. En Cloudflare se usa Web Analytics (sin cookies) cuando se define `NEXT_PUBLIC_CF_BEACON_TOKEN`.
- La IP del formulario se lee de `cf-connecting-ip`.
- Las películas se sirven desde `NEXT_PUBLIC_FILM_BASE`.

## Verificado en local (`npm run cf:preview`, 05-10-2026)

- **Rutas:** 28 rutas ES/EN responden 200, las redirecciones de V1 dan 308, las inexistentes dan 404, y sitemap, robots y `llms.txt` funcionan.
- **Indexación:** `robots.txt` devuelve `Disallow: /` con `SITE_ENV=preview`.
- **Formulario:** `/api/contact` envía en modo dry-run (`.dev.vars` → `CONTACT_DRY_RUN=1`).
- **Imágenes:** `/_next/image` sirve AVIF a través del binding `IMAGES`.
- **QA:** 18/18 checks de interacción y axe en 390 y 1440 sin incidencias (salvo la propia página 404, que es esperado).

## Coste: 0 €

| Pieza | Plan gratuito |
|---|---|
| Workers | 100.000 peticiones/día; tamaño del bundle dentro del límite (64 MiB sin comprimir) |
| Static assets | Las peticiones a assets estáticos no cuentan como invocaciones del Worker |
| Images (transformaciones) | 5.000 únicas/mes. El sitio usa unos pocos cientos (fotogramas × anchos × formatos), y las ya generadas se sirven desde caché |
| R2 (películas) | 10 GB y salida de datos gratuita. Las películas ocupan ~140 MB |
| Web Analytics | Gratis, sin cookies |

## Pasos para publicar (en orden; los marcados con ⚠ requieren tu confirmación)

1. **Cuenta y login**: `npx wrangler login` (abre el navegador con tu cuenta de Cloudflare).
2. **R2 para las películas**:
   ```bash
   npx wrangler r2 bucket create 24shoots-media
   BUCKET=24shoots-media bash scripts/cloudflare/upload-films.sh
   ```
   Después, en el panel: R2 → `24shoots-media` → *Custom domain* → `media.24shoots.es` (o, de momento, el subdominio `r2.dev`).
3. **Secretos** (nunca en el repo):
   ```bash
   npx wrangler secret put RESEND_API_KEY
   ```
4. **Deploy de preview** (noindex, en `*.workers.dev`):
   ```bash
   SITE_ENV=preview NEXT_PUBLIC_FILM_BASE=https://media.24shoots.es npm run cf:deploy
   ```
5. ⚠ **Dominio**: añadir `24shoots.es` a Cloudflare (cambio de nameservers en el registrador) y asociar el Worker en *Workers → Settings → Domains*. Es un cambio de DNS: **solo con tu confirmación explícita**.
6. ⚠ **Lanzamiento**: cambiar `SITE_ENV` a `production` en `wrangler.jsonc` y en el comando:
   ```bash
   SITE_ENV=production SITE_URL=https://24shoots.es NEXT_PUBLIC_FILM_BASE=https://media.24shoots.es npm run cf:deploy
   ```
7. **Web Analytics**: crear el sitio en el panel, copiar el token en `NEXT_PUBLIC_CF_BEACON_TOKEN` y volver a desplegar.

## Notas

- `npm run cf:preview` levanta el sitio en `http://localhost:8787` con `workerd`. El paso de *populate cache* de OpenNext (incluido en `preview` y `deploy`) es el que publica las páginas prerenderizadas: **no basta con `wrangler dev` a secas**.
- La reescritura «español en la raíz» (`next.config.ts`) está escrita como `/:first/:rest*` porque el router de OpenNext no recompone un parámetro con barras. Es equivalente en Vercel.
- Vercel queda como entorno de previews de la rama; el plan Hobby no permite uso comercial.
