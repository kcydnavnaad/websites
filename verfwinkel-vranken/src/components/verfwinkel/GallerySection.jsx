import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    title: "Moderne woonkamer",
    category: "Interieur"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800&q=80",
    title: "Gevelrenovatie",
    category: "Exterieur"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    title: "Slaapkamer makeover",
    category: "Interieur"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80",
    title: "Houtafwerking",
    category: "Houtwerk"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    title: "Keukenrenovatie",
    category: "Interieur"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    title: "Accent muren",
    category: "Decoratie"
  },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(projects[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
    setSelectedImage(projects[newIndex]);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(newIndex);
    setSelectedImage(projects[newIndex]);
  };

  return (
    <section id="realisaties" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#D7A22A] font-semibold tracking-wider uppercase text-sm mb-4">
            Inspiratie
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-6">
            Onze Realisaties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Laat u inspireren door projecten van onze klanten, 
            gerealiseerd met onze verf en ons advies.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-[#D7A22A] text-[#1F2A44] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-10"
              >
                <X className="w-8 h-8" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-6 text-white/80 hover:text-white p-2 z-10"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-6 text-white/80 hover:text-white p-2 z-10"
              >
                <ChevronRight className="w-10 h-10" />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl max-h-[80vh]"
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain rounded-xl"
                />
                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
                  <p className="text-white/60">{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}