import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-950 via-sky-900 to-sky-950 text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
      </main>
      <Footer />
    </div>
  );
} 