
import { useState } from 'react';
import { Conversation } from '@/types/omnichannel';
import { toast } from '@/hooks/use-toast';

interface UseConversationManagementProps {
  initialConversations: Conversation[];
  onAssignToHuman?: (assignedConversation: Conversation) => void;
}

export const useConversationManagement = ({ 
  initialConversations,
  onAssignToHuman 
}: UseConversationManagementProps) => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("1");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false);
  const [newConversation, setNewConversation] = useState({
    name: '',
    email: '',
    message: '',
    channel: 'email'
  });

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
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

  const handleNewConversation = () => {
    setNewConversation({
      name: '',
      email: '',
      message: '',
      channel: 'email'
    });
    setIsNewConversationDialogOpen(true);
  };

  const handleNewConversationChange = (changes: Partial<typeof newConversation>) => {
    setNewConversation(prev => ({ ...prev, ...changes }));
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
      assignmentStatus: 'ai',
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
    const availableAgent = conversations.find(
      agent => agent.status === "online" && agent.id.startsWith("agent")
    );
    
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

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', message);
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };

  return {
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
    selectedConversation: conversations.find(c => c.id === selectedConversationId)
  };
};
