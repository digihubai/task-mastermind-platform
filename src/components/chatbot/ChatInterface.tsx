
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, User, Bot, Send } from "lucide-react";

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
  position?: "left" | "right";
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
  position = "right",
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: config.initialMessage || "Hello! How can I help you today?", isBot: true }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: message, isBot: false }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "This is a preview of how the chatbot would respond to your message.", 
        isBot: true 
      }]);
    }, 1000);
    
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderAvatar = () => {
    switch(avatar) {
      case "avatar1":
        return <User className="text-primary-foreground" />;
      case "avatar2":
        return <User className="text-purple-500" />;
      case "avatar3":
        return <User className="text-green-500" />;
      case "avatar4":
        return <User className="text-orange-500" />;
      case "avatar5":
        return <MessageCircle className="text-blue-500" />;
      default:
        return <Bot className="text-primary-foreground" />;
    }
  };

  return (
    <div className={`chat-interface ${variant === "embedded" ? "h-[500px] w-full" : "h-full w-full"} border rounded-lg bg-background flex flex-col`}>
      <div className="chat-header p-3 border-b flex items-center justify-between" style={{ borderColor: accentColor }}>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback 
              style={{ backgroundColor: accentColor }}
              className={`${transparentTrigger ? 'bg-opacity-70' : ''}`}
            >
              {renderAvatar()}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-medium">{title}</h3>
        </div>
      </div>
      
      <div className="chat-messages p-4 h-[calc(100%-110px)] overflow-y-auto flex flex-col gap-3">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
            <div 
              className={`message-bubble p-3 rounded-lg inline-block max-w-[80%] ${
                msg.isBot 
                  ? 'bg-muted text-left ml-0' 
                  : 'bg-primary text-primary-foreground text-right ml-auto'
              }`}
              style={{ backgroundColor: msg.isBot ? undefined : accentColor }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="chat-input border-t p-3">
        <div className="relative">
          <input 
            type="text" 
            className="w-full border rounded-full py-2 px-4 pr-10" 
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white rounded-full p-1"
            onClick={handleSendMessage}
            style={{ backgroundColor: accentColor }}
          >
            <Send size={16} />
          </button>
        </div>
        
        {showBranding && (
          <div className="text-center text-xs text-muted-foreground mt-2">
            Powered by DigiHub AI
          </div>
        )}
      </div>

      {/* Floating trigger button preview based on position */}
      {variant === "embedded" && (
        <div className={`absolute ${position === 'left' ? '-left-16' : '-right-16'} bottom-4`}>
          <div 
            className={`rounded-full cursor-pointer flex items-center justify-center shadow-md ${transparentTrigger ? 'bg-opacity-70' : ''}`}
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
      )}
    </div>
  );
};
