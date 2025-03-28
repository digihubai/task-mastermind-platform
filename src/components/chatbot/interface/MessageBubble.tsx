
import React from "react";

interface MessageBubbleProps {
  message: {
    text: string;
    isBot: boolean;
    timestamp: Date;
  };
  position: "left" | "right";
  showDateTime: boolean;
  accentColor: string;
  language: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  position,
  showDateTime,
  accentColor,
  language
}) => {
  // Determine alignment: 
  // - User messages are always right-aligned
  // - Bot messages are aligned according to position setting
  const isUserMessage = !message.isBot;
  const shouldAlignRight = isUserMessage || (message.isBot && position === "right");
  
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString(language !== "auto" ? language : undefined, { hour: '2-digit', minute: '2-digit' });
  };

  const formatFullDate = (date: Date) => {
    const dateOptions = { dateStyle: 'short' } as Intl.DateTimeFormatOptions;
    const timeOptions = { timeStyle: 'short' } as Intl.DateTimeFormatOptions;
    
    return date.toLocaleDateString(language !== "auto" ? language : undefined, dateOptions) + " / " + 
           date.toLocaleTimeString(language !== "auto" ? language : undefined, timeOptions);
  };

  return (
    <div className={`message ${message.isBot ? 'bot' : 'user'} animate-fade-in w-full flex ${shouldAlignRight ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[80%]">
        <div 
          className={`message-bubble p-3 rounded-lg ${
            shouldAlignRight 
              ? 'text-primary-foreground text-right shadow-sm' 
              : 'bg-muted text-left border border-border/30 shadow-sm'
          }`}
          style={{ 
            backgroundColor: shouldAlignRight ? accentColor : undefined
          }}
        >
          {message.text}
        </div>
        
        {showDateTime && (
          <div className={`text-xs text-muted-foreground mt-1 ${shouldAlignRight ? 'text-right' : 'text-left'}`}>
            {formatFullDate(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};
