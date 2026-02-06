import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Title from './Title';
import InfiniteCarousel from './common/InfiniteCarousel';
import { getPayload } from 'payload';
import config from '@payload-config';
import { FadeIn } from './common/Animations';

export default async function Portfolio() {
  const payload = await getPayload({ config });
  const { docs: productTypes } = await payload.find({
    collection: 'product-types',
    limit: 100,
    sort: 'createdAt',
  });

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1000,
  });

  return (
    <section id="promotionals" className="bg-white py-24 overflow-hidden">
      <div className="max-w-8xl mx-auto overflow-hidden md:px-20">
        <FadeIn className="mb-16">
          <Title text="Promocionales con impacto" />
        </FadeIn>

        {productTypes.map((type, index) => {
          const relatedProductThumbnails = products
            .filter(p => typeof p.type === 'object' ? p.type.id === type.id : p.type === type.id)
            .map(p => (typeof p.thumbnail === 'object' ? { url: p.thumbnail?.url, name: p.name } : null))
            .filter(Boolean);

          return (
            <InfiniteCarousel
              key={type.id}
              items={relatedProductThumbnails as any}
              direction={index % 2 === 0 ? 'default' : 'reverse'}
            />
          );
        })}
      </div>

      <FadeIn className="flex justify-center mt-12 px-4" delay={0.3}>
        <Link href="/catalogo" className="btn btn-neutral">
          Ver Catálogo <ArrowRight className="w-5 h-5" />
        </Link>
      </FadeIn>
    </section>
  );
}
