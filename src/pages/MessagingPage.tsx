
import React, { useState, useEffect, useRef } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Hash,
  Search,
  Plus,
  MessageSquare,
  Users,
  BookmarkPlus,
  Pin,
  Paperclip,
  Send,
  Smile,
  MoreVertical,
  Star,
  Copy,
  Reply,
  Edit,
  Trash2,
  FolderPlus,
  FileText,
  Image as ImageIcon,
  Video,
  Download,
  ExternalLink,
  Bookmark,
  Gift,
  Briefcase,
  CalendarDays,
  MessageCircle,
  Lock,
  Bell,
  BellOff,
  User,
  ChevronDown,
  Check,
  Bot,
} from "lucide-react";

interface ChannelType {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  members: number;
  unreadCount: number;
  isPinned: boolean;
}

interface DirectMessageType {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away" | "busy";
  unreadCount: number;
}

interface MessageType {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  isPinned: boolean;
  isBookmarked: boolean;
  hasAttachment: boolean;
  attachment?: {
    type: "image" | "document" | "video" | "gif";
    url: string;
    name: string;
  };
  reactions: {
    emoji: string;
    count: number;
    users: string[];
  }[];
  replyToMessage?: string;
  isAIGenerated?: boolean;
}

interface PinnedItemType {
  id: string;
  type: "message" | "file";
  content: string;
  from: string;
  timestamp: string;
  channel?: string;
}

interface BookmarkType {
  id: string;
  title: string;
  url: string;
  type: "message" | "link" | "file";
  addedBy: string;
  timestamp: string;
}

interface FileType {
  id: string;
  name: string;
  type: "image" | "document" | "video" | "gif";
  url: string;
  size: string;
  uploadedBy: string;
  timestamp: string;
}

// Mock data
const mockChannels: ChannelType[] = [
  {
    id: "c1",
    name: "general",
    description: "Company-wide announcements and work-based matters",
    isPrivate: false,
    members: 58,
    unreadCount: 2,
    isPinned: true,
  },
  {
    id: "c2",
    name: "marketing",
    description: "Marketing team discussions",
    isPrivate: false,
    members: 12,
    unreadCount: 0,
    isPinned: true,
  },
  {
    id: "c3",
    name: "sales",
    description: "Sales team coordination",
    isPrivate: false,
    members: 15,
    unreadCount: 5,
    isPinned: false,
  },
  {
    id: "c4",
    name: "team-alpha",
    description: "Project Alpha discussions",
    isPrivate: true,
    members: 7,
    unreadCount: 0,
    isPinned: false,
  },
];

const mockDirectMessages: DirectMessageType[] = [
  {
    id: "dm1",
    name: "Sarah Johnson",
    avatar: "/avatars/sarah.jpg",
    status: "online",
    unreadCount: 3,
  },
  {
    id: "dm2",
    name: "Michael Chen",
    avatar: "/avatars/michael.jpg",
    status: "away",
    unreadCount: 0,
  },
  {
    id: "dm3",
    name: "Jessica Williams",
    status: "offline",
    unreadCount: 0,
  },
];

