
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Work Experience</h2>
        </AnimatedSection>
        <AnimatedSection delay={200}>
            <div className="bg-[#131519] p-8 md:p-12 rounded-xl border border-gray-800 shadow-2xl">
                <p className="text-2xl md:text-3xl font-semibold text-gray-300 animate-pulse">
                    Coming Soon...
                </p>
                <p className="mt-4 text-gray-400 text-lg">
                    Stay tuned for exciting updates about my professional journey.
                </p>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Experience;
