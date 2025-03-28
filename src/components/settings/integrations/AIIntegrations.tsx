
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { 
  Bot as BotIcon, MessageSquare, ExternalLink, Cpu, 
  Grid, Braces, Database, Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiIntegration } from './types';

const AIIntegrations: React.FC = () => {
  const { toast } = useToast();
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
    }
  ]);
  
  const handleIntegrationToggle = (id: string) => {
    setAiServices(prev => 
      prev.map(service => 
        service.id === id ? {...service, isActive: !service.isActive} : service
      )
    );

    toast({
      title: `Integration ${aiServices.find(s => s.id === id)?.isActive ? "disabled" : "enabled"}`,
      description: `${aiServices.find(s => s.id === id)?.name} integration has been ${aiServices.find(s => s.id === id)?.isActive ? "disabled" : "enabled"}.`,
    });
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
    <div className="space-y-4">
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
                  onCheckedChange={() => handleIntegrationToggle(service.id)}
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
    </div>
  );
};

export default AIIntegrations;
