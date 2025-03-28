
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, User, Bot, Send, Smile, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

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
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isBot: boolean; timestamp: Date }[]>([
    { text: config.initialMessage || "Hello! How can I help you today?", isBot: true, timestamp: new Date() }
  ]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Set language based on prop or default
  useEffect(() => {
    if (language && language !== "auto") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString(language !== "auto" ? language : undefined, { hour: '2-digit', minute: '2-digit' });
  };

  const formatFullDate = (date: Date) => {
    const dateOptions = { dateStyle: 'short' } as Intl.DateTimeFormatOptions;
    const timeOptions = { timeStyle: 'short' } as Intl.DateTimeFormatOptions;
    
    return date.toLocaleDateString(language !== "auto" ? language : undefined, dateOptions) + " / " + 
           date.toLocaleTimeString(language !== "auto" ? language : undefined, timeOptions);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message with timestamp
    setMessages([...messages, { text: message, isBot: false, timestamp: new Date() }]);
    
    // Simulate bot response with emoji
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
    
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const renderAvatar = () => {
    // Check if avatar is one of our predefined options or a custom image URL
    if (avatar.startsWith("avatar")) {
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
    } else {
      // If it's a custom image URL
      return (
        <AvatarImage src={avatar} alt="Custom Avatar" className="object-cover" />
      );
    }
  };

  return (
    <div className={`chat-interface ${variant === "embedded" ? "h-[500px] w-full" : "h-full w-full"} border rounded-lg bg-background flex flex-col shadow-sm hover:shadow-md transition-all duration-300`}>
      <div 
        className="chat-header p-3 border-b flex items-center justify-between" 
        style={{ borderColor: accentColor, backgroundColor: `${accentColor}20` }}
      >
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
        {messages.map((msg, index) => {
          // Determine alignment based on message type AND position setting
          const isUserMessage = !msg.isBot;
          
          // For user messages: always on the right
          // For bot messages: depends on position setting
          const shouldAlignRight = isUserMessage || (msg.isBot && position === "right");
          const shouldAlignLeft = !isUserMessage && position === "left";
          
          return (
            <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'} animate-fade-in`}>
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
                {msg.text}
              </div>
              
              {/* Display timestamp if enabled */}
              {showDateTime && (
                <div className={`text-xs text-muted-foreground mt-1 ${shouldAlignRight ? 'text-right' : 'text-left'}`}>
                  {formatFullDate(msg.timestamp)}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input border-t p-3">
        <div className="relative flex items-center gap-2">
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <button 
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Add emoji"
              >
                <Smile size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border shadow-md" align="start">
              <Picker 
                data={data} 
                onEmojiSelect={handleEmojiSelect} 
                theme="light"
                previewPosition="none"
              />
            </PopoverContent>
          </Popover>
          
          <div className="relative flex-1">
            <input 
              type="text" 
              className="w-full border rounded-full py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus-visible:ring-2 focus-visible:ring-offset-2 transition-all" 
              style={{ borderColor: `${accentColor}50` }}
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            
            {message && (
              <button 
                className="absolute right-14 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
                onClick={() => setMessage("")}
                aria-label="Clear message"
              >
                <X size={16} />
              </button>
            )}
            
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white rounded-full p-1.5 transition-transform hover:scale-110"
              onClick={handleSendMessage}
              disabled={!message.trim()}
              style={{ backgroundColor: message.trim() ? accentColor : '#ccc' }}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
        
        {showBranding && (
          <div className="text-center text-xs text-muted-foreground mt-2">
            Powered by DigiHub
          </div>
        )}
      </div>

      {/* Floating trigger button preview based on position */}
      {variant === "embedded" && (
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
      )}
    </div>
  );
};
