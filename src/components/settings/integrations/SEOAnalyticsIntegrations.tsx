
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { IntegrationProps } from './types';
import AnalyticsServicesGrid from './seo/AnalyticsServicesGrid';
import SEOHelpFooter from './seo/SEOHelpFooter';
import { SEOAnalyticsServiceState } from './seo/types';

const SEOAnalyticsIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  
  const [serviceState, setServiceState] = useState<SEOAnalyticsServiceState>({
    connected: {
      googleAnalytics: false,
      searchConsole: false,
      bingWebmaster: false,
      adobeAnalytics: false,
      matomo: false,
      hotjar: false,
      crazyEgg: false,
    },
    apiKeys: {
      googleAnalytics: "",
      searchConsole: "",
      bingWebmaster: "",
      adobeAnalytics: "",
      matomo: "",
      hotjar: "",
      crazyEgg: "",
    }
  });

  const handleInputChange = (service: string, value: string) => {
    setServiceState(prev => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [service]: value
      }
    }));
  };

  const handleConnect = (service: string) => {
    if (serviceState.connected[service]) {
      toast({
        title: "Already Connected",
        description: `Your ${getServiceName(service)} is already connected.`,
      });
      return;
    }

    if (!serviceState.apiKeys[service]) {
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
      setServiceState(prev => ({
        ...prev,
        connected: {
          ...prev.connected,
          [service]: true
        }
      }));
      
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
    setServiceState(prev => ({
      ...prev,
      connected: {
        ...prev.connected,
        [service]: false
      },
      apiKeys: {
        ...prev.apiKeys,
        [service]: ""
      }
    }));
    
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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">SEO Analytics Integrations</h2>
      <p className="text-sm text-muted-foreground">
        Connect your analytics tools to track SEO performance and user behavior
      </p>
      
      <AnalyticsServicesGrid 
        serviceState={serviceState}
        connecting={connecting}
        handleInputChange={handleInputChange}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
      />
      
      <SEOHelpFooter />
    </div>
  );
};

export default SEOAnalyticsIntegrations;
