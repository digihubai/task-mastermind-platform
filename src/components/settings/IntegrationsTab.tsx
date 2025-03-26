
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Bot as BotIcon, MessageSquare, Mail, 
  Store, Key, CreditCard, Database, Code, ArrowUpRight,
  Grid, Cpu, Braces, Sparkles, ExternalLink, Zap,
  FileCode, Coins, GripVertical, Diamond, BookOpen,
  CloudLightning, PieChart, Shield, Boxes
} from "lucide-react";
import { 
  BrandFacebook, BrandTwitter, BrandWhatsapp, 
  BrandTelegram, BrandSlack 
} from "@/components/ui/custom-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

interface ApiIntegration {
  id: string;
  name: string;
  description: string; 
  icon: React.ReactNode;
  category: 'ai' | 'communication' | 'ecommerce' | 'tools' | 'analytics';
  isActive: boolean;
  apiKey?: string;
  credits?: number;
  usageLimit?: number;
  usageCount?: number;
}

const IntegrationsTab: React.FC = () => {
  const { toast } = useToast();
  const [activeSubTab, setActiveSubTab] = useState("messaging");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [aiServices, setAiServices] = useState<ApiIntegration[]>([
    {
      id: "openai",
      name: "OpenAI",
      description: "Connect GPT models for AI responses",
      icon: <BotIcon size={20} />,
      category: 'ai',
      isActive: true,
      apiKey: "sk-••••••••••••••••••••••••••••••",
      credits: 500,
      usageLimit: 1000,
      usageCount: 245
    },
    {
      id: "dialogflow",
      name: "Dialogflow",
      description: "Connect Google Dialogflow for chatbots",
      icon: <MessageSquare size={20} />,
      category: 'ai',
      isActive: false
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      description: "Access thousands of open-source models",
      icon: <Sparkles size={20} />,
      category: 'ai',
      isActive: false
    },
    {
      id: "anthropic",
      name: "Anthropic Claude",
      description: "Connect Claude models for AI responses",
      icon: <Cpu size={20} />,
      category: 'ai',
      isActive: true,
      apiKey: "sk-••••••••••••••••••••••••••••••",
      credits: 250,
      usageLimit: 500,
      usageCount: 125
    },
    {
      id: "stability",
      name: "Stability AI",
      description: "Generate images with Stable Diffusion",
      icon: <Grid size={20} />,
      category: 'ai',
      isActive: false
    },
    {
      id: "cohere",
      name: "Cohere",
      description: "Embedding & reranking models",
      icon: <Braces size={20} />,
      category: 'ai',
      isActive: false
    },
    {
      id: "pinecone",
      name: "Pinecone",
      description: "Vector database for embeddings",
      icon: <Database size={20} />,
      category: 'ai',
      isActive: true,
      apiKey: "••••••••••••••••••••••",
      credits: 1000,
      usageLimit: 5000,
      usageCount: 750
    },
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      description: "Text-to-speech voice generation",
      icon: <Zap size={20} />,
      category: 'ai',
      isActive: false
    }
  ]);

  const [apiCredits, setApiCredits] = useState<{
    total: number;
    used: number;
    categories: {name: string; used: number; total: number}[]
  }>({
    total: 10000,
    used: 2340,
    categories: [
      {name: "AI", used: 1250, total: 5000},
      {name: "Communication", used: 890, total: 3000},
      {name: "E-commerce", used: 200, total: 2000}
    ]
  });

  const handleIntegrationToggle = (id: string, category: 'ai' | 'communication' | 'ecommerce' | 'tools' | 'analytics') => {
    if (category === 'ai') {
      setAiServices(prev => 
        prev.map(service => 
          service.id === id ? {...service, isActive: !service.isActive} : service
        )
      );

      toast({
        title: `Integration ${aiServices.find(s => s.id === id)?.isActive ? "disabled" : "enabled"}`,
        description: `${aiServices.find(s => s.id === id)?.name} integration has been ${aiServices.find(s => s.id === id)?.isActive ? "disabled" : "enabled"}.`,
      });
    }
  };

  const handleApiKeyUpdate = (id: string, value: string) => {
    setAiServices(prev => 
      prev.map(service => 
        service.id === id ? {...service, apiKey: value} : service
      )
    );
  };

  const handleConnect = (id: string) => {
    toast({
      title: "Connection initiated",
      description: `Connecting to ${aiServices.find(s => s.id === id)?.name}...`,
    });
    
    // Simulate API connection
    setTimeout(() => {
      toast({
        title: "Connection successful",
        description: `Successfully connected to ${aiServices.find(s => s.id === id)?.name}.`,
      });
      
      setAiServices(prev => 
        prev.map(service => 
          service.id === id ? {...service, isActive: true} : service
        )
      );
    }, 1500);
  };

  const filteredAIServices = aiServices.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (filterCategory === "all" || service.category === filterCategory)
  );

  return (
    <Card className="border border-border/40">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Integrations Settings</h2>
        
        <Tabs defaultValue="messaging" className="w-full" onValueChange={setActiveSubTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
            <TabsTrigger value="messaging">Messaging</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            <TabsTrigger value="ai">AI Services</TabsTrigger>
            <TabsTrigger value="apis">API Keys</TabsTrigger>
            <TabsTrigger value="credits">VCCredits</TabsTrigger>
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
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search AI integrations..."
                  className="mb-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary/20 transition-colors"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="ai">AI Models</option>
                  <option value="tools">Tools</option>
                </select>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setFilterCategory("all");
                }}>
                  Reset Filters
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[500px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAIServices.map((service) => (
                  <div key={service.id} className="flex flex-col p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
                          {service.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{service.name}</h3>
                            {service.isActive && (
                              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Active</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <Switch 
                        checked={service.isActive}
                        onCheckedChange={() => handleIntegrationToggle(service.id, service.category)}
                      />
                    </div>
                    
                    {service.isActive && service.credits !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Usage: {service.usageCount}/{service.usageLimit}</span>
                          <span>{Math.round((service.usageCount / service.usageLimit) * 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${Math.min(100, (service.usageCount / service.usageLimit) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <Input 
                      placeholder={`${service.name} API Key`} 
                      className="mb-2"
                      value={service.apiKey || ""}
                      type={service.apiKey ? "password" : "text"}
                      onChange={(e) => handleApiKeyUpdate(service.id, e.target.value)}
                    />
                    
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleConnect(service.id)}
                        disabled={service.isActive}
                      >
                        {service.isActive ? "Connected" : "Connect"}
                      </Button>
                      
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <span>Docs</span>
                        <ExternalLink size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex flex-col p-4 border border-border rounded-lg mt-4">
              <h3 className="font-medium mb-2">Advanced AI Settings</h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="model-settings">
                  <AccordionTrigger>Model Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="temperature">Temperature</Label>
                          <Input 
                            id="temperature"
                            type="number" 
                            min="0" 
                            max="2" 
                            step="0.1" 
                            defaultValue="0.7"
                          />
                          <p className="text-xs text-muted-foreground">Controls randomness: Lower values are more deterministic, higher values more creative</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="max-tokens">Max Tokens</Label>
                          <Input 
                            id="max-tokens"
                            type="number" 
                            min="1" 
                            max="4096" 
                            defaultValue="1024"
                          />
                          <p className="text-xs text-muted-foreground">Maximum length of generated text</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <Label htmlFor="streaming">Response Streaming</Label>
                          <p className="text-xs text-muted-foreground">Show responses as they're being generated</p>
                        </div>
                        <Switch id="streaming" defaultChecked />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="context-settings">
                  <AccordionTrigger>Context & Knowledge</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="context-window">Context Window Size</Label>
                        <select
                          id="context-window"
                          className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary/20 transition-colors"
                        >
                          <option value="4k">4K tokens</option>
                          <option value="8k">8K tokens</option>
                          <option value="16k">16K tokens</option>
                          <option value="32k">32K tokens</option>
                        </select>
                        <p className="text-xs text-muted-foreground">Maximum context length for AI conversations</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <Label htmlFor="knowledge-retrieval">Knowledge Retrieval</Label>
                          <p className="text-xs text-muted-foreground">Automatically retrieve relevant knowledge</p>
                        </div>
                        <Switch id="knowledge-retrieval" defaultChecked />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="webhook-settings">
                  <AccordionTrigger>Webhooks & Callbacks</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input id="webhook-url" placeholder="https://your-server.com/webhook" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <Label htmlFor="webhooks-enabled">Enable Webhooks</Label>
                          <p className="text-xs text-muted-foreground">Send events to external systems</p>
                        </div>
                        <Switch id="webhooks-enabled" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
          
          <TabsContent value="credits" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card className="p-4 border-border bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total VCCredits</h3>
                    <p className="text-2xl font-bold mt-1">{apiCredits.total.toLocaleString()}</p>
                  </div>
                  <div className="bg-white dark:bg-black p-2 rounded-full">
                    <Coins size={24} className="text-primary" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/40">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Used</span>
                    <span>{apiCredits.used.toLocaleString()} credits</span>
                  </div>
                  <div className="mt-1 w-full h-2 bg-white/50 dark:bg-black/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${Math.min(100, (apiCredits.used / apiCredits.total) * 100)}%` }}
                    />
                  </div>
                </div>
              </Card>
              
              <div className="md:col-span-2">
                <Card className="p-4 border-border h-full">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">Credit Usage by Category</h3>
                  <div className="space-y-4">
                    {apiCredits.categories.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{category.name}</span>
                          <span>{category.used.toLocaleString()}/{category.total.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              index === 0 ? 'bg-purple-500' : 
                              index === 1 ? 'bg-blue-500' : 
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(100, (category.used / category.total) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
            
            <Card className="p-6 border-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">VCCredits Management</h3>
                <Button>Purchase Credits</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Credit Allocation</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 p-2 rounded-full dark:bg-purple-900/20">
                          <BotIcon size={16} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">AI Services</p>
                          <p className="text-xs text-muted-foreground">OpenAI, Anthropic, etc.</p>
                        </div>
                      </div>
                      <Input 
                        type="number" 
                        className="w-24" 
                        defaultValue="5000" 
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900/20">
                          <MessageSquare size={16} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Communication</p>
                          <p className="text-xs text-muted-foreground">WhatsApp, Email, etc.</p>
                        </div>
                      </div>
                      <Input 
                        type="number" 
                        className="w-24" 
                        defaultValue="3000" 
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 p-2 rounded-full dark:bg-green-900/20">
                          <Store size={16} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">E-commerce</p>
                          <p className="text-xs text-muted-foreground">Product APIs, Payments</p>
                        </div>
                      </div>
                      <Input 
                        type="number" 
                        className="w-24" 
                        defaultValue="2000" 
                      />
                    </div>
                    
                    <Button size="sm">Update Allocation</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-4">Credit Usage History</h4>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-secondary/30 rounded-md">
                        <div>
                          <p className="text-sm font-medium">
                            {i === 0 ? 'OpenAI GPT-4 API' : 
                             i === 1 ? 'WhatsApp Business API' :
                             i === 2 ? 'Pinecone Vector Search' :
                             i === 3 ? 'Anthropic Claude API' :
                             'Email Notifications'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="font-mono">
                          -{(i+1) * 75} credits
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    View Full History
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-medium mb-4">Credit Plans</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 border-primary/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">Starter</h5>
                        <p className="text-2xl font-bold mt-1">$29<span className="text-sm font-normal">/mo</span></p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 border-primary/20">Popular</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">5,000 credits monthly</p>
                    <Button size="sm" className="w-full mt-4">Upgrade</Button>
                  </Card>
                  
                  <Card className="p-4">
                    <div>
                      <h5 className="font-medium">Professional</h5>
                      <p className="text-2xl font-bold mt-1">$99<span className="text-sm font-normal">/mo</span></p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">25,000 credits monthly</p>
                    <Button size="sm" variant="outline" className="w-full mt-4">Upgrade</Button>
                  </Card>
                  
                  <Card className="p-4">
                    <div>
                      <h5 className="font-medium">Enterprise</h5>
                      <p className="text-2xl font-bold mt-1">$299<span className="text-sm font-normal">/mo</span></p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">100,000 credits monthly</p>
                    <Button size="sm" variant="outline" className="w-full mt-4">Contact Sales</Button>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default IntegrationsTab;
