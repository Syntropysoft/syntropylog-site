/**
 * Las implementaciones publicadas de SyntropyLog. Fuente única: cuando sale una
 * versión, se toca acá y nada más.
 *
 * ❌ NEVER poner esto en los locales: un número de versión y una URL no se
 * traducen. Los locales tienen las etiquetas de columna y las notas; los datos
 * viven en código.
 */

export interface Implementation {
  /** Clave estable para buscar su nota traducida en los locales. */
  readonly id: 'node' | 'python' | 'dotnet' | 'java';
  readonly language: string;
  readonly pkg: string;
  readonly registry: string;
  /** Ausente mientras no esté publicado. */
  readonly version?: string;
  readonly url?: string;
  readonly install?: string;
}

export const IMPLEMENTATIONS: readonly Implementation[] = [
  {
    id: 'node',
    language: 'Node.js',
    pkg: 'syntropylog',
    registry: 'npm',
    version: '2.1.0',
    url: 'https://www.npmjs.com/package/syntropylog',
    install: 'npm install syntropylog',
  },
  {
    id: 'python',
    language: 'Python',
    pkg: 'slpy-log',
    registry: 'PyPI',
    version: '2.0.0',
    url: 'https://pypi.org/project/slpy-log/',
    install: 'pip install slpy-log',
  },
  {
    id: 'dotnet',
    language: '.NET',
    pkg: 'sl4n',
    registry: 'NuGet',
    version: '1.1.0',
    url: 'https://www.nuget.org/packages/sl4n/',
    install: 'dotnet add package sl4n',
  },
  // Sin versión ni URL a propósito: está en 0.1.0-SNAPSHOT y no se publicó.
  // ❌ NEVER anunciarlo disponible hasta que exista el artefacto.
  { id: 'java', language: 'Java', pkg: '—', registry: '—' },
];

/** Las que se pueden instalar hoy. Pura. */
export const installable = (impls: readonly Implementation[] = IMPLEMENTATIONS) =>
  impls.filter((i) => Boolean(i.install));
