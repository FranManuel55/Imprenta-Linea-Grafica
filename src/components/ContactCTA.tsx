"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
} from "lucide-react";
import { whatsappNumber, phoneNumber, serviceRegions } from "@/lib/data";

export default function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hola! Soy ${formData.name}.\n\n${formData.message}\n\nMi email: ${formData.email}\nMi teléfono: ${formData.phone}`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );
  };

  return (
    <section className="py-20 lg:py-28 bg-neutral-50" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-red-600 font-semibold text-sm uppercase tracking-[0.15em] mb-3"
            >
              Contactanos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 line-decoration"
            >
              Empezá tu proyecto <span className="text-gradient-red">hoy</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-neutral-500 text-lg mb-10 leading-relaxed"
            >
              Contactanos por WhatsApp, teléfono o completá el formulario y te
              responderemos a la brevedad con un presupuesto personalizado.
            </motion.p>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: <MessageCircle className="w-5 h-5" />,
                  label: "WhatsApp",
                  value: whatsappNumber.replace("+549", "+54 9 "),
                  href: `https://wa.me/${whatsappNumber}`,
                  color: "bg-green-50 text-green-600 border-green-200",
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  label: "Teléfono",
                  value: phoneNumber,
                  href: `tel:${phoneNumber}`,
                  color: "bg-red-50 text-red-600 border-red-200",
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  value: "info@imprentalineagrafica.com.ar",
                  href: "mailto:info@imprentalineagrafica.com.ar",
                  color: "bg-neutral-100 text-neutral-600 border-neutral-200",
                },
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.label === "WhatsApp" ? "_blank" : undefined}
                  rel={
                    contact.label === "WhatsApp"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-neutral-200 hover:border-red-300 hover:shadow-md transition-all duration-300 group"
                >
                  <div
                    className={`p-3 rounded-xl ${contact.color} border transition-colors duration-300`}
                  >
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 font-medium">
                      {contact.label}
                    </p>
                    <p className="text-neutral-900 font-semibold group-hover:text-red-600 transition-colors duration-300">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Service Regions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 p-5 rounded-xl bg-white border border-neutral-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-neutral-900">
                  Cobertura de entrega
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {serviceRegions.map((region) => (
                  <span
                    key={region}
                    className="px-3 py-1.5 bg-neutral-50 text-neutral-600 text-xs font-medium rounded-lg border border-neutral-200"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100"
            >
              <Clock className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Lunes a Viernes: 9:00 - 18:00
                </p>
                <p className="text-xs text-neutral-500">
                  Sábados: 9:00 - 13:00
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm"
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-6">
                Pedí tu presupuesto
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 mb-1.5"
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-300 text-neutral-900 text-sm"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-300 text-neutral-900 text-sm"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-300 text-neutral-900 text-sm"
                      placeholder="+54 261..."
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 mb-1.5"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-300 text-neutral-900 text-sm resize-none"
                    placeholder="Contanos qué necesitás: tipo de producto, cantidad, diseño..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  Enviar por WhatsApp
                </button>

                <p className="text-xs text-neutral-400 text-center mt-2">
                  Al enviar, se abrirá WhatsApp con tu mensaje prearmado.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
