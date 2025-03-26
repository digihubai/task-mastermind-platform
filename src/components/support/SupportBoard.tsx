
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Phone, 
  Send, 
  Users, 
  Clock, 
  Settings, 
  Filter,
  Search,
  User,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupportBoard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("conversations");
  const [viewType, setViewType] = useState("unread");
  
  const mockConversations = [
    {
      id: 1,
      name: "John Smith",
      contact: "+1 502-837-7838",
      lastMessage: "Hi, this is ENT Care Center...",
      time: "10:04 AM",
      unread: true,
      type: "sms"
    },
    {
      id: 2,
      name: "Emma Johnson",
      contact: "emma@example.com",
      lastMessage: "I need help with my account settings",
      time: "Yesterday",
      unread: true,
      type: "email"
    },
    {
      id: 3,
      name: "Dennice Cainila",
      contact: "dennice@example.com",
      lastMessage: "https://firebasestorage.go...",
      time: "Feb 28th",
      unread: false,
      type: "chat"
    },
    {
      id: 4,
      name: "Rachael Mahaffe",
      contact: "rachael@example.com",
      lastMessage: "https://firebasestorage.go...",
      time: "Feb 25th",
      unread: false,
      type: "chat"
    },
    {
      id: 5,
      name: "Yody",
      contact: "+1 786-751-3409",
      lastMessage: "Hello, this is Yody from Ha...",
      time: "Feb 26th",
      unread: false,
      type: "sms"
    }
  ];
  
  const filteredConversations = viewType === "all" 
    ? mockConversations 
    : viewType === "unread" 
      ? mockConversations.filter(c => c.unread) 
      : mockConversations.slice(0, 3);
      
  const handleSendMessage = () => {
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Support Board</h2>
          <p className="text-muted-foreground mt-1">
            Manage customer conversations across multiple channels
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="agent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View as" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agent">Agent View</SelectItem>
              <SelectItem value="admin">Admin View</SelectItem>
              <SelectItem value="customer">Customer View</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Settings</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border border-border/40">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <MessageSquare size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Active Conversations</h3>
              <p className="text-2xl font-semibold mt-1">12</p>
              <p className="text-xs text-muted-foreground">3 require attention</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border border-border/40">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock size={18} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Average Response Time</h3>
              <p className="text-2xl font-semibold mt-1">8m 24s</p>
              <p className="text-xs text-green-500">↓ 12% from last week</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border border-border/40">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Users size={18} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Available Agents</h3>
              <p className="text-2xl font-semibold mt-1">5 / 8</p>
              <p className="text-xs text-muted-foreground">3 agents on calls</p>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="border border-border/40">
        <Tabs defaultValue="conversations" onValueChange={setActiveTab}>
          <div className="border-b border-border">
            <div className="flex justify-between p-2">
              <TabsList>
                <TabsTrigger value="conversations" className="relative">
                  Conversations
                  {mockConversations.filter(c => c.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                      {mockConversations.filter(c => c.unread).length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="manual-actions">Manual Actions</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="trigger-links">Trigger Links</TabsTrigger>
              </TabsList>
            </div>
            
            {activeTab === "conversations" && (
              <div className="flex border-t border-border">
                <Button 
                  variant={viewType === "unread" ? "default" : "ghost"}
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary px-4"
                  onClick={() => setViewType("unread")}
                >
                  Unread
                </Button>
                <Button 
                  variant={viewType === "recent" ? "default" : "ghost"}
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary px-4"
                  onClick={() => setViewType("recent")}
                >
                  Recents
                </Button>
                <Button 
                  variant={viewType === "all" ? "default" : "ghost"}
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary px-4"
                  onClick={() => setViewType("all")}
                >
                  All
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="border-r border-border">
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search conversations..." 
                    className="pl-9"
                  />
                </div>
              </div>
              
              <ScrollArea className="h-[500px]">
                {filteredConversations.map((convo) => (
                  <div 
                    key={convo.id}
                    className={`
                      p-3 border-b border-border cursor-pointer
                      ${convo.unread ? 'bg-muted/50' : ''}
                      hover:bg-muted/30 transition-colors
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                          {convo.name.substring(0, 2).toUpperCase()}
                        </div>
                        {convo.unread && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-sm truncate">
                            {convo.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {convo.time}
                          </span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {convo.contact}
                        </p>
                        
                        <p className="text-sm mt-1 truncate">
                          {convo.lastMessage}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {convo.type.toUpperCase()}
                          </Badge>
                          
                          {convo.unread && (
                            <Badge className="bg-primary text-xs">New</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
            
            <div className="col-span-2 flex flex-col">
              <div className="p-3 border-b border-border flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                    JS
                  </div>
                  
                  <div>
                    <h3 className="font-medium">John Smith</h3>
                    <p className="text-xs text-muted-foreground">
                      +1 502-837-7838 • SMS
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Phone size={14} className="mr-1" />
                    Call
                  </Button>
                  
                  <Button variant="outline" size="sm" className="h-8">
                    <User size={14} className="mr-1" />
                    Profile
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4 h-[400px]">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm">Hi, this is ENT Care Center. How can I help you today?</p>
                      <p className="text-xs text-muted-foreground mt-1 text-right">10:04 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none p-3 max-w-[80%]">
                      <p className="text-sm">I would like to schedule an appointment for next week if possible.</p>
                      <p className="text-xs text-primary-foreground/70 mt-1 text-right">10:06 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm">Certainly! We have openings on Tuesday and Thursday next week. What time works best for you?</p>
                      <p className="text-xs text-muted-foreground mt-1 text-right">10:08 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none p-3 max-w-[80%]">
                      <p className="text-sm">Tuesday morning would be perfect if you have anything available.</p>
                      <p className="text-xs text-primary-foreground/70 mt-1 text-right">10:09 AM</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1"
                  />
                  
                  <Button onClick={handleSendMessage}>
                    <Send size={16} className="mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border border-border/40">
          <h3 className="text-lg font-medium mb-4">Queue Management</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
              <div>
                <h4 className="font-medium">General Support</h4>
                <p className="text-xs text-muted-foreground">5 conversations in queue</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
              <div>
                <h4 className="font-medium">Technical Support</h4>
                <p className="text-xs text-muted-foreground">3 conversations in queue</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
              <div>
                <h4 className="font-medium">Billing Support</h4>
                <p className="text-xs text-muted-foreground">2 conversations in queue</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border border-border/40">
          <h3 className="text-lg font-medium mb-4">Quick Templates</h3>
          
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <span>Greeting Message</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <span>Schedule Appointment</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <span>Technical Support</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <span>Follow-up</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <span>Closing Message</span>
            </Button>
          </div>
        </Card>
        
        <Card className="p-6 border border-border/40">
          <h3 className="text-lg font-medium mb-4">Documentation</h3>
          
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-between text-primary">
              <span>Installing Support Board</span>
              <ChevronRight size={16} />
            </Button>
            
            <Button variant="ghost" className="w-full justify-between text-muted-foreground">
              <span>What is Dialogflow?</span>
              <ChevronRight size={16} />
            </Button>
            
            <Button variant="ghost" className="w-full justify-between text-muted-foreground">
              <span>What are the bots?</span>
              <ChevronRight size={16} />
            </Button>
            
            <Button variant="ghost" className="w-full justify-between text-muted-foreground">
              <span>Timetable and office hours</span>
              <ChevronRight size={16} />
            </Button>
            
            <Button variant="ghost" className="w-full justify-between text-primary">
              <span>Queue and Routing</span>
              <ChevronRight size={16} />
            </Button>
            
            <Button variant="ghost" className="w-full justify-between text-primary">
              <span>User Synchronization</span>
              <ChevronRight size={16} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SupportBoard;
