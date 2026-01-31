import Image from 'next/image';
import Title from './Title';

export default function Hero() {
  return (
    <section className="hero min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/home/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="hero-content text-center text-white relative z-10">
        <div className="max-w-5xl">
          <div className="mb-5">
            <h2 className="mb-2 text-5xl font-black uppercase tracking-tighter">
              Creatividad y precisión, cuidando cada detalle.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
