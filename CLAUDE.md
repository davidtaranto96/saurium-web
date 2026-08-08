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

## Estado actual (2026-08-08, v3.2 publicada)

Live: https://davidtaranto96.github.io/saurium-web/ · historia en `/historia.html`

### Arreglado en esta vuelta
- **Pixelado en móvil**: el fondo del scrollytelling era de 1600×900 y en un teléfono vertical se ampliaba 2,7×. Ahora hay versiones verticales (`story-*-v.jpg`, 1240×2222) servidas con `<picture media="(max-aspect-ratio:4/5)">`. Medido: pasó de ampliar 2,7× a reducir 0,70×.
- **"Deslizar" pisaba "Hablar con ventas"** a partir de 720px de alto (56px de solape a 375×640). El hint se oculta por debajo de ese umbral.
- **Saco 3D**: relieve de papel kraft por bump map procedural, panza de polvo por desplazamiento de vértices, luz en tres puntos con contraluz, tone mapping ACES y sombra de contacto pintada. Antes la sombra proyectada dejaba un polígono negro flotando y la cara impresa se hundía en el cuerpo dejando un óvalo.
- **Open Graph, Twitter Card y canonical** en las dos páginas: compartir el link ya muestra imagen y texto.
- **Contradicción temporal**: la portada dice 66 millones de años y el capítulo 3 decía "Siglos después". Ahora dice "Millones de años después".
- **Voz de marca**: el copy estaba en voseo argentino y la marca es yucateca. Pasó a tuteo mexicano, y "piscina" a "alberca".
- `title` y `description` acompañan el cambio de idioma. CTA de WhatsApp al cierre de historia.
- El contenido con reveal ya no depende de que corran el observer, rAF ni las transiciones: hay respaldo por scroll y por temporizador.

### Pendiente
- **ventas@saurium.com no recibe correo** y el dominio no es del cliente: `saurium.com` lo tiene HugeDomains (revendedor) desde 2022 y lo publica en venta. `saurium.mx` y `saurium.com.mx` están libres. El saco impreso ya lleva saurium.com, así que hay que resolverlo con Rodrigo.
- Fotos de obra real (ver `FOTOS.md`).
- La versión en inglés no tiene URL propia ni hreflang, así que Google no la indexa.
- A futuro: cookies propias de seguimiento de leads conectadas al CRM de Berni. Requiere aviso de cookies y aviso de privacidad (LFPDPPP en México, consentimiento previo si hay tráfico europeo). Va cotizado aparte en la propuesta.
- Precio: USD 500 el sitio (250 + 250), mantenimiento opcional USD 40/mes, alta de dominio USD 40 aparte.
