/**
 * Contenido editable de saurium-web.
 *
 * El HTML tiene regiones marcadas: <!--cms:x--> en HTML y, dentro de scripts,
 * Este modulo las regenera desde contenido/sitio.json. Lo que esta fuera de
 * las marcas no se toca nunca. Mismo esquema que melou, generadores propios.
 */
const FORMATOS = [
  (n) => ({ abre: `<!--cms:${n}-->`, cierra: `<!--/cms:${n}-->` }),
  (n) => ({ abre: `/*cms:${n}*/`,    cierra: `/*/cms:${n}*/` }),
];

function reemplazar(html, nombre, contenido) {
  for (const f of FORMATOS) {
    const { abre, cierra } = f(nombre);
    const i = html.indexOf(abre), j = html.indexOf(cierra);
    if (i === -1 || j === -1 || j < i) continue;
    return { html: html.slice(0, i + abre.length) + contenido + html.slice(j), ok: true };
  }
  return { html, ok: false, motivo: `falta la marca ${nombre}` };
}
const tieneMarca = (html, n) => FORMATOS.some((f) => html.includes(f(n).abre));
const marcasDe = (html) => [...html.matchAll(/(?:<!--|\/\*)cms:([a-z0-9-]+)(?:-->|\*\/)/g)].map((m) => m[1]);
const esc = (t) => String(t == null ? '' : t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const j = (t) => String(t == null ? '' : t).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/* Cada generador tiene que producir EXACTAMENTE lo que hoy esta escrito a
   mano: la prueba de idempotencia (prueba-contenido.js) existe para eso. */
const generadores = {
  'datos': (c) => `\n    var CONTENIDO = { whatsapp: '${j(c.whatsapp)}', rendimiento: ${Number(c.rendimiento_m2_por_saco)} };\n    `,
  'contacto-es': (c) => `'contact.agent':'${j(c.vendedor)} — ${j(c.cargo_es)} · ${j(c.telefono_legible)}','contact.mail':'${j(c.correo)}',`,
  'contacto-en': (c) => `'contact.agent':'${j(c.vendedor)} — ${j(c.cargo_en)} · ${j(c.telefono_legible)}','contact.mail':'${j(c.correo)}',`,
  'hero-es': (c) => `'hero.l1':'${j(c.hero_es.linea1)}','hero.l2':'${j(c.hero_es.linea2)}',`,
  'hero-en': (c) => `'hero.l1':'${j(c.hero_en.linea1)}','hero.l2':'${j(c.hero_en.linea2)}',`,
  'correo': (c) => `<a href="mailto:${esc(c.correo)}" data-i18n="contact.mail" style="display:inline-flex;align-items:center;padding:18px 34px;border-radius:999px;font-weight:600;font-size:16px;border:1.5px solid rgba(71,67,65,0.35);transition:transform 0.2s cubic-bezier(0.22,1,0.36,1),border-color 0.2s" style-hover="border-color:var(--marron);transform:translateY(-2px)" style-active="transform:scale(0.96)">${esc(c.correo)}</a>`,
  'wa-historia': (c) => `<a data-wa-historia-href href="https://wa.me/${esc(c.whatsapp)}?text=Hola%2C%20quiero%20cotizar%20chukum%20SAURIUM." target="_blank" rel="noopener" data-wa-historia data-i18n="story.cta3" style="display:inline-flex;align-items:center;gap:9px;padding:15px 30px;border-radius:999px;font-weight:600;font-size:15px;background:#25623f;color:#f3ebde;box-shadow:0 12px 32px rgba(29,27,26,0.2);transition:transform 0.2s cubic-bezier(0.22,1,0.36,1),background 0.2s">Escribir por WhatsApp</a>`,
  'rendimiento': (c) => String(Number(c.rendimiento_m2_por_saco)),
};

function aplicar(html, c) {
  const aplicadas = [], faltantes = [];
  let salida = html;
  for (const [nombre, generar] of Object.entries(generadores)) {
    if (!tieneMarca(salida, nombre)) continue;
    const r = reemplazar(salida, nombre, generar(c));
    if (r.ok) { salida = r.html; aplicadas.push(nombre); } else faltantes.push(nombre);
  }
  return { html: salida, aplicadas, faltantes };
}
module.exports = { aplicar, marcasDe, reemplazar, tieneMarca, generadores, FORMATOS };
