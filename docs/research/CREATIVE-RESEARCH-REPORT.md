# 24SHOOTS — Creative Research Report

Rama: `claude/confident-galileo-rgun26` · Fecha: 28-09-2026 · Estado: **investigación, sin cambios de código**

> Objetivo: que 24SHOOTS sea una obra visual digital que venda. Que quien entre piense
> *«quiero trabajar con esta gente»*. La web tiene que ser portfolio en sí misma.
>
> Lógica de venta que ordena todo el informe:
> **IMPACTO → CURIOSIDAD → PRUEBA → DESEO → CONFIANZA → CONTACTO**

Las capturas están en `docs/research/img/`. Se hicieron con Chromium headless a
1440×900 (escritorio) y 390×844 con user-agent de iPhone (móvil), tres fotogramas por web
con scroll.

---

## 0. Resumen en 10 líneas

1. Las productoras que mejor venden (Park Pictures, Academy, Partizan, Somesuch, Landia)
   hacen **una sola cosa**: dejan que la imagen ocupe la pantalla y ponen encima un crédito
   corto (pieza · cliente · director). Nada de texto de marketing en el primer viewport.
2. Las webs premiadas en Awwwards/FWA (Lusion, Active Theory, Obys, Locomotive) venden
   **oficio digital**. No venden vídeo. Si copiamos eso, desviamos la atención de lo que
   24SHOOTS vende de verdad: sus imágenes.
3. «Ventana 24» (logotipo gigante calado sobre vídeo) **no es propio**. SOMA (Awwwards
   2026) y Blink Ink hacen casi lo mismo. Conviene abandonarlo como idea principal.
4. La paleta actual (crema + terracota + etiquetas mono espaciadas) es justo la combinación
   que la guía de diseño `frontend-design` marca como cliché de «web generada». Hay que
   cambiarla.
5. Lo que solo puede tener 24SHOOTS es el número: **24 fotogramas = 1 segundo de cine**.
   Si la Home se construye como una tira de 24 fotogramas reales de las 5 piezas,
   ninguna productora de la lista puede tener esa misma Home.
6. Recomendación: **Dirección D «24 fotogramas»** con la reproducción de la A
   (cinemática) como esqueleto, y de la C (WebGL) solo una mejora progresiva opcional.
7. En móvil manda el pulgar: tira vertical a pantalla completa, un fotograma por gesto.
   Nada de rejillas de miniaturas.
8. Home compacta: 5 casos como **créditos en la tira**, no como bloques grandes. Los
   casos completos se quedan en `/trabajo`.
9. Stack sin dependencia de Vercel: CSS scroll-driven + GSAP (gratis desde abril de 2025)
   + vídeo HLS/MP4 servido desde R2 o Cloudflare Stream. Todo portable a Cloudflare.
10. Siguiente paso propuesto: tres prototipos rápidos (D, A, D+C) en rutas `/lab`, y
    después decidir «esto sí / esto no».

---

## 1. Referencias encontradas

### 1.1 Productoras y estudios (capturadas)

