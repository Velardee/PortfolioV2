# Portafolio Astro v2: plan de implementación

> **Para agentes:** SUB-SKILL REQUERIDA: usar superpowers:subagent-driven-development (recomendado) o superpowers:executing-plans para implementar este plan tarea por tarea. Los pasos usan checkboxes (`- [ ]`).

**Goal:** Construir el portafolio bilingüe de Hugo Velarde en Astro con el diseño híbrido «Todos los estados» + «Diff/Changelog», listo para Netlify.

**Architecture:** Sitio estático de Astro con i18n nativo (`es` sin prefijo, `en` en `/en/`). El contenido (casos y experiencia) está en Content Collections validadas con Zod, y los textos de la interfaz en diccionarios TS tipados. Las vistas son compartidas (`HomePage`, `CasePage`) y reciben `locale`. Las interacciones son scripts TS vanilla dentro de cada componente, sin framework de UI.

**Tech Stack:** Astro (última estable) · TypeScript estricto · Tailwind CSS v4 (`@tailwindcss/vite`) · `@astrojs/sitemap` · `@fontsource/instrument-serif`, `@fontsource-variable/inter-tight`, `@fontsource/jetbrains-mono` · Vitest · Netlify Forms.

**Spec:** `docs/superpowers/specs/2026-11-21-portafolio-astro-design.md` + copy en `docs/superpowers/specs/2026-11-21-portafolio-copy.md` (fuente de verdad de todo texto). Prototipo visual: `.superpowers/brainstorm/1981-1795319071/content/hibrido-ab.html` (CSS y timings de referencia).

## Global Constraints

- No usar React ni otro framework de UI. Interacciones = `<script>` TS dentro del componente; lo compartido va en `src/scripts/` o `src/lib/`.
- Tailwind para layout, espaciado y tipografía; tokens en `@theme`. Las animaciones de autor van en `<style>` del componente o en `src/styles/motion.css`.
- Tokens exactos (oscuro / claro): ink `#0F100D`/`#F4F2EC`, surface `#181914`/`#FFFFFF`, line `#2a2b25`/`#151612`, bone `#ECE9E1`/`#151612`, muted `#8C8A82`/`#6A685F`, sub `#B9B6AD`/`#4b4a44`, signal `#FF5A1F`/`#E0480F`, ok `#7FD18B`/`#2E8B45`, ins-bg `#14301a`/`#d8f0dc`, ins-fg `#8fe39b`/`#14632a`.
- Tema: oscuro por defecto. En la primera visita se respeta `prefers-color-scheme`; la elección se guarda en `localStorage['theme']`. Se aplica antes del primer pintado con un script inline en `<head>`.
- Animaciones solo con `transform`, `opacity` y `clip-path`. Con `prefers-reduced-motion: reduce` no hay preloader, typing ni shimmer, y el texto aparece directo.
- Preloader: dura como máximo 1.2 s, solo en la primera visita de la sesión (`sessionStorage['preloaded']`) y nunca se ve sin JS.
- Timings del conmutador: `loading` dura 1800 ms y pasa a `success`; `success` y `error` vuelven a `idle` a los 3200 ms.
- Rutas: `/`, `/en/`, `/trabajo/[slug]`, `/en/work/[slug]`, `/gracias`, `/en/thanks`, `/404`. Slugs: `judigo-legal`, `motionode`, `clase-azul` (iguales en los dos idiomas).
- Todo texto visible sale del archivo de copy, sin inventar cifras. Las métricas no confirmadas no se publican; se usa la frase de respaldo del copy.
- No publicar el teléfono. Datos: email `hugovela15@gmail.com`, LinkedIn `https://www.linkedin.com/in/hugo-velarde-5469b6289`, GitHub `https://github.com/Velardee`, CV `/pdf/CV.pdf`.
- `site`: `https://portfolio-hugovelarde.netlify.app`.
- Meta: Lighthouse móvil ≥ 95 en las 4 categorías y contraste AA.

## Review Focus

