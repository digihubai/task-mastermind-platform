
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Globe, FileText } from "lucide-react";
import { IntegrationProps } from './types';
import SEOIntegrationSettings from '@/components/seo/SEOIntegrationSettings';

const CMSIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<{[key: string]: boolean}>({
    wordpress: false,
    shopify: false,
    webflow: false,
  });
  
  const [websites, setWebsites] = useState<{[key: string]: string}>({
    wordpress: "",
    shopify: "",
    webflow: "",
  });

  const handleInputChange = (cms: string, value: string) => {
    setWebsites(prev => ({ ...prev, [cms]: value }));
  };

  const handleConnect = (cms: string) => {
    if (connected[cms]) {
      toast({
        title: "Already Connected",
        description: `Your ${getCMSName(cms)} site is already connected.`,
      });
      return;
    }

    if (!websites[cms]) {
      toast({
        title: "Website URL Required",
        description: `Please enter your ${getCMSName(cms)} website URL.`,
        variant: "destructive",
      });
      return;
    }

    setConnecting(cms);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(null);
      setConnected({...connected, [cms]: true});
      toast({
        title: "Connection Successful",
        description: `Your ${getCMSName(cms)} site has been connected successfully.`,
      });
      
      if (onConnect) {
        onConnect(cms);
      }
    }, 1500);
  };

  const handleDisconnect = (cms: string) => {
    setConnected({...connected, [cms]: false});
    setWebsites(prev => ({ ...prev, [cms]: "" }));
    toast({
      title: "Disconnected",
      description: `Your ${getCMSName(cms)} site has been disconnected.`,
    });
  };

  const getCMSName = (cms: string): string => {
    const cmsNames: {[key: string]: string} = {
      wordpress: "WordPress",
      shopify: "Shopify",
      webflow: "Webflow",
    };
    return cmsNames[cms] || cms;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Website & CMS Integrations</h2>
        <p className="text-sm text-muted-foreground">
          Connect your website or content management system
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(websites).map(cms => (
          <Card key={cms} className="p-5 border">
            <div className="flex items-center gap-3 mb-4">
              <div className={cms === "wordpress" 
                ? "bg-blue-100 p-2 rounded-full" 
                : cms === "shopify" 
                ? "bg-green-100 p-2 rounded-full" 
                : "bg-purple-100 p-2 rounded-full"
              }>
                <Globe className={`h-5 w-5 ${cms === "wordpress" 
                  ? "text-blue-600" 
                  : cms === "shopify" 
                  ? "text-green-600" 
                  : "text-purple-600"}`} 
                />
              </div>
              <div>
                <h4 className="font-medium">{getCMSName(cms)}</h4>
                <p className="text-xs text-muted-foreground">
                  Connect your {getCMSName(cms)} site
                </p>
              </div>
            </div>
            
            {connected[cms] ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDisconnect(cms)}
                  >
                    Disconnect
                  </Button>
                </div>
                <p className="text-xs truncate">{websites[cms]}</p>
              </div>
            ) : (
              <>
                <Input
                  placeholder="Enter your site URL"
                  className="mb-3"
                  value={websites[cms]}
                  onChange={(e) => handleInputChange(cms, e.target.value)}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleConnect(cms)}
                  disabled={connecting === cms}
                >
                  {connecting === cms ? "Connecting..." : "Connect"}
                </Button>
              </>
            )}
          </Card>
        ))}
      </div>

      <Card className="p-5 border mt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 p-2 rounded-full">
            <FileText className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-medium">Integration Features</h4>
            <p className="text-sm text-muted-foreground">
              Capabilities available for connected websites
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-md p-3">
            <h5 className="font-medium mb-1">Content Sync</h5>
            <p className="text-xs text-muted-foreground">
              Two-way content synchronization between DigiHub and your CMS
            </p>
          </div>
          
          <div className="border rounded-md p-3">
            <h5 className="font-medium mb-1">Media Library Access</h5>
            <p className="text-xs text-muted-foreground">
              Access and use media directly from your CMS
            </p>
          </div>
          
          <div className="border rounded-md p-3">
            <h5 className="font-medium mb-1">Publish Controls</h5>
            <p className="text-xs text-muted-foreground">
              Schedule and publish content directly to your site
            </p>
          </div>
        </div>
      </Card>
      
      <div className="border border-dashed border-border p-6 rounded-lg flex items-center justify-center">
        <img 
          src="/lovable-uploads/51068ff4-8d7f-4ab7-9a51-8916cd8545b6.png" 
          alt="SEO Integration Settings" 
          className="max-w-full" 
        />
      </div>

      <SEOIntegrationSettings />
    </div>
  );
};

export default CMSIntegrations;
