
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MessagingServiceCard from './MessagingServiceCard';
import { MessagingService } from './types';
import { Instagram } from "lucide-react";

interface InstagramIntegrationProps {
  connected: boolean;
  connecting: string | null;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

const InstagramIntegration: React.FC<InstagramIntegrationProps> = ({
  connected,
  connecting,
  onConnect,
  onDisconnect
}) => {
  const instagramService: MessagingService = {
    id: "instagram",
    name: "Instagram Direct",
    description: "Connect Instagram business account",
    icon: <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-400" />,
    backgroundColor: "bg-pink-50 dark:bg-pink-900/20",
    textColor: "text-pink-600 dark:text-pink-400",
    connected
  };

  return (
    <MessagingServiceCard
      service={instagramService}
      connecting={connecting}
      onConnect={() => onConnect("instagram")}
      onDisconnect={() => onDisconnect("instagram")}
    >
      <div className="space-y-3 mb-4">
        <div>
          <Label htmlFor="ig-page-id">Facebook Page ID</Label>
          <Input id="ig-page-id" placeholder="Connect through Facebook integration" className="mt-1" disabled />
          <p className="text-xs text-muted-foreground mt-1">Connect Facebook Messenger first to enable Instagram integration</p>
        </div>
      </div>
    </MessagingServiceCard>
  );
};

export default InstagramIntegration;
