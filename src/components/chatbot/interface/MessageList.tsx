
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: { text: string; isBot: boolean; timestamp: Date }[];
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
  return (
    <ScrollArea className="flex-1 px-4 py-3">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
            position={position}
            showDateTime={showDateTime}
            accentColor={accentColor}
            language={language}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
