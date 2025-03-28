
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TicketUrgencyFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const TicketUrgencyField: React.FC<TicketUrgencyFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="urgency" className="block text-sm font-medium mb-1">
        Urgency Level
      </label>
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="flex flex-wrap gap-4 mt-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="urgency-low" />
          <Label htmlFor="urgency-low">Low</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="urgency-medium" />
          <Label htmlFor="urgency-medium">Medium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="urgency-high" />
          <Label htmlFor="urgency-high">High</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="critical" id="urgency-critical" />
          <Label htmlFor="urgency-critical">Critical</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
