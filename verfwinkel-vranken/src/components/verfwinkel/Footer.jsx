import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#1F2A44] py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C8960C] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-white font-semibold">Verfwinkel Vranken</span>
          </div>
          
          <p className="text-white/50 text-sm text-center">
            © {new Date().getFullYear()} Verfwinkel Vranken. Alle rechten voorbehouden.
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/50 hover:text-[#C8960C] transition-colors">Privacy</a>
            <a href="#" className="text-white/50 hover:text-[#C8960C] transition-colors">Voorwaarden</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}