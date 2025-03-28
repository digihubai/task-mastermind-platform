
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ExternalLink } from "lucide-react";
import MessagingServiceCard from './MessagingServiceCard';
import { MessagingService } from './types';
import { BrandLine } from "@/components/ui/custom-icons";

interface LineIntegrationProps {
  connected: boolean;
  connecting: string | null;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

const LineIntegration: React.FC<LineIntegrationProps> = ({
  connected,
  connecting,
  onConnect,
  onDisconnect
}) => {
  const lineService: MessagingService = {
    id: "line",
    name: "LINE",
    description: "Connect LINE for customer messaging",
    icon: <BrandLine className="h-5 w-5 text-green-600 dark:text-green-400" />,
    backgroundColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
    connected
  };

  return (
    <MessagingServiceCard
      service={lineService}
      connecting={connecting}
      onConnect={() => onConnect("line")}
      onDisconnect={() => onDisconnect("line")}
    >
      <div className="space-y-3 mb-4">
        <div>
          <Label htmlFor="line-channel-id">Channel ID</Label>
          <Input id="line-channel-id" placeholder="Enter your LINE channel ID" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="line-channel-secret">Channel Secret</Label>
          <Input id="line-channel-secret" type="password" placeholder="Enter your LINE channel secret" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="line-token">Channel Access Token</Label>
          <Input id="line-token" type="password" placeholder="Enter your LINE access token" className="mt-1" />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="line-official" />
          <Label htmlFor="line-official">This is an official LINE account</Label>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={() => window.open("https://developers.line.biz/console/", "_blank")}
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        LINE Developers Console
      </Button>
    </MessagingServiceCard>
  );
};

export default LineIntegration;
