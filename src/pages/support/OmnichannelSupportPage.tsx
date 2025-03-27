
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OmnichannelInbox from '@/components/communication/OmnichannelInbox';
import SupportStats from '@/components/support/SupportStats';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { TicketList } from '@/components/support/TicketList';
import { SupportTicket } from '@/types/support';

// Mock data for tickets
const mockTickets: SupportTicket[] = [
  {
    id: "ticket-003",
    subject: "Billing inquiry",
    description: "I was charged twice for my subscription this month.",
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
        id: "msg-1",
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
  },
  {
    id: "ticket-004",
    subject: "Feature request: Multiple language support",
    description: "I'd like to request support for multiple languages in the chatbot.",
    status: "open",
    priority: "medium",
    category: "feature",
    createdAt: "2023-04-10T15:10:00Z",
    updatedAt: "2023-04-10T15:10:00Z",
    userId: "user-101",
    department: "general",
    tags: ["feature-request", "languages"],
    messages: [
      {
        id: "msg-2",
        ticketId: "ticket-004",
        content: "I would like to request support for multiple languages in the chatbot. Our customers are international.",
        createdAt: "2023-04-10T15:10:00Z",
        userId: "user-101",
        senderId: "user-101",
        senderType: "customer",
        isInternal: false,
        isRead: true
      }
    ]
  }
];

const OmnichannelSupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const navigate = useNavigate();

  const handleNewTicket = () => {
    navigate('/support/tickets');
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    // Pass selected ticket to the tickets page
    navigate('/support/tickets', { state: { selectedTicketId: ticket.id } });
  };

  return (
    <AppLayout showModuleName moduleName="Omnichannel Support">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Omnichannel Support</h1>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Team
            </Button>
            <Button onClick={handleNewTicket}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        </div>
        
        <SupportStats />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="inbox" className="flex-1">Omnichannel Inbox</TabsTrigger>
            <TabsTrigger value="tickets" className="flex-1">Support Tickets</TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inbox" className="mt-6 h-[calc(100vh-26rem)]">
            <OmnichannelInbox />
          </TabsContent>
          
          <TabsContent value="tickets" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Tickets</CardTitle>
                <Button variant="outline" size="sm" onClick={() => navigate('/support/tickets')}>
                  View all tickets
                </Button>
              </CardHeader>
              <CardContent>
                <TicketList 
                  tickets={mockTickets} 
                  onViewTicket={handleViewTicket}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">245</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.3 min</div>
                      <p className="text-xs text-muted-foreground">-8% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">92%</div>
                      <p className="text-xs text-muted-foreground">+3% from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default OmnichannelSupportPage;
