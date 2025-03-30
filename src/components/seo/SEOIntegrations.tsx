
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AIKeyConfig from '@/components/settings/integrations/AIKeyConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";

const SEOIntegrations: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Content Generation</CardTitle>
          <CardDescription>
            Configure AI services for SEO content generation across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="api-keys" className="space-y-4">
            <TabsList>
              <TabsTrigger value="api-keys">API Keys</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="api-keys">
              <AIKeyConfig />
              
              <Alert className="bg-blue-50 dark:bg-blue-900/20 mt-4">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription>
                  Your API keys are stored locally in your browser and are never sent to our servers. They are used only to make direct calls to the AI service from your browser.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Content Generation Settings</CardTitle>
                  <CardDescription>
                    Configure default settings for AI-generated content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Content generation preferences will be available in an upcoming release.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>SEO Tools Integration</CardTitle>
          <CardDescription>
            Connect with third-party SEO tools and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Third-party SEO tool integrations will be available in an upcoming release.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOIntegrations;
