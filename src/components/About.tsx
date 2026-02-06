import Title from './Title';
import { StaggerChildren, StaggerItem } from './common/Animations';

export default function About() {
  return (
    <section id="us" className="bg-white py-12 px-6 md:px-20">
      <div className="max-w-8xl mx-auto">
        <StaggerChildren stagger={0.2}>
          <StaggerItem>
            <div className="mb-2 max-w-4xl">
              <Title text="Acerca de Nosotros" />
            </div>
          </StaggerItem>
          <StaggerItem>
            <p className="text-sm md:text-xl leading-relaxed max-w-5xl text-justify">
              En <span className="font-bold">LIONS Publicity</span>, somos dos socios con visión innovadora lideramos un
              equipo especializados en conectar marcas con personas a través de
              soluciones digitales y tangibles. Nuestra esencia es hacer que tu marca
              crezca y se conecte auténticamente con tu audiencia.
            </p>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  );
}
