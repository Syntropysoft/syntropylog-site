import Header from '@/components/Header';
import Footer from '@/components/Footer';
import About from '@/components/sections/About';
import GetStarted from '@/components/sections/GetStarted';
import Hero from '@/components/sections/Hero';
import LanguageMatrix from '@/components/sections/LanguageMatrix';
import Principles from '@/components/sections/Principles';
import Problem from '@/components/sections/Problem';
import Support from '@/components/sections/Support';
import { getCommonMessages, getHomeMessages } from '@/services/messages';

/**
 * Server Component: lee los mensajes una vez y se los pasa resueltos a cada
 * sección. Por eso el copy está en el HTML servido y no aparece recién después
 * de hidratar. Header y Footer siguen siendo cliente — necesitan el switch de
 * idioma y el menú.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [messages, common] = await Promise.all([
    getHomeMessages(locale),
    getCommonMessages(locale),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-950 via-sky-900 to-sky-950 text-white">
      <Header messages={common} />
      <main className="pt-20">
        <Hero messages={messages.hero} />
        <Problem messages={messages.problem} />
        <LanguageMatrix messages={messages.matrix} />
        <Principles messages={messages.principles} />
        <GetStarted messages={messages.getStarted} />
        <About messages={messages.about} />
        <Support messages={messages.support} />
      </main>
      <Footer messages={common} />
    </div>
  );
}
