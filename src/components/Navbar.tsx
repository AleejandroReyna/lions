import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="navbar bg-transparent text-white fixed top-0 z-50 px-4 md:px-12">
      <div className="navbar-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/logo/white.webp"
            alt="LIONS PUBLICITY"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      <div className="navbar-end">
        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li><Link href="#us" className="hover:text-primary transition-colors">Nosotros</Link></li>
            <li><Link href="#promotionals" className="hover:text-primary transition-colors">Promocionales</Link></li>
            <li><Link href="#contact" className="hover:text-primary transition-colors">Contactanos</Link></li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
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
