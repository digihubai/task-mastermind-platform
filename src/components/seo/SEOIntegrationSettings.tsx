
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SEOIntegrationSettings = () => {
  const { toast } = useToast();
  const [contentOptions, setContentOptions] = useState({
    autoPublish: false,
    scheduleUpdates: false,
    keepHistory: false,
  });

  const [dataSync, setDataSync] = useState({
    syncAnalytics: false,
    importKeywords: false,
    optimizeMeta: false,
  });

  const handleContentOptionChange = (option: keyof typeof contentOptions) => {
    setContentOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleDataSyncChange = (option: keyof typeof dataSync) => {
    setDataSync((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, save settings to backend or context
    toast({
      title: "Settings Saved",
      description: "Your SEO integration settings have been saved.",
    });
  };

  return (
    <Card className="p-5 border mt-6">
      <h3 className="text-lg font-medium mb-4">SEO Integration Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">SEO Content Options</h4>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Checkbox 
                id="auto-publish" 
                checked={contentOptions.autoPublish}
                onCheckedChange={() => handleContentOptionChange('autoPublish')} 
              />
              <label 
                htmlFor="auto-publish" 
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Auto-publish SEO optimizations
              </label>
            </li>
            <li className="flex items-center space-x-2">
              <Checkbox 
                id="schedule" 
                checked={contentOptions.scheduleUpdates}
                onCheckedChange={() => handleContentOptionChange('scheduleUpdates')} 
              />
              <label 
                htmlFor="schedule" 
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Schedule SEO updates
              </label>
            </li>
            <li className="flex items-center space-x-2">
              <Checkbox 
                id="version" 
                checked={contentOptions.keepHistory}
                onCheckedChange={() => handleContentOptionChange('keepHistory')} 
              />
              <label 
                htmlFor="version" 
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep optimization history
              </label>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">SEO Data Sync</h4>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Checkbox 
                id="analytics" 
                checked={dataSync.syncAnalytics}
                onCheckedChange={() => handleDataSyncChange('syncAnalytics')} 
              />
              <label 
                htmlFor="analytics" 
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sync SEO analytics data
              </label>
            </li>
            <li className="flex items-center space-x-2">
              <Checkbox 
                id="keywords" 
                checked={dataSync.importKeywords}
                onCheckedChange={() => handleDataSyncChange('importKeywords')} 
              />
              <label 
                htmlFor="keywords" 
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Import keyword rankings
              </label>
            </li>
            <li className="flex items-center space-x-2">
              <Checkbox 
                id="meta" 
                checked={dataSync.optimizeMeta}
                onCheckedChange={() => handleDataSyncChange('optimizeMeta')} 
              />
              <label 
                htmlFor="meta" 
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Optimize meta descriptions
              </label>
            </li>
          </ul>
        </div>
      </div>
      
      <Button onClick={handleSaveSettings} className="mt-6">
        <Settings className="mr-2 h-4 w-4" />
        Save SEO Integration Settings
      </Button>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <Link className="h-4 w-4" />
        <span>Need help with SEO integrations? <a href="#" className="text-primary hover:underline">View our SEO integration docs</a></span>
      </div>
    </Card>
  );
};

export default SEOIntegrationSettings;
