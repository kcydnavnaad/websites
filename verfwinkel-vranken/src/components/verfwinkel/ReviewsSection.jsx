import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Johan De Smet',
    location: 'Antwerpen',
    rating: 5,
    text: 'Topadvies en prachtige kleuren! De medewerkers namen alle tijd om de perfecte kleur voor onze woonkamer te vinden. Resultaat is geweldig!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80'
  },
  {
    id: 2,
    name: 'Marie Janssens',
    location: 'Mechelen',
    rating: 5,
    text: 'Super vriendelijke service, altijd correcte uitleg. Ze helpen ook met de technische kant - welke primer, hoeveel lagen, etc. Aanrader!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80'
  },
  {
    id: 3,
    name: 'Peter Willems',
    location: 'Lier',
    rating: 5,
    text: 'Al 10 jaar vaste klant. De kwaliteit van de verf en het advies is ongeëvenaard. Ook voor mijn professionele projecten ga ik nergens anders.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80'
  },
  {
    id: 4,
    name: 'Lisa Van den Berg',
    location: 'Kontich',
    rating: 5,
    text: 'De kleurmengservice is fantastisch! Precies de tint die ik zocht voor mijn slaapkamer. En de verf dekt echt in twee lagen zoals beloofd.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
  }
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#1F2A44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8960C] font-semibold tracking-wider uppercase text-sm">Ervaringen</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
            Wat klanten zeggen
          </h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[#C8960C] text-[#C8960C]" />
            ))}
          </div>
          <p className="text-white/60">Gemiddeld 4.9 uit 5 sterren</p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#C8960C]/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C8960C] text-[#C8960C]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#C8960C]"
                />
                <div>
                  <h4 className="font-semibold text-white">{review.name}</h4>
                  <p className="text-white/50 text-sm">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}