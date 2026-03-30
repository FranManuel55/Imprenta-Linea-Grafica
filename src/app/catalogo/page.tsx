"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  ShoppingBag,
  Eye,
  X,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { products, categories } from "@/lib/data";
import type { Product } from "@/lib/data";

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <>
      <Header />
      <main className="flex-1 pt-20 lg:pt-24 bg-white">
        {/* Page Header */}
        <div className="bg-neutral-950 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                Catálogo de{" "}
                <span className="text-gradient-red">Productos</span>
              </h1>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto">
                Explorá toda nuestra línea de productos de impresión y diseño
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-300 text-sm"
                  />
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-3">
                    Categorías
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedCategory === "all"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                      }`}
                    >
                      Todos los productos
                      <span className="float-right text-xs text-neutral-400">
                        {products.length}
                      </span>
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedCategory === cat.slug
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                        }`}
                      >
                        {cat.name}
                        <span className="float-right text-xs text-neutral-400">
                          {products.filter((p) => p.category === cat.slug).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-neutral-300 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtros
                  </button>

                  <p className="text-sm text-neutral-500">
                    <span className="font-semibold text-neutral-900">
                      {filteredProducts.length}
                    </span>{" "}
                    productos encontrados
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none px-4 pr-8 py-2.5 border border-neutral-300 rounded-xl text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all cursor-pointer"
                    >
                      <option value="featured">Destacados</option>
                      <option value="price-asc">Menor precio</option>
                      <option value="price-desc">Mayor precio</option>
                      <option value="name">Nombre A-Z</option>
                      <option value="rating">Mejor valorados</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center border border-neutral-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2.5 transition-colors ${
                        viewMode === "grid"
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-500 hover:bg-neutral-50"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2.5 transition-colors ${
                        viewMode === "list"
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-500 hover:bg-neutral-50"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory !== "all" || searchQuery) && (
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <span className="text-sm text-neutral-500">Filtros:</span>
                  {selectedCategory !== "all" && (
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-xs font-medium hover:bg-red-100 transition-colors"
                    >
                      {categories.find((c) => c.slug === selectedCategory)?.name}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium hover:bg-neutral-200 transition-colors"
                    >
                      &ldquo;{searchQuery}&rdquo;
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        {viewMode === "grid" ? (
                          <GridCard product={product} />
                        ) : (
                          <ListCard product={product} />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-neutral-500 text-sm">
                    Intentá con otros filtros o términos de búsqueda
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
            >
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-neutral-900">
                    Filtros
                  </h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 rounded-xl hover:bg-neutral-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-300 text-sm"
                  />
                </div>

                {/* Categories */}
                <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-3">
                  Categorías
                </h4>
                <div className="space-y-1 mb-6">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === "all"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    Todos los productos
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === cat.slug
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "text-neutral-600 hover:bg-neutral-50"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function GridCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl border border-neutral-200 hover:border-red-200 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-red-600/5"
    >
      {product.badge && (
        <div
          className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
            product.badge === "Oferta"
              ? "bg-red-600 text-white"
              : product.badge === "Nuevo"
              ? "bg-neutral-900 text-white"
              : product.badge === "Más Vendido"
              ? "bg-red-100 text-red-700"
              : "bg-neutral-100 text-neutral-700"
          }`}
        >
          {product.badge}
        </div>
      )}

      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-neutral-950/20 flex items-center justify-center gap-3"
        >
          <Link
            href={`/producto/${product.id}`}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-red-600 hover:text-white text-neutral-900 transition-all duration-300"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button className="p-3 bg-white rounded-full shadow-lg hover:bg-red-600 hover:text-white text-neutral-900 transition-all duration-300">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-red-600 font-semibold mb-2">
          {product.category}
        </p>
        <h3 className="font-bold text-neutral-900 text-base mb-2 group-hover:text-red-600 transition-colors">
          <Link href={`/producto/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-neutral-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
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
          <span className="text-xs text-neutral-500">({product.reviewCount})</span>
        </div>
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
      </div>
    </div>
  );
}

function ListCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col sm:flex-row bg-white rounded-2xl border border-neutral-200 hover:border-red-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative w-full sm:w-48 aspect-video sm:aspect-square flex-shrink-0 overflow-hidden bg-neutral-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <div
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
              product.badge === "Oferta"
                ? "bg-red-600 text-white"
                : "bg-neutral-900 text-white"
            }`}
          >
            {product.badge}
          </div>
        )}
      </div>
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-red-600 font-semibold mb-1">
            {product.category}
          </p>
          <h3 className="font-bold text-neutral-900 text-lg mb-2 group-hover:text-red-600 transition-colors">
            <Link href={`/producto/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-neutral-500 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-1.5">
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
            <span className="text-xs text-neutral-500 ml-1">({product.reviewCount})</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
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
          <div className="flex items-center gap-2">
            <Link
              href={`/producto/${product.id}`}
              className="px-4 py-2 bg-neutral-900 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Ver detalle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
