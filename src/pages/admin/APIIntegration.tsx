
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileCode, Bot, Info, Sparkles, Grid, MessageSquare, Database, BrainCircuit, AlertCircle, Cpu, Zap } from "lucide-react";
import { toast } from "sonner";
import AIIntegrations from "@/components/settings/integrations/AIIntegrations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";

const APIIntegration = () => {
  const [activeTab, setActiveTab] = useState<string>("ai-models");
  const { toast: uiToast } = useToast();
  const [showIntegrationSuccess, setShowIntegrationSuccess] = useState(false);

  const handleApiIntegration = () => {
    setShowIntegrationSuccess(true);
    toast.success("API Integration Updated", {
      description: "Your changes have been saved successfully.",
    });
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all API integration settings? This cannot be undone.")) {
      toast.success("Settings Reset", {
        description: "All API integration settings have been reset to default values.",
      });
      setShowIntegrationSuccess(false);
    }
  };

  const handleOpenAIApiKeyUpdate = (value: string) => {
    if (value.startsWith("sk-")) {
      localStorage.setItem("openai_api_key", value);
      toast.success("OpenAI API Key Updated", {
        description: "Your API key has been saved and will be used for AI features.",
      });
    } else {
      uiToast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key starting with 'sk-'",
        variant: "destructive"
      });
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">API Integration</h1>
          <p className="text-muted-foreground mt-1">
            Manage API integrations and third-party connections
          </p>
        </div>

        <Tabs defaultValue={activeTab} className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="ai-models">AI Models</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-models" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Model Integrations
                </CardTitle>
                <CardDescription>
                  Connect to various AI models and services to enhance your platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIIntegrations 
                  onIntegrationToggle={(id, category) => {
                    toast.success(`${id} ${category} integration updated`);
                    handleApiIntegration();
                  }}
                  onApiKeyUpdate={(id, value) => {
                    if (id === "openai") {
                      handleOpenAIApiKeyUpdate(value);
                    } else {
                      toast.success(`${id} API key updated`);
                    }
                    handleApiIntegration();
                  }}
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" onClick={handleResetSettings}>Reset Settings</Button>
                <Button onClick={handleApiIntegration}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            {showIntegrationSuccess && (
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-600 dark:text-green-400">
                  AI model integrations have been updated successfully. You can now use these models throughout the platform.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="api-keys" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  API Authentication
                </CardTitle>
                <CardDescription>
                  Manage your API keys and authentication tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Platform API Keys</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <div className="flex gap-2">
                        <Input type="password" id="api-key" value="••••••••••••••••••••••••••••••" readOnly className="font-mono text-sm flex-1" />
                        <Button variant="outline" size="sm">Show</Button>
                        <Button variant="outline" size="sm">Copy</Button>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="api-secret">API Secret</Label>
                      <div className="flex gap-2">
                        <Input type="password" id="api-secret" value="••••••••••••••••••••••••••••••" readOnly className="font-mono text-sm flex-1" />
                        <Button variant="outline" size="sm">Show</Button>
                        <Button variant="outline" size="sm">Copy</Button>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">API Access Control</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="restrict-origins" className="mb-1 block">Restrict to Origins</Label>
                        <p className="text-sm text-muted-foreground">Limit API access to specific domains</p>
                      </div>
                      <Switch id="restrict-origins" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="allowed-origins">Allowed Origins</Label>
                      <Input id="allowed-origins" placeholder="https://example.com, https://app.example.com" />
                      <p className="text-xs text-muted-foreground">Comma separated list of allowed domains</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="rate-limiting" className="mb-1 block">Rate Limiting</Label>
                        <p className="text-sm text-muted-foreground">Limit requests per minute</p>
                      </div>
                      <Switch id="rate-limiting" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
                      <Input id="rate-limit" type="number" defaultValue="100" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline">Reset</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  API Usage Analytics
                </CardTitle>
                <CardDescription>
                  Track and monitor your API usage across all integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Total API Calls</p>
                        <p className="text-2xl font-bold">24,583</p>
                        <p className="text-xs text-green-500">+12.3% from last month</p>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">AI Model Usage</p>
                        <p className="text-2xl font-bold">8,345</p>
                        <p className="text-xs text-green-500">+28.7% from last month</p>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">API Credits</p>
                        <p className="text-2xl font-bold">75%</p>
                        <p className="text-xs text-muted-foreground">15,000/20,000 remaining</p>
                      </div>
                    </Card>
                  </div>
                  
                  <Accordion type="single" collapsible>
                    <AccordionItem value="usage-breakdown">
                      <AccordionTrigger>Usage Breakdown</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="overflow-hidden border rounded-lg">
                            <div className="bg-secondary/50 text-sm font-medium grid grid-cols-12 p-3 border-b">
                              <div className="col-span-4">Integration</div>
                              <div className="col-span-2 text-center">Calls</div>
                              <div className="col-span-2 text-center">Usage</div>
                              <div className="col-span-2 text-center">Quota</div>
                              <div className="col-span-2 text-center">Cost</div>
                            </div>
                            
                            <div className="divide-y">
                              {[
                                { name: "OpenAI", calls: 4328, usage: "76%", quota: "5,000", cost: "$192.45" },
                                { name: "Anthropic Claude", calls: 1542, usage: "38%", quota: "4,000", cost: "$78.32" },
                                { name: "Stability AI", calls: 872, usage: "29%", quota: "3,000", cost: "$43.60" },
                                { name: "Pinecone", calls: 1623, usage: "54%", quota: "3,000", cost: "$32.46" }
                              ].map((item, i) => (
                                <div key={i} className="grid grid-cols-12 p-3 text-sm hover:bg-secondary/20 transition-colors">
                                  <div className="col-span-4 font-medium">{item.name}</div>
                                  <div className="col-span-2 text-center">{item.calls}</div>
                                  <div className="col-span-2 text-center">{item.usage}</div>
                                  <div className="col-span-2 text-center">{item.quota}</div>
                                  <div className="col-span-2 text-center">{item.cost}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your AI model usage is approaching the monthly quota. Consider upgrading your plan to avoid service interruptions.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default APIIntegration;
