# syntropylog-site (syntropysoft.com) — gate e invariantes del repo

> Ficha que consumen las skills `/sf-*` (nivel usuario). El método vive en la skill; los hechos de
> este repo, acá. Sin esta ficha, la skill se detiene.
>
> Todo lo que sigue fue **verificado el 2026-08-23** contra el repo y contra producción. Lo que no
> se pudo verificar está marcado como tal.

## Cómo se trabaja acá (aplica antes que cualquier otra cosa)

- **La frontera es tuya, el código es mío.** Qué secciones existen, qué dice el copy, a quién le
  habla el sitio, qué producto va primero, qué se borra — son decisiones del usuario y **se
  preguntan**. La implementación, los nombres, la estructura de componentes y la verificación son
  del agente: se hacen, no se consultan.
- **El tell.** Si la respuesta a *"¿por qué así?"* es un **principio** ("el sitio no promete lo que
  el producto no hace"), saliste del código y estás moviendo un límite → preguntá. Si es una
  **técnica** ("uso un Server Component porque el copy tiene que estar en el HTML"), decidí y seguí.
- ❌ NEVER meter código sin análisis previo. Si algo no queda claro, **se pregunta** — no se elige la
  interpretación más razonable y se sigue.
- ❌ NEVER afirmar una negación ("no existe X") sin decir **dónde** se buscó.
- ❌ NEVER una sonda manual como evidencia: o queda como verificación repetible, o se dice
  "verificado a mano, sin test".
- ⚠️ **Este front se hizo a las apuradas y el dueño lo sabe.** Encontrar algo roto es lo esperado,
  no un hallazgo. Lo valioso es el fail-path concreto y su costo, no el inventario de code smells.

## Qué es

Landing principal de **syntropysoft.com**, en producción sobre **Vercel**
(`https://syntropysoft.com/` → 307 a `/en`, verificado). Repo `Syntropysoft/syntropylog-site`,
**público**. Vende tres productos: SyntroJS, SyntropyLog y Praetorian.

Next.js **16.3.2** (App Router, Turbopack en dev **y** en build) · React **19.2.8** · TypeScript 5 ·
Tailwind 4 (vía `@tailwindcss/postcss`) · i18n **casero** (en/es). `package.json` es
`syntropylog-landing`, `private: true`, `version 0.1.0` — **no se publica nada**: el artefacto es el
deploy.

Rama única: **`main`**. No hay `develop`. Deploy automático desde `main`.

## Gate

```
pnpm lint      # eslint con la flat config nativa de eslint-config-next 16
pnpm build     # compila + typecheck
```

Los dos corren en CI (`.github/workflows/ci.yml`, job `gate`) en push a `main` y en cada PR, con
`pnpm install --frozen-lockfile` adelante — que **es parte del gate**: falla si el lockfile no
satisface `package.json`, el desajuste exacto que este repo tuvo meses sin que nada lo exhibiera.
La versión de pnpm sale de `packageManager` y la de Node de `.nvmrc`.

❌ **Todavía no hay tests.** Ni runner ni un solo archivo. Cuando un cambio se verifica a mano, se
dice **qué** se miró y **dónde** — ❌ NEVER "anda bien" como evidencia. Está fichado en `docs/TODO.md`.

⚠️ **Verificar los status codes y los headers exige servir el build**, no el dev server:
`pnpm build && pnpm start`. Es el único lugar donde se puede comprobar que una ruta da 404.

⚠️ **Auditar con `pnpm audit`, y separar build de runtime.** Al 2026-08-23: 23 hallazgos
(8 moderate, 15 high) en total y **`pnpm audit --prod` limpio** — todo es toolchain de build, nada
llega al visitante. En CI corre informativo, sin bloquear.

⚠️ **Verificar con qué Node corre el build, no cuál dice el gestor de versiones.** `.nvmrc` dice `20`
y `engines.node` pide `>=20.9.0`. En la máquina del maintainer el gestor anuncia una versión y
`node -v` devuelve otra, mayor. Antes de culpar a la versión de Node, correr `node -v` en el mismo
shell que corre el build.

## Invariantes

- ❌ NEVER commitear directo a `main` sin decirlo: `main` **es** producción, el deploy es automático.
  ✅ ALWAYS rama + PR para cualquier cambio que se vea, y decirle al usuario que el merge publica.
- ❌ NEVER una credencial, un token o un endpoint privado en `src/`: **todo lo que entra al bundle es
  público**. Un `NEXT_PUBLIC_*` es público por definición; uno sin ese prefijo usado en un
  `'use client'` simplemente no existe en runtime.
- ❌ NEVER poner un dato personal (mail, teléfono) como literal en un componente. ✅ ALWAYS que salga
  de config o de un servicio.
- ❌ NEVER agregar copy en un solo idioma. ✅ ALWAYS la clave existe en `en` **y** en `es`: son
  gemelos, como los `docs/`/`doc-es/` de la familia. Una clave faltante no rompe nada — el
  `getTranslation` devuelve **la clave cruda** como texto, y eso sale publicado.
- ❌ NEVER resolver texto en el cliente. ✅ ALWAYS leerlo en el servidor con `getHomeMessages` /
  `getCommonMessages` y pasarlo por props (ver gotchas).
- ❌ NEVER prometer en el sitio una capacidad que el producto no tiene. El sitio le habla a los
  mismos repos de la familia; una afirmación de más acá es una promesa incumplida allá.
- ❌ NEVER dejar una página de debug accesible en producción.
- ❌ NEVER `npm` ni `yarn`: el gestor es **pnpm**, pinneado en `packageManager`. Un `package-lock.json`
  que reaparezca es un lockfile en conflicto, no un respaldo.
- ✅ ALWAYS que un cambio observable quede reflejado en `docs/TODO.md`.

## Gotchas conocidos

> Los de esta sección están **vigentes**. Lo que se arregló en la normalización del 2026-08-23 está
> al final, bajo "Trampas ya desactivadas" — se conservan porque explican por qué el código quedó
> como quedó, y volver atrás las reactiva.

**No hay i18n de cliente: el texto se resuelve en el servidor.** `getHomeMessages` /
`getCommonMessages` (`src/services/messages.ts`) leen los JSON de `src/locales/` en un Server
Component y las secciones reciben el texto **por props**. ❌ NEVER reintroducir un hook que resuelva
traducciones en el cliente: eso fue exactamente lo que dejó el copy fuera del HTML servido hasta el
2026-08-23. Si un componente cliente necesita texto, lo recibe por props desde el servidor.

**El borde cliente es chico a propósito**: `LanguageSwitcher`, `MobileMenu`, `Logo`,
`LoadingProvider`/`LoadingSpinner`. Todo lo demás es servidor. Antes de poner `'use client'` en algo
que solo renderiza, revisar qué se lleva fuera del HTML.

**`<html lang>` siempre dice `en`.** Está fijo en `src/app/layout.tsx`; el layout de `[locale]` pone
el `lang` en un `<div>` interno. En `/es` el documento se declara en inglés — lo lee el lector de
pantalla y lo lee el crawler.

**La metadata se genera por locale** en `generateMetadata` de `src/app/[locale]/layout.tsx`:
`title`, `description`, `canonical`, `alternates.languages` y Open Graph. El layout raíz solo tiene
el fallback y `metadataBase`. Falta Twitter card, y no existen `sitemap.ts` ni `robots.ts`.

**Los datos de los paquetes no se traducen.** Versiones, nombres y URLs viven en
`src/config/packages.ts`, una sola vez; los locales tienen los rótulos de columna y las notas.
❌ NEVER poner un número de versión en un archivo de idioma: se duplica y una de las dos copias
queda vieja.

**Una clave de traducción faltante no rompe nada: se publica.** `getTranslation` devuelve **la clave
cruda** como texto visible. Por eso los locales `en` y `es` son gemelos y se tocan en el mismo
commit. La lista de locales soportados tiene una sola fuente: `src/config/locales.ts`.

**Rama huérfana**: `origin/vercel/react-server-components-cve-vu-149ycb` tiene 1 commit que `main` no
tiene ("Fix React Server Components CVE vulnerabilities"). La abrió Vercel por un CVE. Sin verificar
si el fix ya llegó con la subida a Next 16.

### Trampas ya desactivadas (2026-08-23) — no reintroducirlas

- **`next lint` no existe en Next 16.** Si vuelve a aparecer como script, `next` interpreta `lint`
  como directorio y sale con **código 1**: parece que linteó y encontró errores, y no linteó nada.
- **`eslint-config-next` 16 ya exporta flat config.** ❌ NEVER envolverlo en `FlatCompat`: revienta
  con `TypeError: Converting circular structure to JSON`.
- **Borrar una página bajo un segmento dinámico glotón no la hace 404.** `/[locale]` se tragaba toda
  ruta de un nivel; borrar `src/app/test/page.tsx` la habría dejado cayendo al catch-all, sirviendo
  la home con 200. Lo que la apaga es `dynamicParams = false` + `generateStaticParams`.
- **El chequeo de filesystem de Vercel gana sobre un rewrite.** El rewrite `/favicon.ico →
  /beaconLog-2.png` de `vercel.json` nunca se aplicó porque `public/favicon.ico` existe.
- **Next resuelve `next.config.js` antes que `.ts`.** Cuando convivían, el `.ts` no se ejecutaba y
  parecía config. Hoy solo existe el `.ts` y el build lo confirma imprimiendo cuál cargó.
- **Dos lockfiles pueden no empatar y nadie se entera.** El `pnpm-lock.yaml` versionado resolvía
  next 15.4.3 contra un `package.json` que pedía `^16.1.6`. Lo exhibe `--frozen-lockfile`, que por
  eso está en CI.

## Fuente de verdad del estado

`docs/TODO.md` — Bugs y Gaps abiertos, con lo hecho al final. Es lo primero que se consulta y lo
último que se actualiza.

`plan-mejora-sitio.txt` ya no está en la raíz: quedó archivado en
`docs/historico/plan-mejora-sitio-2025.txt`. Es intención histórica, ❌ NEVER estado.
