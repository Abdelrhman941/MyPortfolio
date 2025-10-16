import React, { useState } from 'react';
import AnimatedSection from './ui/AnimatedSection';
import TextType from './ui/TextType';
import CircularText from './ui/CircularText';
import { Blurhash } from 'react-blurhash';
import profileImg from '../image.jpg';

const WordTicker: React.FC<{ content: string; className?: string }> = ({ content, className }) => (
    <div className={`word-ticker-content whitespace-nowrap font-semibold opacity-8 ${className}`}>
        {content}
    </div>
);

const Hero: React.FC = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const tickerContent = "Machine Learning • Deep Learning • Neural Networks • Artificial Intelligence • Data Mining • Predictive Analytics • Statistical Modeling • Algorithm Design • Feature Engineering • Model Optimization • Natural Language Processing • Computer Vision • Big Data • Data Visualization • Python • TensorFlow • PyTorch • Scikit-learn • Pandas • NumPy • Jupyter • Apache Spark • Classification • Regression • Clustering • Dimensionality Reduction • Time Series Analysis • Reinforcement Learning • Ensemble Methods • Cross Validation • Hyperparameter Tuning • Data Engineering • ETL Pipelines • SQL • NoSQL • Cloud Computing • AWS • Docker • Git • API Development • Web Scraping • Data Warehousing • Business Intelligence • ";
  return (
    <section id="cover" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Word Cloud Ticker Animation */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="animate-ticker absolute top-[15%] text-2xl text-teal-500/10">
                <WordTicker content={tickerContent.repeat(2)} />
            </div>
            <div className="animate-ticker absolute top-[35%] text-xl text-blue-500/10" style={{ animationDelay: '-8s', animationDuration: '70s'}}>
                <WordTicker content={tickerContent.repeat(2).split('•').reverse().join(' • ')} />
            </div>
            <div className="animate-ticker absolute top-[55%] text-3xl text-purple-500/10" style={{ animationDelay: '-16s', animationDuration: '55s' }}>
                <WordTicker content={tickerContent.repeat(2)} />
            </div>
            <div className="animate-ticker absolute top-[75%] text-xl text-green-500/10" style={{ animationDelay: '-24s', animationDuration: '75s' }}>
                <WordTicker content={tickerContent.repeat(2).split('•').reverse().join(' • ')} />
            </div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                {/* Text Content - Left Side */}
                <div className="flex-1 flex flex-col items-center lg:items-start lg:mt-32">
                    <AnimatedSection>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold gradient-text mb-4 md:mb-6 leading-tight">Abdelrhman Ezzat</h1>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold gradient-text mb-6 md:mb-8">Data Scientist & AI Engineer</h2>
                    </AnimatedSection>
                    <AnimatedSection delay={400}>
                        <div className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
                           <TextType
                                as="p"
                                text={[
                                    'Transforming raw data into intelligent solutions.',
                                    'Specializing in Machine Learning, Deep Learning, and NLP.',
                                    'Building AI systems that solve real-world problems.'
                                ]}
                                typingSpeed={40}
                                deletingSpeed={20}
                                pauseDuration={2500}
                                textColors={['#00cfa7', '#3ab0ff', '#f2f2f2']}
                            />
                        </div>
                    </AnimatedSection>
                </div>

                {/* Image with Circular Text - Right Side */}
                <AnimatedSection delay={300}>
                    <div className="relative flex items-center justify-center flex-1">
                        {/* Circular Text Border */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <CircularText 
                                text="DATA*SCIENTIST*AI*ENGINEER*MACHINE*LEARNING*" 
                                spinDuration={20}
                                onHover="speedUp"
                                className="text-cyan-400"
                            />
                        </div>

                        {/* Profile Image */}
                        <div className="relative z-10 w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 transition-all duration-300">
                            {!imageLoaded && (
                                <div className="absolute inset-0">
                                    <Blurhash
                                        hash="L6B{t5?I4oMx~q-;%NxY%MozEMRj"
                                        width="100%"
                                        height="100%"
                                        resolutionX={32}
                                        resolutionY={32}
                                        punch={1}
                                    />
                                </div>
                            )}
                            <img
                                src={profileImg}
                                alt="Abdelrhman Ezzat"
                                className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    </section>
  );
};

export default Hero;