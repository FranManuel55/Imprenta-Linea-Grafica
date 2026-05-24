"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const galleryImages = [
  { src: "/images/1.jpeg", brand: "Sofi Tienda & Regalería", category: "Bolsas Ecológicas", aspect: "aspect-[4/5]" },
  { src: "/images/2.jpeg", brand: "Pücheritos Baby Kids", category: "Bolsas de Friselina", aspect: "aspect-[3/4]" },
  { src: "/images/3.jpeg", brand: "Tierra Clothes", category: "Bolsas Ecológicas", aspect: "aspect-square" },
  { src: "/images/4.jpeg", brand: "Ficción Streetwear", category: "Bolsas de Tela", aspect: "aspect-[4/5]" },
  { src: "/images/5.jpeg", brand: "Badalo Concept Store", category: "Bolsas de Friselina", aspect: "aspect-square" },
  { src: "/images/6.jpeg", brand: "Luna Productos", category: "Bolsas de Papel", aspect: "aspect-[3/4]" },
  { src: "/images/7.jpeg", brand: "Optilux Óptica", category: "Bolsas de Papel", aspect: "aspect-[3/4]" },
  { src: "/images/8.jpeg", brand: "Capibara Rústico Argentino", category: "Bolsas de Papel Kraft", aspect: "aspect-[4/5]" },
  { src: "/images/9.jpeg", brand: "El Rincón de Mónica", category: "Bolsas de Papel Kraft", aspect: "aspect-[3/4]" },
];

export default function CommunityGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % galleryImages.length : null
      ),
    []
  );
  const prevImage = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev !== null
          ? (prev - 1 + galleryImages.length) % galleryImages.length
          : null
      ),
    []
  );

  // Navegación por teclado + bloqueo del scroll de fondo mientras el lightbox está abierto.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

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
            Tus bolsas hablan por tu marca. Nuestras bolsas ecológicas, de friselina y papel son publicidad reutilizable que camina por la ciudad, impulsando tu presencia a donde vayan tus clientes.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className="break-inside-avoid mb-4 sm:mb-5 group cursor-pointer relative rounded-2xl overflow-hidden shadow-lg shadow-black/30"
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${img.aspect}`}>
                <Image
                  src={img.src}
                  alt={`Bolsa personalizada para ${img.brand}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />

                {/* Veladura permanente + intensificación al hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Ícono de zoom */}
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Info de la marca */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                    {img.category}
                  </span>
                  <p className="text-white text-base font-semibold mt-1">
                    {img.brand}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-600/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              aria-label="Cerrar"
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Imagen anterior"
              className="absolute left-4 sm:left-8 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Imagen siguiente"
              className="absolute right-4 sm:right-8 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Contador */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-wider z-10">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            <div
              className="relative w-full max-w-4xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Image
                    src={galleryImages[lightboxIndex].src}
                    alt={`Bolsa personalizada para ${galleryImages[lightboxIndex].brand}`}
                    width={1200}
                    height={1600}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="text-red-400 text-sm font-semibold">
                      {galleryImages[lightboxIndex].category}
                    </span>
                    <p className="text-white text-base font-medium mt-1">
                      {galleryImages[lightboxIndex].brand}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
