
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, MessageSquare, Phone, Instagram, 
  Twitter, Facebook, AlertCircle, Video,
  MessageCircle, Podcast, Smartphone
} from "lucide-react";
import type { Conversation } from "@/types/omnichannel";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export const getChannelIcon = (channel: string) => {
  switch (channel.toLowerCase()) {
    case 'email':
      return <Mail size={16} className="text-blue-500" />;
    case 'chat':
    case 'website':
      return <MessageSquare size={16} className="text-green-500" />;
    case 'sms':
      return <MessageCircle size={16} className="text-purple-500" />;
    case 'phone':
      return <Phone size={16} className="text-red-500" />;
    case 'video':
      return <Video size={16} className="text-orange-500" />;
    case 'voice':
      return <Podcast size={16} className="text-pink-500" />;
    case 'whatsapp':
      return <Smartphone size={16} className="text-green-600" />;
    case 'instagram':
      return <Instagram size={16} className="text-pink-600" />;
    case 'twitter':
    case 'x':
      return <Twitter size={16} className="text-blue-400" />;
    case 'facebook':
    case 'messenger':
      return <Facebook size={16} className="text-blue-600" />;
    default:
      return <MessageSquare size={16} className="text-gray-500" />;
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
  const isWaitingForHuman = conversation.assignmentStatus === 'waiting_for_human';
  const isAssignedToHuman = conversation.assignmentStatus === 'assigned_to_human';
  
  // Format the date/time for display
  const messageDate = new Date(conversation.time);
  const formattedDate = messageDate.toLocaleDateString();
  const formattedTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div 
      className={`p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-primary/10' : isWaitingForHuman ? 'bg-amber-50' : 'hover:bg-muted'
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
              {isWaitingForHuman && (
                <AlertCircle size={12} className="text-amber-500" />
              )}
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground">{conversation.time}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{formattedDate}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="p-1 rounded-full bg-primary/10 text-primary">
              {getChannelIcon(conversation.channel)}
            </div>
            <Badge variant="outline" className="text-xs px-1.5 py-0 h-5 font-normal">
              {conversation.channel}
            </Badge>
            <p className="text-sm text-muted-foreground truncate">{conversation.message}</p>
          </div>
          
          <div className="flex items-center justify-between mt-1.5">
            <Badge 
              variant={conversation.priority === 'high' ? 'destructive' : (conversation.priority === 'medium' ? 'default' : 'outline')} 
              className="text-xs"
            >
              {conversation.priority.charAt(0).toUpperCase() + conversation.priority.slice(1)}
            </Badge>
            
            {isWaitingForHuman ? (
              <span className="text-xs text-amber-500 font-medium">Waiting for human</span>
            ) : isAssignedToHuman ? (
              <span className="text-xs text-green-600 font-medium">Human assigned</span>
            ) : conversation.agent ? (
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
