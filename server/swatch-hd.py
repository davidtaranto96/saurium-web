#!/usr/bin/env python3
"""Genera swatch-<acabado>-hd.webp: el grano real del chukum, con el color de cada acabado.

El problema: el swatch es 220x220 y la lupa lo dibuja a 240% de 170px = 408 px CSS
(816 fisicos en DPR2). Upscale de 3,7x sobre una imagen que ademas casi no tiene
textura (terracota: desvio 5,6). Por eso se ve blanda.

La fuente correcta ya estaba en el repo: img/textura.jpg (1400x788) es un macro de
muro de chukum, plano, sin aristas ni vegetacion. Se usa como capa de RELIEVE y se
le aplica el color medio de cada acabado.

Que sea el mismo relieve para los seis no es una licencia: la propia web lo dice —
"Pigmentos minerales sobre la misma base de resina y cal. Sin pintura: el color es
el material". Es el mismo chukum con distinto pigmento. Cada acabado igual toma un
recorte distinto de la textura para que las seis lupas no muestren el mismo dibujo.

Intento anterior descartado: recortar el muro de casa-<color>.jpg (1500x1006). No hay
300 px de muro limpio en esas fotos, y una metrica que premiaba "detalle" eligio las
aristas y una palmera, que es lo que mas alta frecuencia tiene en una foto de casa.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter, ImageStat

IMG = Path(__file__).resolve().parent.parent / 'img'
FUENTE = IMG / 'textura.jpg'          # 1400x788, macro de muro
LADO_FUENTE = 600                     # recorte nativo (se reduce a SALIDA: nunca se amplia)
SALIDA = 448
CONTRASTE_GRANO = 9.0                # desvio final del relieve, igual para los seis

# recorte y transformacion por acabado, para que no se repita el mismo dibujo
ACABADOS = [
    ('arena',      (0, 0),     None),
    ('crema',      (400, 0),   Image.FLIP_LEFT_RIGHT),
    ('gris',       (800, 188), None),
    ('carbon',     (200, 188), Image.ROTATE_180),
    ('oliva',      (600, 94),  Image.FLIP_TOP_BOTTOM),
    ('terracota',  (0, 188),   Image.TRANSPOSE),
]


def relieve(caja, transformar):
    """Devuelve el grano del muro como multiplicador centrado en 1,0."""
    x, y = caja
    parche = Image.open(FUENTE).convert('RGB').crop((x, y, x + LADO_FUENTE, y + LADO_FUENTE))
    if transformar is not None:
        parche = parche.transpose(transformar)
    parche = parche.resize((SALIDA, SALIDA), Image.LANCZOS)

    luz = np.asarray(parche.convert('L').filter(ImageFilter.GaussianBlur(SALIDA / 4.5)),
                     dtype=np.float32)
    # el suavizado leve saca el ruido de sensor y de JPEG: amplificarlo daba una
    # textura arenosa de piedra pomez, y el chukum es liso con marcas de llana
    gris = np.asarray(parche.convert('L').filter(ImageFilter.GaussianBlur(1.1)),
                      dtype=np.float32)
    # dividir por la iluminacion de gran escala deja el relieve y saca el degrade
    rel = gris / np.maximum(luz, 1.0)
    return rel / rel.mean()


def main():
    print(f'{"acabado":11s} {"color placa":>12s} {"color HD":>10s} {"sd 220":>7s} '
          f'{"sd HD":>6s} {"peso":>8s}')
    for nombre, caja, tr in ACABADOS:
        sw = Image.open(IMG / f'swatch-{nombre}.jpg').convert('RGB')
        st = ImageStat.Stat(sw)
        objetivo = np.array(st.mean, dtype=np.float32)
        sd_orig = float(np.mean(st.stddev))

        rel = relieve(caja, tr)
        # el relieve modula el color; k lo escala al contraste buscado
        k = CONTRASTE_GRANO / max(float((rel * objetivo.mean()).std()), 0.5)
        capa = 1.0 + (rel - 1.0) * k
        hd = objetivo.reshape(1, 1, 3) * capa[..., None]
        img = Image.fromarray(np.clip(hd, 0, 255).astype(np.uint8))

        img.save(IMG / f'swatch-{nombre}-hd.webp', 'WEBP', quality=82, method=6)
        st2 = ImageStat.Stat(img)
        r, g, b = [int(v) for v in st2.mean]
        o = [int(v) for v in objetivo]
        peso = (IMG / f'swatch-{nombre}-hd.webp').stat().st_size
        print(f'{nombre:11s}   #{o[0]:02x}{o[1]:02x}{o[2]:02x}     #{r:02x}{g:02x}{b:02x} '
              f'{sd_orig:7.1f} {np.mean(st2.stddev):6.1f} {peso/1024:7.1f} KB')

    # los -hd.jpg del intento descartado no se usan
    for f in IMG.glob('swatch-*-hd.jpg'):
        f.unlink()


if __name__ == '__main__':
    main()
