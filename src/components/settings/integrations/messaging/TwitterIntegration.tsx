
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MessagingServiceCard from './MessagingServiceCard';
import { MessagingService } from './types';
import { Twitter } from "lucide-react";

interface TwitterIntegrationProps {
  connected: boolean;
  connecting: string | null;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

const TwitterIntegration: React.FC<TwitterIntegrationProps> = ({
  connected,
  connecting,
  onConnect,
  onDisconnect
}) => {
  const twitterService: MessagingService = {
    id: "twitter",
    name: "Twitter/X",
    description: "Connect Twitter/X for direct messages",
    icon: <Twitter className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    backgroundColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
    connected
  };

  return (
    <MessagingServiceCard
      service={twitterService}
      connecting={connecting}
      onConnect={() => onConnect("twitter")}
      onDisconnect={() => onDisconnect("twitter")}
    >
      <div className="space-y-3 mb-4">
        <div>
          <Label htmlFor="twitter-api-key">API Key</Label>
          <Input id="twitter-api-key" placeholder="Enter your API key" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="twitter-api-secret">API Secret</Label>
          <Input id="twitter-api-secret" type="password" placeholder="Enter your API secret" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="twitter-bearer-token">Bearer Token</Label>
          <Input id="twitter-bearer-token" type="password" placeholder="Enter your bearer token" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="twitter-access-token">Access Token</Label>
          <Input id="twitter-access-token" type="password" placeholder="Enter your access token" className="mt-1" />
        </div>
      </div>
    </MessagingServiceCard>
  );
};

export default TwitterIntegration;
