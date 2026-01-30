import { Share2, Shirt, Monitor, Printer, CreditCard, PenTool, Video } from 'lucide-react';
import Title from './Title';

const services = [
  {
    title: "Promocionales",
    description: "Haz que tu marca se sienta y se use en el día a día. Diseñamos y producimos artículos promocionales de alta calidad.",
    icon: <Share2 className="w-8 h-8" />
  },
  {
    title: "Textil",
    description: "Textiles de alta calidad que conectan con tu audiencia y refuerzan tu identidad en cada detalle.",
    icon: <Shirt className="w-8 h-8" />
  },
  {
    title: "Diseño Web",
    description: "Creamos páginas web modernas, funcionales y adaptadas a tus necesidades. Presencia digital profesional y optimizada.",
    icon: <Monitor className="w-8 h-8" />
  },
  {
    title: "Impresiones",
    description: "Impresiones de alta definición en distintos formatos y materiales. Calidad garantizada para comunicación visual.",
    icon: <Printer className="w-8 h-8" />
  },
  {
    title: "IZI's (Virtual Card)",
    description: "Tarjetas virtuales que integran redes sociales, datos de contacto y agenda. Perfectas para networking.",
    icon: <CreditCard className="w-8 h-8" />
  },
  {
    title: "Rotulación",
    description: "Dale visibilidad a tu negocio con rótulos llamativos. Interiores, exteriores y vehículos.",
    icon: <PenTool className="w-8 h-8" />
  },
  {
    title: "Productora de Video",
    description: "Contamos tu historia con calidad cinematográfica. Videos corporativos, publicitarios y creativos.",
    icon: <Video className="w-8 h-8" />
  },
];

export default function Services() {
  return (
    <div id="services" className="bg-base-200 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 uppercase">
          <Title text="Nuestros Servicios" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
              <div className="card-body items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
                  {service.icon}
                </div>
                <h3 className="card-title mb-2">{service.title}</h3>
                <p className="text-sm text-base-content/70">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
