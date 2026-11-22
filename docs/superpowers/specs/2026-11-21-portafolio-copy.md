# Copy del portafolio (ES / EN)

Fuente de verdad para todos los textos del sitio. El inglés está adaptado, no traducido literalmente.
`TODO:` = dato que Hugo debe confirmar antes de publicar. Nunca se inventa una cifra.

---

## Metadatos SEO

| Página | ES | EN |
|---|---|---|
| Home title | Hugo Velarde — Ingeniero en Software · Frontend & Fullstack | Hugo Velarde — Software Engineer · Frontend & Fullstack |
| Home description | Ingeniero en Software en Durango, MX. Construyo productos web con Next.js, React y TypeScript que resuelven todos sus estados: carga, error y éxito. Disponible para equipos y proyectos. | Software engineer based in Mexico. I build web products with Next.js, React and TypeScript that handle every state: loading, error and success. Available for teams and projects. |
| Caso title | {Proyecto} — Caso de estudio · Hugo Velarde | {Project} — Case study · Hugo Velarde |
| 404 title | Estado no encontrado · Hugo Velarde | State not found · Hugo Velarde |

## Nav
- ES: Trabajo · Experiencia · Enfoque · Servicios · Contacto · `◐ claro` / `◑ oscuro` · EN
- EN: Work · Experience · Approach · Services · Contact · `◐ light` / `◑ dark` · ES
- Enlace "Saltar al contenido" / "Skip to content"
- Conmutador: `idle · loading · error · success`, sin traducir (es vocabulario de código). aria-label: "Simular estado de la interfaz" / "Simulate interface state"

## Preloader
- ES: `// estado: loading — preparando algo que vale la pena`
- EN: `// state: loading — getting something worth the wait`

## 01 · Hero
**ES**
- Etiqueta: `// Ingeniero en Software · Frontend & Fullstack`
- H1: Interfaces que siguen funcionando *cuando el usuario hace lo inesperado.*
- Subtítulo: Diseño y construyo productos web con Next.js, React y TypeScript. Me ocupo del estado feliz y también de la carga lenta, el permiso denegado y el formulario a medio llenar.
- CTA 1: Sumarme a tu equipo → · CTA 2: Cotizar un proyecto
- Microcopy: Respuesta en menos de 24 h · Descargar CV (PDF)
- Ficha: estado **disponible** · base Durango, MX · UTC−6 · stack Next.js · React · TS · versión v3.5 · Clase Azul · respuesta < 24 h

**EN**
- Label: `// Software Engineer · Frontend & Fullstack`
- H1: Web interfaces that hold up *when users do the unexpected.*
- Subhead: I design and build web products with Next.js, React and TypeScript, covering the happy path, the slow network, the denied permission and the half-filled form.
- CTA 1: Hire me for your team → · CTA 2: Start a project
- Microcopy: Replies within 24h · Résumé (PDF)
- Card: status **available** · based in Durango, MX · UTC−6 · stack Next.js · React · TS · version v3.5 · Clase Azul · reply < 24h

**Mensajes del conmutador**

| Estado | ES | EN |
|---|---|---|
| error (aviso) | ✕ No se pudo cargar. No fue tu culpa. Revisa tu conexión → [Reintentar] | ✕ Couldn't load. Not your fault. Check your connection → [Retry] |
| success (aviso) | ✓ Listo. Todos los estados resueltos. | ✓ Done. Every state handled. |
| aria-live loading | Cargando contenido | Loading content |

## Prueba rápida
| ES | EN |
|---|---|
| **3+** años construyendo productos web | **3+** years shipping web products |
| **5** productos en producción (TuneUp, Motionode, Judigo, COCOLAB, Clase Azul) | **5** products in production |
| **Front + Back**: fullstack | **Front + Back**: fullstack |
| **< 24 h** de respuesta | **< 24h** reply time |