| Referencia | URL | Qué hace bien | Qué NO copiar | Captura |
|---|---|---|---|---|
| **Park Pictures** | parkpictures.com | Un fotograma a pantalla completa y el crédito «Pieza / Director» en tipografía pequeña. Silencio total. | Sin CTA: no le hace falta vender, a 24SHOOTS sí. | `img/parkpictures-d0.jpg` |
| **Academy Films** | academyfilms.com | En móvil: fotograma vertical a pantalla completa, crédito centrado y flechas ‹ ›. Es el mejor móvil del benchmark. | Mayúsculas espaciadas algo genéricas. | `img/academyfilms-m0.jpg` |
| **Partizan** | partizan.com | En móvil: rejilla de tarjetas de película con director y cliente al pie. La prueba se entiende de un vistazo. | Una rejilla densa diluye el impacto. | `img/partizan-m1.jpg` |
| **Somesuch** | somesuch.co | Títulos enormes y en negrita: la tipografía es la marca. | Hay poca imagen en el primer viewport. | `img/somesuch-d0.jpg` |
| **Landia** | landia.com | Crédito rotativo centrado: 'Título' / marca en contorno / director. Tiene ritmo de montaje. | Contorno fino: poco legible sobre vídeo claro. | `img/landia-d0.jpg` |
| **Iconoclast** | iconoclast.tv | Reel numerado del 1 al 10 como navegación. **Numerar las piezas es una buena idea para 24SHOOTS.** | — | `img/iconoclast-d0.jpg` |
| **RISK** | risk.tv | Estética HUD: rejilla, nombres a izquierda y derecha, timecode, manifiesto en caja. | Recargado, sabe más a tecnología que a imagen. | `img/risk-d0.jpg` |
| **Pulse Films** | pulsefilms.com | Reproductor enmarcado y logotipo condensado gigante. | Reproductor con errores sin JS/codec. | `img/pulsefilms-d0.jpg` |
| **Smuggler** | smugglersite.com | Crema, arte pintado y wordmark grande: tiene personalidad propia. | Es una paleta crema, justo lo que queremos dejar atrás. | `img/smugglersite-d0.jpg` |
| **SOMA** (Awwwards HM 2026) | — | Wordmark gigante sobre metraje a sangre y banda negra inferior. | **Es casi «Ventana 24».** Confirma que nuestra idea no es única. | `img/soma-d0.jpg`, `img/soma-m1.jpg` |
| **Blink Ink** | blinkink.co.uk | «BLINKINK» en contorno gigante sobre reel. | Mismo patrón que SOMA y Ventana 24. | `img/blinkink-d0.jpg` |
| **Riff Raff** | riffrafffilms.tv | Menú lateral y rejilla de cuatro piezas: se navega rápido. | Estética de 2015. | `img/riffrafffilms-d0.jpg` |
| **Unit9** | unit9.com | Tres entradas: EXP / INTERACTIVE / FILM. Es una buena arquitectura para varios territorios. | Mucha interfaz. | `img/unit9-d0.jpg` |
| **Lusion** | lusion.co | WebGL de referencia mundial. | Loader «006»: hace esperar antes de enseñar nada. | `img/lusion-d0.jpg` |
| **Obys** | obys.agency | Collage en 3D que se abre desde el centro, con contador. | Primer viewport casi vacío: con nuestro material, mal IMPACTO. | `img/obys-d0.jpg` |
| **Oceans** | (captura previa) | Imagen fija sticky con leyendas que se van sucediendo. Es narrativa editorial. | — | captura en `ref/` de la fase anterior |

### 1.2 Referencias con resultado no válido (hay que decirlo)

- **Hildén & Kaira** y **Podium**: la captura sale vacía o solo con el loader («46%»). El
  contenido depende de vídeo/WebGL que el Chromium headless no reproduce.
- **Canada**: salta el *Vercel Security Checkpoint* («Failed to verify your browser»).
- **Salon Indien Films**: solo muestra la portada con el selector de idioma.
- **Il Capo**: captcha anti-bot.
- **Buck**: pantalla en blanco.
- **Limitación técnica**: el Chromium de este entorno **no reproduce H.264**, así que las
  webs basadas en vídeo salen en negro o con «Player error». Donde había vídeo he valorado
  el *layout* y la tipografía, no el movimiento. Antes de decidir hay que ver estas webs
  en un navegador real, sobre todo SOMA, Hildén & Kaira y Canada.

### 1.3 Galerías consultadas (patrones, sin capturas propias)

Awwwards (SOTD/Honorable Mentions 2025–2026, categoría Film & TV y Studio), FWA, CSSDA,
Godly, SiteInspire (Film/Video), One Page Love, Land-book y Lapa Ninja (Agency),
showcases de Webflow y Framer. Awwwards bloquea el navegador automatizado, así que
estas galerías se revisaron como listados de texto. Lo que se repite en ellas está en la
sección 2.

### 1.4 Técnica y código (Codrops, GitHub, CodePen)

- Codrops 2026: galería WebGL revelada con scroll (Three.js + GSAP + planos sincronizados
  con el DOM); galería con recorrido de cámara exportado de Blender; galería infinita
  con GSAP Flip.
- `darkroomengineering/lenis`: scroll suave que conserva el scroll nativo y respeta
  `prefers-reduced-motion`.
- `oframe/ogl`: WebGL mínimo (≈ 25 kB) para texturas de vídeo y distorsión en hover.
- `muxinc/media-chrome` + `hls-video-element`: reproductor en web components, portable
  y sin depender de ningún proveedor.
- Chrome for Developers, *scroll-driven animations* y *view transitions*: demos oficiales.

---

## 2. Patrones

**Los que venden (hay que adoptarlos)**

1. **La imagen primero, el crédito después.** El primer viewport es metraje o un fotograma, con
   2–3 datos: pieza · cliente · formato. Nada de claim largo.
2. **Numerar.** Iconoclast (1–10) y RISK (timecode) convierten el portfolio en una
   secuencia. Numerar da ritmo y deja claro cuántas piezas hay.
