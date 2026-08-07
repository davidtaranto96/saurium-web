# SAURIUM — web demo

Sitio estático (HTML/CSS/JS, sin build) para SAURIUM, marca de chukum de Yucatán (cliente vía BERNI). Demo comercial + base del sitio final.

## Stack y convenciones
- HTML/CSS/JS vanilla. Tokens CSS en `:root` de `styles.css` (paleta del brochure: #F3EBDE, #DCCAB2, #474341, #C88166). Tipografía Sora.
- i18n ES/EN por diccionario en `app.js` (`data-i18n`), idioma persistido en localStorage.
- Sin carrito: venta por WhatsApp (+52 999 369 9488, Rodrigo López Alam) y correo.
- Efectos estilo Apple: reveals con IntersectionObserver, parallax rAF, respeta `prefers-reduced-motion`.
- Assets provisorios: ver `FOTOS.md` (placeholders de color plano en `assets/img/`).

## Deploy
GitHub Pages desde `main` (repo `saurium-web`). Iterar = commit + push.

## Estado actual (2026-08-07, v3.1 publicada)

Live: https://davidtaranto96.github.io/saurium-web/ · historia en `/historia.html`

- **Estructura**: `index.html` (home) + `historia.html` (scrollytelling), runtime `support.js` / `image-slot.js` de Claude Design, imágenes en `img/`. Sin build.
- **Comparador de acabados**: 7 renders de la MISMA casa (obra gris + 6 acabados), generados con el MCP de imagen a 1920px desde una base común, así la geometría queda alineada. Reemplazaron el upscale pixelado de la miniatura del brochure.
- **Efectos de historia**: se sacaron el meteorito y la huella dibujados en CSS, que se superponían a fotos que ya los tenían. Quedaron destello, ondas expansivas, sacudida de cámara, campo de ceniza generado en JS y un barrido de luz rasante sobre la huella. Rail de capítulos con pista de progreso.
- **Bug corregido**: `img{max-width:100%}` recortaba el `width:116%` de las capas del parallax y dejaba 8% de fondo negro a la derecha en las tres. Fix: `max-width:none` en `[data-img]`. Verificado por medición (la imagen pasó de 1425px a 1653px sobre un stage de 1425px).
- **Fotos**: los dos slots vacíos de aplicaciones ahora tienen fotos de Unsplash verificadas. No son chukum SAURIUM: ver la advertencia en `FOTOS.md` antes de presentar.
- **Precio**: USD 500 el sitio, 250 al inicio y 250 contra publicación. Mantenimiento opcional USD 40/mes. Presupuesto en `../presupuesto/`.
- **Pendiente**: dominio propio, fotos de obra real, y los hallazgos de la auditoría de producción.
