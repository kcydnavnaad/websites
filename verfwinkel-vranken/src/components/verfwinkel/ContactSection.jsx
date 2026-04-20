import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Facebook,
  Instagram
} from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adres',
    lines: ['Grote Markt 25', '2500 Lier', 'België']
  },
  {
    icon: Phone,
    title: 'Telefoon',
    lines: ['+32 3 123 45 67', '+32 486 12 34 56']
  },
  {
    icon: Mail,
    title: 'E-mail',
    lines: ['info@verfwinkelvranken.be', 'advies@verfwinkelvranken.be']
  },
  {
    icon: Clock,
    title: 'Openingsuren',
    lines: [
      'Ma - Vr: 09:00 - 18:00',
      'Za: 09:00 - 17:00',
      'Zo: Gesloten'
    ]
  }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#FEFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8960C] font-semibold tracking-wider uppercase text-sm">Contact</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2A44] mt-3 mb-6">
            Bezoek ons of neem contact op
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Heeft u vragen of wilt u een afspraak maken voor kleuradvies? 
            Wij staan voor u klaar!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-[#EFEFEF] rounded-xl p-6"
                >
                  <div className="w-12 h-12 bg-[#1F2A44] rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-[#C8960C]" />
                  </div>
                  <h3 className="font-semibold text-[#1F2A44] mb-2">{item.title}</h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-gray-600 text-sm">{line}</p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2499.8478!2d4.5697!3d51.1310!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDA3JzUxLjYiTiA0wrAzNCcxMC45IkU!5e0!3m2!1snl!2sbe!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locatie Verfwinkel Vranken"
              />
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a 
                href="https://facebook.com/verfwinkelvranken" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#1F2A44] rounded-full flex items-center justify-center hover:bg-[#C8960C] transition-colors group"
              >
                <Facebook className="w-5 h-5 text-[#C8960C] group-hover:text-white" />
              </a>
              <a 
                href="https://instagram.com/verfwinkelvranken" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#1F2A44] rounded-full flex items-center justify-center hover:bg-[#C8960C] transition-colors group"
              >
                <Instagram className="w-5 h-5 text-[#C8960C] group-hover:text-white" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[#1F2A44] rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-white mb-2">Stuur ons een bericht</h3>
              <p className="text-white/60 mb-8">Wij reageren binnen 24 uur</p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Bericht verzonden!</h4>
                  <p className="text-white/60">Bedankt voor uw bericht. We nemen snel contact met u op.</p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-6 border-white/30 text-white hover:bg-white/10"
                  >
                    Nieuw bericht sturen
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/80 text-sm mb-2">Naam</label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder="Uw naam"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C8960C] h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/80 text-sm mb-2">E-mail</label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder="uw@email.be"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C8960C] h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white/80 text-sm mb-2">Bericht</label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      placeholder="Hoe kunnen wij u helpen?"
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C8960C] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C8960C] hover:bg-[#b8860b] text-white font-semibold py-6 text-lg rounded-full transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-[#1F2A44]/30 border-t-[#1F2A44] rounded-full animate-spin" />
                        Verzenden...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Verstuur bericht
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}