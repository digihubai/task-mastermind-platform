import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamChannel, TeamGroup, TeamMessage } from "@/types/support";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  Hash, 
  Settings, 
  MoreVertical, 
  Pin, 
  EyeOff, 
  UserPlus, 
  Users, 
  User, 
  Bell,
  BellOff,
  Phone,
  Video,
  FileText,
  Image as ImageIcon,
  Smile,
  ArrowRight,
  Reply,
  Copy,
  BookmarkPlus,
  Edit,
  Trash2,
  Share,
  MessageSquare,
  Heart,
  ThumbsUp,
  Paperclip,
  Send,
  Gift,
  Info,
  ChevronDown,
  ChevronUp,
  Save,
  X
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mockChannels: TeamChannel[] = [
  {
    id: "channel-1",
    name: "general",
    description: "General discussions",
    createdAt: "2023-04-01T10:00:00Z",
    createdBy: "user-1",
    isPrivate: false,
    members: ["user-1", "user-2", "user-3"],
    lastMessage: {
      id: "msg-1",
      channelId: "channel-1",
      content: "Has anyone seen the new product demo?",
      createdAt: "2023-04-15T14:30:00Z",
      senderId: "user-2"
    },
    unreadCount: 3,
    isPinned: true
  },
  {
    id: "channel-2",
    name: "support",
    description: "Customer support discussions",
    createdAt: "2023-05-15T10:30:00Z",
    createdBy: "user-1",
    isPrivate: false,
    members: ["user-1", "user-2"],
    unreadCount: 3,
    isPinned: true,
  },
  {
    id: "channel-3",
    name: "development",
    description: "Development team channel",
    createdAt: "2023-05-15T11:00:00Z",
    createdBy: "user-2",
    isPrivate: true,
    members: ["user-1", "user-2"],
    unreadCount: 0,
    isPinned: false,
  }
];

const mockGroups: TeamGroup[] = [
  {
    id: "group-1",
    name: "Project Alpha Team",
    members: ["user-1", "user-2", "user-3"],
    createdAt: "2023-04-02T11:00:00Z",
    createdBy: "user-1",
    lastMessage: {
      id: "msg-7",
      groupId: "group-1",
      content: "Let's finalize the design by tomorrow",
      createdAt: "2023-04-15T16:45:00Z",
      senderId: "user-3"
    },
    unreadCount: 2
  },
  {
    id: "group-2",
    name: "Project X",
    members: ["user-1", "user-2", "user-3"],
    createdAt: "2023-05-15T13:00:00Z",
    createdBy: "user-2",
    unreadCount: 0,
    isPinned: false,
  }
];

type TeamMember = {
  id: string;
  name: string;
  status: string;
  avatar?: string;
};

const mockTeamMembers: TeamMember[] = [
  {
    id: "user-1",
    name: "John Doe",
    avatar: "/avatar-1.png",
    status: "online"
  },
  {
    id: "user-2",
    name: "Jane Smith",
    status: "away"
  },
  {
    id: "user-3",
    name: "Michael Johnson",
    avatar: "/avatar-3.png",
    status: "offline"
  }
];

const mockMessages: TeamMessage[] = [
  {
    id: "msg-1",
    channelId: "channel-1",
    content: "Has anyone seen the new product demo?",
    createdAt: "2023-04-15T14:30:00Z",
    senderId: "user-2"
  },
  {
    id: "msg-2",
    channelId: "channel-1",
    content: "Thanks for setting this up! I think this will really improve our communication.",
    createdAt: "2023-05-15T14:05:00Z",
    senderId: "user-2",
    reactions: [
      { emoji: "👍", count: 1, users: ["user-1"] }
    ]
  },
  {
    id: "msg-3",
    channelId: "channel-1",
    content: "I've shared some documents for the upcoming meeting. Please take a look when you get a chance.",
    createdAt: "2023-05-15T14:10:00Z",
    senderId: "user-3",
    attachments: [
      {
        id: "attach-1",
        name: "meeting-agenda.pdf",
        url: "/attachments/meeting-agenda.pdf",
        type: "application/pdf",
        size: 2500000,
        createdAt: "2023-05-15T14:10:00Z"
      }
    ]
  },
  {
    id: "msg-4",
    channelId: "channel-1",
    content: "Just a reminder that we have a team meeting tomorrow at 10 AM.",
    createdAt: "2023-05-15T16:00:00Z",
    senderId: "user-1",
    mentions: ["user-2", "user-3"]
  }
];

