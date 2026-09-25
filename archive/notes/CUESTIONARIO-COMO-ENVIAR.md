# Cómo enviar el cuestionario al cliente (3 opciones)

El cuestionario largo en `.txt` es difícil de rellenar. Usa una de estas opciones:

---

## Opción 1 — Formulario en el navegador (RECOMENDADA, gratis, sin cuenta)

**Archivo:** `cuestionario/index.html`

### Para ti (probar)
1. Doble clic en `cuestionario/index.html`
2. Se abre en Chrome/Edge
3. Rellenas paso a paso (8 pantallas + barra de progreso)
4. Al final: **Descargar .txt** o **Copiar al portapapeles**
5. El progreso se guarda solo si cierras el navegador

### Para el cliente
**A) Enviar el archivo**
- Comprime la carpeta `cuestionario` en un ZIP
- Envía por WhatsApp o email
- El cliente abre `index.html` en el móvil o PC

**B) Publicar en la web (mejor experiencia)**
- Cuando la web esté en Vercel, sube `cuestionario/` como página estática
- URL tipo: `https://24shoots.vercel.app/cuestionario`
- El cliente solo abre el enlace

### Ventajas
- Gratis, sin Google ni registro
- Diseño 24Shoots (oscuro + naranja)
- Guarda progreso automáticamente
- Exporta respuestas en .txt listo para integrar

---

## Opción 2 — Google Forms (si prefieres recibir respuestas en una hoja)

### Pasos (15–20 min)
1. Ir a [forms.google.com](https://forms.google.com)
2. Crear formulario nuevo → título: **"24Shoots — Brief para la web"**
3. Descripción: *"15–20 min. Si no sabes algo, escribe PENDIENTE. Archivos (logo, vídeos) envíalos aparte por Drive."*
4. Añadir secciones (en Google Forms: icono ≡ → "Añadir sección")

### Estructura sugerida (copiar preguntas del .txt)

| Sección | Tipo en Google Forms | Preguntas clave |
|---------|---------------------|-----------------|
| 1. Empresa | Respuesta corta | Nombre comercial, razón social, CIF, dirección, contacto, aprobador |
| 2. Contacto | Respuesta corta + opción | WhatsApp, email, horario, tiempo respuesta, tel obligatorio (Sí/No), mensaje WA, Calendly |
| 3. Dominio | Respuesta corta + opción | Dominio, registrador, acceso panel, email corp, Google Business |
| 4. Marca | Opción múltiple + corta | Logo adjunto (Sí/Pendiente), variantes logo, hex color, tipografías, vídeo hero, fotos equipo |
| 5. Servicios | Casillas | Los 7 servicios + servicio estrella + zona geográfica (casillas) + párrafo descripción |
| 6. Precios | Opción + párrafo | Modo precios (3 opciones), packs, rangos presupuesto (casillas), pagos fraccionados |
| 7. Portfolio | Cuadrícula o repetir bloque | Usar "Importar preguntas" o 3 bloques de: título, enlace IG, servicios, sector, permiso Sí/No |
| 8. Textos | Párrafo | 3 frases, historia, equipo, diferenciador, cliente ideal, keywords Google |
| 9. Legal | Opción | Textos legales gestor (Sí/Plantilla), analytics (Sí/No) |

5. Activar **"Recopilar direcciones de correo"** (opcional)
6. Enviar → copiar enlace → mandar al cliente por WhatsApp
7. Respuestas → icono Respuestas → ver en hoja de cálculo

### Ventajas
- El cliente solo abre un enlace
- Respuestas en Google Sheets automáticamente
- Funciona muy bien en móvil

### Inconvenientes
- Hay que crear el form manualmente (no hay import automático desde .txt)
- Portfolio con muchos proyectos es más tedioso en Google Forms

---

## Opción 3 — Tally.so (alternativa moderna a Google Forms)

1. [tally.so](https://tally.so) — cuenta gratis
2. Crear formulario → diseño oscuro (coincide con marca)
3. Mismas secciones que arriba
4. Enlace para el cliente
5. Respuestas en panel Tally o export CSV

**Ventaja:** más bonito que Google Forms, gratis, enlace corto.

---

## Qué enviar al cliente por WhatsApp (mensaje listo)

```
Hola! Para terminar la web necesitamos unos datos.
Os dejo un cuestionario sencillo (15-20 min):

👉 [ENLACE o archivo index.html]

Si no sabéis algo, poned PENDIENTE.
Logo, vídeos y fotos enviadlos aparte por Drive o WeTransfer.

Cuando lo tengáis, mandad el archivo descargado o las respuestas del formulario.
Gracias!
```

---

## Archivos del proyecto

| Archivo | Uso |
|---------|-----|
| `CUESTIONARIO-CLIENTE-24SHOOTS.txt` | Versión completa original (referencia) |
| `cuestionario/index.html` | **Formulario interactivo para el cliente** |
| `CUESTIONARIO-COMO-ENVIAR.md` | Este documento |

---

## Después de recibir respuestas

Integrar en:
- `config/site.json` → contacto, legal, url
- `content/es/pages.json` → textos
- `content/es/services.json` → servicios
- `content/es/portfolio.json` → proyectos
- `public/logo.jpg` → logo HD