3. **Crédito que rota al ritmo de un montaje** (Landia). El texto se mueve con el vídeo,
   no por su cuenta.
4. **Un solo gesto en móvil** (Academy): swipe horizontal o vertical, un fotograma por
   pantalla, flechas grandes.
5. **La prueba en forma de tarjeta de película** (Partizan): miniatura + cliente + formato.
   Es la forma más rápida de pasar de CURIOSIDAD a PRUEBA.
6. **Una sola palabra de marca, grande, y una única vez.** No como sistema en cada sección.

**Los que no hay que repetir**

1. Wordmark gigante sobre vídeo (SOMA, Blink Ink, Pulse, la Ventana 24 actual). Ya está
   muy visto.
2. Loaders con porcentaje (Lusion, Podium). Castigan el LCP y, en una web B2B, al cliente
   con prisa.
3. Primer viewport vacío o abstracto (Obys). Con nuestro material no transmite nada.
4. Crema con acento terracota y etiquetas mono espaciadas con puntos medios. **Es la
   paleta actual de 24SHOOTS** y es lo que las guías de diseño identifican como estética
   de plantilla.
5. HUD técnico recargado (RISK): sabe a agencia de tecnología, no a estudio de imagen.

---

## 3. Técnicas evaluadas

| Técnica | Para qué | Soporte (sep-2026) | Coste / riesgo | Veredicto |
|---|---|---|---|---|
| CSS scroll-driven animations (`animation-timeline: view()/scroll()`) | Revelados y paralaje sin JS | ≈ 84 %: Chrome, Edge, Safari 26; Firefox parcial | Cero kB. Sin soporte → contenido estático (sin riesgo de que desaparezca) | **Sí**, como base |
| GSAP + ScrollTrigger + SplitText + Flip | Montaje ligado al scroll, tipografía por letra, transiciones de rejilla a detalle | Universal. **Gratis** desde abril de 2025, incluidos los plugins antes «Club» | ≈ 45–60 kB gz. Hay que controlar `pin` en iOS | **Sí**, para la secuencia principal |
| Lenis | Suavizar scroll y sincronizarlo con GSAP | Universal, conserva el scroll nativo | ≈ 4 kB. Puede molestar en trackpads: se desactiva en `reduced-motion` y en móvil | Opcional, solo escritorio |
| View Transitions (misma página y entre documentos) | Transición de fotograma → caso | Chrome 126+, Safari 18.2+; Firefox no | Sin soporte → navegación normal | **Sí**, como mejora |
| Secuencia de imágenes en canvas (tipo Apple) | «Frotar» un plano con el scroll | Universal | 24–48 JPG/AVIF por plano (≈ 1–2 MB). Muy bueno en escritorio, caro en móvil | **Sí, pero solo 24 fotogramas**: encaja con el nombre |
| `<video>` MP4/AV1 en loop, silenciado | Metraje en portada y en tarjetas | Universal (autoplay silenciado con `playsinline`) | Peso. Hay que usar póster y carga diferida | **Sí** (ya lo tenemos) |
| HLS vía Cloudflare Stream o `hls-video-element` | Películas completas con bitrate adaptativo | Safari nativo, resto vía MSE | Stream: 5 $/1000 min almacenados + 1 $/1000 min entregados | **Sí** para `/trabajo/*` al migrar |
| WebGL (OGL / Three.js) con textura de vídeo | Distorsión en hover, transición líquida entre planos, «película» curvada | Universal en GPU; se degrada en gama baja | 25–150 kB + GPU + batería. Solo tiene sentido si aporta algo a la imagen | Solo como capa opcional |
| Shaders de grano/halation | Textura fílmica | — | Coste de GPU constante | No: el grano ya está en el metraje |

**Cloudflare (destino final)**. OpenNext `@opennextjs/cloudflare` soporta App Router;
`next/image` pasa a Cloudflare Images o a un loader propio. El límite del Worker es de
3 MiB (gratis) o 10 MiB (de pago), así que conviene mantener la web casi toda estática.
Los vídeos y fotogramas irían a R2 (sin coste de salida) y las películas completas a
Stream. **Nada de lo propuesto depende de Vercel.**

---

## 4. MCPs, skills, plugins y repos

