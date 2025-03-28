
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GeneralSettingsProps {
  assistantName: string;
  setAssistantName: (value: string) => void;
  welcomeMessage: string;
  setWelcomeMessage: (value: string) => void;
  model: string;
  setModel: (value: string) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  assistantName,
  setAssistantName,
  welcomeMessage,
  setWelcomeMessage,
  model,
  setModel
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="assistant-name">Assistant Name</Label>
        <Input 
          id="assistant-name" 
          value={assistantName} 
          onChange={(e) => setAssistantName(e.target.value)}
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">This name will be displayed to customers</p>
      </div>

      <div>
        <Label htmlFor="welcome-message">Welcome Message</Label>
        <Textarea 
          id="welcome-message" 
          value={welcomeMessage} 
          onChange={(e) => setWelcomeMessage(e.target.value)}
          className="mt-1"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="ai-model">AI Model</Label>
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger id="ai-model" className="mt-1">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4o">GPT-4o (Most Powerful)</SelectItem>
            <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fast)</SelectItem>
            <SelectItem value="claude-3">Claude 3</SelectItem>
            <SelectItem value="gemini">Gemini</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default GeneralSettings;
