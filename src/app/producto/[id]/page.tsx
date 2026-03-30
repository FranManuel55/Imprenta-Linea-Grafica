"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  Check,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  Shield,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { products, whatsappNumber } from "@/lib/data";

export default function ProductoPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex-1 pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Producto no encontrado
            </h1>
            <Link
              href="/catalogo"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              ← Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleWhatsAppOrder = () => {
    const message = `Hola! Me interesa el producto: ${product.name}${
      selectedSize ? ` - Medida: ${selectedSize}` : ""
    } - Cantidad: ${quantity} unidades. ¿Podrían darme más información?`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-20 lg:pt-24 bg-white">
        {/* Breadcrumb */}
        <div className="bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-neutral-500">
              <Link
                href="/"
                className="hover:text-red-600 transition-colors"
              >
                Inicio
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                href="/catalogo"
                className="hover:text-red-600 transition-colors"
              >
                Catálogo
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-neutral-900 font-medium truncate">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.badge && (
                  <div
                    className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-semibold ${
                      product.badge === "Oferta"
                        ? "bg-red-600 text-white"
                        : product.badge === "Nuevo"
                        ? "bg-neutral-900 text-white"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.badge}
                  </div>
                )}
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-3">
                {[product.image, product.image, product.image].map(
                  (img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        activeImage === i
                          ? "border-red-600 shadow-md"
                          : "border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Vista ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  )
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="text-sm uppercase tracking-wider text-red-600 font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-500">
                  {product.rating} ({product.reviewCount} reseñas)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-neutral-900">
                  ${product.price.toLocaleString("es-AR")}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-neutral-400 line-through">
                      ${product.originalPrice.toLocaleString("es-AR")}
                    </span>
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                      -
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100
                      )}
                      %
                    </span>
                  </>
                )}
              </div>

              <p className="text-neutral-600 text-base leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Sizes */}
              {product.sizes && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                    Medida
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                          selectedSize === size
                            ? "border-red-600 bg-red-50 text-red-700"
                            : "border-neutral-300 text-neutral-700 hover:border-neutral-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                  Cantidad
                  {product.minOrder && (
                    <span className="font-normal text-neutral-500 ml-2">
                      (Mín. {product.minOrder} unidades)
                    </span>
                  )}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() =>
                        setQuantity(Math.max(product.minOrder || 1, quantity - (product.minOrder ? 50 : 1)))
                      }
                      className="p-3 hover:bg-neutral-50 transition-colors border-r border-neutral-300"
                    >
                      <Minus className="w-4 h-4 text-neutral-600" />
                    </button>
                    <span className="px-6 py-3 text-sm font-semibold text-neutral-900 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + (product.minOrder ? 50 : 1))}
                      className="p-3 hover:bg-neutral-50 transition-colors border-l border-neutral-300"
                    >
                      <Plus className="w-4 h-4 text-neutral-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Consultar por WhatsApp
                </button>
                <button className="p-4 border border-neutral-300 hover:border-red-300 rounded-2xl transition-all duration-300 hover:bg-red-50 group">
                  <Heart className="w-5 h-5 text-neutral-500 group-hover:text-red-600 transition-colors" />
                </button>
                <button className="p-4 border border-neutral-300 hover:border-neutral-400 rounded-2xl transition-all duration-300 hover:bg-neutral-50">
                  <Share2 className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {/* Features */}
              {product.features && (
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 mb-6">
                  <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                    Características
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-neutral-600"
                      >
                        <Check className="w-4 h-4 text-red-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <Truck className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">
                      Entrega a domicilio
                    </p>
                    <p className="text-[10px] text-neutral-500">
                      En todo Cuyo
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <Shield className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">
                      Calidad garantizada
                    </p>
                    <p className="text-[10px] text-neutral-500">
                      100% satisfacción
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-neutral-200">
              <h2 className="text-2xl font-bold text-neutral-900 mb-8 line-decoration">
                Productos Relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/producto/${rp.id}`}
                    className="group bg-white rounded-2xl border border-neutral-200 hover:border-red-200 overflow-hidden transition-all duration-500 hover:shadow-lg"
                  >
                    <div className="relative aspect-square overflow-hidden bg-neutral-50">
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-wider text-red-600 font-semibold mb-1">
                        {rp.category}
                      </p>
                      <h3 className="font-bold text-neutral-900 text-sm group-hover:text-red-600 transition-colors">
                        {rp.name}
                      </h3>
                      <span className="text-lg font-bold text-neutral-900 mt-2 block">
                        ${rp.price.toLocaleString("es-AR")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
