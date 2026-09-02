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

## Estado actual (2026-09-01, 3.0 en curso)

Presupuesto **aprobado**. Dominio elegido por el cliente: **sauriumchukum.com** (libre al 2026-09-01; lo registra David, USD 40 cotizados). Patrón del vault: `conectar-dominio-propio-a-github-pages`.

### Rediseño 3.0 (menú de `subir-nivel`, 16/16 tildadas)
- **Hero editorial**: texto a la izquierda en columna de lectura, foto contenida con margen (de Clou Architects); wordmark SAURIUM gigante recortado al pie (de Postevand); cinta marquee de acabados (reusa `cintaSpecs` de Aires); índice lateral fijo de secciones (de Stripe Press), visible desde 1180px.
- **Comparador**: borde con feather de 14px y canto de llana texturizado (mask con feTurbulence en vez de clip-path); al soltar, la barra sigue con la velocidad del dedo y frena con resorte crítico; cambio de acabado con fundido cruzado sobre una segunda capa (`data-ba-after2`) más barrido de luz, sin cuadro en negro.
- **Calculadora**: deslizador de m² sincronizado con el número, resultado grande en tarjeta oscura, equivalencia en muros de 3 × 2,5 m, cifra que cuenta (220ms, tabular) y el saco 3D recibe un impulso al cambiar (`this.sacoImpulso`).
- **Estante de placas**: los seis acabados como placas con canto y sombra (textura real `swatch-*.webp`), activa por `aria-pressed`; macro de textura al 5x siguiendo el cursor (solo `hover:hover`).
- **Lightbox** con scroll-snap nativo (patrón `galeria-con-swipe-nativo`), `<dialog>`, teclado y foco de vuelta al origen.
- **FAQ** de seis preguntas con `<details>` animado por `grid-template-rows` y JSON-LD `FAQPage`.
- **Obras**: sección `#obras` oculta con región `cms:obras`; se destapa cuando `contenido/sitio.json` tenga casos.
- **Reveals** con dirección por sección (`data-reveal-desde="izq|der|escala"`).
- **WebP** con variantes 720/1200/1600 y `srcset`; las dos imágenes OG quedan en JPG a propósito.
- **SEO**: JSON-LD Organization/Product/WebSite/Article, hreflang es-MX/en/x-default, y páginas `/en/` generadas con `cd server && npm run en` (correr después de cada cambio).
- **Bloqueante del auditor resuelto**: las 8 transiciones sobre width/height/top pasaron a transform.

### Cómo se trabaja ahora
`cd server && npm test` (idempotencia) → `npm run en` (regenera /en/) → commit → push.
