import next from 'eslint-config-next/core-web-vitals';

// eslint-config-next 16 ya exporta flat config (incluye next/typescript).
// ❌ NEVER volver a envolverlo en FlatCompat: revienta con
// "TypeError: Converting circular structure to JSON".
const eslintConfig = [
  ...next,
  { ignores: ['.next/**', 'next-env.d.ts'] },
];

export default eslintConfig;
