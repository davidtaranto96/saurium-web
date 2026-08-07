/* SAURIUM — interacciones + i18n */

const I18N = {
  es: {
    'nav.story': 'Historia', 'nav.product': 'Producto', 'nav.colors': 'Colores',
    'nav.applications': 'Aplicaciones', 'nav.contact': 'Contacto', 'nav.cta': 'Cotizar',
    'hero.kicker': 'Chukum auténtico de la Península de Yucatán',
    'hero.l1': 'Desde el origen.', 'hero.l2': 'Diseñado para perdurar.',
    'hero.sub': 'Un recubrimiento natural con huella histórica. Nacido en Yucatán, listo para el mundo.',
    'hero.cta1': 'Descubrir el material', 'hero.cta2': 'Hablar con ventas', 'hero.scroll': 'Deslizar',
    'story.s1': 'Mucho antes de las ciudades. Mucho antes de los estilos arquitectónicos. Mucho antes de que existieran las fronteras.',
    'story.s2': 'En el corazón de Yucatán quedó una marca imborrable que atravesó el tiempo. Esa misma tierra daría origen a un material que trascendería generaciones: el chukum.',
    'story.s3a': 'Las obras más importantes no se construyen para el presente.',
    'story.s3b': 'Se construyen para permanecer.',
    'product.eyebrow': 'El material', 'product.title': 'Chukum con huella histórica',
    'product.sub': 'Resina natural del árbol de chukum combinada con cal y minerales de la península. Un acabado continuo, noble y resistente al tiempo y al salitre.',
    'product.f1t': 'Origen natural', 'product.f1d': 'Elaborado en la Península de Yucatán con materia prima local y procesos de bajo impacto.',
    'product.f2t': 'Resistencia real', 'product.f2d': 'Alta adherencia, repelencia al agua y comportamiento probado en clima tropical extremo.',
    'product.f3t': 'Acabado atemporal', 'product.f3d': 'Textura pétrea continua que envejece con carácter, sin juntas ni repeticiones.',
    'product.f4t': 'Listo para exportar', 'product.f4d': 'Presentación en saco de 20 kg, ficha técnica y soporte para proyectos internacionales.',
    'product.caption': 'Saco 20 kg — elaborado en la Península de Yucatán, México.',
    'colors.eyebrow': 'Paleta', 'colors.title': 'Seis acabados, una misma tierra',
    'colors.sub': 'Tocá cada muestra para ver el acabado aplicado.',
    'colors.c1': 'Arena', 'colors.c2': 'Crema', 'colors.c3': 'Gris', 'colors.c4': 'Carbón', 'colors.c5': 'Oliva', 'colors.c6': 'Terracota',
    'apps.eyebrow': 'Aplicaciones', 'apps.title': 'Donde la historia se vuelve arquitectura',
    'apps.a1': 'Muros y fachadas', 'apps.a2': 'Piscinas y espejos de agua', 'apps.a3': 'Interiores y baños', 'apps.a4': 'Mobiliario y detalles',
    'calc.eyebrow': 'Calculadora', 'calc.title': '¿Cuánto chukum necesita tu obra?',
    'calc.sub': 'Ingresá los metros cuadrados y calculamos los sacos de 20 kg.',
    'calc.label': 'Superficie a cubrir (m²)', 'calc.bags': 'sacos de 20 kg',
    'calc.note': 'Estimación con rendimiento promedio de 4 m² por saco a dos manos. Confirmamos cantidades exactas según superficie y acabado.',
    'calc.cta': 'Cotizar esta cantidad',
    'world.line': 'Desde Yucatán para el mundo.',
    'world.sub': 'Exportamos chukum auténtico a proyectos que buscan materiales con origen y verdad.',
    'contact.eyebrow': 'Contacto', 'contact.title': 'Llevá SAURIUM a tu próximo proyecto',
    'contact.sub': 'Escribinos y coordinamos muestras, fichas técnicas y logística de exportación.',
    'contact.wa': 'Escribir por WhatsApp', 'contact.mail': 'ventas@saurium.com',
    'contact.agent': 'Rodrigo López Alam — Ventas y exportación · +52 999 369 9488',
    'footer.line': 'Elaborado en la Península de Yucatán, México.', 'footer.rights': 'Todos los derechos reservados',
    waText: 'Hola, quiero cotizar chukum SAURIUM.',
  },
  en: {
    'nav.story': 'Story', 'nav.product': 'Product', 'nav.colors': 'Colors',
    'nav.applications': 'Applications', 'nav.contact': 'Contact', 'nav.cta': 'Get a quote',
    'hero.kicker': 'Authentic chukum from the Yucatán Peninsula',
    'hero.l1': 'From the origin.', 'hero.l2': 'Designed to endure.',
    'hero.sub': 'A natural finish with a historic footprint. Born in Yucatán, ready for the world.',
    'hero.cta1': 'Discover the material', 'hero.cta2': 'Talk to sales', 'hero.scroll': 'Scroll',
    'story.s1': 'Long before cities. Long before architectural styles. Long before borders existed.',
    'story.s2': 'In the heart of Yucatán, an indelible mark crossed through time. That same land would give rise to a material that transcends generations: chukum.',
    'story.s3a': 'The most important works are not built for the present.',
    'story.s3b': 'They are built to last.',
    'product.eyebrow': 'The material', 'product.title': 'Chukum with a historic footprint',
    'product.sub': 'Natural resin from the chukum tree blended with lime and minerals from the peninsula. A seamless, noble finish that withstands time and salt air.',
    'product.f1t': 'Natural origin', 'product.f1d': 'Made in the Yucatán Peninsula with local raw materials and low-impact processes.',
    'product.f2t': 'Real durability', 'product.f2d': 'High adhesion, water repellency and proven performance in extreme tropical climate.',
    'product.f3t': 'Timeless finish', 'product.f3d': 'A continuous stone-like texture that ages with character — no joints, no repetition.',
    'product.f4t': 'Export ready', 'product.f4d': '20 kg bag format, technical data sheets and support for international projects.',
    'product.caption': '20 kg bag — made in the Yucatán Peninsula, Mexico.',
    'colors.eyebrow': 'Palette', 'colors.title': 'Six finishes, one land',
    'colors.sub': 'Tap each swatch to preview the applied finish.',
    'colors.c1': 'Sand', 'colors.c2': 'Cream', 'colors.c3': 'Gray', 'colors.c4': 'Charcoal', 'colors.c5': 'Olive', 'colors.c6': 'Terracotta',
    'apps.eyebrow': 'Applications', 'apps.title': 'Where history becomes architecture',
    'apps.a1': 'Walls and facades', 'apps.a2': 'Pools and water features', 'apps.a3': 'Interiors and bathrooms', 'apps.a4': 'Furniture and details',
    'calc.eyebrow': 'Calculator', 'calc.title': 'How much chukum does your project need?',
    'calc.sub': 'Enter the square meters and we calculate the 20 kg bags.',
    'calc.label': 'Surface to cover (m²)', 'calc.bags': '20 kg bags',
    'calc.note': 'Estimate based on an average coverage of 4 m² per bag, two coats. Exact quantities confirmed per surface and finish.',
    'calc.cta': 'Quote this amount',
    'world.line': 'From Yucatán to the world.',
    'world.sub': 'We export authentic chukum to projects that value materials with origin and truth.',
    'contact.eyebrow': 'Contact', 'contact.title': 'Bring SAURIUM to your next project',
    'contact.sub': 'Write to us and we will coordinate samples, technical sheets and export logistics.',
    'contact.wa': 'Chat on WhatsApp', 'contact.mail': 'ventas@saurium.com',
    'contact.agent': 'Rodrigo López Alam — Sales and export · +52 999 369 9488',
    'footer.line': 'Made in the Yucatán Peninsula, Mexico.', 'footer.rights': 'All rights reserved',
    waText: 'Hi, I would like a quote for SAURIUM chukum.',
  },
};

