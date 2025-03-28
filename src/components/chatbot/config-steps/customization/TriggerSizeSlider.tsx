
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TriggerSizeSliderProps {
  triggerSize: number;
  updateInfo: (key: string, value: any) => void;
}

export const TriggerSizeSlider: React.FC<TriggerSizeSliderProps> = ({
  triggerSize,
  updateInfo,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor="triggerSize">Trigger Avatar Size</Label>
        <span className="text-sm text-muted-foreground">{triggerSize}px</span>
      </div>
      <Slider
        id="triggerSize"
        min={40}
        max={80}
        step={5}
        value={[triggerSize]}
        onValueChange={(values) => updateInfo("triggerSize", values[0])}
        className="mt-4"
      />
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>Small</span>
        <span>Large</span>
      </div>
    </div>
  );
};
