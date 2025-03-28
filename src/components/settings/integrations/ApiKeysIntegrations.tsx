
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Key, Code, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { IntegrationProps } from './types';

const ApiKeysIntegrations: React.FC<IntegrationProps> = () => {
  const { toast } = useToast();

  const handleCopyKey = () => {
    toast({
      title: "API Key copied",
      description: "API key has been copied to clipboard",
    });
  };

  const handleRegenerateKey = () => {
    toast({
      title: "API Key regenerated",
      description: "A new API key has been generated",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 p-2 rounded-full">
              <Key size={20} />
            </div>
            <div>
              <h3 className="font-medium">API Access</h3>
              <p className="text-xs text-muted-foreground">Manage API keys for external access</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mt-2">
          <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
            <div>
              <p className="font-medium text-sm">Production API Key</p>
              <p className="text-xs text-muted-foreground">Last used: 2 days ago</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleCopyKey}>Copy</Button>
              <Button size="sm" variant="outline" onClick={handleRegenerateKey}>Regenerate</Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
            <div>
              <p className="font-medium text-sm">Test API Key</p>
              <p className="text-xs text-muted-foreground">Last used: 5 hours ago</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleCopyKey}>Copy</Button>
              <Button size="sm" variant="outline" onClick={handleRegenerateKey}>Regenerate</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-2">API Documentation</h4>
          <Button variant="outline" className="w-full flex items-center justify-between">
            <span>View API Documentation</span>
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
              <Code size={20} />
            </div>
            <div>
              <h3 className="font-medium">Webhooks</h3>
              <p className="text-xs text-muted-foreground">Configure webhooks for events</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" placeholder="https://your-server.com/webhook" className="mt-1" />
          </div>
          
          <div>
            <Label className="mb-1 block">Events to Trigger</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="event-new-message" />
                <Label htmlFor="event-new-message">New Message</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="event-new-user" />
                <Label htmlFor="event-new-user">New User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="event-new-ticket" />
                <Label htmlFor="event-new-ticket">New Ticket</Label>
              </div>
            </div>
          </div>
        </div>
        
        <Button size="sm" className="mt-4">Save Webhook</Button>
      </div>
    </div>
  );
};

export default ApiKeysIntegrations;
