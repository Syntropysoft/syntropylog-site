# TODO — syntropylog-site

Fuente de verdad del estado del sitio. Lo que no está acá, no está pendiente.

> Antes de esto el estado no vivía en ningún lado: `plan-mejora-sitio.txt` era el plan original y
> quedó desactualizado (marcaba "FASE 3 ✅ EN PROGRESO" con todas las casillas vacías). Se archivó
> en `docs/historico/`.
>
> Los hechos verificados del repo —gate, invariantes, trampas— están en
> `.claude/rules/00-sf-gate.md`. Acá va **solo lo accionable**.

---

## Bugs abiertos

### [ ] `<html lang>` siempre dice `en`, también en `/es`
Está fijo en `src/app/layout.tsx`; el layout de `[locale]` pone el `lang` en un `<div>` interno, que
no lo reemplaza. Lo leen el lector de pantalla y el crawler.

*Camino:* que el segmento `[locale]` sea dueño del `<html>`. Implica reacomodar el layout raíz,
porque `src/app/page.tsx` (el redirect) también necesita uno.

### [ ] `useLoading`: el `setTimeout` no se limpia
En `src/hooks/useLoading.ts`, cuando `document.readyState === 'complete'` el efecto no devuelve
cleanup y el `setTimeout` queda vivo. Si el componente se desmonta antes, hay un `setState` sobre
algo desmontado.

---

## Gaps

### SEO / indexabilidad
- [ ] **Twitter card.** Falta; Open Graph ya está.
- [ ] **`robots.ts` y `sitemap.ts`.** No existen. Desde el arreglo del catch-all esas URLs dan 404
      correcto, que es mejor que devolver la home — pero siguen faltando.

### Calidad
- [ ] **No hay tests.** Ni runner ni un solo archivo. El gate es `pnpm lint` + `pnpm build`.
      Decidir el runner (Vitest + Testing Library es lo natural acá) y arrancar por lo que más
      duele: paridad de claves `en`/`es`, y `negotiateLocale` que ya es una función pura y se testea
      sola.
- [ ] **Sin auditoría de accesibilidad.** Sospechosos conocidos sin medir: contraste de los textos
      `slate-400/500` sobre el gradiente oscuro, y el menú móvil con teclado.
- [ ] **Sin línea base de performance.** Tres familias tipográficas cargadas (Geist, Geist Mono,
      Inter): verificar que las tres se usen.

### Infraestructura
- [ ] **Vulnerabilidades del toolchain de build.** `pnpm audit` reporta 23 (8 moderate, 15 high) al
      2026-08-23 — **todas de build**: `pnpm audit --prod` da limpio, nada llega al visitante.
      No es urgente; sí conviene no dejarlo crecer.
- [ ] **Rama `vercel/react-server-components-cve-vu-149ycb`.** Tiene 1 commit que `main` no tiene
      ("Fix React Server Components CVE vulnerabilities"). Verificar si el fix ya llegó por la subida
      a Next 16 y, si sí, borrarla.
- [ ] **`.nvmrc` dice `20` pero el build corre con 22.** `engines` pide `>=20.9.0`, así que las dos
      cumplen. Decidir una y que digan lo mismo.
- [ ] **Confirmar en el log de build de Vercel que usa pnpm.** Con `packageManager` pinneado debería,
      pero conviene verlo una vez.

### Contenido nuevo (Partes 2 y 3)
- [ ] **Maquetas conceptuales** de login/dashboard (syntroAuth) y del depósito de logs + libro de
      actas. No funcionales, y **rotuladas como maquetas de forma visible**: un senior que clickea un
      login y descubre que es un dibujo sin aviso concluye que vendemos humo.
- [ ] **Demo hosteada del ejemplo 22.** 9 servicios + Kafka + Redis + collector .NET AOT. No va en
      Vercel; Railway es el camino probado. Riesgos sin resolver: costo con Kafka permanente, reset
      de estado entre visitantes, y abuso del botón "Place order".

### Contenido
- [ ] **El sitio no tiene ningún canal de contacto.** El footer mostraba el mail personal del
      maintainer como literal en el JSX; se quitó al pasar el footer a servidor, y quedó solo
      LinkedIn. Decidir con qué se reemplaza — es la única forma que tenía un visitante de escribir.
- [ ] **El formulario de contacto se borró** (estaba en dos implementaciones, ninguna funcional).
      Si se quiere contacto, se hace de cero: un endpoint real, sin credenciales en el cliente y sin
      el mail personal en la UI. Las claves `contact.*` de los locales se conservaron — el copy está
      escrito.
- [ ] **`src/app/[locale]/page.tsx` no monta ninguna sección de contacto.** Decidir si va.

---

## Hecho

- [x] **Parte 1: el sitio dice una sola cosa** — 2026-08-23. Posicionamiento de observabilidad
      multi-lenguaje con lo único publicado y verificable. Salen el ecosistema de cuatro productos,
      los deep dives de SyntroJS y la sección de patrocinadores (que renderizaba un estado vacío
      anunciando que no había ninguno). Entran hero, problema, matriz de lenguajes, las cuatro
      decisiones de diseño y "empezá en tu lenguaje".
- [x] **El copy llega al HTML servido** — 2026-08-23. Cerraba el bug más caro del sitio. Las
      secciones son Server Components y reciben el texto resuelto por props; se eliminó el i18n de
      cliente (`useTranslations` + `translationService`). Verificado con `curl` sin ejecutar JS, en
      los dos idiomas.
- [x] **La navegación dejaba las claves crudas en el HTML** — 2026-08-23. Header y Footer eran
      cliente, así que un crawler leía `navigation.github` en vez de "GitHub". Diez claves crudas,
      ahora cero.
- [x] **El menú móvil no existía** — 2026-08-23. `Navigation` solo renderizaba el botón si le
      pasaban `onMobileMenuToggle`, y nadie se lo pasaba: en un teléfono no había navegación.
- [x] **Metadata por idioma** — 2026-08-23. `title`, `description`, `canonical`, `hreflang` y Open
      Graph por locale. Antes había una sola, fija y en español.
- [x] **Chasis `/sf-*` y ficha del repo** — 2026-08-23.
- [x] **Un solo gestor de paquetes (pnpm), con `packageManager` pinneado** — 2026-08-23. Había dos
      lockfiles que no empataban y `pnpm install --frozen-lockfile` fallaba.
- [x] **Lint que corre de verdad** — 2026-08-23. Estaba roto por partida doble (`next lint` no existe
      en Next 16; el `FlatCompat` reventaba con eslint-config-next 16). Un solo error real en todo el
      repo: `Date.now()` en render.
- [x] **Una sola fuente de cada config** — 2026-08-23. `next.config.ts` (el `.js` ganaba y el `.ts`
      era decorativo), headers en un solo lugar, `vercel.json` borrado entero: sus headers estaban
      duplicados y su rewrite del favicon nunca se aplicaba.
- [x] **Código muerto borrado** — 2026-08-23. Contacto por duplicado, `ui/Card`, `ui/Tooltip`,
      dependencia `emailjs-com`.
- [x] **`/[locale]` dejó de tragarse todas las rutas** — 2026-08-23. Antes `/admin`, `/fr` y
      `/robots.txt` devolvían 200 con la home. Se borró también `/test`, que estaba publicada.
