
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Plus, Bot, Trash2, PlusCircle, ExternalLink, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

interface AIModel {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  provider: string;
  modelId: string;
  category?: 'text' | 'image' | 'audio' | 'video' | 'embedding';
  capabilities?: string[];
  contextLength?: number;
  pricingTiers?: string[];
  apiKey?: string;
}

interface AIProvider {
  id: string;
  name: string;
  isActive: boolean;
  models: AIModel[];
  apiKeyConfigured: boolean;
}

const AIModelsTab: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProvider, setFilterProvider] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Example data - in a real app this would come from an API or context
  const [providers, setProviders] = useState<AIProvider[]>([
    {
      id: "openai",
      name: "OpenAI",
      isActive: true,
      apiKeyConfigured: true,
      models: [
        {
          id: "gpt-3.5-turbo",
          name: "GPT 3.5-turbo",
          description: "Most affordable and balanced for most tasks",
          isActive: true,
          provider: "openai",
          modelId: "gpt-3.5-turbo",
          category: "text",
          capabilities: ["chat", "completion", "function_calling"],
          contextLength: 16000,
          pricingTiers: ["basic", "pro", "enterprise"]
        },
        {
          id: "gpt-4o",
          name: "GPT-4o",
          description: "Most advanced, multimodal flagship model",
          isActive: true,
          provider: "openai",
          modelId: "gpt-4o",
          category: "text",
          capabilities: ["chat", "completion", "function_calling", "vision"],
          contextLength: 128000,
          pricingTiers: ["pro", "enterprise"]
        },
        {
          id: "gpt-4o-mini",
          name: "GPT-4o mini",
          description: "Affordable and intelligent small model for fast tasks",
          isActive: true,
          provider: "openai",
          modelId: "gpt-4o-mini",
          category: "text",
          capabilities: ["chat", "completion", "function_calling"],
          contextLength: 128000,
          pricingTiers: ["basic", "pro", "enterprise"]
        },
        {
          id: "text-embedding-3-large",
          name: "Text Embedding 3 Large",
          description: "Advanced embedding model for vector search",
          isActive: true,
          provider: "openai",
          modelId: "text-embedding-3-large",
          category: "embedding",
          pricingTiers: ["pro", "enterprise"]
        }
      ]
    },
    {
      id: "anthropic",
      name: "Anthropic",
      isActive: true,
      apiKeyConfigured: true,
      models: [
        {
          id: "claude-3-5-sonnet",
          name: "Claude 3.5 Sonnet",
          description: "Latest Claude model with improved reasoning",
          isActive: true,
          provider: "anthropic",
          modelId: "claude-3-5-sonnet-20241022",
          category: "text",
          capabilities: ["chat", "completion", "vision"],
          contextLength: 200000,
          pricingTiers: ["pro", "enterprise"]
        },
        {
          id: "claude-3-haiku",
          name: "Claude 3.5 Haiku",
          description: "Fast and efficient Claude model",
          isActive: true,
          provider: "anthropic",
          modelId: "claude-3-haiku-20241022",
          category: "text",
          capabilities: ["chat", "completion"],
          contextLength: 200000,
          pricingTiers: ["basic", "pro", "enterprise"]
        }
      ]
    },
    {
      id: "google",
      name: "Google Gemini",
      isActive: false,
      apiKeyConfigured: false,
      models: [
        {
          id: "gemini-1.5-pro",
          name: "Gemini 1.5 Pro",
          description: "Google's most capable multimodal model",
          isActive: false,
          provider: "google",
          modelId: "gemini-1.5-pro-latest",
          category: "text",
          capabilities: ["chat", "completion", "vision"],
          contextLength: 1000000,
          pricingTiers: ["pro", "enterprise"]
        },
        {
          id: "gemini-1.5-flash",
          name: "Gemini 1.5 Flash",
          description: "Fastest Google model for efficient processing",
          isActive: false,
          provider: "google",
          modelId: "gemini-1.5-flash",
          category: "text",
          capabilities: ["chat", "completion"],
          contextLength: 1000000,
          pricingTiers: ["basic", "pro", "enterprise"]
        }
      ]
    },
    {
      id: "perplexity",
      name: "Perplexity",
      isActive: false,
      apiKeyConfigured: false,
      models: [
        {
          id: "sonar-small-online",
          name: "Sonar Small Online",
          description: "Realtime search and summarization",
          isActive: false,
          provider: "perplexity",
          modelId: "llama-3.1-sonar-small-128k-online",
          category: "text",
          capabilities: ["chat", "search", "online"],
          contextLength: 128000,
          pricingTiers: ["pro", "enterprise"]
        }
      ]
    },
    {
      id: "xai",
      name: "X AI",
      isActive: false,
      apiKeyConfigured: false,
      models: [
        {
          id: "grok-2",
          name: "Grok 2",
          description: "X AI's latest language model",
          isActive: false,
          provider: "xai",
          modelId: "grok-2-1212",
          category: "text",
          capabilities: ["chat", "completion"],
          contextLength: 128000,
          pricingTiers: ["enterprise"]
        }
      ]
    }
  ]);

  useEffect(() => {
    const fetchAIModels = async () => {
      // In a real implementation, this would fetch from an API or database
      // For now, let's use the mock data already defined
      
      // If we had a proper database table, we would do something like:
      // try {
      //   const { data, error } = await supabase
      //     .from('ai_models')
      //     .select('*');
      //   if (error) throw error;
      // } catch (err) {
      //   console.error('Error fetching models:', err);
      // }
    };
    
    // Uncomment when database is set up
    // fetchAIModels();
  }, []);

  const handleToggleModelActive = async (providerId: string, modelId: string) => {
    // In a real implementation, this would update the database
    setProviders(prev => 
      prev.map(provider => {
        if (provider.id === providerId) {
          return {
            ...provider,
            models: provider.models.map(model => 
              model.id === modelId ? { ...model, isActive: !model.isActive } : model
            )
          };
        }
        return provider;
      })
    );

    const provider = providers.find(p => p.id === providerId);
    const model = provider?.models.find(m => m.id === modelId);
    
    // Show toast notification
    toast({
      title: `${model?.isActive ? "Disabled" : "Enabled"} ${model?.name}`,
      description: `Model has been ${model?.isActive ? "disabled" : "enabled"} and will ${model?.isActive ? "no longer" : "now"} be available to users.`,
    });
  };

  const handleToggleProviderActive = async (providerId: string) => {
    setProviders(prev => 
      prev.map(provider => {
        if (provider.id === providerId) {
          // Only allow toggling if API key is configured
          if (!provider.apiKeyConfigured && !provider.isActive) {
            toast({
              title: "API Key Required",
              description: `Please configure an API key for ${provider.name} before enabling`,
              variant: "destructive"
            });
            return provider;
          }
          
          return {
            ...provider,
            isActive: !provider.isActive,
            // When deactivating a provider, deactivate all its models
            models: provider.isActive 
              ? provider.models.map(model => ({ ...model, isActive: false }))
              : provider.models
          };
        }
        return provider;
      })
    );

    const provider = providers.find(p => p.id === providerId);
    if (provider?.apiKeyConfigured) {
      toast({
        title: `${provider.isActive ? "Disabled" : "Enabled"} ${provider.name}`,
        description: `Provider has been ${provider.isActive ? "disabled" : "enabled"}. All models will be updated accordingly.`,
      });
    }
  };

  const handleConfigureApiKey = (providerId: string) => {
    // Direct user to Integrations tab
    toast({
      title: "Configure API Key",
      description: `Please enter your API key for this provider in the Integrations tab.`,
    });
  };

  const handleAddToPricingTier = async (providerId: string, modelId: string, tier: string) => {
    // Update the model's pricing tiers
    setProviders(prev => 
      prev.map(provider => {
        if (provider.id === providerId) {
          return {
            ...provider,
            models: provider.models.map(model => {
              if (model.id === modelId) {
                const currentTiers = model.pricingTiers || [];
                const newTiers = currentTiers.includes(tier)
                  ? currentTiers.filter(t => t !== tier)
                  : [...currentTiers, tier];
                
                return { ...model, pricingTiers: newTiers };
              }
              return model;
            })
          };
        }
        return provider;
      })
    );
    
    const model = providers
      .find(p => p.id === providerId)
      ?.models.find(m => m.id === modelId);
    
    const tierIncluded = model?.pricingTiers?.includes(tier);
    
    toast({
      title: "Updated Pricing Tiers",
      description: `Model is now ${tierIncluded ? "removed from" : "included in"} the ${tier} pricing plan.`,
    });
  };

  const handleAddCustomModel = () => {
    toast({
      title: "Add Custom Model",
      description: "This feature will be available soon.",
    });
  };

  const filteredProviders = providers
    .filter(provider => 
      filterProvider === "all" || provider.id === filterProvider
    )
    .map(provider => ({
      ...provider,
      models: provider.models.filter(model => 
        (model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         model.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
         model.modelId.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterCategory === "all" || model.category === filterCategory)
      )
    }))
    .filter(provider => provider.models.length > 0);

  if (loading) {
    return (
      <Card className="border border-border/40">
        <div className="p-6 flex justify-center items-center h-[400px]">
          <div className="flex flex-col items-center">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
            <p className="text-muted-foreground">Loading AI models...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border border-border/40">
        <div className="p-6">
          <div className="flex items-center gap-2 text-destructive mb-4">
            <AlertCircle size={20} />
            <h3 className="font-medium">Error loading AI models</h3>
          </div>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-border/40">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">AI Models</h2>
        <p className="text-muted-foreground mb-4">
          Manage available AI models visible to users within AI chat, AI Editor and AI Writer. 
          Control the selection and presentation of AI models accessible to users during chat interactions.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Only activated AI models are displayed here. Make sure to add your API Keys in the Integrations tab to use all AI Models.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search models..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary/20 transition-colors"
              value={filterProvider}
              onChange={(e) => setFilterProvider(e.target.value)}
            >
              <option value="all">All Providers</option>
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>{provider.name}</option>
              ))}
            </select>
            <select
              className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary/20 transition-colors"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="embedding">Embedding</option>
            </select>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setFilterProvider("all");
              setFilterCategory("all");
            }}>
              Reset
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="border border-border rounded-lg overflow-hidden">
                <div className="bg-secondary/30 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${provider.isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <Bot size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{provider.name}</h3>
                        <Badge variant={provider.isActive ? "default" : "outline"} className="text-xs">
                          {provider.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {provider.models.length} {provider.models.length === 1 ? 'model' : 'models'} available
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!provider.apiKeyConfigured && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleConfigureApiKey(provider.id)}
                      >
                        Configure API Key
                      </Button>
                    )}
                    <Switch 
                      checked={provider.isActive}
                      onCheckedChange={() => handleToggleProviderActive(provider.id)}
                      disabled={!provider.apiKeyConfigured}
                    />
                  </div>
                </div>
                
                <div className="divide-y divide-border">
                  {provider.models.map((model) => (
                    <div key={model.id} className="p-4 hover:bg-secondary/20 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{model.name}</h4>
                            {model.category && (
                              <Badge variant="outline" className="capitalize text-xs">
                                {model.category}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{model.description}</p>
                          <div className="text-xs text-muted-foreground">
                            Model ID: <span className="font-mono">{model.modelId}</span>
                            {model.contextLength && (
                              <span className="ml-4">Context: {(model.contextLength/1000).toLocaleString()}k tokens</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => window.open('https://docs.digihub.ai/models/' + model.modelId, '_blank')}
                          >
                            <span>Docs</span>
                            <ExternalLink size={12} className="ml-1" />
                          </Button>
                          
                          <Switch 
                            checked={model.isActive}
                            onCheckedChange={() => handleToggleModelActive(provider.id, model.id)}
                            disabled={!provider.isActive}
                          />
                        </div>
                      </div>
                      
                      <Accordion type="single" collapsible className="w-full mt-2">
                        <AccordionItem value="pricing" className="border-0">
                          <AccordionTrigger className="py-1 text-xs font-normal hover:no-underline">
                            <span className="text-muted-foreground">View Included Pricing Plans</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-3 gap-2 pt-2">
                              {['basic', 'pro', 'enterprise'].map((tier) => {
                                const isIncluded = model.pricingTiers?.includes(tier);
                                return (
                                  <div 
                                    key={tier} 
                                    className={`
                                      flex items-center justify-between p-2 rounded-md border 
                                      ${isIncluded ? 'border-primary/20 bg-primary/5' : 'border-border'}
                                    `}
                                    onClick={() => handleAddToPricingTier(provider.id, model.id, tier)}
                                  >
                                    <span className="capitalize text-sm">{tier}</span>
                                    <Switch checked={isIncluded || false} />
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredProviders.length === 0 && (
              <div className="text-center p-12 border border-dashed border-border rounded-lg">
                <Bot size={40} className="mx-auto text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg">No models found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="mt-6 p-4 border border-dashed border-border rounded-lg text-center">
          <Button variant="outline" className="gap-2" onClick={handleAddCustomModel}>
            <PlusCircle size={16} />
            <span>Add Custom Model</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIModelsTab;
