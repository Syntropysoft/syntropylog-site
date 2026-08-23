import { installable } from '@/config/packages';
import type { GetStartedMessages } from '@/services/messages';

/** Server Component. Un comando por lenguaje publicado — nada que instalar, nada que mostrar. */
export default function GetStarted({ messages }: { messages: GetStartedMessages }) {
  return (
    <section id="start" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{messages.title}</h2>
          <p className="mt-4 text-slate-400">{messages.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {installable().map((impl) => (
            <div
              key={impl.id}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-400">
                {impl.language}
              </p>
              <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-700 bg-slate-900 p-4">
                <code className="font-mono text-sm text-green-400">{impl.install}</code>
              </pre>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-500">{messages.footnote}</p>
      </div>
    </section>
  );
}
