
import React, { useState } from 'react';
import ConversationSidebar from './conversation-list/ConversationSidebar';
import ConversationDetail from './conversation-detail/ConversationDetail';
import CustomerProfileDrawer from './customer-profile/CustomerProfileDrawer';
import { mockConversations, mockMessages } from './mock-data';
import { Conversation, CustomerProfile } from '@/types/omnichannel';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { InfoIcon, Plus } from 'lucide-react';
import { useConversationManagement } from '@/hooks/use-conversation-management';
import NewConversationDialog from './conversation-dialog/NewConversationDialog';

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

interface OmnichannelInboxProps {
  onAssignToHuman?: (assignedConversation: Conversation) => void;
}

// Main OmnichannelInbox component that composes all the smaller components
const OmnichannelInbox: React.FC<OmnichannelInboxProps> = ({ onAssignToHuman }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const {
    conversations,
    selectedConversationId,
    isProfileOpen,
    isNewConversationDialogOpen,
    newConversation,
    handleSelectConversation,
    handleViewCustomerProfile,
    setIsProfileOpen,
    handleNewConversation,
    handleNewConversationChange,
    handleCreateNewConversation,
    handleAssignToHuman,
    handleSendMessage,
    setIsNewConversationDialogOpen,
    selectedConversation
  } = useConversationManagement({
    initialConversations: mockConversations,
    onAssignToHuman
  });
  
  const selectedCustomerProfile = selectedConversationId ? 
    mockCustomerProfiles[selectedConversationId] || null : null;

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
            onSelectConversation={handleSelectConversation}
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
      <NewConversationDialog
        open={isNewConversationDialogOpen}
        onOpenChange={setIsNewConversationDialogOpen}
        formData={newConversation}
        onFormDataChange={handleNewConversationChange}
        onCreateConversation={handleCreateNewConversation}
      />
    </div>
  );
};

export default OmnichannelInbox;
