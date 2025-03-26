
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Bot as BotIcon, MessageSquare, Mail, 
  Store, Key, CreditCard, Database, Code, ArrowUpRight 
} from "lucide-react";
import { 
  BrandFacebook, BrandTwitter, BrandWhatsapp, 
  BrandTelegram, BrandSlack 
} from "@/components/ui/custom-icons";

const IntegrationsTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState("messaging");

  return (
    <Card className="border border-border/40">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Integrations Settings</h2>
        
        <Tabs defaultValue="messaging" className="w-full" onValueChange={setActiveSubTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
            <TabsTrigger value="messaging">Messaging</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            <TabsTrigger value="ai">AI Services</TabsTrigger>
            <TabsTrigger value="apis">API Keys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="messaging" className="space-y-4">
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
                <Button size="sm" className="mt-2">Connect</Button>
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
                <Button size="sm" className="mt-2">Connect</Button>
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
                <Button size="sm" className="mt-2">Connect</Button>
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
                <Button size="sm" className="mt-2">Connect</Button>
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
                <Button size="sm" className="mt-2">Connect</Button>
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
                <Button size="sm" className="mt-2">Connect</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ecommerce" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 p-2 rounded-full">
                      <Store size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">WooCommerce</h3>
                      <p className="text-xs text-muted-foreground">Connect to WordPress & WooCommerce</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <Input placeholder="WooCommerce Site URL" className="mb-2" />
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Input placeholder="Consumer Key" />
                  <Input placeholder="Consumer Secret" type="password" />
                </div>
                <Button size="sm" className="mt-2">Connect</Button>
              </div>
              
              <div className="flex flex-col p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
                      <Store size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Shopify</h3>
                      <p className="text-xs text-muted-foreground">Connect to Shopify store</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <Input placeholder="Shopify Store URL" className="mb-2" />
                <Input placeholder="Shopify API Key" className="mb-2" />
                <Input placeholder="Shopify API Secret" type="password" className="mb-2" />
                <Button size="sm" className="mt-2">Connect</Button>
              </div>
              
              <div className="flex flex-col p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-2 rounded-full">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Stripe</h3>
                      <p className="text-xs text-muted-foreground">Connect payment gateway</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Input placeholder="Publishable Key" />
                  <Input placeholder="Secret Key" type="password" />
                </div>
                <Button size="sm" className="mt-2">Connect</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-2 rounded-full">
                      <BotIcon size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">OpenAI</h3>
                      <p className="text-xs text-muted-foreground">Connect GPT for AI responses</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <Input placeholder="OpenAI API Key" className="mb-2" />
                <div className="flex items-center justify-between space-x-2 mt-2 mb-2">
                  <Label htmlFor="default-model">Default Model</Label>
                  <select
                    id="default-model"
                    className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary/20 transition-colors w-2/3"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>
                <Button size="sm" className="mt-2">Connect</Button>
              </div>
              
              <div className="flex flex-col p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Dialogflow</h3>
                      <p className="text-xs text-muted-foreground">Connect Google Dialogflow</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <Input placeholder="Project ID" className="mb-2" />
                <Input placeholder="Service Account Key (JSON)" className="mb-2" />
                <Button size="sm" className="mt-2">Connect</Button>
              </div>
              
              <div className="flex flex-col p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 p-2 rounded-full">
                      <Database size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Vector Database</h3>
                      <p className="text-xs text-muted-foreground">For knowledge base embeddings</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <select
                  className="w-full mb-2 px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary/20 transition-colors"
                >
                  <option value="pinecone">Pinecone</option>
                  <option value="qdrant">Qdrant</option>
                  <option value="redis">Redis Vector Search</option>
                </select>
                <Input placeholder="API Key" className="mb-2" />
                <Input placeholder="Environment" className="mb-2" />
                <Button size="sm" className="mt-2">Connect</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="apis" className="space-y-4">
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
                      <Button size="sm" variant="outline">Copy</Button>
                      <Button size="sm" variant="outline">Regenerate</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
                    <div>
                      <p className="font-medium text-sm">Test API Key</p>
                      <p className="text-xs text-muted-foreground">Last used: 5 hours ago</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">Copy</Button>
                      <Button size="sm" variant="outline">Regenerate</Button>
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
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default IntegrationsTab;
