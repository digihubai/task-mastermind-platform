import React, { useState, useEffect } from "react";
import { ChatHeader } from "./interface/ChatHeader";
import { MessageList } from "./interface/MessageList";
import { ChatInput } from "./interface/ChatInput";
import { FloatingTrigger } from "./interface/FloatingTrigger";
import { AvatarRenderer } from "./interface/AvatarRenderer";

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
  showDateTime?: boolean;
  language?: string;
  width?: number;
  height?: number;
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
  showDateTime = true,
  language = "auto",
  width = 420,
  height = 745,
}) => {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean; timestamp: Date }[]>([
    { text: config.initialMessage || "Hello! How can I help you today?", isBot: true, timestamp: new Date() }
  ]);
  
  useEffect(() => {
    if (language && language !== "auto") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { text: message, isBot: false, timestamp: new Date() }]);
    
    setTimeout(() => {
      const botResponses = [
        "I understand your question about that! 😊 Let me help you with it.",
        "That's an interesting point! 🤔 Here's what I think...",
        "I'm looking into that for you right now. ⚡ One moment please.",
        "Great question! 👍 Here's what I found...",
        "I appreciate you asking about that! 🌟 Let me explain..."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { 
        text: randomResponse, 
        isBot: true, 
        timestamp: new Date() 
      }]);
    }, 1000);
  };

  const renderAvatar = () => {
    return <AvatarRenderer avatarType={avatar} />;
  };

  return (
    <div 
      className={`chat-interface ${variant === "embedded" ? "h-[500px] w-full" : "h-full w-full"} border rounded-lg bg-background flex flex-col shadow-sm hover:shadow-md transition-all duration-300`}
      style={{ 
        width: variant === "embedded" ? `${width}px` : undefined,
        height: variant === "embedded" ? `${height}px` : undefined 
      }}
    >
      <ChatHeader 
        title={title} 
        accentColor={accentColor} 
        avatar={avatar}
        renderAvatar={renderAvatar}
      />
      
      <MessageList 
        messages={messages}
        position={position}
        showDateTime={showDateTime}
        accentColor={accentColor}
        language={language}
      />
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        accentColor={accentColor}
        showBranding={showBranding}
      />

      {variant === "embedded" && (
        <FloatingTrigger 
          position={position}
          transparentTrigger={transparentTrigger}
          accentColor={accentColor}
          triggerSize={triggerSize}
          renderAvatar={renderAvatar}
        />
      )}
    </div>
  );
};
