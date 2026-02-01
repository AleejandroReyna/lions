import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Title from './Title';
import InfiniteCarousel from './common/InfiniteCarousel';

export default function Portfolio() {
  const images = Array.from({ length: 8 }, (_, i) => ({
    url: "/home/product.webp"
  }));

  return (
    <section id="promotionals" className="bg-white py-24 overflow-hidden">
      <div className="max-w-8xl mx-auto mb-12 px-6 md:px-20">
        <Title text="Promocionales con impacto" />
      </div>

      <div className="max-w-8xl mx-auto overflow-hidden md:px-20">
        <InfiniteCarousel items={images} direction="default" />
        <InfiniteCarousel items={images} direction="reverse" />
        <InfiniteCarousel items={images} direction="default" />
      </div>

      <div className="flex justify-center mt-12 px-4">
        <Link href="/catalogo" className="btn btn-neutral">
          Ver Catálogo <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