1. **Visitante sin JS:** todo el contenido es visible, no hay preloader y el formulario se envía como POST a `/gracias`. → Pruebas en el HTML generado (`dist`), Tareas 4, 5 y 6.
2. **`localStorage` o `sessionStorage` lanzan error** (modo privado o storage bloqueado): el tema y el preloader no rompen la página. → `safeStorage`, Tarea 2.
3. **Cambiar de idioma dentro de un caso** lleva al caso equivalente, no a una 404. → `alternatePath`, Tarea 2.
4. **Usuario con tema claro en el sistema:** no hay destello oscuro al cargar. → Prueba en `dist` del script inline del `<head>`, Tarea 3.
5. **Móvil de 375 px:** no hay scroll horizontal con titulares gigantes ni con la retícula. → Verificación en navegador, Tarea 9.

---

## Estructura de archivos

```
astro.config.mjs · package.json · tsconfig.json · vitest.config.ts · .gitignore
src/styles/global.css          tailwind + @theme + variables de tema
src/styles/motion.css          .line/.fade/.in, keyframes compartidos, reduced-motion
src/config/site.ts             datos personales y URLs
src/i18n/es.ts · en.ts         diccionarios de UI
src/i18n/index.ts              Locale, t(), localizedPath(), alternatePath()
src/lib/storage.ts             safeStorage
src/lib/contact.ts             validateContact()
src/lib/states.ts              createStateMachine()
src/lib/content.ts             getProjects(), getExperience()
src/content.config.ts          colecciones projects / experience
src/content/projects/{es,en}/{judigo-legal,motionode,clase-azul,weathery,cronorest}.md
src/content/experience/{es,en}/{v3-clase-azul,v2-cocolab,v1-advante,v0-unipoli}.md
src/layouts/BaseLayout.astro
src/components/seo/Seo.astro · JsonLd.astro
src/components/ui/Button.astro · SectionHeader.astro · LineReveal.astro · Reveal.astro
src/components/nav/Nav.astro · ThemeToggle.astro · LangSwitch.astro · StateSwitcher.astro
src/components/Preloader.astro · Footer.astro
src/components/home/Hero.astro · SpecCard.astro · Stats.astro · Work.astro · CaseCard.astro · LabCard.astro · Approach.astro · DiffHeadline.astro · Changelog.astro · ChangelogEntry.astro · Stack.astro · Services.astro · Contact.astro · ContactForm.astro
src/scripts/reveal.ts          IntersectionObserver compartido
src/views/HomePage.astro · CasePage.astro · ThanksPage.astro
src/pages/index.astro · en/index.astro · trabajo/[slug].astro · en/work/[slug].astro · gracias.astro · en/thanks.astro · 404.astro
public/pdf/CV.pdf · public/og/og-es.png · public/og/og-en.png · public/favicon.svg · public/robots.txt
tests/unit/*.test.ts           lógica pura (vitest, entorno node)
tests/dist/*.test.ts           lee dist/*.html tras el build
```

Scripts de `package.json`: `dev`, `build` (`astro check && astro build`), `test` (`vitest run tests/unit`), `test:dist` (`vitest run tests/dist`), `verify` (`npm run build && npm test && npm run test:dist`), `todo` (`grep -rn "TODO" src/content src/i18n || echo "sin TODO"`).

---

### Task 1: Andamiaje del proyecto

**Files:**
- Create: todo el nivel raíz de la estructura, más `src/styles/global.css`, `src/styles/motion.css`, `src/pages/index.astro` (temporal), `tests/unit/smoke.test.ts` y `.gitignore`.

**Interfaces:**
- Produces: clases de Tailwind generadas desde `@theme` (`bg-ink`, `text-bone`, `text-muted`, `text-sub`, `bg-surface`, `border-line`, `text-signal`, `bg-signal`, `text-ok`, `font-display`, `font-sans`, `font-mono`); clases de movimiento `.line`, `.fade`, `.in`; atributo `html[data-theme="dark"|"light"]`.

