# Restauración — estado pre-V2 (24SHOOTS)

**Fecha del punto de restauración:** 8 septiembre 2026  
**Propósito:** volver al estado exacto de la web **antes** de comenzar la implementación del rediseño V2.

---

## Punto de restauración oficial (código web)

| Campo | Valor |
| --- | --- |
| **Rama de backup** | `backup/pre-v2-2026-09-08` |
| **Commit** | `c302a4d40fd5bc93b0bd6016ad34a60b010e3bc8` |
| **Mensaje** | `fix(hero): fade desktop logo gradually into copy transition` |
| **Rama equivalente** | `main` (mismo commit en el momento del backup) |
| **Web live asociada** | `https://24shoots-web.vercel.app` |

Este commit contiene **solo código web pre-V2**. No incluye cambios de implementación V2.

---

## Cómo restaurar

### Opción A — checkout de la rama de backup

```bash
git fetch origin   # cuando exista remoto; opcional si solo trabajas en local
git checkout backup/pre-v2-2026-09-08
```

### Opción B — reset duro a commit exacto (rama de trabajo)

```bash
git checkout <tu-rama-de-trabajo>
git reset --hard c302a4d40fd5bc93b0bd6016ad34a60b010e3bc8
```

### Opción C — volver a main (si main no se ha movido)

```bash
git checkout main
git reset --hard c302a4d40fd5bc93b0bd6016ad34a60b010e3bc8
```

---

## Qué NO restaura este punto

| Recurso | Ubicación | Notas |
| --- | --- | --- |
| Master Spec V2 (documento) | `cursor/master-spec-v2-bb00` → commit `2828df2` | Solo documentación; no altera la web |
| Documentación de preparación | `cursor/v2-prep-bb00` | Snapshot + contexto estratégico |
| PR #1 | GitHub draft | Spec en revisión; no mergeado a `main` |

Para recuperar solo la spec:

```bash
git checkout cursor/master-spec-v2-bb00 -- docs/MASTER-SPEC-V2.md
```

---

## Verificación post-restauración

Tras restaurar, confirma:

```bash
git rev-parse HEAD
# debe ser: c302a4d40fd5bc93b0bd6016ad34a60b010e3bc8

git status
# working tree clean (salvo archivos locales ignorados)

git diff backup/pre-v2-2026-09-08
# sin diferencias si estás en el commit correcto
```

Comprueba visualmente:

- Hero con scroll / “SCROLL” (comportamiento pre-V2)
- Copy actual: “Domina el impacto”
- 10 servicios featured en home
- Formulario en `/es/contacto` (sin mailer real)

---

## Advertencias

- **No ejecutes `git push --force` a `main` sin autorización explícita.**
- `node_modules/`, `.next/` y builds locales no forman parte del backup git; reinstala con `npm install` y `npm run build` si hace falta.
- Carpetas locales como `backups/` en el repo son copias históricas; el backup git oficial es la rama `backup/pre-v2-2026-09-08`.
