
import React from "react";
import { TeamChannel } from "@/types/support";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hash, MoreVertical, Pin, BellOff, UserPlus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChannelSidebarProps {
  channels: TeamChannel[];
  searchQuery: string;
  selectedChannelId: string | null;
  onSelectChannel: (channelId: string) => void;
  onCreateChannel: () => void;
}

const ChannelSidebar: React.FC<ChannelSidebarProps> = ({
  channels,
  searchQuery,
  selectedChannelId,
  onSelectChannel,
  onCreateChannel
}) => {
  return (
    <>
      <div className="flex items-center justify-between px-2 py-1.5">
        <h3 className="text-sm font-semibold">Channels</h3>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onCreateChannel}>
          <Plus size={16} />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-1">
          {channels
            .filter(channel => 
              searchQuery === "" || 
              channel.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((channel) => {
              const isSelected = selectedChannelId === channel.id;
              
              return (
                <button
                  key={channel.id}
                  className={`w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-md ${
                    isSelected 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => onSelectChannel(channel.id)}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Hash size={16} />
                    <span className="truncate">{channel.name}</span>
                  </div>
                  
                  {channel.isPinned && (
                    <Pin size={14} className="text-muted-foreground" />
                  )}
                  
                  {channel.unreadCount > 0 && (
                    <Badge variant="secondary" className="h-5 w-5 text-xs p-0 flex items-center justify-center">
                      {channel.unreadCount}
                    </Badge>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Pin size={14} /> 
                        {channel.isPinned ? "Unpin channel" : "Pin channel"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <BellOff size={14} /> Mute notifications
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <UserPlus size={14} /> Invite people
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 size={14} /> Delete channel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </button>
              );
            })}
        </div>
      </ScrollArea>
    </>
  );
};

export default ChannelSidebar;
