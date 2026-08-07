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

## Estado actual (2026-08-07, segunda pasada)
- Assets reales extraídos del brochure PDF (pdftoppm + PIL): logo transparente (nav/footer), hero aéreo Yucatán, sacos 20 kg, 6 placas, casa terracota, living, logo 3D en muro. Ver FOTOS.md.
- Comparador antes/después (obra gris ↔ chukum) con input range accesible sobre la casa terracota.
- De-slop aplicado: sin eyebrows por sección, producto en split asimétrico con <dl> (antes cards numeradas), hero con strip de swatches (eco del mockup tablet del brochure, visible ≥768px).
- PRODUCT.md creado (registro brand, skill impeccable).
- Verificado en 375 / 768 / desktop sin overflow.
- Falta: fotos de obra real (piscina y mobiliario hoy son recortes de las mismas fotos), dominio saurium.com, montos del presupuesto (en presupuesto/ del directorio padre).