- [ ] **Step 1:** `git init` en `C:\Users\hugov\Documents\PortfolioV2`. `.gitignore` con `node_modules/`, `dist/`, `.astro/`, `.superpowers/`, `.env*`.
- [ ] **Step 2:** `npm create astro@latest . -- --template minimal --typescript strict --install --no-git --skip-houston`. Luego `npx astro add tailwind sitemap --yes`, `npm i @fontsource/instrument-serif @fontsource-variable/inter-tight @fontsource/jetbrains-mono` y `npm i -D vitest`.
- [ ] **Step 3:** En `astro.config.mjs`: `site: 'https://portfolio-hugovelarde.netlify.app'`, `i18n: { defaultLocale: 'es', locales: ['es','en'], routing: { prefixDefaultLocale: false } }`, y sitemap con `i18n: { defaultLocale: 'es', locales: { es: 'es-MX', en: 'en-US' } }`.
- [ ] **Step 4:** En `global.css`: `@import "tailwindcss";`, las variables de los tokens en `:root, [data-theme=dark]` y `[data-theme=light]`, `@theme` que las mapea (`--color-ink: var(--ink)`, etc.), las fuentes (`--font-display: 'Instrument Serif'`, `--font-sans: 'Inter Tight Variable'`, `--font-mono: 'JetBrains Mono'`) y `body { background: var(--ink); color: var(--bone) }`. En `motion.css`: `.line`, `.fade`, `.in`, `pulse`, `shimmer`, `shake` y `blink`, copiados del prototipo, más el bloque de `prefers-reduced-motion`.
- [ ] **Step 5:** Escribir `tests/unit/smoke.test.ts` con `expect(1).toBe(1)` y un `vitest.config.ts` con `environment: 'node'`.
- [ ] **Step 6:** Correr `npm run build && npm test`. Esperado: el build termina sin errores de `astro check` y vitest pasa con 1 prueba.
- [ ] **Step 7:** Commit `chore: scaffold Astro + Tailwind v4 + i18n config`.

### Task 2: i18n, rutas y utilidades puras

**Files:**
- Create: `src/i18n/es.ts`, `src/i18n/en.ts`, `src/i18n/index.ts`, `src/lib/storage.ts`, `src/lib/states.ts`, `src/config/site.ts`.
- Test: `tests/unit/i18n.test.ts`, `tests/unit/storage.test.ts`, `tests/unit/states.test.ts`.

**Interfaces:**
- Produces:
  - `type Locale = 'es' | 'en'`; `const locales: Locale[]`.
  - `es` es un objeto plano `as const` con claves con puntos (`'nav.work'`, `'hero.h1.a'`…); `type UiKey = keyof typeof es`; `en: Record<UiKey, string>`, así que una clave faltante da error de tipos.
  - `t(locale: Locale, key: UiKey): string`.
  - `localizedPath(locale: Locale, route: 'home'|'case'|'thanks', slug?: string): string` → `/`, `/en/`, `/trabajo/{slug}`, `/en/work/{slug}`, `/gracias`, `/en/thanks`.
  - `alternatePath(pathname: string): Record<Locale, string>`.
  - `safeStorage.get(area: 'local'|'session', key: string): string | null` y `safeStorage.set(area, key, value): void`. Nunca lanzan error.
  - `type UiState = 'idle'|'loading'|'error'|'success'`; `createStateMachine(onChange: (s: UiState) => void): { set(s: UiState): void; dispose(): void }`.
  - `site` en `site.ts`: `{ name, email, linkedin, github, location, cvPath: { es: '/pdf/CV.pdf', en: '/pdf/CV.pdf' }, calendly: null as string | null }`.

