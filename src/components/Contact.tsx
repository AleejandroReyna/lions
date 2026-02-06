import { Mail, Phone, MapPin } from 'lucide-react';
import Title from './Title';
import { getPayload } from 'payload';
import config from '@payload-config';

export default async function Contact() {
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({
    slug: 'settings',
  });

  const email = settings.contactInfo?.email || 'luccaa@lionspublicity.com';
  const phone = settings.contactInfo?.phone || '+502 5517-5800';
  return (
    <div className="w-full text-white text-left">
      <div className="max-w-8xl mx-auto">
        <div className="mb-16 text-left">
          <Title text="Contacto" className="text-white" />

          <p className="text-lg opacity-80 leading-relaxed md:max-w-xl text-left">
            Si tienes alguna pregunta o consulta, no dudes en ponerte en contacto con nosotros a través de los siguientes medios </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-6 group">
                <div className="bg-white/10 p-4 rounded-xl text-white group-hover:bg-white group-hover:text-black transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Email</p>
                  <p className="text-xl font-bold">{email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="bg-white/10 p-4 rounded-xl text-white group-hover:bg-white group-hover:text-black transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Teléfono</p>
                  <p className="text-xl font-bold">{phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="bg-white/10 p-4 rounded-xl text-white group-hover:bg-white group-hover:text-black transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Ubicación</p>
                  <p className="text-xl font-bold tracking-tight">Guatemala</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:col-span-2">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
                <div className="form-control group">
                  <input
                    type="text"
                    placeholder="NOMBRE"
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/40 focus:border-white focus:outline-none transition-all py-4 text-white text-lg placeholder:text-white/60 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm"
                  />
                </div>
                <div className="form-control group">
                  <input
                    type="tel"
                    placeholder="TELÉFONO"
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/40 focus:border-white focus:outline-none transition-all py-4 text-white text-lg placeholder:text-white/60 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm"
                  />
                </div>
                <div className="form-control group">
                  <input
                    type="email"
                    placeholder="CORREO"
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/40 focus:border-white focus:outline-none transition-all py-4 text-white text-lg placeholder:text-white/60 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm"
                  />
                </div>
                <div className="form-control group">
                  <input
                    type="text"
                    placeholder="EMPRESA"
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/40 focus:border-white focus:outline-none transition-all py-4 text-white text-lg placeholder:text-white/60 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm"
                  />
                </div>
              </div>
              <div className="form-control group">
                <textarea
                  placeholder="MENSAJE"
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/40 focus:border-white focus:outline-none transition-all py-4 text-white text-lg h-12 md:h-20 resize-none placeholder:text-white/60 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm"
                ></textarea>
              </div>
              <div className="flex justify-start pt-4">
                <button className="bg-white text-black px-12 py-3 rounded hover:bg-white/90 transition-all font-bold uppercase tracking-widest text-sm">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
