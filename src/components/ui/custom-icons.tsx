
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
