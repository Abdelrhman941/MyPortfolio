
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const CONTACT_INFO = [
    {
        icon: 'fas fa-envelope',
        title: 'Email',
        value: 'abdalarhmanezzat@gmail.com',
        cta: 'Send Email',
        href: 'mailto:abdalarhmanezzat@gmail.com',
        color: 'teal'
    },
    {
        icon: 'fab fa-linkedin',
        title: 'LinkedIn',
        value: 'Professional Network',
        cta: 'Connect',
        href: 'https://www.linkedin.com/in/abdelrhman-a-ezzat/',
        color: 'blue'
    },
    {
        icon: 'fab fa-github',
        title: 'GitHub',
        value: 'Code Repository',
        cta: 'View Code',
        href: 'https://github.com/Abdelrhman941',
        color: 'purple'
    },
    {
        icon: 'fab fa-whatsapp',
        title: 'WhatsApp',
        value: '+20 101 801 8692',
        cta: 'Chat Now',
        href: 'https://wa.me/201018018692',
        color: 'green'
    },
];

const colorClasses = {
    teal: { icon: 'text-teal-400', bg: 'bg-teal-500', hoverBg: 'hover:bg-teal-600', border: 'hover:border-teal-400' },
    blue: { icon: 'text-blue-400', bg: 'bg-blue-500', hoverBg: 'hover:bg-blue-600', border: 'hover:border-blue-400' },
    purple: { icon: 'text-purple-400', bg: 'bg-purple-500', hoverBg: 'hover:bg-purple-600', border: 'hover:border-purple-400' },
    green: { icon: 'text-green-400', bg: 'bg-green-500', hoverBg: 'hover:bg-green-600', border: 'hover:border-green-400' },
};

const ContactCard: React.FC<{ info: typeof CONTACT_INFO[0] }> = ({ info }) => {
    const colors = colorClasses[info.color as keyof typeof colorClasses];
    return (
        <div className={`flex flex-col items-center p-4 bg-[#181a1f] rounded-xl border border-transparent ${colors.border} transition-all duration-300 hover:bg-[#1f2228] text-center`}>
            <i className={`${info.icon} ${colors.icon} text-3xl mb-4`}></i>
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-lg">{info.title}</div>
                <div className="text-gray-400 text-sm mb-3 truncate w-full px-2">{info.value}</div>
                <a href={info.href} target="_blank" rel="noopener noreferrer" className={`${colors.bg} ${colors.hoverBg} text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300 inline-block transform hover:scale-110`}>
                    {info.cta}
                </a>
            </div>
        </div>
    );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">Let's Connect</h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
                Ready to collaborate on your next AI project? I'm always excited to discuss innovative solutions.
            </p>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
            <div className="bg-[#131519] border border-gray-800 rounded-xl p-6 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {CONTACT_INFO.map((info, index) => (
                         <ContactCard key={index} info={info} />
                    ))}
                </div>
                <div className="mt-10 pt-6 border-t border-gray-700/50 text-center">
                    <p className="text-gray-400">
                        <i className="fas fa-clock text-teal-400 mr-2"></i>
                        I typically respond within <span className="text-teal-400 font-semibold">2-6 hours</span> on business days.
                    </p>
                </div>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
