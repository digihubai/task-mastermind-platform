
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  UserRound, 
  History, 
  Ban, 
  XCircle,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Flag,
  AlertCircle,
  MessageCircleWarning,
} from "lucide-react";
import type { Conversation } from "@/types/omnichannel";
import { toast } from "@/hooks/use-toast";

interface ConversationHeaderProps {
  conversation: Conversation | undefined;
  onAssignToHuman: () => void;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ 
  conversation,
  onAssignToHuman,
}) => {
  if (!conversation) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'resolved':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <MessageCircleWarning className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Flag className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const handleViewProfile = () => {
    toast({
      title: "View Customer Profile",
      description: `Viewing profile for customer ${conversation.name}`,
    });
  };

  const handlePreviousConversations = () => {
    toast({
      title: "Previous Conversations",
      description: `Loading previous conversations with ${conversation.name}`,
    });
  };

  const handleBlockCustomer = () => {
    toast({
      title: "Block Customer",
      description: "This would block the customer in a real application",
      variant: "destructive",
    });
  };

  const handleCloseConversation = () => {
    toast({
      title: "Close Conversation",
      description: "This conversation has been closed",
    });
  };

  const handlePriority = (priority: string) => {
    toast({
      title: "Priority Changed",
      description: `Conversation priority set to ${priority}`,
    });
  };

  const handleStatus = (status: string) => {
    toast({
      title: "Status Changed",
      description: `Conversation status set to ${status}`,
    });
  };

  return (
    <div className="border-b p-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">{conversation.name}</h2>
            <Badge variant="outline">{conversation.channel}</Badge>
            <Badge className={getStatusColor(conversation.status)}>
              {conversation.status}
            </Badge>
            {getPriorityIcon(conversation.priority)}
          </div>
          <p className="text-sm text-muted-foreground">
            {conversation?.isAiHandled ? "Handled by AI assistant" : conversation?.agent ? `Agent: ${conversation.agent}` : "Unassigned"}
            {conversation?.lastUpdated && ` • Last updated: ${new Date(conversation.lastUpdated).toLocaleString()}`}
          </p>
        </div>

        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAssignToHuman} 
            disabled={conversation.assignmentStatus === 'waiting_for_human' || conversation.assignmentStatus === 'assigned_to_human'}
          >
            {conversation.assignmentStatus === 'waiting_for_human' ? 'Queued for human' : 
             conversation.assignmentStatus === 'assigned_to_human' ? 'Assigned to human' : 
             'Assign to human'}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleViewProfile}>
                <UserRound className="mr-2 h-4 w-4" />
                <span>View Customer Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePreviousConversations}>
                <History className="mr-2 h-4 w-4" />
                <span>See Previous Conversations</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full justify-start cursor-pointer flex items-center p-2 text-sm hover:bg-muted">
                  <Flag className="mr-2 h-4 w-4" />
                  <span>Set Priority</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handlePriority("high")}>
                    <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                    <span>High</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlePriority("medium")}>
                    <MessageCircleWarning className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>Medium</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlePriority("low")}>
                    <Flag className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Low</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full justify-start cursor-pointer flex items-center p-2 text-sm hover:bg-muted">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Set Status</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleStatus("open")}>
                    <AlertTriangle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatus("in-progress")}>
                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                    <span>In Progress</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatus("resolved")}>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Resolved</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleBlockCustomer} className="text-red-600 hover:text-red-700">
                <Ban className="mr-2 h-4 w-4" />
                <span>Block Customer</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCloseConversation} className="text-red-600 hover:text-red-700">
                <XCircle className="mr-2 h-4 w-4" />
                <span>Close Conversation</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
