# Snapshot del repositorio — pre-V2

**Generado:** 8 septiembre 2026  
**Estado del proyecto:** POST-AUDITORÍA → PRE-IMPLEMENTACIÓN  
**Web live:** https://24shoots-web.vercel.app

---

## 1. Git — estado en el momento del backup

| Campo | Valor |
| --- | --- |
| Rama activa al inspeccionar | `cursor/master-spec-v2-bb00` (solo spec; web en `main`) |
| Commit web (`main`) | `c302a4d40fd5bc93b0bd6016ad34a60b010e3bc8` |
| Commit spec | `2828df2907b710a9a56bcd0d2e2da42674159bfc` |
| `git status` | **Clean** — sin cambios locales sin commitear |
| Archivos untracked (git) | **Ninguno** |
| Cambios respecto a `origin/main` | Spec branch: +1 archivo (`docs/MASTER-SPEC-V2.md`) |

### Ramas locales creadas en preparación V2

| Rama | Apunta a | Propósito |
| --- | --- | --- |
| `backup/pre-v2-2026-09-08` | `c302a4d` | **Punto de restauración web** |
| `cursor/master-spec-v2-bb00` | `2828df2` | Master Spec + PR #1 (draft) |
| `cursor/v2-prep-bb00` | `main` + docs prep | Preparación V2 (este snapshot) |
| `main` | `c302a4d` | Baseline producción / Vercel |

### Restricciones respetadas en esta tarea

- No push
- No merge
- No modificación de `main`
- No cambios a componentes, copy, estilos, assets ni config funcional

---

## 2. Stack y dependencias

| Tecnología | Versión / notas |
| --- | --- |
| Next.js | ^15.3.3 |
| React | ^19.1.0 |
| TypeScript | ^5.8.3 |
| Tailwind CSS | ^4.1.7 |
| Hosting | Vercel (`config/site.json` → `24shoots-web.vercel.app`) |
| `vercel.json` | **No existe** |
| Cloudflare / OpenNext | **No en `main`** (existe copia experimental fuera de este baseline) |

### Scripts (`package.json`)

- `dev` — `next dev --turbopack`
- `build` — `next build`
- `start` — `next start`
- `lint` — `next lint`
- `new-site` — `node scripts/new-site.mjs`

---

## 3. Configuración Next.js (`next.config.ts`)

- `allowedDevOrigins`: `192.168.1.91`, `192.168.*`
- `images.formats`: AVIF, WebP
- `remotePatterns`: instagram.com, unsplash.com
- Sin override de `deviceSizes` (defaults Next → srcset hasta 3840px posible)

---

## 4. Estructura del proyecto

```
/workspace
├── config/
│   └── site.json              # URL, contacto, legal, hero video/poster
├── content/
│   ├── clients.json           # 14 clientes, logos placeholder
│   ├── es/                    # pages, services, portfolio, packs, instagram
│   └── en/                    # mirror i18n
├── docs/
│   ├── AVANCES-2026-07-24.md
│   ├── MASTER-SPEC-V2.md      # (en ramas spec/prep, no en main)
│   ├── RESTORE-PRE-V2.md
│   ├── REPO-SNAPSHOT-PRE-V2.md
│   └── V2-STRATEGIC-CONTEXT.md
├── public/
│   ├── clients/placeholders/  # p-01 … p-14.svg
│   ├── imagenes_insta/        # ~186 MB (grid Instagram)
│   ├── videos/web/            # ~157 MB (hero + portfolio videos)
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── [locale]/          # rutas i18n es/en
│   │   ├── api/contact/       # POST → console.log + {ok:true}
│   │   ├── layout.tsx, globals.css, robots.ts, sitemap.ts
│   │   └── page.tsx           # redirect root
│   ├── components/            # ~30 componentes (ScrollHero, ContactForm, …)
│   ├── hooks/
│   ├── lib/                   # content, seo, i18n, types
│   └── middleware.ts          # redirect locale
├── scripts/
└── backups/                   # copias locales históricas (no baseline git)
```

