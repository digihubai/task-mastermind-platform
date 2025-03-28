
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  
  // Define avatar options based on the image provided
  const avatars = [
    { value: "avatar1", icon: <img src="/path-to-avatar1.jpg" alt="Human Avatar 1" className="w-full h-full object-cover" /> },
    { value: "avatar2", icon: <img src="/path-to-avatar2.jpg" alt="Human Avatar 2" className="w-full h-full object-cover" /> },
    { value: "avatar3", icon: <User className="text-white" /> },
    { value: "avatar4", icon: <Bot className="text-white" /> },
    { value: "avatar5", icon: <MessageCircle className="text-white" /> },
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
                    <HexColorPicker
                      color={chatbotInfo.color}
                      onChange={(color) => updateInfo("color", color)}
                    />
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
      </div>
      
      {/* Position Selection */}
      <div>
        <Label>Position</Label>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div 
            className={`border rounded-lg p-6 flex flex-col items-center justify-between gap-2 cursor-pointer relative ${
              chatbotInfo.position === "left" ? "bg-muted/40 border-primary" : ""
            }`}
            onClick={() => updateInfo("position", "left")}
          >
            <div className="w-8 h-8 bg-gray-300 rounded absolute left-4 bottom-4"></div>
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
            <div className="w-8 h-8 bg-gray-300 rounded absolute right-4 bottom-4"></div>
            <p className="text-sm mt-auto">Right</p>
            {chatbotInfo.position === "right" && (
              <div className="absolute top-2 right-2 bg-primary rounded-md p-1">
                <Check size={16} className="text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
