import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F2A44]/85 via-[#C8960C]/20 to-[#1F2A44]/80" />
      </div>

      {/* Decorative Paint Drips */}
      <div className="absolute top-0 left-10 w-2 h-32 bg-[#C8960C] rounded-b-full opacity-60" />
      <div className="absolute top-0 left-20 w-3 h-48 bg-[#C8960C] rounded-b-full opacity-40" />
      <div className="absolute top-0 right-16 w-2 h-40 bg-[#C8960C] rounded-b-full opacity-30" />
      <div className="absolute top-0 right-32 w-3 h-24 bg-[#C8960C] rounded-b-full opacity-50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-[#C8960C] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide">Uw lokale verfspecialist</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            Verfwinkel
            <span className="block text-[#C8960C]">Vranken</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 font-light mb-4">
            Kleur, kwaliteit en advies sinds 1985
          </p>

          {/* Tagline */}
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
            Uw specialist in verf, kleuradvies en schildermateriaal voor zowel doe-het-zelvers als professionele schilders.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-[#C8960C] hover:bg-[#b8860b] text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#C8960C]/40 hover:-translate-y-1"
            >
              Bezoek onze winkel
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-[#1F2A44] font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:-translate-y-1 bg-transparent"
            >
              <a href="https://www.webshop-voorbeeld.be" target="_blank" rel="noopener noreferrer">
                Bekijk onze webshop
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('over-ons')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
        >
          <span className="text-sm mb-2 tracking-widest uppercase">Ontdek meer</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}