
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
import SEOIntegrations from "@/components/seo/SEOIntegrations";
import ApiKeysIntegrations from "@/components/settings/integrations/ApiKeysIntegrations";
import MessagingIntegrations from "@/components/settings/integrations/MessagingIntegrations";
import CMSIntegrations from "@/components/settings/integrations/CMSIntegrations";
import SEOAnalyticsIntegrations from "@/components/settings/integrations/SEOAnalyticsIntegrations";

const SettingsIntegrationsPage = () => {
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
            <TabsTrigger value="cms">CMS</TabsTrigger>
            <TabsTrigger value="seo-analytics">SEO Analytics</TabsTrigger>
            <TabsTrigger value="messaging">Messaging</TabsTrigger>
            <TabsTrigger value="seo-tools">SEO Tools</TabsTrigger>
            <TabsTrigger value="api">API Connections</TabsTrigger>
            <TabsTrigger value="vision">Vision AI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cms" className="space-y-4">
            <CMSIntegrations />
          </TabsContent>
          
          <TabsContent value="seo-analytics" className="space-y-4">
            <SEOAnalyticsIntegrations />
          </TabsContent>
          
          <TabsContent value="messaging" className="space-y-4">
            <MessagingIntegrations />
          </TabsContent>
          
          <TabsContent value="seo-tools" className="space-y-4">
            <SEOIntegrations />
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <ApiKeysIntegrations />
          </TabsContent>
          
          <TabsContent value="vision" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Vision AI Integrations</h2>
              <p className="mb-6 text-muted-foreground">
                Connect DigiHub Vision AI to image processing services
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full inline-block">
                    <Image className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium">Image Analysis APIs</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to Google Vision, AWS Rekognition, and more
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">Google Vision</Badge>
                    <Badge variant="outline">AWS</Badge>
                  </div>
                  <Button className="w-full mt-4">Configure</Button>
                </div>
                
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full inline-block">
                    <Bot className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium">AI Model Connections</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to specialized image AI models
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">Custom Models</Badge>
                    <Badge variant="outline">Image Gen</Badge>
                  </div>
                  <Button className="w-full mt-4">Configure</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsIntegrationsPage;