const WA_NUMBER = '529993699488';
let lang = localStorage.getItem('saurium-lang')
  || (navigator.language.startsWith('es') ? 'es' : 'en');

function applyLang(next) {
  lang = next;
  localStorage.setItem('saurium-lang', lang);
  document.documentElement.lang = lang;
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('.lang-opt').forEach((el) => {
    el.classList.toggle('is-active', el.dataset.lang === lang);
  });
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(dict.waText)}`;
  const waBtn = document.getElementById('waBtn');
  const calcCta = document.getElementById('calcCta');
  if (waBtn) waBtn.href = waUrl;
  if (calcCta) calcCta.href = waUrl;
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(lang === 'es' ? 'en' : 'es');
});
applyLang(lang);

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { threshold: 0.18 });
document.querySelectorAll('.reveal, .story-step').forEach((el) => io.observe(el));

/* Nav shadow + parallax hero (rAF, transform only) */
const nav = document.getElementById('nav');
const parallaxEls = document.querySelectorAll('[data-parallax]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 8);
    if (!reduceMotion) {
      parallaxEls.forEach((el) => {
        el.style.transform = `translateY(${y * Number(el.dataset.parallax)}px)`;
      });
    }
    ticking = false;
  });
}, { passive: true });

/* Swatches */
const stage = document.getElementById('colorStage');
const colorName = document.getElementById('colorName');
document.querySelectorAll('.swatch').forEach((sw) => {
  sw.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach((s) => s.classList.remove('is-active'));
    sw.classList.add('is-active');
    stage.style.setProperty('--stage', getComputedStyle(sw).getPropertyValue('--sw'));
    colorName.textContent = sw.querySelector('span').textContent;
  });
});

/* Calculadora: 4 m² por saco (dos manos) */
const calcM2 = document.getElementById('calcM2');
const calcSacos = document.getElementById('calcSacos');
function updateCalc() {
  const m2 = Math.max(0, Number(calcM2.value) || 0);
  calcSacos.textContent = String(Math.ceil(m2 / 4));
}
calcM2.addEventListener('input', updateCalc);
updateCalc();
