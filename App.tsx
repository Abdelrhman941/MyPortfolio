
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WebVitals from './src/components/WebVitals';

const App: React.FC = () => {
  useEffect(() => {
    // Add passive event listeners for better scroll performance
    const handleScroll = () => {
      // Scroll handler optimized with RAF
      requestAnimationFrame(() => {
        // Your scroll logic here
      });
    };

    // Use passive listener for 60fps scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#0f1115] text-gray-200">
      {/* Web Vitals monitoring (dev only) */}
      <WebVitals />
      
      <Navbar />
      <main className="contained">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
