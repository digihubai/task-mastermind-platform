
import React, { useState, useEffect } from 'react';
import ConversationSidebar from './conversation-list/ConversationSidebar';
import ConversationDetail from './conversation-detail/ConversationDetail';
import CustomerProfileDrawer from './customer-profile/CustomerProfileDrawer';
import { mockConversations, mockMessages } from './mock-data';
import { toast } from "@/hooks/use-toast";
import { Conversation, CustomerProfile } from '@/types/omnichannel';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { InfoIcon, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OmnichannelInboxProps {
  onAssignToHuman?: (assignedConversation: Conversation) => void;
}

// Sample customer profiles data matching our conversations
const mockCustomerProfiles: Record<string, CustomerProfile> = {
  "1": {
    id: "cust-001",
    name: "Olivia Brown",
    email: "olivia@gmail.com",
    type: "User",
    createdAt: "01/14/20",
    lastActivity: "02/25/20",
    browser: "Opera",
    language: "EN",
    company: "SCHIOCCO LTD",
    currency: "USD",
    currentUrl: "demo.board.support",
    ip: "190.160.130.226",
    location: "San Francisco, United States",
    os: "Linux",
    phone: "02333666970",
    timezone: "America/Los_Angeles",
    conversationId: "478",
    userId: "387"
  },
  "2": {
    id: "cust-002",
    name: "John Davis",
    email: "john.davis@example.com",
    type: "User",
    createdAt: "02/20/20",
    lastActivity: "03/15/20",
    browser: "Chrome",
    language: "EN",
    company: "ABC Corp",
    currency: "EUR",
    currentUrl: "example.com/pricing",
    ip: "188.124.77.12",
    location: "London, United Kingdom",
    os: "Windows",
    phone: "4455667788",
    timezone: "Europe/London",
    conversationId: "479",
    userId: "388"
  },
  // Add more profiles to match all conversations
};

// Main OmnichannelInbox component that composes all the smaller components
const OmnichannelInbox: React.FC<OmnichannelInboxProps> = ({ onAssignToHuman }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("1");
  const [filterStatus, setFilterStatus] = useState("all");
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false);
  const [newConversation, setNewConversation] = useState({
    name: '',
    email: '',
    message: '',
    channel: 'email'
  });
  
  const [availableHumanAgents] = useState([
    { id: "agent1", name: "John Smith", status: "online" },
    { id: "agent2", name: "Sarah Wilson", status: "online" },
    { id: "agent3", name: "Mike Johnson", status: "away" },
  ]);
  
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', message);
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };

  const handleViewCustomerProfile = () => {
    if (selectedConversationId) {
      setIsProfileOpen(true);
    } else {
      toast({
        title: "No conversation selected",
        description: "Please select a conversation to view customer details",
        variant: "destructive"
      });
    }
  };

  const handleAssignToHuman = () => {
    // Check if we have a selected conversation
    if (!selectedConversationId) {
      toast({
        title: "Error",
        description: "No conversation selected to assign",
        variant: "destructive"
      });
      return;
    }

    // Find an available human agent
    const availableAgent = availableHumanAgents.find(agent => agent.status === "online");
    
    // Update conversation status
    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === selectedConversationId) {
        const updatedConversation: Conversation = {
          ...conversation,
          assignmentStatus: 'waiting_for_human',
          assignedToHumanAt: new Date().toISOString(),
          assignedHumanAgent: availableAgent ? availableAgent.name : undefined,
          agent: availableAgent ? availableAgent.name : 'Waiting for human',
          status: 'waiting',
        };
        
        // Call the parent component's onAssignToHuman with the updated conversation
        if (onAssignToHuman) {
          onAssignToHuman(updatedConversation);
        }
        
        return updatedConversation;
      }
      return conversation;
    });
    
    setConversations(updatedConversations);
    
    toast({
      title: availableAgent ? "Assigned to human agent" : "Added to human queue",
      description: availableAgent 
        ? `The conversation has been assigned to ${availableAgent.name}`
        : "The conversation is waiting for the next available human agent",
    });
  };

  const handleNewConversation = () => {
    // Reset form and open dialog
    setNewConversation({
      name: '',
      email: '',
      message: '',
      channel: 'email'
    });
    setIsNewConversationDialogOpen(true);
  };

  const handleCreateNewConversation = () => {
    // Validate inputs
    if (!newConversation.name || !newConversation.email || !newConversation.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Create new conversation
    const newConversationObj: Conversation = {
      id: `new-${Date.now()}`,
      name: newConversation.name,
      message: newConversation.message,
      channel: newConversation.channel,
      time: new Date().toISOString(),
      unread: false,
      status: 'active',
      priority: 'medium',
      assignmentStatus: 'ai', // Changed from 'ai_handling' to 'ai' to match the allowed types
      agent: 'AI Assistant',
      customerId: `new-cust-${Date.now()}`,
    };

    // Add to conversations list
    setConversations([newConversationObj, ...conversations]);
    
    // Select the new conversation
    setSelectedConversationId(newConversationObj.id);
    
    // Close dialog
    setIsNewConversationDialogOpen(false);
    
    toast({
      title: "Conversation created",
      description: `New conversation with ${newConversation.name} has been created`
    });

    console.log('Creating new conversation');
  };

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);
  const selectedCustomerProfile = selectedConversationId ? mockCustomerProfiles[selectedConversationId] || null : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Omnichannel Inbox</h2>
        <Button onClick={handleNewConversation} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          New Conversation
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-400px)]">
        {/* Conversation Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
          <ConversationSidebar
            conversations={conversations}
            filterStatus={filterStatus}
            activeTab={activeTab}
            selectedConversationId={selectedConversationId}
            onTabChange={setActiveTab}
            onFilterChange={setFilterStatus}
            onSelectConversation={setSelectedConversationId}
          />
        </div>
        
        {/* Conversation Detail */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-4">
          {selectedConversation?.assignmentStatus === 'waiting_for_human' && (
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                This conversation is waiting for a human agent to take over.
                {selectedConversation.assignedHumanAgent && (
                  <span className="font-medium"> Assigned to {selectedConversation.assignedHumanAgent}.</span>
                )}
              </AlertDescription>
            </Alert>
          )}
          
          <ConversationDetail
            selectedConversation={selectedConversation}
            messages={mockMessages}
            onSendMessage={handleSendMessage}
            onAssignToHuman={handleAssignToHuman}
            onViewProfile={handleViewCustomerProfile}
          />
        </div>
      </div>

      {/* Customer Profile Drawer */}
      <CustomerProfileDrawer 
        open={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        customerProfile={selectedCustomerProfile}
      />

      {/* New Conversation Dialog */}
      <Dialog open={isNewConversationDialogOpen} onOpenChange={setIsNewConversationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Conversation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Customer Name</label>
              <Input
                id="name"
                value={newConversation.name}
                onChange={(e) => setNewConversation({...newConversation, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={newConversation.email}
                onChange={(e) => setNewConversation({...newConversation, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="channel" className="text-sm font-medium">Channel</label>
              <Select
                value={newConversation.channel}
                onValueChange={(value) => setNewConversation({...newConversation, channel: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="chat">Web Chat</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Initial Message</label>
              <textarea
                id="message"
                className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                value={newConversation.message}
                onChange={(e) => setNewConversation({...newConversation, message: e.target.value})}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setIsNewConversationDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateNewConversation}>
                Create Conversation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OmnichannelInbox;
