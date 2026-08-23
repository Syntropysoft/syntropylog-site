import { CheckIcon } from '@heroicons/react/24/outline';

import type { AboutMessages } from '@/services/messages';

/**
 * Server Component. Antes los tres ítems del compromiso open source estaban
 * hardcodeados en español dentro del JSX, así que en /en salían en castellano.
 * Ahora salen de los locales como todo el resto.
 */
export default function About({ messages }: { messages: AboutMessages }) {
  return (
    <section id="about" className="py-20 bg-slate-900/70">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{messages.title}</h2>
        <p className="mt-4 text-slate-400 max-w-3xl mx-auto">{messages.subtitle}</p>

        <div className="mt-10 max-w-2xl mx-auto rounded-xl border border-slate-700 bg-slate-800 p-8">
          <h3 className="text-2xl font-bold text-white">{messages.opensource_title}</h3>
          <ul className="mt-4 space-y-3 text-left text-slate-400">
            {messages.opensource_items.map(([title, description]) => (
              <li key={title} className="flex items-start">
                <CheckIcon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-sky-400" aria-hidden="true" />
                <div>
                  <strong className="mr-2 text-slate-200">{title}:</strong>
                  {description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
