import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 38 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 240 220" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block transition-transform duration-300 hover:scale-110 ${className}`}
    >
      {/* Upper-Left White P */}
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M 25 35 L 155 35 C 190 35 205 60 195 85 C 185 110 155 115 125 115 L 85 115 L 65 165 L 25 165 L 77 35 Z 
           M 125 55 L 85 55 L 73 85 L 113 85 C 128 85 138 80 141 73 C 144 66 138 55 125 55 Z" 
        fill="#FFFFFF" 
        className="dark:fill-white fill-zinc-900 transition-colors duration-200"
      />
      
      {/* Lower-Right Gold P */}
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M 65 85 L 195 85 C 230 85 245 110 235 135 C 225 160 195 165 165 165 L 125 165 L 105 215 L 65 215 L 117 85 Z 
           M 165 105 L 125 105 L 113 135 L 153 135 C 168 135 178 130 181 123 C 184 116 178 105 165 105 Z" 
        fill="#D2943A" 
      />
    </svg>
  );
};
