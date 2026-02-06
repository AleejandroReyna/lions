import OverlayCard from './common/OverlayCard';
import { getPayload } from 'payload';
import config from '@payload-config';
import { StaggerChildren, StaggerItem } from './common/Animations';

export default async function Services() {
  const payload = await getPayload({ config });

  const { docs: servicesDocs } = await payload.find({
    collection: 'services',
    limit: 100,
  });

  return (
    <section id="services" className="bg-white py-12">
      <div className="mx-auto">
        <StaggerChildren className="flex flex-wrap">
          {servicesDocs.map((service) => {
            const thumbnail = service.thumbnail;
            const imageUrl = thumbnail && typeof thumbnail === 'object' && thumbnail.url ? thumbnail.url : "/home/service.webp";

            return (
              <div key={service.id} className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <StaggerItem>
                  <OverlayCard
                    title={service.name}
                    background={imageUrl}
                    backgroundType="image"
                  />
                </StaggerItem>
              </div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
