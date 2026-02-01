'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtContact, setIsAtContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };

    // Intersection Observer for Contact section
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtContact(entry.isIntersecting);
      },
      {
        // Detectamos cuando el elemento cruza la línea de los 80px (altura del navbar)
        threshold: 0,
        rootMargin: "-80px 0px -99% 0px"
      }
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) observer.observe(contactSection);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (contactSection) observer.unobserve(contactSection);
    };
  }, []);

  // Determinamos el estilo actual
  const navbarClasses = isAtContact
    ? 'fixed top-0 bg-black/40 backdrop-blur-md shadow-md text-white py-4'
    : isScrolled
      ? 'fixed top-0 bg-white/90 backdrop-blur-md shadow-md text-black py-4'
      : 'absolute top-0 bg-transparent text-white py-6';

  const logoClasses = `h-10 w-auto object-contain ${isScrolled && !isAtContact ? 'mix-blend-difference' : ''
    }`;

  const mobileMenuBtnClasses = `btn btn-ghost ${isScrolled && !isAtContact ? 'text-black' : 'text-white'
    }`;

  return (
    <div className={`navbar z-50 px-4 md:px-12 ${navbarClasses}`}>
      <div className="navbar-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/logo/white.webp"
            alt="LIONS PUBLICITY"
            width={120}
            height={40}
            className={logoClasses}
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
          <div tabIndex={0} role="button" className={mobileMenuBtnClasses}>
            <Menu className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl"
          >
            <li><Link href="#us">Nosotros</Link></li>
            <li><Link href="#promotionals">Promocionales</Link></li>
            <li><Link href="#contact">Contactanos</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
