import Title from './Title';

export default function About() {
  return (
    <div id="us" className="hero bg-base-100 py-20">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          <div className="mb-8 uppercase tracking-widest text-primary">
            <Title text="Acerca de Nosotros" />
          </div>
          <p className="py-6 text-xl leading-relaxed text-base-content/80">
            En <span className="font-bold text-primary">LIONS Publicity</span>, somos dos socios con visión innovadora que lideramos un
            equipo especializado en conectar marcas con personas a través de
            soluciones digitales y tangibles. Nuestra esencia es hacer que tu marca
            crezca y se conecte auténticamente con tu audiencia.
          </p>
        </div>
      </div>
    </div>
  );
}
