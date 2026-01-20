import Image from 'next/image';

export default function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200 relative overflow-hidden">
      {/* Placeholder for Video Background */}
      <div className="absolute inset-0 bg-neutral-900">
        <Image
          src="https://placehold.co/1920x1080/1a1a1a/ffffff?text=Video+Background+Placeholder"
          alt="Hero Background"
          fill
          className="object-cover opacity-30"
        />
      </div>

      <div className="hero-content text-center text-neutral-content relative z-10">
        <div className="max-w-3xl">
          <h1 className="mb-5 text-5xl font-bold leading-tight">
            Creamos estrategias que capturan la esencia de tu marca
          </h1>
          <p className="mb-2 text-xl font-light">
            Creatividad y precisión, cuidando cada detalle.
          </p>
          <p className="mb-5 text-xl font-semibold">
            Resultados que superan expectativas y dan vida a tu visión
          </p>
          <button className="btn btn-primary">Ver video completo</button>
        </div>
      </div>
    </div>
  );
}
