# FOTOS.md — imágenes del sitio

**Formato (desde 2026-09-01):** el sitio sirve WebP con variantes por ancho (`x-720.webp`, `x-1200.webp`, `x.webp`) y `srcset`. Los JPG/PNG originales quedan como fuente: al reemplazar una foto, reemplazar el original y regenerar las WebP con el bloque de PIL del commit "rediseño 3.0" (calidad 80, anchos 720/1200/1600). Las dos imágenes de Open Graph (`casa-terracota.jpg`, `story-huella.jpg`) se quedan en JPG a propósito: WhatsApp y Facebook las previsualizan mejor.


Para reemplazar cualquier imagen por la definitiva, usar el MISMO nombre de archivo. Nada de código cambia.

## Comparador de acabados (`img/casa-*.jpg`, 1920×1288)

Renders generados con IA a partir de un prompt de arquitectura yucateca. Las siete comparten geometría, encuadre y luz: solo cambia el color del muro, que es lo que muestra el comparador.

| Archivo | Estado |
|---|---|
| `casa-obra.jpg` | Obra gris, repellado de cemento sin acabado |
| `casa-arena.jpg` | Acabado Arena |
| `casa-crema.jpg` | Acabado Crema |
| `casa-gris.jpg` | Acabado Gris |
| `casa-carbon.jpg` | Acabado Carbón |
| `casa-oliva.jpg` | Acabado Oliva |
| `casa-terracota.jpg` | Acabado Terracota |

**Para la versión final**: lo ideal es una obra real de SAURIUM fotografiada antes y después, o la misma fachada terminada en cada acabado. Si el cliente manda una foto de obra, hay que generar las siete variantes desde esa foto para que sigan alineadas entre sí.

## Aplicaciones (`img/uso-*.jpg`, 900×1125)

| Archivo | Origen | Licencia |
|---|---|---|
| `uso-exterior.jpg` | Brochure SAURIUM (p.21) | Material del cliente |
| `uso-interior.jpg` | Brochure SAURIUM (p.19) | Material del cliente |
| `uso-piscina.jpg` | Unsplash `photo-1713748943193-cbba4b323d09` | Unsplash License: uso comercial libre, sin atribución obligatoria |
| `uso-bano.jpg` | Unsplash `photo-1768383057775-dba5997c13a8` | Unsplash License: uso comercial libre, sin atribución obligatoria |

**Advertencia para la presentación**: las dos fotos de Unsplash muestran estuco natural y tadelakt, no chukum SAURIUM verificado. Sirven para la demo porque el acabado es visualmente equivalente, pero no se pueden presentar como obra de la marca. Reemplazar por obra real antes de publicar el sitio definitivo.

Candidatas verificadas que quedaron afuera, por si hacen falta:
`photo-1760260511330-c7cf02e1fd9b` (arcos en tierra arena, muy fuerte para un hero) · `photo-1680363046184-a8546fc77d49` (nicho y banco de obra en estuco crema) · `photo-1737032959204-23dbb1e5462c` (textura de muro, tileable).

## Fondos del scrollytelling en vertical

`story-selva-v.jpg`, `story-dino-v.jpg` y `story-huella-v.jpg` (1240×2222) son la misma escena que las horizontales, recompuesta en vertical para teléfonos. Se sirven con `<picture>` solo cuando la pantalla es más alta que ancha. Si se cambia una horizontal, hay que regenerar su vertical o el móvil queda desincronizado.

## Marca y narrativa

| Archivo | Uso | Origen |
|---|---|---|
| `logo-dark.png` / `logo-light.png` | Nav y footer | Brochure p.17, fondo transparente. Pedir el vector oficial al estudio de branding. |
| `hero-luminoso.jpg` | Fondo del hero | Brochure p.3 |
| `producto-saco.jpg`, `bag-front.jpg`, `bag-side.jpg` | Producto y saco 3D | Brochure p.20 |
| `placas.jpg`, `swatch-*.jpg` | Muestras de acabado | Brochure p.23 |
| `story-selva.jpg`, `story-dino.jpg`, `story-huella.jpg`, `story-costa.jpg` | Capítulos de `historia.html` | Brochure p.2 a p.5 |
| `textura.jpg`, `textura-muro.jpg` | Fondos de sección | Brochure |

**Pendiente de foto (2026-09-02):** la costa (`story-costa`) es 16:9 y en el celular cubre una pantalla 9:16 estirada casi 5×; en el cierre de la home se ve blanda. Hace falta un render vertical (`story-costa-v`, 1240×2222 como las otras `-v`) o pedirle al cliente una foto vertical de la península. El mismo tratamiento sirve para el fondo del teaser de la historia, que ya usa `story-dino-v`.

**Pendiente de foto (2026-09-02, ronda 2 de QA):** los renders de la casa del comparador
(`casa-obra` y los seis `casa-<acabado>`) llegan hasta 1500×1006. En el teléfono el cuadro es
4/5 (390×488 CSS = 1170×1464 px reales en una pantalla Retina), así que la altura manda y la
foto se amplía 1,45× incluso sirviendo la variante más grande: los bordes y la textura del
chukum —que es justo lo que se vende— se ven blandos. No se arregla desde el código: hacen
falta los renders a 2250×1509 o más, o fotos de obra real. Mientras tanto queda así, porque
achatar el cuadro para que entre la foto rompe el encuadre vertical del comparador en celular.

**Pendiente de contenido (2026-09-02):** `contenido/sitio.json` → `correo` sigue apuntando a la
casilla de David (`david_taranto@outlook.es`). Sale publicado en el bloque de contacto y dentro
de la vCard, al lado del nombre de Rodrigo. Se cambia en un solo lugar cuando exista el correo
de `sauriumchukum.com`.
