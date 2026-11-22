# Portafolio Hugo Velarde v2 — Diseño

Fecha: 2026-11-21 · Estado: borrador para aprobación · Copy: `2026-11-21-portafolio-copy.md`

## 1. Intención

Reemplazar el portafolio actual (https://portfolio-hugovelarde.netlify.app/) por un sitio que:

- **Atraiga a dos públicos:** reclutadores de empresas tech/startups (contratación de tiempo completo) y clientes directos (freelance).
- **Demuestre criterio en lugar de solo afirmarlo:** el sitio en sí es una prueba de oficio (estados de interfaz, rendimiento, accesibilidad).
- **Sea memorable** frente a los portafolios genéricos, sin sacrificar velocidad ni legibilidad.

### Objetivos
- El reclutador entiende el rol, el stack y la disponibilidad en menos de 6 s, sin hacer scroll.
- Los dos CTA (equipos / proyectos) están visibles en el hero y en el cierre.
- Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO, en móvil.
- Bilingüe ES/EN con SEO correcto para cada idioma.
- Agregar o editar un proyecto o un trabajo solo requiere editar un archivo Markdown.

### No-objetivos
- No hay blog en esta versión (la estructura debe permitir agregarlo después sin rehacer nada).
- No hay CMS, no hay backend propio y no hay WebGL/3D.

### Anti-objetivos (fracaso aunque "funcione")
- Que las animaciones retrasen el acceso al contenido o vuelvan pesado el sitio en móvil.
- Que el sitio sea inaccesible: sin teclado, sin `prefers-reduced-motion` o con mal contraste.
- Cifras o logros inventados. Toda métrica no confirmada por Hugo queda marcada como `TODO`.
- Copy con clichés ("apasionado por la tecnología", "soluciones innovadoras").

## 2. Restricciones

- Astro (última estable) + TypeScript estricto + Tailwind CSS v4. **Sin React ni otro framework de UI**: las interacciones son scripts TS pequeños dentro de componentes Astro.
- Despliegue en Netlify, sitio 100 % estático.
- Fuentes de Google: Instrument Serif, Inter Tight y JetBrains Mono, autoalojadas (por ejemplo con `@fontsource`), con `font-display: swap` y solo los pesos usados.
- Node 24 disponible en la máquina de Hugo.

## 3. Enfoques considerados

| Enfoque | Ventaja | Desventaja |
|---|---|---|
| A · CSS con variables + TS vanilla | El más ligero; el prototipo se pasa casi tal cual | CSS a mano; Hugo trabaja con Tailwind a diario |
| **B · Tailwind v4 + TS vanilla (elegido)** | Igual de rápido que A; Hugo lo mantiene con su flujo habitual | Dos formas de estilo, cada una con un uso definido |
| C · React islands + Tailwind | Herramienta principal de Hugo | ~45 KB extra de JS para interacciones triviales; mal mensaje de criterio |

**Elegido: B.** Hugo lo eligió por mantenimiento sin costo de rendimiento.

**Regla de estilos:** Tailwind para layout, espaciado y tipografía. Los tokens de diseño viven en `@theme`. Las animaciones de autor (preloader, diff, changelog, estados) van en `<style>` con alcance del componente o en un CSS global de animaciones.

## 4. Dirección visual (decidida: híbrido A + B)

Prototipo de referencia: `.superpowers/brainstorm/1981-1795319071/content/hibrido-ab.html`.

- **Concepto «Todos los estados»** (identidad y hero): preloader 000→100, que es el estado `loading`; conmutador `idle / loading / error / success` en la navegación, que afecta al hero; ficha de especificaciones con "disponible" pulsando.
- **Concepto «Diff / Changelog»** (historia): el titular de Enfoque se reescribe como un diff (tacha "sitios web" y escribe "productos web"); la Experiencia es un changelog v1.0 → v3.0 con una línea de tiempo que se dibuja y un diff `+/−` al pasar el cursor o enfocar con Tab.
- **Tema:** oscuro por defecto con la paleta de A. El modo claro usa la paleta de papel de B. Se cambia con un botón y una View Transition. Se respeta `prefers-color-scheme` en la primera visita y se recuerda la elección en `localStorage` (envuelto en try/catch).

### Tokens

| Token | Oscuro | Claro |
|---|---|---|
| ink (fondo) | #0F100D | #F4F2EC |
| surface | #181914 | #FFFFFF |
| line | #2a2b25 | #151612 |
| bone (texto) | #ECE9E1 | #151612 |
| muted | #8C8A82 | #6A685F |
| sub | #B9B6AD | #4b4a44 |
| signal (acento) | #FF5A1F | #E0480F |
| ok | #7FD18B | #2E8B45 |
| ins-bg / ins-fg | #14301a / #8fe39b | #d8f0dc / #14632a |

El acento `signal` solo marca acción o estado. Hay que verificar contraste AA para texto sobre `signal` y para `muted` sobre `ink`, y ajustar el tono si no pasa.

### Tipografía
- Display: Instrument Serif (h1, h2), con palabras clave en itálica y color `signal`.
- UI/cuerpo: Inter Tight 400/500/600/800.
- Anotaciones: JetBrains Mono 400/500 (etiquetas `// 01 — …`, metadatos, stack).

### Movimiento (reglas)
- Todo efecto tiene una razón narrativa. Las animaciones se basan en `transform`, `opacity` y `clip-path`, nunca en propiedades que provoquen layout.
- Con `prefers-reduced-motion: reduce`: no hay preloader animado, los textos aparecen directo y no hay typing ni shimmer.
- **El preloader no bloquea el contenido:** dura como máximo 1.2 s, aparece solo en la primera visita de la sesión (`sessionStorage`) y el HTML del hero ya está en el DOM para SEO y lectores de pantalla. Sin JS, no aparece.
- Las revelaciones al hacer scroll usan IntersectionObserver una sola vez por elemento.
- El conmutador de estados: `loading` muestra un skeleton por 1.8 s y luego pasa a `success`; `error` hace temblar el titular y muestra un aviso; `success` dibuja una palomita. Ambos vuelven a `idle` a los 3.2 s. Es accesible con teclado y anuncia el estado con `aria-live="polite"`.

## 5. Arquitectura del sitio

Una página principal por idioma más una página por caso de estudio.

```
/                  → Home ES
/en/               → Home EN
/trabajo/[slug]    → Caso de estudio ES
/en/work/[slug]    → Caso de estudio EN
/404               → 404 de autor (bilingüe)
```

### Secciones de la home (en orden)
1. **Nav (sticky):** logo HV, anclas (Trabajo, Experiencia, Enfoque, Servicios, Contacto), conmutador de estados (oculto en móvil), botón de tema, cambio de idioma ES/EN que lleva a la página equivalente.
2. **Hero** `// 01 — idle`: etiqueta, h1, subtítulo, 2 CTA (Sumarme a tu equipo → #contacto con tipo "Contratar"; Cotizar un proyecto → #contacto con tipo "Proyecto") y la ficha de especificaciones.
3. **Prueba rápida:** 3 o 4 cifras con contador animado (3+ años, 5 productos, Front + Back, respuesta en menos de 24 h).
4. **Trabajo** `// 02`: 3 casos de estudio destacados (tarjetas grandes con Problema / Solución / Resultado, enlace al caso completo) y una fila "Laboratorio" con proyectos propios (Weathery, CronoRest) con enlaces a la demo y al código.
5. **Enfoque** `// 03`: titular diff, bio y 3 principios.
6. **Changelog** `// 04`: experiencia v1.0 → v3.0 más la educación (UNIPOLI, 2018–2022).
7. **Stack** `// 05`: tabla por capas (Interfaz · Estado y datos · Backend · Producto · Explorando). Sin barras de porcentaje.
8. **Servicios** `// 06`: dos columnas, Equipos y Proyectos (MVP web, Rescate de interfaz, Dashboards/paneles admin).
9. **Contacto** `// 07`: titular de cierre, formulario con estados diseñados, botón para copiar el email, enlaces a LinkedIn, GitHub y el CV en PDF.
10. **Footer:** "Hecho a mano con Astro · Durango, MX · Actualizado [fecha de build]".

### Casos de estudio (contenido inicial)
Sin capturas de clientes por defecto (no está confirmado si hay NDA). Cada caso lleva un visual abstracto o un diagrama de arquitectura en SVG.

1. **Judigo Legal** (Advante Digital): chat cliente-abogado. Next.js, NextUI, Zustand, AdonisJS, MariaDB, sincronización con Firebase.
2. **Motionode** (Advante Digital): funciones en tiempo real con Apollo/GraphQL, Sequelize, MariaDB, React, MUI, Redux Toolkit.
3. **Clase Azul** (freelance): diseño UI/UX y páginas en Next.js, Ant Design y Redux Toolkit, integradas a una API en Nest.js.

Las métricas de resultado van como `TODO` hasta que Hugo las confirme. La plantilla de cada caso es: tipo · año · rol → titular de resultado → Problema → Solución (arquitectura y stack) → Resultado → enlaces.

## 6. Modelo de contenido (Astro Content Collections)

- `src/content/projects/{es,en}/<slug>.md`, con frontmatter tipado por Zod: `title, slug, client, kind ('case'|'lab'), year, role, stack[], summary, problem, solution, outcome, metrics[] (label, value, confirmed:boolean), liveUrl?, repoUrl?, order, featured`.
- `src/content/experience/{es,en}/<id>.md`: `version, company, role, start, end, freelance:boolean, stack[], plus[], minus[]`.
- Los textos de la interfaz (nav, botones, etiquetas, copy de las secciones) van en `src/i18n/{es,en}.ts` con un helper tipado `t(locale, key)`. Si falta una clave en algún idioma, el build falla.
- Los datos personales (email, LinkedIn, GitHub, ubicación, ruta del CV y URL opcional de Calendly) van en `src/config/site.ts`.

## 7. Componentes reutilizables

`BaseLayout` (head, SEO, tema y fuentes), `Seo`, `Nav`, `StateSwitcher`, `ThemeToggle`, `LangSwitch`, `Preloader`, `Reveal` (envoltorio para animar al entrar en pantalla), `LineReveal` (titulares por líneas), `DiffHeadline`, `SpecCard`, `StatCounter`, `SectionHeader` (etiqueta `// NN — nombre` y título), `CaseCard`, `LabCard`, `ChangelogEntry`, `StackTable`, `ServiceColumn`, `ContactForm`, `Button` (variantes primary/secondary), `Footer`.

Cada script de interacción vive en el componente que lo usa y no depende de otros. Si hay JS compartido, va en `src/scripts/`.

## 8. SEO

- `site` configurado en `astro.config` (URL por defecto: la actual en Netlify; se puede cambiar si Hugo compra un dominio).
- En cada página: `<title>` único, meta description, canonical, `hreflang` es/en/x-default, Open Graph y Twitter Card con imagen 1200×630 por idioma (PNG estático en `public/og/`).
- `@astrojs/sitemap` con i18n y `robots.txt`.
- JSON-LD `Person` en la home (nombre, jobTitle, url, sameAs: LinkedIn y GitHub, address: Durango, MX, knowsAbout) y `CreativeWork` en cada caso de estudio.
- HTML semántico: un solo h1 por página, landmarks y `lang` correcto por ruta.
- Imágenes con `astro:assets` (AVIF/WebP, dimensiones explícitas y lazy loading fuera del primer pantallazo).

## 9. Formulario de contacto

- Netlify Forms (no necesita backend): campos tipo (Contratar / Proyecto / Saludar), nombre, email y mensaje, más un honeypot anti-spam.
- Validación en el cliente con los mensajes del copy, envío con `fetch` y estados diseñados (enviando, error, éxito). Sin JS, se envía como POST normal a una página `/gracias`.
- Los CTA del hero apuntan a `#contacto` y, con `data-contact-type="hire|project"`, preseleccionan el tipo en el formulario por JS. No se pone información en la URL.

## 10. Accesibilidad

- Contraste AA, foco visible y personalizado, enlace "saltar al contenido".
- Todo lo que funciona con hover también funciona con foco (diff del changelog, tarjetas).
- El conmutador de estados usa `role="radiogroup"` o botones con `aria-pressed`.
- Se respeta `prefers-reduced-motion`.

## 11. Copy

Todos los textos (ES y EN), incluidos los casos de estudio, la validación del formulario, la 404 y /gracias, están en **`docs/superpowers/specs/2026-11-21-portafolio-copy.md`**. Es la fuente de verdad. Los problemas y soluciones de los casos se escribieron a partir del CV. Las métricas son `TODO` con una frase de respaldo verdadera mientras Hugo no las confirme.

**Antes de publicar** hay que buscar `TODO` en `src/content` y `src/i18n`. Una prueba del build debe fallar si queda alguna métrica con `confirmed: false` que no tenga texto de respaldo.

## 11b. Datos personales y despliegue (decisiones de Claude, Hugo puede cambiarlas)

- `site.ts`: email hugovela15@gmail.com, LinkedIn https://www.linkedin.com/in/hugo-velarde-5469b6289, GitHub https://github.com/Velardee y ubicación Durango, Dgo., MX. Estos datos ya son públicos en el portafolio actual. **El teléfono del CV no se publica.** Calendly es opcional: si no hay URL, el botón no se renderiza.
- **CV:** se usa un solo PDF, `public/pdf/CV.pdf` (la misma ruta que el sitio actual, así el enlace viejo sigue funcionando), para los dos idiomas. Si Hugo crea un CV en inglés, se agrega `public/pdf/CV-en.pdf` y se configura en `site.ts`.
- **Nombres de clientes:** se nombran Judigo Legal, Motionode, Clase Azul, COCOLAB, TuneUp y Advante, porque ya aparecen en el CV y en LinkedIn de Hugo. No se publican capturas de pantalla de clientes.
- **Despliegue:** el sitio se construye para reemplazar el actual en el mismo sitio de Netlify. Del sitio viejo solo existen `/` y `/pdf/CV.pdf`, y las dos se conservan, así que no hace falta `_redirects`. El despliegue y la activación de Netlify Forms los hace Hugo, porque requieren su cuenta.

## 12. Lo que queda a criterio del implementador

- La estructura exacta de carpetas dentro de `src/components` (por sección o plana).
- Cómo se generan las imágenes OG (a mano o con un script), siempre que existan las dos.
- Los visuales abstractos o diagramas SVG de cada caso.
- Microajustes de timing y easing que respeten las reglas de movimiento.
