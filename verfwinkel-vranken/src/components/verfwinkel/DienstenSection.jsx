import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Sun, 
  Droplets, 
  Layers, 
  PaintBucket, 
  Wallpaper, 
  Palette,
  MessageSquare,
  ClipboardList,
  HelpCircle
} from 'lucide-react';

const producten = [
  { 
    icon: Home, 
    title: 'Binnenverf', 
    description: 'Hoogwaardige muurverf voor elk interieur',
    color: 'from-amber-50 to-yellow-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700'
  },
  { 
    icon: Sun, 
    title: 'Buitenverf', 
    description: 'Weerbestendige verf voor gevels en houtwerk',
    color: 'from-sky-50 to-blue-50',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-700'
  },
  { 
    icon: Droplets, 
    title: 'Beits & vernissen', 
    description: 'Bescherming en afwerking voor hout',
    color: 'from-orange-50 to-amber-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700'
  },
  { 
    icon: Layers, 
    title: 'Primers & grondlagen', 
    description: 'Optimale hechting en dekking',
    color: 'from-slate-50 to-gray-50',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-700'
  },
  { 
    icon: PaintBucket, 
    title: 'Schilderbenodigdheden', 
    description: 'Kwasten, rollers en gereedschap',
    color: 'from-emerald-50 to-green-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700'
  },
  { 
    icon: Wallpaper, 
    title: 'Behang & decoratie', 
    description: 'Stijlvol behang voor elke ruimte',
    color: 'from-rose-50 to-pink-50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700'
  },
  { 
    icon: Palette, 
    title: 'Kleurmengservice', 
    description: 'Elke kleur op maat gemengd',
    color: 'from-purple-50 to-violet-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700'
  },
];

const diensten = [
  { icon: MessageSquare, title: 'Professioneel kleuradvies', description: 'Persoonlijke begeleiding bij kleurkeuze' },
  { icon: ClipboardList, title: 'Projectbegeleiding', description: 'Van plan tot uitvoering aan uw zijde' },
  { icon: HelpCircle, title: 'Technische ondersteuning', description: 'Advies over verf en ondergronden' },
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

export default function DienstenSection() {
  return (
    <section id="aanbod" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8960C] font-semibold tracking-wider uppercase text-sm">Ons aanbod</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2A44] mt-3 mb-6">
            Producten & Diensten
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Een compleet assortiment voor al uw verf- en schilderprojecten, 
            ondersteund door professioneel advies.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {producten.map((product) => (
            <motion.div
              key={product.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className={`group bg-gradient-to-br ${product.color} rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/50`}
            >
              <div className={`w-14 h-14 ${product.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <product.icon className={`w-7 h-7 ${product.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2A44] mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1F2A44] to-[#2a3555] rounded-3xl p-8 lg:p-12 shadow-xl"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">Onze Diensten</h3>
            <p className="text-white/60">Meer dan alleen producten verkopen</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {diensten.map((dienst, index) => (
              <motion.div
                key={dienst.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-[#C8960C]/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C8960C] transition-colors duration-300">
                  <dienst.icon className="w-8 h-8 text-[#C8960C] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{dienst.title}</h4>
                <p className="text-white/60 text-sm">{dienst.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}