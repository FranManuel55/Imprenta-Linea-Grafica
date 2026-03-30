"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Palette, Truck, BadgeDollarSign } from "lucide-react";

const features = [
  {
    icon: <Award className="w-7 h-7" />,
    title: "Calidad Premium",
    description:
      "Utilizamos los mejores materiales e insumos del mercado para garantizar un resultado impecable en cada trabajo.",
    color: "from-red-600 to-red-700",
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: "Diseño Profesional",
    description:
      "Nuestro equipo de diseño crea piezas únicas que reflejan la identidad de tu marca con impacto visual.",
    color: "from-red-700 to-red-800",
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: "Entrega Garantizada",
    description:
      "Cumplimos con los plazos de entrega en todo Cuyo. Envíos a Mendoza, San Luis y San Juan.",
    color: "from-neutral-800 to-neutral-900",
  },
  {
    icon: <BadgeDollarSign className="w-7 h-7" />,
    title: "Mejor Precio",
    description:
      "Precios competitivos sin resignar calidad. Trabajamos en volumen para ofrecerte el mejor costo por unidad.",
    color: "from-red-800 to-red-900",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-28 bg-white" id="nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-red-600 font-semibold text-sm uppercase tracking-[0.15em] mb-3"
            >
              ¿Por qué elegirnos?
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 line-decoration"
            >
              Publicidad
              <br />
              <span className="text-gradient-red">Andante</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-neutral-500 text-lg leading-relaxed mb-8"
            >
              Cada bolsa, etiqueta y tarjeta que imprimimos se convierte en
              publicidad que camina por la ciudad. Tu marca viaja, se muestra y
              genera nuevos clientes con cada entrega.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {["ML", "CM", "AG", "RS"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  +500 clientes satisfechos
                </p>
                <p className="text-xs text-neutral-500">
                  Empresas que confían en nosotros
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-neutral-50 hover:bg-neutral-900 border border-neutral-200 hover:border-neutral-800 transition-all duration-500 cursor-default"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-white transition-colors duration-500 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors duration-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
