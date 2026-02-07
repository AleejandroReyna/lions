'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtContact, setIsAtContact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

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

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Nosotros', href: '/#us' },
    { name: 'Promocionales', href: '/#promotionals' },
    { name: 'Catálogo', href: '/catalog' },
    { name: 'Contacto', href: '/#contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  const menuVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      } as any
    },
    opened: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      } as any
    }
  };

  const navItemVariants = {
    closed: { opacity: 0, x: -20 },
    opened: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.5,
        ease: 'easeOut'
      } as any
    })
  };

  return (
    <>
      <motion.nav
        initial={{
          opacity: 0,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
          backdropFilter: 'blur(0px)',
          boxShadow: 'none',
          color: '#FFFFFF'
        }}
        animate={{
          opacity: 1,
          backgroundColor: isOpen
            ? 'rgba(0, 0, 0, 0)' // Transparent when drawer is open to let drawer background show
            : isAtContact
              ? 'rgba(0, 0, 0, 0.4)'
              : isScrolled
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(0, 0, 0, 0)',
          backdropFilter: (isScrolled || isAtContact) && !isOpen ? 'blur(12px)' : 'blur(0px)',
          color: isOpen || isAtContact || !isScrolled ? '#FFFFFF' : '#000000',
          paddingTop: isScrolled || isAtContact ? '1rem' : '1.5rem',
          paddingBottom: isScrolled || isAtContact ? '1rem' : '1.5rem',
          boxShadow: (isScrolled || isAtContact) && !isOpen ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
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
        className={`navbar z-[70] px-4 md:px-12 fixed top-0 w-full transition-colors`}
      >
        <div className="navbar-start">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
            <motion.div
              animate={{
                filter: (isScrolled && !isAtContact && !isOpen) ? 'invert(1) brightness(0)' : 'invert(0) brightness(1)',
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

        <div className="navbar-center text-white"></div>

        <div className="navbar-end">
          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-bold uppercase tracking-widest text-xs gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:underline hover:bg-transparent focus:bg-transparent active:bg-transparent transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-all hover:bg-black hover:text-white"
              animate={{
                color: (isScrolled && !isAtContact && !isOpen) ? '#000000' : '#FFFFFF',
                backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
              }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 left-0 bottom-0 w-[80%] z-[60] bg-black text-white flex flex-col shadow-2xl lg:hidden"
          >
            {/* Top gap to avoid covering navbar content area if needed, but here it fits below logo */}
            <div className="h-24" />

            {/* Menu Items */}
            <div className="flex-grow flex flex-col justify-start px-10 gap-10 pt-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={navItemVariants}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-black uppercase tracking-tighter hover:text-white/70 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Icons Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="px-10 py-12 flex gap-8 border-t border-white/5"
            >
              {socialLinks.map((social, i) => (
                <Link key={i} href={social.href} className="hover:scale-110 transition-transform text-white/40 hover:text-white">
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
