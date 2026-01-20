import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100/90 backdrop-blur-sm fixed top-0 z-50 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link href="#us">Nosotros</Link></li>
            <li><Link href="#promotionals">Promocionales</Link></li>
            <li><Link href="#contact">Contactanos</Link></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold">LIONS PUBLICITY</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="#us">Nosotros</Link></li>
          <li><Link href="#promotionals">Promocionales</Link></li>
          <li><Link href="#contact">Contactanos</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="#contact" className="btn btn-primary btn-sm">Cotizar</Link>
      </div>
    </div>
  );
}
