
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketList } from "@/components/support/TicketList";
import { TicketDetails } from "@/components/support/TicketDetails";
import { NewTicketForm } from "@/components/support/NewTicketForm";
import { QueueManagement } from "@/components/support/QueueManagement";
import { SupportTicket } from "@/types/support";
import { useToast } from "@/hooks/use-toast";
import { mockQueues } from "@/components/support/mock-data/queues";
import { mockAgents } from "@/components/support/mock-data/agents";

// Mock data for tickets
const mockTickets: SupportTicket[] = [
  {
    id: "ticket-001",
    subject: "Setup assistance for chatbot",
    description: "I'm having trouble setting up the chatbot for my website. I've followed the documentation but the widget isn't appearing correctly.",
    status: "in_progress",
    priority: "medium",
    category: "technical",
    createdAt: "2023-04-10T14:30:00Z",
    updatedAt: "2023-04-11T09:15:00Z",
    userId: "user-123",
    assignedTo: "agent-456",
    department: "technical",
    tags: ["chatbot", "setup"],
    messages: [
      {
        id: "msg-1",
        ticketId: "ticket-001",
        content: "I've been trying to set up the chatbot following your documentation, but it's not showing up on my site.",
        createdAt: "2023-04-10T14:30:00Z",
        userId: "user-123",
        senderId: "user-123",
        senderType: "customer",
        isInternal: false,
        isRead: true
      },
      {
        id: "msg-2",
        ticketId: "ticket-001",
        content: "Could you tell me which browser and website you're using? I'll check the compatibility issues.",
        createdAt: "2023-04-11T09:15:00Z",
        userId: "agent-456",
        senderId: "agent-456",
        senderType: "agent",
        isInternal: false,
        isRead: true
      }
    ]
  },
  {
    id: "ticket-002",
    subject: "API integration questions",
    description: "I need help understanding how to integrate your API with our custom CRM system. Are there any specific requirements or limitations?",
    status: "open",
    priority: "low",
    category: "integration",
    createdAt: "2023-04-12T10:45:00Z", 
    updatedAt: "2023-04-12T10:45:00Z",
    userId: "user-456",
    department: "technical",
    tags: ["api", "integration"],
    messages: [
      {
        id: "msg-3",
        ticketId: "ticket-002",
        content: "I'm trying to integrate your API with our custom CRM. Do you have any specific requirements?",
        createdAt: "2023-04-12T10:45:00Z",
        userId: "user-456",
        senderId: "user-456",
        senderType: "customer",
        isInternal: false,
        isRead: true
      }
    ]
  },
  {
    id: "ticket-003",
    subject: "Billing inquiry",
    description: "I was charged twice for my subscription this month. Can you please check and refund the extra payment?",
    status: "open",
    priority: "high",
    category: "billing",
    createdAt: "2023-04-11T08:20:00Z",
    updatedAt: "2023-04-11T08:20:00Z",
    userId: "user-789",
    department: "billing",
    tags: ["billing", "payment"],
    messages: [
      {
        id: "msg-4",
        ticketId: "ticket-003",
        content: "I noticed I was charged twice this month for my subscription. Could you please check and refund the extra payment?",
        createdAt: "2023-04-11T08:20:00Z",
        userId: "user-789",
        senderId: "user-789",
        senderType: "customer",
        isInternal: false,
        isRead: true
      }
    ]
  }
];

const TicketsPage: React.FC = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [dashboardTab, setDashboardTab] = useState('tickets');

  const handleCreateTicket = (newTicket: Partial<SupportTicket>) => {
    const ticket: SupportTicket = {
      ...newTicket,
      id: `ticket-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'open',
      messages: [],
      tags: newTicket.tags || [],
      userId: 'user-current'
    } as SupportTicket;
    
    setTickets([ticket, ...tickets]);
    setShowNewTicketForm(false);
    
    toast({
      title: "Ticket created",
      description: "Your support ticket has been submitted successfully."
    });
  };

  const handleTicketClick = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
  };

  const handleBackToList = () => {
    setSelectedTicket(null);
  };

  const handleSendReply = (message: string) => {
    if (!selectedTicket || !message.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      ticketId: selectedTicket.id,
      content: message,
      createdAt: new Date().toISOString(),
      userId: 'agent-current',
      senderId: 'agent-current',
      senderType: 'agent',
      isInternal: false,
      isRead: true
    };

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
      updatedAt: new Date().toISOString()
    };

    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    );

    setTickets(updatedTickets);
    setSelectedTicket(updatedTicket);
    
    toast({
      title: "Reply sent",
      description: "Your response has been added to the ticket."
    });
  };

  const handleUpdateTicket = (ticketId: string, updateData: Partial<SupportTicket>) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const updatedTicket = { 
          ...ticket, 
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        setSelectedTicket(updatedTicket);
        return updatedTicket;
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    toast({
      title: "Ticket updated",
      description: `Ticket ${updateData.status || updateData.priority ? 'status' : 'details'} has been updated.`
    });
  };

  const filteredTickets = tickets.filter(ticket => {
    // Filter by status
    if (activeTab !== 'all' && ticket.status !== activeTab) return false;
    
    // Filter by search query
    if (searchQuery && !ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !ticket.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // If a ticket is selected, show the ticket details view
  if (selectedTicket) {
    return (
      <AppLayout showModuleName moduleName="Support Tickets">
        <div className="space-y-6">
          <Button variant="ghost" onClick={handleBackToList} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tickets
          </Button>
          
          <div className="bg-background rounded-lg p-6 border">
            <TicketDetails 
              ticket={selectedTicket}
              onReply={handleSendReply}
              onUpdateTicket={handleUpdateTicket}
            />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showModuleName moduleName="Support Tickets">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Support Tickets</h1>
          <Button onClick={() => setShowNewTicketForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </div>

        {showNewTicketForm ? (
          <NewTicketForm 
            onSubmit={handleCreateTicket} 
            onCancel={() => setShowNewTicketForm(false)} 
          />
        ) : (
          <>
            <Tabs defaultValue="tickets" value={dashboardTab} onValueChange={setDashboardTab}>
              <TabsList>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="queues">Queues & Agents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tickets" className="mt-6 space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tickets..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All Tickets</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>All Tickets ({filteredTickets.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <TicketList 
                          tickets={filteredTickets} 
                          onViewTicket={handleTicketClick}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="open" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Open Tickets ({filteredTickets.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <TicketList 
                          tickets={filteredTickets}
                          onViewTicket={handleTicketClick}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="in_progress" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>In Progress ({filteredTickets.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <TicketList 
                          tickets={filteredTickets}
                          onViewTicket={handleTicketClick}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="resolved" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Resolved Tickets ({filteredTickets.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <TicketList 
                          tickets={filteredTickets}
                          onViewTicket={handleTicketClick}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="closed" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Closed Tickets ({filteredTickets.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <TicketList 
                          tickets={filteredTickets}
                          onViewTicket={handleTicketClick}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              <TabsContent value="queues" className="mt-6">
                <QueueManagement queues={mockQueues} agents={mockAgents} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default TicketsPage;