## 02 · Trabajo
- ES: **Trabajo seleccionado.** Tres proyectos y lo que cambió gracias a ellos.
- EN: **Selected work.** Three projects and what they changed.
- Etiquetas de tarjeta: Problema / Solución / Resultado · Ver caso completo → | Problem / Solution / Outcome · Read the case →
- Laboratorio: **Laboratorio.** Proyectos propios donde pruebo ideas de punta a punta. | **Lab.** Side projects where I test ideas end to end.
- Botones del laboratorio: Ver en vivo · Código | Live · Code

### Caso 1 · Judigo Legal
- Meta: Legal tech · Advante Digital · 2022–2024 · Fullstack
- ES
  - Titular: Un chat cliente-abogado en el que se puede confiar.
  - Problema: Los clientes y sus abogados se comunicaban por canales dispersos, sin historial confiable ligado al caso. La plataforma necesitaba conversación directa sin perder mensajes entre dispositivos.
  - Solución: Construí el sistema de chat en Next.js con NextUI y estado en Zustand. En el backend trabajé con AdonisJS y MariaDB, y sincronicé datos en tiempo real con Firebase. También di mantenimiento general a la plataforma.
  - Resultado: TODO: métrica (por ejemplo usuarios activos, mensajes al mes o reducción de tickets). Mientras tanto: "Chat en producción usado por clientes y abogados de la plataforma."
- EN
  - Headline: A client-lawyer chat people can trust.
  - Problem: Clients and lawyers talked across scattered channels with no reliable history tied to each case. The platform needed direct conversation that never lost messages across devices.
  - Solution: Built the chat in Next.js with NextUI and Zustand. On the backend: AdonisJS and MariaDB, with real-time sync through Firebase. Also owned ongoing platform maintenance.
  - Outcome: TODO: metric. Fallback: "Chat live in production, used by the platform's clients and lawyers."

### Caso 2 · Motionode
- Meta: Plataforma de datos · Advante Digital · 2022–2024 · Fullstack
- ES
  - Titular: Datos en tiempo real sin perder la consistencia de la interfaz.
  - Problema: La plataforma necesitaba mostrar información que cambia en vivo sin que la interfaz se desincronizara ni se volviera inconsistente con el diseño.
  - Solución: Diseñé esquemas de base de datos y endpoints con Node.js, Express, GraphQL, Sequelize y MariaDB, y colaboré en las funciones en tiempo real con Apollo. En el frontend construí interfaces fieles al diseño con React, Material UI y Redux Toolkit.
  - Resultado: TODO: métrica. Mientras tanto: "Funciones en tiempo real en producción sobre una API GraphQL tipada."
- EN
  - Headline: Real-time data without breaking the UI.
  - Problem: The platform had to show live-changing data without the interface drifting out of sync or away from the design.
  - Solution: Designed database schemas and endpoints with Node.js, Express, GraphQL, Sequelize and MariaDB, and co-built real-time features with Apollo. Frontend in React, Material UI and Redux Toolkit, pixel-faithful to the design.
  - Outcome: TODO: metric. Fallback: "Real-time features in production on a typed GraphQL API."

### Caso 3 · Clase Azul
- Meta: Freelance · 2025–2026 · Fullstack + UI/UX
- ES
  - Titular: Del diseño a producción, sin intermediarios.
  - Problema: El proyecto necesitaba nuevas páginas y componentes con diseño propio, conectados a un backend en Nest.js ya existente, con alguien que se hiciera cargo tanto de la experiencia como del código.
  - Solución: Diseñé la UI/UX de componentes y páginas y las implementé en Next.js con Ant Design y Redux Toolkit, integrando los endpoints del backend en Nest.js.
  - Resultado: TODO: métrica. Mientras tanto: "Páginas y componentes entregados de punta a punta: diseño, implementación e integración."
- EN
  - Headline: From design to production, no hand-offs.
  - Problem: The project needed new pages and components with original design, wired to an existing Nest.js backend, owned end to end by one person.
  - Solution: Designed the UI/UX and built it in Next.js with Ant Design and Redux Toolkit, integrating the Nest.js endpoints.
  - Outcome: TODO: metric. Fallback: "Pages and components shipped end to end: design, build and integration."

