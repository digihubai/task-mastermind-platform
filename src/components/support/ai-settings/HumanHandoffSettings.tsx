
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HumanHandoffSettingsProps {
  enableAutoAssign: boolean;
  setEnableAutoAssign: (value: boolean) => void;
  autoAssignThreshold: string;
  setAutoAssignThreshold: (value: string) => void;
}

const HumanHandoffSettings: React.FC<HumanHandoffSettingsProps> = ({
  enableAutoAssign,
  setEnableAutoAssign,
  autoAssignThreshold,
  setAutoAssignThreshold
}) => {
  return (
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
  );
};

export default HumanHandoffSettings;
