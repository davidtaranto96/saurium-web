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

## El hero, ahora que ocupa la pantalla entera (2026-09-02)

`hero-luminoso` estaba comprimido a **0,416 bits por píxel** y en el agua se veía el banding de
WebP. Se regeneró desde el JPG a calidad 90: **0,712 bpp**, 288 KB la variante de 1800. Es el LCP
de la página, así que ese peso es deliberado.

> **El techo está en la fuente, no en la compresión.** El JPG original es **1800×1840**. Cuando la
> foto se expande a pantalla completa, en un monitor Retina de 1440 el navegador pide **2880×1800**:
> son **1,6× de ampliación** que ninguna calidad de WebP puede inventar. Por eso el zoom del efecto
> se bajó de 1,16 a 1,08. **Para que el hero se vea nítido del todo hace falta el original a 2880 px
> de ancho o más** — pedírselo al cliente junto con los renders del comparador.

El encuadre lleva `object-position: 36% 62%`: con `cover` en un cuadro alto y angosto, el centro
de esta foto es agua sola y se perdían la costa y la pirámide.

## Aplicaciones: tres fotos por uso, y de dónde salen (2026-09-02)

Cada figura de Aplicaciones es una **pila** de tres fotos que van pasando solas. Todas las nuevas
son de Unsplash y **son provisorias**: se eligieron con un criterio explícito de David —*"que
tengan este acabado que ofrece el chukum"*—, o sea muro continuo de estuco mineral en tono tierra,
sin juntas. Se descartaron las que tenían sillares o juntas de piedra aunque la foto fuera linda.

| Archivo | Unsplash | Qué muestra |
|---|---|---|
| `uso-exterior-b` | `photo-1777823811065-90e02265a1c6` | fachada terracota, esquina viva, sombra de alero |
| `uso-exterior-c` | `photo-1783685157642-ec5a1b54b922` | muro arena con banca continua del mismo acabado |
| `uso-interior-b` | `photo-1601993957728-1e56ab70c5a8` | escalera con muros, huellas y umbral en un solo acabado |
| `uso-interior-c` | `photo-1638580380493-021e2a3533c2` | recámara Riviera Maya, muros y plafón continuos |
| `uso-piscina-b` | `photo-1756671069656-f12acde10ddd` | patio: muro, borde y piso de alberca en un acabado |
| `uso-piscina-c` | `photo-1755998490639-17d148e7c09f` | alberca en patio de muros terracota, con agaves |
| `uso-bano-a` | `photo-1768383057775-dba5997c13a8` | regadera de latón sobre muro continuo crema |
| `uso-bano-b` | `photo-1783040016976-dca83dc5155e` | baño con banca de obra y nicho |
| `uso-bano-c` | `photo-1754512782152-eeb23c039a84` | ducha de muro curvo con luz natural |

> **`uso-bano` (la vieja) salió del sitio.** David: *"la foto del baño, mejorémosla, no me gusta
> cómo se ve"*. Ya no está en la pila ni en el lightbox; el archivo queda en el repo por si acaso.

**Cuando lleguen fotos de obra real de SAURIUM**, reemplazan a estas una por una: se genera el
`.webp` a 1600 y su variante `-720`, se cambia el `src`/`srcset` en la pila y en el `.lb-slide`
del mismo nombre, y se corrige el texto en los dos diccionarios (`uso.ext2`, `uso.int2`, etc.).

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
| `swatch-*-hd.webp` (448×448) | Solo la lupa de acabados | Generados: `python3 server/swatch-hd.py` |

### Las texturas de la lupa (`swatch-*-hd.webp`)

La lupa de la sección Acabados dibuja la muestra a 150 % de 190 px. Con los `swatch-*.webp`
originales, que son **220×220**, eso era un upscale de casi 4× en una pantalla Retina, y encima
terracota casi no tiene textura que ampliar (desvío estándar 5,6 contra 20-40 de los otros): se
veía una mancha blanda. Los cinco restantes traen además el canto de la placa en diagonal, que
dentro del círculo se leía como un defecto.

`server/swatch-hd.py` los genera desde `textura.jpg` (1400×788, macro de muro real, plano y sin
aristas): toma un recorte distinto por acabado, le divide la iluminación de gran escala para
quedarse con el relieve, y lo multiplica por el color medio del swatch original — así la lupa
no miente sobre el color (medido en producción: +4 por canal contra la placa). Pesan ~18 KB cada
uno y se precargan recién cuando el estante se acerca al viewport.

Que los seis compartan el relieve no es una licencia: es lo que dice el propio copy de la
sección —*"Pigmentos minerales sobre la misma base de resina y cal. Sin pintura: el color es el
material"*—. **Si algún día llegan macros reales de cada acabado**, reemplazan a `textura.jpg`
como fuente y se vuelve a correr el script.

> Intento descartado: recortar el muro de `casa-<acabado>.jpg`. No hay 300 px de muro limpio en
> esas fotos, y una métrica que premiaba "más detalle" eligió las aristas y una palmera, que es
> justo lo que más alta frecuencia tiene en la foto de una casa.

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
