import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import SyntropyLogDeepDive from '@/components/SyntropyLogDeepDive';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-950 via-sky-900 to-sky-950 text-white">
      <Header />
      <main className="pt-20">
        <Hero />
        <Features />
        <SyntropyLogDeepDive />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
} 