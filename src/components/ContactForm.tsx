'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import Title from './Title';
import { FadeIn, StaggerChildren, StaggerItem } from './common/Animations';
import { submitContactForm } from '@/actions/contact';
import { useState } from 'react';

interface ContactFormProps {
    email: string;
    phone: string;
}

export default function ContactForm({ email, phone }: ContactFormProps) {
    const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            company: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es requerido'),
            email: Yup.string().email('Email inválido').required('El email es requerido'),
            message: Yup.string().required('El mensaje es requerido'),
        }),
        onSubmit: async (values) => {
            setState('submitting');
            try {
                const result = await submitContactForm(values);
                if (result.success) {
                    setState('success');
                    formik.resetForm();
                    setTimeout(() => setState('idle'), 5000);
                } else {
                    setState('error');
                }
            } catch (error) {
                setState('error');
            }
        },
    });

    return (
        <div className="w-full text-white text-left">
            <div className="max-w-8xl mx-auto">
                <FadeIn className="mb-16 text-left" staggerChildren={0.2}>
                    <Title text="Contacto" className="text-white" />
                    <p className="text-lg opacity-80 leading-relaxed md:max-w-xl text-left">
                        Si tienes alguna pregunta o consulta, no dudes en ponerte en contacto con nosotros a través de los siguientes medios
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    {/* Contact Info */}
                    <div className="space-y-10">
                        <StaggerChildren className="space-y-6">
                            <StaggerItem>
                                <div className="flex items-center space-x-6 group">
                                    <div className="bg-white/10 p-4 rounded-xl text-white group-hover:bg-white group-hover:text-black transition-all">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Email</p>
                                        <p className="text-xl font-bold">{email}</p>
                                    </div>
                                </div>
                            </StaggerItem>

                            <StaggerItem>
                                <div className="flex items-center space-x-6 group">
                                    <div className="bg-white/10 p-4 rounded-xl text-white group-hover:bg-white group-hover:text-black transition-all">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Teléfono</p>
                                        <p className="text-xl font-bold">{phone}</p>
                                    </div>
                                </div>
                            </StaggerItem>

                            <StaggerItem>
                                <div className="flex items-center space-x-6 group">
                                    <div className="bg-white/10 p-4 rounded-xl text-white group-hover:bg-white group-hover:text-black transition-all">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Ubicación</p>
                                        <p className="text-xl font-bold tracking-tight">Guatemala</p>
                                    </div>
                                </div>
                            </StaggerItem>
                        </StaggerChildren>
                    </div>

                    {/* Contact Form */}
                    <FadeIn className="w-full lg:col-span-2" direction="none" delay={0.4}>
                        <form onSubmit={formik.handleSubmit} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
                                <div className="form-control group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="NOMBRE"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                        className={`w-full bg-transparent border-t-0 border-x-0 border-b ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-white/40'} focus:border-white focus:outline-none transition-all py-4 text-white text-lg placeholder:text-white/60 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm`}
                                    />
                                    {formik.touched.name && formik.errors.name && (
                                        <p className="text-red-500 text-xs mt-2 uppercase tracking-widest">{formik.errors.name}</p>
                                    )}
                                </div>
                                <div className="form-control group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="TELÉFONO"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                        className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/40 focus:border-white focus:outline-none transition-all py-4 text-white text-lg placeholder:text-white/60 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm"
                                    />
                                </div>
                                <div className="form-control group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="CORREO"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        className={`w-full bg-transparent border-t-0 border-x-0 border-b ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-white/40'} focus:border-white focus:outline-none transition-all py-4 text-white text-lg placeholder:text-white/60 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm`}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-red-500 text-xs mt-2 uppercase tracking-widest">{formik.errors.email}</p>
                                    )}
                                </div>
                                <div className="form-control group">
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="EMPRESA"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.company}
                                        className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/40 focus:border-white focus:outline-none transition-all py-4 text-white text-lg placeholder:text-white/60 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="form-control group">
                                <textarea
                                    name="message"
                                    placeholder="MENSAJE"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.message}
                                    className={`w-full bg-transparent border-t-0 border-x-0 border-b ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-white/40'} focus:border-white focus:outline-none transition-all py-4 text-white text-lg h-24 resize-none placeholder:text-white/60 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm`}
                                ></textarea>
                                {formik.touched.message && formik.errors.message && (
                                    <p className="text-red-500 text-xs mt-2 uppercase tracking-widest">{formik.errors.message}</p>
                                )}
                            </div>
                            <div className="flex flex-row items-center gap-6">
                                <button
                                    type="submit"
                                    disabled={state === 'submitting'}
                                    className="bg-white text-black px-12 py-3 rounded hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold uppercase tracking-widest text-sm flex items-center gap-2"
                                >
                                    {state === 'submitting' ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar'
                                    )}
                                </button>
                                {state === 'success' && (
                                    <div className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-widest text-xs">
                                        <CheckCircle2 className="w-4 h-4" />
                                        ¡Mensaje enviado con éxito!
                                    </div>
                                )}
                                {state === 'error' && (
                                    <p className="text-red-500 text-sm uppercase tracking-widest font-bold">Error al enviar.</p>
                                )}
                            </div>
                        </form>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
