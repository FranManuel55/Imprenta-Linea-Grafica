export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  features?: string[];
  sizes?: string[];
  colors?: string[];
  minOrder?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  comment: string;
  rating: number;
  avatar: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Bolsas",
    description: "Bolsas personalizadas en friselina, papel y tela",
    image: "/images/cat-bolsas.png",
    productCount: 24,
    slug: "bolsas",
  },
  {
    id: "2",
    name: "Etiquetas",
    description: "Etiquetas adhesivas y colgantes para tus productos",
    image: "/images/cat-etiquetas.png",
    productCount: 36,
    slug: "etiquetas",
  },
  {
    id: "3",
    name: "Stickers",
    description: "Stickers troquelados y en plancha, vinilo y papel",
    image: "/images/cat-stickers.png",
    productCount: 18,
    slug: "stickers",
  },
  {
    id: "4",
    name: "Tarjetas",
    description: "Tarjetas personales, comerciales y de presentación",
    image: "/images/cat-tarjetas.png",
    productCount: 15,
    slug: "tarjetas",
  },
  {
    id: "5",
    name: "Folletería",
    description: "Folletos, trípticos y material publicitario impreso",
    image: "/images/cat-folleteria.png",
    productCount: 12,
    slug: "folleteria",
  },
  {
    id: "6",
    name: "Packaging",
    description: "Cajas y empaques personalizados para tu marca",
    image: "/images/cat-packaging.png",
    productCount: 20,
    slug: "packaging",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Bolsa Friselina Estampada",
    description: "Bolsa de tela friselina con impresión a 1 color. Resistente y reutilizable, ideal para comercios.",
    price: 850,
    originalPrice: 1200,
    image: "/images/cat-bolsas.png",
    category: "bolsas",
    badge: "Más Vendido",
    rating: 4.8,
    reviewCount: 124,
    sizes: ["30x30", "30x40", "45x40", "60x40"],
    colors: ["Blanco", "Negro", "Rojo", "Natural"],
    minOrder: 100,
    features: ["Impresión serigráfica", "Material resistente", "Reutilizable", "Personalización completa"],
  },
  {
    id: "2",
    name: "Etiquetas Adhesivas Premium",
    description: "Etiquetas autoadhesivas de alta calidad para productos. Impresión full color en papel ilustración.",
    price: 2500,
    image: "/images/cat-etiquetas.png",
    category: "etiquetas",
    badge: "Nuevo",
    rating: 4.9,
    reviewCount: 89,
    sizes: ["5x3 cm", "7x5 cm", "10x7 cm", "Personalizado"],
    minOrder: 500,
    features: ["Full color", "Resistente al agua", "Adhesivo permanente", "Troquelado incluido"],
  },
  {
    id: "3",
    name: "Stickers Troquelados",
    description: "Stickers con corte a medida en vinilo de alta durabilidad. Ideales para branding y packaging.",
    price: 1800,
    originalPrice: 2200,
    image: "/images/cat-stickers.png",
    category: "stickers",
    badge: "Oferta",
    rating: 4.7,
    reviewCount: 67,
    sizes: ["3x3 cm", "5x5 cm", "7x7 cm", "10x10 cm"],
    minOrder: 200,
    features: ["Vinilo premium", "Corte troquelado", "Resistente UV", "Full color"],
  },
  {
    id: "4",
    name: "Tarjetas Personales Premium",
    description: "Tarjetas de presentación en cartulina de 350g con terminación mate o brillante.",
    price: 3500,
    image: "/images/cat-tarjetas.png",
    category: "tarjetas",
    rating: 4.9,
    reviewCount: 156,
    sizes: ["9x5 cm", "8.5x5.5 cm"],
    minOrder: 500,
    features: ["Cartulina 350g", "Laminado mate/brillo", "Full color ambos lados", "Diseño incluido"],
  },
  {
    id: "5",
    name: "Folletos Tríptico A4",
    description: "Folletos trípticos impresos en papel ilustración de 150g, full color ambas caras.",
    price: 4200,
    originalPrice: 5000,
    image: "/images/cat-folleteria.png",
    category: "folleteria",
    badge: "Popular",
    rating: 4.6,
    reviewCount: 43,
    sizes: ["A4 (tríptico)", "A5", "10x21 cm"],
    minOrder: 250,
    features: ["Papel ilustración 150g", "Full color 2 caras", "Plegado incluido", "Diseño personalizado"],
  },
  {
    id: "6",
    name: "Cajas Personalizadas",
    description: "Cajas de cartón corrugado o microcorrugado con impresión personalizada para tu marca.",
    price: 5800,
    image: "/images/cat-packaging.png",
    category: "packaging",
    badge: "Premium",
    rating: 4.8,
    reviewCount: 31,
    sizes: ["15x15x10 cm", "20x15x10 cm", "30x20x15 cm", "Personalizado"],
    minOrder: 50,
    features: ["Cartón de alta resistencia", "Impresión exterior", "Diseño estructural", "Protección garantizada"],
  },
  {
    id: "7",
    name: "Bolsa Papel Craft",
    description: "Bolsa de papel craft con manija reforzada. Impresión a 1 o 2 colores.",
    price: 650,
    image: "/images/cat-bolsas.png",
    category: "bolsas",
    rating: 4.5,
    reviewCount: 78,
    sizes: ["22x10x27 cm", "26x12x32 cm", "32x14x42 cm"],
    minOrder: 200,
    features: ["Papel craft 120g", "Manija reforzada", "Eco-friendly", "Personalizable"],
  },
  {
    id: "8",
    name: "Etiquetas Colgantes",
    description: "Tags colgantes de cartulina premium con hilo, ideales para indumentaria y regalería.",
    price: 1200,
    originalPrice: 1500,
    image: "/images/cat-etiquetas.png",
    category: "etiquetas",
    badge: "Oferta",
    rating: 4.7,
    reviewCount: 52,
    sizes: ["4x7 cm", "5x9 cm", "6x10 cm"],
    minOrder: 300,
    features: ["Cartulina 300g", "Hilo incluido", "Troquelado", "Impresión ambas caras"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María López",
    business: "Boutique Sofi",
    comment: "Las bolsas que nos hicieron son espectaculares. Nuestros clientes siempre preguntan dónde las conseguimos. ¡Excelente calidad y atención!",
    rating: 5,
    avatar: "ML",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    business: "Vinoteca del Valle",
    comment: "Trabajamos con Línea Gráfica hace más de 2 años. Las etiquetas para nuestros vinos son impecables. Muy profesionales.",
    rating: 5,
    avatar: "CM",
  },
  {
    id: "3",
    name: "Ana Gutiérrez",
    business: "Callejón Bistró",
    comment: "Desde las tarjetas hasta el packaging, todo lo que necesitamos para nuestro restaurante lo resolvieron rápido y con una calidad increíble.",
    rating: 5,
    avatar: "AG",
  },
  {
    id: "4",
    name: "Roberto Sánchez",
    business: "Urban Style",
    comment: "Los stickers para nuestra marca quedaron brutales. La calidad del vinilo es excelente y los colores son exactos. 100% recomendable.",
    rating: 4,
    avatar: "RS",
  },
];

export const serviceRegions = [
  "Gran Mendoza",
  "Luján de Cuyo",
  "Maipú",
  "Tunuyán",
  "Tupungato",
  "San Luis",
  "San Juan",
];

export const whatsappNumber = "+5492616093856";
export const phoneNumber = "+54 2616093856";
