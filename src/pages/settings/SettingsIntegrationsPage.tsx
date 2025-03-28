
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Globe, 
  FileText, 
  BarChart3, 
  MessageSquare,
  Image,
  Bot,
  Phone,
  Mail,
  MessageCircle,
  MessagesSquare,
  Search,
  Code
} from "lucide-react";
import ApiKeysIntegrations from "@/components/settings/integrations/ApiKeysIntegrations";
import MessagingIntegrations from "@/components/settings/integrations/MessagingIntegrations";
import CMSIntegrations from "@/components/settings/integrations/CMSIntegrations";
import SEOAnalyticsIntegrations from "@/components/settings/integrations/SEOAnalyticsIntegrations";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const SettingsIntegrationsPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("cms");
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  
  // Set active tab based on location state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
    
    if (location.state?.activePlatform) {
      setActivePlatform(location.state.activePlatform);
      // Show a toast notification about the integration
      toast.info(`Opening ${location.state.activePlatform} integration settings`);
    }
  }, [location.state]);
  
  // Track when a CMS platform is connected to inform other tabs
  const handleCMSConnect = (platformId: string) => {
    console.log(`CMS platform connected: ${platformId}`);
    // This could be expanded to use context or state management
    // to share connection status across components
  };
  
  // Track when a messaging platform is connected
  const handleMessagingConnect = (platformId: string) => {
    console.log(`Messaging platform connected: ${platformId}`);
    
    // If Twilio is connected, we could redirect to the phone numbers page
    if (platformId === 'twilio') {
      console.log('Twilio connected - phone number management is available');
      // This could be expanded to show a notification or change UI state
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Connect your DigiHub platform with external services and tools
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="cms">Website & CMS</TabsTrigger>
            <TabsTrigger value="seo-analytics">SEO Analytics</TabsTrigger>
            <TabsTrigger value="messaging">Communication</TabsTrigger>
            <TabsTrigger value="api">API Connections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cms" className="space-y-4">
            <CMSIntegrations onConnect={handleCMSConnect} />
          </TabsContent>
          
          <TabsContent value="seo-analytics" className="space-y-4">
            <SEOAnalyticsIntegrations />
          </TabsContent>
          
          <TabsContent value="messaging" className="space-y-4">
            <MessagingIntegrations 
              onConnect={handleMessagingConnect} 
              activePlatform={activePlatform}
            />
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <ApiKeysIntegrations />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsIntegrationsPage;
