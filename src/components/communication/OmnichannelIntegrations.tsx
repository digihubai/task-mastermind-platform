
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, Mail, Phone, Globe, 
  ExternalLink, Instagram, Twitter, 
  Settings, CheckCircle2
} from "lucide-react";
import { 
  BrandFacebook, BrandWhatsapp
} from "@/components/ui/custom-icons";
import { toast } from "@/hooks/use-toast";

const OmnichannelIntegrations: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState("livechat");
  
  const handleToggleChannel = (channelId: string, isActive: boolean) => {
    toast({
      title: `${isActive ? 'Enabled' : 'Disabled'} channel`,
      description: `${channelId.charAt(0).toUpperCase() + channelId.slice(1)} channel has been ${isActive ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleSaveConfig = (channelId: string) => {
    toast({
      title: "Configuration saved",
      description: `${channelId.charAt(0).toUpperCase() + channelId.slice(1)} configuration has been updated.`,
    });
  };

  return (
    <Card className="p-6 border border-border/40">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Omnichannel Communication</h2>
          <p className="text-muted-foreground mt-1">Configure communication channels for your omnichannel inbox</p>
        </div>
        <Button variant="outline" onClick={() => window.location.href = "/support/omnichannel"}>
          Open Inbox
          <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="livechat" className="w-full" onValueChange={setActiveChannel}>
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="livechat" className="flex items-center">
            <MessageCircle className="mr-2 h-4 w-4" />
            Website Chat
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center">
            <BrandWhatsapp className="mr-2 h-4 w-4" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="messenger" className="flex items-center">
            <BrandFacebook className="mr-2 h-4 w-4" />
            Messenger
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center">
            <Phone className="mr-2 h-4 w-4" />
            SMS
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center">
            <Instagram className="mr-2 h-4 w-4" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="twitter" className="flex items-center">
            <Twitter className="mr-2 h-4 w-4" />
            Twitter/X
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
        </TabsList>

        {/* Website Chat Config */}
        <TabsContent value="livechat" className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full mr-3">
                <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Website Live Chat</h3>
                <p className="text-sm text-muted-foreground">Embed chat widget on your website</p>
              </div>
            </div>
            <Switch 
              defaultChecked={true} 
              onCheckedChange={(checked) => handleToggleChannel("livechat", checked)} 
            />
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium">Widget Configuration</h3>
            
            <div className="space-y-3">
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
            </div>
            
            <Button onClick={() => handleSaveConfig("livechat")} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
          
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Widget Installation</h3>
              <Button variant="outline" size="sm">Copy Code</Button>
            </div>
            
            <div className="p-3 bg-secondary/50 rounded-md text-sm font-mono overflow-x-auto">
              {`<script src="https://digihub.app/widget.js" data-id="YOUR_ID" async></script>`}
            </div>
          </div>
        </TabsContent>

        {/* WhatsApp Config */}
        <TabsContent value="whatsapp" className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full mr-3">
                <BrandWhatsapp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">WhatsApp Business</h3>
                <p className="text-sm text-muted-foreground">Connect your WhatsApp Business account</p>
              </div>
            </div>
            <Switch onCheckedChange={(checked) => handleToggleChannel("whatsapp", checked)} />
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium">WhatsApp Business API</h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="whatsapp-phone">Business Phone Number</Label>
                <Input id="whatsapp-phone" placeholder="+1234567890" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="whatsapp-id">Business Account ID</Label>
                <Input id="whatsapp-id" placeholder="Enter your WhatsApp Business ID" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="whatsapp-token">Access Token</Label>
                <Input id="whatsapp-token" type="password" placeholder="Enter your access token" className="mt-1" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => handleSaveConfig("whatsapp")}>
                Connect Account
              </Button>
              <Button variant="outline" className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                Meta Dashboard
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Facebook Messenger Config */}
        <TabsContent value="messenger" className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full mr-3">
                <BrandFacebook className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Facebook Messenger</h3>
                <p className="text-sm text-muted-foreground">Connect your Facebook page</p>
              </div>
            </div>
            <Switch onCheckedChange={(checked) => handleToggleChannel("messenger", checked)} />
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium">Facebook Page Connection</h3>
            
            <div className="space-y-3">
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
            
            <Button onClick={() => handleSaveConfig("messenger")}>
              Connect Facebook Page
            </Button>
          </div>
        </TabsContent>

        {/* SMS Config */}
        <TabsContent value="sms" className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full mr-3">
                <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">SMS</h3>
                <p className="text-sm text-muted-foreground">Connect SMS provider for text messaging</p>
              </div>
            </div>
            <Switch onCheckedChange={(checked) => handleToggleChannel("sms", checked)} />
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">SMS Provider</h3>
              <select className="px-2 py-1 bg-background text-sm border rounded-md">
                <option value="twilio">Twilio</option>
                <option value="messagebird">MessageBird</option>
                <option value="nexmo">Nexmo (Vonage)</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="sms-account-sid">Account SID</Label>
                <Input id="sms-account-sid" placeholder="Enter your Account SID" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="sms-auth-token">Auth Token</Label>
                <Input id="sms-auth-token" type="password" placeholder="Enter your Auth Token" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="sms-phone-number">Sender Phone Number</Label>
                <Input id="sms-phone-number" placeholder="+1234567890" className="mt-1" />
              </div>
            </div>
            
            <Button onClick={() => handleSaveConfig("sms")}>
              Connect SMS Provider
            </Button>
          </div>
        </TabsContent>

        {/* Instagram Config */}
        <TabsContent value="instagram" className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-full mr-3">
                <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h3 className="font-medium">Instagram Direct</h3>
                <p className="text-sm text-muted-foreground">Connect Instagram business account</p>
              </div>
            </div>
            <Switch onCheckedChange={(checked) => handleToggleChannel("instagram", checked)} />
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium">Instagram Business Integration</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your Instagram business account through Facebook Business Manager
            </p>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="ig-page-id">Facebook Page ID</Label>
                <Input id="ig-page-id" placeholder="Connect through Facebook integration" className="mt-1" disabled />
                <p className="text-xs text-muted-foreground mt-1">Connect Facebook Messenger first to enable Instagram integration</p>
              </div>
            </div>
            
            <Button onClick={() => handleSaveConfig("instagram")}>
              Connect Instagram Account
            </Button>
          </div>
        </TabsContent>

        {/* Twitter/X Config */}
        <TabsContent value="twitter" className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full mr-3">
                <Twitter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Twitter/X</h3>
                <p className="text-sm text-muted-foreground">Connect Twitter/X for direct messages</p>
              </div>
            </div>
            <Switch onCheckedChange={(checked) => handleToggleChannel("twitter", checked)} />
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium">Twitter API Connection</h3>
            
            <div className="space-y-3">
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
            
            <Button onClick={() => handleSaveConfig("twitter")}>
              Connect Twitter/X Account
            </Button>
          </div>
        </TabsContent>

        {/* Email Config */}
        <TabsContent value="email" className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-full mr-3">
                <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-sm text-muted-foreground">Configure email for support tickets</p>
              </div>
            </div>
            <Switch onCheckedChange={(checked) => handleToggleChannel("email", checked)} />
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium">Email Server Configuration</h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="email-type">Email Provider</Label>
                <select id="email-type" className="w-full px-2 py-2 mt-1 bg-background text-sm border rounded-md">
                  <option value="smtp">SMTP Server</option>
                  <option value="gmail">Gmail</option>
                  <option value="outlook">Outlook</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="email-host">SMTP Host</Label>
                <Input id="email-host" placeholder="smtp.example.com" className="mt-1" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="email-port">SMTP Port</Label>
                  <Input id="email-port" placeholder="587" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email-security">Security</Label>
                  <select id="email-security" className="w-full px-2 py-2 mt-1 bg-background text-sm border rounded-md">
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="email-username">Username</Label>
                <Input id="email-username" placeholder="support@yourcompany.com" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="email-password">Password</Label>
                <Input id="email-password" type="password" placeholder="Enter password" className="mt-1" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => handleSaveConfig("email")}>
                Save Email Configuration
              </Button>
              <Button variant="outline">
                Test Connection
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default OmnichannelIntegrations;