- [ ] **Step 1: Escribir las pruebas que fallan.**
```ts
// i18n.test.ts
expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort());
expect(localizedPath('en','case','motionode')).toBe('/en/work/motionode');
expect(localizedPath('es','thanks')).toBe('/gracias');
expect(alternatePath('/trabajo/judigo-legal')).toEqual({ es:'/trabajo/judigo-legal', en:'/en/work/judigo-legal' });
expect(alternatePath('/en/thanks')).toEqual({ es:'/gracias', en:'/en/thanks' });
expect(alternatePath('/en/')).toEqual({ es:'/', en:'/en/' });
// storage.test.ts — globalThis.localStorage stub cuyo getItem/setItem lanzan error
expect(safeStorage.get('local','theme')).toBeNull();
expect(() => safeStorage.set('local','theme','light')).not.toThrow();
// states.test.ts — vi.useFakeTimers()
m.set('loading'); vi.advanceTimersByTime(1800); expect(last).toBe('success');
vi.advanceTimersByTime(3200); expect(last).toBe('idle');
m.set('error'); m.set('loading'); vi.advanceTimersByTime(1799); expect(last).toBe('loading'); // set() cancela el timer anterior
```
- [ ] **Step 2:** Correr `npm test`. Esperado: FAIL porque los módulos no existen.
- [ ] **Step 3:** Implementar los módulos con las firmas de arriba. Llenar `es.ts` y `en.ts` con **todos** los textos de UI del archivo de copy (nav, preloader, hero, conmutador, stats, encabezados de sección, servicios, stack, contacto, validación, gracias, 404, footer y metadatos SEO). Los casos y la experiencia van en Markdown (Tarea 3), no aquí.
- [ ] **Step 4:** Correr `npm test`. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: i18n dictionaries, route helpers, safe storage, state machine`.

### Task 3: Contenido, BaseLayout y SEO

**Files:**
- Create: `src/content.config.ts`, los 10 Markdown de projects, los 8 de experience, `src/lib/content.ts`, `src/layouts/BaseLayout.astro`, `src/components/seo/Seo.astro`, `src/components/seo/JsonLd.astro`, `public/robots.txt`, `public/favicon.svg`.
- Modify: `src/pages/index.astro` (usa BaseLayout) y crear `src/pages/en/index.astro` (temporal).
- Test: `tests/unit/content.test.ts`, `tests/dist/seo.test.ts`.

**Interfaces:**
- Consumes: `Locale`, `t`, `alternatePath`, `site`.
- Produces:
  - Esquema de `projects`: `{ title, client, kind: 'case'|'lab', year: string, role, stack: string[], summary, headline, problem?, solution?, outcome, metrics: {label,value}[] (default []), liveUrl?: url, repoUrl?: url, order: number, featured: boolean }`. Si `kind === 'case'`, `problem` y `solution` son obligatorios (con `superRefine`). `outcome` siempre es obligatorio: ahí va la frase de respaldo del copy.
  - Esquema de `experience`: `{ version, company, role, start, end, freelance: boolean, stack: string[], plus: string[], minus: string[] (default []), order }`.
  - `getProjects(locale, kind?)` devuelve los proyectos ordenados por `order`; `getExperience(locale)` devuelve la experiencia ordenada de forma descendente.
  - `<BaseLayout locale title description image? jsonLd?>`: html `lang`, script de tema inline, fuentes, `<Seo>`, slot y enlace "saltar al contenido" a `#main`.
  - `<Seo>`: title, description, canonical (`new URL(pathname, site)`), `hreflang` es-MX/en-US/x-default (este último apunta a la versión es), og:title/description/image/url/locale, y `twitter:card=summary_large_image`.
  - `<JsonLd data={object}>`.

