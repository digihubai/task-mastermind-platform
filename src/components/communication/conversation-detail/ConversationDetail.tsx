import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { BadgeHelp, MoreHorizontal, ThumbsUp, User, UserRound, Eye } from 'lucide-react';
import { Conversation, Message } from '@/types/omnichannel';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import CommunicationChannels from './CommunicationChannels';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface ConversationDetailProps {
  selectedConversation: Conversation | undefined;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onAssignToHuman: () => void;
  onViewProfile: () => void;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  selectedConversation,
  messages,
  onSendMessage,
  onAssignToHuman,
  onViewProfile
}) => {
  const [satisfaction, setSatisfaction] = useState<number | null>(null);
  
  if (!selectedConversation) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center p-6">
          <BadgeHelp className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Conversation Selected</h3>
          <p className="text-muted-foreground">
            Select a conversation from the list to view details and respond
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleSendMessage = (messageText: string) => {
    onSendMessage(messageText);
  };

  const satisfactionPercentage = satisfaction !== null ? satisfaction : 85;

  const conversationMessages = messages.filter(
    message => message.customerId === selectedConversation.customerId
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b px-4 py-3 flex-none">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-medium">
                {selectedConversation.name.substring(0, 2)}
              </div>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{selectedConversation.name}</h3>
                <Badge variant="outline" className="capitalize">
                  {selectedConversation.channel}
                </Badge>
                <Badge variant={selectedConversation.priority === "high" ? "destructive" : "outline"}>
                  {selectedConversation.priority}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground gap-2">
                <span>Customer ID: {selectedConversation.customerId}</span>
                <span>•</span>
                <span>CSAT: {satisfactionPercentage}%</span>
              </div>
            </div>
          </div>
          <div className="flex">
            <Button variant="ghost" size="sm" onClick={onViewProfile} className="mr-2">
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onAssignToHuman()}>
                  <User className="h-4 w-4 mr-2" />
                  Assign to human
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Mark as resolved
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserRound className="h-4 w-4 mr-2" />
                  Update satisfaction
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
        <div className="p-4 border-b">
          <CommunicationChannels customerId={selectedConversation.customerId} />
        </div>
        
        <MessageList 
          messages={conversationMessages.length > 0 ? conversationMessages : messages} 
          className="flex-1 overflow-y-auto p-4"
        />
        
        <div className="p-4 border-t mt-auto">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationDetail;
