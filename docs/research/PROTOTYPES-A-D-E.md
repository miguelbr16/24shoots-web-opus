# 24SHOOTS — Prototipos A / D / E: evidencia comparada

Rama: `claude/confident-galileo-rgun26` · Fecha: 28-09-2026 · **Solo prototipos. No se ha tocado la Home, `main` ni producción.**

## 0. Qué se ha construido y cómo se ha medido

| Prototipo | Ruta (preview de Vercel, `noindex`) | Qué responde |
|---|---|---|
| **A — Cinemática** | `/lab/a` | ¿Funciona la Home como tráiler: montaje real, créditos y un único CTA? |
| **D — 24 fotogramas** | `/lab/d` | ¿Funcionan 24 fotogramas numerados, con los casos como capítulos, recorridos con el scroll? |
| D12 (variante de control) | `/lab/d12` | ¿Mejora D con 12 fotogramas (los pares)? |
| **E — 24 fotogramas + sala** | `/lab/e` | ¿Aporta la «sala» (ver la pieza real sin salir de la Home) algo que D no tenga? |

Las exploraciones anteriores siguen intactas en `/lab/v1-a`, `/lab/v1-b` y `/lab/v1-c`. No se ha borrado nada.

**Mismo material para todas.** Son 24 fotogramas reales de las 5 películas entregadas: Huhtamaki (6), Isabel Ferrer (5), Innovación
València (5), Imperia (4) y Manises (4), con los tiempos de las fotos fijas ya seleccionadas en el pipeline. De cada fotograma hay
un loop corto **que no sale de su plano**: el script detecta los cortes con ffmpeg. Lo genera `scripts/lab/frames.mjs`. El copy
es el ya aprobado; el único email es `info@24shoots.es`; WhatsApp y teléfono **no se muestran** porque están pendientes de
confirmar. Las tres variantes usan la misma cabecera mínima (24SHOOTS · Trabajo · Packs · **Hablemos**) y el mismo bloque de
contacto, para que la comparación sea de experiencia y no de assets.

**Medición.** Playwright + Chromium (headless) en 390×844 y 430×932 (móvil, táctil, DPR 2) y 1440×900. En cada caso se capturan
5 momentos: estado inicial a los 3 s, primer gesto, primer scroll, momento de máxima experiencia y contacto. Además hay una pasada
con **4G lenta simulada** (1,6 Mb/s, 150 ms de latencia, CPU ×4), otra con `prefers-reduced-motion` y otra **sin JavaScript**.
El script está en `scripts/lab/capture.mjs`, los datos brutos en `docs/research/prototypes/metrics.json` y las capturas en
`docs/research/prototypes/`.

**Límites de la medición (sin inventar nada):**
- Es un servidor local: los tiempos sin throttling reflejan CPU y render, no red. La pasada con 4G lenta es la más
  representativa.
- **INP** no se puede medir bien sin usuarios reales. Doy la duración máxima de los eventos durante los gestos del script
  (Event Timing) como aproximación.
- En este Chromium **sí se reproducen los loops AV1 (WebM)**, pero **no el H.264**. La película completa de la sala de E
  (MP4 H.264) no se ha podido reproducir aquí: solo se comprueba que abre, que carga el póster y que muestra los controles.
- No se ha podido medir la sensación física del scroll-snap en iOS (barra de direcciones, inercia). **Hay que probarlo en un
  iPhone real.**

---

## 1. Hallazgos que afectan a las tres direcciones

1. **Solo existe material de eventos.** Las 5 piezas son eventos (corporativo, galas, congreso). «Contenido de marca» y
   «Campañas» **no tienen prueba visual** en ninguna variante. Ninguna dirección lo arregla: falta material, no diseño.
2. **En móvil, la imagen a pantalla completa pierde nitidez.** Los másters son 1920×1080. Un recorte vertical a pantalla completa
   en un móvil con DPR 2 pide unos 780×1690 px, y el plano solo tiene 1080 de alto, así que se amplía ~1,6×. Se ve en las
   capturas de 390 y 430 (por ejemplo, el photocall de Huhtamaki). En escritorio el 16:9 nativo se ve nítido. Esto pesa más que
   cualquier efecto: o conseguimos másters mejores o verticales, o en móvil hay que aceptar un encuadre menos agresivo.
