import { IMPLEMENTATIONS, type Implementation } from '@/config/packages';
import type { MatrixMessages } from '@/services/messages';

/** La nota traducida de cada implementación, por su id estable. Pura. */
const noteFor = (id: Implementation['id'], m: MatrixMessages): string =>
  ({ node: m.notes_node, python: m.notes_python, dotnet: m.notes_dotnet, java: m.notes_java }[id]);

/** Server Component. Los datos salen de config/packages; los rótulos, de los locales. */
export default function LanguageMatrix({ messages }: { messages: MatrixMessages }) {
  return (
    <section id="syntropylog" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{messages.title}</h2>
          <p className="mt-4 text-slate-400">{messages.subtitle}</p>
        </div>

        {/* La tabla scrollea dentro de su caja: el body de la página nunca scrollea de costado. */}
        <div className="mt-10 overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-left border-collapse min-w-[36rem]">
            <thead className="bg-slate-800/80">
              <tr className="text-slate-300 text-sm uppercase tracking-wide">
                <th scope="col" className="px-6 py-4 font-semibold">{messages.col_language}</th>
                <th scope="col" className="px-6 py-4 font-semibold">{messages.col_package}</th>
                <th scope="col" className="px-6 py-4 font-semibold">{messages.col_version}</th>
                <th scope="col" className="px-6 py-4 font-semibold">{messages.col_notes}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/70">
              {IMPLEMENTATIONS.map((impl) => (
                <tr key={impl.id} className="bg-slate-800/30">
                  <th scope="row" className="px-6 py-4 font-medium text-white">{impl.language}</th>
                  <td className="px-6 py-4 font-mono text-sm text-slate-300">
                    {impl.url ? (
                      <a
                        href={impl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300 underline underline-offset-4"
                      >
                        {impl.pkg}
                      </a>
                    ) : (
                      impl.pkg
                    )}
                    {impl.url ? <span className="text-slate-500"> · {impl.registry}</span> : null}
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-slate-300">
                    {impl.version ?? messages.version_java}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{noteFor(impl.id, messages)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* La doc de cada implementación es su README, y la página del registry lo
            renderiza entero. Por eso el sitio no tiene un link "Documentación": la
            tabla de arriba ya es el índice. */}
        <p className="mt-4 text-sm text-slate-500">{messages.docs_note}</p>
      </div>
    </section>
  );
}
