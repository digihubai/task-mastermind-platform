
import React from "react";

interface ChatInterfaceProps {
  title: string;
  config: {
    initialMessage: string;
    modelName: string;
    maxTokens: number;
    temperature: number;
  };
  variant: "embedded" | "fullscreen";
  showBranding?: boolean;
  accentColor?: string;
  triggerSize?: number;
  transparentTrigger?: boolean;
  avatar?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  title,
  config,
  variant,
  showBranding = true,
  accentColor = "#2196F3",
  triggerSize = 60,
  transparentTrigger = false,
  avatar = "avatar1",
}) => {
  return (
    <div className={`chat-interface ${variant === "embedded" ? "h-[500px] w-full" : "h-full w-full"} border rounded-lg bg-background`}>
      <div className="chat-header p-3 border-b flex items-center justify-between" style={{ borderColor: accentColor }}>
        <div className="flex items-center gap-2">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground ${transparentTrigger ? 'bg-opacity-70' : ''}`}
            style={{ backgroundColor: accentColor }}
          >
            {title.substring(0, 1).toUpperCase()}
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
      </div>
      
      <div className="chat-messages p-4 h-[calc(100%-110px)] overflow-y-auto">
        <div className="message bot">
          <div className="message-bubble bg-muted p-3 rounded-lg inline-block max-w-[80%]">
            {config.initialMessage || "Hello! How can I help you today?"}
          </div>
        </div>
      </div>
      
      <div className="chat-input border-t p-3">
        <div className="relative">
          <input 
            type="text" 
            className="w-full border rounded-full py-2 px-4 pr-10" 
            placeholder="Type a message..."
            disabled
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2"
            disabled
            style={{ color: accentColor }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>
        
        {showBranding && (
          <div className="text-center text-xs text-muted-foreground mt-2">
            Powered by DigiHub AI
          </div>
        )}
      </div>

      {/* Floating trigger button preview */}
      {variant === "embedded" && (
        <div className="absolute -right-16 bottom-4">
          <div 
            className={`w-${triggerSize ? triggerSize/4 : "15"} h-${triggerSize ? triggerSize/4 : "15"} rounded-full cursor-pointer flex items-center justify-center shadow-md ${transparentTrigger ? 'bg-opacity-70' : ''}`}
            style={{ 
              backgroundColor: transparentTrigger ? 'rgba(255,255,255,0.8)' : accentColor,
              width: `${triggerSize}px`,
              height: `${triggerSize}px`,
            }}
          >
            <span className={`text-${transparentTrigger ? 'black' : 'white'} text-lg font-medium`}>
              {title.substring(0, 1).toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
