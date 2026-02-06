import { getPayload } from 'payload';
import config from '@payload-config';
import HeroCarousel from './common/HeroCarousel';

export default async function Hero() {
  const payload = await getPayload({ config });
  const homeData = await payload.findGlobal({
    slug: 'home' as any,
  }) as any;

  const slides = homeData.hero?.map((slide: any) => ({
    title: slide.title,
  })) || [];

  // Fallback slide if nothing is configured
  const displaySlides = slides.length > 0 ? slides : [
    { title: "Creatividad y precisión, cuidando cada detalle." }
  ];

  return (
    <section className="hero min-h-screen relative overflow-hidden">
      {/* Static Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/home/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="hero-content text-center text-white relative z-10 w-full h-full">
        <HeroCarousel slides={displaySlides} />
      </div>
    </section>
  );
}
