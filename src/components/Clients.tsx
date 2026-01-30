import Image from 'next/image';
import Title from './Title';

export default function Clients() {
  const clients = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 uppercase">
          <Title text="Clientes aliados" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-70">
          {clients.map((client) => (
            <div key={client} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
              <Image
                src={`https://placehold.co/150x80/ffffff/000000?text=Client+${client}`}
                alt={`Client ${client}`}
                width={150}
                height={80}
                className="rounded shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