const mockGifs = [
  { id: "gif1", url: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif", title: "Happy" },
  { id: "gif2", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnlya2VpamRjcHUyNDI2c2JzMHRtOTduemRmdWFvYWZ0ZTB6YmtpcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ju7l5y9osyymQ/giphy.gif", title: "Thinking" },
  { id: "gif3", url: "https://media.giphy.com/media/3oKIPf3C7HqqYBVcCk/giphy.gif", title: "Working" },
  { id: "gif4", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZrYmJ3YTNram43dDZsZXk3MjY3ajg3dW1qZGx6cGxvYWwyb2YwdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwytHcusSCXXp96/giphy.gif", title: "Hello" },
];

interface PinnedMessage {
  id: string;
  channelId: string;
  content: string;
  createdAt: string;
  senderId: string;
}

const mockPinnedMessages: PinnedMessage[] = [
  {
    id: "pin-1",
    channelId: "channel-1",
    content: "Important: Team meeting tomorrow at 10 AM",
    createdAt: "2023-05-15T12:00:00Z",
    senderId: "user-1"
  },
  {
    id: "pin-2",
    channelId: "channel-1",
    content: "Product release scheduled for next Friday",
    createdAt: "2023-05-16T09:30:00Z",
    senderId: "user-2"
  }
];

export const TeamChat: React.FC = () => {
  const [activeTab, setActiveTab] = useState("channels");
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>("channel-1");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [channels, setChannels] = useState<TeamChannel[]>(mockChannels);
  const [groups, setGroups] = useState<TeamGroup[]>(mockGroups);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifSearchQuery, setGifSearchQuery] = useState("");
  
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
  const [newChannelIsPrivate, setNewChannelIsPrivate] = useState(false);
  const [newChannelDialogOpen, setNewChannelDialogOpen] = useState(false);
  
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDialogOpen, setNewGroupDialogOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [channelDescription, setChannelDescription] = useState<Record<string, string>>({
    "channel-1": "General discussions for the team",
    "channel-2": "Customer support related discussions",
    "channel-3": "Development team discussions and updates"
  });
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [showChannelInfo, setShowChannelInfo] = useState(true);
  const [pinnedMessages, setPinnedMessages] = useState<PinnedMessage[]>(mockPinnedMessages);
  const [showPinnedMessages, setShowPinnedMessages] = useState(true);
  
  const filteredGifs = mockGifs.filter(gif => 
    gifSearchQuery === "" || gif.title.toLowerCase().includes(gifSearchQuery.toLowerCase())
  );
  
  const selectedChannel = selectedChannelId 
    ? channels.find(c => c.id === selectedChannelId) 
    : null;
    
  const selectedGroup = selectedGroupId 
    ? groups.find(g => g.id === selectedGroupId) 
    : null;
  
  const currentMessages = selectedChannelId 
    ? mockMessages.filter(m => m.channelId === selectedChannelId)
    : selectedGroupId 
      ? mockMessages.filter(m => m.groupId === selectedGroupId)
      : [];
  
  const currentPinnedMessages = selectedChannelId
    ? pinnedMessages.filter(m => m.channelId === selectedChannelId)
    : [];

  const getSender = (senderId: string): TeamMember => {
    return mockTeamMembers.find(m => m.id === senderId) || { 
      id: senderId, 
      name: "Unknown User", 
      status: "offline" 
    };
  };
  
  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    setSelectedGroupId(null);
    setActiveTab("channels");
  };
  
  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    setSelectedChannelId(null);
    setActiveTab("direct-messages");
  };
  
  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    
    console.log("Sending message:", messageText);
    
    toast.success("Message sent!");
    
    setMessageText("");
    setReplyTo(null);
    setShowGifPicker(false);
  };
  
  const handleCreateChannel = () => {
    if (newChannelName.trim() === "") {
      toast.error("Please enter a channel name");
      return;
    }
    
    const newChannel: TeamChannel = {
      id: `channel-${Date.now()}`,
      name: newChannelName.trim().toLowerCase().replace(/\s+/g, '-'),
      description: newChannelDescription,
      createdAt: new Date().toISOString(),
      createdBy: "user-1",
      isPrivate: newChannelIsPrivate,
      members: ["user-1"],
      unreadCount: 0,
      isPinned: false
    };
    
    setChannels([...channels, newChannel]);
    setNewChannelName("");
    setNewChannelDescription("");
    setNewChannelIsPrivate(false);
    setNewChannelDialogOpen(false);
    
    setSelectedChannelId(newChannel.id);
    setSelectedGroupId(null);
    setActiveTab("channels");
    
    toast.success(`Channel #${newChannel.name} created!`);
  };
  
  const handleCreateGroup = () => {
    if (newGroupName.trim() === "") {
      toast.error("Please enter a group name");
      return;
    }
    
    if (selectedMembers.length === 0) {
      toast.error("Please select at least one member");
      return;
    }
    
    const newGroup: TeamGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName.trim(),
      members: [...selectedMembers, "user-1"],
      createdAt: new Date().toISOString(),
      createdBy: "user-1",
      unreadCount: 0,
      isPinned: false
    };
    
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setSelectedMembers([]);
    setNewGroupDialogOpen(false);
    
    setSelectedGroupId(newGroup.id);
    setSelectedChannelId(null);
    setActiveTab("direct-messages");
    
    toast.success(`Group ${newGroup.name} created!`);
  };
  
  const handleToggleMemberSelection = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };
  
  const handleInsertGif = (gifUrl: string) => {
    console.log("Inserting GIF:", gifUrl);
    setMessageText(messageText + " [GIF] ");
    setShowGifPicker(false);
    toast.success("GIF selected!");
  };

  const handleSaveDescription = () => {
    if (selectedChannelId) {
      setChannelDescription({
        ...channelDescription,
        [selectedChannelId]: editedDescription
      });
      setIsEditingDescription(false);
      toast.success("Channel description updated");
    }
  };

  const handleCancelEditDescription = () => {
    if (selectedChannelId) {
      setEditedDescription(channelDescription[selectedChannelId] || "");
    }
    setIsEditingDescription(false);
  };

  const handleEditDescription = () => {
    if (selectedChannelId) {
      setEditedDescription(channelDescription[selectedChannelId] || "");
      setIsEditingDescription(true);
    }
  };

  const handlePinMessage = (messageId: string) => {
    const message = mockMessages.find(m => m.id === messageId);
    if (message && !pinnedMessages.some(pm => pm.id === `pin-${messageId}`)) {
      const newPinnedMessage: PinnedMessage = {
        id: `pin-${messageId}`,
        channelId: message.channelId || "",
        content: message.content,
        createdAt: new Date().toISOString(),
        senderId: message.senderId
      };
      
      setPinnedMessages([...pinnedMessages, newPinnedMessage]);
      toast.success("Message pinned to channel");
    }
  };

  const handleUnpinMessage = (pinnedId: string) => {
    setPinnedMessages(pinnedMessages.filter(pm => pm.id !== pinnedId));
    toast.success("Message unpinned from channel");
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-md border">
      <div className="w-60 border-r flex flex-col bg-background">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <Dialog open={newChannelDialogOpen} onOpenChange={setNewChannelDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Channel</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="channel-name">Channel Name</Label>
                      <Input 
                        id="channel-name" 
                        placeholder="e.g. marketing" 
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="channel-description">Description (optional)</Label>
                      <Textarea 
                        id="channel-description" 
                        placeholder="What is this channel about?"
                        value={newChannelDescription}
                        onChange={(e) => setNewChannelDescription(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="channel-private">Make Private</Label>
                        <Switch 
                          id="channel-private"
                          checked={newChannelIsPrivate}
                          onCheckedChange={setNewChannelIsPrivate}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Private channels are only visible to invited members
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewChannelDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateChannel}>Create Channel</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                        onClick={() => handleSelectChannel(channel.id)}
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
          </TabsContent>
          
          <TabsContent value="direct-messages" className="flex-1 flex flex-col space-y-1 p-2 overflow-hidden">
            <div className="flex items-center justify-between px-2 py-1.5">
              <h3 className="text-sm font-semibold">Direct Messages</h3>
              <Dialog open={newGroupDialogOpen} onOpenChange={setNewGroupDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="group-name">Group Name</Label>
                      <Input 
                        id="group-name" 
                        placeholder="e.g. Project Team" 
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Select Members</Label>
                      <div className="border rounded-md h-40 overflow-y-auto p-2">
                        {mockTeamMembers.map(member => (
                          <div key={member.id} className="flex items-center gap-2 p-1">
                            <input 
                              type="checkbox" 
                              id={`member-${member.id}`} 
                              checked={selectedMembers.includes(member.id)}
                              onChange={() => handleToggleMemberSelection(member.id)}
                              className="rounded"
                            />
                            <label htmlFor={`member-${member.id}`} className="flex items-center gap-2 flex-1">
                              <Avatar className="h-6 w-6">
                                {member.avatar && <AvatarImage src={member.avatar} />}
                                <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span>{member.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewGroupDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateGroup}>Create Group</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="space-y-1">
                <div className="px-2 py-1.5">
                  <h4 className="text-xs font-medium text-muted-foreground">Groups</h4>
                </div>
                
                {groups
                  .filter(group => 
                    searchQuery === "" || 
                    group.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((group) => {
                    const isSelected = selectedGroupId === group.id;
                    
                    return (
                      <button
                        key={group.id}
                        className={`w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-md ${
                          isSelected 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-secondary"
                        }`}
                        onClick={() => handleSelectGroup(group.id)}
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
                
                {mockTeamMembers
                  .filter(member => 
                    searchQuery === "" || 
                    member.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((member) => (
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
                      
                      <div className={`h-2 w-2 rounded-full ${
                        member.status === 'online' ? 'bg-green-500' :
                        member.status === 'away' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`} />
                    </button>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex-1 flex flex-col bg-background">
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
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {currentMessages.length > 0 ? (
              currentMessages.map((message) => {
                const sender = getSender(message.senderId);
                const isReplyHighlighted = replyTo === message.id;
                
                return (
                  <div 
                    key={message.id} 
                    className={`flex gap-3 ${isReplyHighlighted ? 'bg-secondary/50 p-2 rounded-md' : ''}`}
                  >
                    {message.replyTo && (
                      <div className="ml-10 text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Reply size={12} />
                        <span>Replying to a message</span>
                      </div>
                    )}
                    
                    <Avatar className="h-8 w-8 mt-0.5">
                      {sender.avatar && <AvatarImage src={sender.avatar} />}
                      <AvatarFallback>{sender.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{sender.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.createdAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      
                      <p className="text-sm mt-1">{message.content}</p>
                      
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {message.reactions.map((reaction, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="gap-1 text-xs cursor-pointer hover:bg-secondary/80"
                            >
                              {reaction.emoji} <span>{reaction.count}</span>
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1 mt-1 opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Smile size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => setReplyTo(message.id)}
                        >
                          <Reply size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => handlePinMessage(message.id)}
                        >
                          <Pin size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <BookmarkPlus size={14} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem className="gap-2">
                              <Edit size={14} /> Edit message
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Pin size={14} /> Pin message
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Share size={14} /> Share message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 size={14} /> Delete message
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No messages yet</h3>
                <p className="text-muted-foreground text-sm">
                  {selectedChannel 
                    ? `Start the conversation in #${selectedChannel.name}`
                    : selectedGroup
                      ? `Start the conversation in ${selectedGroup.name}`
                      : "Select a channel or direct message to start chatting"
                  }
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-3 border-t">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" className="h-7">
              <Plus size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7"
              onClick={() => setShowGifPicker(!showGifPicker)}
            >
              <Gift size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-7">
              <Smile size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-7">
              <ImageIcon size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-7">
              <FileText size={16} />
            </Button>
            
            {replyTo && (
              <div className="flex-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Reply size={14} />
                <span>Replying to a message</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 ml-auto"
                  onClick={() => setReplyTo(null)}
                >
                  <Trash2 size={12} />
                </Button>
              </div>
            )}
          </div>
          
          {showGifPicker && (
            <div className="mb-3 border rounded-md p-2 bg-background">
              <div className="mb-2">
                <Input 
                  placeholder="Search GIFs..." 
                  value={gifSearchQuery}
                  onChange={(e) => setGifSearchQuery(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {filteredGifs.map(gif => (
                  <img 
                    key={gif.id}
                    src={gif.url} 
                    alt={gif.title}
                    className="rounded cursor-pointer h-24 w-full object-cover"
                    onClick={() => handleInsertGif(gif.url)}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Input
              placeholder={`Message ${
                selectedChannel ? `#${selectedChannel.name}` : 
                selectedGroup ? selectedGroup.name : 
                "..."
              }`}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              size="icon"
              disabled={messageText.trim() === ""}
              onClick={handleSendMessage}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
