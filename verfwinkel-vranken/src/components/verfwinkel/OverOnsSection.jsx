import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Paintbrush, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Jarenlange ervaring',
    description: 'Meer dan 35 jaar expertise in verf en afwerking'
  },
  {
    icon: Users,
    title: 'Persoonlijk advies',
    description: 'Deskundig advies afgestemd op uw project'
  },
  {
    icon: Paintbrush,
    title: 'Breed assortiment',
    description: 'Van binnenverf tot buitenbeits en alles ertussen'
  },
  {
    icon: ThumbsUp,
    title: 'Voor iedereen',
    description: 'Zowel doe-het-zelvers als professionals'
  }
];

export default function OverOnsSection() {
  return (
    <section id="over-ons" className="py-24 lg:py-32 bg-[#FEFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80"
                alt="Kleuradvies in de winkel"
                className="w-full h-[500px] object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#C8960C] text-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">35+</p>
                <p className="text-sm font-medium">Jaar ervaring</p>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -z-10 -top-6 -left-6 w-full h-full border-2 border-[#1F2A44]/10 rounded-2xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C8960C] font-semibold tracking-wider uppercase text-sm">Over ons</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2A44] mt-3 mb-6 leading-tight">
              Specialist in kleur & vakmanschap
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Bij Verfwinkel Vranken combineren we jarenlange ervaring met een passie voor kleur. 
              Sinds 1985 helpen wij particulieren en professionals met het vinden van de perfecte 
              verf en materialen voor elk project. Van een simpele opfrisbeurt tot een complete 
              renovatie – wij staan voor u klaar met deskundig advies en topkwaliteit producten.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex gap-4 items-start p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1F2A44] rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[#C8960C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1F2A44] mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}