
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const SettingsIntegrationsPage = () => {
  // Track when a CMS platform is connected to inform other tabs
  const handleCMSConnect = (platformId: string) => {
    console.log(`CMS platform connected: ${platformId}`);
    // This could be expanded to use context or state management
    // to share connection status across components
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

        <Tabs defaultValue="cms" className="w-full">
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="cms">Website & CMS</TabsTrigger>
            <TabsTrigger value="seo-analytics">SEO Analytics</TabsTrigger>
            <TabsTrigger value="messaging">Messaging</TabsTrigger>
            <TabsTrigger value="api">API Connections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cms" className="space-y-4">
            <CMSIntegrations onConnect={handleCMSConnect} />
          </TabsContent>
          
          <TabsContent value="seo-analytics" className="space-y-4">
            <SEOAnalyticsIntegrations />
          </TabsContent>
          
          <TabsContent value="messaging" className="space-y-4">
            <MessagingIntegrations />
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
