'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Usamos el alto de la ventana como umbral (ya que Hero es min-h-screen)
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`navbar z-50 px-4 md:px-12 ${isScrolled
        ? 'fixed top-0 bg-white/90 backdrop-blur-md shadow-md text-black py-4'
        : 'absolute top-0 bg-transparent text-white py-6'
        }`}
    >
      <div className="navbar-start">
        <Link href="/" className="flex items-center">
          <Image
            src={"/brand/logo/white.webp"}
            alt="LIONS PUBLICITY"
            width={120}
            height={40}
            className={`h-10 w-auto object-contain ${isScrolled ? 'mix-blend-difference' : ''}`}
            priority
          />
        </Link>
      </div>

      <div className="navbar-end">
        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold uppercase tracking-widest text-xs">
            <li><Link href="#us" className="hover:text-primary">Nosotros</Link></li>
            <li><Link href="#promotionals" className="hover:text-primary">Promocionales</Link></li>
            <li><Link href="#contact" className="hover:text-primary">Contactanos</Link></li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className={`btn btn-ghost ${isScrolled ? 'text-black' : 'text-white'}`}>
            <Menu className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl">
            <li><Link href="#us">Nosotros</Link></li>
            <li><Link href="#promotionals">Promocionales</Link></li>
            <li><Link href="#contact">Contactanos</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
