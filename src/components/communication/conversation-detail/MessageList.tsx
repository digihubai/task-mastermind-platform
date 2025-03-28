
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from './MessageItem';
import type { Message, Conversation } from "@/types/omnichannel";

interface MessageListProps {
  messages: Message[];
  selectedConversation: Conversation;
}

const MessageList: React.FC<MessageListProps> = ({ messages, selectedConversation }) => {
  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageItem 
            key={message.id} 
            message={message} 
            channel={selectedConversation.channel}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
