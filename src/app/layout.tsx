import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Imprenta Línea Gráfica | Impresión Premium en Mendoza",
    template: "%s | Línea Gráfica",
  },
  description:
    "Impresión y diseño de bolsas personalizadas, tarjetas, etiquetas, stickers y folletería para empresas y comercios. Calidad premium en Mendoza, San Luis y San Juan.",
  keywords: [
    "imprenta",
    "mendoza",
    "bolsas personalizadas",
    "etiquetas",
    "stickers",
    "tarjetas",
    "folletería",
    "packaging",
    "impresión",
    "diseño gráfico",
  ],
  openGraph: {
    title: "Imprenta Línea Gráfica",
    description:
      "Impresión premium de bolsas, etiquetas, stickers, tarjetas y packaging para tu negocio.",
    type: "website",
    locale: "es_AR",
    siteName: "Imprenta Línea Gráfica",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