### Laboratorio
- **Weathery:** ES: Clima en tiempo real que sigue siendo útil aunque niegues la ubicación. Open-Meteo, geolocalización, zonas horarias. · EN: Real-time weather that stays useful even if you deny location. · React · TS · Vite · Tailwind · https://tryweathery.netlify.app/ · https://github.com/Velardee/Weathery
- **CronoRest:** ES: Ciclos de sueño en un toque, pensado para las 2 a. m. · EN: Sleep cycles in one tap, built for 2 a.m. · React · TS · Vite · Tailwind · https://cronorest.netlify.app/ · https://github.com/Velardee/CronoRest

## 03 · Enfoque
**ES**
- Titular diff: Construyo ~~sitios web~~ **productos web** que tu equipo no tendrá que reescribir.
- Nota: `1 file changed, 1 insertion(+), 1 deletion(−)`
- Bio: Soy Hugo, ingeniero en software en Durango, México. Llevo más de 3 años construyendo productos web reales: un chat cliente-abogado, plataformas con datos en tiempo real y paneles administrativos. Me muevo cómodo entre diseño e implementación: tomo un requerimiento ambiguo y lo convierto en flujos, componentes y estados que alguien más puede mantener sin pedirme explicaciones.
- Principios:
  1. **Primero los estados.** Antes de escribir código pregunto qué pasa si falla, si tarda o si viene vacío.
  2. **Código que se lee.** Tipado, con nombres claros y pequeño, porque alguien lo va a leer en seis meses.
  3. **Diseño con criterio, no con adornos.** Cada animación tiene una razón y cada pixel tiene un trabajo.

**EN**
- Diff headline: I build ~~websites~~ **web products** your team won't have to rewrite.
- Bio: I'm Hugo, a software engineer based in Durango, Mexico. For 3+ years I've shipped real web products: a client-lawyer chat, real-time data platforms and admin dashboards. I sit comfortably between design and engineering. I take a fuzzy requirement and turn it into flows, components and states someone else can maintain without asking me what I meant.
- Principles: **States first.** Before writing code, I ask what happens when it fails, stalls or comes back empty. · **Readable code.** Typed, well named and small, because someone will read it six months from now. · **Intentional design.** Every animation has a reason and every pixel has a job.

## 04 · Changelog
- ES: **Changelog** · `// experiencia · v1.0 → v3.0` · Pista: "Pasa el cursor o enfoca con Tab sobre cada versión"
- EN: **Changelog** · `// experience · v1.0 → v3.0` · Hint: "Hover or tab through each version"

| Ver. | Fechas | Empresa | + / − (ES) | + / − (EN) |
|---|---|---|---|---|
| v3.0 | dic 2025 – jul 2026 | Clase Azul (Freelance) · Next.js · Ant Design · Redux Toolkit · Nest.js | + diseño UI/UX de componentes y páginas · + integración con API en Nest.js | + UI/UX design for components and pages · + Nest.js API integration |
| v2.0 | dic 2024 – ago 2025 | COCOLAB International · Next.js · Refine · MUI · Supabase | + pantallas completas con Refine · + modelado de tablas y consumo de datos en Supabase · + propuestas de diseño de pantallas | + full screens with Refine · + Supabase table design and data layer · + screen design proposals |
| v1.0 | oct 2022 – oct 2024 | Advante Digital · TuneUp · Motionode · Judigo Legal | + chat cliente-abogado (Next.js · Zustand) · + tiempo real con Apollo + GraphQL · + endpoints Node/Express/Firebase (TuneUp) · − datos desincronizados → Firebase sync | + client-lawyer chat · + real-time with Apollo + GraphQL · + Node/Express/Firebase endpoints (TuneUp) · − out-of-sync data → Firebase sync |
| v0.1 | ago 2018 – abr 2022 | Ingeniería en Software · Universidad Politécnica de Durango (UNIPOLI) | + fundamentos | + foundations |

## 05 · Stack
| ES | EN | Herramientas |
|---|---|---|
| Interfaz | Interface | React · Next.js · TypeScript · Tailwind CSS · Angular · Ionic |
| Estado y datos | State & data | Zustand · Redux Toolkit · GraphQL · Apollo · REST |
| Backend | Backend | Node.js · Express · AdonisJS · Nest.js (integración) · MariaDB · Sequelize · Supabase · Firebase |
| Producto | Product | Figma · Stripe · Refine · Ant Design · Material UI |
| Explorando | Exploring | Astro · Docker · MongoDB · React Native |

