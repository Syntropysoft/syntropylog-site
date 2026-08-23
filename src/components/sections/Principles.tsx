import type { PrinciplesMessages } from '@/services/messages';

/**
 * Server Component. Las cuatro decisiones de diseño: es la sección que sostiene
 * la palabra "expertos", así que tiene que estar en el HTML servido sí o sí.
 */
export default function Principles({ messages }: { messages: PrinciplesMessages }) {
  return (
    <section id="principles" className="py-20 bg-slate-900/70">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{messages.title}</h2>
          <p className="mt-4 text-slate-400">{messages.subtitle}</p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {messages.items.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-8"
            >
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-slate-400">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
