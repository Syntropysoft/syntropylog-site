import type { ProblemMessages } from '@/services/messages';

/** Server Component. Por qué duele no tener esto — la sección que justifica el resto. */
export default function Problem({ messages }: { messages: ProblemMessages }) {
  return (
    <section id="problem" className="py-20 bg-slate-900/70">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{messages.title}</h2>
        <p className="mt-6 text-lg text-slate-300">{messages.lead}</p>
        {messages.body.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-slate-400">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
