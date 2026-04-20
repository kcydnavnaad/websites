import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, ShoppingBag } from 'lucide-react';

export default function CTASection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-[#C8960C] via-[#b8860b] to-[#a87c0a] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/30 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white/20 rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2A44] mb-6 leading-tight">
            Klaar om kleur in je project te brengen?
          </h2>
          <p className="text-xl text-[#1F2A44]/80 mb-10 max-w-2xl mx-auto">
            Bezoek onze winkel voor persoonlijk advies of bekijk ons complete assortiment in de webshop.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToContact}
              className="bg-[#1F2A44] hover:bg-[#2a3a5a] text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-xl group"
            >
              <MapPin className="mr-2 w-5 h-5" />
              Plan je bezoek
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-[#1F2A44] text-[#1F2A44] hover:bg-[#1F2A44] hover:text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 bg-transparent"
            >
              <a href="https://www.webshop-voorbeeld.be" target="_blank" rel="noopener noreferrer">
                <ShoppingBag className="mr-2 w-5 h-5" />
                Ga naar de webshop
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}