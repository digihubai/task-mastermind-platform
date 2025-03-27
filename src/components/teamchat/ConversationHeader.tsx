
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Hash,
  Users,
  UserPlus,
  Phone,
  Video,
  Pin,
  Search,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ConversationHeaderProps {
  selectedChannel: {
    id: string;
    name: string;
    description?: string;
    members: string[];
  } | null;
  selectedGroup: {
    id: string;
    name: string;
    members: string[];
  } | null;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  selectedChannel,
  selectedGroup
}) => {
  return (
    <div className="p-3 border-b flex items-center justify-between">
      {selectedChannel && (
        <div className="flex items-center gap-2">
          <Hash size={20} />
          <div>
            <h3 className="font-medium">{selectedChannel.name}</h3>
            {selectedChannel.description && (
              <p className="text-xs text-muted-foreground">{selectedChannel.description}</p>
            )}
          </div>
        </div>
      )}
      
      {selectedGroup && (
        <div className="flex items-center gap-2">
          <Users size={20} />
          <div>
            <h3 className="font-medium">{selectedGroup.name}</h3>
            <p className="text-xs text-muted-foreground">
              {selectedGroup.members.length} members
            </p>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <UserPlus size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Phone size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Video size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pin size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search size={18} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as read</DropdownMenuItem>
            <DropdownMenuItem>Notification settings</DropdownMenuItem>
            <DropdownMenuItem>Create channel</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Leave channel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ConversationHeader;
