import React from 'react';
import { motion } from "framer-motion";

const brands = [
  { name: "Sigma", color: "#003366" },
  { name: "Levis", color: "#E31837" },
  { name: "Trimetal", color: "#1B4D3E" },
  { name: "Sikkens", color: "#0066B3" },
  { name: "Boss Paints", color: "#FFA500" },
  { name: "Ralston", color: "#8B0000" },
  { name: "Mathys", color: "#2F4F4F" },
  { name: "Zinsser", color: "#DC143C" },
];

export default function BrandsSection() {
  return (
    <section className="py-20 bg-[#EFEFEF]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#D7A22A] font-semibold tracking-wider uppercase text-sm mb-4">
            Onze Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2A44]">
            Topmerken onder één dak
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white rounded-xl p-6 flex items-center justify-center shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            >
              <div 
                className="w-full h-12 rounded-lg flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform"
                style={{ 
                  backgroundColor: `${brand.color}15`,
                  color: brand.color
                }}
              >
                {brand.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-8"
        >
          En nog vele andere kwaliteitsmerken in ons assortiment
        </motion.p>
      </div>
    </section>
  );
}