import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Portfolio() {
  const images = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div id="promotionals" className="py-24 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-bold uppercase mb-2">Promocionales</h2>
           <p className="text-xl text-primary font-light">con impacto</p>
        </div>
        <Link href="/catalogo" className="btn btn-outline btn-primary hidden md:flex">
          Catálogo <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      <div className="carousel carousel-center max-w-full p-4 space-x-4 bg-neutral rounded-box">
        {images.map((img) => (
          <div key={img} className="carousel-item">
            <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-box overflow-hidden group">
              <Image
                src={`https://placehold.co/400x600/2a2a2a/ffffff?text=Portfolio+${img}`}
                alt={`Portfolio Item ${img}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-white font-bold">Ver Detalles</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 md:hidden">
        <Link href="/catalogo" className="btn btn-outline btn-primary w-full max-w-xs">
          Catálogo <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