const mockMessages: MessageType[] = [
  {
    id: "m1",
    content: "Hey team, how's the quarterly report coming along?",
    sender: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
    },
    timestamp: "10:32 AM",
    isPinned: true,
    isBookmarked: false,
    hasAttachment: false,
    reactions: [
      { emoji: "👍", count: 3, users: ["user2", "user3", "user4"] },
    ],
  },
  {
    id: "m2",
    content: "We're making good progress. Should be ready by tomorrow.",
    sender: {
      id: "user2",
      name: "Michael Chen",
      avatar: "/avatars/michael.jpg",
    },
    timestamp: "10:35 AM",
    isPinned: false,
    isBookmarked: true,
    hasAttachment: false,
    reactions: [],
  },
  {
    id: "m3",
    content: "I've uploaded the latest design mockups for review.",
    sender: {
      id: "user3",
      name: "Jessica Williams",
    },
    timestamp: "10:41 AM",
    isPinned: false,
    isBookmarked: false,
    hasAttachment: true,
    attachment: {
      type: "image",
      url: "https://placehold.co/600x400",
      name: "design-mockup-v2.png",
    },
    reactions: [
      { emoji: "🔥", count: 2, users: ["user1", "user4"] },
      { emoji: "👍", count: 1, users: ["user2"] },
    ],
  },
  {
    id: "m4",
    content: "Based on your discussion, I've analyzed our target audience demographics and prepared key insights for the marketing strategy. The data suggests we should focus on the 25-34 age group as they show the highest engagement rates.",
    sender: {
      id: "ai1",
      name: "DigiHub AI",
      avatar: "/avatars/ai-assistant.png",
    },
    timestamp: "10:45 AM",
    isPinned: false,
    isBookmarked: true,
    hasAttachment: false,
    reactions: [
      { emoji: "🤖", count: 1, users: ["user1"] },
      { emoji: "👏", count: 2, users: ["user2", "user3"] },
    ],
    isAIGenerated: true,
  },
];

const mockPinnedItems: PinnedItemType[] = [
  {
    id: "pin1",
    type: "message",
    content: "Hey team, how's the quarterly report coming along?",
    from: "Sarah Johnson",
    timestamp: "Today at 10:32 AM",
    channel: "general",
  },
  {
    id: "pin2",
    type: "file",
    content: "Q3-Marketing-Strategy.pdf",
    from: "Michael Chen",
    timestamp: "Yesterday at 2:45 PM",
    channel: "marketing",
  },
];

const mockBookmarks: BookmarkType[] = [
  {
    id: "bm1",
    title: "Q3 Marketing Plan",
    url: "#message-link",
    type: "message",
    addedBy: "You",
    timestamp: "Oct 12, 2023",
  },
  {
    id: "bm2",
    title: "Design Guidelines",
    url: "https://example.com/design-guidelines",
    type: "link",
    addedBy: "Sarah Johnson",
    timestamp: "Oct 10, 2023",
  },
  {
    id: "bm3",
    title: "Brand Assets.zip",
    url: "#file-link",
    type: "file",
    addedBy: "Michael Chen",
    timestamp: "Oct 8, 2023",
  },
];

const mockFiles: FileType[] = [
  {
    id: "file1",
    name: "Q3-Marketing-Strategy.pdf",
    type: "document",
    url: "#file-url",
    size: "2.4 MB",
    uploadedBy: "Michael Chen",
    timestamp: "Oct 15, 2023",
  },
  {
    id: "file2",
    name: "Team-Meeting.jpg",
    type: "image",
    url: "https://placehold.co/600x400",
    size: "1.2 MB",
    uploadedBy: "Sarah Johnson",
    timestamp: "Oct 14, 2023",
  },
  {
    id: "file3",
    name: "Product-Demo.mp4",
    type: "video",
    url: "#video-url",
    size: "12.8 MB",
    uploadedBy: "Jessica Williams",
    timestamp: "Oct 10, 2023",
  },
  {
    id: "file4",
    name: "reaction.gif",
    type: "gif",
    url: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif",
    size: "0.8 MB",
    uploadedBy: "Alex Thompson",
    timestamp: "Oct 9, 2023",
  },
];

