
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface AIAssistantSettingsProps {
  onClose: () => void;
}

const AIAssistantSettings: React.FC<AIAssistantSettingsProps> = ({ onClose }) => {
  const [assistantName, setAssistantName] = useState("Support AI");
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! I'm your AI assistant. How can I help you today?");
  const [enableAutoAssign, setEnableAutoAssign] = useState(true);
  const [autoAssignThreshold, setAutoAssignThreshold] = useState("3");
  const [model, setModel] = useState("gpt-4o");
  const [channels, setChannels] = useState({
    website: true,
    email: true,
    whatsapp: true,
    messenger: true,
    telegram: false,
    slack: false,
    sms: false,
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your AI assistant settings have been updated"
    });
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onClose} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>AI Assistant Settings</CardTitle>
            <CardDescription>Configure how your AI assistant interacts with customers</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Human Handoff</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-assign">Auto-assign to human agent</Label>
              <p className="text-xs text-muted-foreground">
                Automatically assign to a human agent when AI can't help
              </p>
            </div>
            <Switch 
              id="auto-assign" 
              checked={enableAutoAssign} 
              onCheckedChange={setEnableAutoAssign} 
            />
          </div>

          {enableAutoAssign && (
            <div>
              <Label htmlFor="threshold">Auto-assign threshold</Label>
              <Select value={autoAssignThreshold} onValueChange={setAutoAssignThreshold}>
                <SelectTrigger id="threshold" className="mt-1">
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">After 1 unsuccessful AI response</SelectItem>
                  <SelectItem value="2">After 2 unsuccessful AI responses</SelectItem>
                  <SelectItem value="3">After 3 unsuccessful AI responses</SelectItem>
                  <SelectItem value="5">After 5 unsuccessful AI responses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Channels</h3>
          <p className="text-sm text-muted-foreground">Select which channels the AI assistant should monitor</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="website">Website Chat</Label>
              <Switch 
                id="website" 
                checked={channels.website} 
                onCheckedChange={(checked) => setChannels({...channels, website: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email</Label>
              <Switch 
                id="email" 
                checked={channels.email} 
                onCheckedChange={(checked) => setChannels({...channels, email: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Switch 
                id="whatsapp" 
                checked={channels.whatsapp} 
                onCheckedChange={(checked) => setChannels({...channels, whatsapp: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="messenger">Facebook Messenger</Label>
              <Switch 
                id="messenger" 
                checked={channels.messenger} 
                onCheckedChange={(checked) => setChannels({...channels, messenger: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="telegram">Telegram</Label>
              <Switch 
                id="telegram" 
                checked={channels.telegram} 
                onCheckedChange={(checked) => setChannels({...channels, telegram: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="slack">Slack</Label>
              <Switch 
                id="slack" 
                checked={channels.slack} 
                onCheckedChange={(checked) => setChannels({...channels, slack: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sms">SMS</Label>
              <Switch 
                id="sms" 
                checked={channels.sms} 
                onCheckedChange={(checked) => setChannels({...channels, sms: checked})} 
              />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIAssistantSettings;
