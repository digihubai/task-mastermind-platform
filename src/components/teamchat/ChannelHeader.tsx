
import React from "react";
import { TeamChannel, TeamGroup } from "@/types/support";
import { Button } from "@/components/ui/button";
import { 
  Hash, 
  Users, 
  MoreVertical, 
  Info, 
  Pin, 
  Palette, 
  UserPlus, 
  Phone, 
  Video, 
  Search 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChannelHeaderProps {
  selectedChannel: TeamChannel | null;
  selectedGroup: TeamGroup | null;
  onInfoClick: () => void;
  onPinnedClick: () => void;
  onCanvasClick: () => void;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({
  selectedChannel,
  selectedGroup,
  onInfoClick,
  onPinnedClick,
  onCanvasClick
}) => {
  return (
    <div className="p-3 border-b flex items-center justify-between">
      {selectedChannel && (
        <div className="flex items-center gap-2">
          <Hash size={20} />
          <div>
            <h3 className="font-medium">{selectedChannel.name}</h3>
            {selectedChannel.topic && (
              <p className="text-xs text-muted-foreground">{selectedChannel.topic}</p>
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
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onInfoClick}
          title="Channel Info"
        >
          <Info size={18} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onPinnedClick}
          title="Pinned Messages"
        >
          <Pin size={18} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onCanvasClick}
          title="Channel Canvas"
        >
          <Palette size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Add People">
          <UserPlus size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Start Call">
          <Phone size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Start Video Call">
          <Video size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Search Messages">
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
            <DropdownMenuItem>Copy channel link</DropdownMenuItem>
            <DropdownMenuItem>Add to favorites</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Leave channel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChannelHeader;
