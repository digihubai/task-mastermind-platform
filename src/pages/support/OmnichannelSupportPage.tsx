import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OmnichannelInbox from '@/components/communication/OmnichannelInbox';
import SupportStats from '@/components/support/SupportStats';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Users, UserCog } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { TicketList } from '@/components/support/TicketList';
import { SupportTicket } from '@/types/support';
import { toast } from "@/hooks/use-toast";
import AIAssistantSettings from '@/components/support/AIAssistantSettings';
import { mockConversations } from '@/components/communication/mock-data';
import { Conversation } from '@/types/omnichannel';
import { Badge } from "@/components/ui/badge";
import IntegrationStatus from '@/components/communication/IntegrationStatus';

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

  const handleNewTicket = () => {
    navigate('/support/tickets', { state: { showNewTicketForm: true } });
    toast({
      title: "New ticket form",
      description: "Create a new support ticket"
    });
  };

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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Omnichannel Support</h1>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="mr-2 h-4 w-4" />
              AI Settings
            </Button>
            <Button variant="outline" onClick={() => navigate('/support/tickets')}>
              <Users className="mr-2 h-4 w-4" />
              All Tickets
            </Button>
            <Button onClick={handleNewTicket}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        </div>
        
        {showSettings ? (
          <AIAssistantSettings onClose={() => setShowSettings(false)} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <SupportStats />
              </div>
              <div className="md:col-span-1">
                <IntegrationStatus />
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
                <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="inbox" className="mt-6 h-[calc(100vh-26rem)]">
                <OmnichannelInbox onAssignToHuman={handleAssignToHuman} />
              </TabsContent>
              
              <TabsContent value="human-inbox" className="mt-6 h-[calc(100vh-26rem)]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserCog className="h-5 w-5 mr-2" />
                      Human Agent Assignments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {humanAssignedConversations.length > 0 ? (
                      <div className="space-y-4">
                        {humanAssignedConversations.map(conv => (
                          <Card key={conv.id} className={`p-4 border-l-4 ${
                            conv.assignmentStatus === 'assigned_to_human' 
                              ? 'border-l-green-500' 
                              : 'border-l-amber-500'
                          }`}>
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <div>
                                  <h3 className="font-medium flex items-center gap-2">
                                    {conv.name}
                                    <Badge variant="outline" className="text-xs">
                                      {conv.channel}
                                    </Badge>
                                  </h3>
                                  <p className="text-sm text-muted-foreground">{conv.message}</p>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 items-center">
                                  {conv.assignmentStatus === 'waiting_for_human' ? (
                                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-800">
                                      Waiting for human
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-800">
                                      Assigned to {conv.assignedHumanAgent || 'human'}
                                    </Badge>
                                  )}
                                  
                                  {conv.assignedHumanAgent && (
                                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-md">
                                      Agent: <span className="font-medium">{conv.assignedHumanAgent}</span>
                                    </span>
                                  )}
                                  
                                  {conv.assignedToHumanAt && (
                                    <span className="text-xs text-slate-500">
                                      Assigned {new Date(conv.assignedToHumanAt).toLocaleTimeString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <div>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleTakeOverConversation(conv.id)}
                                  disabled={conv.assignmentStatus === 'assigned_to_human' && conv.assignedHumanAgent === 'Current User'}
                                >
                                  {conv.assignmentStatus === 'assigned_to_human' && conv.assignedHumanAgent === 'Current User'
                                    ? 'Currently Handling'
                                    : 'Take Over'}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <UserCog className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p>No conversations currently assigned to human agents</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default OmnichannelSupportPage;
