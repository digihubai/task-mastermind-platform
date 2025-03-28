
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageAPIIntegrations from "@/components/settings/integrations/ImageAPIIntegrations";
import SEOIntegrations from "@/components/seo/SEOIntegrations";

const SEOImageIntegrations = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">SEO & Image Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Configure API integrations for SEO tools and image providers
          </p>
        </div>
        
        <Tabs defaultValue="image-apis" className="space-y-6">
          <Card>
            <TabsList className="p-2 bg-transparent border-b w-full justify-start">
              <TabsTrigger value="image-apis">Image APIs</TabsTrigger>
              <TabsTrigger value="seo-tools">SEO Tools</TabsTrigger>
            </TabsList>
          </Card>
          
          <TabsContent value="image-apis" className="space-y-6">
            <ImageAPIIntegrations />
          </TabsContent>
          
          <TabsContent value="seo-tools" className="space-y-6">
            <SEOIntegrations />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SEOImageIntegrations;
