
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus } from "lucide-react";

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
  onNewConversation
}: ConversationListProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Conversations</h3>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-8 w-8 p-0"
          onClick={onNewConversation}
        >
          <Plus size={16} />
        </Button>
      </div>
      
      <div className="space-y-1">
        {conversations.map((conversation) => (
          <Button
            key={conversation.id}
            variant="ghost"
            className={`w-full justify-start ${
              activeConversation === conversation.id 
                ? "bg-accent text-accent-foreground" 
                : ""
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <MessageSquare size={16} className="mr-2" />
            <div className="flex flex-col items-start">
              <span className="text-sm">{conversation.name}</span>
              <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
            </div>
          </Button>
        ))}
      </div>
    </>
  );
};

export default ConversationList;
