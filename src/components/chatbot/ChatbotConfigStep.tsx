
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PlusCircle, Smartphone, MessageCircle, ShoppingCart, UserCircle, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface ChatbotConfigStepProps {
  step: number;
  newChatbotInfo: {
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
  };
  setNewChatbotInfo: (info: any) => void;
}

export const ChatbotConfigStep: React.FC<ChatbotConfigStepProps> = ({
  step,
  newChatbotInfo,
  setNewChatbotInfo,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const avatarOptions = [
    { id: "avatar1", icon: <UserCircle className="text-blue-500" /> },
    { id: "avatar2", icon: <UserCircle className="text-purple-500" /> },
    { id: "avatar3", icon: <UserCircle className="text-green-500" /> },
    { id: "avatar4", icon: <UserCircle className="text-orange-500" /> },
    { id: "avatar5", icon: <MessageCircle className="text-blue-500" /> },
  ];
  
  const colorOptions = [
    { id: "black", color: "#202123" },
    { id: "green", color: "#4CAF50" },
    { id: "orange", color: "#FF9800" },
    { id: "purple", color: "#9C27B0" },
    { id: "blue", color: "#2196F3" },
    { id: "custom", color: "multicolor" },
  ];
  
  switch (step) {
    case 1:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Configure</h2>
          <p className="text-muted-foreground">
            Create and configure a chatbot that interacts with your users, ensuring it delivers accurate information.
          </p>
          
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="chatbot-title">Chatbot Title</Label>
              <Input 
                id="chatbot-title" 
                value={newChatbotInfo.title || "digibot"} 
                onChange={(e) => setNewChatbotInfo({...newChatbotInfo, title: e.target.value})}
                placeholder="Enter a name for your chatbot"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bubble-message">Bubble Message</Label>
              <Input 
                id="bubble-message" 
                value={newChatbotInfo.bubbleMessage} 
                onChange={(e) => setNewChatbotInfo({...newChatbotInfo, bubbleMessage: e.target.value})}
                placeholder="Hey there, how can I help you?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="welcome-message">Welcome Message</Label>
              <Input 
                id="welcome-message" 
                value={newChatbotInfo.welcomeMessage} 
                onChange={(e) => setNewChatbotInfo({...newChatbotInfo, welcomeMessage: e.target.value})}
                placeholder="Hi, how can I help you?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chatbot-instructions">Chatbot Instructions</Label>
              <Textarea 
                id="chatbot-instructions" 
                value={newChatbotInfo.instructions} 
                onChange={(e) => setNewChatbotInfo({...newChatbotInfo, instructions: e.target.value})}
                placeholder="Explain chatbot role"
                rows={5}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="go-beyond">Do Not Go Beyond Instructions</Label>
                <Switch id="go-beyond" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select 
                value={newChatbotInfo.language}
                onValueChange={(value) => setNewChatbotInfo({...newChatbotInfo, language: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Customize</h2>
          <p className="text-muted-foreground">
            Create and configure a chatbot that interacts with your users, ensuring it delivers accurate information.
          </p>
          
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label>Upload Logo</Label>
              <div className="flex w-full items-center relative">
                <Input
                  type="file"
                  id="logo-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <div className="border rounded-md flex items-center justify-between p-2 w-full">
                  <span className="text-sm text-muted-foreground">
                    {selectedFile ? selectedFile.name : 'No file chosen'}
                  </span>
                  <Label 
                    htmlFor="logo-upload" 
                    className="bg-secondary hover:bg-secondary/80 text-sm px-3 py-1 rounded cursor-pointer"
                  >
                    Choose File
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="footer-link">Footer Link</Label>
              <Input 
                id="footer-link" 
                value={newChatbotInfo.footerLink} 
                onChange={(e) => setNewChatbotInfo({...newChatbotInfo, footerLink: e.target.value})}
                placeholder="https://digihub.ai"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Avatar</Label>
              <p className="text-sm text-muted-foreground mb-2">Select an avatar for your chatbot.</p>
              <div className="flex gap-2 flex-wrap">
                {avatarOptions.map((avatar) => (
                  <div 
                    key={avatar.id}
                    className={`h-12 w-12 rounded-full flex items-center justify-center cursor-pointer ${
                      newChatbotInfo.avatar === avatar.id 
                        ? 'ring-2 ring-primary' 
                        : 'border border-border'
                    }`}
                    onClick={() => setNewChatbotInfo({...newChatbotInfo, avatar: avatar.id})}
                  >
                    {avatar.icon}
                  </div>
                ))}
                <div className="h-12 w-12 rounded-full border border-dashed border-border flex items-center justify-center cursor-pointer">
                  <PlusCircle className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Color</Label>
              <p className="text-sm text-muted-foreground mb-2">Choose an accent color that represents your brand.</p>
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map((colorOpt) => (
                  <div 
                    key={colorOpt.id}
                    className={`h-8 w-8 rounded-full cursor-pointer ${
                      newChatbotInfo.color === colorOpt.color 
                        ? 'ring-2 ring-black dark:ring-white' 
                        : ''
                    }`}
                    style={{ 
                      backgroundColor: colorOpt.color !== 'multicolor' ? colorOpt.color : undefined,
                      background: colorOpt.color === 'multicolor' ? 'linear-gradient(90deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0)' : undefined
                    }}
                    onClick={() => setNewChatbotInfo({...newChatbotInfo, color: colorOpt.color})}
                  >
                    {newChatbotInfo.color === colorOpt.color && (
                      <Check className="h-5 w-5 text-white mx-auto my-1.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-logo">Show Logo</Label>
                <Switch 
                  id="show-logo"
                  checked={newChatbotInfo.showLogo}
                  onCheckedChange={(checked) => setNewChatbotInfo({...newChatbotInfo, showLogo: checked})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-datetime">Show Date and Time</Label>
                <Switch 
                  id="show-datetime"
                  checked={newChatbotInfo.showDateTime}
                  onCheckedChange={(checked) => setNewChatbotInfo({...newChatbotInfo, showDateTime: checked})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="transparent-trigger">Transparent Trigger</Label>
                <Switch 
                  id="transparent-trigger"
                  checked={newChatbotInfo.transparentTrigger}
                  onCheckedChange={(checked) => setNewChatbotInfo({...newChatbotInfo, transparentTrigger: checked})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Trigger Avatar Size</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[newChatbotInfo.triggerSize]}
                  min={40}
                  max={80}
                  step={1}
                  onValueChange={(value) => setNewChatbotInfo({...newChatbotInfo, triggerSize: value[0]})}
                  className="flex-1"
                />
                <span className="text-sm w-12 text-center">{newChatbotInfo.triggerSize}px</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Position</Label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`border rounded-md p-4 flex items-center justify-center cursor-pointer ${
                    newChatbotInfo.position === 'left' ? 'bg-muted' : ''
                  }`}
                  onClick={() => setNewChatbotInfo({...newChatbotInfo, position: 'left'})}
                >
                  <div className="relative w-28 h-20 bg-muted/40 rounded">
                    <div className="absolute left-1 bottom-1 w-6 h-6 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="mt-2 text-center text-sm">Left</div>
                </div>
                <div 
                  className={`border rounded-md p-4 flex items-center justify-center cursor-pointer ${
                    newChatbotInfo.position === 'right' ? 'bg-muted' : ''
                  }`}
                  onClick={() => setNewChatbotInfo({...newChatbotInfo, position: 'right'})}
                >
                  <div className="relative w-28 h-20 bg-muted/40 rounded">
                    <div className="absolute right-1 bottom-1 w-6 h-6 bg-gray-400 rounded-full"></div>
                    {newChatbotInfo.position === 'right' && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="mt-2 text-center text-sm">Right</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Train</h2>
          <p className="text-muted-foreground">
            Train your chatbot by providing knowledge or connecting data sources.
          </p>
          
          <div className="space-y-4 mt-6">
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Knowledge Base</h3>
              <p className="text-sm text-muted-foreground mb-2">Add documents, FAQs, or other text-based knowledge</p>
              <Button variant="outline" className="w-full">
                <PlusCircle size={16} className="mr-2" />
                Add Knowledge Source
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Website Integration</h3>
              <p className="text-sm text-muted-foreground mb-2">Let the chatbot crawl your website for knowledge</p>
              <Button variant="outline" className="w-full">
                <PlusCircle size={16} className="mr-2" />
                Add Website URL
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium">API Connections</h3>
              <p className="text-sm text-muted-foreground mb-2">Connect to external APIs for dynamic data</p>
              <Button variant="outline" className="w-full">
                <PlusCircle size={16} className="mr-2" />
                Configure API
              </Button>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Embed</h2>
          <p className="text-muted-foreground">
            Add your chatbot to your website or other platforms.
          </p>
          
          <div className="space-y-4 mt-6">
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Website Embed</h3>
              <p className="text-sm text-muted-foreground mb-2">Add this code to your website</p>
              <div className="bg-muted p-3 rounded-md text-sm font-mono">
                &lt;script src="https://digihub.ai/widget/digibot.js" id="digihub-widget" data-chatbot-id="12345"&gt;&lt;/script&gt;
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                Copy Code
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Other Integrations</h3>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button variant="outline" className="h-10">
                  <Smartphone size={16} className="mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="h-10">
                  <MessageCircle size={16} className="mr-2" />
                  Messenger
                </Button>
                <Button variant="outline" className="h-10">
                  <ShoppingCart size={16} className="mr-2" />
                  Shopify
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};
