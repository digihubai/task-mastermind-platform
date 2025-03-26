
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  ArrowRight, 
  FileText,
  Settings 
} from "lucide-react";

const SEOIntegrations = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Content Management Integrations</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Push your optimized content directly to your preferred CMS platform
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-dashed border-2 cursor-pointer hover:border-primary/70 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">WordPress</h4>
              <p className="text-xs text-muted-foreground">Connect your WordPress site</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">
            Connect <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
        
        <Card className="p-4 border-dashed border-2 cursor-pointer hover:border-primary/70 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Shopify</h4>
              <p className="text-xs text-muted-foreground">Connect your Shopify store</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">
            Connect <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
        
        <Card className="p-4 border-dashed border-2 cursor-pointer hover:border-primary/70 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Settings className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium">Wix</h4>
              <p className="text-xs text-muted-foreground">Connect your Wix site</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">
            Connect <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
      
      <div className="mt-6">
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Manage Integrations
        </Button>
      </div>
    </div>
  );
};

export default SEOIntegrations;
