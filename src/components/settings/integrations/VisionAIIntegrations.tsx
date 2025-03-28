
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, Bot } from "lucide-react";

const VisionAIIntegrations = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Vision AI Integrations</h2>
      <p className="mb-6 text-muted-foreground">
        Connect DigiHub Vision AI to image processing services (Admin only)
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 p-4 border rounded-lg">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full inline-block">
            <Image className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-medium">Image Analysis APIs</h3>
          <p className="text-sm text-muted-foreground">
            Connect to Google Vision, AWS Rekognition, and more
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="outline">Google Vision</Badge>
            <Badge variant="outline">AWS</Badge>
          </div>
          <Button className="w-full mt-4">Configure</Button>
        </div>
        
        <div className="space-y-3 p-4 border rounded-lg">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full inline-block">
            <Bot className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-medium">AI Model Connections</h3>
          <p className="text-sm text-muted-foreground">
            Connect to specialized image AI models
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="outline">Custom Models</Badge>
            <Badge variant="outline">Image Gen</Badge>
          </div>
          <Button className="w-full mt-4">Configure</Button>
        </div>
      </div>
    </Card>
  );
};

export default VisionAIIntegrations;
