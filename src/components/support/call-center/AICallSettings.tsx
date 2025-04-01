
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Phone, Edit2 } from "lucide-react";

interface AICallSettingsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isAIEnabled: boolean;
  aiTakeover: number;
  onAIEnabledChange: (enabled: boolean) => void;
  onAITakeoverChange: (value: number) => void;
}

const AICallSettings: React.FC<AICallSettingsProps> = ({
  isOpen,
  onOpenChange,
  isAIEnabled,
  aiTakeover,
  onAIEnabledChange,
  onAITakeoverChange
}) => {
  const navigate = useNavigate();
  
  const handleSaveSettings = () => {
    toast.success("AI call settings saved");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Call Center Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ai-enabled" className="font-medium">Enable AI Call Handling</Label>
              <p className="text-sm text-muted-foreground">Allow AI to automatically handle incoming calls</p>
            </div>
            <Switch id="ai-enabled" checked={isAIEnabled} onCheckedChange={onAIEnabledChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ai-takeover">AI Call Handling Percentage</Label>
            <div className="flex items-center">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={aiTakeover} 
                onChange={(e) => onAITakeoverChange(Number(e.target.value))}
                className="flex-1 mr-4"
              />
              <span className="font-medium">{aiTakeover}%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Percentage of incoming calls that will be handled by AI
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>AI Handoff Settings</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="complex-issues" defaultChecked />
                <label htmlFor="complex-issues" className="text-sm">Hand off complex issues to human agents</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="sentiment" defaultChecked />
                <label htmlFor="sentiment" className="text-sm">Hand off when detecting negative sentiment</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="request" defaultChecked />
                <label htmlFor="request" className="text-sm">Hand off when caller explicitly requests human</label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Voice Settings</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <select className="border rounded p-1 text-sm w-full">
                  <option>Natural Female Voice</option>
                  <option>Natural Male Voice</option>
                  <option>Professional Female Voice</option>
                  <option>Professional Male Voice</option>
                </select>
              </div>
              <p className="text-xs text-muted-foreground">
                Select the voice style for AI call handling
              </p>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <Button 
              onClick={() => {
                onOpenChange(false);
                navigate("/automation/call-flow");
              }}
              variant="outline"
              className="w-full gap-2"
            >
              <Edit2 size={16} />
              <span>Create/Edit Call Flows</span>
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Design conversational call flows for your AI call center
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AICallSettings;
