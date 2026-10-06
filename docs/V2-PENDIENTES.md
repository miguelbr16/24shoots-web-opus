# V2 — Planning y pendientes

Actualizado: 06-10-2026. Sustituye a la versión anterior (orientada a Vercel); el hosting definitivo es **Cloudflare** (ver `docs/CLOUDFLARE.md`).

Nada de lo que falta está inventado en la web: donde falta un dato, la web no lo afirma o lo marca como pendiente.

## Fases

| Fase | Qué | Estado |
|---|---|---|
| 0 | Investigación creativa, stack y herramientas (`docs/research/`) | ✅ Hecho |
| 1 | Prototipos A/D/E (`/lab/*`, noindex) | ✅ Hecho, descartados como Home |
| 2 | Home contada como historia + build y preview en Cloudflare Workers | ✅ Hecho ([preview](https://24shoots-web.miguelborrasroig.workers.dev), noindex) |
| 2b | Correcciones de auditoría + botón de WhatsApp con mensajes predeterminados | ✅ Hecho |
| **3** | **Reposicionamiento: de "productora de eventos" a "la marca del cliente"** | **⏳ Narrativa entregada (`docs/HOME-NARRATIVA-V3.md`), pendiente de aprobar. Plan completo: `docs/PLAN-V3.md`** |
| 4 | Nuevos casos y material (pipeline de medios) | Pendiente de material y permisos |
| 5 | Pestaña "Diario": tablón conectado a Instagram | Planificado, a la espera del cliente |
| 6 | Paso a producción (R2, Resend, analítica, legal, dominio, indexación) | Bloqueado por datos y accesos del cliente |
| 7 | Crecimiento: FAQ, landing SEM, Google Business Profile, rendimiento | Después de producción |

### Fase 3 — Reposicionamiento (en curso)

La Home actual cuenta bien la historia, pero toda la prueba es de eventos. 24SHOOTS hace contenido para marcas y redes, marketing para negocios, documental y retrato personal, y eventos; y **guía** al cliente con un método:

1. Estrategia (pilares, calendario).
2. Brief por pieza.
3. Sesión preparada.
4. Informe mensual con datos.

Plan:

- Nueva narrativa de la Home: la marca del cliente como protagonista y los eventos como una línea más. **Se propone por escrito antes de implementar.**
- Sección de método ("te guiamos"), contada de forma genérica. Nunca con documentos, cifras ni textos internos de clientes.
- Bloque "quién hay detrás" (Javier Renovell, fundador).
- Los packs, más visibles. Los rodajes personales, fuera de la Home (con página propia).

### Fase 4 — Casos candidatos

| Caso | Línea | Material | Estado |
|---|---|---|---|
| **Oceans Social Club** ([web](https://oceanssocialclub.com/), [@oceans_socialclub](https://www.instagram.com/oceans_socialclub/)) | Estrategia + contenido de marca y redes (cliente nuevo) | Publicaciones en su Instagram | OK para publicar el contenido. Los documentos internos (estrategia, briefs, informes) **son confidenciales y no se usan ni se guardan en el repo** |
| **Physem VLC** (clínica) | Contenido de marca y redes | Carrusel de fotos + reel "Off Season" | OK para publicar. Faltan los originales |
| **Aurum Capital Properties** | Marketing para negocio (inmobiliaria) | `ig-reel-2/3/9` + reel del chalet | OK para publicar. Llevan su logo encima: conviene tener los originales |
| **Alex Navarro** ("This is my story") | Documental y personal | `ig-reel-4` (3:15) | OK para publicar. Confirmar que se puede usar su nombre |
| Vera Producciones / Sol y Luna Events | Producción para agencias (eventos y bodas) | `ig-reel-1/5/6/7/10/11` + aftermovie | Segundo plano. Llevan marca de agua de terceros |
| Huhtamaki, Imperia, Premios Innovación, Generalitat, Ajuntaments | Eventos corporativos | Ya en la web | Confirmar permiso de nombre |

### Fase 5 — Pestaña "Diario" (Instagram)

Última pestaña del menú y una tira con lo último en la Home. Las publicaciones nuevas de @24shootsmedia aparecen solas.

- **Conexión:** API oficial de Instagram (Instagram Login, gratis). Requiere una cuenta Profesional (Empresa o Creador) y una app en Meta for Developers.
- **Automatismo:** un Cron Trigger de Cloudflare (gratis) cada hora:
  - Lee las publicaciones nuevas y guarda la lista (KV o D1).
  - **Copia imágenes y portadas a R2**, porque las URLs de Instagram caducan.
  - Renueva el token, que caduca a los 60 días.
- **Sin widgets de terceros:** ni Elfsight ni Behold (marca propia, límites, scripts externos).
- **Filtros por línea**, a partir de los hashtags o palabras clave del texto de cada publicación.
- **Interruptor para ocultar** una publicación concreta en la web.
- **Cada pieza** se abre en grande con un CTA "¿Quieres algo así?" (WhatsApp o formulario).
- **Mientras no esté conectado**, se puede montar la página con las piezas ya disponibles.

## Lo que necesitamos de 24SHOOTS

### Bloquea producción

| # | Qué | Para qué |
|---|---|---|
| 1 | **Activar R2** en el panel de Cloudflare (error 10042) | Películas completas (ahora dan 404) e imágenes del Diario |
| 2 | **Cuenta de Resend** con `24shoots.es` verificado (SPF/DKIM) y la API key como secreto del Worker | Que el formulario envíe a `info@24shoots.es` |
| 3 | **Confirmar el teléfono/WhatsApp** `+34 661 101 863` (viene de V1 y ya se muestra) | Botón de WhatsApp y contacto |
| 4 | **Datos legales:** titular (razón social o nombre), domicilio fiscal y confirmar el NIF `26761401G` | Aviso legal y privacidad |
| 5 | **Revisión de los textos legales** por su asesoría | Cumplimiento |
| 6 | **Cuenta de Umami Cloud** (gratis) y el ID del sitio como variable de entorno | Medir visitas y conversiones |
| 7 | **Confirmación para el dominio** `24shoots.es`: pasarlo a Cloudflare (DNS) y quitar el noindex | Publicar. Solo con confirmación explícita |

### Para la nueva Home y los casos (Fases 3–4)

| Qué | Para qué |
|---|---|
| Aprobar la nueva narrativa (cuando se entregue) | Implementarla |
| **Originales sin compresión ni logos** de Oceans, Physem (carrusel completo + reel), Aurum y Alex Navarro | Calidad en la web; Instagram comprime |
| Por caso: qué se hizo (estrategia, rodaje, gestión de redes), fechas y, si se puede, un resultado verificable | Fichas de caso honestas |
| ¿Podemos citar a Oceans como "estrategia + contenido mensual"? ¿Y el nombre de Alex Navarro? | Texto de los casos |
| Foto de Javier (rodando o con un cliente) y, si se quiere, del equipo | Bloque "quién hay detrás" |
| Packs: qué incluye cada uno y, opcionalmente, el precio "desde" | Página de packs y conversión |
| 1–2 testimonios reales con nombre y permiso (Oceans o Physem serían ideales) | Confianza |
| Logo vectorial (SVG/PDF) | Sustituir el logotipo tipográfico provisional |
| Fotos de un ejemplo de método **anonimizado o inventado** (calendario, brief, informe), o el OK para que lo diseñemos nosotros | Sección "te guiamos" sin exponer a clientes |

### Para el Diario (Fase 5)

| Qué |
|---|
| Confirmar que @24shootsmedia es una cuenta Profesional (Empresa o Creador) |
| Crear la app en Meta for Developers y autorizar la cuenta (guiado). El token va como secreto en Cloudflare, **nunca por chat** |
| Elegir los hashtags o palabras para clasificar las publicaciones por línea (o aceptar la clasificación manual) |

### Mejoras (no bloquean)

| Qué |
|---|
| LinkedIn de empresa y Google Business Profile (SEO local) |
| Subtítulos (VTT) de las piezas con discursos |
| Masters de las películas de eventos ya publicadas |

## Avisos

- La web V1 en producción muestra `hola@24shootsmedia.com`, que no existe (NXDOMAIN): los correos que reciba se pierden. No se ha tocado producción.
- `archive/notes/` contiene notas internas: moverlo a un repositorio privado si este repositorio llega a ser público.

## Operaciones que requieren confirmación explícita (no ejecutadas)

- Purgar los vídeos del historial de git (reescribe `main` y obliga a hacer force-push).
- Merge a `main` y publicación en producción.
- Cualquier cambio de DNS en `24shoots.es`.
