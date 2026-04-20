import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const projecten = [
  {
    id: 1,
    title: 'Moderne woonkamer',
    category: 'Binnenverf',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    description: 'Warme aardetinten met accentmuur'
  },
  {
    id: 2,
    title: 'Klassieke gevelrenovatie',
    category: 'Buitenverf',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    description: 'Stijlvolle gevelverf in antraciet'
  },
  {
    id: 3,
    title: 'Houten terrasoverkapping',
    category: 'Beits',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'Duurzame bescherming met houtbeits'
  },
  {
    id: 4,
    title: 'Kinderkamer transformatie',
    category: 'Binnenverf',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    description: 'Speelse kleuren voor de kleinsten'
  },
  {
    id: 5,
    title: 'Keukenrenovatie',
    category: 'Binnenverf',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    description: 'Moderne keuken met accentkleuren'
  },
  {
    id: 6,
    title: 'Houten tuinhuis',
    category: 'Beits',
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=80',
    description: 'Bescherming tegen weersinvloeden'
  },
];

export default function RealisatiesSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="realisaties" className="py-24 lg:py-32 bg-[#FEFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8960C] font-semibold tracking-wider uppercase text-sm">Inspiratie</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2A44] mt-3 mb-6">
            Onze realisaties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bekijk enkele van de mooie projecten die met onze verf en advies zijn gerealiseerd.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projecten.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-[#C8960C] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-white/70 text-sm">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#D7A22A] transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="mt-6 text-center">
                <span className="inline-block bg-[#C8960C] text-white text-sm font-semibold px-4 py-1 rounded-full mb-3">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-white/70">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}