| Herramienta | Uso propuesto | Estado |
|---|---|---|
| **Lovable MCP** (conectado) | Prototipos exploratorios rápidos de D y A con fotogramas reales subidos. Sirve para decidir «sí/no», **no es el código final** | Disponible |
| **Skill `frontend-design`** | Criterios anti-plantilla. Ha servido para autocriticar la paleta actual | Usado |
| **Playwright (local)** | Capturas de benchmark y QA a 390/430/1440 | Usado. Sin H.264 en headless |
| **GitHub MCP** | Ramas y commits solo en esta rama | Disponible |
| **Vercel MCP** | Solo previews; nada de producción | Disponible, uso limitado |
| **Notion MCP** | Opcional: tablero de decisiones «sí/no» | Disponible, no imprescindible |
| Cursor | Edición local por parte del equipo | Externo |
| ChatGPT / Gemini / Grok | Contraste de copy ES/EN y segundas opiniones de dirección | Externo. Nunca como fuente de datos de clientes |
| Picsart Pro | Retoque de fotogramas y recortes 4:5 / 9:16 | Externo |
| Repos: `lenis`, `gsap`, `ogl`, `media-chrome`, `hls-video-element`, `@opennextjs/cloudflare` | Ver sección 3 | Todos MIT o licencia libre |

No he encontrado ningún MCP de «diseño» que aporte más que el criterio más el prototipado
en Lovable y en `/lab`. Tampoco hace falta instalar plugins de pago.

---

## 5. Benchmark: 24SHOOTS actual frente a las referencias

Puntuación de 1 a 5 según cómo cumple cada fase del embudo (valoración propia a partir de
las capturas):

| Fase | 24SHOOTS (Ventana 24) | Park / Academy | Partizan | Obys / Lusion |
|---|---|---|---|---|
| IMPACTO | 3: vídeo a sangre, pero el logotipo calado tapa la imagen | 5 | 3 | 2 (loader o vacío) |
| CURIOSIDAD | 2: no invita a seguir | 4 | 3 | 4 |
| PRUEBA | 3: 5 casos reales, pero en bloques grandes | 4 | 5 | 2 |
| DESEO | 2: paleta genérica, poca imagen a partir del hero | 5 | 3 | 4 |
| CONFIANZA | 4: clientes reales, packs, contacto claro | 3 | 4 | 3 |
| CONTACTO | 4: CTA consistente | 2 | 2 | 2 |
| Móvil 390×844 | 3: correcto pero plano | 5 | 4 | 2 |

**Diagnóstico.** 24SHOOTS ya vende bien en la parte racional (confianza y contacto) y
se queda corto en la emocional (curiosidad y deseo). El problema no es técnico: la web
enseña **poca imagen, demasiado grande y de una en una**, y lo que la rodea (crema,
terracota, mono) no se distingue de una plantilla.

---

## 6. Cuatro direcciones creativas

Datos comunes a todas: solo material real (5 películas: Huhtamaki 50, Premios Isabel
Ferrer, Premios Innovación Valencia, Imperia SCM, Gala Esport Manises), ES/EN, Packs
en el menú, email `info@24shoots.es`, nada de bodas ni fiestas como línea principal.

### A — Cinemática

- **Concepto**: «Sala de proyección». La Home es un reel a pantalla completa con crédito
  inferior (pieza · cliente · formato), numerado del 01 al 05 al estilo Iconoclast.
- **Estructura**: Reel (01–05) → frase de posicionamiento → 3 territorios → Packs (una
  línea) → contacto.
- **Comportamiento**: autoavance cada ~6 s. Con el scroll o las flechas se cambia de pieza
  con un corte seco. «Ver pieza» abre `/trabajo/[slug]` mediante una View Transition del
  fotograma.
- **Dirección de arte**: fondo negro, el color lo pone el metraje, blanco para el texto.
  Sin crema.
- **Tipografía**: una sans condensada para los créditos (Archivo en wdth estrecho) y
  cuerpo neutro. Nada de mono decorativo.
- **Motion**: solo cortes y fundidos cortos: el montaje hace el movimiento.
- **Vídeo**: loops MP4/AV1 de 4–6 s por pieza y películas completas en HLS (Stream) dentro
  del caso.
- **Portfolio**: 5 piezas numeradas. `/trabajo` lista las piezas completas.
- **Móvil**: 390×844 y 430×932 con vídeo 4:5 o 9:16 a pantalla completa, crédito abajo y
  ‹ › grandes, como Academy. 1440×900 con 16:9 a sangre.
- **Ventajas**: la solución más segura y la más rápida de construir. Funciona sin JS.
- **Riesgos**: se parece a cualquier productora. Poca identidad propia más allá del
  metraje.

