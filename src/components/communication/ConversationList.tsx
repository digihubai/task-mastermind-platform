
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Phone, Instagram, Twitter, Facebook } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  message: string;
  unread: boolean;
  time: string;
  channel: string;
  status: string;
  priority: string;
  agent: string | null;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  setSelectedConversation: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  setSelectedConversation
}) => {
  const getChannelIcon = (channel: string) => {
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

  const getStatusColor = (status: string) => {
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

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="px-4 space-y-2">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No conversations found
          </div>
        ) : (
          conversations.map((convo) => (
            <div 
              key={convo.id} 
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedConversation === convo.id ? 'bg-primary/10' : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedConversation(convo.id)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-9 w-9">
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-medium">
                    {convo.name.substring(0, 2)}
                  </div>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium">{convo.name}</p>
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(convo.status)}`}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="p-0.5 rounded-full bg-primary/10 text-primary">
                      {getChannelIcon(convo.channel)}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{convo.message}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1.5">
                    <Badge variant={convo.priority === 'high' ? 'destructive' : (convo.priority === 'medium' ? 'default' : 'outline')} className="text-xs">
                      {convo.priority.charAt(0).toUpperCase() + convo.priority.slice(1)}
                    </Badge>
                    
                    {convo.agent ? (
                      <span className="text-xs text-muted-foreground">
                        {convo.agent === 'AI Assistant' ? '🤖 AI' : `👤 ${convo.agent}`}
                      </span>
                    ) : (
                      <span className="text-xs text-amber-500 font-medium">Unassigned</span>
                    )}
                  </div>
                </div>
                
                {convo.unread && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default ConversationList;
