
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomizationStepProps {
  chatbotInfo: {
    title: string;
    bubbleMessage: string;
    welcomeMessage: string;
    instructions: string;
    language: string;
    showLogo: boolean;
    showDateTime: boolean;
    transparentTrigger: boolean;
    triggerSize: number;
    position: "left" | "right";
    color: string;
    avatar: string;
    footerLink: string;
    personality: string;
  };
  setNewChatbotInfo: (info: any) => void;
}

export const CustomizationStep: React.FC<CustomizationStepProps> = ({
  chatbotInfo,
  setNewChatbotInfo,
}) => {
  const [activeTab, setActiveTab] = useState("appearance");
  const navigate = useNavigate();
  
  const handleNavigateToIntegrations = () => {
    navigate('/settings/integrations', { state: { activeTab: 'messaging' } });
  };

  const updateInfo = (key: string, value: any) => {
    setNewChatbotInfo({ ...chatbotInfo, [key]: value });
  };
  
  const avatarOptions = [
    { value: "avatar1", label: "Default" },
    { value: "avatar2", label: "Purple" },
    { value: "avatar3", label: "Green" },
    { value: "avatar4", label: "Orange" },
    { value: "avatar5", label: "Message" },
  ];

  const personalityOptions = [
    { value: "professional", label: "Professional – Formal and business-oriented" },
    { value: "friendly", label: "Friendly – Warm and conversational" },
    { value: "humorous", label: "Humorous – Witty and lighthearted" },
    { value: "supportive", label: "Supportive – Empathetic and patient" },
    { value: "technical", label: "Technical – Detailed and expert-level" },
    { value: "casual", label: "Casual – Relaxed and informal" },
    { value: "sales", label: "Sales-Oriented – Persuasive and proactive" },
    { value: "ai-assistant", label: "AI Assistant – Neutral and informative" },
    { value: "creative", label: "Creative – Imaginative and expressive" },
    { value: "sassy", label: "Sassy – Playful and bold" },
  ];
  
  return (
    <div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-6">
          <div>
            <Label htmlFor="color">Chat Bubble Color</Label>
            <div className="flex items-center mt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[100px] h-[40px] border-2"
                    style={{ backgroundColor: chatbotInfo.color }}
                  >
                    <span className="sr-only">Pick a color</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker
                    color={chatbotInfo.color}
                    onChange={(color) => updateInfo("color", color)}
                  />
                </PopoverContent>
              </Popover>
              <Input
                id="colorHex"
                value={chatbotInfo.color}
                onChange={(e) => updateInfo("color", e.target.value)}
                className="w-[150px] ml-4"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="avatar">Avatar Style</Label>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {avatarOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={chatbotInfo.avatar === option.value ? "default" : "outline"}
                  className="relative h-20 w-full"
                  onClick={() => updateInfo("avatar", option.value)}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs">{option.label}</span>
                  </div>
                  {chatbotInfo.avatar === option.value && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="position">Bubble Position</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Button
                variant={chatbotInfo.position === "left" ? "default" : "outline"}
                className="relative"
                onClick={() => updateInfo("position", "left")}
              >
                Left Side
                {chatbotInfo.position === "left" && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </Button>
              <Button
                variant={chatbotInfo.position === "right" ? "default" : "outline"}
                className="relative"
                onClick={() => updateInfo("position", "right")}
              >
                Right Side
                {chatbotInfo.position === "right" && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="triggerSize">Bubble Size</Label>
              <span className="text-sm text-muted-foreground">{chatbotInfo.triggerSize}px</span>
            </div>
            <Slider
              id="triggerSize"
              min={40}
              max={80}
              step={5}
              value={[chatbotInfo.triggerSize]}
              onValueChange={(values) => updateInfo("triggerSize", values[0])}
              className="mt-2"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="transparentTrigger"
              checked={chatbotInfo.transparentTrigger}
              onCheckedChange={(checked) => updateInfo("transparentTrigger", checked)}
            />
            <Label htmlFor="transparentTrigger">Transparent Bubble</Label>
          </div>
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-6">
          <div>
            <Label htmlFor="welcomeMessage">Welcome Message</Label>
            <Input
              id="welcomeMessage"
              value={chatbotInfo.welcomeMessage}
              onChange={(e) => updateInfo("welcomeMessage", e.target.value)}
              className="mt-2"
              placeholder="Hello! How can I help you today?"
            />
          </div>
          
          <div>
            <Label htmlFor="bubbleMessage">Bubble Message</Label>
            <Input
              id="bubbleMessage"
              value={chatbotInfo.bubbleMessage}
              onChange={(e) => updateInfo("bubbleMessage", e.target.value)}
              className="mt-2"
              placeholder="Hey there, how can I help you?"
            />
          </div>
          
          <div>
            <Label htmlFor="instructions">AI Instructions (Optional)</Label>
            <Input
              id="instructions"
              value={chatbotInfo.instructions}
              onChange={(e) => updateInfo("instructions", e.target.value)}
              className="mt-2"
              placeholder="Instructions for the AI behavior"
            />
          </div>
          
          <div>
            <Label htmlFor="personality">Chatbot Personality</Label>
            <Select 
              value={chatbotInfo.personality} 
              onValueChange={(value) => updateInfo("personality", value)}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select a personality" />
              </SelectTrigger>
              <SelectContent>
                {personalityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="language">Response Language</Label>
            <Select 
              value={chatbotInfo.language} 
              onValueChange={(value) => updateInfo("language", value)}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="showDateTime"
              checked={chatbotInfo.showDateTime}
              onCheckedChange={(checked) => updateInfo("showDateTime", checked)}
            />
            <Label htmlFor="showDateTime">Show Message Timestamps</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="showLogo"
              checked={chatbotInfo.showLogo}
              onCheckedChange={(checked) => updateInfo("showLogo", checked)}
            />
            <Label htmlFor="showLogo">Show DigiHub Branding</Label>
          </div>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Communication Channels</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your chatbot to different communication channels like WhatsApp, SMS, or Facebook Messenger.
            </p>
            <Button 
              variant="outline" 
              className="w-full flex justify-between"
              onClick={handleNavigateToIntegrations}
            >
              <span>Configure Communication Channels</span>
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Knowledge Bases</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your chatbot to external knowledge sources like help docs, FAQs, or knowledge bases.
            </p>
            <Button variant="outline" className="w-full flex justify-between" disabled>
              <span>Configure Knowledge Bases</span>
              <ChevronRight size={16} />
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              This feature will be available soon.
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">CRM Integrations</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your chatbot to CRM platforms like Salesforce, HubSpot, or Zoho.
            </p>
            <Button variant="outline" className="w-full flex justify-between" disabled>
              <span>Configure CRM Integrations</span>
              <ChevronRight size={16} />
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              This feature will be available soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
