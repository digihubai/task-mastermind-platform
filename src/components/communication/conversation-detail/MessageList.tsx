
import React from 'react';
import { Message } from '@/types/omnichannel';
import MessageItem from './MessageItem';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
  className?: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, className }) => {
  return (
    <div className={cn("space-y-4 p-4", className)}>
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No messages yet</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem key={message.id} message={message} channel={message.channel} />
        ))
      )}
    </div>
  );
};

export default MessageList;
