
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MessagingServiceCard from './MessagingServiceCard';
import { MessagingService } from './types';
import { BrandFacebook } from "@/components/ui/custom-icons";

interface MessengerIntegrationProps {
  connected: boolean;
  connecting: string | null;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

const MessengerIntegration: React.FC<MessengerIntegrationProps> = ({
  connected,
  connecting,
  onConnect,
  onDisconnect
}) => {
  const messengerService: MessagingService = {
    id: "messenger",
    name: "Facebook Messenger",
    description: "Connect your Facebook page",
    icon: <BrandFacebook className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    backgroundColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
    connected
  };

  return (
    <MessagingServiceCard
      service={messengerService}
      connecting={connecting}
      onConnect={() => onConnect("messenger")}
      onDisconnect={() => onDisconnect("messenger")}
    >
      <div className="space-y-3 mb-4">
        <div>
          <Label htmlFor="fb-page-id">Facebook Page ID</Label>
          <Input id="fb-page-id" placeholder="Enter your Facebook page ID" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="fb-app-id">App ID</Label>
          <Input id="fb-app-id" placeholder="Enter your Facebook app ID" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="fb-app-secret">App Secret</Label>
          <Input id="fb-app-secret" type="password" placeholder="Enter your app secret" className="mt-1" />
        </div>
      </div>
    </MessagingServiceCard>
  );
};

export default MessengerIntegration;
