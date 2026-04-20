import React from 'react';
import { motion } from "framer-motion";
import { 
  Paintbrush, 
  Home, 
  TreeDeciduous, 
  Layers, 
  Pipette, 
  PaintBucket,
  Wallpaper,
  Palette,
  MessageSquare,
  ClipboardList,
  HelpCircle
} from "lucide-react";

const products = [
  { 
    icon: Home, 
    title: "Binnenverf", 
    description: "Hoogwaardige muurverven voor elk interieur" 
  },
  { 
    icon: TreeDeciduous, 
    title: "Buitenverf", 
    description: "Weerbestendige verf voor gevel en houtwerk" 
  },
  { 
    icon: Layers, 
    title: "Beits & vernissen", 
    description: "Bescherming en afwerking voor hout" 
  },
  { 
    icon: Pipette, 
    title: "Primers & grondlagen", 
    description: "Perfecte hechting voor elk project" 
  },
  { 
    icon: Paintbrush, 
    title: "Schilderbenodigdheden", 
    description: "Kwasten, rollers en professioneel gereedschap" 
  },
  { 
    icon: Wallpaper, 
    title: "Behang & decoratie", 
    description: "Stijlvolle wandbekleding en accessoires" 
  },
  { 
    icon: PaintBucket, 
    title: "Kleurmengservice", 
    description: "Elke kleur op maat gemengd" 
  },
];

const services = [
  { 
    icon: Palette, 
    title: "Professioneel kleuradvies", 
    description: "Persoonlijke begeleiding bij uw kleurkeuze" 
  },
  { 
    icon: ClipboardList, 
    title: "Projectbegeleiding", 
    description: "Van planning tot perfecte afwerking" 
  },
  { 
    icon: HelpCircle, 
    title: "Technische ondersteuning", 
    description: "Expert advies voor elke ondergrond" 
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ServicesSection() {
  return (
    <section id="aanbod" className="py-24 md:py-32 bg-[#EFEFEF]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#D7A22A] font-semibold tracking-wider uppercase text-sm mb-4">
            Ons Aanbod
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-6">
            Diensten & Producten
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Van hoogwaardige verfproducten tot professioneel advies – 
            alles voor een perfect resultaat.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 bg-[#1F2A44]/5 group-hover:bg-[#D7A22A]/10 rounded-xl flex items-center justify-center mb-5 transition-colors">
                <product.icon className="w-7 h-7 text-[#1F2A44] group-hover:text-[#D7A22A] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2A44] mb-2 group-hover:text-[#D7A22A] transition-colors">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1F2A44] rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Onze Diensten
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#D7A22A]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-[#D7A22A]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{service.title}</h4>
                <p className="text-white/60">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}