### B — Art / Editorial

- **Concepto**: «Revista de imagen». Cada caso es una doble página: un fotograma grande,
  un detalle pequeño y el pie de foto con el crédito.
- **Estructura**: portada (un fotograma y un titular) → 5 dobles páginas → servicios en
  índice tipográfico → contacto.
- **Comportamiento**: fotogramas sticky con pies que se van sucediendo (Oceans). Revelados
  con CSS scroll-driven.
- **Dirección de arte**: papel blanco puro (no crema) + negro. Máximo contraste con el
  color del metraje.
- **Tipografía**: titulares grandes y en negrita (Somesuch), pies pequeños y legibles.
- **Motion**: mínimo: paralaje suave entre imagen y pie.
- **Vídeo**: casi todo fotogramas fijos. El vídeo aparece solo al pulsar.
- **Portfolio**: el más «de autor», porque cada caso se lee como un reportaje.
- **Móvil**: una columna con el fotograma a sangre y el pie debajo. Muy sólido a 390 y a
  430; a 1440 las dobles páginas lucen mucho.
- **Ventajas**: elegante, ligero y muy bueno para SEO y lectura.
- **Riesgos**: menos movimiento: puede sentirse estático para un estudio de vídeo. Además,
  la calidad de los fotogramas pasa a ser crítica (algunos másters son de baja
  resolución, pendiente en `V2-PENDIENTES`).

### C — Experimental / Digital

- **Concepto**: «Película física». Los planos viven en una tira de película curvada en
  WebGL que se deforma con el scroll. Hover con distorsión líquida.
- **Estructura**: tira WebGL → caso al hacer clic (transición de plano a pantalla
  completa) → resto de páginas en HTML normal.
- **Comportamiento**: Three.js/OGL + GSAP y planos sincronizados con el DOM (demo de
  Codrops). Lenis en escritorio.
- **Dirección de arte**: negro profundo, con la imagen como único color.
- **Tipografía**: mínima: crédito flotante que sigue al plano activo.
- **Motion**: alto: inercia, curvatura y shaders de transición.
- **Vídeo**: texturas de vídeo en la GPU, caras en móvil.
- **Portfolio**: espectacular en escritorio.
- **Móvil**: el punto débil. A 390/430 hay que desactivar la curvatura y volver a una
  tira plana; si no, se consume batería y el scroll va a tirones. A 1440 es muy potente.
- **Ventajas**: el efecto «wow» y la visibilidad en galerías tipo Awwwards.
- **Riesgos**: sabe más a agencia digital que a estudio de imagen. Peso, accesibilidad y
  mantenimiento. Además, la técnica se lleva el protagonismo que debería tener el
  metraje. **Va contra el objetivo si pasa a ser el concepto principal.**

### D — 24SHOOTS propia: «24 fotogramas»

- **Concepto**: *un segundo de cine son 24 fotogramas.* La Home **es un segundo**: una
  tira de 24 fotogramas reales sacados de las 5 películas. Hacer scroll es «pasar» ese
  segundo fotograma a fotograma, y cada fotograma lleva su número (01/24 … 24/24) y su
  crédito. Al final del segundo, la pregunta: «¿Qué cuentas tú en los próximos 24?» → contacto.
- **Por qué solo puede ser de 24SHOOTS**: el número de la marca es la unidad del medio.
  Nadie más en el benchmark puede construir la Home con su nombre como sistema métrico.
- **Estructura (Home compacta)**:
  1. **00/24 IMPACTO**: primer fotograma a sangre con loop real y una línea («Un evento
     termina. El contenido continúa.»).
  2. **01–20/24 CURIOSIDAD + PRUEBA**: la tira. Los 5 casos aparecen como *créditos
     dentro de la tira* (unos 4 fotogramas por caso), no como bloques grandes. Al detenerse
     en un fotograma se reproduce su loop de 2 s y aparece el crédito
     (cliente · formato · con MAS Events si procede).
  3. **21/24 DESEO**: los 3 territorios (Eventos · Contenido de marca · Campañas) como
     tres fotogramas-título.
  4. **22/24 CONFIANZA**: clientes reales en una línea y Packs (enlace, sin dominar).
  5. **23–24/24 CONTACTO**: fotograma final en negro con la pregunta y un botón.
- **Comportamiento**: escritorio (1440×900): tira horizontal con scroll vertical traducido
  a avance (GSAP ScrollTrigger con `pin`) y contador fijo `07/24` que funciona como
  timecode. Móvil (390×844, 430×932): **tira vertical nativa con scroll-snap**, un
  fotograma por gesto y contador fijo arriba. Sin `pin` en iOS, así que no hay tirones.
  Si JS no carga, se ven 24 imágenes seguidas con sus pies (sigue siendo un portfolio).
