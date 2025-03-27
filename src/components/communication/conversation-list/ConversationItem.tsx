
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, MessageSquare, Phone, Instagram, 
  Twitter, Facebook 
} from "lucide-react";
import type { Conversation } from "@/types/omnichannel";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'email':
      return <Mail size={16} />;
    case 'chat':
      return <MessageSquare size={16} />;
    case 'sms':
      return <MessageSquare size={16} />;
    case 'phone':
      return <Phone size={16} />;
    case 'instagram':
      return <Instagram size={16} />;
    case 'twitter':
      return <Twitter size={16} />;
    case 'facebook':
      return <Facebook size={16} />;
    default:
      return <MessageSquare size={16} />;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-blue-500';
    case 'active':
      return 'bg-green-500';
    case 'waiting':
      return 'bg-yellow-500';
    case 'closed':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const ConversationItem: React.FC<ConversationItemProps> = ({ 
  conversation, 
  isSelected,
  onClick
}) => {
  return (
    <div 
      className={`p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-primary/10' : 'hover:bg-muted'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-9 w-9">
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-medium">
            {conversation.name.substring(0, 2)}
          </div>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <p className="font-medium">{conversation.name}</p>
              <div className={`h-2 w-2 rounded-full ${getStatusColor(conversation.status)}`}></div>
            </div>
            <span className="text-xs text-muted-foreground">{conversation.time}</span>
          </div>
          
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="p-0.5 rounded-full bg-primary/10 text-primary">
              {getChannelIcon(conversation.channel)}
            </div>
            <p className="text-sm text-muted-foreground truncate">{conversation.message}</p>
          </div>
          
          <div className="flex items-center justify-between mt-1.5">
            <Badge 
              variant={conversation.priority === 'high' ? 'destructive' : (conversation.priority === 'medium' ? 'default' : 'outline')} 
              className="text-xs"
            >
              {conversation.priority.charAt(0).toUpperCase() + conversation.priority.slice(1)}
            </Badge>
            
            {conversation.agent ? (
              <span className="text-xs text-muted-foreground">
                {conversation.agent === 'AI Assistant' ? '🤖 AI' : `👤 ${conversation.agent}`}
              </span>
            ) : (
              <span className="text-xs text-amber-500 font-medium">Unassigned</span>
            )}
          </div>
        </div>
        
        {conversation.unread && (
          <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
