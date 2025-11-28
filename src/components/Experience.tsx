
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            My Experience
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="bg-[#131313] rounded-xl border border-gray-800/50 shadow-[0_6px_18px_rgba(0,0,0,0.55)] hover:shadow-[0_0_24px_rgba(255,140,0,0.2)] hover:border-[#ff8c00]/30 transition-all duration-300 p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Digital Egypt Pioneers Initiative (DEPI)
                </h3>
                <p className="text-lg font-medium" style={{ color: '#ff8c00' }}>
                  Generative AI Trainee
                </p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#ff8c00]/20 to-[#ffb700]/20 border border-[#ffb700]/30 text-[#ffb700] text-sm font-medium">
                  Jul 2025 – Present
                </span>
              </div>
            </div>

            {/* Responsibilities */}
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#ff8c00' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>
                  Contributed to a national initiative on advanced AI and Data Science technologies, focusing on Generative AI and Large Language Models (LLMs).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#ff3d00' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>
                  Trained in Generative AI, LLMs, and prompt engineering techniques.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#ff007f' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>
                  Developed prototype Machine Learning applications leveraging LLMs and Generative AI models, with focus on scalability and deployment.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#ffb700' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>
                  Collaborated with a team of peers to design prompt engineering workflows.
                </span>
              </li>
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Experience;
