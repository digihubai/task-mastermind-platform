
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ConversationHeader from './ConversationHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { MessageSquare, Clock, Users } from "lucide-react";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import type { Conversation, Message } from "@/types/omnichannel";
import { queueStats } from '../mockData';

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
  // Filter messages for the selected conversation by customer ID instead of just channel
  // This allows us to show messages from all channels for the same customer
  const conversationMessages = selectedConversation 
    ? messages.filter(m => m.customerId === selectedConversation.customerId) 
    : [];
    
  const showQueueInfo = selectedConversation?.assignmentStatus === 'waiting_for_human';

  return (
    <Card className="h-full flex flex-col">
      {selectedConversation ? (
        <>
          <CardHeader className="pb-3 border-b">
            <ConversationHeader 
              conversation={selectedConversation} 
              onAssignToHuman={onAssignToHuman} 
            />
          </CardHeader>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            {showQueueInfo && (
              <Alert className="mx-4 mt-4 bg-amber-50 border border-amber-200">
                <div className="flex flex-col w-full gap-2">
                  <AlertDescription className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span className="text-sm text-amber-700">
                        Estimated wait time: <span className="font-medium">{queueStats.estimatedWaitTime}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-amber-500" />
                      <span className="text-sm text-amber-700">
                        <span className="font-medium">{queueStats.agentsAvailable}</span> agents available
                      </span>
                    </div>
                  </AlertDescription>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Progress value={(queueStats.currentPosition / queueStats.totalInQueue) * 100} className="h-2" />
                    </div>
                    <div className="text-xs text-amber-700">
                      Position <span className="font-medium">{queueStats.currentPosition}</span> of {queueStats.totalInQueue}
                    </div>
                  </div>
                </div>
              </Alert>
            )}
            
            {selectedConversation?.assignmentStatus === 'waiting_for_human' && (
              <Alert className="mx-4 mt-4">
                <AlertDescription>
                  This conversation is waiting for a human agent to take over.
                  {selectedConversation.assignedHumanAgent && (
                    <span className="font-medium"> Assigned to {selectedConversation.assignedHumanAgent}.</span>
                  )}
                </AlertDescription>
              </Alert>
            )}
            
            <MessageList messages={conversationMessages} />
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
