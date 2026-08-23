import type { HeroMessages } from '@/services/messages';

/** Server Component: el titular es lo primero que tiene que ver un crawler. */
export default function Hero({ messages }: { messages: HeroMessages }) {
  return (
    <section className="relative py-20 md:py-32 text-center hero-spotlight-gradient">
      <div className="relative z-10 container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
          {messages.title_lead}
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            {messages.title_highlight}
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-slate-400">
          {messages.subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#start"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-medium text-white bg-sky-500 hover:bg-sky-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            {messages.cta_primary}
          </a>
          <a
            href="#principles"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-medium text-white bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            {messages.cta_secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
