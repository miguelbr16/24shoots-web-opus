# Contexto estratégico V2 — 24SHOOTS

**Estado:** POST-AUDITORÍA → PRE-IMPLEMENTACIÓN  
**Fecha:** 8 septiembre 2026  
**Jerarquía de fuentes:**

1. **Este documento** — posicionamiento actualizado y reglas de proyecto  
2. **`docs/MASTER-SPEC-V2.md`** — auditoría, specs técnicas, roadmap detallado, matrices  
3. **Decisiones explícitas de Miguel** — prevalecen sobre recomendaciones de agentes  
4. **Código en `backup/pre-v2-2026-09-08`** — baseline web pre-V2  

Si hay conflicto entre Master Spec (sept 2026) y este documento en **posicionamiento**, **gana este documento**.

---

## Posicionamiento actualizado (referencia V2)

> **Estudio creativo de contenido y comunicación visual para marcas.**

### Qué significa

24SHOOTS no quiere limitarse a “productora que ejecuta vídeos o fotos”.

La evolución buscada:

**estrategia / concepto → dirección creativa → producción → contenido → comunicación de marca**

El audiovisual sigue siendo capacidad central y diferencial.  
Crecer hacia marketing/comunicación **no** implica agencia 360 genérica.

### Capacidades (sin ser identidad principal)

- Contenido para marcas  
- Branded content  
- Campañas  
- Contenido para redes  
- Dirección creativa  
- Comunicación visual  
- Producción audiovisual  
- Fotografía, vídeo, motion  
- Experiencias / eventos  

### NO posicionarnos como

- Agencia 360  
- Agencia de marketing generalista  
- Productora audiovisual generalista  
- Fotógrafo freelance  
- Empresa de aftermovies  
- Bodas/eventos como propuesta principal  

---

## Oferta principal de Home (futuro rediseño)

**Tres tipos de trabajo en primer plano:**

1. **Contenido de marca**  
2. **Campañas**  
3. **Eventos corporativos**  

**Secundario / landings / archivo:** bodas, Fallas, fiestas, videoclips, aftermovies, proyectos especiales.

**Dron:** capacidad técnica, no categoría estratégica principal.

---

## Dirección creativa (invariantes)

**Conservar:**

- Estética cinematográfica  
- Oscuro + naranja `#E8833A` + grain  
- Motion e impacto  
- Personalidad premium  
- Sensación de estudio creativo  

**No convertir** la web en página corporativa genérica.

### Hero (dirección exploratoria — NO implementar aún)

Prioridad conceptual: **24 Frames / Signature 24**

Requisitos cuando se implemente:

- Impacto inmediato  
- Identidad 24SHOOTS clara  
- Componente cinematográfico  
- Propuesta visible desde el **primer frame**  
- Sin obligar al usuario a “descubrir” la oferta tras varios segundos  

**Antes de implementar Hero:** analizar assets reales disponibles y decidir concepto definitivo.

---

## Desktop ≠ Mobile

### Desktop

Experiencia editorial / cinematográfica:

- Más narrativa, motion, portfolio, profundidad, storytelling  
- Objetivo: *“Quiero trabajar con ellos.”*  
- Propuesta de valor visible desde el inicio (no acertijo)

### Mobile

Producto distinto (~5–7 bloques):

- Hero 9:16 propio  
- CTA visible  
- 3 ofertas  
- 3 trabajos  
- Proceso  
- Cierre / conversión  
- **Sin** Hero largo de desktop

---

## Hallazgos confirmados (resolver en fases)

| # | Problema |
| --- | --- |
| 1 | Hero tarda en comunicar qué es 24SHOOTS |
| 2 | “Domina el impacto” demasiado abstracto |
| 3 | “De la boda al negocio” diluye B2B |
| 4 | 10 servicios mismo nivel |
| 5 | Portfolio 18 piezas: 17 vídeo / 1 foto |
| 6 | Form muestra éxito sin envío real |
| 7 | SEO necesita mejoras |
| 8 | Hero ~32 MB + scroll-scrubbing |
| 9 | Mobile hereda demasiado de desktop |
| 10 | Placeholders presentados como prueba social |

### Datos pendientes (NO son fallos estratégicos)

- Razón social, domicilio fiscal  
- Logos oficiales autorizados  
- Testimonios definitivos  
- Email corporativo definitivo  
- Dominio final  

Email destino previsto: `hola@24shootsmedia.com` — mailer pendiente de Fase 0.

---

## Roadmap (referencia — no iniciado)

| Fase | Nombre | Estado |
| --- | --- | --- |
| **0** | Críticos + preparación | ⬜ Pendiente autorización |
| **1** | Posicionamiento + arquitectura | ⬜ |
| **2** | Hero + UX + CRO dual | ⬜ |
| **3** | Portfolio + case studies | ⬜ |
| **4** | SEO | ⬜ |
| **5** | Performance + assets | ⬜ |
| **6** | Cloudflare | ⬜ No ahora |
| **7** | Analytics | ⬜ |

Detalle por fase: `MASTER-SPEC-V2.md` §22 y specs SPEC-01…12.

---

## Reglas del proyecto

### NO

- Reconstruir todo sin necesidad  
- Cambiar stack  
- Migrar Cloudflare ahora  
- Inventar clientes, testimonios, KPIs, datos legales  
- Publicar placeholders como prueba social  
- Agencia 360 / productora genérica  
- Hero corporativo aburrido  
- Componentes paralelos innecesarios (`Hero.tsx` nuevo, etc.)  
- Tocar `main`, push, merge sin autorización  
- Implementar fases sin orden explícito  

### SÍ

- Trabajar sobre código existente  
- Reutilizar componentes  
- Mantener identidad visual y cine  
- Mobile específico  
- Cambios pequeños y reversibles  
- Documentar decisiones  
- Probar cada cambio  
- PRs separados por fase  
- Restaurar desde `backup/pre-v2-2026-09-08` si hace falta  

---

## Roles de herramientas

| Herramienta | Rol |
| --- | --- |
| ChatGPT | Estrategia, dirección creativa, arquitectura, prompts, arbitraje |
| Grok | Segunda opinión, crítica, revisión |
| Gemini | Auditoría técnica, código, SEO, performance |
| Claude | UX, copy, crítica |
| Composer / Cursor | Implementación en repo real |
| Grok Bot | QA navegador, desktop/mobile, romper experiencia |
| Picsart | Preparación/edición assets visuales |

---

## Punto de restauración

Ver `docs/RESTORE-PRE-V2.md`

- Rama: `backup/pre-v2-2026-09-08`  
- Commit: `c302a4d40fd5bc93b0bd6016ad34a60b010e3bc8`

---

## Próximo paso autorizado

**Ninguna fase de implementación** hasta orden explícita.

Cuando se autorice, empezar por **Fase 0** en rama de trabajo dedicada (p. ej. `cursor/v2-phase-0-bb00`), ramificada desde `backup/pre-v2-2026-09-08` o `cursor/v2-prep-bb00`.
