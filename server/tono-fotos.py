#!/usr/bin/env python3
"""Decide, para cada foto de Aplicaciones, si su pie va claro u oscuro.

El pie de foto vive DENTRO de la imagen, asi que el contraste depende de lo que
haya justo ahi. En vez de estimarlo, se mide: se toma la franja inferior (donde
cae el texto), se calcula su luminancia media y se elige el tratamiento.

Escribe data-tono="claro|oscuro" en cada <img> de las pilas de index.html.
  claro  -> la franja es clara: texto oscuro sobre velo crema
  oscuro -> la franja es oscura: texto crema sobre velo negro

Correr despues de cambiar cualquier foto de Aplicaciones:
    python3 server/tono-fotos.py
"""
import re
from pathlib import Path
import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
FRANJA = 0.34          # porcion inferior de la foto que ocupa el pie
UMBRAL = 0.52          # luminancia relativa por encima de la cual la franja es "clara"


def tono(archivo):
    im = Image.open(RAIZ / 'img' / archivo).convert('RGB')
    alto = max(1, int(im.height * FRANJA))
    franja = np.asarray(im.crop((0, im.height - alto, im.width, im.height)), dtype=np.float32) / 255.0
    # luminancia relativa (WCAG): el ojo pesa mucho mas el verde
    lin = np.where(franja <= 0.03928, franja / 12.92, ((franja + 0.055) / 1.055) ** 2.4)
    L = 0.2126 * lin[..., 0] + 0.7152 * lin[..., 1] + 0.0722 * lin[..., 2]
    return float(L.mean()), 'claro' if L.mean() > UMBRAL else 'oscuro'


def contraste(L_fondo, L_texto):
    a, b = max(L_fondo, L_texto), min(L_fondo, L_texto)
    return (a + 0.05) / (b + 0.05)


# luminancia de los dos colores de texto posibles, ya mezclados con su velo
L_CREMA, L_NEGRO = 0.83, 0.02


def main():
    p = RAIZ / 'index.html'
    html = p.read_text()
    cambios = 0
    print(f'{"foto":22s} {"luma":>6s}  tono     contraste del pie')
    for m in re.finditer(r'<img [^>]*src="img/(uso-[\w-]+)\.webp"[^>]*data-lb-clave="[^"]*"[^>]*>', html):
        etiqueta, archivo = m.group(0), m.group(1) + '.webp'
        if not (RAIZ / 'img' / archivo).exists():
            print(f'{archivo:22s} FALTA'); continue
        L, t = tono(archivo)
        # el velo empuja la franja hacia su extremo antes de poner el texto encima
        L_velo = L * 0.34 + 0.86 * 0.66 if t == 'claro' else L * 0.26
        c = contraste(L_velo, L_NEGRO if t == 'claro' else L_CREMA)
        nueva = re.sub(r' data-tono="[^"]*"', '', etiqueta).replace('<img ', f'<img data-tono="{t}" ', 1)
        if nueva != etiqueta:
            html = html.replace(etiqueta, nueva, 1); cambios += 1
        print(f'{archivo:22s} {L:6.3f}  {t:8s} {c:4.1f}:1 {"OK" if c >= 4.5 else "REVISAR"}')
    p.write_text(html)
    print(f'\n{cambios} etiquetas actualizadas')


if __name__ == '__main__':
    main()
