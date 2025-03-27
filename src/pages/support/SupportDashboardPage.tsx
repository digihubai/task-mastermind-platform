
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SupportStats from "@/components/support/SupportStats";
import { Button } from "@/components/ui/button";
import { PlusCircle, TicketIcon, MessageSquare, Phone, Users } from "lucide-react";
import OmnichannelInbox from "@/components/communication/OmnichannelInbox";
import { useNavigate } from 'react-router-dom';
import { TicketList } from "@/components/support/TicketList";
import { SupportTicket } from "@/types/support";

// Mock data for recent tickets
const recentTickets: SupportTicket[] = [
  {
    id: "ticket-001",
    subject: "Setup assistance for chatbot",
    description: "I'm having trouble setting up the chatbot for my website.",
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
      }
    ]
  },
  {
    id: "ticket-002",
    subject: "API integration questions",
    description: "I need help understanding how to integrate your API.",
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
        id: "msg-2",
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
  }
];

const SupportDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const navigate = useNavigate();

  const handleViewTicket = (ticket: SupportTicket) => {
    // Navigate to tickets page with the selected ticket
    navigate('/support/tickets', { state: { selectedTicketId: ticket.id } });
  };

  const handleNewTicket = () => {
    navigate('/support/tickets', { state: { showNewTicketForm: true } });
  };

  return (
    <AppLayout showModuleName moduleName="Support Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Support Dashboard</h1>
          <div className="flex gap-3">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Team Members
            </Button>
            <Button onClick={handleNewTicket}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        </div>

        <SupportStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">
              <TicketIcon className="h-4 w-4 mr-2" />
              Tickets
            </TabsTrigger>
            <TabsTrigger value="inbox">
              <MessageSquare className="h-4 w-4 mr-2" />
              Inbox
            </TabsTrigger>
            <TabsTrigger value="calls">
              <Phone className="h-4 w-4 mr-2" />
              Calls
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Tickets</CardTitle>
                  <Button variant="link" size="sm" onClick={() => navigate('/support/tickets')}>
                    View all
                  </Button>
                </CardHeader>
                <CardContent>
                  {recentTickets.length > 0 ? (
                    <TicketList 
                      tickets={recentTickets} 
                      onViewTicket={handleViewTicket}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No recent tickets found. Create a new ticket to get started.
                    </p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/20 p-4 rounded-md">
                      <h3 className="text-sm font-medium">Resolution Rate</h3>
                      <p className="text-2xl font-bold mt-2">87%</p>
                      <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
                    </div>
                    <div className="bg-muted/20 p-4 rounded-md">
                      <h3 className="text-sm font-medium">Avg. Response Time</h3>
                      <p className="text-2xl font-bold mt-2">3.2h</p>
                      <p className="text-xs text-muted-foreground mt-1">-10% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Support Tickets</CardTitle>
                <Button size="sm" onClick={() => navigate('/support/tickets')}>
                  View all tickets
                </Button>
              </CardHeader>
              <CardContent>
                <TicketList 
                  tickets={recentTickets} 
                  onViewTicket={handleViewTicket}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inbox" className="space-y-4 h-[calc(100vh-22rem)]">
            <OmnichannelInbox />
          </TabsContent>
          
          <TabsContent value="calls" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Call Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  View all call center activity here.
                </p>
                <div className="mt-4">
                  <Button variant="outline" onClick={() => navigate('/support/call-center')}>
                    <Phone className="mr-2 h-4 w-4" />
                    Go to Call Center
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SupportDashboardPage;
