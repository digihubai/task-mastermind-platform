
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MessageCircle } from "lucide-react";
import MessagingServiceCard from './MessagingServiceCard';
import { MessagingService } from './types';

interface LiveChatIntegrationProps {
  connected: boolean;
  connecting: string | null;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

const LiveChatIntegration: React.FC<LiveChatIntegrationProps> = ({
  connected,
  connecting,
  onConnect,
  onDisconnect
}) => {
  const livechatService: MessagingService = {
    id: "livechat",
    name: "Website Live Chat",
    description: "Embed chat widget on your website",
    icon: <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    backgroundColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
    connected
  };

  return (
    <MessagingServiceCard
      service={livechatService}
      connecting={connecting}
      onConnect={() => onConnect("livechat")}
      onDisconnect={() => onDisconnect("livechat")}
    >
      <div className="space-y-3 mb-4">
        <div>
          <Label htmlFor="widget-title">Widget Title</Label>
          <Input id="widget-title" defaultValue="Chat with us" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="welcome-message">Welcome Message</Label>
          <Input id="welcome-message" defaultValue="Hi there! How can we help you today?" className="mt-1" />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="auto-messages" defaultChecked />
          <Label htmlFor="auto-messages">Enable automatic messages</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="file-attachments" defaultChecked />
          <Label htmlFor="file-attachments">Allow file attachments</Label>
        </div>
        
        <div className="mt-4 pt-3 border-t">
          <h4 className="text-sm font-medium mb-2">Widget Installation</h4>
          <div className="p-3 bg-secondary/50 rounded-md text-xs font-mono overflow-x-auto">
            {`<script src="https://digihub.app/widget.js" data-id="YOUR_ID" async></script>`}
          </div>
          
          <Button variant="outline" size="sm" className="mt-2">
            Copy Code
          </Button>
        </div>
      </div>
    </MessagingServiceCard>
  );
};

export default LiveChatIntegration;
