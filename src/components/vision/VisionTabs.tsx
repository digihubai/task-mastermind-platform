
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface VisionTabsProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const VisionTabs = ({ selectedTab, onTabChange, children }: VisionTabsProps) => {
  return (
    <Tabs value={selectedTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="vision">Vision Analysis</TabsTrigger>
        <TabsTrigger value="seo">SEO Tools</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default VisionTabs;
