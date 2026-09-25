# 24Shoots — Prompt de continuidad (portátil)

Copia y pega este bloque en un chat nuevo de Cursor al abrir el proyecto en el portátil.

---

## PROMPT PARA EL AGENTE

```
Eres el asistente del proyecto 24Shoots Media. Continúa desde el estado actual.

REPO: https://github.com/miguelbr16/24shoots-web
Rama: main
Stack: Next.js 15 + Tailwind 4 + TypeScript
Contenido: JSON en content/es/ y content/en/
Config: config/site.json
Media: public/imagenes_insta/
Arranque local Windows: iniciar-web.bat / reiniciar-web.bat (si error 500, borrar .next)
Compartir temporal: compartir-web.bat → ENLACE-PUBLICO.txt
Documentos clave: PRIORIDADES-24SHOOTS.txt, CONTINUAR-EN-CASA.txt, CONTACTO-PRUEBAS.txt, CONTINUAR-PORTATIL.md

IDENTIDAD
- Productora audiovisual Valencia (@24shootsmedia)
- Eslogan: "Domina el impacto"
- Paleta V2: fondo #141414, texto crema #F0EBE4, acento naranja #E8833A
- i18n: /es y /en

CONTACTO DE PRUEBA (mío, no del cliente — temporal)
- WhatsApp: +34638486622
- Email: mbrborrasroig@gmail.com
- Cuando el cliente esté listo: cambiar en config/site.json

YA HECHO
- ScrollHero: poster + vídeo al scroll (heroPoster + heroVideo en site.json)
- Portfolio modal caso de estudio (reto/enfoque/entregables/resultado)
- ServiceDetailView con hero, highlights, proyectos relacionados, CTA
- Instagram grid, ReelBand, ProcessSteps, MetadataTicker, ShotMetadata
- WhatsApp float + formulario contacto
- GitHub: repo privado/público miguelbr16/24shoots-web
- Backups: V1 y V2 en backups/ + bat de restauración

IMPORTANTE SOBRE CONTACTO / AUTOMATIZACIONES (acordado, NO implementar a lo loco)
- WhatsApp: mensaje pre-escrito en wa.me SÍ; respuestas auto en WhatsApp Business app del cliente; bots open-source (Baileys etc.) NO recomendados (riesgo ban)
- mailto: se puede pre-rellenar subject/body (pendiente)
- Formulario: hoy solo log en consola (api/contact). Plan: Resend (email) + Supabase (guardar leads). Con pocos leads, Supabase free basta
- Dominio del cliente → Vercel; datos de formularios → Supabase (no el dominio)

PENDIENTE AHORA (prioridad)
1. Plantilla mailto (subject + body) en footer y página contacto
2. Conectar formulario: Resend → email + Supabase tabla leads
3. Comprimir vídeos pesados en public/imagenes_insta/
4. Publicar en Vercel y conectar dominio del cliente
5. Más material real en portfolio/servicios; quitar logos de terceros en reels si se puede
6. og:image al compartir; foto equipo en Sobre nosotros
7. Sustituir placeholders legales (CIF, razón social, dirección)
8. Cuando toque: WhatsApp/email reales del cliente en site.json

FUTURO (no ahora): landings SEO Valencia, URLs /portfolio/[slug], showreel, split Bodas/Negocios/Eventos, precios/packs, blog, GBP, schema SEO — ver PRIORIDADES-24SHOOTS.txt

REGLAS
- No commits ni push salvo que yo lo pida
- No tocar backups/ salvo restaurar
- Mantener estética cinematográfica oscura existente
- Contacto de prueba es mío; no publicar como definitivo del cliente

Primero: clona/abre el repo, npm install, iniciar-web.bat, confirma que /es carga y el hero muestra poster/vídeo al scroll. Luego seguimos con el punto 1 o 2 que yo diga.
```

---

## Cómo seguir en el portátil

1. Instalar Git + Node.js si no los tienes.
2. Clonar:
   ```bash
   git clone https://github.com/miguelbr16/24shoots-web.git
   cd 24shoots-web
   npm install
   ```
3. Arrancar: `iniciar-web.bat` (o `npm run dev`) → http://localhost:3000/es
4. Abrir Cursor en esa carpeta y pegar el prompt de arriba.

## Commits recientes esperados en main

- Initial commit: web 24Shoots Media
- Sync: ReelBand + continuidad portátil (este push)

## Nota

Tu número y email de prueba están en el repo (`config/site.json`). Si el repo es público, cámbialo a Private en GitHub o quita los datos reales antes de compartir el enlace.