- [ ] **Step 1: Escribir las pruebas que fallan.**
```ts
// content.test.ts — parsear el esquema exportado con datos de ejemplo
expect(() => projectSchema.parse({ ...base, kind:'case', problem: undefined })).toThrow();
expect(projectSchema.parse({ ...base, kind:'lab' }).metrics).toEqual([]);
// seo.test.ts — lee dist/index.html y dist/en/index.html
expect(html).toContain('<html lang="es"');
expect(html).toMatch(/<link rel="alternate" hreflang="en-US" href="https:\/\/portfolio-hugovelarde\.netlify\.app\/en\/"/);
expect(html).toMatch(/hreflang="x-default" href="https:\/\/portfolio-hugovelarde\.netlify\.app\/"/);
expect(html).toMatch(/<link rel="canonical" href="https:\/\/portfolio-hugovelarde\.netlify\.app\/"/);
expect(htmlEn).toContain('og:locale" content="en_US"');
expect(html.indexOf('data-theme')).toBeLessThan(html.indexOf('<body')); // script de tema dentro del <head> (Review Focus 4)
```
- [ ] **Step 2:** Correr `npm test`. Esperado: FAIL.
- [ ] **Step 3:** Implementar. El script inline de tema (`is:inline`) lee `localStorage.theme` dentro de try/catch y, si no hay valor, usa `matchMedia('(prefers-color-scheme: light)')`; luego asigna `document.documentElement.dataset.theme`. Los Markdown se escriben con el texto exacto del copy (casos: `kind: case`, `order` 1–3, `featured: true`; Weathery y CronoRest: `kind: lab`). El `Person` JSON-LD se arma en la home (Tarea 6), no aquí.
- [ ] **Step 4:** Correr `npm run build && npm test && npm run test:dist`. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: content collections, base layout and SEO head`.

### Task 4: Navegación, tema, idioma, conmutador de estados y preloader

**Files:**
- Create: `src/components/nav/{Nav,ThemeToggle,LangSwitch,StateSwitcher}.astro`, `src/components/Preloader.astro`, `src/components/ui/{Button,SectionHeader,LineReveal,Reveal}.astro`, `src/scripts/reveal.ts`, `src/components/Footer.astro`.
- Test: `tests/dist/nav.test.ts`.

**Interfaces:**
- Consumes: `t`, `alternatePath`, `safeStorage`, `createStateMachine`.
- Produces:
  - `<Nav locale pathname>`: anclas `#trabajo #experiencia #enfoque #servicios #contacto` (los mismos ids en EN).
  - `StateSwitcher` hace `document.body.dataset.uiState = s` (`idle|loading|error|success`) y escribe el estado en una región `aria-live="polite"`. Los botones usan `aria-pressed`. La "pill" animada es la del prototipo. Se oculta por debajo de `md`.
  - `ThemeToggle` usa `document.startViewTransition` si existe y no hay reduced-motion, y guarda la elección con `safeStorage.set('local','theme',…)`.
  - `<Preloader>` se renderiza con el atributo `hidden`; el script lo muestra solo si no hay reduced-motion y `safeStorage.get('session','preloaded')` es null. Al terminar, guarda `preloaded=1` y dispara `window.dispatchEvent(new Event('preloader:done'))`.
  - `reveal.ts`: `initReveal(): void` observa `.reveal` y agrega `.in` una sola vez (umbral 0.3). Si hay preloader activo, espera a `preloader:done`.
  - `<Button variant="primary"|"secondary" href data-contact-type?>`, `<SectionHeader index="02" label title?>` (renderiza `// 02 — label`), `<LineReveal lines={string[]} tag="h1"|"h2">`, `<Reveal as="section" id?>`.
- [ ] **Step 1: Escribir las pruebas que fallan** (leen `dist`, se ejecutan después de que la Tarea 6 monte el Nav en la home; hasta entonces se monta en la página temporal):
```ts
expect(html).toMatch(/<div[^>]*data-preloader[^>]*hidden/);             // sin JS no hay preloader (Review Focus 1)
expect(html).toMatch(/aria-pressed="true"[^>]*>idle</);
expect(html).toContain('href="/en/"');                                   // LangSwitch en la home ES
expect(html).toMatch(/<a[^>]*href="#main"/);                             // saltar al contenido
```
- [ ] **Step 2:** Correr `npm run build && npm run test:dist`. Esperado: FAIL.
- [ ] **Step 3:** Implementar, tomando el CSS y los timings del prototipo. Todo control funciona con teclado y tiene foco visible (`outline` con `signal`).
- [ ] **Step 4:** Correr `npm run verify`. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: nav, theme toggle, lang switch, state switcher, preloader`.

### Task 5: Secciones de la home (hero → servicios)

**Files:**
- Create: `src/components/home/{Hero,SpecCard,Stats,Work,CaseCard,LabCard,Approach,DiffHeadline,Changelog,ChangelogEntry,Stack,Services}.astro`, `src/views/HomePage.astro`.
- Modify: `src/pages/index.astro` y `src/pages/en/index.astro` (dejan de ser temporales).
- Test: `tests/dist/home.test.ts`.

**Interfaces:**
- Consumes: `getProjects`, `getExperience`, `t`, `localizedPath`, los componentes de UI de la Tarea 4.
- Produces: cada sección es `<X locale />` (Work y Changelog obtienen sus datos dentro del componente). Los ids de sección son `trabajo`, `enfoque`, `experiencia`, `servicios`.
  - `Hero`: un solo `<h1>` con `LineReveal`, el skeleton (`[data-skeleton]`, visible solo con `body[data-ui-state=loading]`), los toasts de error y éxito (visibles según `data-ui-state`) y los CTA con `data-contact-type="hire"` y `"project"`.
  - `DiffHeadline`: el texto tachado y el texto insertado ya vienen completos en el HTML. El typing solo lo anima: vacía y reescribe el texto con JS, y no corre con reduced-motion.
  - `ChangelogEntry` es un `<article tabindex="0">`; el diff se muestra con `:hover` y `:focus-within`.
  - `Stats` usa contadores que animan desde 0 con easeOutCubic en 1400 ms. El valor final ya está en el HTML.
- [ ] **Step 1: Escribir las pruebas que fallan** (sobre `dist/index.html` y `dist/en/index.html`):
```ts
expect((html.match(/<h1[\s>]/g) ?? []).length).toBe(1);
for (const id of ['trabajo','enfoque','experiencia','servicios']) expect(html).toContain(`id="${id}"`);
expect(html).toContain('Interfaces que siguen');                         // texto final en el HTML (Review Focus 1)
expect(html).toContain('productos web');                                 // diff insertado ya presente
expect(htmlEn).toContain('Web interfaces that hold up');
expect(html).toContain('href="/trabajo/judigo-legal"');
expect(htmlEn).toContain('href="/en/work/judigo-legal"');
expect(html).toContain('UNIPOLI');
expect(html).not.toMatch(/\bTODO\b/);
```
- [ ] **Step 2:** Correr `npm run build && npm run test:dist`. Esperado: FAIL.
- [ ] **Step 3:** Implementar con el copy exacto. Montar las secciones en `src/views/HomePage.astro` (`locale` como prop) y usarla en `src/pages/index.astro` y `src/pages/en/index.astro`. Agregar el JSON-LD `Person` (name, jobTitle "Software Engineer", url, sameAs con LinkedIn y GitHub, address con Durango, MX, y knowsAbout con React, Next.js, TypeScript y Node.js).
- [ ] **Step 4:** Correr `npm run verify`. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: home sections hero to services`.

