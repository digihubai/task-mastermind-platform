
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface BasicConfigStepProps {
  newChatbotInfo: {
    title: string;
    bubbleMessage: string;
    welcomeMessage: string;
    instructions: string;
    language: string;
  };
  setNewChatbotInfo: (info: any) => void;
}

export const BasicConfigStep: React.FC<BasicConfigStepProps> = ({
  newChatbotInfo,
  setNewChatbotInfo,
}) => {
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
};
