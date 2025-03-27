
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationItem from './ConversationItem';
import type { Conversation } from "@/types/omnichannel";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation
}) => {
  return (
    <ScrollArea className="h-[calc(100vh-400px)]">
      <div className="px-4 space-y-2">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversationId === conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ConversationList;
