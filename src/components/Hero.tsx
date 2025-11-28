import profileImg from '@/src/assets/profile.webp';
import React, { useState } from 'react';
import AnimatedSection from './ui/AnimatedSection';
import TextType from './ui/TextType';

const WordTicker: React.FC<{ content: string; className?: string; direction?: 'left' | 'right' }> = ({
    content,
    className,
    direction = 'left'
}) => (
    <div className={`news-ticker ${direction === 'right' ? 'news-ticker-reverse' : ''}`}>
        <div className={`news-ticker-content ${className}`}>
            {content}
        </div>
    </div>
);

const Hero: React.FC = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Ticker content for smooth news-like animation
    const tickerContent = "Machine Learning • Deep Learning • AI • Data Science • Python • TensorFlow • PyTorch • NLP • Computer Vision • ";

  return (
    <section id="cover" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Smooth News Ticker Background - Volcano Gradient Colors (Subtle) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              <div className="absolute top-[20%] w-full text-2xl font-semibold" style={{ color: 'rgba(255, 140, 0, 0.05)' }}>
                <WordTicker content={tickerContent.repeat(5)} direction="left" />
            </div>
              <div className="absolute top-[50%] w-full text-xl font-semibold" style={{ color: 'rgba(255, 61, 0, 0.05)' }}>
                <WordTicker content={tickerContent.repeat(5)} direction="right" />
            </div>
              <div className="absolute top-[75%] w-full text-xl font-semibold" style={{ color: 'rgba(255, 0, 127, 0.05)' }}>
                <WordTicker content={tickerContent.repeat(5)} direction="left" />
            </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                {/* Text Content - Left Side */}
                <div className="flex-1 flex flex-col items-center lg:items-start lg:mt-32">
                    <AnimatedSection>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold gradient-text mb-4 md:mb-6 leading-tight">
                            Abdelrhman Ezzat
                        </h1>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold gradient-text mb-6 md:mb-8">
                            Data Scientist & AI Engineer
                        </h2>
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
                                  textColors={['#ff8c00', '#ff3d00', '#ffb700']}
                            />
                        </div>
                    </AnimatedSection>
                </div>

                  {/* Profile Image - Right Side */}
                <AnimatedSection delay={300}>
                    <div className="relative flex items-center justify-center flex-1">
                          {/* Profile Image with Animated Volcano Gradient Border */}
                        <div className="profile-image-wrapper">
                              <div className="relative z-10 w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                                <img
                                    src={profileImg}
                                    alt="Abdelrhman Ezzat - Data Scientist"
                                      className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setImageLoaded(true)}
                                    loading="eager"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    </section>
  );
};

export default Hero;
