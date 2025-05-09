
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface TriggerSizeSliderProps {
  triggerSize: number;
  updateInfo: (key: string, value: any) => void;
}

export const TriggerSizeSlider: React.FC<TriggerSizeSliderProps> = ({
  triggerSize,
  updateInfo,
}) => {
  const handleSizeChange = (values: number[]) => {
    const newSize = values[0];
    updateInfo("triggerSize", newSize);
    toast.success(`Trigger size updated to ${newSize}px`);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor="triggerSize">Floating Button Size</Label>
        <span className="text-sm text-muted-foreground">{triggerSize}px</span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        Adjust the size of the floating chat button that appears on your website.
      </p>
      <Slider
        id="triggerSize"
        min={40}
        max={80}
        step={5}
        value={[triggerSize]}
        onValueChange={handleSizeChange}
        className="mt-4"
      />
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>Small</span>
        <span>Large</span>
      </div>
    </div>
  );
};
