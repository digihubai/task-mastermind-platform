
import { useToast } from "@/hooks/use-toast";
import { Dispatch, SetStateAction } from "react";

export const getServiceName = (service: string): string => {
  const serviceNames: {[key: string]: string} = {
    whatsapp: "WhatsApp Business",
    messenger: "Facebook Messenger",
    twitter: "Twitter",
    telegram: "Telegram",
    slack: "Slack",
    email: "Email",
    twilio: "Twilio",
    viber: "Viber",
    line: "LINE",
    livechat: "Live Chat",
    instagram: "Instagram",
    sms: "SMS"
  };
  return serviceNames[service] || service;
};

export const useMessagingService = () => {
  const { toast } = useToast();
  
  const simulateConnection = (
    service: string, 
    setConnecting: Dispatch<SetStateAction<string | null>>,
    setConnected: Dispatch<SetStateAction<Record<string, boolean>>>,
    connected: Record<string, boolean>,
    onConnect?: (service: string) => void
  ) => {
    setConnecting(service);
    
    setTimeout(() => {
      setConnecting(null);
      setConnected(prev => ({...prev, [service]: true}));
      toast({
        title: "Connection Successful",
        description: `Your ${getServiceName(service)} account has been connected successfully.`,
      });
      
      if (onConnect) {
        onConnect(service);
      }
    }, 1500);
  };
  
  const handleDisconnect = (
    service: string,
    setConnected: Dispatch<SetStateAction<Record<string, boolean>>>,
    connected: Record<string, boolean>
  ) => {
    setConnected(prev => ({...prev, [service]: false}));
    
    toast({
      title: "Disconnected",
      description: `Your ${getServiceName(service)} account has been disconnected.`,
    });
  };
  
  return {
    simulateConnection,
    handleDisconnect
  };
};
