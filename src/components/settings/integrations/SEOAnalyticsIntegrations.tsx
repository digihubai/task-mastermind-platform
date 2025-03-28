
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, Search, Activity, LineChart, Check, X, Loader2, ArrowRight } from "lucide-react";
import { IntegrationProps } from './types';

const SEOAnalyticsIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  
  const [authKeys, setAuthKeys] = useState<Record<string, string>>({
    googleAnalytics: "",
    searchConsole: "",
    bingWebmaster: "",
    adobeAnalytics: "",
    matomo: "",
    piwikPro: "",
    hotjar: "",
    crazyEgg: "",
    googleMyBusiness: "",
  });
  
  const [connected, setConnected] = useState<{[key: string]: boolean}>({
    googleAnalytics: false,
    searchConsole: false,
    bingWebmaster: false,
    adobeAnalytics: false,
    matomo: false,
    piwikPro: false,
    hotjar: false,
    crazyEgg: false,
    googleMyBusiness: false,
  });

  const handleInputChange = (platform: string, value: string) => {
    setAuthKeys(prev => ({ ...prev, [platform]: value }));
  };

  const handleConnect = (platform: string) => {
    if (connected[platform]) {
      toast({
        title: "Already Connected",
        description: `Your ${getPlatformDisplayName(platform)} account is already connected.`,
      });
      return;
    }

    // Validate input
    const key = authKeys[platform];
    if (!key) {
      toast({
        title: "API Key/Auth Required",
        description: `Please enter your ${getPlatformDisplayName(platform)} authentication details.`,
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
        description: `Your ${getPlatformDisplayName(platform)} account has been connected successfully.`,
      });
      
      if (onConnect) {
        onConnect(platform);
      }
    }, 1500);
  };

  const handleDisconnect = (platform: string) => {
    setConnected({...connected, [platform]: false});
    setAuthKeys(prev => ({ ...prev, [platform]: "" }));
    toast({
      title: "Disconnected",
      description: `Your ${getPlatformDisplayName(platform)} account has been disconnected.`,
    });
  };

  // Helper function to get display name
  const getPlatformDisplayName = (platform: string): string => {
    const displayNames: Record<string, string> = {
      googleAnalytics: "Google Analytics 4",
      searchConsole: "Google Search Console",
      bingWebmaster: "Bing Webmaster Tools",
      adobeAnalytics: "Adobe Analytics",
      matomo: "Matomo",
      piwikPro: "Piwik PRO",
      hotjar: "Hotjar",
      crazyEgg: "Crazy Egg",
      googleMyBusiness: "Google Business Profile",
    };
    return displayNames[platform] || platform;
  };

  // Helper function to get platform description
  const getPlatformDescription = (platform: string): string => {
    const descriptions: Record<string, string> = {
      googleAnalytics: "Connect Google Analytics 4 for website insights",
      searchConsole: "Track search performance data",
      bingWebmaster: "Monitor Bing search visibility",
      adobeAnalytics: "Enterprise-level analytics solution",
      matomo: "Privacy-focused web analytics",
      piwikPro: "Enterprise analytics with privacy focus",
      hotjar: "Heatmaps and user recordings",
      crazyEgg: "Visual website analytics tools",
      googleMyBusiness: "Local business profile management",
    };
    return descriptions[platform] || "";
  };

  // Helper function to get platform input placeholder
  const getInputPlaceholder = (platform: string): string => {
    const placeholders: Record<string, string> = {
      googleAnalytics: "Measurement ID (G-XXXXXXXX)",
      searchConsole: "API Key or Connection Token",
      bingWebmaster: "API Key",
      adobeAnalytics: "Client ID",
      matomo: "Site ID or Tracking URL",
      piwikPro: "Site ID or Tracking URL",
      hotjar: "Site ID",
      crazyEgg: "Account ID",
      googleMyBusiness: "API Key or OAuth Token",
    };
    return placeholders[platform] || "API Key";
  };

  // Helper function to get icon and colors
  const getPlatformStyles = (platform: string): { icon: JSX.Element, bgColor: string, textColor: string } => {
    const styles: Record<string, { icon: JSX.Element, bgColor: string, textColor: string }> = {
      googleAnalytics: {
        icon: <BarChart3 className="h-5 w-5 text-yellow-600" />,
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-600"
      },
      searchConsole: {
        icon: <Search className="h-5 w-5 text-blue-600" />,
        bgColor: "bg-blue-100",
        textColor: "text-blue-600"
      },
      bingWebmaster: {
        icon: <Search className="h-5 w-5 text-blue-600" />,
        bgColor: "bg-blue-100",
        textColor: "text-blue-600"
      },
      adobeAnalytics: {
        icon: <BarChart3 className="h-5 w-5 text-red-600" />,
        bgColor: "bg-red-100",
        textColor: "text-red-600"
      },
      matomo: {
        icon: <Activity className="h-5 w-5 text-purple-600" />,
        bgColor: "bg-purple-100",
        textColor: "text-purple-600"
      },
      piwikPro: {
        icon: <Activity className="h-5 w-5 text-indigo-600" />,
        bgColor: "bg-indigo-100",
        textColor: "text-indigo-600"
      },
      hotjar: {
        icon: <Activity className="h-5 w-5 text-red-600" />,
        bgColor: "bg-red-100",
        textColor: "text-red-600"
      },
      crazyEgg: {
        icon: <LineChart className="h-5 w-5 text-orange-600" />,
        bgColor: "bg-orange-100",
        textColor: "text-orange-600"
      },
      googleMyBusiness: {
        icon: <Search className="h-5 w-5 text-green-600" />,
        bgColor: "bg-green-100",
        textColor: "text-green-600"
      }
    };
    
    return styles[platform] || { 
      icon: <BarChart3 className="h-5 w-5 text-gray-600" />,
      bgColor: "bg-gray-100",
      textColor: "text-gray-600"
    };
  };

  // Helper function to render integration cards
  const renderIntegrationCard = (platform: string) => {
    const displayName = getPlatformDisplayName(platform);
    const description = getPlatformDescription(platform);
    const placeholder = getInputPlaceholder(platform);
    const { icon, bgColor, textColor } = getPlatformStyles(platform);
    
    return (
      <Card className="p-5 border" key={platform}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`${bgColor} p-2 rounded-full`}>
            {icon}
          </div>
          <div>
            <h4 className="font-medium">{displayName}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        
        {connected[platform] ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              <span>Connected</span>
            </div>
            <p className="text-xs">Connection active</p>
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
              placeholder={placeholder}
              className="mb-3"
              type="text"
              value={authKeys[platform]}
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
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">SEO Analytics Integrations</h2>
      <p className="text-sm text-muted-foreground">
        Connect your analytics platforms to track and improve SEO performance
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderIntegrationCard("googleAnalytics")}
        {renderIntegrationCard("searchConsole")}
        {renderIntegrationCard("bingWebmaster")}
        {renderIntegrationCard("googleMyBusiness")}
        {renderIntegrationCard("hotjar")}
        {renderIntegrationCard("crazyEgg")}
        {renderIntegrationCard("matomo")}
        {renderIntegrationCard("piwikPro")}
        {renderIntegrationCard("adobeAnalytics")}
      </div>
      
      <Card className="p-5 border mt-6">
        <h3 className="text-lg font-medium mb-4">Bulk Data Import</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Import data from multiple sources at once for comprehensive analysis
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Import historical data (up to 16 months)</span>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Sync data hourly (real-time updates)</span>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Include Search Console position data</span>
            <Switch defaultChecked />
          </div>
          
          <Button className="mt-2 w-full">Configure Data Import Settings</Button>
        </div>
      </Card>
    </div>
  );
};

export default SEOAnalyticsIntegrations;
