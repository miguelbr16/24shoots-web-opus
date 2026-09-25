# V2 — Pendientes externos

La web está construida y funcionando. Esto es lo que depende de 24SHOOTS o de servicios externos. Nada de lo que aparece aquí está inventado en la web: donde falta un dato, la web no lo afirma o lo marca como pendiente.

## Bloqueantes para publicar en producción

| # | Qué | Quién | Dónde se aplica |
|---|---|---|---|
| 1 | **Confirmar el dominio `24shoots.es`** y dar acceso al DNS | 24SHOOTS | `SITE_URL` en Vercel |
| 2 | **Cuenta de Resend** con el dominio verificado (registros SPF/DKIM en el DNS) y `RESEND_API_KEY` en Vercel | 24SHOOTS + desarrollo | `.env.example` |
| 3 | **Probar un envío real** a `info@24shoots.es` desde el preview de Vercel | desarrollo | — |
| 4 | **Datos legales**: titular (razón social o nombre) y domicilio fiscal; confirmar el NIF `26761401G` (viene de V1) | 24SHOOTS | `src/lib/site.ts` → `legal` |
| 5 | **Permiso para nombrar a cada cliente** (Huhtamaki, Generalitat Valenciana, Ajuntament de València, Ajuntament de Manises, Imperia SCM) y a MAS Events | 24SHOOTS | `src/content/cases.ts` |
| 6 | **Revisión de los textos legales** y de la decisión de no mostrar banner de cookies (la analítica no usa cookies) | asesoría de 24SHOOTS | `src/content/legal.ts` |
| 7 | **Activar Web Analytics y Speed Insights** en el proyecto de Vercel | desarrollo | — |

## Datos que mejorarían la web (no bloquean)

| Qué | Para qué | Dónde |
|---|---|---|
| Por caso: rol exacto de 24SHOOTS (contrato directo o a través de MAS Events), qué se entregó además de la película, fecha y lugar | Ficha del caso más completa | `cases.ts` (campos `with`, `when`; añadir `deliverables`) |
| Confirmar el teléfono `+34 661 101 863` (viene de V1) | Contacto | `src/lib/site.ts` |
| Equipo: nombres, roles y fotos reales trabajando; año de inicio | Página de Estudio | `src/views/Studio.tsx` |
| 1–2 testimonios reales con nombre, cargo y permiso escrito | Confianza | nueva sección (no existe hasta que haya uno real) |
| Casos de contenido de marca o campañas (candidatos del archivo: Aurum Capital, Alex Navarro) con permiso | Prueba para las áreas 2 y 3 | `archive/media/instagram/` → pipeline |
| Rol en la pieza de Sol y Luna Events y permiso | Posible caso de "producción para agencias" | `archive/media/sol-y-luna-events-aftermovie.mp4` |
| **Logo vectorial** (SVG/PDF) | Sustituir el logotipo tipográfico provisional | `src/components/Wordmark.tsx`, iconos en `public/` |
| **Masters** de las cinco películas (alta calidad) | Fotogramas y loops más nítidos | `public/media/<caso>/film.mp4` + `npm run media` |
| Subtítulos (VTT) de las piezas con discursos | Accesibilidad de las películas | `FilmPlayer` (`<track>`) |
| Perfil de LinkedIn de empresa y Google Business Profile | SEO local y señales de entidad | `sameAs` en `src/lib/seo.ts` |
| Aprobación final de los textos (ES y EN) | — | `src/content/copy.ts`, `services.ts` |

## Operaciones que requieren tu confirmación explícita (no ejecutadas)

- **Purgar el vídeo del historial de git** (~340 MB). Requiere reescribir la historia de `main` y hacer force-push: todos los clones quedarían obsoletos. Con V2 ya no se despliega ese vídeo (`public/` solo contiene lo que usa la web y `archive/` está excluido con `.vercelignore`), pero el repositorio sigue pesando lo mismo. Comando preparado, **no ejecutado**:
  ```bash
  # git filter-repo --path public/imagenes_insta --path archive/media --invert-paths   (+ force-push coordinado)
  ```
- **Publicar V2 en producción** (merge a `main` y redirección de `24shoots-web.vercel.app` al dominio nuevo).
- **Configurar DNS** (Vercel y Resend).
- **Mover `archive/notes/`** (notas personales, cuestionarios, playbook de negocio) a un repositorio privado aparte, si el repositorio llega a ser público.

## Decisiones de implementación que se apartan del Master Plan

- **Streaming de vídeo**: las películas se sirven como MP4 progresivo desde Vercel (con `preload="none"`; solo se descargan al pulsar reproducir). Bunny Stream o Mux quedan como mejora futura. No compensaba añadir un servicio externo para cinco piezas de 16–38 MB.
- **Índice de trabajo sin filtro**: los cinco casos son de la misma área, así que un filtro mostraría dos categorías vacías. Se añadirá cuando haya casos de contenido de marca o campañas.
- **Lista de planos del Hero**: en escritorio (≥1280 px) el Hero muestra además una lista de los cinco planos. Al pasar el ratón, el monitor corta a ese plano; al hacer clic, se abre el proyecto. Es a la vez prueba y navegación.
- **Sin View Transitions entre páginas**: en Next 15 dependen de APIs experimentales de React; la transición de imagen (`expose`) se aplica al entrar en cada página.
