/** Genera en/index.html y en/historia.html a partir de las paginas en espanol.
 *
 *  Misma pagina, pero el HTML estatico ya sale en ingles (titulo, metas, textos
 *  con data-i18n, aria-labels y el JSON-LD de FAQ), con canonical y og:url
 *  propios y las rutas de assets un nivel arriba (../img/, ../support.js).
 *  El JS no se toca: lee la base de imagenes de data-img-base en <html>.
 *  Los href entre paginas (historia.html, index.html#x) quedan como estan,
 *  porque dentro de /en/ ya resuelven a las paginas en ingles.
 *  Determinista e idempotente: prueba-contenido.js lo verifica.
 *  Correr despues de cada cambio: npm run en (desde server/). */
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..');
const BASE = 'https://davidtaranto96.github.io/saurium-web/';
const PAGINAS = ['index.html', 'historia.html'];

const escTexto = (t) => String(t).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const escAttr = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- diccionario ---------- */

/** Indice de la llave que cierra el objeto que arranca en src[ini]. Cuenta llaves
 *  fuera de strings, template literals (con sus ${…}) y comentarios. */
function cerrarObjeto(src, ini) {
  const modos = [{ m: 'code', prof: 0 }];
  for (let j = ini; j < src.length; j++) {
    const top = modos[modos.length - 1], c = src[j], n = src[j + 1];
    if (top.m === 'code') {
      if (c === '/' && n === '/') { modos.push({ m: 'lc' }); j++; }
      else if (c === '/' && n === '*') { modos.push({ m: 'bc' }); j++; }
      else if (c === "'" || c === '"') modos.push({ m: 'str', q: c });
      else if (c === '`') modos.push({ m: 'tpl' });
      else if (c === '{') top.prof++;
      else if (c === '}') {
        top.prof--;
        if (top.prof === 0 && modos.length === 1) return j;
        if (top.prof < 0) modos.pop(); // cierra un ${…} de template
      }
    } else if (top.m === 'lc') { if (c === '\n') modos.pop(); }
    else if (top.m === 'bc') { if (c === '*' && n === '/') { modos.pop(); j++; } }
    else if (top.m === 'str') { if (c === '\\') j++; else if (c === top.q || c === '\n') modos.pop(); }
    else if (top.m === 'tpl') { if (c === '\\') j++; else if (c === '`') modos.pop(); else if (c === '$' && n === '{') { modos.push({ m: 'code', prof: 0 }); j++; } }
  }
  throw new Error('this.I18N: el objeto no cierra');
}

/** { es: {...}, en: {...} } tal cual lo ve el navegador. Solo quedan los valores string. */
function extraerI18N(html) {
  const marca = 'this.I18N = ';
  const i = html.indexOf(marca);
  if (i === -1) throw new Error('no se encontro "this.I18N = " en la pagina');
  const ini = html.indexOf('{', i + marca.length);
  const texto = html.slice(ini, cerrarObjeto(html, ini) + 1);
  const obj = new Function('return ' + texto)();
  const soloStrings = (d) => Object.fromEntries(Object.entries(d || {}).filter(([, v]) => typeof v === 'string'));
  return { es: soloStrings(obj.es), en: soloStrings(obj.en) };
}

