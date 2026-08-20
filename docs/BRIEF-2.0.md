# Brief rediseño 2.0 — saurium-web (presupuesto aprobado)

Actuá como director de arte y frontend engineer senior. El sitio de SAURIUM (chukum de
Yucatán) pasó de demo a proyecto pago: llevalo a versión 2.0 de producción.

## Alcance, en orden

1. **Auditoría con puntaje** (skill `efectos-web`): correr el auditor sobre `index.html` y
   `historia.html`, puntaje de vida sobre 100, TODAS las oportunidades ordenadas por impacto,
   y tabla de descartes con la pregunta de la compuerta que mató cada uno.
2. **Rediseño 2.0 de todas las vistas**: home, historia, y cada "ventana" interna (comparador,
   saco 3D, calculadora, colores, aplicaciones, contacto). Modernizar sin tocar la identidad:
   paleta del manual (#F3EBDE #DCCAB2 #474341 #C88166), Sora, fotos del brochure.
   - Colores: convertir los tokens a OKLCH (skill `oklch-skill`), verificar contraste AA real,
     y derivar tintes/sombras consistentes en vez de rgba() a ojo.
   - Pulido fino con `make-interfaces-feel-better`: radio concéntrico (externo = interno +
     padding), áreas táctiles 44x44 reales, tabular-nums en la calculadora, text-balance en
     títulos, sombras en capas, alineación óptica de íconos.
3. **Efectos y animaciones** (skill `efectos-web`, carril vanilla con `dt-efectos`): feedback
   de pulsado, reveals escalonados, transiciones de hover, microinteracciones en swatches,
   calculadora y comparador. Presupuesto de encanto en hero e historia; nada de decorar datos.
   Respetar los tiempos de la compuerta (pulsado 100-160ms, hover 125-200ms, reveal 400-650ms).
4. **Accesibilidad** (skill `fixing-accessibility`): foco visible, aria en los controles
   custom (comparador, swatches, toggle de idioma, saco 3D), navegación por teclado completa,
   contraste verificado, reduced-motion sin contenido perdido.
5. **Veredicto** (skill `review-animations`): revisar las animaciones aplicadas y podar lo que
   no pase. Esta bloquea, no propone.
6. **Editable** (skill `web-editable`, modo retrofit): el objetivo final del proyecto es que
   el cliente pueda cambiar textos, precios de referencia, teléfono y fotos sin tocar código.
   Contenido a `contenido/*.json`, marcas `<!--cms:x-->`, un dato un solo lugar.

## Reglas duras
- Verificación con agent-browser (NO el panel: no corre IntersectionObserver), en 390x844
  emulando iPhone y en desktop, con movimiento normal Y reducido. Todo contenido visible
  siempre: ya nos mordió el reveal que deja secciones invisibles.
- Los errores conocidos del vault no se repiten: max-width vs width declarado, hueco sin
  texto en scrollytelling, rescate del reveal que anula el escalonado, tap-target que pisa
  el subrayado.
- El copy del brochure (storytelling) no se toca. Bilingüe ES/EN completo: todo cambio de
  texto va a los DOS diccionarios.
- Commits convencionales en español, push = deploy, verificar en producción.
