
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
import useRoleBasedSettings from "@/hooks/use-role-based-settings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SettingsIntegrationsPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("cms");
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const { userRole } = useRoleBasedSettings();
  
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

  const isSuperAdmin = userRole === 'super_admin';

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Connect your DigiHub platform with external services and tools
          </p>
          {isSuperAdmin && (
            <Alert className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">Super Admin Access</AlertTitle>
              <AlertDescription className="text-blue-800 dark:text-blue-300">
                You have access to all advanced integration settings as a super admin. Configure organizational AI keys in <a href="/settings/ai-configuration" className="underline font-medium">AI Configuration</a>.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="cms">Website & CMS</TabsTrigger>
            <TabsTrigger value="seo-analytics">SEO Analytics</TabsTrigger>
            <TabsTrigger value="messaging">Communication</TabsTrigger>
            <TabsTrigger value="api">API Connections</TabsTrigger>
            {isSuperAdmin && <TabsTrigger value="admin">Admin Controls</TabsTrigger>}
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
          
          {isSuperAdmin && (
            <TabsContent value="admin" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Super Admin Integration Controls</h2>
                <p className="mb-4 text-muted-foreground">Configure system-wide integration settings and API keys</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 border border-border/40 hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => window.location.href = "/settings/ai-configuration"}>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">AI Configuration</h3>
                        <p className="text-sm text-muted-foreground mt-1">Configure OpenAI API keys and AI models</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border border-border/40 hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => window.location.href = "/settings/seo-image-integrations"}>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Image className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Image & SEO Services</h3>
                        <p className="text-sm text-muted-foreground mt-1">Configure image generation and SEO services</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsIntegrationsPage;
