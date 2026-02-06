'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtContact, setIsAtContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    // Intersection Observer for Contact section (Footer)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtContact(entry.isIntersecting);
      },
      {
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

  return (
    <motion.nav
      initial={{
        opacity: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        backdropFilter: 'blur(0px)',
        boxShadow: 'none'
      }}
      animate={{
        opacity: 1,
        backgroundColor: isAtContact
          ? 'rgba(0, 0, 0, 0.4)'
          : isScrolled
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(0, 0, 0, 0)',
        backdropFilter: isScrolled || isAtContact ? 'blur(12px)' : 'blur(0px)',
        color: isAtContact || !isScrolled ? '#FFFFFF' : '#000000',
        paddingTop: isScrolled || isAtContact ? '1rem' : '1.5rem',
        paddingBottom: isScrolled || isAtContact ? '1rem' : '1.5rem',
        boxShadow: isScrolled || isAtContact ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
      }}
      transition={{
        delay: 0.2,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
        backgroundColor: { duration: 0.4 },
        paddingTop: { duration: 0.4 },
        paddingBottom: { duration: 0.4 },
        backdropFilter: { duration: 0.4 }
      }}
      className={`navbar z-50 px-4 md:px-12 fixed top-0 w-full`}
    >
      <div className="navbar-start">
        <Link href="/" className="flex items-center">
          <motion.div
            animate={{
              filter: isScrolled && !isAtContact ? 'invert(1) brightness(0)' : 'invert(0) brightness(1)',
            }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/brand/logo/white.webp"
              alt="LIONS PUBLICITY"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </motion.div>
        </Link>
      </div>

      <div className="navbar-end">
        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold uppercase tracking-widest text-xs">
            <li><Link href="#us" className="hover:text-primary transition-colors">Nosotros</Link></li>
            <li><Link href="#promotionals" className="hover:text-primary transition-colors">Promocionales</Link></li>
            <li><Link href="#contact" className="hover:text-primary transition-colors">Contactanos</Link></li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <motion.div
            tabIndex={0}
            role="button"
            className="btn btn-ghost"
            animate={{ color: isScrolled && !isAtContact ? '#000000' : '#FFFFFF' }}
          >
            <Menu className="h-6 w-6" />
          </motion.div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl !translate-y-0"
          >
            <li><Link href="#us">Nosotros</Link></li>
            <li><Link href="#promotionals">Promocionales</Link></li>
            <li><Link href="#contact">Contactanos</Link></li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
