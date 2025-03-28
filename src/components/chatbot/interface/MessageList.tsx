
import React, { useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: Array<{
    text: string;
    isBot: boolean;
    timestamp: Date;
  }>;
  position: "left" | "right";
  showDateTime: boolean;
  accentColor: string;
  language: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  position,
  showDateTime,
  accentColor,
  language
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-messages p-4 h-[calc(100%-110px)] overflow-y-auto flex flex-col gap-3">
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          message={message}
          position={position}
          showDateTime={showDateTime}
          accentColor={accentColor}
          language={language}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
