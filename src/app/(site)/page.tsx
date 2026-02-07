import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Clients from '@/components/Clients';
import Portfolio from '@/components/Portfolio';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Clients />
      <Portfolio />
    </main>
  );
}
