
import React, { useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from './MessageItem';
import type { Message, Conversation } from "@/types/omnichannel";

interface MessageListProps {
  messages: Message[];
  selectedConversation: Conversation;
}

const MessageList: React.FC<MessageListProps> = ({ messages, selectedConversation }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 0);
    }
  }, [messages]);
  
  return (
    <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageItem 
              key={message.id} 
              message={message} 
              channel={selectedConversation.channel}
            />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <p>No messages yet in this conversation.</p>
            <p className="text-sm">Send a message to start the conversation.</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
