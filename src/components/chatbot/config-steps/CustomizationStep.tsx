
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Upload, User, Bot, MessageCircle } from "lucide-react";
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
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hexInputValue, setHexInputValue] = useState(chatbotInfo.color);
  
  const handleNavigateToIntegrations = () => {
    navigate('/settings/integrations', { state: { activeTab: 'messaging' } });
  };

  const updateInfo = (key: string, value: any) => {
    setNewChatbotInfo({ ...chatbotInfo, [key]: value });
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload logic here
      // For now, we'll just update the UI to show that a file was selected
      console.log("File selected:", e.target.files[0].name);
      // In a real implementation, you would upload this file to a server
      // and get back a URL to store in chatbotInfo.logo
    }
  };
  
  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInputValue(value);
  };
  
  const handleHexInputSave = () => {
    // Validate hex code format
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(hexInputValue)) {
      updateInfo("color", hexInputValue);
    } else if (hexInputValue.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      // If it's missing the # but is otherwise valid
      updateInfo("color", `#${hexInputValue}`);
      setHexInputValue(`#${hexInputValue}`);
    }
  };
  
  // Define avatar options based on the image provided
  const avatars = [
    { value: "avatar1", icon: <User className="text-white" /> },
    { value: "avatar2", icon: <User className="text-purple-500" /> },
    { value: "avatar3", icon: <User className="text-green-500" /> },
    { value: "avatar4", icon: <User className="text-orange-500" /> },
    { value: "avatar5", icon: <MessageCircle className="text-blue-500" /> },
  ];
  
  // Define color options based on the image provided
  const colorOptions = [
    { value: "#000000", label: "Black" },
    { value: "#4CAF50", label: "Green" },
    { value: "#FF9800", label: "Orange" },
    { value: "#9C27B0", label: "Purple" },
    { value: "#2196F3", label: "Blue" },
    { value: "custom", label: "Custom" },
  ];

  // Define language options
  const languageOptions = [
    { value: "auto", label: "Auto (Browser Default)" },
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "pt", label: "Portuguese" },
    { value: "it", label: "Italian" },
    { value: "ru", label: "Russian" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "ar", label: "Arabic" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium mb-2">Customize</h2>
        <p className="text-muted-foreground">
          Create and configure a chatbot that interacts with your users, ensuring it delivers accurate information.
        </p>
      </div>
      
      {/* Logo Upload */}
      <div>
        <Label htmlFor="logo">Upload Logo</Label>
        <div className="mt-2">
          <Input 
            id="logo"
            type="file" 
            ref={fileInputRef}
            onChange={handleLogoUpload}
            className="hidden"
            accept="image/*"
          />
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between"
            onClick={() => fileInputRef.current?.click()}
          >
            <span>Choose File</span>
            <Upload size={16} />
          </Button>
          <p className="text-xs text-muted-foreground mt-1">No file chosen</p>
        </div>
      </div>
      
      {/* Language Selection */}
      <div>
        <Label htmlFor="language">Language</Label>
        <Select
          value={chatbotInfo.language}
          onValueChange={(value) => updateInfo("language", value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          This affects date formatting and language detection.
        </p>
      </div>
      
      {/* Footer Link */}
      <div>
        <Label htmlFor="footerLink">Footer Link</Label>
        <Input
          id="footerLink"
          value={chatbotInfo.footerLink}
          onChange={(e) => updateInfo("footerLink", e.target.value)}
          placeholder="https://digihub.ai"
          className="mt-2"
        />
      </div>
      
      {/* Avatar Selection */}
      <div>
        <Label>Avatar</Label>
        <p className="text-sm text-muted-foreground mb-4">Select an avatar for your chatbot.</p>
        <div className="flex flex-wrap gap-4 mt-2">
          {avatars.map((avatar, index) => (
            <div 
              key={index}
              className={`relative cursor-pointer transition-all`}
              onClick={() => updateInfo("avatar", avatar.value)}
            >
              <Avatar 
                className={`w-12 h-12 border-2 ${
                  chatbotInfo.avatar === avatar.value 
                    ? "border-primary" 
                    : "border-transparent"
                }`}
              >
                <AvatarFallback 
                  className={`${
                    index === 0 ? "bg-amber-500" : 
                    index === 1 ? "bg-red-500" : 
                    index === 2 ? "bg-blue-500" : 
                    index === 3 ? "bg-teal-500" : 
                    "bg-violet-500"
                  }`}
                >
                  {avatar.icon}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
          
          {/* Add custom avatar option */}
          <div 
            className="cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar className="w-12 h-12 border-2 border-dashed border-muted-foreground/30 bg-muted/50 flex items-center justify-center">
              <span className="text-2xl font-light text-muted-foreground">+</span>
            </Avatar>
          </div>
        </div>
      </div>
      
      {/* Color Selection */}
      <div>
        <Label>Color</Label>
        <p className="text-sm text-muted-foreground mb-4">Choose an accent color that represents your brand.</p>
        <div className="flex flex-wrap gap-4 mt-2">
          {colorOptions.map((colorOption, index) => (
            <div 
              key={index}
              className="relative"
              onClick={() => updateInfo("color", colorOption.value !== "custom" ? colorOption.value : chatbotInfo.color)}
            >
              {colorOption.value === "custom" ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <div 
                      className="w-10 h-10 rounded-full cursor-pointer border border-muted flex items-center justify-center"
                      style={{ background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }}
                    >
                      {chatbotInfo.color !== colorOptions[0].value &&
                       chatbotInfo.color !== colorOptions[1].value &&
                       chatbotInfo.color !== colorOptions[2].value &&
                       chatbotInfo.color !== colorOptions[3].value &&
                       chatbotInfo.color !== colorOptions[4].value && (
                        <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center">
                          <Check size={12} />
                        </div>
                       )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3">
                    <div className="space-y-3">
                      <HexColorPicker
                        color={chatbotInfo.color}
                        onChange={(color) => {
                          updateInfo("color", color);
                          setHexInputValue(color);
                        }}
                      />
                      
                      <div className="flex mt-2 gap-2">
                        <Input 
                          value={hexInputValue}
                          onChange={handleHexInputChange}
                          placeholder="#RRGGBB"
                          className="text-sm"
                        />
                        <Button 
                          size="sm" 
                          onClick={handleHexInputSave}
                        >
                          Save
                        </Button>
                      </div>
                      
                      <div 
                        className="w-full h-8 rounded"
                        style={{ backgroundColor: chatbotInfo.color }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <div 
                  className="w-10 h-10 rounded-full cursor-pointer border border-muted"
                  style={{ backgroundColor: colorOption.value }}
                >
                  {chatbotInfo.color === colorOption.value && (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Toggle Options */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="showLogo">Show Logo</Label>
          </div>
          <Switch
            id="showLogo"
            checked={chatbotInfo.showLogo}
            onCheckedChange={(checked) => updateInfo("showLogo", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="showDateTime">Show Date and Time</Label>
          </div>
          <Switch
            id="showDateTime"
            checked={chatbotInfo.showDateTime}
            onCheckedChange={(checked) => updateInfo("showDateTime", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="transparentTrigger">Transparent Trigger</Label>
          </div>
          <Switch
            id="transparentTrigger"
            checked={chatbotInfo.transparentTrigger}
            onCheckedChange={(checked) => updateInfo("transparentTrigger", checked)}
          />
        </div>
      </div>
      
      {/* Trigger Avatar Size */}
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="triggerSize">Trigger Avatar Size</Label>
          <span className="text-sm text-muted-foreground">{chatbotInfo.triggerSize}px</span>
        </div>
        <Slider
          id="triggerSize"
          min={40}
          max={80}
          step={5}
          value={[chatbotInfo.triggerSize]}
          onValueChange={(values) => updateInfo("triggerSize", values[0])}
          className="mt-4"
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>
      
      {/* Position Selection */}
      <div>
        <Label>Message Position</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Choose where the AI message bubbles will appear. User messages are always on the right.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div 
            className={`border rounded-lg p-6 flex flex-col items-center justify-between gap-2 cursor-pointer relative ${
              chatbotInfo.position === "left" ? "bg-muted/40 border-primary" : ""
            }`}
            onClick={() => updateInfo("position", "left")}
          >
            <div className="w-full space-y-2">
              <div className="w-3/4 h-8 bg-gray-200 rounded-lg"></div>
              <div className="w-1/2 h-8 bg-gray-200 rounded-lg self-start"></div>
            </div>
            <p className="text-sm mt-auto">Left</p>
            {chatbotInfo.position === "left" && (
              <div className="absolute top-2 right-2 bg-primary rounded-md p-1">
                <Check size={16} className="text-white" />
              </div>
            )}
          </div>
          
          <div 
            className={`border rounded-lg p-6 flex flex-col items-center justify-between gap-2 cursor-pointer relative ${
              chatbotInfo.position === "right" ? "bg-muted/40 border-primary" : ""
            }`}
            onClick={() => updateInfo("position", "right")}
          >
            <div className="w-full space-y-2 flex flex-col items-end">
              <div className="w-3/4 h-8 bg-gray-200 rounded-lg"></div>
              <div className="w-1/2 h-8 bg-gray-200 rounded-lg self-end"></div>
            </div>
            <p className="text-sm mt-auto">Right</p>
            {chatbotInfo.position === "right" && (
              <div className="absolute top-2 right-2 bg-primary rounded-md p-1">
                <Check size={16} className="text-white" />
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          This setting controls where the AI assistant's messages appear in the chat. Left shows AI messages on the left side (traditional style), while Right shows AI messages on the right side with user messages.
        </p>
      </div>
    </div>
  );
};
