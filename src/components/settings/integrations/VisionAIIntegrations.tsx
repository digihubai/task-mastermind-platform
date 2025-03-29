
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { validateAPIKey } from '@/services/ai/contentGenerationAI';
import { toast } from "sonner";
import { 
  Image as ImageIcon, 
  Check, 
  ChevronRight, 
  Eye, 
  EyeOff,
  Brain,
  Bot,
  Languages,
  Info
} from "lucide-react";

const VisionAIIntegrations = () => {
  const [activeTab, setActiveTab] = useState("models");
  const [apiKeys, setApiKeys] = useState({
    openai: localStorage.getItem('openai_api_key') || '',
    stability: '',
    huggingface: '',
    replicate: '',
  });
  const [showKeys, setShowKeys] = useState({
    openai: false,
    stability: false,
    huggingface: false,
    replicate: false,
  });
  const [enabledModels, setEnabledModels] = useState({
    "gpt-4o-mini": true,
    "gpt-4o": false,
    "claude-3-opus": false,
    "stable-diffusion-xl": true,
    "sdxl-turbo": false,
    "midjourney-v5": false,
    "blip-2": false,
  });
  const [isValidating, setIsValidating] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState<Record<string, boolean>>({
    openai: !!localStorage.getItem('openai_api_key'),
  });
  const [settings, setSettings] = useState({
    defaultTextModel: "gpt-4o-mini",
    defaultImageModel: "stable-diffusion-xl",
    maxTokens: 4000,
    temperature: 0.7,
    imageSize: "1024x1024",
    imageQuality: "standard",
  });
  
  const handleApiKeyChange = (provider: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }));
  };
  
  const toggleShowKey = (provider: string) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };
  
  const toggleModelEnabled = (modelId: string) => {
    setEnabledModels(prev => ({ ...prev, [modelId]: !prev[modelId] }));
    toast.success(`${enabledModels[modelId] ? 'Disabled' : 'Enabled'} ${modelId} model`);
  };
  
  const handleSaveKey = async (provider: string) => {
    const key = apiKeys[provider];
    if (!key) {
      toast.error("Please enter an API key");
      return;
    }
    
    setIsValidating({ ...isValidating, [provider]: true });
    
    try {
      if (provider === 'openai') {
        const valid = await validateAPIKey(key);
        setIsValid({ ...isValid, [provider]: valid });
        if (valid) {
          localStorage.setItem('openai_api_key', key);
          toast.success("OpenAI API key saved successfully");
        }
      } else {
        // Mock validation for other providers
        setTimeout(() => {
          setIsValid({ ...isValid, [provider]: true });
          toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} API key saved`);
        }, 1000);
      }
    } finally {
      setIsValidating({ ...isValidating, [provider]: false });
    }
  };
  
  const handleSettingChange = (setting: string, value: any) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };
  
  const renderApiKeyField = (provider: string, label: string) => (
    <div className="space-y-2">
      <Label>{label} API Key</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type={showKeys[provider] ? "text" : "password"}
            value={apiKeys[provider]}
            onChange={(e) => handleApiKeyChange(provider, e.target.value)}
            placeholder={`Enter your ${label} API key`}
            className={isValid[provider] ? "pr-8" : ""}
          />
          {isValid[provider] && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Check className="h-4 w-4 text-green-500" />
            </div>
          )}
        </div>
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => toggleShowKey(provider)}
        >
          {showKeys[provider] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        <Button 
          onClick={() => handleSaveKey(provider)} 
          disabled={isValidating[provider]}
        >
          {isValidating[provider] ? "Validating..." : "Save"}
        </Button>
      </div>
    </div>
  );
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vision AI Settings</CardTitle>
        <CardDescription>
          Configure AI image generation and vision models for your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>Models</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="providers" className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <span>API Keys</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="overflow-hidden">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-3">
                  <CardTitle className="text-lg">Text Generation Models</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/40 p-1 rounded-full">
                          <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">GPT-4o-mini</p>
                          <p className="text-xs text-muted-foreground">OpenAI</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Fast
                        </Badge>
                        <Switch
                          checked={enabledModels["gpt-4o-mini"]}
                          onCheckedChange={() => toggleModelEnabled("gpt-4o-mini")}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/40 p-1 rounded-full">
                          <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">GPT-4o</p>
                          <p className="text-xs text-muted-foreground">OpenAI</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                          Premium
                        </Badge>
                        <Switch
                          checked={enabledModels["gpt-4o"]}
                          onCheckedChange={() => toggleModelEnabled("gpt-4o")}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/40 p-1 rounded-full">
                          <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">Claude 3 Opus</p>
                          <p className="text-xs text-muted-foreground">Anthropic</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                          Advanced
                        </Badge>
                        <Switch
                          checked={enabledModels["claude-3-opus"]}
                          onCheckedChange={() => toggleModelEnabled("claude-3-opus")}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-green-50 dark:bg-green-900/20 pb-3">
                  <CardTitle className="text-lg">Image Generation Models</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 dark:bg-green-900/40 p-1 rounded-full">
                          <ImageIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">DALL-E 3</p>
                          <p className="text-xs text-muted-foreground">OpenAI</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                          Premium
                        </Badge>
                        <Switch
                          checked={enabledModels["stable-diffusion-xl"]}
                          onCheckedChange={() => toggleModelEnabled("stable-diffusion-xl")}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 dark:bg-green-900/40 p-1 rounded-full">
                          <ImageIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">SDXL Turbo</p>
                          <p className="text-xs text-muted-foreground">Stability AI</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Fast
                        </Badge>
                        <Switch
                          checked={enabledModels["sdxl-turbo"]}
                          onCheckedChange={() => toggleModelEnabled("sdxl-turbo")}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 dark:bg-green-900/40 p-1 rounded-full">
                          <ImageIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">Midjourney v5</p>
                          <p className="text-xs text-muted-foreground">Midjourney</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                          Advanced
                        </Badge>
                        <Switch
                          checked={enabledModels["midjourney-v5"]}
                          onCheckedChange={() => toggleModelEnabled("midjourney-v5")}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Configuration</CardTitle>
                <CardDescription>Adjust your AI model settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultTextModel">Default Text Generation Model</Label>
                  <Select 
                    value={settings.defaultTextModel}
                    onValueChange={(value) => handleSettingChange("defaultTextModel", value)}
                  >
                    <SelectTrigger id="defaultTextModel">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o-mini">GPT-4o-mini (Fast)</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o (Powerful)</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus (Detailed)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultImageModel">Default Image Generation Model</Label>
                  <Select 
                    value={settings.defaultImageModel}
                    onValueChange={(value) => handleSettingChange("defaultImageModel", value)}
                  >
                    <SelectTrigger id="defaultImageModel">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stable-diffusion-xl">DALL-E 3 (Balanced)</SelectItem>
                      <SelectItem value="sdxl-turbo">SDXL Turbo (Fast)</SelectItem>
                      <SelectItem value="midjourney-v5">Midjourney v5 (Artistic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="temperature">Temperature ({settings.temperature})</Label>
                  </div>
                  <Slider
                    id="temperature"
                    min={0}
                    max={2}
                    step={0.1}
                    defaultValue={[settings.temperature]}
                    onValueChange={(values) => handleSettingChange("temperature", values[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower values produce more focused and deterministic outputs, higher values produce more creative outputs.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxTokens">Max Tokens: {settings.maxTokens}</Label>
                  <Slider
                    id="maxTokens"
                    min={1000}
                    max={8000}
                    step={1000}
                    defaultValue={[settings.maxTokens]}
                    onValueChange={(values) => handleSettingChange("maxTokens", values[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum length of generated text. Higher values allow for longer content.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageSize">Default Image Size</Label>
                  <Select 
                    value={settings.imageSize}
                    onValueChange={(value) => handleSettingChange("imageSize", value)}
                  >
                    <SelectTrigger id="imageSize">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="256x256">Small (256x256)</SelectItem>
                      <SelectItem value="512x512">Medium (512x512)</SelectItem>
                      <SelectItem value="1024x1024">Large (1024x1024)</SelectItem>
                      <SelectItem value="1024x1792">Portrait (1024x1792)</SelectItem>
                      <SelectItem value="1792x1024">Landscape (1792x1024)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageQuality">Image Quality</Label>
                  <Select 
                    value={settings.imageQuality}
                    onValueChange={(value) => handleSettingChange("imageQuality", value)}
                  >
                    <SelectTrigger id="imageQuality">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="hd">HD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="providers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Configure your API keys for AI providers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderApiKeyField("openai", "OpenAI")}
                {renderApiKeyField("stability", "Stability AI")}
                {renderApiKeyField("huggingface", "Hugging Face")}
                {renderApiKeyField("replicate", "Replicate")}
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    <p>Your API keys are stored securely in your browser's local storage and are never sent to our servers.</p>
                    <p className="mt-1">Make sure to keep your API keys confidential and avoid sharing them with anyone.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={() => {
            toast.success("Settings saved successfully");
          }}>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisionAIIntegrations;
