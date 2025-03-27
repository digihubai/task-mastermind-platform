
import React from 'react';
import { getChannelIcon } from '../conversation-list/ConversationItem';
import type { Message } from "@/types/omnichannel";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div className={`flex ${message.sender !== 'customer' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          message.sender === 'customer' 
            ? 'bg-muted'
            : message.sender === 'ai' 
              ? 'bg-primary/10 text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground'
        }`}
      >
        {message.sender !== 'customer' && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            {message.sender === 'ai' ? (
              <span className="font-medium">🤖 AI Assistant</span>
            ) : (
              <span className="font-medium">👤 Human Agent</span>
            )}
            <span>•</span>
            <span>{message.time}</span>
            <span>•</span>
            <div className="p-0.5 rounded-full bg-primary/10 text-primary">
              {getChannelIcon(message.channel)}
            </div>
          </div>
        )}
        
        <p className="text-sm">{message.content}</p>
        
        {message.sender === 'customer' && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 justify-end">
            <span>{message.time}</span>
            <span>•</span>
            <div className="p-0.5 rounded-full bg-primary/10 text-primary">
              {getChannelIcon(message.channel)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
