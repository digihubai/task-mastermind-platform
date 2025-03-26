
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Search, Filter, MessageSquare, Phone, Mail, Instagram, Twitter, Facebook, Send, Paperclip, Smile, Plus, ArrowUpRight, Clock, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Placeholder component for now - will be expanded in future implementation
const OmnichannelInbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Mock data for demonstration
  const conversations = [
    {
      id: "1",
      name: "Sarah Johnson",
      message: "I need help with my recent order #45678",
      unread: true,
      time: "5m",
      channel: "email",
      status: "open",
      priority: "high",
      agent: null
    },
    {
      id: "2",
      name: "Michael Brown",
      message: "When will my subscription renew?",
      unread: false,
      time: "25m",
      channel: "chat",
      status: "active",
      priority: "medium",
      agent: "AI Assistant"
    },
    {
      id: "3",
      name: "David Wilson",
      message: "Thank you for your quick response!",
      unread: false,
      time: "1h",
      channel: "sms",
      status: "closed",
      priority: "low",
      agent: "John D."
    },
    {
      id: "4",
      name: "Jennifer Martinez",
      message: "I'd like to upgrade my plan",
      unread: true,
      time: "2h",
      channel: "instagram",
      status: "open",
      priority: "high",
      agent: null
    },
    {
      id: "5",
      name: "Robert Davis",
      message: "Can you explain how the AI features work?",
      unread: false,
      time: "3h",
      channel: "twitter",
      status: "active",
      priority: "medium",
      agent: "AI Assistant"
    },
    {
      id: "6",
      name: "Emily Wilson",
      message: "I need help setting up my account",
      unread: false,
      time: "1d",
      channel: "facebook",
      status: "waiting",
      priority: "medium",
      agent: null
    },
    {
      id: "7",
      name: "Thomas Anderson",
      message: "Left a voicemail about subscription issues",
      unread: true,
      time: "1d",
      channel: "phone",
      status: "open",
      priority: "high",
      agent: null
    }
  ];

  const messages = [
    {
      id: "1",
      sender: "customer",
      content: "Hello, I recently placed an order (#45678) but haven't received a shipping confirmation yet. Can you help me check the status?",
      time: "10:32 AM",
      channel: "email"
    },
    {
      id: "2",
      sender: "ai",
      content: "Hi Sarah, thank you for reaching out. I'd be happy to help you check on your order status. Let me look that up for you right away.",
      time: "10:34 AM",
      channel: "email"
    },
    {
      id: "3",
      sender: "ai",
      content: "I can see that your order #45678 has been processed and is currently being prepared for shipping. It should be shipped within the next 24 hours, and you'll receive an email confirmation once it's on the way.",
      time: "10:35 AM",
      channel: "email"
    },
    {
      id: "4",
      sender: "customer",
      content: "That's great to know! Do you have an estimated delivery date?",
      time: "10:38 AM",
      channel: "email"
    },
    {
      id: "5",
      sender: "ai",
      content: "Based on your location and the shipping method selected (Standard Shipping), your estimated delivery date is June 15-16. Would you like me to provide tracking information once it's available?",
      time: "10:40 AM",
      channel: "email"
    },
    {
      id: "6",
      sender: "customer",
      content: "Yes, please send me the tracking information when available. Also, is it possible to upgrade to express shipping?",
      time: "10:42 AM",
      channel: "email"
    },
    {
      id: "7",
      sender: "human",
      content: "Hi Sarah, this is John from customer support. I'm taking over from our AI assistant. Yes, we can definitely upgrade your shipping to express. There would be an additional fee of $12.50. Would you like to proceed with the upgrade?",
      time: "10:45 AM",
      channel: "email"
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage("");
  };

  const handleAssignToHuman = () => {
    // Logic to assign conversation to human agent
    console.log('Assigning conversation to human agent');
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail size={16} />;
      case 'chat':
        return <MessageSquare size={16} />;
      case 'sms':
        return <MessageSquare size={16} />;
      case 'phone':
        return <Phone size={16} />;
      case 'instagram':
        return <Instagram size={16} />;
      case 'twitter':
        return <Twitter size={16} />;
      case 'facebook':
        return <Facebook size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500';
      case 'active':
        return 'bg-green-500';
      case 'waiting':
        return 'bg-yellow-500';
      case 'closed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredConversations = conversations.filter(convo => {
    if (filterStatus !== 'all' && convo.status !== filterStatus) return false;
    if (activeTab === 'all') return true;
    return convo.channel === activeTab;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Conversation List */}
      <div className="md:col-span-4 lg:col-span-3">
        <Card className="h-[calc(100vh-180px)]">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Button size="sm" variant="outline">
                <Plus size={16} className="mr-1" />
                New
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="ghost">
                <Filter size={16} className="mr-1" />
                Filters
              </Button>
            </div>
          </CardHeader>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="px-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="email" className="flex-1">Email</TabsTrigger>
                <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
                <TabsTrigger value="phone" className="flex-1">Voice</TabsTrigger>
              </TabsList>
            </div>
            
            <CardContent className="p-0 pt-3">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="px-4 space-y-2">
                  {filteredConversations.map((convo) => (
                    <div 
                      key={convo.id} 
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === convo.id ? 'bg-primary/10' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedConversation(convo.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9">
                          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-medium">
                            {convo.name.substring(0, 2)}
                          </div>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <p className="font-medium">{convo.name}</p>
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(convo.status)}`}></div>
                            </div>
                            <span className="text-xs text-muted-foreground">{convo.time}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="p-0.5 rounded-full bg-primary/10 text-primary">
                              {getChannelIcon(convo.channel)}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{convo.message}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-1.5">
                            <Badge variant={convo.priority === 'high' ? 'destructive' : (convo.priority === 'medium' ? 'default' : 'outline')} className="text-xs">
                              {convo.priority.charAt(0).toUpperCase() + convo.priority.slice(1)}
                            </Badge>
                            
                            {convo.agent ? (
                              <span className="text-xs text-muted-foreground">
                                {convo.agent === 'AI Assistant' ? '🤖 AI' : `👤 ${convo.agent}`}
                              </span>
                            ) : (
                              <span className="text-xs text-amber-500 font-medium">Unassigned</span>
                            )}
                          </div>
                        </div>
                        
                        {convo.unread && (
                          <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Tabs>
        </Card>
      </div>
      
      {/* Conversation Detail */}
      <div className="md:col-span-8 lg:col-span-9">
        <Card className="h-[calc(100vh-180px)] flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-medium">
                        {conversations.find(c => c.id === selectedConversation)?.name.substring(0, 2)}
                      </div>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{conversations.find(c => c.id === selectedConversation)?.name}</h3>
                        <Badge variant="outline" className="text-xs capitalize">
                          {conversations.find(c => c.id === selectedConversation)?.channel}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Customer since January 2023 • 5 previous conversations
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleAssignToHuman}>
                      <ArrowUpRight size={14} className="mr-1.5" />
                      Assign to Human
                    </Button>
                    <Select defaultValue="open">
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender !== 'customer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'customer' 
                              ? 'bg-muted'
                              : message.sender === 'ai' 
                                ? 'bg-primary/10 text-primary-foreground' 
                                : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {message.sender !== 'customer' && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                              {message.sender === 'ai' ? (
                                <span className="font-medium">🤖 AI Assistant</span>
                              ) : (
                                <span className="font-medium">👤 Human Agent</span>
                              )}
                              <span>•</span>
                              <span>{message.time}</span>
                              <span>•</span>
                              <div className="p-0.5 rounded-full bg-primary/10 text-primary">
                                {getChannelIcon(message.channel)}
                              </div>
                            </div>
                          )}
                          
                          <p className="text-sm">{message.content}</p>
                          
                          {message.sender === 'customer' && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 justify-end">
                              <span>{message.time}</span>
                              <span>•</span>
                              <div className="p-0.5 rounded-full bg-primary/10 text-primary">
                                {getChannelIcon(message.channel)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="pr-24"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Paperclip size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Smile size={16} />
                      </Button>
                    </div>
                  </div>
                  <Button onClick={handleSendMessage}>
                    <Send size={16} className="mr-1.5" />
                    Send
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      Response time: 2m
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle size={12} />
                      AI is responding
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span>Suggested responses</span>
                    <Info size={12} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No conversation selected</h3>
                <p className="text-muted-foreground">Select a conversation from the list to view details</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OmnichannelInbox;
