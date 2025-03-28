
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpRight, MessageSquare, Mail, Phone, AlertCircle } from "lucide-react";
import type { Conversation } from "@/types/omnichannel";

interface ConversationHeaderProps {
  conversation: Conversation | undefined;
  onAssignToHuman: () => void;
}

const getChannelIcon = (channel: string) => {
  switch (channel.toLowerCase()) {
    case 'email':
      return <Mail size={14} className="mr-1" />;
    case 'phone':
    case 'sms':
      return <Phone size={14} className="mr-1" />;
    case 'chat':
    case 'website':
    default:
      return <MessageSquare size={14} className="mr-1" />;
  }
};

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
  onAssignToHuman
}) => {
  if (!conversation) return null;

  const isAlreadyAssignedToHuman = conversation.assignmentStatus === 'waiting_for_human' || 
                                  conversation.assignmentStatus === 'assigned_to_human';

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-medium">
            {conversation.name.substring(0, 2)}
          </div>
        </Avatar>
        
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{conversation.name}</h3>
            <Badge variant="outline" className="text-xs capitalize flex items-center">
              {getChannelIcon(conversation.channel)}
              {conversation.channel}
            </Badge>
            
            {conversation.assignmentStatus === 'waiting_for_human' && (
              <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800 border-amber-300">
                <AlertCircle size={12} className="mr-1" />
                Waiting for human
              </Badge>
            )}
            
            {conversation.assignmentStatus === 'assigned_to_human' && (
              <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300">
                Human assigned
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Customer since January 2023 • 5 previous conversations
            {conversation.assignedHumanAgent && (
              <span className="ml-2 font-medium">• Assigned to: {conversation.assignedHumanAgent}</span>
            )}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAssignToHuman} 
          disabled={isAlreadyAssignedToHuman}
          className={`${!isAlreadyAssignedToHuman ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : ""}`}
        >
          <ArrowUpRight size={14} className="mr-1.5" />
          {isAlreadyAssignedToHuman ? 'Already Assigned' : 'Assign to Human'}
        </Button>
        <Select defaultValue={conversation.status || "open"}>
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="waiting">Waiting</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ConversationHeader;
