
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Hash,
  Users,
  Lock,
  MoreVertical,
  Pin,
  BellOff,
  UserPlus,
  Trash2
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface TeamChannel {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy: string;
  isPrivate: boolean;
  members: string[];
  lastMessage?: {
    id: string;
    channelId: string;
    content: string;
    createdAt: string;
    senderId: string;
  };
  unreadCount: number;
  isPinned?: boolean;
}

interface TeamGroup {
  id: string;
  name: string;
  members: string[];
  createdAt: string;
  createdBy: string;
  lastMessage?: {
    id: string;
    groupId: string;
    content: string;
    createdAt: string;
    senderId: string;
  };
  unreadCount: number;
  isPinned?: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  status: string;
  avatar?: string;
}

interface ChatSidebarProps {
  channels: TeamChannel[];
  groups: TeamGroup[];
  teamMembers: TeamMember[];
  selectedChannelId: string | null;
  selectedGroupId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectChannel: (channelId: string) => void;
  onSelectGroup: (groupId: string) => void;
  onNewChannelClick: () => void;
  onNewGroupClick: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  channels,
  groups,
  teamMembers,
  selectedChannelId,
  selectedGroupId,
  searchQuery,
  onSearchChange,
  onSelectChannel,
  onSelectGroup,
  onNewChannelClick,
  onNewGroupClick
}) => {
  const [activeTab, setActiveTab] = useState("channels");

  const filteredChannels = channels.filter(channel => 
    searchQuery === "" || 
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGroups = groups.filter(group => 
    searchQuery === "" || 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredTeamMembers = teamMembers.filter(member => 
    searchQuery === "" || 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getChannelIcon = (channel: TeamChannel) => {
    if (channel.isPrivate) return <Lock size={16} />;
    return <Hash size={16} />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="w-60 border-r flex flex-col bg-background">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="channels" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 px-3 pt-3">
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="direct-messages">Direct</TabsTrigger>
        </TabsList>
        
        <TabsContent value="channels" className="flex-1 flex flex-col space-y-1 p-2 overflow-hidden">
          <div className="flex items-center justify-between px-2 py-1.5">
            <h3 className="text-sm font-semibold">Channels</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={onNewChannelClick}
                >
                  <Plus size={16} />
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="space-y-1">
              {filteredChannels.map((channel) => {
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
                      {getChannelIcon(channel)}
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
        </TabsContent>
        
        <TabsContent value="direct-messages" className="flex-1 flex flex-col space-y-1 p-2 overflow-hidden">
          <div className="flex items-center justify-between px-2 py-1.5">
            <h3 className="text-sm font-semibold">Direct Messages</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={onNewGroupClick}
                >
                  <Plus size={16} />
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="space-y-1">
              <div className="px-2 py-1.5">
                <h4 className="text-xs font-medium text-muted-foreground">Groups</h4>
              </div>
              
              {filteredGroups.map((group) => {
                const isSelected = selectedGroupId === group.id;
                
                return (
                  <button
                    key={group.id}
                    className={`w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-md ${
                      isSelected 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => onSelectGroup(group.id)}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          {group.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{group.name}</span>
                    </div>
                    
                    {group.unreadCount > 0 && (
                      <Badge variant="secondary" className="h-5 w-5 text-xs p-0 flex items-center justify-center">
                        {group.unreadCount}
                      </Badge>
                    )}
                  </button>
                );
              })}
              
              <div className="px-2 py-1.5 pt-3">
                <h4 className="text-xs font-medium text-muted-foreground">Team Members</h4>
              </div>
              
              {filteredTeamMembers.map((member) => (
                <button
                  key={member.id}
                  className="w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-md hover:bg-secondary"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Avatar className="h-6 w-6">
                      {member.avatar && <AvatarImage src={member.avatar} />}
                      <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{member.name}</span>
                  </div>
                  
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(member.status)}`} />
                </button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatSidebar;
