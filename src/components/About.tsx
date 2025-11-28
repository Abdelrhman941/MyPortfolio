import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const InfoItem: React.FC<{ icon: string; title: string; value: string; color: string; }> = ({ icon, title, value, color }) => (
    <div className="flex items-center space-x-3 text-left">
        <i className={`${icon} ${color} text-lg flex-shrink-0 w-6 text-center`}></i>
        <div>
            <div className="font-semibold text-white">{title}</div>
            <div className="text-gray-400 text-sm">{value}</div>
        </div>
    </div>
);

const ExpertiseItem: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <li className="flex items-start">
        <i className={`fas ${icon} text-[#ff8c00] mt-1 mr-4 flex-shrink-0`}></i>
        <div>
            <strong className="text-white">{title}:</strong> {description}
        </div>
    </li>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">About Me</h2>
        </AnimatedSection>
        <AnimatedSection delay={200}>
                  <div className="bg-[#131313] border border-gray-800/50 rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.55)] p-6 md:p-8 lg:p-12 hover:border-[#ff8c00]/30 transition-all duration-300">
                <div className="space-y-8">

                    <div className="prose prose-invert max-w-none text-gray-300 prose-p:leading-relaxed prose-strong:text-white">
                        <p>I'm Abdelrhman Ezzat, a passionate Data Scientist and AI Engineer currently pursuing my Bachelor's degree in Artificial Intelligence and Data Science at Menoufia University, Egypt. My academic journey has equipped me with both theoretical foundations and practical expertise in cutting-edge AI technologies.</p>
                    </div>

                    <div>
                              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#ffb700]"><i className="fas fa-brain mr-3"></i>My Expertise</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            My technical expertise spans across multiple domains of artificial intelligence:
                        </p>
                        <ul className="space-y-3 text-gray-300 ml-2">
                           <ExpertiseItem icon="fa-robot" title="Machine Learning" description="Building predictive models and statistical algorithms" />
                           <ExpertiseItem icon="fa-network-wired" title="Deep Learning" description="Designing neural networks using PyTorch and TensorFlow" />
                           <ExpertiseItem icon="fa-language" title="Natural Language Processing" description="Developing text analysis and language understanding systems" />
                           <ExpertiseItem icon="fa-eye" title="Computer Vision" description="Creating image recognition and visual analysis solutions" />
                           <ExpertiseItem icon="fa-database" title="Data Engineering" description="Building robust data pipelines and processing systems" />
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-gray-700/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                              <InfoItem icon="fas fa-graduation-cap" title="Education" value="BS in AI & Data Science" color="text-[#ff8c00]" />
                              <InfoItem icon="fas fa-university" title="University" value="Menoufia University" color="text-[#ff3d00]" />
                              <InfoItem icon="fas fa-chart-line" title="GPA" value="3.3" color="text-[#ff007f]" />
                              <InfoItem icon="fas fa-map-marker-alt" title="Location" value="Kafr el-Sheikh, Egypt" color="text-[#ffb700]" />
                              <InfoItem icon="fas fa-phone" title="Phone" value="+20 101 801 8692" color="text-[#ff8c00]" />
                              <InfoItem icon="fas fa-envelope" title="Email" value="abdalarhmanezzat@gmail.com" color="text-[#ff3d00]" />
                    </div>
                </div>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
