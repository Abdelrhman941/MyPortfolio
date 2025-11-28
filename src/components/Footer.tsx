import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-center items-center text-center">
                <div className="text-gray-400 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} <span className="text-[#ffb700]">Abdelrhman Ezzat</span>. All rights reserved.
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
