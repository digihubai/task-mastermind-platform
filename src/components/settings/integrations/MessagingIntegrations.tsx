
import React from 'react';
import { 
  BrandFacebook, BrandTwitter, BrandWhatsapp, 
  BrandTelegram, BrandSlack, BrandViber, BrandLine
} from "@/components/ui/custom-icons";
import { IntegrationProps } from './types';
import EmailIntegration from './messaging/EmailIntegration';
import TwilioIntegration from './messaging/TwilioIntegration';
import StandardIntegration from './messaging/StandardIntegration';

const MessagingIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  // Track when a messaging platform is connected
  const handleMessagingConnect = (platformId: string) => {
    console.log(`Messaging platform connected: ${platformId}`);
    
    // If Twilio is connected, we could redirect to the phone numbers page
    if (platformId === 'twilio') {
      console.log('Twilio connected - phone number management is available');
      // This could be expanded to show a notification or change UI state
    }
    
    // Pass the connection event to the parent component if needed
    if (onConnect) {
      onConnect(platformId);
    }
  };
  
  const handleDisconnect = (platformId: string) => {
    console.log(`Messaging platform disconnected: ${platformId}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Messaging Integrations</h2>
      <p className="text-sm text-muted-foreground">
        Connect your messaging platforms to automate customer communication
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* WhatsApp */}
        <StandardIntegration 
          serviceId="whatsapp"
          serviceName="WhatsApp Business"
          description="Connect your WhatsApp Business account"
          icon={<BrandWhatsapp className="h-5 w-5 text-green-600" />}
          backgroundColor="bg-green-100"
          textColor="text-green-600"
          onConnect={handleMessagingConnect}
          onDisconnect={handleDisconnect}
        />
        
        {/* Facebook Messenger */}
        <StandardIntegration 
          serviceId="messenger"
          serviceName="Facebook Messenger"
          description="Connect your Messenger for customer chat"
          icon={<BrandFacebook className="h-5 w-5 text-blue-600" />}
          backgroundColor="bg-blue-100"
          textColor="text-blue-600"
          onConnect={handleMessagingConnect}
          onDisconnect={handleDisconnect}
        />
        
        {/* Twitter */}
        <StandardIntegration 
          serviceId="twitter"
          serviceName="Twitter"
          description="Connect Twitter for direct messages"
          icon={<BrandTwitter className="h-5 w-5 text-blue-600" />}
          backgroundColor="bg-blue-100"
          textColor="text-blue-600"
          onConnect={handleMessagingConnect}
          onDisconnect={handleDisconnect}
        />
        
        {/* Viber */}
        <StandardIntegration 
          serviceId="viber"
          serviceName="Viber"
          description="Connect Viber for business messaging"
          icon={<BrandViber className="h-5 w-5 text-purple-600" />}
          backgroundColor="bg-purple-100"
          textColor="text-purple-600"
          isPasswordField={true}
          onConnect={handleMessagingConnect}
          onDisconnect={handleDisconnect}
        />
        
        {/* LINE */}
        <StandardIntegration 
          serviceId="line"
          serviceName="LINE"
          description="Connect LINE for customer messaging"
          icon={<BrandLine className="h-5 w-5 text-green-600" />}
          backgroundColor="bg-green-100"
          textColor="text-green-600"
          isPasswordField={true}
          onConnect={handleMessagingConnect}
          onDisconnect={handleDisconnect}
        />
        
        {/* Telegram */}
        <StandardIntegration 
          serviceId="telegram"
          serviceName="Telegram"
          description="Connect Telegram bot for customer service"
          icon={<BrandTelegram className="h-5 w-5 text-blue-600" />}
          backgroundColor="bg-blue-100"
          textColor="text-blue-600"
          onConnect={handleMessagingConnect}
          onDisconnect={handleDisconnect}
        />
        
        {/* Slack */}
        <StandardIntegration 
          serviceId="slack"
          serviceName="Slack"
          description="Connect Slack for team notifications"
          icon={<BrandSlack className="h-5 w-5 text-purple-600" />}
          backgroundColor="bg-purple-100"
          textColor="text-purple-600"
          onConnect={handleMessagingConnect}
          onDisconnect={handleDisconnect}
        />
        
        {/* Email */}
        <EmailIntegration 
          onConnect={handleMessagingConnect}
          onDisconnect={handleDisconnect}
        />
        
        {/* Twilio */}
        <TwilioIntegration 
          onConnect={handleMessagingConnect}
          onDisconnect={handleDisconnect}
        />
      </div>
    </div>
  );
};

export default MessagingIntegrations;