### Task 6: Contacto (Netlify Forms) y página de gracias

**Files:**
- Create: `src/lib/contact.ts`, `src/components/home/{Contact,ContactForm}.astro`, `src/views/ThanksPage.astro`, `src/pages/gracias.astro`, `src/pages/en/thanks.astro`.
- Modify: `src/views/HomePage.astro` (agregar Contact y Footer).
- Test: `tests/unit/contact.test.ts`, `tests/dist/contact.test.ts`.

**Interfaces:**
- Produces: `type ContactInput = { type: 'hire'|'project'|'hello'; name: string; email: string; message: string }`; `validateContact(input, locale): { ok: true } | { ok: false; errors: Partial<Record<'name'|'email'|'message', string>> }`. Los mensajes salen de `t()`.
- [ ] **Step 1: Escribir las pruebas que fallan.**
```ts
expect(validateContact({type:'hire',name:'',email:'a@b.co',message:'hola'},'es'))
  .toEqual({ ok:false, errors:{ name:'¿Cómo te llamo?' } });
expect(validateContact({type:'hire',name:'Ana',email:'ana@',message:'x'},'en').ok).toBe(false);
expect(validateContact({type:'project',name:'Ana',email:' ana@studio.mx ',message:'Necesito un MVP'},'es')).toEqual({ ok:true });
// dist
expect(html).toMatch(/<form[^>]*name="contacto"[^>]*data-netlify="true"[^>]*action="\/gracias"/);
expect(html).toContain('name="form-name" value="contacto"');
expect(html).toMatch(/netlify-honeypot="bot-field"/);
expect(htmlEn).toMatch(/action="\/en\/thanks"/);
expect(html).not.toContain('618');                                       // teléfono nunca publicado
```
- [ ] **Step 2:** Correr `npm test`. Esperado: FAIL.
- [ ] **Step 3:** Implementar. El email se valida con `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` sobre el valor con `trim`. El script intercepta el `submit`: valida, muestra los errores junto a cada campo (`aria-describedby`, `aria-invalid`) y hace `fetch('/', {method:'POST', body: URLSearchParams(form)})`. Cubre los estados enviando, error (con el email en el texto) y éxito. Sin JS, el envío nativo va al `action`. Los CTA con `data-contact-type` preseleccionan el radio correspondiente. "Copiar email" usa `navigator.clipboard` y, si falla, abre `mailto:`. El botón de Calendly solo se renderiza si `site.calendly` existe.
- [ ] **Step 4:** Correr `npm run verify`. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: contact form with Netlify Forms and thanks pages`.

### Task 7: Páginas de caso de estudio y 404

**Files:**
- Create: `src/views/CasePage.astro`, `src/pages/trabajo/[slug].astro`, `src/pages/en/work/[slug].astro`, `src/pages/404.astro`.
- Test: `tests/dist/cases.test.ts`.

**Interfaces:**
- Consumes: `getProjects(locale,'case')`, `localizedPath`, `alternatePath`.
- Produces: `getStaticPaths` solo genera rutas para `kind === 'case'`. `CasePage` muestra meta (tipo · año · rol), headline (h1), Problema, Solución (con lista de stack), Resultado (las métricas si existen y siempre `outcome`), un diagrama SVG abstracto y la navegación al caso anterior y al siguiente. Incluye JSON-LD `CreativeWork` (name, author → Person, dateCreated, keywords = stack). La 404 está en ES con un enlace a EN y usa el copy de la 404.
- [ ] **Step 1: Escribir las pruebas que fallan.**
```ts
for (const s of ['judigo-legal','motionode','clase-azul']) {
  expect(existsSync(`dist/trabajo/${s}/index.html`)).toBe(true);
  expect(existsSync(`dist/en/work/${s}/index.html`)).toBe(true);
}
expect(existsSync('dist/trabajo/weathery/index.html')).toBe(false);
expect(judigoEs).toMatch(/hreflang="en-US" href="[^"]*\/en\/work\/judigo-legal\/?"/); // Review Focus 3
expect(judigoEs).toContain('"@type":"CreativeWork"');
expect(notFound).toContain('Este estado no estaba en el spec.');
```
- [ ] **Step 2:** Correr `npm run build && npm run test:dist`. Esperado: FAIL.
- [ ] **Step 3:** Implementar.
- [ ] **Step 4:** Correr `npm run verify`. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: case study pages and 404`.

