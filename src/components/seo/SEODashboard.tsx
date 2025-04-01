
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Target, BarChart3, PlusCircle, Globe, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import SEOContentGenerator from './SEOContentGenerator';
import SEOCampaignManager from './SEOCampaignManager';
import SEOAnalytics from './SEOAnalytics';
import SEOTopicClusters from './SEOTopicClusters';
import SEOClientApproval from './SEOClientApproval';

// Import from seoService.ts instead of directly from services/seo
import { 
  generateKeywords,
  generateTitles,
  generateOutline,
  generateContent
} from '@/services/seoService';

interface SEODashboardProps {
  defaultTab?: string;
}

const SEODashboard: React.FC<SEODashboardProps> = ({ defaultTab = "content" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const handleCreateCampaign = () => {
    setActiveTab("campaigns");
    // Delay to ensure the tab change happens first
    setTimeout(() => {
      toast.info("Ready to create a new SEO campaign");
    }, 100);
  };
  
  const handleCreateContent = () => {
    setActiveTab("content");
    // Delay to ensure the tab change happens first
    setTimeout(() => {
      toast.info("Ready to create new SEO content");
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">SEO Management</h1>
          <p className="text-muted-foreground mt-1">
            Optimize your content for search engines and improve your rankings
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setActiveTab("analytics")}
            className="flex items-center gap-2"
          >
            <BarChart3 size={18} />
            <span>View Analytics</span>
          </Button>
          
          <Button
            onClick={handleCreateCampaign}
            className="flex items-center gap-2"
          >
            <PlusCircle size={18} />
            <span>New Campaign</span>
          </Button>
        </div>
      </div>
      
      <Card className="p-6 border border-border/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full inline-block">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium">AI Content Creation</h3>
            <p className="text-sm text-muted-foreground">
              Generate SEO-optimized content with advanced AI tools and built-in keyword research
            </p>
            <Button variant="outline" size="sm" className="mt-2" onClick={handleCreateContent}>
              Create Content <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full inline-block">
              <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium">Campaign Management</h3>
            <p className="text-sm text-muted-foreground">
              Track campaign progress, keyword rankings, and content performance
            </p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => setActiveTab("campaigns")}>
              View Campaigns <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full inline-block">
              <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-medium">Topic Clusters</h3>
            <p className="text-sm text-muted-foreground">
              Build comprehensive content clusters around key topics to establish topical authority
            </p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => setActiveTab("clusters")}>
              Manage Clusters <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="content">Content Generator</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="clusters">Topic Clusters</TabsTrigger>
          <TabsTrigger value="approvals">Client Approvals</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="content" className="m-0">
            <SEOContentGenerator 
              generateKeywords={generateKeywords}
              generateTitles={generateTitles}
              generateOutline={generateOutline}
              generateContent={(title, outline, keywords) => generateContent(title, outline, keywords)}
            />
          </TabsContent>
          
          <TabsContent value="campaigns" className="m-0">
            <SEOCampaignManager />
          </TabsContent>
          
          <TabsContent value="analytics" className="m-0">
            <SEOAnalytics />
          </TabsContent>
          
          <TabsContent value="clusters" className="m-0">
            <SEOTopicClusters />
          </TabsContent>
          
          <TabsContent value="approvals" className="m-0">
            <SEOClientApproval />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SEODashboard;
