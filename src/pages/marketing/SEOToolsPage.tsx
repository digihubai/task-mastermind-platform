
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Globe, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOIntegrations from "@/components/seo/SEOIntegrations";

const SEOToolsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">SEO Tools</h1>
          <p className="text-muted-foreground mt-1">
            Advanced SEO tools and integrations to optimize your content
          </p>
        </div>
        
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="tools">SEO Tools</TabsTrigger>
            <TabsTrigger value="analytics">SEO Analytics</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tools" className="space-y-6">
            <Card className="p-6 border border-border/40">
              <h2 className="text-xl font-semibold mb-4">Advanced SEO Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full inline-block">
                    <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium">Keyword Research</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlimited topical authority clusters to dominate competitive search terms
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">1,000+ Keywords</Badge>
                    <Badge variant="outline">Competitor Analysis</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full inline-block">
                    <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium">Page Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Up to 1,000 optimized pages with code changes for technical SEO excellence
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">Technical SEO</Badge>
                    <Badge variant="outline">Page Performance</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full inline-block">
                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium">SEO Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    In-depth reporting and analytics to track your search performance
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">Rank Tracking</Badge>
                    <Badge variant="outline">ROI Analysis</Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium mb-4">Quick SEO Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    Keyword Research
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Content Audit
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    Rank Tracker
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    SEO Analytics
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">SEO Performance Analytics</h2>
              <p className="text-muted-foreground mb-6">
                Track your website's SEO performance and get insights to improve your rankings.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 border border-border/40">
                  <h3 className="font-medium mb-2">Top Performing Pages</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>/homepage</span>
                      <span className="text-green-500">+12%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>/products</span>
                      <span className="text-green-500">+8%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>/blog/seo-tips</span>
                      <span className="text-red-500">-3%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>/contact</span>
                      <span className="text-green-500">+5%</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 border border-border/40">
                  <h3 className="font-medium mb-2">Top Keywords</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>digital marketing</span>
                      <span>Position 3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>seo services</span>
                      <span>Position 5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>content marketing</span>
                      <span>Position 7</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>local seo</span>
                      <span>Position 2</span>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <SEOIntegrations />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SEOToolsPage;
