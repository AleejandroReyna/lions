'use client';

import Title from './Title';
import { motion } from 'framer-motion';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="us" className="bg-white py-12 px-6 md:px-20">
      <motion.div
        className="max-w-8xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div>
          <motion.div className="mb-2 max-w-4xl" variants={itemVariants}>
            <Title text="Acerca de Nosotros" />
          </motion.div>
          <motion.p
            className="text-sm md:text-xl leading-relaxed max-w-5xl text-justify"
            variants={itemVariants}
          >
            En <span className="font-bold">LIONS Publicity</span>, somos dos socios con visión innovadora lideramos un
            equipo especializados en conectar marcas con personas a través de
            soluciones digitales y tangibles. Nuestra esencia es hacer que tu marca
            crezca y se conecte auténticamente con tu audiencia.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
