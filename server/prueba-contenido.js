/** Idempotencia: aplicar el JSON actual NO puede cambiar ni un byte del HTML. */
const fs = require('fs'), path = require('path');
const { aplicar, marcasDe } = require('./contenido');
const raiz = path.join(__dirname, '..');
const c = JSON.parse(fs.readFileSync(path.join(raiz, 'contenido/sitio.json'), 'utf8'));
let fallo = false;
for (const p of ['index.html', 'historia.html']) {
  const antes = fs.readFileSync(path.join(raiz, p), 'utf8');
  const { html, faltantes } = aplicar(antes, c);
  if (faltantes.length) { console.error('FALLO', p, 'marcas sin generador aplicable:', faltantes); fallo = true; }
  if (html !== antes) {
    fallo = true;
    for (let i = 0; i < antes.length; i++) if (antes[i] !== html[i]) {
      console.error('FALLO', p, 'difiere desde el byte', i);
      console.error('  mano:', JSON.stringify(antes.slice(i - 40, i + 80)));
      console.error('  gen :', JSON.stringify(html.slice(i - 40, i + 80)));
      break;
    }
  } else console.log('OK', p, '· regiones:', marcasDe(antes).join(', '));
}
process.exit(fallo ? 1 : 0);
