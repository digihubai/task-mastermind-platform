
import React, { useState } from 'react';
import ConversationSidebar from './conversation-list/ConversationSidebar';
import ConversationDetail from './conversation-detail/ConversationDetail';
import { mockConversations, mockMessages } from './mockData';
import { toast } from "@/hooks/use-toast";

interface OmnichannelInboxProps {
  onAssignToHuman?: () => void;
}

// Main OmnichannelInbox component that composes all the smaller components
const OmnichannelInbox: React.FC<OmnichannelInboxProps> = ({ onAssignToHuman }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("1");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', message);
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };

  const handleAssignToHuman = () => {
    // Logic to assign conversation to human agent
    console.log('Assigning conversation to human agent');
    
    if (onAssignToHuman) {
      onAssignToHuman();
    } else {
      toast({
        title: "Assigned to human agent",
        description: "The conversation has been assigned to the next available human agent",
      });
    }
  };

  const selectedConversation = mockConversations.find(c => c.id === selectedConversationId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-400px)]">
      {/* Conversation Sidebar */}
      <div className="md:col-span-4 lg:col-span-3">
        <ConversationSidebar
          conversations={mockConversations}
          filterStatus={filterStatus}
          activeTab={activeTab}
          selectedConversationId={selectedConversationId}
          onTabChange={setActiveTab}
          onFilterChange={setFilterStatus}
          onSelectConversation={setSelectedConversationId}
        />
      </div>
      
      {/* Conversation Detail */}
      <div className="md:col-span-8 lg:col-span-9">
        <ConversationDetail
          selectedConversation={selectedConversation}
          messages={mockMessages}
          onSendMessage={handleSendMessage}
          onAssignToHuman={handleAssignToHuman}
        />
      </div>
    </div>
  );
};

export default OmnichannelInbox;
