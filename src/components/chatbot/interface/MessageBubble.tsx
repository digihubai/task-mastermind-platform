
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
    <div className={`message ${message.isBot ? 'bot' : 'user'} animate-fade-in`}>
      <div 
        className={`message-bubble p-3 rounded-lg inline-block max-w-[80%] ${
          shouldAlignRight 
            ? 'text-primary-foreground text-right ml-auto shadow-sm' 
            : 'bg-muted text-left ml-0 border border-border/30 shadow-sm'
        }`}
        style={{ 
          backgroundColor: shouldAlignRight ? accentColor : undefined, 
          marginLeft: shouldAlignRight ? 'auto' : 0,
          marginRight: shouldAlignRight ? 0 : 'auto',
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
  );
};
