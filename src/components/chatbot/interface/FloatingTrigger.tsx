
import React from "react";

interface FloatingTriggerProps {
  position: "left" | "right";
  transparentTrigger: boolean;
  accentColor: string;
  triggerSize: number;
  renderAvatar: () => React.ReactNode;
}

export const FloatingTrigger: React.FC<FloatingTriggerProps> = ({
  position,
  transparentTrigger,
  accentColor,
  triggerSize,
  renderAvatar
}) => {
  return (
    <div className={`absolute ${position === 'left' ? '-left-20' : '-right-20'} bottom-4`}>
      <div 
        className={`rounded-full cursor-pointer flex items-center justify-center shadow-md ${transparentTrigger ? 'bg-opacity-70' : ''} transition-transform hover:scale-105`}
        style={{ 
          backgroundColor: transparentTrigger ? 'rgba(255,255,255,0.8)' : accentColor,
          width: `${triggerSize}px`,
          height: `${triggerSize}px`,
        }}
      >
        <span className={`text-${transparentTrigger ? 'black' : 'white'} text-lg font-medium`}>
          {renderAvatar()}
        </span>
      </div>
    </div>
  );
};
