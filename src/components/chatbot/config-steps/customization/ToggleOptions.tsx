
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ToggleOptionsProps {
  showLogo: boolean;
  showDateTime: boolean;
  transparentTrigger: boolean;
  updateInfo: (key: string, value: any) => void;
}

export const ToggleOptions: React.FC<ToggleOptionsProps> = ({
  showLogo,
  showDateTime,
  transparentTrigger,
  updateInfo,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="showLogo">Show Logo</Label>
        </div>
        <Switch
          id="showLogo"
          checked={showLogo}
          onCheckedChange={(checked) => updateInfo("showLogo", checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="showDateTime">Show Date and Time</Label>
        </div>
        <Switch
          id="showDateTime"
          checked={showDateTime}
          onCheckedChange={(checked) => updateInfo("showDateTime", checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="transparentTrigger">Transparent Trigger</Label>
        </div>
        <Switch
          id="transparentTrigger"
          checked={transparentTrigger}
          onCheckedChange={(checked) => updateInfo("transparentTrigger", checked)}
        />
      </div>
    </div>
  );
};