## 06 · Servicios
**ES**
- Titular: Dos formas de trabajar juntos.
- **Para equipos:** Me sumo como frontend o fullstack y me hago responsable de funcionalidades de punta a punta, desde la discusión en Figma hasta el deploy. Escribo PRs que se revisan rápido, documento lo que decido y defiendo la experiencia del usuario en las reuniones de producto. → Ver CV
- **Para proyectos:**
  - **MVP web:** de idea a producto en producción. TODO: plazo típico en semanas.
  - **Rescate de interfaz:** tu app funciona pero se siente lenta o confusa. La audito y la corrijo.
  - **Dashboards y paneles admin:** herramientas internas que tu equipo sí quiera usar.
  → Cotizar un proyecto
- Nota: Precio cerrado por alcance. Sin sorpresas a mitad del camino.

**EN**
- Headline: Two ways to work together.
- **For teams:** I join as a frontend or fullstack engineer and own features end to end, from the Figma thread to production. My PRs are easy to review, my decisions are documented, and I speak up for the user in product meetings. → Résumé
- **For projects:** **Web MVPs**: idea to production. · **UI rescue**: your app works but feels slow or confusing, so I audit it and fix it. · **Dashboards & admin panels**: internal tools your team will actually use. → Get a quote
- Note: Fixed price per scope. No mid-project surprises.

## 07 · Contacto
**ES**
- Titular: Tu próximo producto merece todos sus estados resueltos.
- Texto: ¿Tienes una vacante o un proyecto? Cuéntame qué necesitas y te respondo en menos de 24 horas con próximos pasos concretos, no con una plantilla.
- Botones: Copiar email ⧉ (al copiar: "Copiado ✓") · LinkedIn · GitHub · CV (PDF) · Agendar llamada (solo si hay URL de Calendly)
- Formulario: ¿Qué buscas? [Contratarte] [Un proyecto] [Solo saludar] · Nombre · Email · Cuéntame en un par de líneas · Botón: Enviar mensaje
- Validación:
  - Nombre vacío: "¿Cómo te llamo?"
  - Email inválido: "Ese email no parece completo. ¿Falta el @ o el dominio?"
  - Mensaje vacío: "Un par de líneas bastan para empezar."
- Enviando: "Enviando…"
- Error de red: "No se pudo enviar. No fue tu culpa. Intenta de nuevo o escríbeme directo a {email}."
- Éxito: "Recibido ✓. Te escribo en menos de 24 horas."

**EN**
- Headline: Your next product deserves every state handled.
- Body: Have a role or a project? Tell me what you need and I'll reply within 24 hours with concrete next steps, not a template.
- Buttons: Copy email ⧉ ("Copied ✓") · LinkedIn · GitHub · Résumé (PDF) · Book a call (only if a Calendly URL exists)
- Form: What are you after? [Hiring] [A project] [Just saying hi] · Name · Email · Tell me in a couple of lines · Send message
- Validation: "What should I call you?" · "That email looks incomplete. Missing an @ or domain?" · "A couple of lines is enough to start."
- Sending: "Sending…" · Network error: "Couldn't send. Not your fault. Try again or email me at {email}." · Success: "Got it ✓. You'll hear from me within 24 hours."

## Página /gracias · /en/thanks (sin JS)
- ES: **Recibido.** Te respondo en menos de 24 horas. ← Volver al inicio
- EN: **Got it.** I'll reply within 24 hours. ← Back home

## 404
- ES: `// estado: 404` · **Este estado no estaba en el spec.** Pero lo diseñé igual. · ← Volver al inicio
- EN: `// state: 404` · **This state wasn't in the spec.** I designed it anyway. · ← Back home

## Footer
- ES: Hecho a mano con Astro · Durango, MX · Actualizado {mes año}
- EN: Hand-built with Astro · Durango, MX · Updated {month year}
