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
(`https://syntropysoft.com/` → 308 a `/en`, verificado). Repo `Syntropysoft/syntropylog-site`,
**público**. Vende tres productos: SyntroJS, SyntropyLog y Praetorian.

Next.js **16.3.2** (App Router, Turbopack en dev **y** en build) · React **19.2.8** · TypeScript 5 ·
Tailwind 4 (vía `@tailwindcss/postcss`) · i18n **casero** (en/es). `package.json` es
`syntropylog-landing`, `private: true`, `version 0.1.0` — **no se publica nada**: el artefacto es el
deploy.

Rama única: **`main`**. No hay `develop`. Deploy automático desde `main`.

## Gate

```
npx next build     # compila + corre TypeScript. Es LO ÚNICO que hay hoy. Verde al 2026-08-23.
```

**No hay más gate que ese, y hay que decirlo en voz alta cada vez.** Concretamente:

- ❌ **No hay tests.** Cero. No hay runner, no hay `test` en `scripts`, no hay un solo `.test.tsx`.
- ❌ **No hay CI.** El directorio `.github/` **no existe**. Nada corre en un push.
- ❌ **`npm run lint` está roto de dos maneras distintas**, y las dos importan:
  1. el script es `next lint`, y **`next lint` se eliminó en Next 16**. Hoy `next` interpreta
     `lint` como el directorio del proyecto y falla con
     `Invalid project directory provided, no such directory: .../lint`. Sale con **código 1**, así
     que parece "el lint encuentra errores" cuando en realidad **no linteó nada**.
  2. `npx eslint .` tampoco corre: `eslint.config.mjs` envuelve `next/core-web-vitals` en
     `FlatCompat`, y con `eslint-config-next@16` + `eslint@9.39.4` eso revienta con
     `TypeError: Converting circular structure to JSON`. `eslint-config-next` 16 ya exporta flat
     config nativa — el `FlatCompat` es el que sobra.

  ✅ **Arreglar el lint es el primer trabajo de infraestructura**, antes que cualquier feature: sin
  lint, `next build` es la única red y solo atrapa errores de tipos.

**Gate objetivo** (lo que esta ficha debería declarar cuando el repo esté sano):
`pnpm lint` → `pnpm build` → `pnpm test` (unit) → chequeo de paridad i18n → Lighthouse/axe en las
rutas reales. Hoy solo el segundo existe.

⚠️ **`npm audit` acá miente por partida doble.** `node_modules` está instalado con **pnpm** (el
árbol tiene `.pnpm/`), pero `npm audit` lee `package-lock.json`, que es el **otro** lockfile. Al
2026-08-23 reporta 12 vulnerabilidades (1 critical: `tar` vía `sharp`), todas transitivas de
dev/optional y ninguna en el bundle que se sirve. Auditar con `pnpm audit`, y arreglar antes los
dos lockfiles (abajo).

⚠️ **Verificar con qué Node corre el build, no cuál dice el gestor de versiones.** El repo
declara `engines.node >=20.9.0` y `.nvmrc` dice `20`. Al 2026-08-23, en la máquina del maintainer, el
gestor anuncia una versión y `node -v` devuelve otra (mayor). Antes de atribuir un fallo a la versión
de Node, correr `node -v` en el mismo shell que corre el build.

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
- ❌ NEVER copy nuevo dentro de un componente `'use client'` que dependa de `useTranslations`: hoy
  eso significa que **el crawler no lo ve** (ver gotchas).
- ❌ NEVER prometer en el sitio una capacidad que el producto no tiene. El sitio le habla a los
  mismos repos de la familia; una afirmación de más acá es una promesa incumplida allá.
- ❌ NEVER dejar una página de debug accesible en producción.
- ✅ ALWAYS que un cambio observable quede reflejado en el estado (hoy no hay dónde — ver abajo).

## Gotchas conocidos (todos verificados el 2026-08-23)

**`/[locale]` se traga TODAS las rutas de un segmento y devuelve 200.** No hay validación de locale
ni `generateStaticParams`. Verificado en producción: `/fr`, `/admin`, `/esto-no-existe`,
`/robots.txt` y `/sitemap.xml` devuelven **HTTP 200 con el HTML de la home**. `/robots.txt` sale con
`content-type: text/html`. Solo las rutas de dos segmentos (`/en/nada`) dan 404 de verdad. Es un
soft-404 masivo: contenido duplicado infinito para el crawler y ningún `robots.txt` real. La ruta
`/[locale]` es `ƒ` (dinámica, SSR por request) justamente porque no hay params estáticos.

**El copy traducido NO está en el HTML que sirve el servidor.** `useTranslations` es un hook
`'use client'` que hace `import()` de los JSON de `src/locales/` dentro de un `useEffect`. Verificado
contra producción: `From Chaos to Clarity`, `Explore Solutions` y `Core Features` dan **0
ocurrencias** en el HTML servido de `/en`; `Observability` también da 0. Lo único que sí viaja es lo
que está hardcodeado. Para una landing esto es el problema más caro que tiene el sitio: el contenido
que vende existe solo después de hidratar.

**Hay dos `next.config` y solo uno manda.** `next.config.js` **gana** — el build lo dice explícito
(`✓ Running next.config.js`). `next.config.ts` existe, está vacío y es código muerto que parece
config. Los headers de cache viven en el `.js`, duplicados además en `vercel.json`.

