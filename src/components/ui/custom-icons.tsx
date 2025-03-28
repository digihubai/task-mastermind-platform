
import React from 'react';

// Simple SVG icons for popular brands
// In a real app, these would be more detailed and polished

export const BrandFacebook: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = '' 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export const BrandTwitter: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = '' 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export const BrandWhatsapp: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = '' 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M17.6 6.2c-1.5-1.5-3.4-2.3-5.5-2.3-4.3 0-7.8 3.5-7.8 7.8 0 1.4.4 2.7 1 3.9l-1.1 4 4.1-1.1c1.1.6 2.4 1 3.7 1 4.3 0 7.8-3.5 7.8-7.8.1-2-.7-4-2.2-5.5z"></path>
    <path d="M14.4 12.9c-.2-.1-1.1-.6-1.3-.6-.2-.1-.3-.1-.4.1-.1.2-.5.6-.6.8-.1.1-.2.1-.4 0s-.8-.3-1.5-.9c-.5-.5-.9-1.1-1-1.3-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4s-.4-1.1-.6-1.4c-.2-.4-.3-.3-.4-.3h-.4c-.1 0-.3.1-.5.2-.2.1-.6.6-.6 1.5s.6 1.7.7 1.8c.1.1 1.3 2 3.2 2.8 1.9.7 1.9.5 2.2.5.3 0 1.1-.4 1.2-.9.2-.4.2-.8.1-.9-.1 0-.2-.1-.4-.2z"></path>
  </svg>
);

export const BrandTelegram: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = '' 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .45 4.264l3.876.9.998 3.995a2.25 2.25 0 0 0 4.11.75l2.816-3.5 4.376 3.501a2.25 2.25 0 0 0 3.58-1.356l2.25-15.75a2.25 2.25 0 0 0-2.934-2.019z"></path>
    <path d="m8.498 13.341 1.676 5.585a.75.75 0 0 0 1.37.047l3.456-7.5a.75.75 0 0 0-.274-1.014l-6-3.75a.75.75 0 0 0-.87 1.215l5.694 3.565-5.052 1.852z"></path>
  </svg>
);

export const BrandSlack: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = '' 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="13" y="2" width="3" height="8" rx="1.5" />
    <path d="M19 8.5V10c0 .8-.7 1.5-1.5 1.5h-8a1.5 1.5 0 0 1 0-3h8c.8 0 1.5.7 1.5 1.5z" />
    <rect x="8" y="14" width="3" height="8" rx="1.5" />
    <path d="M5 15.5V14c0-.8.7-1.5 1.5-1.5h8a1.5 1.5 0 0 1 0 3h-8c-.8 0-1.5-.7-1.5-1.5z" />
  </svg>
);

// Added missing Viber icon
export const BrandViber: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = '' 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M11.2 4C16.5 4.2 17 8.9 17 11.6C17 12.7 16.7 15 16.2 15.5C15.7 16 15.5 16 14.9 16C14.3 16 13.8 15.4 13.5 15C13.2 14.6 13.1 14.2 13 13.9" />
    <path d="M13.1 11.2C13.3 11.2 13.4 11.2 13.6 11.3C13.8 11.4 14 11.6 14 12C14 12.1 14 12.2 13.9 12.4C13.8 12.6 13.7 12.7 13.5 12.8C13.2 13.1 12.3 13.6 12 13.7" />
    <path d="M6 10.5C6 7.5 7.5 5.1 10 4.2C12.5 3.3 15.5 4.5 17 7" />
    <path d="M6.3 6C5.9 6.9 5.7 8 5.7 9.1C5.7 16.1 11.1 21.5 18.1 21.5C19.3 21.5 20.4 21.3 21.5 20.8" />
    <path d="M15.5 17.5C14.5 17.8 13.5 18 12.5 18C9.5 18 6.7 15.2 6.7 12.2C6.7 11 7 9.8 7.6 8.7" />
    <path d="M10 4.2C6.5 5.2 4 8.2 4 12C4 16.8 8 20.5 12.8 20.5C17.5 20.5 21.3 16.5 21.3 11.7" />
    <path d="M18 10C18 11.7 16.7 13 15 13C13.3 13 12 11.7 12 10C12 8.3 13.3 7 15 7C16.7 7 18 8.3 18 10Z" />
  </svg>
);

// Added missing LINE icon
export const BrandLine: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = '' 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 10.5v3c0 4-3 7-7.5 7S6 17.5 6 13.5v-3c0-4.5 3-7 7.5-7s7.5 2.5 7.5 7z" />
    <path d="M10 10.5V14" />
    <path d="M14 10.5h-2.5V14H14" />
    <path d="M18 10.5V14" />
  </svg>
);
