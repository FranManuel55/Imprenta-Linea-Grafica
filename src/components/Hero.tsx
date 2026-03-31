"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt="Productos de imprenta premium"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80" />
      </div>

      {/* Animated Red Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600/30 bg-red-600/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-red-400" />
          <span className="text-sm text-red-300 font-medium">
            Impresión Premium para tu Negocio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
        >
          Impresión que{" "}
          <span className="text-gradient-red">Marca</span>
          <br />
          la Diferencia
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
        >
          Bolsas, etiquetas, stickers, tarjetas y packaging personalizado.
          <br className="hidden sm:block" />{" "}
          Diseño, producción y entrega para empresas en todo Cuyo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/catalogo"
            className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/30 active:scale-95 text-base flex items-center gap-2"
          >
            Ver Catálogo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <a
            href={`https://wa.me/+5492616093856?text=${encodeURIComponent("Hola! Quiero pedir un presupuesto")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-neutral-700 hover:border-neutral-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:bg-white/5 active:scale-95 text-base"
          >
            Pedir Presupuesto
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "20+", label: "Años de experiencia" },
            { value: "500+", label: "Clientes satisfechos" },
            { value: "100K+", label: "Productos entregados" },
            { value: "7", label: "Ciudades atendidas" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-neutral-500 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-neutral-600 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
