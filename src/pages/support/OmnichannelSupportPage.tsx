
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import AIAssistantSettings from '@/components/support/AIAssistantSettings';
import { mockConversations } from '@/components/communication/mock-data';
import { Conversation } from '@/types/omnichannel';
import { SupportTicket } from '@/types/support';
import { useNavigate } from 'react-router-dom';

// Import our new components
import OmnichannelHeader from '@/components/support/omnichannel/OmnichannelHeader';
import OmnichannelDashboard from '@/components/support/omnichannel/OmnichannelDashboard';
import OmnichannelInboxTab from '@/components/support/omnichannel/OmnichannelInboxTab';
import HumanAssignmentsTab from '@/components/support/omnichannel/HumanAssignmentsTab';
import RecentTicketsTab from '@/components/support/omnichannel/RecentTicketsTab';

// Mock ticket data
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
  const [showSettings, setShowSettings] = useState(false);
  const [humanAssignedConversations, setHumanAssignedConversations] = useState<Conversation[]>(
    mockConversations.filter(conv => 
      conv.assignmentStatus === 'waiting_for_human' || 
      conv.assignmentStatus === 'assigned_to_human'
    )
  );
  const navigate = useNavigate();

  const handleViewTicket = (ticket: SupportTicket) => {
    navigate('/support/tickets', { state: { selectedTicketId: ticket.id } });
    toast({
      title: "Opening ticket",
      description: `Viewing details for ticket: ${ticket.subject}`
    });
  };
  
  const handleAssignToHuman = (assignedConversation: Conversation) => {
    const existingIndex = humanAssignedConversations.findIndex(
      c => c.id === assignedConversation.id
    );
    
    if (existingIndex >= 0) {
      const updatedAssignments = [...humanAssignedConversations];
      updatedAssignments[existingIndex] = assignedConversation;
      setHumanAssignedConversations(updatedAssignments);
    } else {
      setHumanAssignedConversations([...humanAssignedConversations, assignedConversation]);
    }
    
    toast({
      title: assignedConversation.assignedHumanAgent 
        ? `Assigned to ${assignedConversation.assignedHumanAgent}` 
        : "Added to human queue",
      description: assignedConversation.assignedHumanAgent 
        ? `Conversation from ${assignedConversation.name} has been assigned to ${assignedConversation.assignedHumanAgent}` 
        : `Conversation from ${assignedConversation.name} is waiting for the next available human agent`
    });
  };
  
  const handleTakeOverConversation = (conversationId: string) => {
    setHumanAssignedConversations(
      humanAssignedConversations.map(conv => 
        conv.id === conversationId 
          ? {...conv, assignmentStatus: 'assigned_to_human', agent: 'Current User'} 
          : conv
      )
    );
    
    toast({
      title: "Conversation taken over",
      description: "You are now handling this conversation"
    });
  };

  return (
    <AppLayout showModuleName moduleName="Omnichannel Support">
      <div className="space-y-6">
        <OmnichannelHeader 
          onSettingsClick={() => setShowSettings(!showSettings)} 
        />
        
        {showSettings ? (
          <AIAssistantSettings onClose={() => setShowSettings(false)} />
        ) : (
          <>
            <OmnichannelDashboard />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <div className="border-b">
                <TabsList className="w-full max-w-md">
                  <TabsTrigger value="inbox" className="flex-1">Omnichannel Inbox</TabsTrigger>
                  <TabsTrigger value="human-inbox" className="flex-1">
                    Human Inbox
                    {humanAssignedConversations.length > 0 && (
                      <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {humanAssignedConversations.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="tickets" className="flex-1">Support Tickets</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="inbox" className="mt-6 h-[calc(100vh-26rem)]">
                <OmnichannelInboxTab onAssignToHuman={handleAssignToHuman} />
              </TabsContent>
              
              <TabsContent value="human-inbox" className="mt-6 h-[calc(100vh-26rem)]">
                <HumanAssignmentsTab 
                  conversations={humanAssignedConversations} 
                  onTakeOverConversation={handleTakeOverConversation}
                />
              </TabsContent>
              
              <TabsContent value="tickets" className="mt-6">
                <RecentTicketsTab tickets={mockTickets} onViewTicket={handleViewTicket} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default OmnichannelSupportPage;
