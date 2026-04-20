import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Over ons', href: '#over-ons' },
  { label: 'Aanbod', href: '#aanbod' },
  { label: 'Kleuradvies', href: '#kleuradvies' },
  { label: 'Realisaties', href: '#realisaties' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isScrolled ? 'bg-[#1F2A44]' : 'bg-[#C8960C]'
              }`}>
                <span className={`font-bold text-xl transition-colors duration-300 ${
                  isScrolled ? 'text-[#C8960C]' : 'text-white'
                }`}>V</span>
              </div>
              <div className="hidden sm:block">
                <span className={`font-bold text-lg transition-colors duration-300 ${
                  isScrolled ? 'text-[#1F2A44]' : 'text-white'
                }`}>Verfwinkel</span>
                <span className={`font-bold text-lg ml-1 transition-colors duration-300 ${
                  isScrolled ? 'text-[#C8960C]' : 'text-[#C8960C]'
                }`}>Vranken</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? isScrolled 
                        ? 'bg-[#1F2A44] text-white'
                        : 'bg-white/20 text-white'
                      : isScrolled
                        ? 'text-[#1F2A44] hover:bg-[#EFEFEF]'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden lg:block">
              <a
                href="https://www.webshop-voorbeeld.be"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  isScrolled
                    ? 'bg-[#C8960C] text-white hover:bg-[#b8860b]'
                    : 'bg-[#C8960C] text-white hover:bg-white hover:text-[#C8960C]'
                }`}
              >
                Webshop
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-[#1F2A44]' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t shadow-lg overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      activeSection === item.href.slice(1)
                        ? 'bg-[#1F2A44] text-white'
                        : 'text-[#1F2A44] hover:bg-[#EFEFEF]'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="https://www.webshop-voorbeeld.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-xl text-base font-semibold bg-[#C8960C] text-white text-center mt-4"
                >
                  Ga naar Webshop
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}