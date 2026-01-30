import { CheckCircle, TrendingUp, Lightbulb, Handshake } from 'lucide-react';
import Title from './Title';

const features = [
  {
    title: "Calidad y Durabilidad",
    description: "Priorizamos la calidad en cada producto para garantizar que represente positivamente tu marca y perdure en el tiempo.",
    icon: <CheckCircle className="w-12 h-12 text-success" />
  },
  {
    title: "Amplia Gama de Productos",
    description: "Contamos con una variedad extensa, desde artículos cotidianos hasta productos exclusivos de alta gama, todos personalizables.",
    icon: <TrendingUp className="w-12 h-12 text-info" />
  },
  {
    title: "Creatividad e Innovación",
    description: "Nos destacamos por ofrecer soluciones promocionales originales y personalizadas, que conecten con tu público objetivo.",
    icon: <Lightbulb className="w-12 h-12 text-warning" />
  },
  {
    title: "Atención Personalizada",
    description: "Nuestro servicio al cliente es de primer nivel, ofreciendo asesoría adaptada a las necesidades de cada proyecto.",
    icon: <Handshake className="w-12 h-12 text-primary" />
  }
];

export default function WhyChooseUs() {
  return (
    <div className="py-24 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-16 uppercase">
          <Title text="¿Porque Elegir A LIONS?" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 border border-base-200 rounded-xl hover:bg-base-200 transition-colors">
              <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-base-content/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
