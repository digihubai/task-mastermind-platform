
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface CSATSettingsProps {
  enableCSAT: boolean;
  setEnableCSAT: (enabled: boolean) => void;
  csatThreshold: number;
  setCsatThreshold: (threshold: number) => void;
}

const CSATSettings: React.FC<CSATSettingsProps> = ({ 
  enableCSAT, 
  setEnableCSAT, 
  csatThreshold,
  setCsatThreshold
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Customer Satisfaction Survey (CSAT)</h3>
          <p className="text-sm text-muted-foreground">Configure post-chat customer satisfaction surveys</p>
        </div>
        <Switch 
          checked={enableCSAT}
          onCheckedChange={setEnableCSAT}
        />
      </div>
      
      {enableCSAT && (
        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="csat-threshold">Minimum CSAT Threshold (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="csat-threshold"
                defaultValue={[csatThreshold]}
                max={100}
                min={0}
                step={1}
                onValueChange={(value) => setCsatThreshold(value[0])}
                className="flex-1"
              />
              <Input 
                type="number" 
                value={csatThreshold} 
                onChange={(e) => setCsatThreshold(Number(e.target.value))} 
                className="w-16"
                min={0}
                max={100}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Alerts will be triggered when CSAT falls below this threshold
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Survey Questions</Label>
            <div className="space-y-2 border rounded-md p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">How would you rate your experience?</span>
                <Switch defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Was your issue resolved?</span>
                <Switch defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Would you recommend our service?</span>
                <Switch defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Any additional comments?</span>
                <Switch defaultChecked={false} />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center">
              <span>Survey Trigger</span>
            </Label>
            <div className="space-y-1">
              <div className="flex items-center">
                <input type="radio" id="auto-trigger" name="survey-trigger" defaultChecked className="mr-2" />
                <Label htmlFor="auto-trigger" className="text-sm font-normal">Automatically after conversation ends</Label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="manual-trigger" name="survey-trigger" className="mr-2" />
                <Label htmlFor="manual-trigger" className="text-sm font-normal">Manually triggered by agent</Label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSATSettings;
