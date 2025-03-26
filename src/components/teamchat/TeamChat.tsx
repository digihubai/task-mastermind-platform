
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Hash,
  Users,
  Search,
  Send,
  Paperclip,
  Smile,
  MoreHorizontal,
  Pin,
  Edit,
  Trash,
  Star,
  Reply,
  PlusCircle,
  Bell,
  BellOff,
  Settings,
  PhoneCall,
  Video,
  PersonStanding,
  AtSign,
  List,
  ArrowDown,
  ArrowUp,
  Filter,
  AlignLeft,
  Mic,
  Link,
  Image as ImageIcon
} from "lucide-react";
import { TeamChannel, TeamGroup, TeamMessage, MessageReaction } from "@/types/support";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for demonstration
const mockChannels: TeamChannel[] = [
  {
    id: "channel-1",
    name: "general",
    description: "General discussions",
    createdAt: "2023-05-15T10:00:00Z",
    createdBy: "user-1",
    isPrivate: false,
    members: ["user-1", "user-2", "user-3"],
    unreadCount: 0,
    isPinned: true,
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
    name: "Marketing Team",
    members: ["user-1", "user-3"],
    createdAt: "2023-05-15T12:00:00Z",
    createdBy: "user-1",
    unreadCount: 2,
    isPinned: true,
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

const mockMessages: TeamMessage[] = [
  {
    id: "msg-1",
    channelId: "channel-1",
    content: "Hello everyone! Welcome to the general channel.",
    createdAt: "2023-05-15T14:00:00Z",
    senderId: "user-1",
    isPinned: true,
    reactions: [
      { emoji: "👍", count: 2, users: ["user-2", "user-3"] },
      { emoji: "❤️", count: 1, users: ["user-2"] }
    ]
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

const mockUsers = [
  { id: "user-1", name: "John Doe", avatar: "/avatars/john.jpg", status: "online" },
  { id: "user-2", name: "Jane Smith", avatar: "/avatars/jane.jpg", status: "away" },
  { id: "user-3", name: "Bob Johnson", avatar: "/avatars/bob.jpg", status: "offline" }
];

interface TeamChatProps {
  // Props will be defined here as the component evolves
}

export const TeamChat: React.FC<TeamChatProps> = () => {
  const [activeTab, setActiveTab] = useState("channels");
  const [selectedChannelId, setSelectedChannelId] = useState("channel-1");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const selectedChannel = mockChannels.find(c => c.id === selectedChannelId);
  const selectedGroup = selectedGroupId ? mockGroups.find(g => g.id === selectedGroupId) : null;
  
  const currentMessages = mockMessages.filter(m => 
    m.channelId === selectedChannelId || 
    (selectedGroupId && m.groupId === selectedGroupId)
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, you would send this to your backend
    console.log("Sending message:", messageText);
    
    // Clear the input
    setMessageText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getUserById = (userId: string) => {
    return mockUsers.find(u => u.id === userId) || { id: userId, name: "Unknown User", status: "offline" };
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-md border">
      {/* Sidebar */}
      <div className="w-60 border-r flex flex-col bg-background">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Search..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-2 px-2 pt-2">
            <TabsTrigger value="channels" className="flex items-center gap-1">
              <Hash size={14} />
              <span>Channels</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-1">
              <Users size={14} />
              <span>Groups</span>
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1">
            <TabsContent value="channels" className="m-0 p-0">
              <div className="px-3 pt-2 pb-1 flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Channels</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus size={14} />
                </Button>
              </div>
              
              <div className="space-y-1 px-1">
                {mockChannels
                  .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
                  .map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => {
                        setSelectedChannelId(channel.id);
                        setSelectedGroupId(null);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between group ${
                        selectedChannelId === channel.id 
                          ? 'bg-accent text-accent-foreground' 
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Hash size={16} className="flex-shrink-0" />
                        <span className="truncate">{channel.name}</span>
                        {channel.isPinned && (
                          <Pin size={12} className="flex-shrink-0 text-muted-foreground" />
                        )}
                      </div>
                      
                      {channel.unreadCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {channel.unreadCount}
                        </Badge>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 ml-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Pin size={14} /> 
                            {channel.isPinned ? "Unpin channel" : "Pin channel"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Bell size={14} /> Notification settings
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Settings size={14} /> Channel settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                            <Trash size={14} /> Leave channel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </button>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="groups" className="m-0 p-0">
              <div className="px-3 pt-2 pb-1 flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Groups</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus size={14} />
                </Button>
              </div>
              
              <div className="space-y-1 px-1">
                {mockGroups
                  .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
                  .map((group) => (
                    <button
                      key={group.id}
                      onClick={() => {
                        setSelectedGroupId(group.id);
                        setSelectedChannelId("");
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between group ${
                        selectedGroupId === group.id 
                          ? 'bg-accent text-accent-foreground' 
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {group.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate">{group.name}</span>
                        {group.isPinned && (
                          <Pin size={12} className="flex-shrink-0 text-muted-foreground" />
                        )}
                      </div>
                      
                      {group.unreadCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {group.unreadCount}
                        </Badge>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 ml-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Pin size={14} /> 
                            {group.isPinned ? "Unpin group" : "Pin group"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Bell size={14} /> Notification settings
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Settings size={14} /> Group settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                            <Trash size={14} /> Leave group
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </button>
                  ))}
              </div>
            </TabsContent>
          </ScrollArea>
          
          <div className="p-3 border-t mt-auto">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/john.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm truncate">John Doe</span>
                  <div className={`h-2 w-2 rounded-full ${getStatusColor("online")}`}></div>
                </div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Settings size={14} />
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Channel/Group Header */}
        <div className="p-3 border-b flex items-center justify-between">
          {selectedChannel && (
            <div className="flex items-center gap-2">
              <Hash size={18} />
              <div>
                <h2 className="font-medium">{selectedChannel.name}</h2>
                <p className="text-xs text-muted-foreground">{selectedChannel.description}</p>
              </div>
            </div>
          )}
          
          {selectedGroup && (
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback>
                  {selectedGroup.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">{selectedGroup.name}</h2>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <PersonStanding size={12} />
                  <span>{selectedGroup.members.length} members</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <PhoneCall size={16} />
            </Button>
            <Button variant="ghost" size="icon">
              <Video size={16} />
            </Button>
            <Button variant="ghost" size="icon">
              <Search size={16} />
            </Button>
            <Button variant="ghost" size="icon">
              <PersonStanding size={16} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Bell size={14} /> Notification settings
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Pin size={14} /> Pinned messages
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <List size={14} /> Manage members
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <Settings size={14} /> Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Message List */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {currentMessages.length > 0 ? (
              currentMessages.map((message) => {
                const sender = getUserById(message.senderId);
                
                return (
                  <div 
                    key={message.id} 
                    className={`group relative flex gap-3 ${message.isPinned ? 'bg-yellow-50/20 p-3 rounded-md' : ''}`}
                  >
                    {message.isPinned && (
                      <div className="absolute right-2 top-2 text-yellow-500">
                        <Pin size={14} />
                      </div>
                    )}
                    
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarImage src={sender.avatar} />
                      <AvatarFallback>{sender.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{sender.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.createdAt)}
                        </span>
                        
                        {message.isEdited && (
                          <span className="text-xs text-muted-foreground">(edited)</span>
                        )}
                      </div>
                      
                      <div className="mt-1 text-sm whitespace-pre-wrap">
                        {message.mentions?.length && (
                          <span className="bg-primary/10 text-primary px-1 rounded">
                            @{getUserById(message.mentions[0]).name}
                          </span>
                        )} {message.content}
                      </div>
                      
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment) => (
                            <div key={attachment.id} className="flex items-center gap-2 p-2 rounded-md border max-w-sm">
                              <div className="bg-secondary p-2 rounded">
                                <Paperclip size={14} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{attachment.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(attachment.size / 1000000).toFixed(1)} MB
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">Download</Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.reactions.map((reaction, index) => (
                            <Badge key={index} variant="outline" className="px-1.5 py-0.5 hover:bg-accent cursor-pointer">
                              <span>{reaction.emoji}</span>
                              <span className="ml-1 text-xs">{reaction.count}</span>
                            </Badge>
                          ))}
                          <Badge variant="outline" className="px-1.5 py-0.5 hover:bg-accent cursor-pointer">
                            <Plus size={12} />
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 flex items-start gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Reply size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Smile size={14} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Reply size={14} /> Reply
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit size={14} /> Edit message
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Pin size={14} /> {message.isPinned ? "Unpin message" : "Pin message"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Star size={14} /> Save message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                            <Trash size={14} /> Delete message
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-2 text-lg font-medium">No messages yet</h3>
                <p className="text-sm text-muted-foreground">Start the conversation!</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Message Input */}
        <div className="p-3 border-t">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" className="h-7">
              <Plus size={14} className="mr-1" />
              <span>Format</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <AlignLeft size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Link size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ImageIcon size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <AtSign size={14} />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder={`Message ${selectedChannel ? `#${selectedChannel.name}` : selectedGroup?.name}`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Paperclip size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <Smile size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Mic size={16} />
                </Button>
              </div>
            </div>
            
            <Button 
              size="icon" 
              className={`${messageText.trim() ? "" : "opacity-50"}`}
              disabled={!messageText.trim()}
              onClick={handleSendMessage}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
