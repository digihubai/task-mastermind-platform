
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserCircle, MessageCircle, Check } from "lucide-react";

interface CustomizationStepProps {
  chatbotInfo: {
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

export const CustomizationStep: React.FC<CustomizationStepProps> = ({
  chatbotInfo,
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
    { id: "blue", color: "#2196F3", label: "Blue" },
    { id: "green", color: "#4CAF50", label: "Green" },
    { id: "orange", color: "#FF9800", label: "Orange" },
    { id: "purple", color: "#9C27B0", label: "Purple" },
    { id: "black", color: "#202123", label: "Black" },
    { id: "red", color: "#F44336", label: "Red" },
  ];
  
  // Function to handle direct color input changes
  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChatbotInfo({...chatbotInfo, color: e.target.value});
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Customize</h2>
      <p className="text-muted-foreground">
        Customize the look and feel of your chatbot to match your brand.
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
            value={chatbotInfo.footerLink} 
            onChange={(e) => setNewChatbotInfo({...chatbotInfo, footerLink: e.target.value})}
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
                  chatbotInfo.avatar === avatar.id 
                    ? 'ring-2 ring-primary' 
                    : 'border border-border'
                }`}
                onClick={() => setNewChatbotInfo({...chatbotInfo, avatar: avatar.id})}
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
          <div className="flex gap-2 flex-wrap mb-4">
            {colorOptions.map((colorOpt) => (
              <div 
                key={colorOpt.id}
                className={`h-8 w-8 rounded-full cursor-pointer ${
                  chatbotInfo.color === colorOpt.color 
                    ? 'ring-2 ring-black dark:ring-white' 
                    : ''
                }`}
                style={{ 
                  backgroundColor: colorOpt.color
                }}
                title={colorOpt.label}
                onClick={() => setNewChatbotInfo({...chatbotInfo, color: colorOpt.color})}
              >
                {chatbotInfo.color === colorOpt.color && (
                  <Check className="h-5 w-5 text-white mx-auto my-1.5" />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <Label htmlFor="custom-color">Custom Color</Label>
            <input 
              type="color"
              id="custom-color"
              value={chatbotInfo.color}
              onChange={handleColorInputChange}
              className="cursor-pointer w-8 h-8 p-0 border-0 rounded-md"
            />
            <Input
              type="text"
              value={chatbotInfo.color}
              onChange={handleColorInputChange}
              placeholder="#2196F3"
              className="w-32"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-logo">Show Logo</Label>
            <Switch 
              id="show-logo"
              checked={chatbotInfo.showLogo}
              onCheckedChange={(checked) => setNewChatbotInfo({...chatbotInfo, showLogo: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="show-datetime">Show Date and Time</Label>
            <Switch 
              id="show-datetime"
              checked={chatbotInfo.showDateTime}
              onCheckedChange={(checked) => setNewChatbotInfo({...chatbotInfo, showDateTime: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="transparent-trigger">Transparent Trigger</Label>
            <Switch 
              id="transparent-trigger"
              checked={chatbotInfo.transparentTrigger}
              onCheckedChange={(checked) => setNewChatbotInfo({...chatbotInfo, transparentTrigger: checked})}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Trigger Avatar Size ({chatbotInfo.triggerSize}px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[chatbotInfo.triggerSize]}
              min={40}
              max={80}
              step={1}
              onValueChange={(value) => setNewChatbotInfo({...chatbotInfo, triggerSize: value[0]})}
              className="flex-1"
            />
            <span className="text-sm w-12 text-center">{chatbotInfo.triggerSize}px</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Position</Label>
          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer ${
                chatbotInfo.position === 'left' ? 'bg-muted' : ''
              }`}
              onClick={() => setNewChatbotInfo({...chatbotInfo, position: 'left'})}
            >
              <div className="relative w-28 h-20 bg-muted/40 rounded">
                <div className="absolute left-1 bottom-1 w-6 h-6 bg-gray-400 rounded-full"></div>
              </div>
              <div className="mt-2 text-sm text-center">Left</div>
            </div>
            <div 
              className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer ${
                chatbotInfo.position === 'right' ? 'bg-muted' : ''
              }`}
              onClick={() => setNewChatbotInfo({...chatbotInfo, position: 'right'})}
            >
              <div className="relative w-28 h-20 bg-muted/40 rounded">
                <div className="absolute right-1 bottom-1 w-6 h-6 bg-gray-400 rounded-full"></div>
              </div>
              <div className="mt-2 text-sm text-center">Right</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
