
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Globe, FileText, Check, X, Loader2, Link, ArrowRight, ShoppingCart } from "lucide-react";
import { IntegrationProps } from './types';

const CMSIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [urls, setUrls] = useState<Record<string, string>>({
    wordpress: "",
    shopify: "",
    wix: "",
    squarespace: "",
    joomla: "",
    magento: "",
    woocommerce: "",
    bigcommerce: "",
    webflow: "",
    hubspot: "",
  });
  
  const [connected, setConnected] = useState<{[key: string]: boolean}>({
    wordpress: false,
    shopify: false,
    wix: false,
    squarespace: false,
    joomla: false,
    magento: false,
    woocommerce: false,
    bigcommerce: false,
    webflow: false,
    hubspot: false,
  });

  const handleInputChange = (platform: string, value: string) => {
    setUrls(prev => ({ ...prev, [platform]: value }));
  };

  const handleConnect = (platform: string) => {
    if (connected[platform]) {
      toast({
        title: "Already Connected",
        description: `Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} site is already connected.`,
      });
      return;
    }

    // Validate URL
    const url = urls[platform];
    if (!url) {
      toast({
        title: "URL Required",
        description: `Please enter your ${platform.charAt(0).toUpperCase() + platform.slice(1)} site URL.`,
        variant: "destructive",
      });
      return;
    }

    setConnecting(platform);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(null);
      setConnected({...connected, [platform]: true});
      toast({
        title: "Connection Successful",
        description: `Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} site has been connected successfully.`,
      });
      
      if (onConnect) {
        onConnect(platform);
      }
    }, 1500);
  };

  const handleDisconnect = (platform: string) => {
    setConnected({...connected, [platform]: false});
    setUrls(prev => ({ ...prev, [platform]: "" }));
    toast({
      title: "Disconnected",
      description: `Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} site has been disconnected.`,
    });
  };

  // Helper function to create CMS cards
  const renderCMSCard = (
    platform: string, 
    name: string, 
    description: string, 
    icon: React.ReactNode,
    backgroundColor: string,
    textColor: string
  ) => (
    <Card className="p-5 border">
      <div className="flex items-center gap-3 mb-4">
        <div className={`${backgroundColor} p-2 rounded-full`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      
      {connected[platform] ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Connected</span>
          </div>
          <p className="text-xs truncate">{urls[platform]}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleDisconnect(platform)}
          >
            <X className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      ) : (
        <>
          <Input
            placeholder={`https://your-${platform}-site.com`}
            className="mb-3"
            value={urls[platform]}
            onChange={(e) => handleInputChange(platform, e.target.value)}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleConnect(platform)}
            disabled={connecting === platform}
          >
            {connecting === platform ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                Connect <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">CMS Integrations</h2>
      <p className="text-sm text-muted-foreground">
        Connect your content management systems to optimize SEO directly within your platform
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* WordPress */}
        {renderCMSCard(
          "wordpress",
          "WordPress",
          "Connect with WordPress + Yoast/RankMath",
          <Globe className="h-5 w-5 text-blue-600" />,
          "bg-blue-100",
          "text-blue-600"
        )}
        
        {/* Shopify */}
        {renderCMSCard(
          "shopify",
          "Shopify",
          "Connect your Shopify store",
          <ShoppingCart className="h-5 w-5 text-green-600" />,
          "bg-green-100",
          "text-green-600"
        )}
        
        {/* Wix */}
        {renderCMSCard(
          "wix",
          "Wix",
          "Connect your Wix site",
          <Globe className="h-5 w-5 text-purple-600" />,
          "bg-purple-100",
          "text-purple-600"
        )}
        
        {/* Squarespace */}
        {renderCMSCard(
          "squarespace",
          "Squarespace",
          "Connect your Squarespace site",
          <FileText className="h-5 w-5 text-gray-600" />,
          "bg-gray-100",
          "text-gray-600"
        )}
        
        {/* Joomla */}
        {renderCMSCard(
          "joomla",
          "Joomla",
          "Connect your Joomla site",
          <Globe className="h-5 w-5 text-orange-600" />,
          "bg-orange-100",
          "text-orange-600"
        )}
        
        {/* Magento */}
        {renderCMSCard(
          "magento",
          "Magento",
          "Connect your Magento store",
          <ShoppingCart className="h-5 w-5 text-red-600" />,
          "bg-red-100",
          "text-red-600"
        )}
        
        {/* WooCommerce */}
        {renderCMSCard(
          "woocommerce",
          "WooCommerce",
          "Connect your WooCommerce store",
          <ShoppingCart className="h-5 w-5 text-purple-600" />,
          "bg-purple-100",
          "text-purple-600"
        )}
        
        {/* BigCommerce */}
        {renderCMSCard(
          "bigcommerce",
          "BigCommerce",
          "Connect your BigCommerce store",
          <ShoppingCart className="h-5 w-5 text-blue-600" />,
          "bg-blue-100",
          "text-blue-600"
        )}
        
        {/* Webflow */}
        {renderCMSCard(
          "webflow",
          "Webflow",
          "Connect your Webflow site",
          <Globe className="h-5 w-5 text-teal-600" />,
          "bg-teal-100",
          "text-teal-600"
        )}
        
        {/* HubSpot */}
        {renderCMSCard(
          "hubspot",
          "HubSpot CMS",
          "Connect your HubSpot CMS",
          <FileText className="h-5 w-5 text-orange-600" />,
          "bg-orange-100",
          "text-orange-600"
        )}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <Link className="h-4 w-4" />
        <span>Need help with CMS integrations? <a href="#" className="text-primary hover:underline">View our integration docs</a></span>
      </div>
    </div>
  );
};

export default CMSIntegrations;
