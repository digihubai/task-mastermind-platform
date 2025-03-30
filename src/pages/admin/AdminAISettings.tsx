
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { 
  Bot, AlertCircle, BarChart3, Settings, Image, 
  MessageSquare, FileText, Code, Speech, VolumeX, Mic,
  Share2, FileEdit, Youtube, Rss, Wand, Users, PanelLeft,
  Library, Film, WifiOff
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useRoleBasedSettings from "@/hooks/use-role-based-settings";
import { Button } from "@/components/ui/button";
import AIKeyConfig from "@/components/settings/integrations/AIKeyConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getOpenAIApiKey } from "@/services/ai/contentGenerationAI";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import AdminLayout from "@/components/layout/AdminLayout";

const AdminAISettings = () => {
  const { userRole, hasAccess } = useRoleBasedSettings();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("apikeys");
  const [hasConfiguredKey, setHasConfiguredKey] = useState(!!getOpenAIApiKey());
  const [defaultAIEngine, setDefaultAIEngine] = useState("OpenAI");
  const [imageEngine, setImageEngine] = useState("Unsplash");
  const [listLayout, setListLayout] = useState("Grid");
  const [maxOutputLength, setMaxOutputLength] = useState(400);
  const [maxInputLength, setMaxInputLength] = useState(400);
  const [language, setLanguage] = useState("English (USA)");
  const [toneOfVoice, setToneOfVoice] = useState("Funny");
  const [creativity, setCreativity] = useState("Good");
  
  const [features, setFeatures] = useState({
    aiCopywriter: true,
    aiAdvancedEditor: true,
    aiImage: true,
    imageToVideo: true,
    aiChat: true,
    aiCode: true,
    speechToText: true,
    aiVoiceover: true,
    affiliates: true,
    articleWizard: true,
    aiVision: true,
    chatImage: true,
    pdfInsight: true,
    aiRewriter: true,
    aiYouTube: false,
    aiRSS: false,
    aiVoiceClone: false,
    teamFunctionality: true,
    chatSetting: true,
    aiChatPromptLibrary: true,
    aiImagePromptLibrary: true,
    aiVoiceIsolator: false
  });
  
  useEffect(() => {
    if (!hasAccess("ai_models")) {
      toast.error("You don't have permission to access this page");
      navigate("/dashboard");
    }
  }, [hasAccess, navigate]);

  const handleValidKeySet = () => {
    setHasConfiguredKey(true);
    toast.success("AI configuration has been updated");
  };

  const handleFeatureToggle = (feature) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
    toast.success(`${feature} setting updated`);
  };

  const handleSaveSettings = () => {
    toast.success("AI settings saved successfully");
  };

  const renderFeatureToggle = (featureKey, label) => (
    <div className="flex items-center justify-between border-b py-3">
      <Label htmlFor={`toggle-${featureKey}`} className="flex-1">
        {label}
      </Label>
      <Switch
        id={`toggle-${featureKey}`}
        checked={features[featureKey]}
        onCheckedChange={() => handleFeatureToggle(featureKey)}
      />
    </div>
  );

  return (
    <AdminLayout
      title="AI Settings Configuration"
      description="Configure AI models and API keys for your organization"
    >
      <div className="space-y-6">
        {!hasConfiguredKey && (
          <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle>API Key Required</AlertTitle>
            <AlertDescription>
              To enable AI-powered features, you need to configure at least one API key. We recommend starting with OpenAI.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-1">
            <TabsTrigger value="apikeys">AI Providers</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="settings">General Settings</TabsTrigger>
            <TabsTrigger value="models">Model Configuration</TabsTrigger>
            <TabsTrigger value="usage">Usage & Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apikeys" className="space-y-6">
            <AIKeyConfig onValidKeySet={handleValidKeySet} />
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Additional AI Providers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Anthropic</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure Claude API for advanced reasoning tasks
                  </p>
                  <Input placeholder="Enter Anthropic API Key" type="password" className="mb-2" />
                  <Button size="sm" variant="secondary">Save Key</Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Google Gemini</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure Google AI for multimodal capabilities
                  </p>
                  <Input placeholder="Enter Google API Key" type="password" className="mb-2" />
                  <Button size="sm" variant="secondary">Save Key</Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Stability AI</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure Stable Diffusion for image generation
                  </p>
                  <Input placeholder="Enter Stability AI Key" type="password" className="mb-2" />
                  <Button size="sm" variant="secondary">Save Key</Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Serper API</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure Serper for real-time search capabilities
                  </p>
                  <Input placeholder="Enter Serper API Key" type="password" className="mb-2" />
                  <Button size="sm" variant="secondary">Save Key</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Feature Management</h2>
              <p className="text-muted-foreground mb-6">
                Enable or disable AI features for your organization
              </p>
              
              <div className="space-y-1">
                {renderFeatureToggle("aiCopywriter", "AI Copywriter")}
                {renderFeatureToggle("aiAdvancedEditor", "AI Advanced Editor")}
                {renderFeatureToggle("aiImage", "AI Image")}
                {renderFeatureToggle("imageToVideo", "Image to Video")}
                {renderFeatureToggle("aiChat", "AI Chat")}
                {renderFeatureToggle("aiCode", "AI Code")}
                {renderFeatureToggle("speechToText", "AI Speech to Text")}
                {renderFeatureToggle("aiVoiceover", "AI Voiceover")}
                {renderFeatureToggle("affiliates", "Affiliates")}
                {renderFeatureToggle("articleWizard", "Article Wizard")}
                {renderFeatureToggle("aiVision", "AI Vision")}
                {renderFeatureToggle("chatImage", "Chat Image")}
                {renderFeatureToggle("pdfInsight", "PDF Insight")}
                {renderFeatureToggle("aiRewriter", "AI Rewriter")}
                {renderFeatureToggle("aiYouTube", "AI YouTube")}
                {renderFeatureToggle("aiRSS", "AI RSS")}
                {renderFeatureToggle("aiVoiceClone", "AI Voice Clone")}
                {renderFeatureToggle("teamFunctionality", "Team Functionality")}
                {renderFeatureToggle("chatSetting", "Chat Setting (Extension)")}
                {renderFeatureToggle("aiChatPromptLibrary", "AI Chat Prompt Library")}
                {renderFeatureToggle("aiImagePromptLibrary", "AI Image Prompt Library")}
                {renderFeatureToggle("aiVoiceIsolator", "AI Voice Isolator")}
              </div>
              
              <Button onClick={handleSaveSettings} className="mt-6 w-full">
                Save Feature Settings
              </Button>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">General AI Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultAIEngine">Default AI Engine</Label>
                  <Select value={defaultAIEngine} onValueChange={setDefaultAIEngine}>
                    <SelectTrigger id="defaultAIEngine">
                      <SelectValue placeholder="Select AI Engine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OpenAI">OpenAI</SelectItem>
                      <SelectItem value="Anthropic">Anthropic</SelectItem>
                      <SelectItem value="GoogleAI">Google AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageEngine">Article Wizard Default Image Engine</Label>
                  <Select value={imageEngine} onValueChange={setImageEngine}>
                    <SelectTrigger id="imageEngine">
                      <SelectValue placeholder="Select Image Engine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unsplash">Unsplash</SelectItem>
                      <SelectItem value="StableDiffusion">Stable Diffusion</SelectItem>
                      <SelectItem value="DALLE">DALL-E</SelectItem>
                      <SelectItem value="Pexels">Pexels</SelectItem>
                      <SelectItem value="Pixabay">Pixabay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="listLayout">AI Chat Bots List Layout</Label>
                  <Select value={listLayout} onValueChange={setListLayout}>
                    <SelectTrigger id="listLayout">
                      <SelectValue placeholder="Select Layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grid">Grid</SelectItem>
                      <SelectItem value="List">List</SelectItem>
                      <SelectItem value="Compact">Compact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <Label htmlFor="maxOutput">Maximum Output Length: {maxOutputLength}</Label>
                  </div>
                  <Slider 
                    id="maxOutput"
                    value={[maxOutputLength]}
                    onValueChange={(value) => setMaxOutputLength(value[0])}
                    min={100}
                    max={2000}
                    step={50}
                  />
                  <p className="text-xs text-muted-foreground">
                    In words. OpenAI has token limits for each model.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <Label htmlFor="maxInput">Maximum Input Length: {maxInputLength}</Label>
                  </div>
                  <Slider 
                    id="maxInput"
                    value={[maxInputLength]}
                    onValueChange={(value) => setMaxInputLength(value[0])}
                    min={100}
                    max={1000}
                    step={50}
                  />
                  <p className="text-xs text-muted-foreground">
                    In characters.
                  </p>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full">Save Settings</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="models" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">OpenAI Model Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English (USA)">English (USA)</SelectItem>
                      <SelectItem value="English (UK)">English (UK)</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="toneOfVoice">Default Tone of Voice</Label>
                  <Select value={toneOfVoice} onValueChange={setToneOfVoice}>
                    <SelectTrigger id="toneOfVoice">
                      <SelectValue placeholder="Select Tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Funny">Funny</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Casual">Casual</SelectItem>
                      <SelectItem value="Excited">Excited</SelectItem>
                      <SelectItem value="Formal">Formal</SelectItem>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch id="hideToneOption" />
                    <Label htmlFor="hideToneOption">Hide Tone of Voice Option</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="creativity">Default Creativity</Label>
                  <Select value={creativity} onValueChange={setCreativity}>
                    <SelectTrigger id="creativity">
                      <SelectValue placeholder="Select Creativity Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch id="hideCreativityOption" />
                    <Label htmlFor="hideCreativityOption">Hide Creativity Option</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="openaiModel">Default OpenAI Model</Label>
                  <Select defaultValue="gpt-4o-mini">
                    <SelectTrigger id="openaiModel">
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o (Powerful, multimodal)</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o mini (Affordable, capable)</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast, economical)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dalleModel">Default DALL-E Model</Label>
                  <Select defaultValue="dall-e-3">
                    <SelectTrigger id="dalleModel">
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dall-e-3">DALL-E 3 (Latest, high quality)</SelectItem>
                      <SelectItem value="dall-e-2">DALL-E 2 (Faster, economical)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch id="hideDalleOption" />
                    <Label htmlFor="hideDalleOption">Hide DALL-E from AI Image</Label>
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings} className="w-full">Save Model Settings</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Usage Analytics</h2>
                  <p className="text-muted-foreground text-sm">Monitor your AI API usage and costs</p>
                </div>
              </div>
              
              {hasConfiguredKey ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h3 className="font-medium">API Calls</h3>
                      <p className="text-2xl font-bold mt-2">3,421</p>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="font-medium">Estimated Cost</h3>
                      <p className="text-2xl font-bold mt-2">$12.85</p>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="font-medium">Token Usage</h3>
                      <p className="text-2xl font-bold mt-2">1.2M</p>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </Card>
                  </div>
                  
                  <div className="h-60 bg-muted/30 rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground text-center">
                      Usage chart will appear here
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="font-medium mb-2">Top AI Features</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>AI Writer</span>
                          <span>42%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>AI Chat</span>
                          <span>28%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>AI Images</span>
                          <span>15%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>SEO Tools</span>
                          <span>10%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Others</span>
                          <span>5%</span>
                        </li>
                      </ul>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="font-medium mb-2">Top Users</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>john@example.com</span>
                          <span>2,105 requests</span>
                        </li>
                        <li className="flex justify-between">
                          <span>sarah@example.com</span>
                          <span>854 requests</span>
                        </li>
                        <li className="flex justify-between">
                          <span>mike@example.com</span>
                          <span>462 requests</span>
                        </li>
                      </ul>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed rounded-md">
                  <p className="text-muted-foreground">Usage analytics will be available after you've used the AI services</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab("apikeys")}
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    Set Up AI Provider
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAISettings;
