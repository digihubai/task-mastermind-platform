
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TopicStepProps {
  topic: string;
  onTopicChange: (value: string) => void;
  onNext: () => void;
  onAdvancedSettingsChange?: (settings: any) => void;
  advancedSettings?: any;
}

const TopicStep: React.FC<TopicStepProps> = ({ 
  topic, 
  onTopicChange, 
  onNext,
  onAdvancedSettingsChange,
  advancedSettings = {}
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localSettings, setLocalSettings] = useState({
    language: advancedSettings.language || "en-US",
    postLength: advancedSettings.postLength || 1200,
    creativity: advancedSettings.creativity || 0.7,
    toneOfVoice: advancedSettings.toneOfVoice || "professional",
    includeExamples: advancedSettings.includeExamples !== false,
    includeStatistics: advancedSettings.includeStatistics !== false,
    includeSourceLinks: advancedSettings.includeSourceLinks !== false,
    ...advancedSettings
  });
  
  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    if (onAdvancedSettingsChange) {
      onAdvancedSettingsChange(newSettings);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Choose Your Topic</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">What would you like to write about?</label>
            <Textarea 
              className="min-h-32 p-3"
              placeholder="Enter your topic here. Be specific about what you want to cover for better results. For example: 'How AI chatbots can improve customer service and increase sales conversions for e-commerce businesses'"
              value={topic}
              onChange={(e) => onTopicChange(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            type="button" 
            className="w-full flex items-center justify-between"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <span className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Advanced Options
            </span>
            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {showAdvanced && (
            <div className="space-y-4 p-4 border rounded-md bg-muted/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select 
                    value={localSettings.language} 
                    onValueChange={(value) => handleSettingChange('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tone of Voice</label>
                  <Select 
                    value={localSettings.toneOfVoice} 
                    onValueChange={(value) => handleSettingChange('toneOfVoice', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="informative">Informative</SelectItem>
                      <SelectItem value="authoritative">Authoritative</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Content Length (words)</label>
                  <span className="text-sm text-muted-foreground">{localSettings.postLength}</span>
                </div>
                <Input 
                  type="number" 
                  min="300" 
                  max="3000" 
                  value={localSettings.postLength}
                  onChange={(e) => handleSettingChange('postLength', parseInt(e.target.value) || 1200)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Creativity Level</label>
                  <span className="text-sm text-muted-foreground">
                    {localSettings.creativity < 0.4 ? 'Conservative' : 
                     localSettings.creativity < 0.7 ? 'Balanced' : 'Creative'}
                  </span>
                </div>
                <Slider 
                  value={[localSettings.creativity * 100]} 
                  min={0} 
                  max={100} 
                  step={10}
                  onValueChange={(value) => handleSettingChange('creativity', value[0] / 100)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="include-examples">Include Examples</Label>
                  <Switch 
                    id="include-examples" 
                    checked={localSettings.includeExamples} 
                    onCheckedChange={(checked) => handleSettingChange('includeExamples', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="include-statistics">Include Statistics</Label>
                  <Switch 
                    id="include-statistics" 
                    checked={localSettings.includeStatistics} 
                    onCheckedChange={(checked) => handleSettingChange('includeStatistics', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="include-source-links">Include Source Links</Label>
                  <Switch 
                    id="include-source-links" 
                    checked={localSettings.includeSourceLinks} 
                    onCheckedChange={(checked) => handleSettingChange('includeSourceLinks', checked)}
                  />
                </div>
              </div>
            </div>
          )}
          
          <Button 
            onClick={onNext} 
            disabled={!topic.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TopicStep;
