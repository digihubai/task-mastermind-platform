
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BrandFacebook, BrandTwitter, BrandWhatsapp, BrandTelegram, BrandSlack } from "@/components/ui/custom-icons";
import { IntegrationProps } from './types';

const MessagingIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const { toast } = useToast();
  
  const handleConnect = (service: string) => {
    toast({
      title: "Connection initiated",
      description: `Connecting to ${service}...`,
    });
    
    if (onConnect) {
      onConnect(service.toLowerCase());
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-2 rounded-full">
              <BrandWhatsapp size={20} />
            </div>
            <div>
              <h3 className="font-medium">WhatsApp</h3>
              <p className="text-xs text-muted-foreground">Connect WhatsApp Business</p>
            </div>
          </div>
          <Switch />
        </div>
        <Input placeholder="WhatsApp Business API Key" className="mb-2" />
        <Button size="sm" className="mt-2" onClick={() => handleConnect("WhatsApp")}>Connect</Button>
      </div>
      
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
              <BrandFacebook size={20} />
            </div>
            <div>
              <h3 className="font-medium">Facebook Messenger</h3>
              <p className="text-xs text-muted-foreground">Connect Messenger to chatbot</p>
            </div>
          </div>
          <Switch />
        </div>
        <Input placeholder="Facebook App ID" className="mb-2" />
        <Input placeholder="Facebook App Secret" className="mb-2" />
        <Button size="sm" className="mt-2" onClick={() => handleConnect("Facebook")}>Connect</Button>
      </div>
      
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
              <BrandTwitter size={20} />
            </div>
            <div>
              <h3 className="font-medium">Twitter</h3>
              <p className="text-xs text-muted-foreground">Connect Twitter for DMs</p>
            </div>
          </div>
          <Switch />
        </div>
        <Input placeholder="Twitter API Key" className="mb-2" />
        <Input placeholder="Twitter API Secret" className="mb-2" />
        <Button size="sm" className="mt-2" onClick={() => handleConnect("Twitter")}>Connect</Button>
      </div>
      
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
              <BrandTelegram size={20} />
            </div>
            <div>
              <h3 className="font-medium">Telegram</h3>
              <p className="text-xs text-muted-foreground">Connect Telegram bot</p>
            </div>
          </div>
          <Switch />
        </div>
        <Input placeholder="Telegram Bot Token" className="mb-2" />
        <Button size="sm" className="mt-2" onClick={() => handleConnect("Telegram")}>Connect</Button>
      </div>
      
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 p-2 rounded-full">
              <BrandSlack size={20} />
            </div>
            <div>
              <h3 className="font-medium">Slack</h3>
              <p className="text-xs text-muted-foreground">Connect Slack for team notifications</p>
            </div>
          </div>
          <Switch />
        </div>
        <Input placeholder="Slack Webhook URL" className="mb-2" />
        <Button size="sm" className="mt-2" onClick={() => handleConnect("Slack")}>Connect</Button>
      </div>
      
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 p-2 rounded-full">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-medium">Email Integration</h3>
              <p className="text-xs text-muted-foreground">Connect email for tickets</p>
            </div>
          </div>
          <Switch />
        </div>
        <Input placeholder="SMTP Server" className="mb-2" />
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Input placeholder="SMTP Username" />
          <Input placeholder="SMTP Password" type="password" />
        </div>
        <Button size="sm" className="mt-2" onClick={() => handleConnect("Email")}>Connect</Button>
      </div>
    </div>
  );
};

export default MessagingIntegrations;
