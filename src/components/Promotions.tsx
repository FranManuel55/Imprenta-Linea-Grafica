"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageCircle, Clock, Percent, Gift } from "lucide-react";
import { whatsappNumber } from "@/lib/data";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endOfMonth.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {units.map((unit, index) => (
        <div key={unit.label} className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-white/10 min-w-[56px]">
            <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-red-200 mt-1.5 block font-medium">
            {unit.label}
          </span>
          {index < units.length - 1 && (
            <span className="hidden" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Promotions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const promos = [
    {
      icon: <Percent className="w-6 h-6" />,
      title: "20% OFF",
      desc: "En tu primer pedido de bolsas",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Diseño gratis",
      desc: "En pedidos mayores a 500 unidades",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Entrega express",
      desc: "Disponible para Gran Mendoza",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-red-800" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djEwSDI2VjM0aDEwek0yNiAyNHYxMEgxNlYyNGgxMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-900/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/20 text-white/80 text-sm font-medium mb-6"
          >
            <Clock className="w-4 h-4" />
            Oferta por tiempo limitado
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
          >
            ¡Promociones del Mes!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-red-100 text-lg mb-10 max-w-xl mx-auto"
          >
            Para que sigas creciendo con Línea Gráfica
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mb-12"
          >
            <CountdownTimer />
          </motion.div>

          {/* Promo Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
            {promos.map((promo, index) => (
              <motion.div
                key={promo.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-white/10 text-white mb-3">
                  {promo.icon}
                </div>
                <h3 className="text-white font-bold text-lg">{promo.title}</h3>
                <p className="text-red-100 text-sm mt-1">{promo.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola! Quiero consultar por las promociones del mes")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-700 font-bold rounded-2xl hover:bg-neutral-100 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 active:scale-95 text-base animate-pulse-red"
          >
            <MessageCircle className="w-5 h-5" />
            Pedí las Promociones por WhatsApp
          </motion.a>
        </div>
      </div>
    </section>
  );
}
