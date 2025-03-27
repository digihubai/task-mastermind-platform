
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SupportTicket, SupportMessage, ChatBotFlow, ChatBotNode } from "@/types/support";
import { ChatFlowDesigner } from "@/components/support/ChatFlowDesigner";
import { SupportBoard } from "@/components/support/SupportBoard";
import { TicketList } from "@/components/support/TicketList";
import { TicketDetails } from "@/components/support/TicketDetails";
import { UserDetails } from "@/components/support/UserDetails";
import { NewTicketForm } from "@/components/support/NewTicketForm";
import { PlusCircle, RefreshCw, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Mock data
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "ticket-1",
      subject: "Login Issue",
      description: "I can't log in to my account",
      status: "open",
      priority: "high",
      category: "account",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      userId: "user-1",
      assigneeId: "agent-1",
      messages: [
        {
          id: "msg-1",
          ticketId: "ticket-1",
          content: "I tried to log in multiple times but it keeps saying invalid credentials.",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          userId: "user-1",
          isInternal: false
        },
        {
          id: "msg-2",
          ticketId: "ticket-1",
          content: "Have you tried resetting your password?",
          createdAt: new Date(Date.now() - 76400000).toISOString(),
          userId: "agent-1",
          isInternal: false
        }
      ],
      department: "Support",
      tags: ["login", "account-access"],
    },
    {
      id: "ticket-2",
      subject: "Feature Request",
      description: "I would like to suggest a new feature",
      status: "pending",
      priority: "medium",
      category: "feature",
      createdAt: new Date(Date.now() - 186400000).toISOString(),
      updatedAt: new Date(Date.now() - 186400000).toISOString(),
      userId: "user-2",
      assigneeId: "agent-2",
      messages: [
        {
          id: "msg-3",
          ticketId: "ticket-2",
          content: "I think it would be great to add a dark mode to the application.",
          createdAt: new Date(Date.now() - 186400000).toISOString(),
          userId: "user-2",
          isInternal: false
        },
        {
          id: "msg-4",
          ticketId: "ticket-2",
          content: "Thanks for the suggestion! We'll consider it for a future update.",
          createdAt: new Date(Date.now() - 176400000).toISOString(),
          userId: "agent-2",
          isInternal: false
        }
      ],
      department: "Product",
      tags: ["feature-request", "ui"],
    },
  ]);
  
  // Default chat flow
  const [chatFlow, setChatFlow] = useState<ChatBotFlow>({
    id: "flow-default",
    name: "Default Support Flow",
    description: "A default flow for customer support",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    nodes: [
      {
        id: "node-start",
        type: "start",
        position: { x: 100, y: 100 },
        data: { name: "Start" }
      },
      {
        id: "node-greeting",
        type: "message",
        position: { x: 100, y: 200 },
        data: { message: "Hello! How can I help you today?" }
      }
    ],
    edges: [
      { id: "edge-1", source: "node-start", target: "node-greeting" }
    ],
    isActive: true,
    language: "en"
  });
  
  const selectedTicket = selectedTicketId 
    ? tickets.find(ticket => ticket.id === selectedTicketId) 
    : null;
  
  const handleSelectTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
  };
  
  const handleNewTicket = () => {
    setShowNewTicketForm(true);
  };
  
  const handleSubmitNewTicket = (newTicket: Partial<SupportTicket>) => {
    const ticket: SupportTicket = {
      id: `ticket-${Date.now()}`,
      subject: newTicket.subject || "No subject",
      description: newTicket.description || "",
      status: "open",
      priority: newTicket.priority || "medium",
      category: newTicket.category || "general",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "user-current",
      messages: [],
      department: newTicket.department || "Support",
      tags: newTicket.tags || []
    };
    
    setTickets([ticket, ...tickets]);
    setShowNewTicketForm(false);
    setSelectedTicketId(ticket.id);
  };
  
  const handleCancelNewTicket = () => {
    setShowNewTicketForm(false);
  };
  
  const handleSendMessage = (ticketId: string, message: string, isInternal: boolean) => {
    if (!message.trim()) return;
    
    const newMessage: SupportMessage = {
      id: `msg-${Date.now()}`,
      ticketId,
      content: message,
      createdAt: new Date().toISOString(),
      userId: "user-current",
      isInternal
    };
    
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          messages: [...ticket.messages, newMessage],
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    }));
  };
  
  const handleUpdateTicket = (ticketId: string, updateData: Partial<SupportTicket>) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          ...updateData,
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    }));
  };

  const handleSaveChatFlow = (flow: ChatBotFlow) => {
    setChatFlow(flow);
    toast({
      title: "Flow saved",
      description: "Your chatbot flow has been saved successfully."
    });
  };
  
  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Support</h1>
          
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button onClick={handleNewTicket}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="tickets" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="board">Board</TabsTrigger>
            <TabsTrigger value="chatbots">Chatbots</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tickets" className="flex-1 space-y-4">
            {showNewTicketForm ? (
              <NewTicketForm 
                onSubmit={handleSubmitNewTicket} 
                onCancel={handleCancelNewTicket}
              />
            ) : selectedTicket ? (
              <div className="flex h-[calc(80vh-8rem)]">
                <div className="w-1/3 border-r pr-4">
                  <TicketList 
                    tickets={tickets} 
                    onSelectTicket={handleSelectTicket}
                    onNewTicket={handleNewTicket}
                    selectedTicketId={selectedTicketId}
                  />
                </div>
                <div className="w-2/3 pl-4">
                  <TicketDetails 
                    ticket={selectedTicket}
                    onSendMessage={handleSendMessage}
                    onUpdateTicket={handleUpdateTicket}
                  />
                </div>
              </div>
            ) : (
              <TicketList 
                tickets={tickets} 
                onSelectTicket={handleSelectTicket}
                onNewTicket={handleNewTicket}
                selectedTicketId={selectedTicketId}
              />
            )}
          </TabsContent>
          
          <TabsContent value="board" className="flex-1">
            <SupportBoard />
          </TabsContent>
          
          <TabsContent value="chatbots" className="flex-1">
            <ChatFlowDesigner 
              flow={chatFlow}
              onSave={handleSaveChatFlow}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Support;
