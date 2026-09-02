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

/* /en/: se regenera aca mismo (equivale a npm run en) y despues se verifica que el
   HTML estatico salio en ingles, con la raiz marcada, los assets un nivel arriba y
   los href entre paginas sin tocar. Tambien que generar es determinista e idempotente. */
const { generar, generarPagina, extraerI18N, escTexto } = require('./generar-en');
for (const { pagina, html: generado } of generar()) {
  const f = 'en/' + pagina;
  const fuente = fs.readFileSync(path.join(raiz, pagina), 'utf8');
  const s = fs.readFileSync(path.join(raiz, f), 'utf8');
  const en = extraerI18N(fuente).en;
  const chequeos = [];
  chequeos.push(['lo escrito en disco es lo generado', s === generado]);
  chequeos.push(['determinista: dos corridas dan el mismo byte a byte', generarPagina(pagina, fuente).html === s]);
  chequeos.push(['idempotente: generar sobre lo generado no cambia nada', generarPagina(pagina, s).html === s]);
  const titulo = (s.match(/<title>([^<]*)<\/title>/) || [])[1];
  chequeos.push([`<title> = en['meta.title'] (${JSON.stringify(titulo)})`, titulo === escTexto(en['meta.title'])]);
  const raizHtml = (s.match(/<html\b[^>]*>/) || [''])[0];
  chequeos.push([`<html> con lang="en" y data-img-base="../img/" (${raizHtml})`, /\slang="en"/.test(raizHtml) && /\sdata-img-base="\.\.\/img\/"/.test(raizHtml)]);
  const sinPrefijo = [];
  for (const m of s.matchAll(/\s(?:src|data-tex|poster)="(img\/[^"]*)"/g)) sinPrefijo.push(m[1]);
  for (const m of s.matchAll(/\ssrcset="([^"]*)"/g)) m[1].split(',').map((x) => x.trim()).filter((x) => x.startsWith('img/')).forEach((x) => sinPrefijo.push(x));
  for (const m of s.matchAll(/url\(\s*['"]?(img\/[^)'"]*)/g)) sinPrefijo.push(m[1]);
  chequeos.push(['ningun src, srcset, data-tex ni url( apunta a img/ sin ../' + (sinPrefijo.length ? ' → ' + sinPrefijo.join(', ') : ''), sinPrefijo.length === 0]);
  const hrefMal = [...s.matchAll(/href="(\.\.\/(?:historia|index)\.html[^"]*)"/g)].map((m) => m[1]);
  chequeos.push(['los href a historia.html / index.html no salen de /en/' + (hrefMal.length ? ' → ' + hrefMal.join(', ') : ''), hrefMal.length === 0]);
  const faq = (s.match(/<script type="application\/ld\+json">([^<]*"@type": "FAQPage"[^<]*)<\/script>/) || [])[1];
  if (faq || en['faq.q1']) {
    let primera = null; try { primera = JSON.parse(faq).mainEntity[0].name; } catch (e) { /* sin FAQ o JSON roto: falla abajo */ }
    chequeos.push(['JSON-LD FAQPage en ingles (primera pregunta = faq.q1)', primera === en['faq.q1']]);
  }
  for (const [nombre, ok] of chequeos) if (!ok) { console.error('FALLO', f, nombre); fallo = true; }
  if (chequeos.every(([, ok]) => ok)) console.log('OK', f, '·', chequeos.length, 'chequeos de /en/');
}
process.exit(fallo ? 1 : 0);
