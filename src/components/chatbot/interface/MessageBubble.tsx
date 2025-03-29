
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
  
  // For bot messages, respect the position setting
  // User messages are always shown on the right
  const shouldAlignRight = isUserMessage || (message.isBot && position === "right");
  
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString(language !== "auto" ? language : undefined, { hour: '2-digit', minute: '2-digit' });
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString(language !== "auto" ? language : undefined, { 
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }) + ' / ' + 
    date.toLocaleTimeString(language !== "auto" ? language : undefined, { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`message ${message.isBot ? 'bot' : 'user'} animate-fade-in w-full flex ${shouldAlignRight ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[80%]">
        {message.isBot && (
          <div className="text-xs text-muted-foreground mb-1">SupportHub, 1 min ago</div>
        )}
        
        <div 
          className={`message-bubble p-3 rounded-lg ${
            isUserMessage 
              ? 'bg-slate-800 text-white text-right' 
              : 'bg-slate-100 text-slate-800 text-left'
          }`}
          style={message.isBot && accentColor ? { backgroundColor: `${accentColor}20` } : {}}
        >
          {message.text}
        </div>
        
        {isUserMessage && showDateTime && (
          <div className="text-xs text-muted-foreground mt-1 text-right">
            You, 3 min ago
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
