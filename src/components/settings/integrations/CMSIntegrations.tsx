
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";
import { IntegrationProps } from './types';
import SEOIntegrationSettings from '@/components/seo/SEOIntegrationSettings';
import CMSFilter from './cms/CMSFilter';
import CMSGrid from './cms/CMSGrid';

const CMSIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'cms' | 'ecommerce'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [connected, setConnected] = useState<{[key: string]: boolean}>({
    wordpress: false,
    shopify: false,
    webflow: false,
    wix: false,
    wixecommerce: false,
    squarespace: false,
    drupal: false,
    joomla: false,
    magento: false,
    woocommerce: false,
    bigcommerce: false,
    hubspot: false,
    prestashop: false,
    ghost: false,
    contentful: false
  });
  
  const [websites, setWebsites] = useState<{[key: string]: string}>({
    wordpress: "",
    shopify: "",
    webflow: "",
    wix: "",
    wixecommerce: "",
    squarespace: "",
    drupal: "",
    joomla: "",
    magento: "",
    woocommerce: "",
    bigcommerce: "",
    hubspot: "",
    prestashop: "",
    ghost: "",
    contentful: ""
  });

  const handleInputChange = (platform: string, value: string) => {
    setWebsites(prev => ({ ...prev, [platform]: value }));
  };

  const handleConnect = (platform: string) => {
    if (connected[platform]) {
      toast({
        title: "Already Connected",
        description: `Your ${getPlatformName(platform)} site is already connected.`,
      });
      return;
    }

    if (!websites[platform]) {
      toast({
        title: "Website URL Required",
        description: `Please enter your ${getPlatformName(platform)} website URL.`,
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
        description: `Your ${getPlatformName(platform)} site has been connected successfully.`,
      });
      
      if (onConnect) {
        onConnect(platform);
      }
    }, 1500);
  };

  const handleDisconnect = (platform: string) => {
    setConnected({...connected, [platform]: false});
    setWebsites(prev => ({ ...prev, [platform]: "" }));
    toast({
      title: "Disconnected",
      description: `Your ${getPlatformName(platform)} site has been disconnected.`,
    });
  };

  const getPlatformName = (platform: string): string => {
    const platformNames: {[key: string]: string} = {
      wordpress: "WordPress",
      shopify: "Shopify",
      webflow: "Webflow",
      wix: "Wix",
      wixecommerce: "Wix eCommerce",
      squarespace: "Squarespace",
      drupal: "Drupal",
      joomla: "Joomla",
      magento: "Magento",
      woocommerce: "WooCommerce",
      bigcommerce: "BigCommerce",
      hubspot: "HubSpot CMS",
      prestashop: "PrestaShop",
      ghost: "Ghost CMS",
      contentful: "Contentful"
    };
    return platformNames[platform] || platform;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Website & CMS Integrations</h2>
        <p className="text-sm text-muted-foreground">
          Connect your website or content management system
        </p>
      </div>
      
      <CMSFilter 
        filter={filterType}
        searchQuery={searchQuery}
        onFilterChange={setFilterType}
        onSearchChange={setSearchQuery}
      />
      
      <CMSGrid 
        urls={websites}
        connected={connected}
        connecting={connecting}
        onInputChange={handleInputChange}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        filter={filterType}
        searchQuery={searchQuery}
      />
      
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
      
      <SEOIntegrationSettings />
    </div>
  );
};

export default CMSIntegrations;
