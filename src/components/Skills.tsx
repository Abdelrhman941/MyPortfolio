import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const SKILLS_DATA = [
    { icon: 'fab fa-python', name: 'Python' },
    { icon: 'fas fa-chart-line', name: 'Statistics' },
    { icon: 'fas fa-robot', name: 'Machine Learning' },
    { icon: 'fas fa-brain', name: 'Deep Learning' },
    { icon: 'fas fa-fire', name: 'PyTorch' },
    { icon: 'fas fa-eye', name: 'Computer Vision' },
    { icon: 'fas fa-language', name: 'NLP' },
    { icon: 'fas fa-clock', name: 'Time Series' },
    { icon: 'fas fa-chart-bar', name: 'Power BI' },
    { icon: 'fas fa-file-excel', name: 'Excel' },
    { icon: 'fas fa-database', name: 'SQL' },
    { icon: 'fas fa-server', name: 'Big Data' },
    { icon: 'fab fa-linux', name: 'Linux' },
    { icon: 'fas fa-spider', name: 'Web Scraping' },
    { icon: 'fas fa-window-restore', name: 'Streamlit' },
];

const SkillBadge: React.FC<{ skill: typeof SKILLS_DATA[0] }> = ({ skill }) => (
    <div className="group flex items-center space-x-3 p-3 px-4 bg-gradient-to-br from-[#131519] to-gray-900/50 border border-gray-800 rounded-lg text-center transition-all duration-300 hover:border-teal-400 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/10">
        <i className={`${skill.icon} text-xl text-gray-400 group-hover:text-teal-400 transition-colors duration-300`}></i>
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">{skill.name}</span>
    </div>
);

const SkillScroller: React.FC<{ skills: typeof SKILLS_DATA, direction?: 'left' | 'right' }> = ({ skills, direction = 'left' }) => (
    <div className="skill-scroller" data-direction={direction}>
        <div className="skill-scroller-inner">
            {[...skills, ...skills].map((skill, index) => (
                <SkillBadge key={`${skill.name}-${index}`} skill={skill} />
            ))}
        </div>
    </div>
);

const Skills: React.FC = () => {
  const midIndex = Math.ceil(SKILLS_DATA.length / 2);
  const firstRowSkills = SKILLS_DATA.slice(0, midIndex);
  const secondRowSkills = SKILLS_DATA.slice(midIndex);

  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Technical Skills</h2>
        </AnimatedSection>
        <AnimatedSection delay={200}>
            <div className="space-y-4">
                <SkillScroller skills={firstRowSkills} direction="left" />
                <SkillScroller skills={secondRowSkills} direction="right" />
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;