import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-0 z-0 h-full">
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        </div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
