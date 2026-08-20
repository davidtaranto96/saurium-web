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

## Estado actual (2026-08-20, 2.0 en curso)

Presupuesto aprobado (USD 500). Live: https://davidtaranto96.github.io/saurium-web/

### Rediseño 2.0 aplicado
- **Tokens en OKLCH** con fallback hex, y `--terracota-tinta` #97543a (oklch 0.52 0.097 41.6) para texto: la terracota original daba 2.6:1 sobre crema y fallaba AA. Sombras en capas como tokens (`--sombra-1/2`).
- **Interacción**: foco visible global con la tinta, press scale .96 en botones, hover-lift en tarjetas de aplicaciones, escalonado de reveals por grupo (70ms). Trampa resuelta: el shorthand `transition` resetea `transition-delay`, el delay va DESPUÉS; y el failsafe suma el delay a su timeout para no pisar el escalonado.
- **A11y**: skip link, aria-pressed en swatches, grupo con nombre bilingüe, saco 3D con foco y flechas para girar, toggle idioma a 44px, reduced-motion verificado con agent-browser (0 contenido oculto, 0 animaciones).
- **Imágenes**: lazy + decoding async (hero eager fetchpriority=high).

### Editable (etapa 1 lista, etapa 2 pendiente)
- `contenido/sitio.json` = fuente única de whatsapp, correo, vendedor, rendimiento y hero ES/EN.
- 8 regiones marcadas (`<!--cms:x-->` / `/*cms:x*/`) y `server/contenido.js` con los generadores. `cd server && npm test` = prueba de idempotencia (verde). `npm run aplicar` aplica el JSON a mano.
- **Etapa 2 (panel)**: adaptar panel.js/github.js de melou, crear fine-grained token (solo este repo, Contents RW), servicio en Railway y PANEL_CLAVE. Lo tiene que crear David.

### Pendiente
- David corre `/review-animations` (skill de invocación manual) para el veredicto de poda.
- Fotos de obra real, dominio (saurium.mx libre; saurium.com es de HugeDomains), hreflang para EN.