3. **Los planos del montaje son cortos.** Los loops que no cortan plano duran entre 0,9 y 2,4 s (la mayoría ~1,5–2,4 s).
   - En **A** eso es una ventaja: encadenados, se convierten en un montaje con el ritmo con que se editaron las piezas.
   - En **D y E** cada loop se repite sobre sí mismo cada 1–2 s. En los planos más cortos (0,9–1,2 s) el bucle se nota.
4. **Las películas son de 30 fps.** «24 fotogramas = 1 segundo» es la convención del cine, no un dato técnico de nuestro
   material. En el copy de D/E se usa como concepto («24 fotogramas de trabajo real»), sin afirmar nada sobre los fps.
5. **No hay pantalla negra ni CLS en ninguna variante.** El póster es siempre la base y el vídeo se superpone solo cuando
   reproduce. El único CLS medido es 0,011–0,013 en escritorio (D/E, al cargar la fuente). Un fallo que dejaba la pantalla en
   negro (clases `relative` y `absolute` a la vez, el mismo bug que tuvimos en `FilmLoop`) **se detectó en la primera captura y
   se corrigió** antes de medir.
6. **Todo es medible.** Los 13 eventos pedidos tienen enganche en las tres variantes (`data-track` más observadores).
   En la sesión de prueba se registraron `hero_view`, `piece_view`, `frame_reach` (25/50/75/100 %), `case_open`, `video_play`,
   `cta` y `contact_link`. `video_progress` solo está en la sala de E, y `form_*` se medirá en `/contacto`, porque ningún
   prototipo tiene formulario en la Home.

---

## 2. A — Cinemática

**Patrón:** reel a pantalla completa (Park Pictures, Academy en móvil) + numeración por pieza (Iconoclast). **Por qué:** es
el camino más corto de IMPACTO a PRUEBA. **Qué aporta:** el trabajo se ve montado, con ritmo. **Riesgo:** parecerse a
cualquier productora.

### Evidencia

**Primeros 3 s (390×844).** Fotograma real a sangre con el loop en marcha (photocall de Huhtamaki). Abajo: «Estudio creativo
de contenido y comunicación visual para marcas · Valencia», el H1 «Un evento termina. El contenido continúa.», el crédito
«01/05 Huhtamaki — 50 aniversario · Evento corporativo», los controles ← → ❚❚, una barra de progreso de 5 segmentos y «Ver
pieza →». No hay pantalla negra. Se entiende que es 24SHOOTS (cabecera) y qué hace (descriptor).

**Primer gesto (tocar a la derecha o deslizar).** Corte seco a la pieza 02 (estatuillas de Isabel Ferrer). El contador pasa a
02/05 y avanza la barra. La recompensa es inmediata.

**Primer scroll.** Se **sale del tráiler**: «Lo que hacemos» (3 territorios) y el bloque de contacto. Desde ahí la
experiencia ya **solo desplaza contenido**: a partir del hero no se ve más trabajo.

**Máxima experiencia.** Quedarse quieto: el tráiler encadena los 24 planos (6–8 loops reproducidos en ~15 s de sesión), con
cortes que respetan el montaje original.

**Conversión.**
- «Hablemos» está en la cabecera desde el segundo 0.
- Primer CTA dentro del contenido: a 939–1.026 px (**1 gesto**).
- Contacto: a 1.105–1.196 px (**1–2 gestos**).
- Qué se puede contratar: sí, la línea de 3 territorios lo dice (aunque Marca y Campañas no tienen prueba; ver §1).
- Fricción: ninguna relevante.

**390 vs 430 vs 1440.**
- **390:** el texto (descriptor + H1 + crédito + controles) ocupa **~45 % del alto** sobre la imagen, y el crédito largo se
  corta («Generalitat Valenciana …»).
- **430:** igual, con algo más de aire; el corte del crédito persiste («Generalitat Valenciana — XXV…»).
- **1440:** la mejor composición de las tres variantes. 16:9 nativo y nítido; texto a la izquierda, controles a la derecha.
  Impacto alto con poca interfaz.

**Performance.**

| | 390 | 430 | 1440 |
|---|---|---|---|
| Peticiones (sesión ~15 s) | 46 | 46 | 51 |
| Vídeo descargado en la sesión | 1,39 MB | 1,67 MB | 1,67 MB |
| Imágenes | 213 kB | 274 kB | 529 kB |
| JS | 149 kB | 149 kB | 149 kB |
| CLS | 0 | 0 | 0 |

