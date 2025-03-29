
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertCircle, Check, Bot, Image as ImageIcon, Sparkles, MessageSquare, Copy, Eye, EyeOff } from "lucide-react";
import { setOpenAIApiKey, getOpenAIApiKey, validateAPIKey } from '@/services/ai/contentGenerationAI';
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface AIKeyConfigProps {
  onValidKeySet?: () => void;
}

const AIKeyConfig: React.FC<AIKeyConfigProps> = ({ onValidKeySet }) => {
  // API keys state
  const [apiKeys, setApiKeys] = useState({
    openai: getOpenAIApiKey() || '',
    anthropic: '',
    gemini: '',
    deepseek: '',
  });
  
  // UI states
  const [activeTab, setActiveTab] = useState("openai");
  const [isValidating, setIsValidating] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState<Record<string, boolean>>({
    openai: !!getOpenAIApiKey(),
    anthropic: false,
    gemini: false,
    deepseek: false,
  });
  const [showKey, setShowKey] = useState<Record<string, boolean>>({
    openai: false,
    anthropic: false,
    gemini: false,
    deepseek: false,
  });
  
  // Model settings
  const [settings, setSettings] = useState({
    defaultTextModel: "gpt-4o-mini",
    defaultImageModel: "dall-e-3",
    temperature: 0.7,
    maxTokens: 2000,
    defaultTone: "professional",
    defaultLanguage: "English",
    hideDallE: false,
    hideCreativity: false,
    hideTone: false,
    hideLength: false,
    imageEngine: "unsplash",
    userApiKeyOption: false,
    customTemplatesOption: false,
    aiFeatures: {
      copywriter: true,
      editor: true,
      image: true,
      chat: true,
      code: false,
      speechToText: false,
      voiceover: false,
      articleWizard: true,
      vision: true,
      rewriter: true
    }
  });
  
  // Handle API key change
  const handleApiKeyChange = (provider: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }));
  };
  
  // Toggle show/hide API key
  const toggleShowKey = (provider: string) => {
    setShowKey(prev => ({ ...prev, [provider]: !prev[provider] }));
  };
  
  // Save and validate API key
  const handleSaveKey = async (provider: string) => {
    const key = apiKeys[provider];
    if (!key) {
      toast.error(`Please enter a valid ${provider.charAt(0).toUpperCase() + provider.slice(1)} API key`);
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
          
          if (onValidKeySet) {
            onValidKeySet();
          }
        }
      } else {
        // Mock validation for other providers (would be real in production)
        setTimeout(() => {
          setIsValid({ ...isValid, [provider]: true });
          localStorage.setItem(`${provider}_api_key`, key);
          toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} API key saved successfully`);
        }, 800);
      }
    } catch (error) {
      toast.error(`Error validating ${provider} API key`);
      setIsValid({ ...isValid, [provider]: false });
    } finally {
      setIsValidating({ ...isValidating, [provider]: false });
    }
  };
  
  // Toggle feature setting
  const toggleFeature = (feature: string) => {
    setSettings(prev => ({
      ...prev,
      aiFeatures: {
        ...prev.aiFeatures,
        [feature]: !prev.aiFeatures[feature]
      }
    }));
  };
  
  // Handle setting change
  const handleSettingChange = (setting: string, value: any) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };
  
  // Save all settings
  const handleSaveAllSettings = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('ai_settings', JSON.stringify(settings));
    toast.success("All AI settings saved successfully");
  };
  
  // Render API key input field
  const renderApiKeyField = (provider: string, label: string) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{label} API Key</Label>
        {isValid[provider] && (
          <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
            Validated
          </Badge>
        )}
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type={showKey[provider] ? "text" : "password"}
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
          {showKey[provider] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        <Button 
          onClick={() => handleSaveKey(provider)} 
          disabled={isValidating[provider]}
        >
          {isValidating[provider] ? "Validating..." : "Save"}
        </Button>
      </div>
      {provider === 'openai' && (
        <p className="text-xs text-muted-foreground mt-1">
          Format: sk-... You can get this from the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI website</a>.
        </p>
      )}
    </div>
  );
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="openai" className="flex items-center gap-1">
            <Bot className="h-4 w-4" />
            <span>OpenAI</span>
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            <span>Models</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>Features</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-1">
            <ImageIcon className="h-4 w-4" />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="openai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>OpenAI Configuration</CardTitle>
              <CardDescription>
                Connect to OpenAI's API for AI content generation, chat, and image generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderApiKeyField('openai', 'OpenAI')}
              
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label>Default Text Model</Label>
                  <Select 
                    value={settings.defaultTextModel}
                    onValueChange={(value) => handleSettingChange("defaultTextModel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o (Most Capable)</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fast & Affordable)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Default Image Model</Label>
                  <Select 
                    value={settings.defaultImageModel}
                    onValueChange={(value) => handleSettingChange("defaultImageModel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dall-e-3">DALL-E 3 (High Quality)</SelectItem>
                      <SelectItem value="dall-e-2">DALL-E 2 (Faster)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Temperature: {settings.temperature}</Label>
                  </div>
                  <Slider
                    min={0}
                    max={2}
                    step={0.1}
                    value={[settings.temperature]}
                    onValueChange={(values) => handleSettingChange("temperature", values[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower = more focused, Higher = more creative
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-300">
                  <p className="font-medium">Important</p>
                  <p className="mt-1">Your OpenAI API key must have sufficient credits and billing configured to use these features.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Settings</CardTitle>
              <CardDescription>
                Configure model behavior and defaults
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Maximum Token Output</Label>
                  <Select 
                    value={settings.maxTokens.toString()}
                    onValueChange={(value) => handleSettingChange("maxTokens", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select token limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500">500 tokens (Short)</SelectItem>
                      <SelectItem value="1000">1,000 tokens (Medium)</SelectItem>
                      <SelectItem value="2000">2,000 tokens (Standard)</SelectItem>
                      <SelectItem value="4000">4,000 tokens (Extended)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Maximum length for AI-generated content
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Default Tone</Label>
                  <Select 
                    value={settings.defaultTone}
                    onValueChange={(value) => handleSettingChange("defaultTone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select 
                    value={settings.defaultLanguage}
                    onValueChange={(value) => handleSettingChange("defaultLanguage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English (US)</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Hide DALL-E from Image Generation</h3>
                    <p className="text-sm text-muted-foreground">Disable DALL-E as an option in image generation</p>
                  </div>
                  <Switch 
                    checked={settings.hideDallE} 
                    onCheckedChange={(checked) => handleSettingChange("hideDallE", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Hide Creativity Option</h3>
                    <p className="text-sm text-muted-foreground">Remove the creativity control from AI interfaces</p>
                  </div>
                  <Switch 
                    checked={settings.hideCreativity} 
                    onCheckedChange={(checked) => handleSettingChange("hideCreativity", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Hide Tone Selection</h3>
                    <p className="text-sm text-muted-foreground">Always use the default tone</p>
                  </div>
                  <Switch 
                    checked={settings.hideTone} 
                    onCheckedChange={(checked) => handleSettingChange("hideTone", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Features</CardTitle>
              <CardDescription>
                Enable or disable AI capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AI Copywriter</h3>
                    <p className="text-sm text-muted-foreground">Generate marketing copy and content</p>
                  </div>
                  <Switch 
                    checked={settings.aiFeatures.copywriter} 
                    onCheckedChange={() => toggleFeature("copywriter")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Advanced AI Editor</h3>
                    <p className="text-sm text-muted-foreground">Enhanced editing capabilities with AI</p>
                  </div>
                  <Switch 
                    checked={settings.aiFeatures.editor} 
                    onCheckedChange={() => toggleFeature("editor")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AI Image Generation</h3>
                    <p className="text-sm text-muted-foreground">Create images with AI</p>
                  </div>
                  <Switch 
                    checked={settings.aiFeatures.image} 
                    onCheckedChange={() => toggleFeature("image")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AI Chat</h3>
                    <p className="text-sm text-muted-foreground">Interactive AI conversations</p>
                  </div>
                  <Switch 
                    checked={settings.aiFeatures.chat} 
                    onCheckedChange={() => toggleFeature("chat")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AI Code Generator</h3>
                    <p className="text-sm text-muted-foreground">Generate code snippets</p>
                  </div>
                  <Switch 
                    checked={settings.aiFeatures.code} 
                    onCheckedChange={() => toggleFeature("code")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Speech to Text</h3>
                    <p className="text-sm text-muted-foreground">Convert speech to written text</p>
                  </div>
                  <Switch 
                    checked={settings.aiFeatures.speechToText} 
                    onCheckedChange={() => toggleFeature("speechToText")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AI Article Wizard</h3>
                    <p className="text-sm text-muted-foreground">Complete article creation workflow</p>
                  </div>
                  <Switch 
                    checked={settings.aiFeatures.articleWizard} 
                    onCheckedChange={() => toggleFeature("articleWizard")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AI Vision</h3>
                    <p className="text-sm text-muted-foreground">Image analysis and understanding</p>
                  </div>
                  <Switch 
                    checked={settings.aiFeatures.vision} 
                    onCheckedChange={() => toggleFeature("vision")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AI Rewriter</h3>
                    <p className="text-sm text-muted-foreground">Revise and improve existing content</p>
                  </div>
                  <Switch 
                    checked={settings.aiFeatures.rewriter} 
                    onCheckedChange={() => toggleFeature("rewriter")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Advanced configuration options for AI integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Image Source Engine</Label>
                  <Select 
                    value={settings.imageEngine}
                    onValueChange={(value) => handleSettingChange("imageEngine", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select image source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unsplash">Unsplash</SelectItem>
                      <SelectItem value="pexels">Pexels</SelectItem>
                      <SelectItem value="pixabay">Pixabay</SelectItem>
                      <SelectItem value="dall-e">DALL-E</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Default source for images when not using AI generation
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <h3 className="font-medium">User API Key Option</h3>
                    <p className="text-sm text-muted-foreground">Allow users to enter their own API keys</p>
                  </div>
                  <Switch 
                    checked={settings.userApiKeyOption} 
                    onCheckedChange={(checked) => handleSettingChange("userApiKeyOption", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <h3 className="font-medium">Custom Templates</h3>
                    <p className="text-sm text-muted-foreground">Let users create their own AI templates</p>
                  </div>
                  <Switch 
                    checked={settings.customTemplatesOption} 
                    onCheckedChange={(checked) => handleSettingChange("customTemplatesOption", checked)}
                  />
                </div>
              </div>
              
              {renderApiKeyField('anthropic', 'Anthropic')}
              {renderApiKeyField('gemini', 'Google Gemini')}
              {renderApiKeyField('deepseek', 'DeepSeek')}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveAllSettings}>Save All Settings</Button>
      </div>
    </div>
  );
};

export default AIKeyConfig;
