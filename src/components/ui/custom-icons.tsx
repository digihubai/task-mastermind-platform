
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
