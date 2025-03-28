
import React from 'react';
import { Conversation } from '@/types/omnichannel';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, PhoneCall, Video, User, History, Ban, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

interface ConversationHeaderProps {
  conversation: Conversation;
  onAssignToHuman: () => void;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ 
  conversation, 
  onAssignToHuman 
}) => {
  const navigate = useNavigate();

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'whatsapp': return '📱';
      case 'email': return '📧';
      case 'messenger': return '💬';
      case 'telegram': return '📨';
      case 'slack': return '🔷';
      case 'sms': return '✉️';
      case 'website': return '🌐';
      case 'chat': return '💭';
      case 'voice': return '🔊';
      default: return '💬';
    }
  };
  
  const handleViewCustomerProfile = () => {
    navigate(`/customers/${conversation.customerId}`);
    toast({
      title: "Opening customer profile",
      description: `Viewing profile for ${conversation.name}`
    });
  };

  const handleViewPreviousConversations = () => {
    navigate(`/customers/${conversation.customerId}/conversations`);
    toast({
      title: "Previous conversations",
      description: `Viewing conversation history for ${conversation.name}`
    });
  };
  
  const handleBlockCustomer = () => {
    toast({
      title: "Customer blocked",
      description: `${conversation.name} has been added to the block list`,
      variant: "destructive"
    });
  };
  
  const handleCloseConversation = () => {
    toast({
      title: "Conversation closed",
      description: "This conversation has been marked as resolved",
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/avatars/customer.png" alt={conversation.name} />
          <AvatarFallback>{conversation.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm flex items-center">
            {conversation.name}
            <Badge variant="outline" className="ml-2 px-1.5 py-0.5 text-xs">
              {getChannelIcon(conversation.channel)} {conversation.channel}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            Last active: {new Date(conversation.time).toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAssignToHuman}
          disabled={conversation.assignmentStatus === 'waiting_for_human' || conversation.assignmentStatus === 'assigned_to_human'}
        >
          Assign to Human
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <PhoneCall className="mr-2 h-4 w-4" /> Start Voice Call
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Video className="mr-2 h-4 w-4" /> Start Video Call
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleViewCustomerProfile}>
              <User className="mr-2 h-4 w-4" /> View Customer Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewPreviousConversations}>
              <History className="mr-2 h-4 w-4" /> See Previous Conversations
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleBlockCustomer}>
              <Ban className="mr-2 h-4 w-4" /> Block Customer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCloseConversation}>
              <XCircle className="mr-2 h-4 w-4" /> Close Conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ConversationHeader;
