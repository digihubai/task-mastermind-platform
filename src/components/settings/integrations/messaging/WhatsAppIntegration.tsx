
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import MessagingServiceCard from './MessagingServiceCard';
import { MessagingService } from './types';
import { BrandWhatsapp } from "@/components/ui/custom-icons";

interface WhatsAppIntegrationProps {
  connected: boolean;
  connecting: string | null;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

const WhatsAppIntegration: React.FC<WhatsAppIntegrationProps> = ({
  connected,
  connecting,
  onConnect,
  onDisconnect
}) => {
  const whatsappService: MessagingService = {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Connect your WhatsApp Business account",
    icon: <BrandWhatsapp className="h-5 w-5 text-green-600 dark:text-green-400" />,
    backgroundColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
    connected
  };

  return (
    <MessagingServiceCard
      service={whatsappService}
      connecting={connecting}
      onConnect={() => onConnect("whatsapp")}
      onDisconnect={() => onDisconnect("whatsapp")}
    >
      <div className="space-y-3 mb-4">
        <div>
          <Label htmlFor="whatsapp-phone">Business Phone Number</Label>
          <Input id="whatsapp-phone" placeholder="+1234567890" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="whatsapp-id">Business Account ID</Label>
          <Input id="whatsapp-id" placeholder="Enter your WhatsApp Business ID" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="whatsapp-token">Access Token</Label>
          <Input id="whatsapp-token" type="password" placeholder="Enter your access token" className="mt-1" />
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={() => window.open("https://business.facebook.com/", "_blank")}
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Meta Dashboard
      </Button>
    </MessagingServiceCard>
  );
};

export default WhatsAppIntegration;