### Task 8: Assets finales (OG, CV, favicon)

**Files:**
- Create: `public/og/og-es.png`, `public/og/og-en.png` (1200×630, fondo ink, nombre en Instrument Serif y titular corto del idioma) y `public/favicon.svg` ("HV" en mono sobre ink con un punto signal).
- Requiere de Hugo: `public/pdf/CV.pdf` (el mismo PDF del sitio actual).
- Test: `tests/dist/assets.test.ts`.
- [ ] **Step 1: Escribir las pruebas que fallan.** Deben existir `dist/og/og-es.png`, `dist/og/og-en.png`, `dist/favicon.svg` y `dist/sitemap-index.xml`, y `dist/robots.txt` debe contener `Sitemap: https://portfolio-hugovelarde.netlify.app/sitemap-index.xml`. Si falta `CV.pdf`, la prueba debe fallar con el mensaje "Falta public/pdf/CV.pdf: pídeselo a Hugo".
- [ ] **Step 2:** Generar los PNG: componer un HTML de 1200×630 y tomar una captura con el navegador.
- [ ] **Step 3:** Correr `npm run verify`. Esperado: PASS, salvo el CV si Hugo aún no lo entregó; reportarlo en ese caso.
- [ ] **Step 4:** Commit `feat: OG images, favicon, robots`.

### Task 9: Verificación en navegador y calidad

Sin código nuevo, salvo las correcciones que salgan de esta revisión.

- [ ] **Step 1:** `npm run build && npx astro preview` y abrir `http://localhost:4321/` en el navegador integrado.
- [ ] **Step 2:** A 375×812 (móvil): en `/`, `/en/` y `/trabajo/judigo-legal`, `document.documentElement.scrollWidth <= innerWidth` (Review Focus 5). Los titulares no se cortan.
- [ ] **Step 3:** Con tema claro emulado: no hay destello oscuro y el toggle funciona en los dos sentidos.
- [ ] **Step 4:** Con `prefers-reduced-motion` emulado: no hay preloader ni typing, y el contenido aparece completo.
- [ ] **Step 5:** Con teclado: Tab recorre "saltar al contenido", el nav, el conmutador, el tema, el idioma, los CTA, los casos, las entradas del changelog (el diff se ve con foco) y el formulario. Los errores del formulario se anuncian.
- [ ] **Step 6:** Lighthouse móvil sobre `astro preview`: ≥ 95 en las 4 categorías. Si alguna queda abajo, corregir y repetir.
- [ ] **Step 7:** Correr `npm run todo` y reportar a Hugo la lista de métricas pendientes.
- [ ] **Step 8:** Commit `chore: QA fixes`.
