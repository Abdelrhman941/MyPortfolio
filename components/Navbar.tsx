import React, { useState, useEffect } from 'react';

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
        className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
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
              <a href="https://www.linkedin.com/in/abdelrhman-a-ezzat/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn"><i className="fab fa-linkedin text-xl"></i></a>
              <a href="https://github.com/Abdelrhman941" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub"><i className="fab fa-github text-xl"></i></a>
              <div className="h-4 w-px bg-white/20"></div>
              <a href="#contact" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</a>
              <a href="resume/Abdelrhman_Ezzat_CV.pdf" download className="px-4 py-2 text-sm font-semibold bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                Download CV
              </a>
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
      <div 
        className={`md:hidden fixed inset-0 bg-black/80 backdrop-blur-lg transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="flex flex-col items-center justify-center h-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center justify-center space-y-6 text-lg font-medium">
              {[...NAV_LINKS, { href: '#contact', label: 'Contact' }].map(link => <NavLink key={link.href} href={link.href} isMobile>{link.label}</NavLink>)}
            </div>
            <a href="resume/Abdelrhman_Ezzat_CV.pdf" download className="mt-8 px-6 py-3 text-base font-semibold bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
              Download CV
            </a>
            <div className="mt-8 flex items-center space-x-6">
                <a href="https://www.linkedin.com/in/abdelrhman-a-ezzat/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn"><i className="fab fa-linkedin text-2xl"></i></a>
                <a href="https://github.com/Abdelrhman941" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub"><i className="fab fa-github text-2xl"></i></a>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;