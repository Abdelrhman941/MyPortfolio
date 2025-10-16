
import React, { useState, useEffect, useRef } from 'react';
import AnimatedSection from './ui/AnimatedSection';

const PROJECTS_DATA = [
    {
        icon: 'fas fa-chart-line',
        title: 'Sports Popularity Analysis with Web Scraping',
        date: 'May 2025',
        description: 'Conducted comprehensive analysis of global sports popularity trends by developing an automated data collection system that scraped information from Google Trends and YouTube analytics.',
        achievements: [
            'Successfully processed over 10,000+ data points across 50+ sports categories',
            'Identified seasonal trends in sports viewership',
            'Created predictive models for future popularity spikes',
        ],
        tools: ['Python', 'BeautifulSoup', 'pandas', 'matplotlib', 'Google Trends API'],
        github: 'https://github.com/Abdelrhman941/Sports-Popularity-Project',
        color: 'teal',
    },
    {
        icon: 'fas fa-gamepad',
        title: 'DQN Agent for 2048 Game (Reinforcement Learning)',
        date: 'May 2025',
        description: 'Developed a Deep Q-Network (DQN) agent for the 2048 puzzle game using reinforcement learning. Built a custom game environment with replay buffer, epsilon-greedy exploration, and target network.',
        achievements: [
            'Trained DQN agent over 1000 episodes with stable convergence',
            'Achieved average score of ~1436 points',
            'Maximum tile reached: 512',
        ],
        tools: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Reinforcement Learning'],
        github: 'https://github.com/Abdelrhman941/2048-Game-Project',
        color: 'blue',
    },
    {
        icon: 'fas fa-spell-check',
        title: 'Auto-Correct System using NLP & Edit Distance',
        date: 'May 2025',
        description: 'Developed a sophisticated spelling correction system that mimics Google\'s "Did you mean...?" functionality using advanced NLP techniques and probabilistic models.',
        achievements: [
            'Achieved 92% accuracy on standard spelling correction benchmarks',
            'Handled over 50,000+ vocabulary words',
            'Built probabilistic language models using trigram analysis',
        ],
        tools: ['Python', 'NLTK', 'spaCy', 'Edit Distance', 'N-gram models'],
        github: 'https://github.com/Abdelrhman941/Auto-correct-Project',
        color: 'purple',
    },
    {
        icon: 'fas fa-traffic-light',
        title: 'Traffic Sign Detection and Classification (GTSRB)',
        date: 'December 2023',
        description: 'Developed a robust convolutional neural network for real-time traffic sign detection and classification using the German Traffic Sign Recognition Benchmark (GTSRB) dataset.',
        achievements: [
            'Achieved 98.5% classification accuracy on test set',
            'Reduced inference time to <50ms per image',
            'Designed custom CNN architecture with 43 different classes',
        ],
        tools: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Computer Vision'],
        github: 'https://github.com/Abdelrhman941/CV-traffic-signs-project',
        color: 'green',
    },
];

const colorClasses = {
    teal: { text: 'text-teal-400', hover: 'hover:text-teal-300', border: 'border-teal-400' },
    blue: { text: 'text-blue-400', hover: 'hover:text-blue-300', border: 'border-blue-400' },
    purple: { text: 'text-purple-400', hover: 'hover:text-purple-300', border: 'border-purple-400' },
    green: { text: 'text-green-400', hover: 'hover:text-green-300', border: 'border-green-400' },
};

const Projects: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 75) {
            nextProject();
        }

        if (touchStartX.current - touchEndX.current < -75) {
            prevProject();
        }
    };


    const nextProject = () => setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
    const prevProject = () => setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
    const goToProject = (index: number) => setCurrentIndex(index);
    
    return (
        <section id="projects" className="py-16 sm:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">My Projects</h2>
                </AnimatedSection>

                <div className="relative max-w-4xl mx-auto">
                    <AnimatedSection delay={200}>
                        <div 
                            className="overflow-hidden relative"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {PROJECTS_DATA.map((project, index) => {
                                    const colors = colorClasses[project.color as keyof typeof colorClasses];
                                    return (
                                        <div key={index} className="w-full flex-shrink-0 px-2">
                                            <div className="bg-[#131519] border border-gray-800 rounded-xl p-6 md:p-8">
                                                <div className="flex items-start md:items-center mb-4 flex-col md:flex-row">
                                                    <i className={`${project.icon} text-2xl ${colors.text} mb-2 md:mb-0 md:mr-4`}></i>
                                                    <h3 className="text-lg md:text-xl font-semibold text-white">{project.title}</h3>
                                                </div>
                                                <div className="text-sm text-gray-500 mb-4">{project.date}</div>
                                                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">{project.description}</p>
                                                
                                                <div className="mb-6">
                                                    <h4 className="font-semibold text-white mb-2">Key Achievements:</h4>
                                                    <ul className="text-sm text-gray-300 space-y-2 ml-4 list-disc list-outside">
                                                        {project.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                                                    </ul>
                                                </div>

                                                <div className="mb-6">
                                                    <h4 className="font-semibold text-white mb-2">Tools:</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tools.map((tool, i) => <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium">{tool}</span>)}
                                                    </div>
                                                </div>

                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center ${colors.text} ${colors.hover} transition-colors font-semibold`}>
                                                    <i className="fab fa-github mr-2"></i>View on GitHub
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </AnimatedSection>
                    <button onClick={prevProject} className="absolute left-[-0.5rem] md:left-[-3rem] top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-700 text-white rounded-full z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all" aria-label="Previous project"><i className="fas fa-chevron-left"></i></button>
                    <button onClick={nextProject} className="absolute right-[-0.5rem] md:right-[-3rem] top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-700 text-white rounded-full z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all" aria-label="Next project"><i className="fas fa-chevron-right"></i></button>
                </div>


                <div className="flex justify-center mt-8 space-x-3">
                    {PROJECTS_DATA.map((_, index) => (
                        <button key={index} onClick={() => goToProject(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-teal-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'}`} aria-label={`Go to project ${index + 1}`}></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
