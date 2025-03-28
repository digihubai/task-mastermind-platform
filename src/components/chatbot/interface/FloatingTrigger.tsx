
import React from "react";

interface FloatingTriggerProps {
  position: "left" | "right";
  transparentTrigger: boolean;
  accentColor: string;
  triggerSize: number;
  renderAvatar: () => React.ReactNode;
  onClick?: () => void;
}

export const FloatingTrigger: React.FC<FloatingTriggerProps> = ({
  position,
  transparentTrigger,
  accentColor,
  triggerSize,
  renderAvatar,
  onClick
}) => {
  // Calculate positions based on the side
  const positionClass = position === 'left' ? 'left-4' : 'right-4';

  return (
    <div className={`fixed ${positionClass} bottom-4 z-50`}>
      <div 
        className={`rounded-full cursor-pointer flex items-center justify-center shadow-md ${transparentTrigger ? 'bg-opacity-70' : ''} transition-transform hover:scale-105`}
        style={{ 
          backgroundColor: transparentTrigger ? 'rgba(255,255,255,0.8)' : accentColor,
          width: `${triggerSize}px`,
          height: `${triggerSize}px`,
        }}
        onClick={onClick}
      >
        <div 
          className={`text-${transparentTrigger ? 'black' : 'white'} text-lg font-medium flex items-center justify-center`} 
          style={{ transform: `scale(${triggerSize / 60})` }}
        >
          {renderAvatar()}
        </div>
      </div>
    </div>
  );
};