- **4G lenta:** LCP 852 ms (el H1); póster 01 a 1.045 ms; 762 kB en los primeros ~5 s.
- **Autoplay:** reproduce en continuo mientras el hero está visible. **Es la variante que más vídeo consume**
  (~100 kB/s). Se pausa al salir de la vista.

**Complejidad técnica.**
- Tecnología: React (estado) + `<video>` nativo. Sin GSAP ni WebGL. **Baja** complejidad de implementación y de mantenimiento.
- Accesibilidad: cumple WCAG 2.2.2 porque hay botón de pausa para el movimiento automático. Botones con `aria-label`.
- Sin JS: se ve el póster de la primera pieza, el texto y todos los enlaces. La página sigue siendo usable.
- `prefers-reduced-motion`: ni autoplay ni avance automático (0 vídeos reproducidos); se navega con flechas.

**Qué conservaría:** el tráiler encadenado con los cortes reales (es lo que mejor aprovecha el material), el crédito corto y
la barra por pieza.
**Qué descartaría:** tanto texto superpuesto en móvil (moverlo bajo la imagen o reducirlo) y el hecho de que después del hero
no haya más trabajo.

---

## 3. D — 24 fotogramas

**Patrón:** secuencia de 24 fotogramas numerados + contador fijo como indicador de scroll (tira de Irene Butenko y Andrew
McCarthy; la técnica «de DOM a WebGL» de Codrops, aquí sin WebGL). **Por qué:** convertir el nombre en la mecánica. **Qué
aporta:** identidad propia. **Riesgo:** repetición y distancia hasta el contacto.

### Evidencia

**Primeros 3 s (390).** Fotograma 01 (aérea de la planta de Huhtamaki) a sangre con loop, contador grande **01/24** arriba a la
derecha, H1 centrado y «24 fotogramas de trabajo real ↓». Abajo: «Capítulo 1 · Evento corporativo · Huhtamaki · 50
aniversario». Se entiende la marca y la idea. No hay pantalla negra.

**Primer gesto (deslizar).** El snap encaja el fotograma 02 y el contador pasa a **02/24**. Recompensa inmediata, y el
contador hace **tangible el progreso**.

**Primer scroll.** Fotograma 03. Mismo patrón: cambia la imagen y el contexto es mínimo («Huhtamaki — 50 aniversario»).
**Hacen falta 6 gestos para ver un segundo cliente.**

**Máxima experiencia.** Mitad de la secuencia (12/24, técnico de MAS Events montando pantallas LED). Es potente como imagen,
pero es el mismo gesto repetido 12 veces.

**Conversión.**
- «Hablemos» en la cabecera desde el segundo 0.
- Primer CTA dentro del contenido: **al final, tras 24 gestos** (20.256 px en 390).
- «Ver pieza →» solo aparece en el último fotograma de cada capítulo.
- Qué se puede contratar: **no aparece**. Solo el tipo de evento de cada capítulo.
- D12 reduce a **12 gestos** (10.128 px) con el mismo patrón.

**390 vs 430 vs 1440.**
- **390 y 430:** la jerarquía funciona (imagen → contador → crédito). La blandura del recorte vertical (§1.2) se nota más
  que en A, porque cada fotograma se mira quieto.
- **1440:** tira horizontal que avanza con el scroll: el fotograma activo iluminado, los vecinos atenuados y el contador enorme.
  Es la composición **más propia y más «cine»** de todas, pero **recorrer los 24 fotogramas cuesta ~10 pantallas de
  scroll** (9.828 px de alto).

**Performance.**

| | 390 | 430 | 1440 |
|---|---|---|---|
| Peticiones | 51 | 50 | 53 |
| Vídeo (solo el fotograma activo) | 515 kB | 515 kB | 1,26 MB |
| Imágenes (carga diferida) | 506 kB | 662 kB | 593 kB |
| CLS | 0 | 0 | 0,013 |

- **4G lenta:** LCP 876 ms; póster a 1.053 ms; 725 kB en los primeros ~5 s. **Es el arranque más ligero** junto con D12.

**Complejidad técnica.**
- Tecnología: sticky + transformación calculada con el scroll (escritorio) y scroll-snap nativo (móvil). Sin librerías.
  Complejidad **media**.
- Riesgos: `scroll-snap: mandatory` en iOS con la barra de direcciones (hay que probarlo en un dispositivo real) y el mapeo
  del scroll vertical a horizontal en escritorio (no secuestra el scroll, pero puede desorientar).