---

## 5. Rutas principales (`src/app/[locale]/`)

| Ruta | Archivo |
| --- | --- |
| `/es`, `/en` | `page.tsx` (home) |
| `/es/servicios`, `/[slug]` | servicios |
| `/es/portfolio` | portfolio |
| `/es/packs` | packs |
| `/es/contacto` | contacto + form |
| `/es/sobre-nosotros` | about |
| `/es/aviso-legal`, privacidad, cookies | legal |

---

## 6. Componentes críticos (pre-V2)

| Componente | Rol |
| --- | --- |
| `ScrollHero.tsx` | Hero 170–240vh, scroll-scrub, “SCROLL” |
| `HomeMobileHub.tsx` | Hub móvil tabs (lg:hidden) |
| `ServicesAccordion.tsx` | Servicios desktop |
| `ClientSocialProofSection.tsx` | Logos + reviews |
| `InstagramGrid.tsx` | Grid vídeos Instagram |
| `ContactForm.tsx` | Form → `/api/contact` |
| `PortfolioShowcase.tsx` | Portfolio |
| `Header.tsx`, `Footer.tsx` | Nav + CTAs |

---

## 7. Contenido (`content/`)

| Archivo | Notas |
| --- | --- |
| `es/services.json` | 10 servicios, todos `featured: true` |
| `es/portfolio.json` | 18 items: **17 video / 1 photo** |
| `es/pages.json` | Hero copy, FAQ, reviews, budget options |
| `clients.json` | 14/14 logos en `/clients/placeholders/` |

### Hero copy actual (`pages.json`)

- H1: “Domina el impacto”
- Sub: “De la boda al negocio”
- Video: `/videos/web/aftermovie-oicial-version-final-web.mp4`

---

## 8. Assets relevantes

| Asset | Tamaño aprox. |
| --- | --- |
| Hero MP4 | **~32.0 MB** (32 033 923 bytes) |
| `public/videos/` | ~157 MB |
| `public/imagenes_insta/` | ~186 MB |
| Placeholders clientes | 14 SVG |

---

## 9. Config sitio (`config/site.json`)

- URL: `https://24shoots-web.vercel.app`
- Email destino form: `hola@24shootsmedia.com` (mailer **no implementado**)
- WhatsApp: `+34661101863`
- Legal: razón social y domicilio `[PENDIENTE]`
- Theme: `#141414` / accent `#E8833A`

---

## 10. API contacto (`src/app/api/contact/route.ts`)

- POST → construye payload con `site.contact.email`
- **MVP:** `console.log` + `{ ok: true }`
- Sin Resend/SendGrid

---

## 11. SEO (`src/lib/seo.ts`)

- Title home: `24Shoots`
- Open Graph: sin `images`
- Favicon: **404** (no `app/icon`)
- `SectionHeading` → siempre `<h2>` (interiores sin H1)
- robots: allow `/` + sitemap

---

## 12. Hallazgos confirmados (referencia — no resueltos)

Documentados en `MASTER-SPEC-V2.md`. Pendientes de fases 0–7:

1. Hero tarda en comunicar oferta  
2. Copy abstracto / “de la boda al negocio”  
3. 10 servicios mismo nivel  
4. Portfolio 17/18 vídeo  
5. Form finge envío  
6. SEO incompleto  
7. Hero ~32 MB + scrub  
8. Mobile hereda desktop  
9. Placeholders como prueba social  

---

## 13. Ignorados por git (normales)

- `node_modules/`
- `.next/`
- `.env*.local`
- `/backups/` (copias locales en `.gitignore` parcial — carpeta `backups/` **sí está trackeada** en repo con snapshots antiguos)

---

## 14. PRs remotos (referencia)

| PR | Rama | Estado |
| --- | --- | --- |
| #1 | `cursor/master-spec-v2-bb00` | Draft, no mergeado |

`main` remoto = `c302a4d` (coincide con backup local).
