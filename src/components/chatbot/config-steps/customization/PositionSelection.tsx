
import React from "react";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface PositionSelectionProps {
  position: "left" | "right";
  updateInfo: (key: string, value: any) => void;
}

export const PositionSelection: React.FC<PositionSelectionProps> = ({
  position,
  updateInfo,
}) => {
  return (
    <div>
      <Label>Message Position</Label>
      <p className="text-sm text-muted-foreground mb-2">
        Choose where the AI message bubbles will appear. User messages are always on the right.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div 
          className={`border rounded-lg p-6 flex flex-col items-center justify-between gap-2 cursor-pointer relative ${
            position === "left" ? "bg-muted/40 border-primary" : ""
          }`}
          onClick={() => updateInfo("position", "left")}
        >
          <div className="w-full space-y-2">
            <div className="w-3/4 h-8 bg-gray-200 rounded-lg"></div>
            <div className="w-1/2 h-8 bg-gray-200 rounded-lg self-start"></div>
          </div>
          <p className="text-sm mt-auto">Left</p>
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
          onClick={() => updateInfo("position", "right")}
        >
          <div className="w-full space-y-2 flex flex-col items-end">
            <div className="w-3/4 h-8 bg-gray-200 rounded-lg"></div>
            <div className="w-1/2 h-8 bg-gray-200 rounded-lg self-end"></div>
          </div>
          <p className="text-sm mt-auto">Right</p>
          {position === "right" && (
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
  );
};
