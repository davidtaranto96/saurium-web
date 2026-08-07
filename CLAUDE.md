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

## Estado actual (2026-08-07)
- Demo one-page completa: hero, storytelling (3 pasos), producto, 6 colores interactivos, aplicaciones, calculadora de rendimiento (4 m²/saco), export, contacto.
- Falta: fotos reales (FOTOS.md), dominio saurium.com, presupuesto aprobado por cliente.
- Investigación de competencia hecha (chukum.com.mx es el benchmark; nadie del nicho de chukum auténtico tiene bilingüe + precios públicos + testimonios).
