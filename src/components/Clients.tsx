import Image from 'next/image';
import Title from './Title';

export default function Clients() {
  const clients = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <section className="bg-white py-24 px-6 md:px-20">
      <div className="max-w-8xl mx-auto">
        <div className="mb-16">
          <Title text="Clientes aliados" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-16">
          {clients.map((client) => (
            <div key={client} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110">
              <Image
                src="/home/client.webp"
                alt={`Client ${client}`}
                width={150}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
