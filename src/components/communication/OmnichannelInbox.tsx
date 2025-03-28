
import React, { useState } from 'react';
import ConversationSidebar from './conversation-list/ConversationSidebar';
import ConversationDetail from './conversation-detail/ConversationDetail';
import { mockConversations, mockMessages } from './mockData';
import { toast } from "@/hooks/use-toast";
import { Conversation } from '@/types/omnichannel';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

interface OmnichannelInboxProps {
  onAssignToHuman?: () => void;
}

// Main OmnichannelInbox component that composes all the smaller components
const OmnichannelInbox: React.FC<OmnichannelInboxProps> = ({ onAssignToHuman }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("1");
  const [filterStatus, setFilterStatus] = useState("all");
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
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
        return {
          ...conversation,
          assignmentStatus: 'waiting_for_human',
          assignedToHumanAt: new Date().toISOString(),
          assignedHumanAgent: availableAgent ? availableAgent.name : undefined,
          agent: availableAgent ? availableAgent.name : 'Waiting for human',
          status: 'waiting',
        };
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
    
    if (onAssignToHuman) {
      onAssignToHuman();
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
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
        />
      </div>
    </div>
  );
};

export default OmnichannelInbox;
