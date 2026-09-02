#!/usr/bin/env node
/**
 * Cambia el dominio del sitio en un solo paso, y genera robots.txt y sitemap.xml.
 *
 *   node server/dominio.js https://sauriumchukum.com/
 *   node server/dominio.js                 (sin argumento: solo muestra el estado)
 *
 * Toca lo que depende de la URL absoluta y nada mas:
 *   - canonical, og:url, og:image y JSON-LD de index.html e historia.html
 *   - los mismos de en/*.html (que igual se regeneran con `npm test`)
 *   - la constante BASE de server/generar-en.js, que es la que usa el generador
 *   - robots.txt y sitemap.xml, que se reescriben enteros
 *
 * Despues de correrlo: `npm test` (regenera /en/ y verifica), commit y push.
 * El CNAME NO se toca: lo crea GitHub desde Settings -> Pages. Ver el patron
 * `conectar-dominio-propio-a-github-pages` en el vault.
 */
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const GEN = path.join(__dirname, 'generar-en.js');
const PAGINAS = ['index.html', 'historia.html', 'en/index.html', 'en/historia.html'];

const baseActual = () => {
  const m = fs.readFileSync(GEN, 'utf8').match(/const BASE = '([^']+)'/);
  if (!m) throw new Error('no encuentro const BASE en server/generar-en.js');
  return m[1];
};

const normalizar = (u) => (u.endsWith('/') ? u : u + '/');

function robots(base) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`;
}

function sitemap(base) {
  const hoy = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: base, pri: '1.0', es: base, en: base + 'en/' },
    { loc: base + 'historia.html', pri: '0.8', es: base + 'historia.html', en: base + 'en/historia.html' },
    { loc: base + 'en/', pri: '0.9', es: base, en: base + 'en/' },
    { loc: base + 'en/historia.html', pri: '0.7', es: base + 'historia.html', en: base + 'en/historia.html' },
  ];
  const cuerpo = urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${hoy}</lastmod>
    <priority>${u.pri}</priority>
    <xhtml:link rel="alternate" hreflang="es-MX" href="${u.es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${u.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.es}"/>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${cuerpo}
</urlset>
`;
}

function main() {
  const actual = baseActual();
  const arg = process.argv[2];

  if (!arg) {
    let n = 0;
    for (const p of PAGINAS) {
      const f = path.join(raiz, p);
      if (fs.existsSync(f)) n += (fs.readFileSync(f, 'utf8').split(actual).length - 1);
    }
    console.log(`base actual: ${actual}`);
    console.log(`${n} URL absolutas en las 4 paginas, mas la constante BASE del generador`);
    console.log(`robots.txt: ${fs.existsSync(path.join(raiz, 'robots.txt')) ? 'si' : 'NO'} · ` +
                `sitemap.xml: ${fs.existsSync(path.join(raiz, 'sitemap.xml')) ? 'si' : 'NO'}`);
    console.log(`\nuso: node server/dominio.js https://sauriumchukum.com/`);
    return;
  }

  const nueva = normalizar(arg);
  if (!/^https:\/\/[a-z0-9.-]+\//i.test(nueva)) {
    console.error(`"${arg}" no parece una URL https valida`); process.exit(1);
  }
  if (nueva === actual) {
    // misma base: sirve para (re)generar robots.txt y sitemap.xml sin tocar el HTML
    fs.writeFileSync(path.join(raiz, 'robots.txt'), robots(nueva));
    fs.writeFileSync(path.join(raiz, 'sitemap.xml'), sitemap(nueva));
    console.log('la base ya es esa: se regeneraron robots.txt y sitemap.xml');
    return;
  }

  let total = 0;
  for (const p of PAGINAS) {
    const f = path.join(raiz, p);
    if (!fs.existsSync(f)) continue;
    const antes = fs.readFileSync(f, 'utf8');
    const despues = antes.split(actual).join(nueva);
    const n = antes.split(actual).length - 1;
    if (n) { fs.writeFileSync(f, despues); total += n; }
    console.log(`${p.padEnd(20)} ${n} URL`);
  }

  const gen = fs.readFileSync(GEN, 'utf8').replace(`const BASE = '${actual}'`, `const BASE = '${nueva}'`);
  fs.writeFileSync(GEN, gen);
  console.log(`${'server/generar-en.js'.padEnd(20)} BASE`);

  fs.writeFileSync(path.join(raiz, 'robots.txt'), robots(nueva));
  fs.writeFileSync(path.join(raiz, 'sitemap.xml'), sitemap(nueva));
  console.log(`${'robots.txt'.padEnd(20)} reescrito`);
  console.log(`${'sitemap.xml'.padEnd(20)} reescrito (4 URL con hreflang es/en)`);

  console.log(`\n${total} URL cambiadas: ${actual} -> ${nueva}`);
  console.log('ahora: cd server && npm test   (regenera /en/ y verifica), despues commit y push');
}

main();