**Hay dos lockfiles y NO empatan — uno contradice a `package.json`.** Verificado el 2026-08-23
sobre lo commiteado en `main`:

| | `package.json` pide | `package-lock.json` | `pnpm-lock.yaml` |
|---|---|---|---|
| `next` | `^16.1.6` | **16.1.6** ✅ | **15.4.3** ❌ |
| `react` / `react-dom` | `^19.2.4` | **19.2.4** ✅ | **19.1.0** ❌ |

El `pnpm-lock.yaml` versionado quedó congelado **antes** de la subida a Next 16 (commit `7e47904`),
que se hizo con npm; nunca se regeneró. `package.json` tampoco pinnea `packageManager`.

Consecuencia: **un `pnpm install --frozen-lockfile` sobre el árbol commiteado falla**, porque el lock
no satisface el `package.json`. Que producción esté arriba es evidencia fuerte de que Vercel está
construyendo con **npm** desde `package-lock.json` — fuerte, pero indirecta: no está confirmado en el
log de build de Vercel. ⚠️ Confirmarlo ahí antes de tocar nada de esto.

Corolario práctico: quien corra `pnpm i` obtiene un árbol **distinto** del que se deploya (local
resuelve Next 16.3.2 / React 19.2.8; producción, 16.1.6 / 19.2.4). Un bug que no reproduce puede ser
eso y nada más.

✅ El arreglo es **borrar uno**, no sincronizar los dos: dos locks coherentes que resuelven versiones
distintas siguen siendo ambiguos. Elegir gestor es decisión del usuario; el resto de la familia usa
**pnpm**. Cualquiera sea, va con `packageManager` pinneado en `package.json`, y **cambia lo que Vercel
instala** — se publica por PR y se mira el preview.

**Turbopack puede no inferir bien la raíz**: si hay un lockfile en algún ancestro del repo (típico:
el home del usuario), el build avisa que lo ignoró y sugiere fijar `turbopack.root`. Es ruido local,
no afecta el deploy.

**`<html lang>` siempre dice `en`.** Está fijo en `src/app/layout.tsx`; el layout de `[locale]` pone
el `lang` en un `<div>` interno. En `/es` el documento se declara en inglés — lo lee el lector de
pantalla y lo lee el crawler.

**La metadata es única, fija y en español.** Vive solo en `src/app/layout.tsx`. No varía por locale,
no hay `alternates`/`hreflang`, no hay Open Graph ni Twitter card, y no existen `sitemap.ts` ni
`robots.ts` en ningún lado (buscado en `src/app/` y en `public/`).

**Hay DOS implementaciones de contacto y ninguna funciona ni está conectada:**
- `src/components/Contact.tsx` → `sections/ContactForm.tsx`: usa `emailjs-com` (el paquete legacy,
  sucedido por `@emailjs/browser`) con las credenciales **literales** `YOUR_SERVICE_ID`,
  `YOUR_TEMPLATE_ID`, `YOUR_USER_ID`, y **renderiza el mail personal del maintainer en la UI** (está
  hardcodeado en ese archivo) junto con un cartel de "configuración necesaria".
- `src/services/contactService.ts` + `src/hooks/useContactForm.ts`: `sendEmail()` es un **stub** que
  duerme 1s y devuelve `success: true` sin mandar nada.

  `Contact.tsx` **no lo importa nadie** — no está en `src/app/[locale]/page.tsx` — así que hoy no
  hay exposición. Conectarlo tal como está publicaría el mail personal y mentiría "mensaje enviado".

**`/test` está publicada en producción**: `https://syntropysoft.com/test` → 200, "Test Page — If you
can see this, Vercel is working!". Es `src/app/test/page.tsx`.

**Código sin referencias** (buscado en todo `src/`): `components/Contact.tsx`, `components/ui/Card.tsx`,
`components/ui/Tooltip.tsx`. `Card` y `Tooltip` salieron del plan de refactor SRP y nunca se usaron.

**Al clonar y correr `pnpm i` + un build, el árbol queda con dos archivos modificados, y son
legítimos**: `tsconfig.json` (`jsx: preserve` → `react-jsx`, más `.next/dev/types`) lo reescribe
Next 16 al arrancar, y `pnpm-lock.yaml` (+668/-302) lo regenera pnpm porque **el versionado está
viejo** (ver el gotcha de los lockfiles). ❌ NEVER leerlos como trabajo abandonado de alguien: son
salida de herramienta. Commitear el `tsconfig.json` es gratis; el lock, no — arrastra la decisión de
gestor.

**Rama huérfana**: `origin/vercel/react-server-components-cve-vu-149ycb` tiene 1 commit que `main` no
tiene ("Fix React Server Components CVE vulnerabilities"), y `main` tiene 3 que ella no tiene. La
abrió Vercel por un CVE. Sin verificar si el fix ya llegó por otra vía.

## Fuente de verdad del estado

**Hoy no hay.** No existe `CHANGELOG.md` ni `docs/TODO.md`. `plan-mejora-sitio.txt` (raíz) es el
plan original y **está desactualizado**: marca "FASE 3 ✅ EN PROGRESO" con todas las casillas
vacías y "FASE 4 ✅ COMPLETADA". Sirve como intención histórica, ❌ NEVER como estado.

Crear `docs/TODO.md` es parte del primer `/sf-plan`. Hasta entonces, el estado es el código y esta
ficha.
