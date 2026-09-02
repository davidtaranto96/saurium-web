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

## Estado actual (2026-09-02, 4.0 publicado)

Presupuesto **aprobado**. Dominio elegido por el cliente: **sauriumchukum.com** (libre al 2026-09-01; lo registra David, USD 40 cotizados). Patrón del vault: `conectar-dominio-propio-a-github-pages`.

### Rediseño 4.0: cinematográfico, editorial, moderno (revisión multi-lente + dos rondas de QA en celular)
- **Tipografía**: Newsreader (serif con tamaño óptico, 400/500) solo en display: h1, los seis h2, la frase de cierre "Desde Yucatán para el mundo", el h1 y las frases de historia. Sora en todo lo demás. Tokens en `:root` (`--f-display`, `--f-ui`, `--t-xs..--t-h1`, `--track-caps`, `--track-kicker`, `--ancho`, `--hair`). Ojo: los `clamp()` llevan espacios alrededor del `+` o el token se invalida (vault: `el-clamp-sin-espacios-invalida-el-token`).
- **Ritmo**: se fueron los seis fundidos de 170 px con paddings de 30vh. Un solo gesto de transición: `#historia` es `position:sticky` (clase `cortina-fondo`) y `#material` sube por encima con esquinas redondeadas (`cortina-tapa`). Entre bloques crema, reglas finas (`--hair`). Grilla única de 1180 con un solo borde izquierdo de lectura en toda la página, Contacto incluido (texto abajo a la izquierda del cuadro, a la Dinesen).
- **Orden nuevo**: hero → cinta → historia (teaser: texto a la derecha, huella grande + dos miniaturas a la izquierda) → material → acabados (el comparador cruza el corte hacia Aplicaciones con `--solape`) → aplicaciones (grilla asimétrica 7/5 + 5/7, pies con regla) → preguntas (4/8, h2 sticky, sin tarjetas) → calculadora (7/5, sin tarjeta exterior) → **contacto = Mundo + destino** (foto de la costa a 100svh, logo, frase serif, WhatsApp, correo, teléfono `tel:`, "Guardar contacto" con vCard en memoria) → pie.
- **Hero**: coreografía con retardos (`.hero-ent`), la foto se abre por `clip-path` y la imagen entra con escala lenta 1.08→1; pie de foto con las seis muestras; wordmark a 19.4vw con parallax inverso; sin kickers uppercase por sección (solo el del hero, en caja baja).
- **Comparador**: `srcset` en el cambio de acabado (con `src` solo no cambiaba nada), token de secuencia contra la carrera de clics, la barra sigue al dedo 1:1 y el resorte queda para el soltar, **no vuelve a 50 % nunca** (en táctil `pointerleave` llega tras cada toque), barrido inicial que destapa el acabado y descansa en 44 %, precarga de los WebP reales solo al acercarse (antes: 1,4 MB de JPG en cada visita), `?acabado=oliva` en la URL, botón "Pedir muestra de …", el estante centra la placa activa y se desvanece a la derecha en el teléfono.
- **WhatsApp**: una sola función `waTexto(origen)` arma el mensaje con idioma, acabado elegido y m² calculados; botón flotante (`.wa-flotante`) que aparece al salir del hero y se esconde en Contacto y con el lightbox abierto; "Hablar con ventas" del hero abre WhatsApp. Estado en `sessionStorage` (`saurium-estado`) para volver de historia con el acabado y los m².
- **Rendimiento**: three.js se importa recién cuando el saco se acerca (IO 400 px) y el loop se pausa fuera de pantalla y con la pestaña oculta; Ken Burns ligado al scroll (`animation-timeline: view()` con fallback); cambio de idioma anima solo lo visible y restaura las transiciones; `:hover` gateado por `(hover:hover)` con clases `.cta-lleno/.cta-linea/.cta-claro` (support.js generaba hovers pegajosos en táctil).
- **Historia**: letterbox 2.39:1 en ≥1180 px con relación ≥3/2, capas con escala de salida, grano estático, brasas solo cuando se ven (18 en celular), texto de capítulos adentro del stage (`[data-textos]`) con salida palabra por palabra antes del corte, view transitions entre documentos (`@view-transition`, `view-transition-name: portada`).
- **/en/**: `server/generar-en.js` ahora traduce el HTML estático (título, metas, `data-i18n`, JSON-LD FAQ) evaluando el diccionario de la página, pone `data-img-base="../img/"` (el JS lee esa base) y no reescribe enlaces internos. `npm test` regenera `/en/` y lo verifica.
- **Índice lateral y nav**: sección activa por `offsetTop` (el sticky engañaba a `getBoundingClientRect`), tema por `data-tema="oscuro|claro"`, nav oscura con logo claro sobre las secciones oscuras, rótulo de sección al pasar el cursor.

### Cómo se trabaja ahora
`cd server && npm test` (idempotencia de regiones cms + regeneración y chequeos de /en/) → commit → push. Verificación en Chrome real con `agent-browser` (nunca `close --all` si hay otras sesiones corriendo).

### Ronda 2 de QA (7 testers en celular, cada bug reproducido por un segundo agente)
14 bugs confirmados. Lo que cambió:
- **La ruta manda sobre el idioma guardado.** Antes `localStorage` le ganaba a la URL y el link
  `/en/` que manda el vendedor abría en español en el teléfono del cliente. Ahora `this.lang`
  sale de `data-lang-default` y el toggle **navega** a la página hermana (`/x.html` ↔ `/en/x.html`)
  conservando query, ancla y punto de lectura (`sessionStorage.saurium-scroll`).
- **El CTA "Recorrer la historia" salió del bloque de texto** y es hijo directo de `.tease-grid`:
  con la cortina fija quedaba a 33 px del tope, debajo del header de 72 px, y no se podía tocar.
  De paso los capítulos del teaser se leen 1-2-3 (Origen, Impacto, Huella) y no 3-1-2.
- **WhatsApp de historia.html**: leía `saurium-estado` y la línea siguiente lo pisaba con el texto
  genérico. Ahora el contexto gana y el genérico es el respaldo.
- **Las seis placas en grilla 3×2 en el celular** (antes el estante arrancaba corrido y se veían 3,5).
- **Lightbox**: cierra tocando afuera de la foto (el slide ocupa toda la pantalla, así que "afuera"
  se mide contra el rectángulo de la imagen) y ya no salta ~600 px al cerrar (`scrollIntoView`
  movía el documento de fondo; ahora es `pista.scrollLeft`).
- **Apaisado**: el CTA del hero entra en pantalla a 844×390 y el texto de los capítulos usa 52ch
  en vez de una columna de 223 px.
- **Foco visible** en los 4 botones de la galería (el `all:unset` en línea se comía el outline) y
  en el campo de la calculadora (`style-focus` traía `outline:none`).
- **Cinta en `--negro`**: `--fin-carbon` (#46423f) es casi `--marron` (#474341) y su muestra se leía
  vacía; además las seis muestras llevan marco crema.
- Calculadora topeada en 20.000 m² (antes 100.000), vCard con `N` y CRLF, "Volver al sitio" devuelve
  al punto de lectura, huella del teaser con `object-position:96% 50%`, hueco muerto del
  scrollytelling de 95svh a 40svh, inglés sin calcos.
- **Correo de contacto sacado** (decisión de David, 2026-09-02): `contenido/sitio.json` → `correo: ""`
  y el generador `correo` no dibuja el botón si está vacío. Vuelve solo cuando se cargue el del dominio.

### Pendientes
- Registrar sauriumchukum.com y conectarlo; cargar el correo del dominio en `contenido/sitio.json`
  (hoy vacío a propósito: el bloque de contacto va sin botón de mail).
- Fotos de obra real → `#obras` (región `cms:obras`); reemplazar las de Unsplash en Aplicaciones.
- Renders más grandes: los de la casa del comparador topean en 1500×1006 y en Retina se amplían
  1,45×; falta también un `story-costa-v` vertical. Detalle en `FOTOS.md`.
- Ficha técnica y brochure en PDF (el copy los promete; hoy no hay PDF en el repo).
- Video de fondo para el hero si David lo genera en Flow (patrón `video-generado-como-hero`).
