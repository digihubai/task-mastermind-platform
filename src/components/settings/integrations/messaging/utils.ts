
import { useToast } from "@/hooks/use-toast";

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
  };
  return serviceNames[service] || service;
};

export const useMessagingService = () => {
  const { toast } = useToast();
  
  const simulateConnection = (
    service: string, 
    setConnecting: (service: string | null) => void,
    setConnected: (state: {[key: string]: boolean}) => void,
    connected: {[key: string]: boolean},
    onConnect?: (service: string) => void
  ) => {
    setConnecting(service);
    
    setTimeout(() => {
      setConnecting(null);
      setConnected({...connected, [service]: true});
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
    setConnected: (state: {[key: string]: boolean}) => void,
    connected: {[key: string]: boolean}
  ) => {
    setConnected({...connected, [service]: false});
    
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
