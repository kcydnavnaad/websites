import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Lightbulb, Eye, Sparkles, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Lightbulb,
    title: 'Verlichting & sfeer',
    description: 'Hoe kleuren reageren op natuurlijk en kunstmatig licht'
  },
  {
    icon: Eye,
    title: 'Kleurcombinaties',
    description: 'Harmonieuze paletten die bij uw interieur passen'
  },
  {
    icon: Sparkles,
    title: 'Afwerkingen',
    description: 'Mat, zijdeglans of hoogglans - de juiste keuze'
  }
];

export default function KleuradviesSection() {
  return (
    <section id="kleuradvies" className="py-24 lg:py-32 bg-[#FEFDFB] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C8960C]/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#C8960C]/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#C8960C]" />
              <span className="text-[#C8960C] font-semibold text-sm">Onze specialiteit</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2A44] mb-6 leading-tight">
              Kleuradvies <span className="text-[#C8960C]">op maat</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              De juiste kleur kiezen is meer dan een kleurstaal bekijken. Bij Verfwinkel Vranken 
              helpen we u met professioneel kleuradvies, rekening houdend met verlichting, 
              ruimte en uw persoonlijke stijl. Zowel in de winkel als optioneel bij u thuis.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#1F2A44] rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[#C8960C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1F2A44]">{feature.title}</h4>
                    <p className="text-gray-500 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Button
              asChild
              className="bg-[#C8960C] hover:bg-[#b8860b] text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg group"
            >
              <a href="https://wa.me/32123456789" target="_blank" rel="noopener noreferrer">
                Maak een afspraak
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-2xl shadow-lg overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80"
                    alt="Moderne slaapkamer - voor"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#C8960C] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Voor
                  </div>
                </div>
                <div className="relative rounded-2xl shadow-lg overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"
                    alt="Stijlvolle keuken - na"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Na
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative rounded-2xl shadow-lg overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80"
                    alt="Sfeervolle woonkamer - na"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Na
                  </div>
                </div>
                <div className="relative rounded-2xl shadow-lg overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&q=80"
                    alt="Moderne living - voor"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#C8960C] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Voor
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Color Swatches */}
            <div className="absolute -left-4 top-1/2 flex flex-col gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1F2A44] shadow-lg hover:scale-110 transition-transform cursor-pointer" />
              <div className="w-8 h-8 rounded-lg bg-[#C8960C] shadow-lg hover:scale-110 transition-transform cursor-pointer" />
              <div className="w-8 h-8 rounded-lg bg-[#D4A574] shadow-lg hover:scale-110 transition-transform cursor-pointer" />
              <div className="w-8 h-8 rounded-lg bg-[#8B9DC3] shadow-lg hover:scale-110 transition-transform cursor-pointer" />
              <div className="w-8 h-8 rounded-lg bg-[#A8C5A0] shadow-lg hover:scale-110 transition-transform cursor-pointer" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}