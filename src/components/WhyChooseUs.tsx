import React from 'react';
import { CheckCircle, TrendingUp, Lightbulb, Handshake } from 'lucide-react';
import Title from './Title';

const features = [
  {
    title: "Calidad y Durabilidad",
    description: "Priorizamos la calidad en cada producto para garantizar que represente positivamente tu marca y perdure en el tiempo.",
    Icon: CheckCircle,
    featured: true
  },
  {
    title: "Amplia Gama de Productos",
    description: "Contamos con una variedad extensa, desde artículos cotidianos hasta productos exclusivos de alta gama, todos personalizables.",
    Icon: TrendingUp,
    featured: false
  },
  {
    title: "Creatividad e Innovación",
    description: "Nos destacamos por ofrecer soluciones promocionales originales y personalizadas, que conecten con tu público objetivo.",
    Icon: Lightbulb,
    featured: false
  },
  {
    title: "Atención Personalizada",
    description: "Nuestro servicio al cliente es de primer nivel, ofreciendo asesoría adaptada a las necesidades de cada proyecto.",
    Icon: Handshake,
    featured: false
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24 px-6 md:px-20">
      <div className="max-w-8xl mx-auto">
        <div className="mb-16 max-w-5xl">
          <Title text="¿Porque Elegir A LIONS?" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <article
              key={index}
              className={`flex flex-col items-start text-left p-10 border border-black rounded-xl transition-all duration-300 ${feature.featured ? 'bg-black text-white' : 'bg-transparent text-black'
                }`}
            >
              <div className="mb-8">
                <feature.Icon className={`w-14 h-14 ${feature.featured ? 'text-white' : 'text-black'}`} />
              </div>
              <h3 className="text-4xl font-black uppercase leading-[1.1] mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className={`text-base leading-relaxed ${feature.featured ? 'text-white' : 'text-black/90'}`}>
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
