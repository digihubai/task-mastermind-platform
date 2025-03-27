
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketList } from "@/components/support/TicketList";
import { NewTicketForm } from "@/components/support/NewTicketForm";
import { SupportTicket } from "@/types/support";
import { useToast } from "@/hooks/use-toast";

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
    messages: []
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
    messages: []
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
    messages: []
  }
];

const TicketsPage: React.FC = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
                    <TicketList tickets={filteredTickets} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="open" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Open Tickets ({filteredTickets.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TicketList tickets={filteredTickets} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="in_progress" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>In Progress ({filteredTickets.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TicketList tickets={filteredTickets} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resolved" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resolved Tickets ({filteredTickets.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TicketList tickets={filteredTickets} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="closed" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Closed Tickets ({filteredTickets.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TicketList tickets={filteredTickets} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default TicketsPage;
