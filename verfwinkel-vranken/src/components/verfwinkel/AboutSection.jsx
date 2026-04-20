import React from 'react';
import { motion } from "framer-motion";
import { Award, Users, Palette, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Award, value: "35+", label: "Jaar ervaring" },
  { icon: Users, value: "10.000+", label: "Tevreden klanten" },
  { icon: Palette, value: "5.000+", label: "Kleuren beschikbaar" },
  { icon: ThumbsUp, value: "100%", label: "Persoonlijk advies" },
];

export default function AboutSection() {
  return (
    <section id="over-ons" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80"
                alt="Verfwinkel interieur"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-[#D7A22A] text-[#1F2A44] p-6 rounded-2xl shadow-xl"
            >
              <p className="text-4xl font-bold">1985</p>
              <p className="text-sm font-medium opacity-80">Opgericht</p>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -z-10 top-8 -left-8 w-full h-full bg-[#EFEFEF] rounded-3xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[#D7A22A] font-semibold tracking-wider uppercase text-sm mb-4">
              Over Ons
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-6 leading-tight">
              Specialist in kleur & vakmanschap
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Al meer dan 35 jaar is Verfwinkel Vranken dé referentie voor kwaliteitsverf 
              en professioneel kleuradvies. Onze passie voor kleur en oog voor detail 
              maken van elk project een succes.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Of u nu een doe-het-zelver bent die zijn woonkamer een nieuwe look wilt geven, 
              of een professionele schilder op zoek naar de beste materialen – bij ons bent 
              u aan het juiste adres. Ons deskundig team staat klaar met persoonlijk advies 
              op maat.
            </p>

            {/* Key Points */}
            <ul className="space-y-4 mb-8">
              {[
                "Jarenlange ervaring en expertise",
                "Persoonlijk advies op maat",
                "Breed assortiment binnen- & buitenverf",
                "Partner voor zowel particulieren als professionals"
              ].map((point, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-3"
                >
                  <span className="w-2 h-2 bg-[#D7A22A] rounded-full" />
                  <span className="text-gray-700">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 bg-[#1F2A44] rounded-3xl p-8 md:p-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 text-[#D7A22A] mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}