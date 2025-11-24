import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const SERVICES_DATA = [
  {
    icon: 'fas fa-robot',
    title: 'Machine Learning Solutions',
    color: 'teal',
    items: [
      'Custom predictive models for business forecasting',
      'Classification and regression algorithms',
      'Model optimization and performance tuning',
      'Statistical analysis and data modeling',
    ],
  },
  {
    icon: 'fas fa-brain',
    title: 'Deep Learning Development',
    color: 'blue',
    items: [
      'Neural network architecture design',
      'Computer vision applications',
      'Natural language processing systems',
      'Reinforcement learning agents',
    ],
  },
  {
    icon: 'fas fa-chart-bar',
    title: 'Data Analysis & Visualization',
    color: 'purple',
    items: [
      'Exploratory data analysis (EDA)',
      'Interactive dashboard creation',
      'Statistical reporting and insights',
      'Data storytelling and presentation',
    ],
  },
    {
    icon: 'fas fa-database',
    title: 'Data Engineering & Pipelines',
    color: 'green',
    items: [
      'Web scraping and data collection systems',
      'ETL pipeline development and optimization',
      'Data cleaning and preprocessing automation',
      'Database design and management',
    ],
  },
  {
    icon: 'fas fa-lightbulb',
    title: 'AI Consulting & Strategy',
    color: 'yellow',
    items: [
      'AI solution architecture planning',
      'Technology stack recommendations',
      'Project feasibility analysis',
      'Implementation roadmap development',
    ],
  },
  {
    icon: 'fas fa-code',
    title: 'Custom Software Development',
    color: 'red',
    items: [
      'Python application development',
      'Streamlit web application creation',
      'API development and integration',
      'Process automation tool development',
    ],
  },
];

const colorClasses = {
    teal: { border: 'hover:border-teal-400', shadow: 'hover:shadow-[0_8px_30px_rgb(0_207_167_/_0.2)]', icon: 'text-teal-400' },
    blue: { border: 'hover:border-blue-400', shadow: 'hover:shadow-[0_8px_30px_rgb(59_130_246_/_0.2)]', icon: 'text-blue-400' },
    purple: { border: 'hover:border-purple-400', shadow: 'hover:shadow-[0_8px_30px_rgb(139_92_246_/_0.2)]', icon: 'text-purple-400' },
    green: { border: 'hover:border-green-400', shadow: 'hover:shadow-[0_8px_30px_rgb(34_197_94_/_0.2)]', icon: 'text-green-400' },
    yellow: { border: 'hover:border-yellow-400', shadow: 'hover:shadow-[0_8px_30px_rgb(234_179_8_/_0.2)]', icon: 'text-yellow-400' },
    red: { border: 'hover:border-red-400', shadow: 'hover:shadow-[0_8px_30px_rgb(239_68_68_/_0.2)]', icon: 'text-red-400' },
};

const ServiceCard: React.FC<{ service: typeof SERVICES_DATA[0] }> = ({ service }) => {
  const colors = colorClasses[service.color as keyof typeof colorClasses];
  return (
    <div className={`h-full flex flex-col bg-[#131519] border border-gray-800 rounded-xl p-6 md:p-8 transition-all duration-300 ${colors.border} ${colors.shadow}`}>
      <div className="text-center mb-6">
        <i className={`${service.icon} text-4xl ${colors.icon} mb-4`}></i>
        <h3 className="text-xl font-semibold text-white">{service.title}</h3>
      </div>
      <ul className="space-y-3 text-gray-300 text-sm md:text-base flex-grow">
        {service.items.map((item, index) => (
          <li key={index} className="flex items-start">
            <i className={`fas fa-check-circle ${colors.icon} mt-1 mr-3 flex-shrink-0`}></i>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Services & Solutions</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SERVICES_DATA.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 100}>
                    <ServiceCard service={service} />
                </AnimatedSection>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
