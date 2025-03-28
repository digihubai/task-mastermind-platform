
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SupportStats from "@/components/support/SupportStats";
import { useNavigate } from 'react-router-dom';
import { SupportTicket } from "@/types/support";
import { toast } from "@/hooks/use-toast";
import SupportDashboardHeader from "@/components/support/dashboard/SupportDashboardHeader";
import SupportTabList from "@/components/support/dashboard/SupportTabList";
import OverviewTabContent from "@/components/support/dashboard/OverviewTabContent";
import TicketsTabContent from "@/components/support/dashboard/TicketsTabContent";
import InboxTabContent from "@/components/support/dashboard/InboxTabContent";
import CallsTabContent from "@/components/support/dashboard/CallsTabContent";

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

const SupportDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const navigate = useNavigate();

  const handleViewTicket = (ticket: SupportTicket) => {
    navigate('/support/tickets', { state: { selectedTicketId: ticket.id } });
    toast({
      title: "Opening ticket",
      description: `Viewing details for ticket: ${ticket.subject}`
    });
  };

  const handleNewTicket = () => {
    navigate('/support/tickets', { state: { showNewTicketForm: true } });
    toast({
      title: "New ticket",
      description: "Creating a new support ticket"
    });
  };

  return (
    <AppLayout showModuleName moduleName="Support Dashboard">
      <div className="space-y-6">
        <SupportDashboardHeader onNewTicket={handleNewTicket} />
        <SupportStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <SupportTabList activeTab={activeTab} />
          
          <TabsContent value="overview" className="space-y-4">
            <OverviewTabContent 
              tickets={recentTickets}
              onViewTicket={handleViewTicket}
            />
          </TabsContent>
          
          <TabsContent value="tickets" className="space-y-4">
            <TicketsTabContent
              tickets={recentTickets}
              onViewTicket={handleViewTicket}
            />
          </TabsContent>
          
          <TabsContent value="inbox" className="space-y-4 h-[calc(100vh-22rem)]">
            <InboxTabContent />
          </TabsContent>
          
          <TabsContent value="calls" className="space-y-4">
            <CallsTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SupportDashboardPage;
