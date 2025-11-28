import cvFile from '@/resume/Abdelrhman_Ezzat_CV.pdf';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
];

const useScrollSpy = (sectionIds: string[], offset: number) => {
  const [activeSection, setActiveSection] = useState<string | null>('#cover');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      let currentSectionId = null;
      for (const id of sectionIds) {
        const element = document.getElementById(id.substring(1));
        if (element) {
          if (element.offsetTop <= scrollPosition) {
            currentSectionId = id;
          }
        }
      }
      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const allLinks = [...NAV_LINKS, { href: '#contact', label: 'Contact' }, {href: '#cover', label: 'Cover'}];
  const activeSection = useScrollSpy(allLinks.map(l => l.href), 150);

  const NavLink: React.FC<{ href: string; children: React.ReactNode; isMobile?: boolean }> = ({ href, children, isMobile }) => {
    const isActive = activeSection === href;
    return (
      <a
        href={href}
        onClick={() => isMobile && setIsOpen(false)}
        className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive
          ? 'text-[#ffb700] font-semibold'
          : 'text-gray-400 hover:text-[#ffb700]'
          }`}
        style={isActive ? { textShadow: '0 0 12px rgba(255, 183, 0, 0.4)' } : {}}
      >
        {children}
      </a>
    );
  };

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 bg-black/30 backdrop-blur-xl border border-white/10 rounded-full shadow-lg transition-all duration-300">
          <div className="relative flex justify-between items-center">
            <a href="#cover" className="text-xl font-bold text-white pl-2" style={{textShadow: '0 0 5px rgba(255,255,255,0.3)'}}>
              AE.
            </a>

            <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:flex md:items-center">
               {NAV_LINKS.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a href="#contact" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-[#ffb700] transition-all duration-300">Contact</a>
              <motion.a
                href={cvFile}
                download
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#ff8c00] via-[#ff3d00] to-[#ff007f] text-white rounded-full hover:shadow-[0_0_20px_rgba(255,140,0,0.4)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
            </div>

            <button
              className="md:hidden text-white focus:outline-none z-20"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-300`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-center space-y-6 text-lg font-medium">
                {[...NAV_LINKS, { href: '#contact', label: 'Contact' }].map(link => <NavLink key={link.href} href={link.href} isMobile>{link.label}</NavLink>)}
              </div>
              <motion.a
                href={cvFile}
                download
                className="mt-8 px-6 py-3 text-base font-semibold bg-gradient-to-r from-[#ff8c00] via-[#ff3d00] to-[#ff007f] text-white rounded-full hover:shadow-[0_0_24px_rgba(255,61,0,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
