"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { whatsappNumber } from "@/lib/data";

export default function WhatsAppButton() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [hasShownTooltip, setHasShownTooltip] = useState(false);

  useEffect(() => {
    if (!hasShownTooltip) {
      const timer = setTimeout(() => {
        setIsTooltipVisible(true);
        setHasShownTooltip(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasShownTooltip]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="relative bg-white rounded-2xl shadow-xl shadow-black/10 p-4 max-w-[240px] border border-neutral-100"
          >
            <button
              onClick={() => setIsTooltipVisible(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm text-neutral-700 font-medium">
              ¡Hola! 👋 ¿Necesitás un presupuesto? Escribinos por WhatsApp.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola! Quiero consultar por un presupuesto")}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 1, stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 animate-pulse-red"
        style={{
          animationName: "none",
          boxShadow: "0 4px 20px rgba(34, 197, 94, 0.4)",
        }}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
    </div>
  );
}