const mockGifs = [
  { id: "gif1", url: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif", title: "Happy" },
  { id: "gif2", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnlya2VpamRjcHUyNDI2c2JzMHRtOTduemRmdWFvYWZ0ZTB6YmtpcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ju7l5y9osyymQ/giphy.gif", title: "Thinking" },
  { id: "gif3", url: "https://media.giphy.com/media/3oKIPf3C7HqqYBVcCk/giphy.gif", title: "Working" },
  { id: "gif4", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZrYmJ3YTNram43dDZsZXk3MjY3ajg3dW1qZGx6cGxvYWwyb2YwdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwytHcusSCXXp96/giphy.gif", title: "Hello" },
];

const MessagingPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("channels");
  const [activeSidePanel, setActiveSidePanel] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(mockChannels[0]);
  const [selectedDM, setSelectedDM] = useState<DirectMessageType | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemIsPrivate, setNewItemIsPrivate] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifSearchQuery, setGifSearchQuery] = useState("");
  const [replyToMessage, setReplyToMessage] = useState<string | null>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiPrompt, setAIPrompt] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [mockMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleSidePanel = (panel: string) => {
    setActiveSidePanel(activeSidePanel === panel ? null : panel);
  };

  const handleSelectChannel = (channel: ChannelType) => {
    setSelectedChannel(channel);
    setSelectedDM(null);
  };

  const handleSelectDM = (dm: DirectMessageType) => {
    setSelectedDM(dm);
    setSelectedChannel(null);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    toast({
      title: "Message sent",
      description: `Your message has been sent to ${selectedChannel ? `#${selectedChannel.name}` : selectedDM?.name}`,
    });

    setMessageText("");
    setReplyToMessage(null);
    setShowGifPicker(false);
  };

  const handleCreateItem = () => {
    if (!newItemName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a name",
        variant: "destructive",
      });
      return;
    }

    if (selectedTab === "channels") {
      toast({
        title: "Channel created",
        description: `Channel #${newItemName} has been created`,
      });
    } else {
      toast({
        title: "Group created",
        description: `Group ${newItemName} has been created`,
      });
    }

    setNewItemName("");
    setNewItemDescription("");
    setNewItemIsPrivate(false);
    setShowCreateDialog(false);
  };

  const handleSelectGif = (gifUrl: string) => {
    setMessageText(messageText + " [GIF] ");
    toast({
      title: "GIF selected",
      description: "GIF has been added to your message",
    });
    setShowGifPicker(false);
  };

  const handlePinMessage = (messageId: string) => {
    toast({
      title: "Message pinned",
      description: "Message has been pinned to the channel",
    });
  };

  const handleBookmarkMessage = (messageId: string) => {
    toast({
      title: "Bookmark added",
      description: "Message has been added to your bookmarks",
    });
  };

  const handleAIAssist = () => {
    if (!aiPrompt.trim()) return;

    toast({
      title: "AI Assistant working",
      description: "Generating response based on your prompt...",
    });

    // In a real app, this would call an API
    setTimeout(() => {
      setAIPrompt("");
      setShowAIAssistant(false);
      toast({
        title: "AI response added",
        description: "The AI has generated a response in the channel",
      });
    }, 1500);
  };

  const filteredChannels = mockChannels.filter(channel => 
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredDMs = mockDirectMessages.filter(dm =>
    dm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGifs = mockGifs.filter(gif => 
    gifSearchQuery === "" || gif.title.toLowerCase().includes(gifSearchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-80px)] overflow-hidden animate-fade-in">
        {/* Left sidebar (Channels & DMs) */}
        <div className="w-64 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-xl">DigiHub Chat</h2>
            <p className="text-sm text-muted-foreground">AI-powered team collaboration</p>
          </div>

          <div className="p-3">
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="channels" className="w-full" onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="channels">Channels</TabsTrigger>
                <TabsTrigger value="direct">Direct</TabsTrigger>
              </TabsList>
              
              <TabsContent value="channels" className="mt-3 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Channels</h3>
                  <Dialog open={showCreateDialog && selectedTab === "channels"} onOpenChange={(open) => {
                    setShowCreateDialog(open);
                    if (!open) {
                      setNewItemName("");
                      setNewItemDescription("");
                      setNewItemIsPrivate(false);
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                      >
                        <Plus size={14} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a New Channel</DialogTitle>
                        <DialogDescription>
                          Add a new channel for team communication
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-2">
                        <div className="space-y-2">
                          <Label htmlFor="channel-name">Channel Name</Label>
                          <Input 
                            id="channel-name" 
                            placeholder="e.g. marketing" 
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="channel-description">Description (optional)</Label>
                          <Textarea 
                            id="channel-description" 
                            placeholder="What is this channel about?"
                            value={newItemDescription}
                            onChange={(e) => setNewItemDescription(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="channel-private">Make Private</Label>
                            <Switch 
                              id="channel-private"
                              checked={newItemIsPrivate}
                              onCheckedChange={setNewItemIsPrivate}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Private channels are only visible to invited members
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
                        <Button onClick={handleCreateItem}>Create Channel</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <ScrollArea className="h-[calc(100vh-270px)]">
                  <div className="space-y-1">
                    {filteredChannels.map((channel) => (
                      <Button
                        key={channel.id}
                        variant={selectedChannel?.id === channel.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleSelectChannel(channel)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            {channel.isPrivate ? <Lock size={16} /> : <Hash size={16} />}
                            <span className="ml-2">{channel.name}</span>
                          </div>
                          {channel.unreadCount > 0 && (
                            <Badge variant="default" className="ml-auto">
                              {channel.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="direct" className="mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Direct Messages</h3>
                  <Dialog open={showCreateDialog && selectedTab === "direct"} onOpenChange={(open) => {
                    setShowCreateDialog(open);
                    if (!open) {
                      setNewItemName("");
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                      >
                        <Plus size={14} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a Group DM</DialogTitle>
                        <DialogDescription>
                          Start a conversation with multiple team members
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-2">
                        <div className="space-y-2">
                          <Label htmlFor="group-name">Group Name (optional)</Label>
                          <Input 
                            id="group-name" 
                            placeholder="e.g. Marketing Team" 
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Select Members</Label>
                          <div className="border rounded-md p-2 h-48 overflow-y-auto">
                            {mockDirectMessages.map(dm => (
                              <div key={dm.id} className="flex items-center space-x-2 p-2 hover:bg-secondary rounded-md">
                                <input type="checkbox" id={`member-${dm.id}`} className="rounded" />
                                <label htmlFor={`member-${dm.id}`} className="flex items-center space-x-2 cursor-pointer flex-1">
                                  <Avatar className="h-6 w-6">
                                    {dm.avatar && <AvatarImage src={dm.avatar} />}
                                    <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{dm.name}</span>
                                </label>
                                <div className={`h-2 w-2 rounded-full ${getStatusColor(dm.status)}`}></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
                        <Button onClick={handleCreateItem}>Create Group</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <ScrollArea className="h-[calc(100vh-270px)] mt-3">
                  <div className="space-y-1">
                    {filteredDMs.map((dm) => (
                      <Button
                        key={dm.id}
                        variant={selectedDM?.id === dm.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleSelectDM(dm)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <div className="relative">
                              <Avatar className="h-6 w-6">
                                {dm.avatar && <AvatarImage src={dm.avatar} />}
                                <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${getStatusColor(dm.status)} ring-1 ring-background`}></span>
                            </div>
                            <span className="ml-2">{dm.name}</span>
                          </div>
                          {dm.unreadCount > 0 && (
                            <Badge variant="default" className="ml-auto">
                              {dm.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Main chat content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Channel/DM header */}
          <div className="border-b border-border p-4 flex justify-between items-center">
            <div className="flex items-center">
              {selectedChannel && (
                <>
                  <Hash size={20} className="mr-2" />
                  <div>
                    <h3 className="font-medium">{selectedChannel.name}</h3>
                    {selectedChannel.description && (
                      <p className="text-xs text-muted-foreground">{selectedChannel.description}</p>
                    )}
                  </div>
                </>
              )}
              
              {selectedDM && (
                <>
                  <div className="relative mr-2">
                    <Avatar className="h-8 w-8">
                      {selectedDM.avatar && <AvatarImage src={selectedDM.avatar} />}
                      <AvatarFallback>{selectedDM.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${getStatusColor(selectedDM.status)} ring-1 ring-background`}></span>
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedDM.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedDM.status}</p>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSidePanel("pinned")}
                className={activeSidePanel === "pinned" ? "bg-secondary" : ""}
              >
                <Pin size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSidePanel("bookmarks")}
                className={activeSidePanel === "bookmarks" ? "bg-secondary" : ""}
              >
                <Bookmark size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSidePanel("files")}
                className={activeSidePanel === "files" ? "bg-secondary" : ""}
              >
                <Paperclip size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className={showAIAssistant ? "bg-secondary" : ""}
              >
                <Bot size={18} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Channel Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>View members</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notification preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4" />
                    <span>Add to favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>View profile</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main content area with side panel */}
          <div className="flex-1 flex overflow-hidden">
            {/* Messages area */}
            <div className={`flex-1 flex flex-col ${activeSidePanel ? "w-2/3" : "w-full"} transition-all duration-200`}>
              {/* AI Assistant area */}
              {showAIAssistant && (
                <div className="p-3 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot size={16} className="text-primary" />
                    <h4 className="text-sm font-medium">AI Assistant</h4>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask AI to draft a message, summarize this channel, or analyze data..."
                      value={aiPrompt}
                      onChange={(e) => setAIPrompt(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleAIAssist} disabled={!aiPrompt.trim()}>
                      Generate
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                  {mockMessages.map((message) => (
                    <div key={message.id} className="group" id={`message-${message.id}`}>
                      {replyToMessage === message.id && (
                        <div className="mb-2 ml-12 p-1 bg-muted/50 rounded-md text-xs flex items-center justify-between">
                          <div className="flex items-center">
                            <Reply size={12} className="mr-1" />
                            <span>Replying to {message.sender.name}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5" 
                            onClick={() => setReplyToMessage(null)}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      )}
                      
                      <div className="flex">
                        <Avatar className="h-8 w-8 mt-1 mr-3">
                          {message.sender.avatar ? (
                            <AvatarImage src={message.sender.avatar} />
                          ) : (
                            <AvatarFallback>
                              {message.isAIGenerated ? "AI" : message.sender.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-baseline">
                            <div className="flex items-center">
                              <h4 className="font-medium mr-2">
                                {message.sender.name}
                                {message.isAIGenerated && (
                                  <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                                    AI
                                  </span>
                                )}
                              </h4>
                              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                              {message.isPinned && (
                                <Pin size={12} className="ml-2 text-amber-500" />
                              )}
                            </div>
                          </div>
                          
                          <p className="mt-1 text-sm">{message.content}</p>
                          
                          {message.hasAttachment && message.attachment && (
                            <div className="mt-2 max-w-md">
                              {message.attachment.type === "image" || message.attachment.type === "gif" ? (
                                <div className="rounded-md overflow-hidden border">
                                  <img
                                    src={message.attachment.url}
                                    alt={message.attachment.name}
                                    className="w-full h-auto"
                                  />
                                </div>
                              ) : message.attachment.type === "document" ? (
                                <div className="flex items-center p-3 border rounded-md bg-muted/30">
                                  <FileText size={16} className="mr-2" />
                                  <span className="text-sm flex-1 truncate">{message.attachment.name}</span>
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <Download size={14} />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center p-3 border rounded-md bg-muted/30">
                                  <Video size={16} className="mr-2" />
                                  <span className="text-sm flex-1 truncate">{message.attachment.name}</span>
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <ExternalLink size={14} />
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {message.reactions.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {message.reactions.map((reaction, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-muted/30 hover:bg-muted cursor-pointer px-2 py-0"
                                >
                                  <span className="mr-1">{reaction.emoji}</span>
                                  <span className="text-xs">{reaction.count}</span>
                                </Badge>
                              ))}
                              <Badge
                                variant="outline"
                                className="bg-transparent hover:bg-muted cursor-pointer px-2 py-0"
                              >
                                <Smile size={12} className="mr-1" />
                                <span className="text-xs">Add</span>
                              </Badge>
                            </div>
                          )}
                          
                          <div className="mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => setReplyToMessage(message.id)}
                            >
                              <Reply size={12} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handlePinMessage(message.id)}
                            >
                              <Pin size={12} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleBookmarkMessage(message.id)}
                            >
                              <BookmarkPlus size={12} />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreVertical size={12} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start" side="right">
                                <DropdownMenuItem>
                                  <Copy size={12} className="mr-2" />
                                  Copy text
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit size={12} className="mr-2" />
                                  Edit message
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FolderPlus size={12} className="mr-2" />
                                  Save to files
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 size={12} className="mr-2" />
                                  Delete message
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-3 border-t border-border">
                {replyToMessage && (
                  <div className="mb-2 p-2 bg-muted/30 rounded-md flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Reply size={14} className="mr-2" />
                      <span>Replying to a message</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setReplyToMessage(null)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                )}
                
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
                          onClick={() => handleSelectGif(gif.url)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setShowGifPicker(!showGifPicker)}
                    >
                      <Gift size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Smile size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Paperclip size={18} />
                    </Button>
                  </div>
                  
                  <Input
                    placeholder={`Message ${selectedChannel ? `#${selectedChannel.name}` : selectedDM?.name || "..."}`}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Side panel area */}
            {activeSidePanel && (
              <div className="w-1/3 border-l border-border flex flex-col">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h3 className="font-medium">
                    {activeSidePanel === "pinned" 
                      ? "Pinned Items" 
                      : activeSidePanel === "bookmarks" 
                        ? "Bookmarks" 
                        : "Files & Media"
                    }
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setActiveSidePanel(null)}
                  >
                    <ChevronDown size={16} />
                  </Button>
                </div>
                
                <ScrollArea className="flex-1 p-3">
                  {activeSidePanel === "pinned" && (
                    <div className="space-y-3">
                      {mockPinnedItems.map((item) => (
                        <Card key={item.id} className="p-3">
                          <div className="flex items-start gap-2">
                            {item.type === "message" ? (
                              <MessageSquare size={16} className="mt-0.5 flex-shrink-0" />
                            ) : (
                              <FileText size={16} className="mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">{item.content}</p>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <span>{item.from}</span>
                                <span className="mx-1">•</span>
                                <span>{item.timestamp}</span>
                                {item.channel && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <Badge variant="outline" className="text-xs px-1 py-0">
                                      #{item.channel}
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical size={14} />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {activeSidePanel === "bookmarks" && (
                    <div className="space-y-3">
                      {mockBookmarks.map((bookmark) => (
                        <Card key={bookmark.id} className="p-3">
                          <div className="flex items-start gap-2">
                            {bookmark.type === "message" ? (
                              <MessageSquare size={16} className="mt-0.5 flex-shrink-0" />
                            ) : bookmark.type === "file" ? (
                              <FileText size={16} className="mt-0.5 flex-shrink-0" />
                            ) : (
                              <ExternalLink size={16} className="mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{bookmark.title}</p>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <span>Added by {bookmark.addedBy}</span>
                                <span className="mx-1">•</span>
                                <span>{bookmark.timestamp}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical size={14} />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {activeSidePanel === "files" && (
                    <div className="space-y-3">
                      {mockFiles.map((file) => (
                        <Card key={file.id} className="p-0 overflow-hidden">
                          {(file.type === "image" || file.type === "gif") && (
                            <div className="relative h-32 bg-muted">
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-2 text-white w-full">
                                  <p className="text-sm truncate">{file.name}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {(file.type === "document" || file.type === "video") && (
                            <div className="p-3">
                              <div className="flex items-center gap-2">
                                {file.type === "document" ? (
                                  <FileText size={16} />
                                ) : (
                                  <Video size={16} />
                                )}
                                <span className="text-sm font-medium truncate">{file.name}</span>
                              </div>
                            </div>
                          )}
                          
                          <div className="p-3 pt-0 flex items-center justify-between">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>{file.uploadedBy}</span>
                              <span className="mx-1">•</span>
                              <span>{file.timestamp}</span>
                              <span className="mx-1">•</span>
                              <span>{file.size}</span>
                            </div>
                            <div className="flex items-center">
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Download size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical size={14} />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MessagingPage;