- Sin JS: 24 imágenes apiladas (20.847 px). Funciona como galería, pero Chrome **carga todas las imágenes a la vez** (sin JS
  desactiva la carga diferida).
- `prefers-reduced-motion`: 0 vídeos; se ven los fotogramas fijos.

**Qué conservaría:** el contador **NN/24** como indicador de progreso (es la pieza de identidad más fuerte de toda la
exploración) y la tira horizontal de escritorio **como momento, no como recorrido entero**.
**Qué descartaría:** los 24 gestos seguidos en móvil. Para vender es demasiado largo y demasiado repetitivo (6 fotogramas
seguidos del mismo cliente).

---

## 4. E — 24 fotogramas + sala

**Patrón:** D + dos ejes en móvil (vertical = pieza, horizontal = sus fotogramas) + **sala** (`<dialog>` nativo con la
película real, créditos y CTA). **Por qué:** resolver la claridad y la conversión de D. **Qué aporta:** permite ver el trabajo
completo sin salir de la Home. **Riesgo:** complejidad y un eje oculto.

### Evidencia

**Primeros 3 s (390).** Igual que D (01/24, H1), pero abajo aparece la pieza entera: «Pieza 1/5 · Evento corporativo ·
**Huhtamaki** · 50 aniversario», una barra de 6 fotogramas, «Desliza → 6 fotogramas» y **dos acciones visibles: «▶ Ver en
sala» y «Hablemos de algo así»** (CTA a 780 px, dentro de la primera pantalla).

**Primer gesto (horizontal).** Fotograma 02 de la misma pieza; el contador y la barra avanzan.

**Primer scroll (vertical).** **Pieza siguiente** (07/24, Isabel Ferrer). **Cada gesto vertical es un cliente nuevo: 5 clientes
en 5 gestos**, frente a los 24 de D.

**Máxima experiencia: la sala.** Pantalla completa en negro, la película real con controles, créditos (Gala institucional ·
8 de marzo · con MAS Events · Generalitat Valenciana · XXVIII Premios Isabel Ferrer) y, juntos, «Hablemos de algo así →» y
«Ficha completa». Al cerrar (× o Esc) se vuelve al mismo sitio y el foco regresa al botón que la abrió. **Es la única variante
en la que se puede ver una pieza completa en la Home.**

**Conversión.**
- «Hablemos» en la cabecera + **CTA contextual en la primera pantalla y en cada pieza**.
- Contacto a **5 gestos** (4.220 px).
- Qué se puede contratar: se ve el tipo de cada pieza, pero no hay línea de servicios.
- **Fricción:** el eje horizontal **no se ve**. Solo lo anuncia un texto pequeño («Desliza →»), y quien no lo descubra verá 5
  fotogramas en lugar de 24.

**390 vs 430 vs 1440.**
- **390 y 430:** la variante móvil más completa. Hay más texto en pantalla que en D (pieza + 2 acciones), pero ordenado.
- **1440:** es la tira de D **más** el botón «▶ Ver en sala». **El escritorio no mejora la longitud de D** (los mismos
  9.828 px); solo añade la sala.

**Performance.**

| | 390 | 430 | 1440 |
|---|---|---|---|
| Peticiones | 59 | 58 | 54 |
| Vídeo | 494 kB | 493 kB | 1,15 MB |
| Imágenes | 596 kB | 769 kB | 545 kB |
| CLS | 0 | 0 | 0,011 |

- **4G lenta:** LCP 1.036 ms (el más lento, aunque de poco); póster a 1.027 ms; 824 kB en los primeros ~5 s.
- La sala **no descarga la película hasta que se pulsa play** (`preload="none"`). En producción debería servirse en HLS
  (§16 del informe de stack), no el MP4 de 37 MB.

**Complejidad técnica.**
- Tecnología: dos maquetaciones (móvil y escritorio) + scroll anidado + `<dialog>`. Complejidad **alta**; mantenimiento
  **medio-alto**.
- Accesibilidad: `<dialog>` nativo (foco atrapado, Esc, `aria-label`) y botones reales. Riesgo en iOS: el scroll horizontal
  dentro de un snap vertical puede provocar gestos que se interpretan mal.
- Sin JS: **48 imágenes** en el DOM (las dos maquetaciones), así que el **marcado está duplicado**. Si pasa a producción hay
  que resolverlo.
- `prefers-reduced-motion`: 0 vídeos.

