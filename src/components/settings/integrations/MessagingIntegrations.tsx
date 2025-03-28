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
  BrandTelegram, BrandSlack, BrandViber, BrandLine
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
    viber: false,
    line: false,
  });
  
  const [apiKeys, setApiKeys] = useState<{[key: string]: string}>({
    whatsapp: "",
    messenger: "",
    twitter: "",
    telegram: "",
    slack: "",
    twilio: "",
    viber: "",
    line: "",
  });

  const [emailConfig, setEmailConfig] = useState({
    host: "",
    port: "587",
    username: "",
    password: "",
    secure: false
  });

  const handleInputChange = (service: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [service]: value }));
  };

  const handleEmailConfigChange = (field: keyof typeof emailConfig, value: string | boolean) => {
    setEmailConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleConnect = (service: string) => {
    if (connected[service]) {
      toast({
        title: "Already Connected",
        description: `Your ${getServiceName(service)} is already connected.`,
      });
      return;
    }

    // For email, check SMTP configuration
    if (service === "email") {
      if (!emailConfig.host || !emailConfig.username || !emailConfig.password) {
        toast({
          title: "SMTP Configuration Required",
          description: `Please enter your SMTP server details.`,
          variant: "destructive",
        });
        return;
      }
    } 
    // For other services, check API key
    else if (!apiKeys[service]) {
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
    
    if (service === "email") {
      setEmailConfig({
        host: "",
        port: "587",
        username: "",
        password: "",
        secure: false
      });
    } else {
      setApiKeys(prev => ({ ...prev, [service]: "" }));
    }
    
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
      viber: "Viber",
      line: "LINE",
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
          {/* Special case for email - show SMTP fields */}
          {service === "email" ? (
            <div className="space-y-2">
              <Input
                placeholder="SMTP Server (e.g. smtp.gmail.com)"
                className="mb-2"
                value={emailConfig.host}
                onChange={(e) => handleEmailConfigChange('host', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Port (e.g. 587)"
                  value={emailConfig.port}
                  onChange={(e) => handleEmailConfigChange('port', e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="secure-connection" 
                    checked={emailConfig.secure}
                    onChange={(e) => handleEmailConfigChange('secure', e.target.checked)} 
                  />
                  <label htmlFor="secure-connection" className="text-xs">SSL/TLS</label>
                </div>
              </div>
              <Input
                placeholder="Username/Email"
                className="mb-2 mt-2"
                value={emailConfig.username}
                onChange={(e) => handleEmailConfigChange('username', e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="mb-3"
                value={emailConfig.password}
                onChange={(e) => handleEmailConfigChange('password', e.target.value)}
              />
            </div>
          ) : (
            // API key field for other services
            <Input
              placeholder={`${name} API Key`}
              className="mb-3"
              value={apiKeys[service]}
              onChange={(e) => handleInputChange(service, e.target.value)}
              type={service === "twilio" || service === "viber" || service === "line" ? "password" : "text"}
            />
          )}
          
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
        
        {/* Viber - New */}
        {renderMessagingCard(
          "viber",
          "Viber",
          "Connect Viber for business messaging",
          <BrandViber className="h-5 w-5 text-purple-600" />,
          "bg-purple-100",
          "text-purple-600"
        )}
        
        {/* LINE - New */}
        {renderMessagingCard(
          "line",
          "LINE",
          "Connect LINE for customer messaging",
          <BrandLine className="h-5 w-5 text-green-600" />,
          "bg-green-100",
          "text-green-600"
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
