
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mail, MessageCircle } from "lucide-react";
import EmailIntegration from "@/components/settings/integrations/messaging/EmailIntegration";
import TwilioIntegration from "@/components/settings/integrations/messaging/TwilioIntegration";
import WhatsAppIntegration from "@/components/settings/integrations/messaging/WhatsAppIntegration";
import MessengerIntegration from "@/components/settings/integrations/messaging/MessengerIntegration";
import SMSIntegration from "@/components/settings/integrations/messaging/SMSIntegration";
import ViberIntegration from "@/components/settings/integrations/messaging/ViberIntegration";
import LineIntegration from "@/components/settings/integrations/messaging/LineIntegration";
import InstagramIntegration from "@/components/settings/integrations/messaging/InstagramIntegration";
import TwitterIntegration from "@/components/settings/integrations/messaging/TwitterIntegration";
import LiveChatIntegration from "@/components/settings/integrations/messaging/LiveChatIntegration";
import { useMessagingService } from "@/components/settings/integrations/messaging/utils";

interface MessagingIntegrationsProps {
  onConnect?: (service: string) => void;
}

const MessagingIntegrations: React.FC<MessagingIntegrationsProps> = ({ onConnect }) => {
  const [activeTab, setActiveTab] = useState("messaging");
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<Record<string, boolean>>({
    whatsapp: false,
    messenger: false,
    twitter: false,
    telegram: false,
    slack: false,
    email: false,
    twilio: false,
    viber: false,
    line: false,
    livechat: true,
    instagram: false,
    sms: false
  });

  const { simulateConnection, handleDisconnect } = useMessagingService();

  const handleConnect = (service: string) => {
    simulateConnection(service, setConnecting, setConnected, connected, onConnect);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-2xl font-semibold mb-6">Communication Integrations</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="messaging" className="flex items-center">
              <MessageCircle className="mr-2 h-4 w-4" />
              Messaging Platforms
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messaging" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <LiveChatIntegration
                connected={connected.livechat}
                connecting={connecting}
                onConnect={handleConnect}
                onDisconnect={() => handleDisconnect("livechat", setConnected, connected)}
              />
              
              <WhatsAppIntegration
                connected={connected.whatsapp}
                connecting={connecting}
                onConnect={handleConnect}
                onDisconnect={() => handleDisconnect("whatsapp", setConnected, connected)}
              />
              
              <MessengerIntegration
                connected={connected.messenger}
                connecting={connecting}
                onConnect={handleConnect}
                onDisconnect={() => handleDisconnect("messenger", setConnected, connected)}
              />
              
              <SMSIntegration
                connected={connected.sms}
                connecting={connecting}
                onConnect={handleConnect}
                onDisconnect={() => handleDisconnect("sms", setConnected, connected)}
              />
              
              <TwilioIntegration
                connected={connected.twilio}
                connecting={connecting}
                onConnect={handleConnect}
                onDisconnect={() => handleDisconnect("twilio", setConnected, connected)}
              />
              
              <ViberIntegration
                connected={connected.viber}
                connecting={connecting}
                onConnect={handleConnect}
                onDisconnect={() => handleDisconnect("viber", setConnected, connected)}
              />
              
              <LineIntegration
                connected={connected.line}
                connecting={connecting}
                onConnect={handleConnect}
                onDisconnect={() => handleDisconnect("line", setConnected, connected)}
              />
              
              <InstagramIntegration
                connected={connected.instagram}
                connecting={connecting}
                onConnect={handleConnect}
                onDisconnect={() => handleDisconnect("instagram", setConnected, connected)}
              />
              
              <TwitterIntegration
                connected={connected.twitter}
                connecting={connecting}
                onConnect={handleConnect}
                onDisconnect={() => handleDisconnect("twitter", setConnected, connected)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-6">
            <EmailIntegration
              connected={connected.email}
              connecting={connecting}
              onConnect={handleConnect}
              onDisconnect={() => handleDisconnect("email", setConnected, connected)}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default MessagingIntegrations;
