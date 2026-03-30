"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-red-600 font-semibold text-sm uppercase tracking-[0.15em] mb-3"
          >
            Testimonios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 line-decoration-center"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
        </div>

        {/* Desktop: Cards Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              className="relative p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-red-200 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-500 group"
            >
              <Quote className="w-8 h-8 text-red-100 mb-4 group-hover:text-red-200 transition-colors duration-300" />
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-neutral-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-xs font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {testimonial.business}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative p-8 rounded-2xl bg-neutral-50 border border-neutral-200">
              <Quote className="w-10 h-10 text-red-100 mb-4" />
              <p className="text-neutral-600 text-base leading-relaxed mb-6">
                &ldquo;{testimonials[currentIndex].comment}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonials[currentIndex].rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-neutral-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-xs font-bold">
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {testimonials[currentIndex].business}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="p-2.5 rounded-full border border-neutral-300 hover:border-red-600 hover:bg-red-50 text-neutral-500 hover:text-red-600 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "bg-red-600 w-6"
                        : "bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="p-2.5 rounded-full border border-neutral-300 hover:border-red-600 hover:bg-red-50 text-neutral-500 hover:text-red-600 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
