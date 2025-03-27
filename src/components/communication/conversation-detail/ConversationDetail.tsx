
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ConversationHeader from './ConversationHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { MessageSquare } from "lucide-react";
import type { Conversation, Message } from "@/types/omnichannel";

interface ConversationDetailProps {
  selectedConversation: Conversation | undefined;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onAssignToHuman: () => void;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  selectedConversation,
  messages,
  onSendMessage,
  onAssignToHuman
}) => {
  return (
    <Card className="h-[calc(100vh-180px)] flex flex-col">
      {selectedConversation ? (
        <>
          <CardHeader className="pb-3 border-b">
            <ConversationHeader 
              conversation={selectedConversation} 
              onAssignToHuman={onAssignToHuman} 
            />
          </CardHeader>
          
          <div className="flex-1 overflow-hidden">
            <MessageList messages={messages} />
          </div>
          
          <MessageInput onSendMessage={onSendMessage} />
        </>
      ) : (
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <MessageSquare size={48} className="mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">No conversation selected</h3>
            <p className="text-muted-foreground">Select a conversation from the list to view details</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ConversationDetail;
