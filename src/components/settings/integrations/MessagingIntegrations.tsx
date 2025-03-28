
import React, { useState, useEffect } from "react";
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
  activePlatform?: string | null;
}

const MessagingIntegrations: React.FC<MessagingIntegrationsProps> = ({ 
  onConnect,
  activePlatform 
}) => {
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

  // Scroll to and highlight the active platform if provided
  useEffect(() => {
    if (activePlatform) {
      // Find the element with a specific id or class that corresponds to the platform
      const platformElement = document.getElementById(`integration-${activePlatform}`);
      if (platformElement) {
        // Scroll to the element
        platformElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add a highlight class or style
        platformElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
        
        // Remove highlight after a few seconds
        setTimeout(() => {
          platformElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
        }, 3000);
      }
    }
  }, [activePlatform]);

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
              <div id="integration-livechat">
                <LiveChatIntegration
                  connected={connected.livechat}
                  connecting={connecting}
                  onConnect={handleConnect}
                  onDisconnect={() => handleDisconnect("livechat", setConnected, connected)}
                />
              </div>
              
              <div id="integration-whatsapp">
                <WhatsAppIntegration
                  connected={connected.whatsapp}
                  connecting={connecting}
                  onConnect={handleConnect}
                  onDisconnect={() => handleDisconnect("whatsapp", setConnected, connected)}
                />
              </div>
              
              <div id="integration-messenger">
                <MessengerIntegration
                  connected={connected.messenger}
                  connecting={connecting}
                  onConnect={handleConnect}
                  onDisconnect={() => handleDisconnect("messenger", setConnected, connected)}
                />
              </div>
              
              <div id="integration-sms">
                <SMSIntegration
                  connected={connected.sms}
                  connecting={connecting}
                  onConnect={handleConnect}
                  onDisconnect={() => handleDisconnect("sms", setConnected, connected)}
                />
              </div>
              
              <div id="integration-twilio">
                <TwilioIntegration
                  connected={connected.twilio}
                  connecting={connecting}
                  onConnect={handleConnect}
                  onDisconnect={() => handleDisconnect("twilio", setConnected, connected)}
                />
              </div>
              
              <div id="integration-viber">
                <ViberIntegration
                  connected={connected.viber}
                  connecting={connecting}
                  onConnect={handleConnect}
                  onDisconnect={() => handleDisconnect("viber", setConnected, connected)}
                />
              </div>
              
              <div id="integration-line">
                <LineIntegration
                  connected={connected.line}
                  connecting={connecting}
                  onConnect={handleConnect}
                  onDisconnect={() => handleDisconnect("line", setConnected, connected)}
                />
              </div>
              
              <div id="integration-instagram">
                <InstagramIntegration
                  connected={connected.instagram}
                  connecting={connecting}
                  onConnect={handleConnect}
                  onDisconnect={() => handleDisconnect("instagram", setConnected, connected)}
                />
              </div>
              
              <div id="integration-twitter">
                <TwitterIntegration
                  connected={connected.twitter}
                  connecting={connecting}
                  onConnect={handleConnect}
                  onDisconnect={() => handleDisconnect("twitter", setConnected, connected)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-6">
            <div id="integration-email">
              <EmailIntegration
                connected={connected.email}
                connecting={connecting}
                onConnect={handleConnect}
                onDisconnect={() => handleDisconnect("email", setConnected, connected)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default MessagingIntegrations;
