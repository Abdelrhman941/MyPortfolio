
import About from '@/src/components/About';
import Contact from '@/src/components/Contact';
import Experience from '@/src/components/Experience';
import Footer from '@/src/components/Footer';
import Hero from '@/src/components/Hero';
import MyProjects from '@/src/components/MyProjects';
import Navbar from '@/src/components/Navbar';
import Services from '@/src/components/Services';
import Skills from '@/src/components/Skills';
import WebVitals from '@/src/components/WebVitals';
import React, { useEffect } from 'react';

const App: React.FC = () => {
  useEffect(() => {
    // Optimized scroll handler with RAF
    const handleScroll = () => {
      requestAnimationFrame(() => {
        // Scroll logic here if needed
      });
    };

    // Use passive listener for 60fps scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#111216] text-gray-200">
      {/* Web Vitals monitoring (dev only) */}
      {process.env.NODE_ENV === 'development' && <WebVitals />}

      <Navbar />
      <main className="contained">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Experience />
        <MyProjects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
