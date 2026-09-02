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
  'datos': (c) => `\n    var CONTENIDO = { whatsapp: '${j(c.whatsapp)}', rendimiento: ${Number(c.rendimiento_m2_por_saco)}, web3forms: '${j(c.web3forms_key || '')}' };\n    `,
  'contacto-es': (c) => `'contact.agent':'${j(c.vendedor)} — ${j(c.cargo_es)}','contact.tel':'${j(c.telefono_legible)}','contact.mail':'${j(c.correo)}',`,
  'contacto-en': (c) => `'contact.agent':'${j(c.vendedor)} — ${j(c.cargo_en)}','contact.tel':'${j(c.telefono_legible)}','contact.mail':'${j(c.correo)}',`,
  'hero-es': (c) => `'hero.l1':'${j(c.hero_es.linea1)}','hero.l2':'${j(c.hero_es.linea2)}',`,
  'hero-en': (c) => `'hero.l1':'${j(c.hero_en.linea1)}','hero.l2':'${j(c.hero_en.linea2)}',`,
  // sin correo del dominio, el boton no se dibuja: no se publica una casilla ajena como contacto de la marca
  'correo': (c) => c.correo ? `<a href="mailto:${esc(c.correo)}" data-i18n="contact.mail" class="cta-linea cta-linea-claro" style="display:inline-flex;align-items:center;padding:16px 28px;border-radius:999px;font-weight:600;font-size:15px;border:1.5px solid rgba(243,235,222,0.45);color:var(--crema)">${esc(c.correo)}</a>` : '',
  'wa-historia': (c) => `<a data-wa-historia-href href="https://wa.me/${esc(c.whatsapp)}?text=Hola%2C%20quiero%20cotizar%20chukum%20SAURIUM." target="_blank" rel="noopener" data-wa-historia class="cta-lleno" style="display:inline-flex;align-items:center;gap:10px;padding:15px 28px;border-radius:999px;font-weight:600;font-size:15px;background:var(--marron);color:var(--crema);box-shadow:var(--sombra-2)"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.2 1.1-1.7 1.2-.5 0-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c0 .2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.3 1.4 2.6 1.6.3.1.5.1.7-.1l1.1-1.3c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.3 1.6Z"></path></svg><span data-i18n="story.cta3">Escribir por WhatsApp</span></a>`,
  /* casos reales: hasta que Rodrigo mande fotos, la region queda vacia y la seccion oculta */
  'obras': (c) => (c.obras && c.obras.length) ? '\n  <div class="obras-grid">' + c.obras.map(o => `<figure><img src="${esc(o.foto)}" alt="${esc(o.nombre)}" loading="lazy"><figcaption><b>${esc(o.nombre)}</b> · ${esc(o.lugar)} · ${esc(o.acabado)}</figcaption></figure>`).join('') + '</div>\n  ' : '',
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
