
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Message } from '@/types/omnichannel';
import { cn } from '@/lib/utils';
import { getChannelIcon } from '../conversation-list/ConversationItem';

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

  // IMPORTANT: AI and human agent messages should be on the right side, customer messages on the left
  const isAgent = isFromAI || isFromHuman;
  
  // Format date
  const messageDate = new Date(message.time);
  const formattedDate = messageDate.toLocaleDateString();
  const formattedTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className={cn(
      "flex items-start gap-3 mb-4",
      isAgent ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarImage} alt={isFromCustomer ? "Customer" : "Support"} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col">
        <div className={cn(
          "rounded-lg px-4 py-2 max-w-[80%] break-words",
          isAgent 
            ? "bg-primary text-primary-foreground ml-auto" 
            : "bg-muted text-muted-foreground"
        )}>
          <div className="text-sm">
            {message.content}
          </div>
        </div>
        
        <div className={cn(
          "flex items-center gap-2 text-xs text-muted-foreground mt-1",
          isAgent ? "justify-end" : "justify-start"
        )}>
          <span>{formattedTime}</span>
          <span>{formattedDate}</span>
          {message.channel && (
            <div className="flex items-center gap-1">
              <span>•</span>
              {getChannelIcon(message.channel)}
              <Badge variant="outline" className="text-xs px-1.5 py-0 h-5 font-normal">
                {message.channel}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
