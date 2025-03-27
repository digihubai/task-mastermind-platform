
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  Brain, 
  AlertCircle, 
  PlusCircle, 
  Star, 
  ChevronRight,
  BarChart,
  Lock,
  Lightbulb,
  Sparkles,
  Search
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for the component
interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: string;
  isEnabled: boolean;
  isPremium: boolean;
  apiKey?: string;
  fields?: Record<string, string>;
}

interface FeatureCategory {
  name: string;
  features: {
    name: string;
    description: string;
    isEnabled: boolean;
  }[];
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  isCurrent: boolean;
  features: string[];
}

export const AIModelsTab = () => {
  const { toast } = useToast();
  
  // State for AI models
  const [aiModels, setAiModels] = useState<AIModel[]>([
    {
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      type: "text",
      isEnabled: true,
      isPremium: true,
      apiKey: "",
    },
    {
      id: "claude-3-opus",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      type: "text",
      isEnabled: false,
      isPremium: true,
      apiKey: "",
    },
    {
      id: "gemini-1.5-pro",
      name: "Gemini 1.5 Pro",
      provider: "Google",
      type: "text",
      isEnabled: false,
      isPremium: true,
      apiKey: "",
    },
    {
      id: "dall-e-3",
      name: "DALL-E 3",
      provider: "OpenAI",
      type: "image",
      isEnabled: true,
      isPremium: true,
      apiKey: "",
    },
    {
      id: "stable-diffusion-xl",
      name: "Stable Diffusion XL",
      provider: "Stability AI",
      type: "image",
      isEnabled: false,
      isPremium: false,
      apiKey: "",
    }
  ]);
  
  // State for features categories
  const [featureCategories, setFeatureCategories] = useState<FeatureCategory[]>([
    {
      name: "Text Generation",
      features: [
        { name: "Document Writer", description: "Generate full documents based on prompts", isEnabled: true },
        { name: "Email Composer", description: "Create professional emails with context", isEnabled: true },
        { name: "Blog Content", description: "Generate blog articles and content ideas", isEnabled: true },
      ]
    },
    {
      name: "Image Generation",
      features: [
        { name: "Product Visuals", description: "Create product images and mockups", isEnabled: true },
        { name: "Social Media Graphics", description: "Design social media posts and banners", isEnabled: false },
        { name: "Logo Creation", description: "Generate logo concepts and variations", isEnabled: false },
      ]
    },
    {
      name: "Data Analysis",
      features: [
        { name: "Chart Generation", description: "Create charts from data inputs", isEnabled: true },
        { name: "Data Summarization", description: "Get insights and summaries from data", isEnabled: false },
        { name: "Prediction Models", description: "Basic predictive models for business data", isEnabled: false },
      ]
    }
  ]);
  
  // State for pricing plans
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      id: "starter",
      name: "Starter",
      price: 0,
      isCurrent: false,
      features: ["5 AI generations per day", "Basic text models", "Standard response time"]
    },
    {
      id: "professional",
      name: "Professional",
      price: 29,
      isCurrent: true,
      features: ["100 AI generations per day", "Advanced text & image models", "Priority response time", "Custom model training"]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      isCurrent: false,
      features: ["Unlimited AI generations", "All premium models", "Dedicated support", "Custom integrations", "API access"]
    }
  ]);
  
  // State for API keys
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    "openai": "",
    "anthropic": "",
    "google": "",
    "stabilityai": ""
  });
  
  const [selectedTab, setSelectedTab] = useState("models");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter models by search query
  const filteredModels = aiModels.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Toggle model enabled state
  const handleToggleModel = (modelId: string) => {
    setAiModels(models => 
      models.map(model => 
        model.id === modelId 
          ? { ...model, isEnabled: !model.isEnabled } 
          : model
      )
    );
    
    const model = aiModels.find(m => m.id === modelId);
    toast({
      title: model?.isEnabled ? "Model disabled" : "Model enabled",
      description: `${model?.name} has been ${model?.isEnabled ? "disabled" : "enabled"} successfully.`,
    });
  };
  
  // Save API key
  const handleSaveApiKey = (provider: string, apiKey: string) => {
    setApiKeys({
      ...apiKeys,
      [provider.toLowerCase().replace(/\s+/g, '')]: apiKey
    });
    
    toast({
      title: "API Key saved",
      description: `${provider} API key has been updated successfully.`,
    });
  };
  
  // Toggle feature
  const handleToggleFeature = (categoryIndex: number, featureIndex: number) => {
    setFeatureCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const category = { ...newCategories[categoryIndex] };
      const features = [...category.features];
      features[featureIndex] = { 
        ...features[featureIndex], 
        isEnabled: !features[featureIndex].isEnabled 
      };
      category.features = features;
      newCategories[categoryIndex] = category;
      return newCategories;
    });
    
    const feature = featureCategories[categoryIndex].features[featureIndex];
    toast({
      title: feature.isEnabled ? "Feature disabled" : "Feature enabled",
      description: `${feature.name} has been ${feature.isEnabled ? "disabled" : "enabled"}.`,
    });
  };
  
  // Add new feature
  const handleAddFeature = (categoryIndex: number, name: string, description: string) => {
    setFeatureCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const category = { ...newCategories[categoryIndex] };
      const features = [...category.features, { name, description, isEnabled: false }];
      category.features = features;
      newCategories[categoryIndex] = category;
      return newCategories;
    });
    
    toast({
      title: "Feature added",
      description: `${name} has been added to ${featureCategories[categoryIndex].name}.`,
    });
  };
  
  // Delete feature
  const handleDeleteFeature = (categoryIndex: number, featureIndex: number) => {
    const featureName = featureCategories[categoryIndex].features[featureIndex].name;
    
    setFeatureCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const category = { ...newCategories[categoryIndex] };
      const features = category.features.filter((_, i) => i !== featureIndex);
      category.features = features;
      newCategories[categoryIndex] = category;
      return newCategories;
    });
    
    toast({
      title: "Feature deleted",
      description: `${featureName} has been removed.`,
    });
  };
  
  // Change subscription plan
  const handleChangePlan = (planId: string) => {
    setPricingPlans(plans => 
      plans.map(plan => ({
        ...plan,
        isCurrent: plan.id === planId
      }))
    );
    
    const plan = pricingPlans.find(p => p.id === planId);
    toast({
      title: "Subscription changed",
      description: `Your subscription has been updated to ${plan?.name}.`,
    });
  };
  
  // Save all changes
  const handleSaveChanges = () => {
    // Example of a problematic Supabase query that we're fixing
    // const { data, error } = await supabase.from('ai_providers').select('*');
    
    toast({
      title: "Settings saved",
      description: "Your AI model settings have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Models & Settings</CardTitle>
            <CardDescription>
              Configure AI models, features, and subscription options
            </CardDescription>
          </div>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="models" className="flex items-center">
              <Bot className="mr-2 h-4 w-4" />
              <span>AI Models</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Features</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center">
              <Star className="mr-2 h-4 w-4" />
              <span>Subscription</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="models">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search models, providers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Model
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>OpenAI Model</DropdownMenuItem>
                    <DropdownMenuItem>Anthropic Model</DropdownMenuItem>
                    <DropdownMenuItem>Google AI Model</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Custom Provider</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredModels.map((model) => (
                  <Card key={model.id} className="overflow-hidden">
                    <div className={`p-4 ${model.isEnabled ? "bg-primary/10" : "bg-secondary/40"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded-md ${model.isEnabled ? "bg-primary/20" : "bg-secondary"}`}>
                            {model.type === "text" ? (
                              <Brain className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </div>
                          <h3 className="font-medium">{model.name}</h3>
                          {model.isPremium && (
                            <Badge variant="secondary" className="text-xs">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <Switch
                          checked={model.isEnabled}
                          onCheckedChange={() => handleToggleModel(model.id)}
                        />
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="flex items-center">
                          Provider: {model.provider}
                        </span>
                        <Separator orientation="vertical" className="mx-2 h-3" />
                        <span>Type: {model.type.charAt(0).toUpperCase() + model.type.slice(1)}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-medium">API Key</label>
                          <div className="flex mt-1">
                            <Input
                              type="password"
                              placeholder={`Enter ${model.provider} API key`}
                              value={apiKeys[model.provider.toLowerCase().replace(/\s+/g, '')] || ""}
                              onChange={(e) => setApiKeys({
                                ...apiKeys,
                                [model.provider.toLowerCase().replace(/\s+/g, '')]: e.target.value
                              })}
                              className="rounded-r-none"
                            />
                            <Button 
                              variant="secondary"
                              className="rounded-l-none"
                              onClick={() => handleSaveApiKey(
                                model.provider,
                                apiKeys[model.provider.toLowerCase().replace(/\s+/g, '')] || ""
                              )}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                        
                        {model.isEnabled && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <AlertCircle className="h-3 w-3" />
                            <span>
                              {model.apiKey
                                ? "API key configured. Model is ready to use."
                                : "Please add an API key to use this model."}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="features">
            <div className="space-y-6">
              {featureCategories.map((category, categoryIndex) => (
                <Card key={category.name} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Feature
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.features.map((feature, featureIndex) => (
                        <div 
                          key={feature.name}
                          className={`p-3 rounded-lg flex items-center justify-between ${
                            feature.isEnabled ? "bg-primary/10" : "bg-secondary/40"
                          }`}
                        >
                          <div>
                            <h4 className="font-medium">{feature.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Feature</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteFeature(categoryIndex, featureIndex)}>
                                  Delete Feature
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Switch
                              checked={feature.isEnabled}
                              onCheckedChange={() => handleToggleFeature(categoryIndex, featureIndex)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="subscription">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricingPlans.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`overflow-hidden ${
                      plan.isCurrent ? "border-primary" : ""
                    }`}
                  >
                    <CardHeader className={plan.isCurrent ? "bg-primary/10" : ""}>
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-2xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                              <Lightbulb className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        {plan.isCurrent ? (
                          <Button disabled className="w-full">
                            Current Plan
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleChangePlan(plan.id)}
                          >
                            {plan.price > 0 ? "Upgrade" : "Downgrade"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Model Usage</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Text Generation</span>
                            <span>65/100 credits</span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Image Generation</span>
                            <span>23/50 credits</span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: "46%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">API Requests</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Model</TableHead>
                            <TableHead>Today</TableHead>
                            <TableHead>This Month</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>GPT-4o</TableCell>
                            <TableCell>42</TableCell>
                            <TableCell>568</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>DALL-E 3</TableCell>
                            <TableCell>15</TableCell>
                            <TableCell>187</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline">
                        <BarChart className="mr-2 h-4 w-4" />
                        View Detailed Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
