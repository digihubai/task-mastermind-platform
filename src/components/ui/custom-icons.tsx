
import React from "react";

export const Workflow = ({ className, size = 24 }: { className?: string; size?: number }) => (
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
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="3" width="6" height="6" rx="1" />
    <rect x="3" y="15" width="6" height="6" rx="1" />
    <rect x="15" y="15" width="6" height="6" rx="1" />
    <path d="M9 6h6" />
    <path d="M6 9v6" />
    <path d="M9 18h6" />
    <path d="M18 9v6" />
  </svg>
);

export const Webhook = ({ className, size = 24 }: { className?: string; size?: number }) => (
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
    <path d="M18 16.98h-5.99c-1.1 0-1.95.5-2.95 1.5l-4 4-.5-9 4-4c1-1 1.85-1.5 2.95-1.5H18" />
    <path d="M12 12v.01" />
    <path d="M17 7l3 3-3 3" />
  </svg>
);

// Brand Icons
export const BrandFacebook = ({ className, size = 24 }: { className?: string; size?: number }) => (
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const BrandTwitter = ({ className, size = 24 }: { className?: string; size?: number }) => (
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
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export const BrandWhatsapp = ({ className, size = 24 }: { className?: string; size?: number }) => (
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M14 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" />
    <path d="M11.5 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <path d="M8.5 11.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
  </svg>
);

export const BrandTelegram = ({ className, size = 24 }: { className?: string; size?: number }) => (
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
    <path d="m22 3-6 18-6-6 9-7-7 9-9-3Z" />
  </svg>
);

export const BrandSlack = ({ className, size = 24 }: { className?: string; size?: number }) => (
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
    <rect x="13" y="2" width="4" height="9" rx="1" />
    <rect x="13" y="13" width="4" height="9" rx="1" />
    <rect x="2" y="13" width="4" height="9" rx="1" />
    <rect x="2" y="2" width="4" height="9" rx="1" />
    <line x1="5.5" y1="17.5" x2="15.5" y2="7.5" />
    <line x1="15.5" y1="17.5" x2="5.5" y2="7.5" />
  </svg>
);
