import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Bot, Settings, Plus, MessageSquare, BarChart2, PlusCircle, 
  ChevronRight, Smartphone, ShoppingCart, Mail, MessagesSquare
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/Badge";

const ChatbotPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const platformIcons: {[key: string]: any} = {
    "website": <Bot />,
    "whatsapp": <Smartphone />,
    "messenger": <MessageSquare />,
    "shopify": <ShoppingCart />,
    "woocommerce": <ShoppingCart />,
    "email": <Mail />,
    "sms": <MessagesSquare />
  };
  
  const mockIntegrations = [
    {
      id: 1,
      name: "Website Live Chat",
      platform: "website",
      status: "active",
      conversations: 254,
      responsiveness: 92
    },
    {
      id: 2,
      name: "WhatsApp Business",
      platform: "whatsapp",
      status: "active",
      conversations: 178,
      responsiveness: 87
    },
    {
      id: 3,
      name: "Facebook Messenger",
      platform: "messenger",
      status: "active",
      conversations: 121,
      responsiveness: 85
    },
    {
      id: 4,
      name: "Shopify Store",
      platform: "shopify",
      status: "active",
      conversations: 89,
      responsiveness: 90
    },
    {
      id: 5,
      name: "WooCommerce Store",
      platform: "woocommerce",
      status: "inactive",
      conversations: 0,
      responsiveness: 0
    },
    {
      id: 6,
      name: "Email Support",
      platform: "email",
      status: "active",
      conversations: 143,
      responsiveness: 78
    },
    {
      id: 7,
      name: "SMS Notifications",
      platform: "sms",
      status: "inactive",
      conversations: 0,
      responsiveness: 0
    }
  ];
  
  const mockChatbots = [
    {
      id: 1,
      name: "Sales Assistant",
      description: "Helps qualify leads and book appointments",
      channels: ["website", "whatsapp"],
      status: "active"
    },
    {
      id: 2,
      name: "Customer Support",
      description: "Handles common support questions and ticket creation",
      channels: ["website", "messenger", "email"],
      status: "active"
    },
    {
      id: 3,
      name: "Order Tracking",
      description: "Allows customers to check order status",
      channels: ["shopify", "woocommerce", "messenger"],
      status: "active"
    },
    {
      id: 4,
      name: "Product Recommender",
      description: "Suggests products based on customer preferences",
      channels: ["website", "shopify"],
      status: "inactive"
    }
  ];
  
  const handleNewIntegration = () => {
    toast({
      title: "Add new integration",
      description: "Integration wizard will be available soon",
    });
  };
  
  const handleNewChatbot = () => {
    toast({
      title: "Create new chatbot",
      description: "Chatbot creation wizard will be available soon",
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Chatbot Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your chatbot integrations and configurations
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Feature in development",
                  description: "Chatbot settings will be available soon",
                });
              }}
              className="flex items-center gap-2"
            >
              <Settings size={18} />
              <span>Settings</span>
            </Button>
            
            <Button
              onClick={handleNewChatbot}
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              <span>New Chatbot</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chatbots">Chatbots</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total Conversations</p>
                      <h3 className="text-3xl font-semibold mt-1">785</h3>
                      <p className="text-xs text-green-500 mt-2">
                        +12% from last month
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <Bot size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Active Chatbots</p>
                      <h3 className="text-3xl font-semibold mt-1">3</h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        Out of 4 configured
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <BarChart2 size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Avg Responsiveness</p>
                      <h3 className="text-3xl font-semibold mt-1">86%</h3>
                      <p className="text-xs text-green-500 mt-2">
                        +4% from last month
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="border border-border/40">
                  <div className="p-4 border-b border-border flex justify-between items-center">
                    <h3 className="font-medium">Recent Conversations</h3>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span>View all</span>
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-80">
                    <div className="p-4 space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex gap-4 items-start pb-4 border-b border-border/40 last:border-0 last:pb-0">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <MessageSquare size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium text-sm">Customer #{i}0234</p>
                              <span className="text-xs text-muted-foreground">{i * 10}m ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              I'm interested in your services. Can you provide more information about pricing and availability?
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                                Website Chat
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                                Sales Assistant
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
                
                <Card className="border border-border/40">
                  <div className="p-4 border-b border-border flex justify-between items-center">
                    <h3 className="font-medium">Channel Performance</h3>
                    <Select defaultValue="7days">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24hours">Last 24 hours</SelectItem>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="90days">Last 90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      {["website", "whatsapp", "messenger", "email"].map((platform, i) => {
                        const Icon = platformIcons[platform];
                        const performance = 90 - (i * 10);
                        
                        return (
                          <div key={platform} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-primary">{Icon}</span>
                                <span className="capitalize">{platform}</span>
                              </div>
                              <span className="text-sm">{performance}%</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${performance}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="chatbots" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockChatbots.map(chatbot => (
                  <Card key={chatbot.id} className="hover-lift border border-border/40">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 rounded-full p-3 text-primary">
                            <Bot size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium">{chatbot.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{chatbot.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Switch id={`chatbot-${chatbot.id}`} checked={chatbot.status === "active"} />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Active channels:</p>
                        <div className="flex flex-wrap gap-2">
                          {chatbot.channels.map(channel => {
                            const Icon = platformIcons[channel];
                            
                            return (
                              <div 
                                key={channel} 
                                className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-xs"
                                title={channel}
                              >
                                <span className="text-primary">{Icon}</span>
                                <span className="capitalize">{channel}</span>
                              </div>
                            );
                          })}
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6 rounded-md"
                            onClick={() => {
                              toast({
                                title: "Add channel",
                                description: "Channel configuration will be available soon",
                              });
                            }}
                          >
                            <PlusCircle size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Edit chatbot",
                              description: "Chatbot editor will be available soon",
                            });
                          }}
                        >
                          Settings
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "View analytics",
                              description: "Chatbot analytics will be available soon",
                            });
                          }}
                        >
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Card 
                  className="hover-lift border border-dashed border-border h-full flex items-center justify-center cursor-pointer"
                  onClick={handleNewChatbot}
                >
                  <div className="p-6 text-center">
                    <div className="bg-secondary rounded-full p-3 text-primary mx-auto">
                      <PlusCircle size={24} />
                    </div>
                    <h3 className="font-medium mt-4">Create New Chatbot</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Configure a new AI chatbot for your business
                    </p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockIntegrations.map(integration => (
                  <Card key={integration.id} className="hover-lift border border-border/40">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 rounded-full p-3 text-primary">
                            {platformIcons[integration.platform]}
                          </div>
                          <div>
                            <h3 className="font-medium">{integration.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1 capitalize">
                              {integration.platform} integration
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Label htmlFor={`integration-${integration.id}`} className="sr-only">
                            Toggle integration
                          </Label>
                          <Switch 
                            id={`integration-${integration.id}`} 
                            checked={integration.status === "active"} 
                          />
                        </div>
                      </div>
                      
                      {integration.status === "active" && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="bg-secondary/50 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">Conversations</p>
                            <p className="text-xl font-semibold mt-1">{integration.conversations}</p>
                          </div>
                          
                          <div className="bg-secondary/50 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">Responsiveness</p>
                            <p className="text-xl font-semibold mt-1">{integration.responsiveness}%</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-border flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Configure integration",
                              description: "Integration settings will be available soon",
                            });
                          }}
                        >
                          Configure
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Card 
                  className="hover-lift border border-dashed border-border h-full flex items-center justify-center cursor-pointer"
                  onClick={handleNewIntegration}
                >
                  <div className="p-6 text-center">
                    <div className="bg-secondary rounded-full p-3 text-primary mx-auto">
                      <PlusCircle size={24} />
                    </div>
                    <h3 className="font-medium mt-4">Add New Integration</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Connect a new platform or service to your chatbots
                    </p>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ChatbotPage;
