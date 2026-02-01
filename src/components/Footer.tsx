import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Contact from './Contact';

export default function Footer() {
  return (
    <footer id="contact" className="relative footer footer-center p-20 text-white overflow-hidden min-h-screen flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/home/footer.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 md:bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center gap-20">
        {/* Contact Section Integrated */}
        <div className="w-full">
          <Contact />
        </div>

        <div className="flex flex-col items-center gap-10">
          <nav className="grid grid-flow-col gap-6 font-bold uppercase tracking-widest text-sm">
            <Link href="#us" className="hover:text-primary transition-colors">Nosotros</Link>
            <Link href="#promotionals" className="hover:text-primary transition-colors">Promocionales</Link>
            <Link href="#contact" className="hover:text-primary transition-colors">Contacto</Link>
            <Link href="#" className="hover:text-primary transition-colors">Catálogo</Link>
          </nav>
          <nav>
            <div className="grid grid-flow-col gap-6">
              <Link href="#" className="hover:scale-110 transition-transform">
                <Instagram className="w-7 h-7" />
              </Link>
              <Link href="#" className="hover:scale-110 transition-transform">
                <Facebook className="w-7 h-7" />
              </Link>
              <Link href="#" className="hover:scale-110 transition-transform">
                <Twitter className="w-7 h-7" />
              </Link>
            </div>
          </nav>
          <aside className="pt-8 border-t border-white/10 w-full max-w-2xl">
            <p className="text-xs opacity-50 uppercase tracking-widest">
              Copyright © 2025 - All right reserved by LIONS PUBLICITY
            </p>
          </aside>
        </div>
      </div>
    </footer>
  );
}
