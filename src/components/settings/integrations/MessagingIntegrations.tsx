
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, Phone, Check, X, Loader2, Mail, 
  ArrowRight, MessageSquare
} from "lucide-react";
import { 
  BrandFacebook, BrandTwitter, BrandWhatsapp, 
  BrandTelegram, BrandSlack 
} from "@/components/ui/custom-icons";
import { IntegrationProps } from './types';

const MessagingIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<{[key: string]: boolean}>({
    whatsapp: false,
    messenger: false,
    twitter: false,
    telegram: false,
    slack: false,
    email: false,
    twilio: false,
  });
  
  const [apiKeys, setApiKeys] = useState<{[key: string]: string}>({
    whatsapp: "",
    messenger: "",
    twitter: "",
    telegram: "",
    slack: "",
    email: "",
    twilio: "",
  });

  const handleInputChange = (service: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [service]: value }));
  };

  const handleConnect = (service: string) => {
    if (connected[service]) {
      toast({
        title: "Already Connected",
        description: `Your ${getServiceName(service)} is already connected.`,
      });
      return;
    }

    if (!apiKeys[service]) {
      toast({
        title: "API Key Required",
        description: `Please enter your ${getServiceName(service)} API key or credentials.`,
        variant: "destructive",
      });
      return;
    }

    setConnecting(service);
    
    // Simulate connection process
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

  const handleDisconnect = (service: string) => {
    setConnected({...connected, [service]: false});
    setApiKeys(prev => ({ ...prev, [service]: "" }));
    toast({
      title: "Disconnected",
      description: `Your ${getServiceName(service)} account has been disconnected.`,
    });
  };

  const getServiceName = (service: string): string => {
    const serviceNames: {[key: string]: string} = {
      whatsapp: "WhatsApp Business",
      messenger: "Facebook Messenger",
      twitter: "Twitter",
      telegram: "Telegram",
      slack: "Slack",
      email: "Email",
      twilio: "Twilio",
    };
    return serviceNames[service] || service;
  };

  // Helper function to create Messaging integration cards
  const renderMessagingCard = (
    service: string, 
    name: string, 
    description: string, 
    icon: React.ReactNode,
    backgroundColor: string,
    textColor: string
  ) => (
    <Card className="p-5 border">
      <div className="flex items-center gap-3 mb-4">
        <div className={`${backgroundColor} p-2 rounded-full`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      
      {connected[service] ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Connected</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleDisconnect(service)}
          >
            <X className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      ) : (
        <>
          <Input
            placeholder={`${name} API Key`}
            className="mb-3"
            value={apiKeys[service]}
            onChange={(e) => handleInputChange(service, e.target.value)}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleConnect(service)}
            disabled={connecting === service}
          >
            {connecting === service ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                Connect <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Messaging Integrations</h2>
      <p className="text-sm text-muted-foreground">
        Connect your messaging platforms to automate customer communication
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* WhatsApp */}
        {renderMessagingCard(
          "whatsapp",
          "WhatsApp Business",
          "Connect your WhatsApp Business account",
          <BrandWhatsapp className="h-5 w-5 text-green-600" />,
          "bg-green-100",
          "text-green-600"
        )}
        
        {/* Facebook Messenger */}
        {renderMessagingCard(
          "messenger",
          "Facebook Messenger",
          "Connect your Messenger for customer chat",
          <BrandFacebook className="h-5 w-5 text-blue-600" />,
          "bg-blue-100",
          "text-blue-600"
        )}
        
        {/* Twitter */}
        {renderMessagingCard(
          "twitter",
          "Twitter",
          "Connect Twitter for direct messages",
          <BrandTwitter className="h-5 w-5 text-blue-600" />,
          "bg-blue-100",
          "text-blue-600"
        )}
        
        {/* Telegram */}
        {renderMessagingCard(
          "telegram",
          "Telegram",
          "Connect Telegram bot for customer service",
          <BrandTelegram className="h-5 w-5 text-blue-600" />,
          "bg-blue-100",
          "text-blue-600"
        )}
        
        {/* Slack */}
        {renderMessagingCard(
          "slack",
          "Slack",
          "Connect Slack for team notifications",
          <BrandSlack className="h-5 w-5 text-purple-600" />,
          "bg-purple-100",
          "text-purple-600"
        )}
        
        {/* Email */}
        {renderMessagingCard(
          "email",
          "Email Integration",
          "Connect email for support tickets",
          <Mail className="h-5 w-5 text-amber-600" />,
          "bg-amber-100",
          "text-amber-600"
        )}
        
        {/* Twilio */}
        {renderMessagingCard(
          "twilio",
          "Twilio",
          "Connect Twilio for SMS and voice calls",
          <Phone className="h-5 w-5 text-red-600" />,
          "bg-red-100",
          "text-red-600"
        )}
      </div>
    </div>
  );
};

export default MessagingIntegrations;
