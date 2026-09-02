/** Genera en/index.html y en/historia.html a partir de las paginas en espanol.
 *  Misma pagina, arranca en ingles, canonical y og:url propios. Correr despues de cada cambio. */
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..'); const BASE = 'https://davidtaranto96.github.io/saurium-web/';
fs.mkdirSync(path.join(raiz, 'en'), { recursive: true });
for (const p of ['index.html', 'historia.html']) {
  let s = fs.readFileSync(path.join(raiz, p), 'utf8');
  s = s.replace(/<html(?: lang="es")?>/, '<html lang="en" data-lang-default="en">');
  s = s.replace(`<link rel="canonical" href="${BASE}${p === 'index.html' ? '' : p}">`, `<link rel="canonical" href="${BASE}en/${p}">`);
  s = s.replace(`<meta property="og:url" content="${BASE}${p === 'index.html' ? '' : p}">`, `<meta property="og:url" content="${BASE}en/${p}">`);
  s = s.replace(/(<meta property="og:locale" content=")es_MX(")/, '$1en_US$2').replace(/(og:locale:alternate" content=")en_US/, '$1es_MX');
  // rutas relativas: la pagina vive un nivel mas abajo
  s = s.replace(/(src|href|srcset)="(img\/|\.\/support|\.\/image-slot|favicon|historia\.html|index\.html)/g, (m, a, b) => `${a}="../${b}`)
       .replace(/srcset="([^"]*)"/g, (m, v) => 'srcset="' + v.replace(/(^|, )img\//g, '$1../img/') + '"')
       .replace(/url\('img\//g, "url('../img/")
       .replace(/url\(img\//g, "url(../img/")
       .replace(/data-tex="img\//g, 'data-tex="../img/')
       .replace(/`img\/casa-\$\{this\.finish\}\.webp`/g, '`../img/casa-${this.finish}.webp`');
  fs.writeFileSync(path.join(raiz, 'en', p), s);
  console.log('en/' + p, 'generado');
}
