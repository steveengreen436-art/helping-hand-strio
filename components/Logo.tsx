import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto", showText = true }) => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src="/logo.png" 
        alt="Helping Hand Strio Logo" 
        className={className}
      />
      {showText && (
        <span className="font-bold text-lg text-white">
          Helping Hand <span className="text-cyan-400">Strio</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
