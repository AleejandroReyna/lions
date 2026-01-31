import Title from './Title';
import OverlayCard from './common/OverlayCard';

const services = [
  {
    title: "Promocionales Textil",
    background: "/home/service.webp"
  },
  {
    title: "Diseño Web",
    background: "/home/service.webp"
  },
  {
    title: "Impresiones",
    background: "/home/service.webp"
  },
  {
    title: "IZI's\nVirtual Card",
    background: "/home/service.webp"
  },
  {
    title: "Rotulación",
    background: "/home/service.webp"
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-12">
      <div className="mx-auto">
        <div className="flex flex-wrap">
          {services.map((service, index) => (
            <div key={index} className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
              <OverlayCard
                title={service.title}
                background={service.background}
                backgroundType="image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
