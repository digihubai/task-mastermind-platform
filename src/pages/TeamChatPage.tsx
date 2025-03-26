
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PlusCircle,
  Send,
  User,
  Phone,
  Video,
  SmilePlus,
  Paperclip,
  Search,
  Hash,
  Users,
  Lock,
  MoreVertical,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateChannelModal from "@/components/teamchat/CreateChannelModal";
import GiphyPicker from "@/components/teamchat/GiphyPicker";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockChannels = [
  { id: "1", name: "general", icon: "hash", unreadCount: 0, isActive: true },
  { id: "2", name: "marketing", icon: "hash", unreadCount: 3, isActive: false },
  { id: "3", name: "design", icon: "hash", unreadCount: 0, isActive: false },
  { id: "4", name: "development", icon: "hash", unreadCount: 2, isActive: false },
  { id: "5", name: "sales-team", icon: "users", unreadCount: 0, isActive: false, isPrivate: true },
];

const mockDirectMessages = [
  { id: "dm1", name: "Sarah Johnson", avatar: "/avatars/woman-1.jpg", status: "online", unreadCount: 1 },
  { id: "dm2", name: "Michael Chen", avatar: "/avatars/man-1.jpg", status: "offline", unreadCount: 0 },
  { id: "dm3", name: "Jessica Williams", avatar: "/avatars/woman-2.jpg", status: "online", unreadCount: 0 },
  { id: "dm4", name: "David Kim", avatar: "/avatars/man-2.jpg", status: "away", unreadCount: 0 },
];

const mockMessages = [
  {
    id: "1",
    sender: { id: "user1", name: "Sarah Johnson", avatar: "/avatars/woman-1.jpg" },
    content: "Good morning team! Let's discuss the project timeline for the new feature.",
    timestamp: "9:30 AM",
    reactions: [{ emoji: "👍", count: 3 }, { emoji: "🚀", count: 2 }],
  },
  {
    id: "2",
    sender: { id: "user2", name: "Michael Chen", avatar: "/avatars/man-1.jpg" },
    content: "I've been working on the design mockups. Should be ready by end of day.",
    timestamp: "9:32 AM",
    reactions: [],
  },
  {
    id: "3",
    sender: { id: "user3", name: "Jessica Williams", avatar: "/avatars/woman-2.jpg" },
    content: "Great! I'll need those for the client presentation tomorrow.",
    timestamp: "9:35 AM",
    reactions: [{ emoji: "👌", count: 1 }],
  },
  {
    id: "4",
    sender: { id: "user4", name: "David Kim", avatar: "/avatars/man-2.jpg" },
    content: "Has anyone tested the API integration yet?",
    timestamp: "9:40 AM",
    reactions: [],
  },
  {
    id: "5",
    sender: { id: "user1", name: "Sarah Johnson", avatar: "/avatars/woman-1.jpg" },
    content: "Here's a screenshot of what I'm working on:",
    timestamp: "9:45 AM",
    attachment: { type: "image", url: "https://placehold.co/600x400" },
    reactions: [{ emoji: "❤️", count: 2 }],
  },
  {
    id: "6",
    sender: { id: "user3", name: "Jessica Williams", avatar: "/avatars/woman-2.jpg" },
    content: "Looks great!",
    timestamp: "9:47 AM",
    reactions: [],
  },
  {
    id: "7",
    sender: { id: "user2", name: "Michael Chen", avatar: "/avatars/man-1.jpg" },
    content: "I found a bug in the login flow. Let me share my screen later to show you.",
    timestamp: "9:50 AM",
    reactions: [{ emoji: "🐛", count: 1 }],
  },
  {
    id: "8",
    sender: { id: "user5", name: "Emily Davis", avatar: "/avatars/woman-3.jpg" },
    content: "Just joining the conversation. Can someone catch me up?",
    timestamp: "10:00 AM",
    reactions: [],
  },
  {
    id: "9",
    sender: { id: "user3", name: "Jessica Williams", avatar: "/avatars/woman-2.jpg" },
    content: "Check the meeting notes from yesterday, I shared them in the #general channel.",
    timestamp: "10:02 AM",
    reactions: [{ emoji: "👆", count: 1 }],
  },
];

