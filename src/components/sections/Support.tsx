import type { SupportMessages } from '@/services/messages';

const LINKS = [
  'https://github.com/Syntropysoft/SyntropyLog',
  'https://github.com/Syntropysoft/SyntropyLog/issues',
  'https://github.com/Syntropysoft/SyntropyLog',
] as const;

/**
 * Server Component. Reemplaza la vieja sección de patrocinadores, que renderizaba
 * un estado vacío — anunciar que no hay sponsors no ayuda a nadie. Estas tres
 * acciones ya estaban escritas en los locales y son las que sí queremos pedir.
 */
export default function Support({ messages }: { messages: SupportMessages }) {
  return (
    <section id="support" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">{messages.title}</h2>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {messages.items.map((item, index) => (
            <li
              key={item.title}
              className="flex flex-col rounded-xl border border-slate-700 bg-slate-800 p-6"
            >
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 flex-grow text-sm text-slate-400">{item.body}</p>
              <a
                href={LINKS[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                {item.cta}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
