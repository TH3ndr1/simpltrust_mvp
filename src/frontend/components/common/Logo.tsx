import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <svg 
      className={className} 
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#2563EB" />
      <path 
        d="M15 15H33V19H15V15Z" 
        fill="white"
      />
      <path 
        d="M24 21C19.582 21 16 24.582 16 29C16 33.418 19.582 37 24 37C28.418 37 32 33.418 32 29H28C28 31.209 26.209 33 24 33C21.791 33 20 31.209 20 29C20 26.791 21.791 25 24 25V21Z" 
        fill="white"
      />
      <path 
        d="M33 21H29V29H33V21Z" 
        fill="white"
      />
    </svg>
  );
};

export default Logo; 