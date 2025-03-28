
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Search, BarChart3, LineChart, Activity, Globe } from "lucide-react";
import { IntegrationProps } from './types';

const SEOAnalyticsIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<{[key: string]: boolean}>({
    googleAnalytics: false,
    searchConsole: false,
    bingWebmaster: false,
    adobeAnalytics: false,
    matomo: false,
    hotjar: false,
    crazyEgg: false,
  });
  
  const [apiKeys, setApiKeys] = useState<{[key: string]: string}>({
    googleAnalytics: "",
    searchConsole: "",
    bingWebmaster: "",
    adobeAnalytics: "",
    matomo: "",
    hotjar: "",
    crazyEgg: "",
  });

  const handleInputChange = (service: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [service]: value }));
  };

  const handleConnect = (service: string) => {
    if (connected[service]) {
      toast({
        title: "Already Connected",
        description: `Your ${getServiceName(service)} is already connected.`,
      });
      return;
    }

    if (!apiKeys[service]) {
      toast({
        title: "API Key Required",
        description: `Please enter your ${getServiceName(service)} API key.`,
        variant: "destructive",
      });
      return;
    }

    setConnecting(service);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(null);
      setConnected({...connected, [service]: true});
      toast({
        title: "Connection Successful",
        description: `Your ${getServiceName(service)} account has been connected successfully.`,
      });
      
      if (onConnect) {
        onConnect(service);
      }
    }, 1500);
  };

  const handleDisconnect = (service: string) => {
    setConnected({...connected, [service]: false});
    setApiKeys(prev => ({ ...prev, [service]: "" }));
    toast({
      title: "Disconnected",
      description: `Your ${getServiceName(service)} account has been disconnected.`,
    });
  };

  const getServiceName = (service: string): string => {
    const serviceNames: {[key: string]: string} = {
      googleAnalytics: "Google Analytics 4",
      searchConsole: "Google Search Console",
      bingWebmaster: "Bing Webmaster Tools",
      adobeAnalytics: "Adobe Analytics",
      matomo: "Matomo",
      hotjar: "Hotjar",
      crazyEgg: "Crazy Egg",
    };
    return serviceNames[service] || service;
  };

  // Helper function to create Analytics integration cards
  const renderAnalyticsCard = (
    service: string, 
    name: string, 
    description: string, 
    icon: React.ReactNode,
    backgroundColor: string
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
      
      {connected[service] ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600 font-medium">Connected</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDisconnect(service)}
            >
              Disconnect
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Input
            placeholder={`${name} API Key`}
            className="mb-3"
            value={apiKeys[service]}
            onChange={(e) => handleInputChange(service, e.target.value)}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleConnect(service)}
            disabled={connecting === service}
          >
            {connecting === service ? "Connecting..." : "Connect"}
          </Button>
        </>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">SEO Analytics Integrations</h2>
      <p className="text-sm text-muted-foreground">
        Connect your analytics tools to track SEO performance and user behavior
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderAnalyticsCard(
          "googleAnalytics",
          "Google Analytics 4",
          "Track website traffic and user behavior",
          <BarChart3 className="h-5 w-5 text-blue-600" />,
          "bg-blue-100"
        )}
        
        {renderAnalyticsCard(
          "searchConsole",
          "Google Search Console",
          "Monitor search performance and website health",
          <Search className="h-5 w-5 text-green-600" />,
          "bg-green-100"
        )}
        
        {renderAnalyticsCard(
          "bingWebmaster",
          "Bing Webmaster Tools",
          "Track performance on Microsoft's search engine",
          <Globe className="h-5 w-5 text-blue-600" />,
          "bg-blue-100"
        )}
        
        {renderAnalyticsCard(
          "adobeAnalytics",
          "Adobe Analytics",
          "Enterprise-grade website analytics",
          <Activity className="h-5 w-5 text-red-600" />,
          "bg-red-100"
        )}
        
        {renderAnalyticsCard(
          "matomo",
          "Matomo",
          "Privacy-focused web analytics platform",
          <LineChart className="h-5 w-5 text-purple-600" />,
          "bg-purple-100"
        )}
        
        {renderAnalyticsCard(
          "hotjar",
          "Hotjar",
          "Visualize user behavior with heatmaps",
          <Activity className="h-5 w-5 text-orange-600" />,
          "bg-orange-100"
        )}
        
        {renderAnalyticsCard(
          "crazyEgg",
          "Crazy Egg",
          "Heatmaps and user behavior analysis",
          <Activity className="h-5 w-5 text-yellow-600" />,
          "bg-yellow-100"
        )}
      </div>
    </div>
  );
};

export default SEOAnalyticsIntegrations;
