
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpRight } from "lucide-react";
import type { Conversation } from "@/types/omnichannel";

interface ConversationHeaderProps {
  conversation: Conversation | undefined;
  onAssignToHuman: () => void;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
  onAssignToHuman
}) => {
  if (!conversation) return null;

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
            <Badge variant="outline" className="text-xs capitalize">
              {conversation.channel}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Customer since January 2023 • 5 previous conversations
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onAssignToHuman}>
          <ArrowUpRight size={14} className="mr-1.5" />
          Assign to Human
        </Button>
        <Select defaultValue="open">
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