**Qué conservaría:** **la sala** (ver la pieza con su CTA al lado), **un gesto vertical = una pieza** y el CTA contextual
«Hablemos de algo así».
**Qué descartaría:** el eje horizontal oculto, la maquetación duplicada y el escritorio igual que D.

**¿Aporta E algo respecto a D, o solo complejidad?** **Aporta**, y la evidencia lo muestra: primer CTA en la primera pantalla
(D: al final), contacto a 5 gestos (D: 24), 5 clientes en 5 gestos (D: 1 cliente en 6) y la posibilidad de ver una pieza
completa. El coste es la complejidad y un eje que puede pasar desapercibido.

---

## 5. Lovable — exploración visual («¿cómo podría sentirse?»)

Se han creado 3 proyectos en el workspace Pro («24SHOOTS: Cinemática», «24 Frames Lab» y «24Shoots FrameLab»). Cada uno tiene 3
variantes que se cambian con un selector flotante y usa los mismos 10 fotogramas reales. **No se ha reutilizado nada de su
código en el repo.**

| Proyecto | Estado | Qué se observa |
|---|---|---|
| A · Cinemática | Completado con imágenes | Variante 1: aérea de Huhtamaki a sangre, crédito «01/05 HUHTAMAKI — 50 ANIVERSARIO» en condensada grande y barra de progreso larga. Confirma que el crédito tipográfico grande funciona mejor que el pequeño de nuestro prototipo. Captura: `prototypes/lovable-a-1920.jpg` |
| D · 24 fotogramas | En la primera pasada **no recibió las imágenes** y dejó los huecos marcados en lugar de inventar metraje (correcto). Se reenviaron | Intro «24 / FOTOGRAMAS.» en contorno gigante + «Un segundo de nuestro trabajo.» + contador 00/24. **Arranca en negro, sin trabajo**: el mismo patrón que descartamos en la fase 1 (Obys). Tras el reenvío, las imágenes aparecen en la tira bajo la intro. Captura: `prototypes/lovable-d-1920.jpg` |
| E · 24 + sala | La primera pasada tampoco recibió las imágenes; se reenviaron y el agente se quedó esperando que aprobaras su plan. Se le indicó que construyera. Completado | Intro con el H1 en **serif gigante** sobre negro, sin imagen. Captura: `prototypes/lovable-e-1920.jpg` |

**Incidencias de uso (útiles para el workflow):**
- Los adjuntos que suben por la API **solo le llegan al primer proyecto que los recibe**. Para cada proyecto hay que volver a
  subirlos.
- Las previews de Lovable **piden sesión** (HTTP 401), así que no puedo capturarlas a 390/430 y **las tienes que abrir tú** en el
  editor. No las he publicado para esquivarlo.

### 5.1 Estado final de los proyectos de Lovable

Los tres proyectos están terminados. Lo que dejan como hipótesis visual (solo he visto la captura de escritorio; **las
variantes 2/3 y el móvil tienes que revisarlos en el editor**):

- **Lovable A** coincide con nuestro A en estructura, pero el crédito en condensada **grande** tiene más presencia que el
  nuestro. Es una idea que conviene llevarse.
- **Lovable D** y **Lovable E** abren con **tipografía gigante sobre negro** («24 FOTOGRAMAS.» en contorno; «Un evento
  termina.» en serif). En los primeros 3 s **no se ve trabajo**. Visualmente es atractivo, pero contradice la evidencia
  del repo: lo que engancha en los primeros segundos es el metraje real. **Tomaría de ahí la tipografía, no la apertura.**
- La **serif** de Lovable E es la única alternativa tipográfica real a la condensada que exploramos. Merece compararla en móvil.

Enlaces del editor (requieren tu sesión):
- A: https://lovable.dev/projects/b0d136e5-52cf-4268-b682-421a720bc7ae
- D: https://lovable.dev/projects/2fbdad28-fc5c-4bf7-b123-1f5195c06fe4
- E: https://lovable.dev/projects/7f2c091b-6eac-441a-88d9-3152c20a264b

---

## 6. Matriz comparativa (cualitativa; **no** es una suma que decida)

