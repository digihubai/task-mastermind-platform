
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
  // For user messages, they are always shown on the right
  // Bot messages respect the position setting (left or right)
  const shouldAlignRight = !message.isBot || (message.isBot && position === "right");
  
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString(language !== "auto" ? language : undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString(language !== "auto" ? language : undefined, { 
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }) + ' ' + 
    date.toLocaleTimeString(language !== "auto" ? language : undefined, { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`flex w-full ${shouldAlignRight ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className="max-w-[80%]">
        <div 
          className={`message-bubble p-3 rounded-lg ${
            message.isBot 
              ? 'bot text-muted-foreground rounded-tl-sm' 
              : 'user text-white text-right rounded-tr-sm'
          }`}
          style={message.isBot && accentColor ? { backgroundColor: `${accentColor}20` } : {}}
        >
          {message.text}
        </div>
        
        {showDateTime && (
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {formatMessageTime(message.timestamp)}
          </div>
        )}
        
        {message.isBot && message.text.includes("refund") && (
          <div className="text-xs text-muted-foreground mt-1">
            {formatFullDate(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};
