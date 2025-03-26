import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamChannel, TeamGroup, TeamMessage, SupportUser } from "@/types/support";
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
  Send
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

export const TeamChat: React.FC = () => {
  const [activeTab, setActiveTab] = useState("channels");
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>("channel-1");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const selectedChannel = selectedChannelId 
    ? mockChannels.find(c => c.id === selectedChannelId) 
    : null;
    
  const selectedGroup = selectedGroupId 
    ? mockGroups.find(g => g.id === selectedGroupId) 
    : null;
  
  const currentMessages = selectedChannelId 
    ? mockMessages.filter(m => m.channelId === selectedChannelId)
    : selectedGroupId 
      ? mockMessages.filter(m => m.groupId === selectedGroupId)
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
    
    setMessageText("");
    setReplyTo(null);
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
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Plus size={16} />
              </Button>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="space-y-1">
                {mockChannels
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
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Plus size={16} />
              </Button>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="space-y-1">
                <div className="px-2 py-1.5">
                  <h4 className="text-xs font-medium text-muted-foreground">Groups</h4>
                </div>
                
                {mockGroups
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
                          <AvatarImage src={member.avatar || ''} />
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
                      <AvatarImage src={sender.avatar || ''} />
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
