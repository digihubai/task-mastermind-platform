
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Bot, Key } from "lucide-react";

const AIModels = () => {
  return (
    <AdminLayout 
      title="AI Models Configuration" 
      description="Configure AI models and API keys for your platform"
    >
      <Tabs defaultValue="openai">
        <TabsList className="mb-6">
          <TabsTrigger value="openai">OpenAI</TabsTrigger>
          <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
          <TabsTrigger value="google">Google AI</TabsTrigger>
          <TabsTrigger value="custom">Custom Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="openai" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-purple-500" />
                <CardTitle>OpenAI Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure OpenAI API keys and model settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    id="openai-key" 
                    type="password" 
                    placeholder="Enter your OpenAI API key"
                    className="flex-1" 
                  />
                  <Button variant="outline">Verify</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your API key is encrypted and stored securely
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-model">Default Model</Label>
                <select 
                  id="default-model" 
                  className="w-full p-2 border rounded-md"
                >
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-streaming">Enable Streaming</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable streaming responses for better user experience
                  </p>
                </div>
                <Switch id="enable-streaming" defaultChecked />
              </div>
              
              <div className="pt-4">
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anthropic" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-blue-500" />
                <CardTitle>Anthropic Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure Anthropic API keys and model settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="anthropic-key">API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    id="anthropic-key" 
                    type="password" 
                    placeholder="Enter your Anthropic API key"
                    className="flex-1" 
                  />
                  <Button variant="outline">Verify</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="anthropic-model">Default Model</Label>
                <select 
                  id="anthropic-model" 
                  className="w-full p-2 border rounded-md"
                >
                  <option value="claude-3-opus">Claude 3 Opus</option>
                  <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                  <option value="claude-3-haiku">Claude 3 Haiku</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="google" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key size={20} className="text-green-500" />
                <CardTitle>Google AI Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure Google AI API keys and model settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="google-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="google-key" 
                      type="password" 
                      placeholder="Enter your Google AI API key"
                      className="flex-1" 
                    />
                    <Button variant="outline">Verify</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="google-model">Default Model</Label>
                  <select 
                    id="google-model" 
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="gemini-pro">Gemini Pro</option>
                    <option value="gemini-ultra">Gemini Ultra</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <Button>Save Configuration</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom AI Models</CardTitle>
              <CardDescription>
                Configure custom AI model endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Custom model configuration coming soon
                </p>
                <Button className="mt-4" disabled>Add Custom Model</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AIModels;