- **Dirección de arte**: negro de sala y blanco de proyector. El color **lo pone el metraje**.
  El naranja actual se queda solo en el punto REC y en el contador activo. Fuera crema y
  terracota.
- **Tipografía**: Archivo condensado en tamaño grande para los números (01/24) y en tamaño
  pequeño para los créditos. Una sola familia. El mono queda solo para el timecode, no
  como adorno.
- **Motion**: el único gesto es «avanzar un fotograma». Corte seco, con un fundido de
  80 ms como mucho. En escritorio, un «frotado» opcional de secuencia de imágenes
  (24 JPG por caso) en canvas. Con `reduced-motion`, sin animación.
- **Vídeo**: cada fotograma lleva detrás un loop de 2–3 s (derivado con el pipeline actual,
  `scripts/media/build.mjs`), cargado solo cuando el fotograma está cerca. Las películas
  completas van en `/trabajo/[slug]` (HLS con Stream al migrar).
- **Portfolio**: Home = el segundo (una muestra). `/trabajo` = las 5 piezas completas con
  película, fotogramas y ficha. En la Home no hay casos-bloque.
- **Ventajas**: identidad propia de verdad. Mucha imagen (24 fotogramas frente a los 5
  bloques actuales). Compacta: la Home completa ocupa unos 24 gestos en móvil. Funciona
  sin WebGL y es portable a Cloudflare.
- **Riesgos**: (1) hace falta **elegir muy bien 24 fotogramas**, porque si uno es débil,
  se nota; (2) el `pin` en escritorio necesita QA de accesibilidad (teclado, lector de
  pantalla: lista semántica de 24 figuras); (3) peso: 24 posters AVIF a ≈ 60 kB son
  ≈ 1,4 MB, repartidos con carga diferida.

---

## 7. Propuesta

**Recomiendo la dirección D «24 fotogramas»**, construida sobre el esqueleto de la A y con
la C solo como capa opcional:

- **De D**: el concepto y el sistema (número 01/24, un segundo = la Home, crédito dentro de
  la tira). Es lo único del benchmark que nadie más puede tener.
- **De A (Park Pictures, Academy)**: la disciplina de *imagen primero, crédito corto*, el
  negro de sala y la reproducción de películas completas en `/trabajo`.
- **De Iconoclast y RISK**: numerar y el timecode como interfaz (sin el HUD recargado).
- **De Landia**: el crédito que cambia al ritmo del montaje.
- **De Partizan**: la tarjeta de película «cliente · formato» como prueba rápida.
- **De Academy (móvil)**: un fotograma por pantalla y un gesto por fotograma.
- **De C**: en todo caso, más adelante, una transición WebGL de fotograma a caso en
  escritorio con GPU, desactivada en móvil y en `reduced-motion`.

**Por qué**: la web actual falla en CURIOSIDAD y DESEO porque enseña poca imagen y la
envuelve en una estética genérica. D multiplica por cinco la cantidad de imagen real,
convierte el nombre en la mecánica de la web y mantiene lo que ya funciona (confianza,
packs, contacto). A diferencia de C, la protagonista es la imagen y no la tecnología, y la
experiencia móvil es la mejor de las cuatro opciones.

**Qué descarto**: Ventana 24 como concepto (ya visto en SOMA y Blink Ink), la paleta
crema/terracota y los loaders.

---

## 8. Siguiente paso (pendiente de aprobación)

1. **Selección de los 24 fotogramas** del material real: propuesta con timecodes, para que
   la validéis antes de construir nada.
2. **Tres prototipos** en `/lab/d`, `/lab/a` y `/lab/d-webgl` (noindex), revisados a
   390×844, 430×932 y 1440×900. En paralelo, si queréis, un prototipo exploratorio en
   Lovable con los mismos fotogramas.
3. Decisión **«esto sí / esto no»** sobre los prototipos.
4. Implementación en esta rama con QA completo (escritorio/móvil, navegación, vídeo,
   rendimiento, accesibilidad, nada negro ni invisible, sin overflow).
5. Preparación de la migración a Cloudflare (OpenNext, R2, Stream, dominio), documentada
   y **sin ejecutar** hasta que la confirméis.

Nada de esto toca `main`, producción, `24shoots-web.vercel.app` ni otros repositorios.
