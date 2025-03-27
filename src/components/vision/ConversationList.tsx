
import React from "react";
import { Search, MessageSquare, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  name: string;
  timestamp: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

const ConversationList = ({
  conversations,
  activeConversation,
  onSelectConversation,
  onNewConversation,
}: ConversationListProps) => {
  return (
    <div className="space-y-4">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <Input placeholder="Search" className="pl-10" />
      </div>

      <div className="space-y-2">
        {conversations.map((conversation) => (
          <div 
            key={conversation.id}
            className={`flex items-start gap-3 p-2 rounded cursor-pointer hover:bg-muted/60 ${
              activeConversation === conversation.id ? "bg-muted" : ""
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <MessageSquare size={18} className="mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{conversation.name}</p>
              <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <Button 
        variant="default" 
        className="w-full mt-4 gap-2"
        onClick={onNewConversation}
      >
        <Plus size={16} />
        New Conversation
      </Button>
    </div>
  );
};

export default ConversationList;
