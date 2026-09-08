# V2 — Checklist de preparación

**Estado:** ✅ PREPARACIÓN COMPLETADA (8 sept 2026)  
**Implementación V2:** ⬜ NO INICIADA

---

## Backup

- [x] Rama `backup/pre-v2-2026-09-08` → commit `c302a4d`
- [x] Instrucciones en `docs/RESTORE-PRE-V2.md`
- [x] Working tree limpio al crear backup
- [x] Sin push / merge / cambios en `main`

## Documentación

- [x] `docs/REPO-SNAPSHOT-PRE-V2.md` — inspección del repo
- [x] `docs/V2-STRATEGIC-CONTEXT.md` — posicionamiento actualizado + reglas
- [x] `docs/MASTER-SPEC-V2.md` — spec completa (desde rama spec)
- [x] `docs/RESTORE-PRE-V2.md` — restauración

## Web

- [x] Código web idéntico a `main` / backup (sin cambios funcionales)
- [x] Sin modificaciones a componentes, copy, estilos, assets, config

## Pendiente antes de Fase 0

- [ ] Autorización explícita de Miguel para Fase 0
- [ ] Decisión: merge PR #1 (spec) o trabajar desde `cursor/v2-prep-bb00`
- [ ] Inventario assets para Hero (24 Frames vs alternativa)
- [ ] Datos cliente: logos, legal, testimonios (paralelo, no bloqueante para F0 técnico)
- [ ] Configurar Grok Bot QA & Guardian (operaciones)
- [ ] Crear rama `cursor/v2-phase-0-bb00` cuando se autorice implementación

## Ramas recomendadas

| Uso | Rama |
| --- | --- |
| Restaurar web pre-V2 | `backup/pre-v2-2026-09-08` |
| Documentación + contexto | `cursor/v2-prep-bb00` |
| Master Spec (PR #1) | `cursor/master-spec-v2-bb00` |
| Producción actual | `main` @ `c302a4d` |
| Futura implementación F0 | `cursor/v2-phase-0-bb00` (crear al autorizar) |

## Lectura obligatoria antes de implementar

1. `docs/V2-STRATEGIC-CONTEXT.md`  
2. `docs/MASTER-SPEC-V2.md` §25 (5 decisiones) + §23 (SPECs)  
3. `docs/RESTORE-PRE-V2.md`  