| Criterio | A · Cinemática | D · 24 fotogramas | E · 24 + sala |
|---|---|---|---|
| **Impacto (3 s)** | Alto: movimiento real desde el segundo 0 | Alto: fotograma + 01/24 | Alto: igual que D, con más texto |
| **Deseo** | Alto: el montaje transmite «saben contar» | Medio: la imagen quieta y repetida pierde fuerza | Alto: la sala permite ver la pieza completa |
| **Diferenciación** | Baja-media: patrón de productora | **Alta**: el contador NN/24 es propio | Alta |
| **Claridad** | **Alta** | Baja-media: ¿qué es cada fotograma? | Media-alta (el eje horizontal no se descubre) |
| **Conversión** | Alta: CTA a 1 gesto, contacto a 1–2 | **Baja**: CTA tras 24 gestos | **Alta**: CTA en la primera pantalla, contacto a 5 |
| **Mobile** | Bueno, pero demasiado texto sobre la imagen | Bueno visualmente, largo en gestos | El más completo; riesgo de gestos anidados |
| **Desktop** | **El mejor** (16:9 nativo) | El más «cine» (tira), pero largo | Igual que D + sala |
| **Performance** | Ligero al cargar; **consumo de vídeo continuo** | **El más ligero** | Ligero; LCP algo más lento; DOM duplicado |
| **Complejidad** | Baja | Media | Alta |
| **Mantenimiento** | Bajo | Medio | Medio-alto |

---

## 7. Lo que dice la evidencia (sin elegir todavía)

- **Ninguna variante resuelve sola la secuencia IMPACTO → … → CONTACTO:**
  - **A** gana en IMPACTO, CLARIDAD y escritorio, y **usa el material como se montó**. Pero después del hero no enseña más
    trabajo y no tiene identidad propia.
  - **D** gana en IDENTIDAD, pero **pierde en CONVERSIÓN y CLARIDAD** (24 gestos, repetición). D12 lo reduce a la mitad, pero no
    cambia el patrón.
  - **E** demuestra que **la sala y «un gesto = una pieza» mejoran la conversión**, a cambio de más complejidad y de un eje oculto.
- **Los tres elementos que mejor funcionan salen de variantes distintas:** el tráiler encadenado (A), el contador NN/24 (D)
  y la sala con CTA contextual (E).

### Propuesta F (solo propuesta; no construida)

**«Tráiler + 5 salas».** Combina solo lo que la evidencia respalda:
1. **Hero = tráiler de A**, pero con el **contador de D** como timecode (01/24 … 24/24 mientras corren los 24 planos). La
   identidad del 24 queda en el sistema, sin pedir 24 gestos.
2. Debajo, **5 piezas, un gesto vertical por pieza** (lo de E, **sin** el eje horizontal). Cada una con su loop, crédito,
   «▶ Ver en sala» y «Hablemos de algo así».
3. En escritorio, la **tira horizontal de D como un único momento** (por ejemplo, el índice de las 5 piezas) y no como recorrido
   de 10 pantallas.
4. Una línea de territorios y el contacto.

**Qué resuelve que A/D/E no resuelven:**
- La identidad de D sin su coste en gestos.
- La conversión de E sin su eje oculto ni la maquetación duplicada.
- El tráiler de A **con** trabajo después del hero.
- **Estimación:** ~7 gestos hasta el contacto en móvil (1 tráiler + 5 piezas + contacto) y CTA visible desde la primera pantalla.

**Riesgos de F:**
- Sigue dependiendo de la nitidez en móvil (§1.2).
- La sala exige HLS para las películas.
- Hay que comprobar que el contador sobre el tráiler se lee como «tiempo» y no como decoración.

---

## 8. Pendiente antes de decidir

1. **Que lo veas en tu móvil**: la preview de Vercel de esta rama (alias de la rama: https://24shoots-web-opus-git-claude-confid-dd6361-miguelbr16s-projects.vercel.app · despliegue de este commit: https://24shoots-web-opus-8b3naruk7-miguelbr16s-projects.vercel.app; están protegidas por Vercel, así que entra con tu sesión) en `/lab/a`, `/lab/d`, `/lab/d12` y `/lab/e`. Sobre todo el
   snap de D/E en iOS y la sala de E con H.264 real.
2. **Revisar en el editor de Lovable** las 3 × 3 variantes de composición.
3. **Decidir** si se prototipa **F** en `/lab/f` o si alguna de A/D/E pasa tal cual a la siguiente iteración.
4. **Material** (independiente de la dirección): másters de mayor resolución o versiones verticales, y alguna pieza de
   *contenido de marca* o de *campaña* para que esos territorios tengan prueba.