/** Rendimiento (m² por saco) de la region cms:datos; si la pagina no la tiene, del JSON de contenido. */
function rendimientoDe(html) {
  const datos = html.match(/\/\*cms:datos\*\/([\s\S]*?)\/\*\/cms:datos\*\//);
  const r = datos && datos[1].match(/rendimiento\s*:\s*([\d.]+)/);
  if (r) return r[1];
  const c = JSON.parse(fs.readFileSync(path.join(raiz, 'contenido/sitio.json'), 'utf8'));
  return String(c.rendimiento_m2_por_saco);
}

/* ---------- traduccion del HTML estatico ---------- */

function traducir(html, en, r, nota) {
  // textos: <tag … data-i18n="clave">texto plano</tag>. Con etiquetas adentro no se toca.
  const re = /<([a-zA-Z][a-zA-Z0-9-]*)\b[^<>]*?\sdata-i18n="([^"]+)"[^<>]*>/g;
  let out = '', ult = 0, m, n = 0;
  while ((m = re.exec(html))) {
    const tag = m[1], clave = m[2], ini = m.index + m[0].length;
    const fin = html.indexOf('</' + tag + '>', ini);
    const interno = fin === -1 ? null : html.slice(ini, fin);
    if (interno === null || interno.replace(/<!--[\s\S]*?-->/g, '').includes('<')) {
      nota(`sin traducir, tiene etiquetas adentro: <${tag} data-i18n="${clave}">`);
      continue;
    }
    const t = en[clave];
    if (typeof t !== 'string') { nota(`sin traducir, falta en el diccionario en: ${clave}`); continue; }
    if (interno.includes('<!--')) nota(`traducido descartando el comentario cms que tenia adentro: <${tag} data-i18n="${clave}">`);
    if (t.includes('{r}') && !r) nota(`${clave} usa {r} y no hay rendimiento`);
    const pre = interno.match(/^\s*/)[0], post = interno.trim() ? interno.match(/\s*$/)[0] : '';
    out += html.slice(ult, ini) + pre + escTexto(r ? t.replace('{r}', r) : t) + post;
    ult = fin; re.lastIndex = fin; n++;
  }
  html = out + html.slice(ult);

  // aria-label: <tag … aria-label="…" data-i18n-arialabel="clave">
  html = html.replace(/<([a-zA-Z][a-zA-Z0-9-]*)\b[^<>]*?\sdata-i18n-arialabel="([^"]+)"[^<>]*>/g, (etiqueta, tag, clave) => {
    const t = en[clave];
    if (typeof t !== 'string') { nota(`sin traducir, falta en el diccionario en: ${clave} (aria-label)`); return etiqueta; }
    n++;
    if (/\saria-label="[^"]*"/.test(etiqueta)) return etiqueta.replace(/(\saria-label=")[^"]*(")/, (a, p1, p2) => p1 + escAttr(t) + p2);
    return etiqueta.replace(/>$/, () => ` aria-label="${escAttr(t)}">`);
  });

  // alt: <tag … alt="…" data-i18n-alt="clave">
  html = html.replace(/<([a-zA-Z][a-zA-Z0-9-]*)\b[^<>]*?\sdata-i18n-alt="([^"]+)"[^<>]*>/g, (etiqueta, tag, clave) => {
    const t = en[clave];
    if (typeof t !== 'string') { nota(`sin traducir, falta en el diccionario en: ${clave} (alt)`); return etiqueta; }
    n++;
    if (/\salt="[^"]*"/.test(etiqueta)) return etiqueta.replace(/(\salt=")[^"]*(")/, (a, p1, p2) => p1 + escAttr(t) + p2);
    return etiqueta.replace(/>$/, () => ` alt="${escAttr(t)}">`);
  });

  // titulo y metas
  const meta = (sel, valor) => { html = html.replace(new RegExp(`(<meta ${sel} content=")[^"]*(")`), (a, p1, p2) => p1 + escAttr(valor) + p2); };
  if (en['meta.title']) {
    html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escTexto(en['meta.title'])}</title>`);
    meta('property="og:title"', en['meta.title']); meta('name="twitter:title"', en['meta.title']);
  } else nota('falta meta.title en el diccionario en');
  if (en['meta.desc']) {
    meta('name="description"', en['meta.desc']); meta('property="og:description"', en['meta.desc']); meta('name="twitter:description"', en['meta.desc']);
  } else nota('falta meta.desc en el diccionario en');

  // JSON-LD FAQPage, mismo formato que el escrito a mano (", " y ": " como separadores)
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (bloque, json) => {
    if (!/"@type"\s*:\s*"FAQPage"/.test(json)) return bloque;
    const items = [];
    for (let i = 1; typeof en['faq.q' + i] === 'string' && typeof en['faq.a' + i] === 'string'; i++) items.push([en['faq.q' + i], en['faq.a' + i]]);
    if (!items.length) { nota('FAQPage sin traducir: no hay faq.q1/faq.a1 en el diccionario en'); return bloque; }
    let enJson = 0; try { enJson = JSON.parse(json).mainEntity.length; } catch (e) { /* formato raro: se regenera igual */ }
    if (enJson && enJson !== items.length) nota(`FAQPage: ${enJson} preguntas en el JSON-LD, ${items.length} en el diccionario`);
    const cuerpo = '{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": ['
      + items.map(([q, a]) => `{"@type": "Question", "name": ${JSON.stringify(q)}, "acceptedAnswer": {"@type": "Answer", "text": ${JSON.stringify(a)}}}`).join(', ')
      + ']}';
    return '<script type="application/ld+json">' + cuerpo + '</script>';
  });

  return { html, traducidos: n };
}

/* ---------- raiz, canonical y rutas ---------- */

function relocalizar(html, p) {
  const urlEn = BASE + 'en/' + p;
  html = html.replace(/<html\b[^>]*>/, '<html lang="en" data-lang-default="en" data-img-base="../img/">');
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (a, p1, p2) => p1 + urlEn + p2);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, (a, p1, p2) => p1 + urlEn + p2);
  html = html.replace(/(<meta property="og:locale" content=")es_MX(")/, '$1en_US$2').replace(/(og:locale:alternate" content=")en_US/, '$1es_MX');
  // assets: la pagina vive un nivel mas abajo. Los .html NO se prefijan (dentro de /en/ ya resuelven a /en/).
  return html
    .replace(/(src|href|srcset)="(img\/|\.\/support|\.\/image-slot|favicon)/g, (m, a, b) => `${a}="../${b}`)
    .replace(/srcset="([^"]*)"/g, (m, v) => 'srcset="' + v.replace(/(^|,\s*)img\//g, '$1../img/') + '"')
    .replace(/url\((['"]?)img\//g, (m, q) => `url(${q}../img/`)
    .replace(/data-tex="img\//g, 'data-tex="../img/');
}

/** Pura: HTML en espanol → HTML de /en/. Devuelve tambien las notas (lo que no se pudo traducir). */
function generarPagina(p, fuente) {
  const notas = [];
  const en = extraerI18N(fuente).en;
  const { html, traducidos } = traducir(fuente, en, rendimientoDe(fuente), (t) => notas.push(t));
  return { html: relocalizar(html, p), notas, traducidos };
}

function generar() {
  fs.mkdirSync(path.join(raiz, 'en'), { recursive: true });
  return PAGINAS.map((p) => {
    const fuente = fs.readFileSync(path.join(raiz, p), 'utf8');
    const r = generarPagina(p, fuente);
    fs.writeFileSync(path.join(raiz, 'en', p), r.html);
    console.log('en/' + p, 'generado ·', r.traducidos, 'textos en ingles');
    r.notas.forEach((t) => console.log('  aviso:', t));
    return { pagina: p, ...r };
  });
}

module.exports = { generar, generarPagina, extraerI18N, escTexto, PAGINAS, BASE };
if (require.main === module) generar();
