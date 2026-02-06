import Image from 'next/image';
import Title from './Title';
import { getPayload } from 'payload';
import config from '@payload-config';
import { FadeIn, StaggerChildren, StaggerItem } from './common/Animations';

export default async function Clients() {
  const payload = await getPayload({ config });

  const { docs: clientsDocs } = await payload.find({
    collection: 'clients',
    limit: 100,
  });

  return (
    <section className="bg-white py-24 px-6 md:px-20">
      <div className="max-w-8xl mx-auto">
        <FadeIn className="mb-16">
          <Title text="Clientes aliados" />
        </FadeIn>

        <StaggerChildren className="flex flex-wrap items-center justify-center gap-x-12 gap-y-16">
          {clientsDocs.map((client) => {
            const thumbnail = client.thumbnail;
            const imageUrl = thumbnail && typeof thumbnail === 'object' && thumbnail.url ? thumbnail.url : "/home/client.webp";

            return (
              <StaggerItem key={client.id}>
                <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110">
                  <Image
                    src={imageUrl}
                    alt={client.name || 'Client'}
                    width={150}
                    height={80}
                    className="w-auto h-auto max-w-[150px] max-h-[80px] object-contain"
                  />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
