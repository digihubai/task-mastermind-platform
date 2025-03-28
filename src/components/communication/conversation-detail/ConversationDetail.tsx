
import React from 'react';
import ConversationHeader from './ConversationHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Conversation } from '@/types/omnichannel';

interface ConversationDetailProps {
  selectedConversation: Conversation | undefined;
  messages: any[];
  onSendMessage: (message: string) => void;
  onAssignToHuman: () => void;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({ 
  selectedConversation,
  messages,
  onSendMessage,
  onAssignToHuman
}) => {
  if (!selectedConversation) {
    return (
      <div className="h-full flex items-center justify-center border rounded-lg">
        <div className="text-center p-8">
          <h3 className="text-lg font-medium">No conversation selected</h3>
          <p className="text-muted-foreground mt-1">Select a conversation from the sidebar to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border rounded-lg bg-background overflow-hidden">
      <div className="px-4 py-3 border-b">
        <ConversationHeader 
          conversation={selectedConversation} 
          onAssignToHuman={onAssignToHuman}
        />
      </div>
      
      <MessageList 
        messages={messages}
        selectedConversation={selectedConversation} 
      />
      
      <MessageInput 
        onSendMessage={onSendMessage} 
        channel={selectedConversation.channel}
      />
    </div>
  );
};

export default ConversationDetail;
