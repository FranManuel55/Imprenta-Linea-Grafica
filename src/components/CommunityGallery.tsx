"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/lib/data";

const galleryImages = [
  { src: "/images/1.jpeg", alt: "Bolsa Sofi Tienda & Regalería", category: "Bolsas Ecológicas" },
  { src: "/images/2.jpeg", alt: "Bolsa Pücheritos Baby Kids", category: "Bolsas de Friselina" },
  { src: "/images/3.jpeg", alt: "Bolsa Tierra Clothes", category: "Bolsas Ecológicas" },
  { src: "/images/4.jpeg", alt: "Bolsa Ficción - Streetwear", category: "Bolsas de Tela" },
  { src: "/images/5.jpeg", alt: "Bolsa Badalo Concept Store", category: "Bolsas de Friselina" },
];

export default function CommunityGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null
    );

  return (
    <section className="py-20 lg:py-28 bg-neutral-950" id="comunidad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-red-500 font-semibold text-sm uppercase tracking-[0.15em] mb-3"
          >
            Nuestros trabajos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Haciendo tu{" "}
            <span className="text-gradient-red">Comunidad</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto"
          >
            Tus bolsas hablan por tu marca. Nuestras ecológicas y de friselina son publicidad reutilizable que camina por la ciudad, impulsando tu presencia a donde vayan tus clientes.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden"
              onClick={() => openLightbox(index)}
            >
              <div
                className={`relative ${
                  index % 3 === 0
                    ? "aspect-[3/4]"
                    : index % 3 === 1
                    ? "aspect-square"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                    {img.category}
                  </span>
                  <p className="text-white text-sm font-medium mt-1">
                    {img.alt}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-600/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="text-red-400 text-sm font-semibold">
                {galleryImages[lightboxIndex].category}
              </span>
              <p className="text-white text-base mt-1">
                {galleryImages[lightboxIndex].alt}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
