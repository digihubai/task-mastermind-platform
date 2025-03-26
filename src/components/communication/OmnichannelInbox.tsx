
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Plus } from "lucide-react";
import OmnichannelInboxFilters from "./OmnichannelInboxFilters";
import ConversationList from "./ConversationList";
import ConversationDetails from "./ConversationDetails";

// Refactored OmnichannelInbox component using the newly created sub-components
const OmnichannelInbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredConversations = conversations.filter(convo => {
    if (filterStatus !== 'all' && convo.status !== filterStatus) return false;
    if (activeTab === 'all') return true;
    return convo.channel === activeTab;
  });

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Conversation List */}
      <div className="md:col-span-4 lg:col-span-3">
        <Card className="h-[calc(100vh-180px)]">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Conversations</h2>
              <Button size="sm" variant="outline">
                <Plus size={16} className="mr-1" />
                New
              </Button>
            </div>
            
            <OmnichannelInboxFilters 
              filterStatus={filterStatus} 
              setFilterStatus={setFilterStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
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
              <ConversationList 
                conversations={filteredConversations}
                selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
              />
            </CardContent>
          </Tabs>
        </Card>
      </div>
      
      {/* Conversation Detail */}
      <div className="md:col-span-8 lg:col-span-9">
        <Card className="h-[calc(100vh-180px)] flex flex-col">
          {selectedConversation ? (
            <ConversationDetails 
              conversation={currentConversation}
              messages={messages}
            />
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
