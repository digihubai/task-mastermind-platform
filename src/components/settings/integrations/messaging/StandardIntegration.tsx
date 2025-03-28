
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import MessagingServiceCard from './MessagingServiceCard';
import { useToast } from "@/hooks/use-toast";
import { MessagingServiceProps } from './types';
import { getServiceName, useMessagingService } from './utils';

interface StandardIntegrationProps extends MessagingServiceProps {
  serviceId: string;
  serviceName: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
  textColor: string;
  isPasswordField?: boolean;
}

const StandardIntegration: React.FC<StandardIntegrationProps> = ({
  serviceId,
  serviceName,
  description,
  icon,
  backgroundColor,
  textColor,
  isPasswordField = false,
  onConnect,
  onDisconnect
}) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string>("");
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<{[key: string]: boolean}>({ [serviceId]: false });
  const { simulateConnection, handleDisconnect } = useMessagingService();

  const handleInputChange = (value: string) => {
    setApiKey(value);
  };

  const handleConnect = () => {
    if (connected[serviceId]) {
      toast({
        title: "Already Connected",
        description: `Your ${getServiceName(serviceId)} is already connected.`,
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: `Please enter your ${getServiceName(serviceId)} API key or credentials.`,
        variant: "destructive",
      });
      return;
    }

    simulateConnection(
      serviceId, 
      setConnecting, 
      setConnected, 
      connected, 
      onConnect
    );
  };

  const handleServiceDisconnect = () => {
    handleDisconnect(serviceId, setConnected, connected);
    setApiKey("");
    
    if (onDisconnect) {
      onDisconnect(serviceId);
    }
  };

  const service = {
    id: serviceId,
    name: serviceName,
    description: description,
    icon: icon,
    backgroundColor: backgroundColor,
    textColor: textColor,
    connected: connected[serviceId]
  };

  return (
    <MessagingServiceCard 
      service={service}
      connecting={connecting}
      onConnect={handleConnect}
      onDisconnect={handleServiceDisconnect}
    >
      <Input
        placeholder={`${serviceName} API Key`}
        className="mb-3"
        value={apiKey}
        onChange={(e) => handleInputChange(e.target.value)}
        type={isPasswordField ? "password" : "text"}
      />
    </MessagingServiceCard>
  );
};

export default StandardIntegration;
