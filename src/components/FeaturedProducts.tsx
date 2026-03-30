"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Eye } from "lucide-react";
import { products } from "@/lib/data";

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-neutral-200 hover:border-red-200 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-red-600/5"
    >
      {/* Badge */}
      {product.badge && (
        <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
          product.badge === "Oferta" ? "bg-red-600 text-white" :
          product.badge === "Nuevo" ? "bg-neutral-900 text-white" :
          product.badge === "Más Vendido" ? "bg-red-100 text-red-700" :
          "bg-neutral-100 text-neutral-700"
        }`}>
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Quick Actions Overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-neutral-950/20 flex items-center justify-center gap-3"
        >
          <Link
            href={`/producto/${product.id}`}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-red-600 hover:text-white text-neutral-900 transition-all duration-300 transform hover:scale-110"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button className="p-3 bg-white rounded-full shadow-lg hover:bg-red-600 hover:text-white text-neutral-900 transition-all duration-300 transform hover:scale-110">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-red-600 font-semibold mb-2">
          {product.category}
        </p>
        <h3 className="font-bold text-neutral-900 text-base mb-2 group-hover:text-red-600 transition-colors duration-300">
          <Link href={`/producto/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-neutral-500 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-neutral-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-neutral-900">
              ${product.price.toLocaleString("es-AR")}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice.toLocaleString("es-AR")}
              </span>
            )}
          </div>
          {product.minOrder && (
            <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
              Mín. {product.minOrder} u.
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-28 bg-neutral-50" id="ofertas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-red-600 font-semibold text-sm uppercase tracking-[0.15em] mb-3"
            >
              Lo más pedido
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 line-decoration"
            >
              Productos Destacados
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-300 hover:border-red-600 text-neutral-700 hover:text-red-600 rounded-xl font-medium text-sm transition-all duration-300"
            >
              Ver todo el catálogo
              <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
