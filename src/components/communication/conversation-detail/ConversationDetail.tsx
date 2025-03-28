
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

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
  const [satisfactionScore, setSatisfactionScore] = useState<number>(85);
  const [isUpdateSatisfactionDialogOpen, setIsUpdateSatisfactionDialogOpen] = useState(false);
  const { toast } = useToast();
  
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
  
  const handleResolveConversation = () => {
    toast({
      title: "Conversation resolved",
      description: "The conversation has been marked as resolved."
    });
  };
  
  const handleUpdateSatisfaction = () => {
    setIsUpdateSatisfactionDialogOpen(true);
  };
  
  const handleSaveSatisfactionUpdate = () => {
    toast({
      title: "Satisfaction score updated",
      description: `Customer satisfaction score has been updated to ${satisfactionScore}%.`
    });
    setIsUpdateSatisfactionDialogOpen(false);
  };

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
                <span>CSAT: {satisfactionScore}%</span>
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
                <DropdownMenuItem onSelect={onAssignToHuman}>
                  <User className="h-4 w-4 mr-2" />
                  Assign to human
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleResolveConversation}>
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Mark as resolved
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleUpdateSatisfaction}>
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
      
      {/* Update Satisfaction Dialog */}
      <Dialog open={isUpdateSatisfactionDialogOpen} onOpenChange={setIsUpdateSatisfactionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Customer Satisfaction Score</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Satisfaction Score: {satisfactionScore}%</Label>
              </div>
              <Slider
                value={[satisfactionScore]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setSatisfactionScore(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Unsatisfied</span>
                <span>Very Satisfied</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Feedback Source:</p>
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="agent-input" 
                  name="feedback-source"
                  defaultChecked
                />
                <label htmlFor="agent-input" className="text-sm">Agent Input</label>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <input 
                  type="radio" 
                  id="csat-survey" 
                  name="feedback-source" 
                />
                <label htmlFor="csat-survey" className="text-sm">CSAT Survey</label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsUpdateSatisfactionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveSatisfactionUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ConversationDetail;
