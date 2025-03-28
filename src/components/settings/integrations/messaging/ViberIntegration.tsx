
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BrandViber } from "@/components/ui/custom-icons";
import MessagingServiceCard from './MessagingServiceCard';
import { MessagingService } from './types';
import { useToast } from "@/hooks/use-toast";

interface ViberIntegrationProps {
  connected: boolean;
  connecting: string | null;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

const ViberIntegration: React.FC<ViberIntegrationProps> = ({
  connected,
  connecting,
  onConnect,
  onDisconnect
}) => {
  const { toast } = useToast();
  
  const viberService: MessagingService = {
    id: "viber",
    name: "Viber",
    description: "Connect Viber for business messaging",
    icon: <BrandViber className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
    backgroundColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
    connected
  };

  return (
    <MessagingServiceCard
      service={viberService}
      connecting={connecting}
      onConnect={() => onConnect("viber")}
      onDisconnect={() => onDisconnect("viber")}
    >
      <div className="space-y-3 mb-4">
        <div>
          <Label htmlFor="viber-token">Authentication Token</Label>
          <Input id="viber-token" placeholder="Enter your Viber auth token" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="viber-account-id">Account ID</Label>
          <Input id="viber-account-id" placeholder="Enter your Viber account ID" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="viber-webhook">Webhook URL</Label>
          <div className="flex gap-2 mt-1">
            <Input id="viber-webhook" placeholder="https://your-webhook-url.com/viber" readOnly className="flex-1" />
            <Button variant="outline" size="sm" onClick={() => {
              navigator.clipboard.writeText("https://your-webhook-url.com/viber");
              toast({ title: "Copied to clipboard" });
            }}>Copy</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Enter this URL in your Viber Business API settings</p>
        </div>
      </div>
    </MessagingServiceCard>
  );
};

export default ViberIntegration;
