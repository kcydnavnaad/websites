import React from 'react';
import { motion } from 'framer-motion';

const merken = [
  { name: 'Sigma', color: '#E30613' },
  { name: 'Levis', color: '#00529B' },
  { name: 'Trimetal', color: '#1B4D3E' },
  { name: 'Sikkens', color: '#F7941D' },
  { name: 'Boss Paints', color: '#C41230' },
  { name: 'Dulux', color: '#003865' },
];

export default function MerkenSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#C8960C] font-semibold tracking-wider uppercase text-sm">Kwaliteitsmerken</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2A44] mt-3">
            Onze topmerken
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {merken.map((merk, index) => (
            <motion.div
              key={merk.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center h-24 cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: merk.color }}
                />
                <span className="font-bold text-[#1F2A44] text-lg">{merk.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-gray-500 mt-8"
        >
          En vele andere A-merken in ons assortiment
        </motion.p>
      </div>
    </section>
  );
}