import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        <Link href="#us" className="link link-hover">Nosotros</Link>
        <Link href="#promotionals" className="link link-hover">Promocionales</Link>
        <Link href="#contact" className="link link-hover">Contacto</Link>
        <Link href="#" className="link link-hover">Catálogo</Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link href="#" className="btn btn-ghost btn-circle">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="#" className="btn btn-ghost btn-circle">
             <Facebook className="w-6 h-6" />
          </Link>
          <Link href="#" className="btn btn-ghost btn-circle">
             <Twitter className="w-6 h-6" />
          </Link>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2025 - All right reserved by LIONS PUBLICITY</p>
      </aside>
    </footer>
  );
}
