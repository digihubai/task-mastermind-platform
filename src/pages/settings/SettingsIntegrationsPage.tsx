
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
  Bot
} from "lucide-react";
import SEOIntegrations from "@/components/seo/SEOIntegrations";

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

        <Tabs defaultValue="api" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="api">API Connections</TabsTrigger>
            <TabsTrigger value="seo">SEO Tools</TabsTrigger>
            <TabsTrigger value="vision">Vision AI</TabsTrigger>
            <TabsTrigger value="chat">Chat Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">API Integrations</h2>
              <p className="mb-6 text-muted-foreground">
                Connect DigiHub to your favorite services via API
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full inline-block">
                    <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium">CRM Connections</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to Salesforce, HubSpot, and more
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">Salesforce</Badge>
                    <Badge variant="outline">HubSpot</Badge>
                  </div>
                  <Button className="w-full mt-4">Configure</Button>
                </div>
                
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full inline-block">
                    <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium">Marketing Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to Mailchimp, ActiveCampaign, and more
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">Mailchimp</Badge>
                    <Badge variant="outline">Marketing</Badge>
                  </div>
                  <Button className="w-full mt-4">Configure</Button>
                </div>
                
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full inline-block">
                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium">Analytics APIs</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to Google Analytics, Mixpanel, and more
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">Google</Badge>
                    <Badge variant="outline">Mixpanel</Badge>
                  </div>
                  <Button className="w-full mt-4">Configure</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="seo">
            <SEOIntegrations />
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
          
          <TabsContent value="chat" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Chat Services Integrations</h2>
              <p className="mb-6 text-muted-foreground">
                Connect DigiHub Chat to messaging platforms
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full inline-block">
                    <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium">Chat Platform Connections</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to Slack, Discord, and more
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">Slack</Badge>
                    <Badge variant="outline">Discord</Badge>
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
