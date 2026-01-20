import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div id="contact" className="py-24 bg-neutral text-neutral-content">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 uppercase">Contacto</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Información</h3>
              <p className="mb-6 opacity-80">
                Si tienes alguna pregunta o consulta, no dudes en ponerte en contacto
                con nosotros a través de los siguientes medios.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-60">Email</p>
                <p className="font-semibold">luccaa@lionspublicity.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-60">Teléfono</p>
                <p className="font-semibold">+502 5517-5800</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
               <div className="bg-primary/20 p-3 rounded-full text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-sm opacity-60">Ubicación</p>
                 <p className="font-semibold">Guatemala</p>
              </div>
            </div>

            <div className="divider"></div>

            <p className="italic opacity-70">
              "Habla con nosotros a través de nuestros canales de contacto para poder
              iniciar un proyecto nuevo y personalizado."
            </p>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-100 text-base-content shadow-2xl">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-6">Envíanos un mensaje</h3>
              <form className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nombre</span>
                  </label>
                  <input type="text" placeholder="Tu nombre" className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="tucorreo@ejemplo.com" className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Mensaje</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-32" placeholder="¿En qué podemos ayudarte?"></textarea>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Enviar Mensaje</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
