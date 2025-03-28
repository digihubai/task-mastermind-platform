
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from '@/types/omnichannel';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: Message;
  channel?: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, channel }) => {
  // Determine if the message is from the current user
  const isFromCustomer = message.sender === 'customer';
  const isFromAI = message.sender === 'ai';
  const isFromHuman = message.sender === 'human';
  
  // Function to get initials from sender name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  // Get avatar fallback text
  const avatarFallback = isFromCustomer 
    ? getInitials('Customer') 
    : isFromAI 
      ? 'AI' 
      : 'CS';
  
  // Get avatar image based on sender
  const avatarImage = isFromCustomer 
    ? '/avatars/customer.png' 
    : isFromAI 
      ? '/avatars/ai-assistant.png' 
      : '/avatars/support-agent.png';
  
  return (
    <div className={cn(
      "flex items-start gap-3",
      isFromCustomer ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarImage} alt={isFromCustomer ? "Customer" : "Support"} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "rounded-lg px-4 py-2 max-w-[80%] break-words",
        isFromCustomer 
          ? "bg-primary text-primary-foreground ml-auto" 
          : isFromAI 
            ? "bg-secondary text-secondary-foreground"
            : "bg-muted text-muted-foreground"
      )}>
        <div className="text-sm">
          {message.content}
        </div>
        <div className="text-xs opacity-70 text-right mt-1">
          {new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {channel && <span className="ml-1">• {channel}</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
