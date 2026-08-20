/** Aplica contenido/sitio.json a las paginas, desde la terminal. */
const fs = require('fs'), path = require('path');
const { aplicar } = require('./contenido');
const raiz = path.join(__dirname, '..');
const c = JSON.parse(fs.readFileSync(path.join(raiz, 'contenido/sitio.json'), 'utf8'));
for (const p of ['index.html', 'historia.html']) {
  const f = path.join(raiz, p);
  const antes = fs.readFileSync(f, 'utf8');
  const { html, aplicadas, faltantes } = aplicar(antes, c);
  if (faltantes.length) console.error(p, 'FALTAN MARCAS:', faltantes.join(', '));
  fs.writeFileSync(f, html);
  console.log(p, '→', aplicadas.join(', ') || 'sin regiones', html === antes ? '(sin cambios)' : '(actualizado)');
}
