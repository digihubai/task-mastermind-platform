
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  Globe, 
  FileText, 
  BarChart, 
  RefreshCw,
  Settings,
  Lock
} from "lucide-react";

const SEOIntegrations = () => {
  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-semibold mb-4">SEO Integrations & Tools</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Connected Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 border border-border/40">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                    <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Google Search Console</h4>
                    <p className="text-xs text-muted-foreground mt-1">Keyword and search data</p>
                  </div>
                </div>
                <Badge className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Connected</span>
                </Badge>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">Manage</Button>
              </div>
            </Card>
            
            <Card className="p-4 border border-border/40">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                    <BarChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Google Analytics</h4>
                    <p className="text-xs text-muted-foreground mt-1">Traffic and user data</p>
                  </div>
                </div>
                <Badge className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Connected</span>
                </Badge>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">Manage</Button>
              </div>
            </Card>
            
            <Card className="p-4 border border-border/40">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Ahrefs</h4>
                    <p className="text-xs text-muted-foreground mt-1">Backlink and keyword data</p>
                  </div>
                </div>
                <Badge className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  <span>Disconnected</span>
                </Badge>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">Connect</Button>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-3">Publishing Platforms</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 border border-border/40">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                    <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">WordPress</h4>
                    <p className="text-xs text-muted-foreground mt-1">Direct publishing</p>
                  </div>
                </div>
                <Badge className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Connected</span>
                </Badge>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">Manage</Button>
              </div>
            </Card>
            
            <Card className="p-4 border border-border/40">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Medium</h4>
                    <p className="text-xs text-muted-foreground mt-1">Article publishing</p>
                  </div>
                </div>
                <Badge className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  <span>Disconnected</span>
                </Badge>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">Connect</Button>
              </div>
            </Card>
            
            <Card className="p-4 border border-border/40">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Shopify</h4>
                    <p className="text-xs text-muted-foreground mt-1">Product descriptions</p>
                  </div>
                </div>
                <Badge className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  <span>Disconnected</span>
                </Badge>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">Connect</Button>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-3">Tool Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 border border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">API Settings</h4>
                    <p className="text-xs text-muted-foreground">Configure API keys and limits</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Configure</Button>
              </div>
            </Card>
            
            <Card className="p-4 border border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Sync Settings</h4>
                    <p className="text-xs text-muted-foreground">Configure data synchronization</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Configure</Button>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-medium mb-2">Upgrade to Unlock More Integrations</h3>
          <Card className="p-4 bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm">Additional integrations are available on the Pro and Enterprise plans.</p>
                <Button size="sm" className="mt-2">Upgrade Plan</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default SEOIntegrations;
