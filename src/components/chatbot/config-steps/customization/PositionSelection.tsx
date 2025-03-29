
import React from "react";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PositionSelectionProps {
  position: "left" | "right";
  updateInfo: (key: string, value: any) => void;
}

export const PositionSelection: React.FC<PositionSelectionProps> = ({
  position,
  updateInfo,
}) => {
  const handlePositionChange = (newPosition: "left" | "right") => {
    updateInfo("position", newPosition);
    toast.success(`Message position updated to ${newPosition}`);
  };

  return (
    <div>
      <Label>Message Position</Label>
      <p className="text-sm text-muted-foreground mb-2">
        Choose where the AI assistant's messages will appear. User messages are always on the right.
      </p>
      
      <RadioGroup 
        value={position} 
        onValueChange={(value) => handlePositionChange(value as "left" | "right")}
        className="mt-2"
      >
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div 
            className={`border rounded-lg p-6 flex flex-col items-center justify-between gap-2 cursor-pointer relative ${
              position === "left" ? "bg-muted/40 border-primary" : ""
            }`}
            onClick={() => handlePositionChange("left")}
          >
            <div className="w-full space-y-2">
              <div className="w-3/4 h-8 bg-gray-200 rounded-lg ml-0 mr-auto"></div>
              <div className="w-1/2 h-8 bg-gray-200 rounded-lg ml-0 mr-auto"></div>
              <div className="w-1/2 h-8 bg-slate-800 rounded-lg ml-auto mr-0"></div>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <RadioGroupItem value="left" id="left" className="mt-0" />
              <Label htmlFor="left" className="text-sm cursor-pointer">Left</Label>
            </div>
            {position === "left" && (
              <div className="absolute top-2 right-2 bg-primary rounded-md p-1">
                <Check size={16} className="text-white" />
              </div>
            )}
          </div>
          
          <div 
            className={`border rounded-lg p-6 flex flex-col items-center justify-between gap-2 cursor-pointer relative ${
              position === "right" ? "bg-muted/40 border-primary" : ""
            }`}
            onClick={() => handlePositionChange("right")}
          >
            <div className="w-full space-y-2 flex flex-col items-end">
              <div className="w-3/4 h-8 bg-gray-200 rounded-lg ml-auto mr-0"></div>
              <div className="w-1/2 h-8 bg-gray-200 rounded-lg ml-auto mr-0"></div>
              <div className="w-1/2 h-8 bg-slate-800 rounded-lg ml-0 mr-auto"></div>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <RadioGroupItem value="right" id="right" className="mt-0" />
              <Label htmlFor="right" className="text-sm cursor-pointer">Right</Label>
            </div>
            {position === "right" && (
              <div className="absolute top-2 right-2 bg-primary rounded-md p-1">
                <Check size={16} className="text-white" />
              </div>
            )}
          </div>
        </div>
      </RadioGroup>
      
      <p className="text-xs text-muted-foreground mt-2">
        Left: AI assistant messages on the left (traditional style) | Right: AI assistant messages on the right
      </p>
    </div>
  );
};
