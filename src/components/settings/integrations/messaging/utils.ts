
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const getServiceName = (serviceId: string): string => {
  const serviceNames: Record<string, string> = {
    email: "Email",
    twilio: "Twilio",
    whatsapp: "WhatsApp",
    messenger: "Facebook Messenger",
    sms: "SMS",
    viber: "Viber",
    line: "LINE",
    livechat: "Live Chat",
    instagram: "Instagram",
    twitter: "Twitter/X"
  };
  
  return serviceNames[serviceId] || serviceId;
};

export const useMessagingService = () => {
  const { toast } = useToast();
  
  const simulateConnection = (
    serviceId: string, 
    setConnecting: React.Dispatch<React.SetStateAction<string | null>>, 
    setConnected: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, 
    currentConnected: Record<string, boolean>,
    onConnect?: (service: string) => void
  ) => {
    // Start loading
    setConnecting(serviceId);
    
    // Simulate API call
    setTimeout(() => {
      setConnecting(null);
      
      // Update connected state
      setConnected(prevState => ({
        ...prevState,
        [serviceId]: true
      }));
      
      // Show success message
      toast({
        title: "Connection successful",
        description: `${getServiceName(serviceId)} has been connected successfully.`,
      });
      
      // Call the onConnect callback if provided
      if (onConnect) {
        onConnect(serviceId);
      }
    }, 1500);
  };

  const handleDisconnect = (
    serviceId: string, 
    setConnected: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, 
    currentConnected: Record<string, boolean>
  ) => {
    setConnected(prevState => ({
      ...prevState,
      [serviceId]: false
    }));
    
    toast({
      title: "Disconnected",
      description: `${getServiceName(serviceId)} has been disconnected.`,
    });
  };

  return {
    simulateConnection,
    handleDisconnect
  };
};
