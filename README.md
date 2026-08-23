# syntropylog-site

Sitio principal de **[syntropysoft.com](https://syntropysoft.com)** — la landing de SyntropySoft y
sus productos: SyntroJS, SyntropyLog y Praetorian.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · i18n propio (`en` / `es`).
Se deploya en Vercel desde `main`, automáticamente.

## Correrlo

Requiere Node `>=20.9` y **pnpm** (pinneado en `packageManager`; `corepack enable` lo resuelve solo).

```bash
pnpm install
pnpm dev        # http://localhost:3000 -> redirige a /en o /es según accept-language
```

## Gate

Lo que tiene que estar en verde antes de abrir un PR:

```bash
pnpm lint       # eslint con la flat config de eslint-config-next 16
pnpm build      # compila + typecheck
```

> **Todavía no hay tests.** El gate son esos dos comandos y nada más; está anotado en
> [`docs/TODO.md`](docs/TODO.md). Cuando un cambio se verifica a mano, se dice qué se miró y dónde.

Para probar el build real —el único lugar donde se pueden verificar status codes y headers— hace
falta servirlo:

```bash
pnpm build && pnpm start
```

## Cómo está organizado

```
src/
├── app/                 # App Router
│   ├── page.tsx         # raíz: negocia el idioma y redirige a /<locale>
│   └── [locale]/        # las únicas rutas válidas son los locales soportados
├── components/
│   ├── ui/              # presentación pura
│   ├── sections/        # secciones de página
│   └── *.tsx            # orquestación y layout
├── config/locales.ts    # fuente única de los locales soportados
├── hooks/               # lógica de estado (cliente)
├── locales/{en,es}/     # el copy, en JSON. Los dos idiomas son gemelos.
└── services/            # lógica de negocio
```

## Reglas que no son obvias

- **`src/locales/en/` y `src/locales/es/` son gemelos.** Una clave que existe en uno existe en el
  otro, en el mismo commit. Si falta, nada se rompe: se publica **la clave cruda** como texto.
- **Nada de texto literal en el JSX.** Todo el copy sale de los locales.
- **Todo lo que llega al navegador es público.** Sin credenciales, tokens ni datos personales en
  `src/`.
- **`main` es producción.** Mergear publica. Los cambios van por PR y se mira el preview.

Para trabajar este repo con Claude Code hay un chasis de skills `/sf-*`; sus hechos verificados
—gate real, invariantes y trampas conocidas— están en
[`.claude/rules/00-sf-gate.md`](.claude/rules/00-sf-gate.md), que también sirve como lectura rápida
para una persona.
