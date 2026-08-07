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

## Estado actual (2026-08-07, v3 publicada)
- v3 final generada en Claude Design e integrada al repo: `index.html` (home) + `historia.html` (scrollytelling del meteorito), con runtime `support.js`/`image-slot.js` e imágenes en `img/` (casa en los 6 acabados para el comparador de color real, saco 3D, hero luminoso).
- v2 (styles.css/app.js/assets) eliminada del working tree; queda en historial git.
- Live: https://davidtaranto96.github.io/saurium-web/ y /historia.html — verificado sin imágenes rotas.
- Pendiente: montos del presupuesto (../presupuesto/), dominio propio, 2 fotos de obra real para los slots de aplicaciones.