const mockCalls = [
  {
    id: "call1",
    user: { id: "user1", name: "Sarah Johnson", avatar: "/avatars/woman-1.jpg" },
    type: "incoming",
    status: "answered",
    duration: "10:23",
    timestamp: "Yesterday, 3:45 PM",
  },
  {
    id: "call2",
    user: { id: "user2", name: "Michael Chen", avatar: "/avatars/man-1.jpg" },
    type: "outgoing",
    status: "answered",
    duration: "05:12",
    timestamp: "Yesterday, 11:30 AM",
  },
  {
    id: "call3",
    user: { id: "user3", name: "Jessica Williams", avatar: "/avatars/woman-2.jpg" },
    type: "missed",
    status: "missed",
    duration: "00:00",
    timestamp: "Apr 15, 2:20 PM",
  },
  {
    id: "call4",
    user: { id: "user4", name: "David Kim", avatar: "/avatars/man-2.jpg" },
    type: "incoming",
    status: "answered",
    duration: "15:48",
    timestamp: "Apr 12, 10:15 AM",
  },
];

const TeamChatPage = () => {
  const { toast } = useToast();
  const [activeChannel, setActiveChannel] = useState(mockChannels[0]);
  const [messageText, setMessageText] = useState("");
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showGiphyPicker, setShowGiphyPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("chat");

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    toast({
      title: "Message sent",
      description: `Your message has been sent to #${activeChannel.name}`,
    });
    
    setMessageText("");
    setShowGiphyPicker(false);
  };

  const handleCreateChannel = (channelData: any) => {
    toast({
      title: "Channel created",
      description: `Channel #${channelData.name} has been created successfully`,
    });
  };

  const handleSelectGif = (gifUrl: string) => {
    toast({
      title: "GIF selected",
      description: "Your GIF will be sent with the message",
    });
    setShowGiphyPicker(false);
  };

  const filteredChannels = mockChannels.filter(channel => 
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredDirectMessages = mockDirectMessages.filter(dm =>
    dm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getChannelIcon = (icon: string, isPrivate?: boolean) => {
    if (isPrivate) return <Lock size={16} />;
    if (icon === "hash") return <Hash size={16} />;
    if (icon === "users") return <Users size={16} />;
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

  const getCallIcon = (type: string) => {
    switch (type) {
      case "incoming": return <PhoneIncoming size={16} className="text-green-500" />;
      case "outgoing": return <PhoneOutgoing size={16} className="text-blue-500" />;
      case "missed": return <PhoneMissed size={16} className="text-red-500" />;
      default: return <PhoneCall size={16} />;
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-80px)] flex overflow-hidden animate-fade-in">
        {/* Sidebar */}
        <div className="w-64 border-r border-border flex flex-col bg-white dark:bg-sidebar">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-xl">Team Chat</h2>
            <p className="text-sm text-muted-foreground">Collaborate with your team</p>
          </div>

          <div className="p-3">
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="chat" className="w-full" onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="calls">Calls</TabsTrigger>
                <TabsTrigger value="ivr">IVR</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="mt-3 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Channels</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => setShowCreateChannel(true)}
                    >
                      <PlusCircle size={14} />
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-36">
                    <div className="space-y-1">
                      {filteredChannels.map((channel) => (
                        <Button
                          key={channel.id}
                          variant={channel.isActive ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setActiveChannel(channel)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              {getChannelIcon(channel.icon, channel.isPrivate)}
                              <span className="ml-2">{channel.name}</span>
                            </div>
                            {channel.unreadCount > 0 && (
                              <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {channel.unreadCount}
                              </span>
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Direct Messages</h3>
                  <ScrollArea className="h-48">
                    <div className="space-y-1">
                      {filteredDirectMessages.map((dm) => (
                        <Button
                          key={dm.id}
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <div className="relative">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={dm.avatar} />
                                  <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${getStatusColor(dm.status)} ring-1 ring-background`}></span>
                              </div>
                              <span className="ml-2">{dm.name}</span>
                            </div>
                            {dm.unreadCount > 0 && (
                              <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {dm.unreadCount}
                              </span>
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
              
              <TabsContent value="calls" className="mt-3">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="space-y-3">
                    {mockCalls.map((call) => (
                      <div 
                        key={call.id}
                        className="flex items-center justify-between p-2 hover:bg-secondary rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="mr-3">
                            {getCallIcon(call.type)}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={call.user.avatar} />
                                <AvatarFallback>{call.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{call.user.name}</p>
                                <p className="text-xs text-muted-foreground">{call.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs mr-2">{call.duration}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <PhoneCall size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="ivr" className="mt-3">
                <div className="p-2 space-y-4">
                  <div className="text-center py-8">
                    <h3 className="font-medium mb-2">Interactive Voice Response</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure your automatic phone system to handle incoming calls
                    </p>
                    <Button>
                      Configure IVR System
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-sm mb-2">Recent IVR Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total calls today</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg. handling time</span>
                        <span className="font-medium">2:45</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Transferred to agent</span>
                        <span className="font-medium">4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Chat content */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="border-b border-border p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-3">
                {getChannelIcon(activeChannel.icon)}
              </div>
              <div>
                <h3 className="font-medium">#{activeChannel.name}</h3>
                <p className="text-xs text-muted-foreground">8 members · 2 online</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Phone size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start audio call</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Video size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start video call</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Search size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Search in conversation</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Manage channel</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View members</DropdownMenuItem>
                  <DropdownMenuItem>Add members</DropdownMenuItem>
                  <DropdownMenuItem>Channel settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">Leave channel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {mockMessages.map((message) => (
                <div key={message.id} className="flex">
                  <Avatar className="h-10 w-10 mr-3 mt-1">
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-baseline">
                      <h4 className="font-medium mr-2">{message.sender.name}</h4>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    
                    <div className="mt-1 space-y-2">
                      <p className="text-sm">{message.content}</p>
                      
                      {message.attachment?.type === "image" && (
                        <div className="mt-2 rounded-md overflow-hidden max-w-[300px]">
                          <img src={message.attachment.url} alt="Attachment" className="w-full h-auto" />
                        </div>
                      )}
                      
                      {message.reactions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {message.reactions.map((reaction, index) => (
                            <div 
                              key={index}
                              className="flex items-center bg-secondary rounded-full px-2 py-0.5 text-xs"
                            >
                              <span className="mr-1">{reaction.emoji}</span>
                              <span>{reaction.count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reply</DropdownMenuItem>
                        <DropdownMenuItem>Add reaction</DropdownMenuItem>
                        <DropdownMenuItem>Copy text</DropdownMenuItem>
                        <DropdownMenuItem>Forward</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Message input */}
          <div className="p-4 border-t border-border">
            <div className="relative">
              <div className="absolute bottom-0 left-0 p-2 flex space-x-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setShowGiphyPicker(!showGiphyPicker)}>
                        <SmilePlus size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add emoji or GIF</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Attach file</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="absolute bottom-2 right-2">
                <Button
                  size="icon"
                  disabled={!messageText.trim()}
                  onClick={handleSendMessage}
                >
                  <Send size={18} />
                </Button>
              </div>
              
              <textarea
                className="w-full bg-secondary/50 rounded-md pl-20 pr-14 py-3 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-background"
                placeholder={`Message #${activeChannel.name}`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            
            {showGiphyPicker && (
              <div className="absolute bottom-[124px] left-4 z-10">
                <GiphyPicker
                  onSelect={handleSelectGif}
                  onClose={() => setShowGiphyPicker(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <CreateChannelModal 
        open={showCreateChannel}
        onClose={() => setShowCreateChannel(false)}
        onCreateChannel={handleCreateChannel}
      />
    </AppLayout>
  );
};

export default TeamChatPage;
