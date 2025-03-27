
import React from "react";

interface StepConnectorProps {
  className?: string;
}

const StepConnector = ({ className }: StepConnectorProps) => {
  return (
    <div className="h-6 flex items-center justify-center">
      <ArrowDown className={`h-5 w-5 text-muted-foreground ${className}`} />
    </div>
  );
};

// Arrow down component for the workflow steps
const ArrowDown = ({ className }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 5V19M12 19L19 12M12 19L5 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default StepConnector;
