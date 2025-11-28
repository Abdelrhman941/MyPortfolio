
import { motion } from 'motion/react';
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
    teal: { icon: 'text-[#ff8c00]', bg: 'bg-gradient-to-r from-[#ff8c00] to-[#ff3d00]', hoverBg: 'hover:from-[#ff7700] hover:to-[#ff2200]', border: 'hover:border-[#ff8c00]' },
    blue: { icon: 'text-[#ff3d00]', bg: 'bg-gradient-to-r from-[#ff3d00] to-[#ff007f]', hoverBg: 'hover:from-[#ff2200] hover:to-[#ee006f]', border: 'hover:border-[#ff3d00]' },
    purple: { icon: 'text-[#ff007f]', bg: 'bg-gradient-to-r from-[#ff007f] to-[#ffb700]', hoverBg: 'hover:from-[#ee006f] hover:to-[#ffa600]', border: 'hover:border-[#ff007f]' },
    green: { icon: 'text-[#ffb700]', bg: 'bg-gradient-to-r from-[#ffb700] to-[#ff8c00]', hoverBg: 'hover:from-[#ffa600] hover:to-[#ff7700]', border: 'hover:border-[#ffb700]' },
};

const ContactCard: React.FC<{ info: typeof CONTACT_INFO[0] }> = ({ info }) => {
    const colors = colorClasses[info.color as keyof typeof colorClasses];
    return (
        <div className={`flex flex-col items-center p-4 bg-[#0d0d0d] rounded-xl border border-gray-800/50 ${colors.border} transition-all duration-300 hover:bg-[#131313] hover:shadow-[0_0_20px_rgba(255,140,0,0.15)] text-center`}>
            <i className={`${info.icon} ${colors.icon} text-3xl mb-4`}></i>
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-lg">{info.title}</div>
                <div className="text-gray-400 text-sm mb-3 truncate w-full px-2">{info.value}</div>
                <motion.a
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${colors.bg} ${colors.hoverBg} text-white font-semibold py-2 px-4 rounded-lg text-sm inline-block`}
                    whileHover={{ scale: 1.1, boxShadow: "0 4px 16px rgba(255,140,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    {info.cta}
                </motion.a>
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
                  <div className="bg-[#131313] border border-gray-800/50 rounded-xl p-6 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {CONTACT_INFO.map((info, index) => (
                         <ContactCard key={index} info={info} />
                    ))}
                </div>
                <div className="mt-10 pt-6 border-t border-gray-700/50 text-center">
                    <p className="text-gray-400">
                              <i className="fas fa-clock text-[#ffb700] mr-2"></i>
                              I typically respond within <span className="text-[#ffb700] font-semibold">2-6 hours</span> on business days.
                    </p>
                </div>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
