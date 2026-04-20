import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, ArrowRight } from "lucide-react";

const benefits = [
  "Persoonlijke kleurenconsultatie",
  "Advies over lichtinval en sfeer",
  "Perfecte kleurencombinaties",
  "Tips voor afwerking en textuur",
  "Gratis kleurstalen mee naar huis"
];

export default function ColorAdviceSection() {
  return (
    <section id="kleuradvies" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#D7A22A]/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#D7A22A]" />
              <span className="text-[#D7A22A] font-semibold text-sm">Onze Specialiteit</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-6 leading-tight">
              Kleuradvies<br />op maat
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              De juiste kleur kiezen is meer dan alleen een tint selecteren. Bij Verfwinkel 
              Vranken helpen onze kleurexperts u met het creëren van de perfecte sfeer in 
              uw ruimte.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We houden rekening met lichtinval, bestaande elementen, uw persoonlijke stijl 
              en de gewenste sfeer. Zo zorgen we ervoor dat u altijd de perfecte kleur vindt.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 mb-10">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 bg-[#D7A22A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#D7A22A]" />
                  </span>
                  <span className="text-gray-700">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <Button 
              size="lg"
              asChild
              className="bg-[#D7A22A] hover:bg-[#c4941f] text-[#1F2A44] font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-[#D7A22A]/25 transition-all hover:scale-105 group"
            >
              <a href="https://wa.me/32123456789" target="_blank" rel="noopener noreferrer">
                Maak een afspraak
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
                alt="Kleuradvies"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/30 to-transparent" />
            </div>

            {/* Floating Color Samples */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -left-8 top-1/4 flex flex-col gap-2"
            >
              {['#1F2A44', '#D7A22A', '#A0522D', '#5F9EA0', '#DEB887'].map((color, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, x: 10 }}
                  className="w-12 h-12 rounded-xl shadow-lg cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-8 -right-8 w-full h-full bg-[#D7A22A]/10 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}