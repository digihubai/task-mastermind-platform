
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface VisionTabsProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const VisionTabs = ({ selectedTab, onTabChange, children }: VisionTabsProps) => {
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    if (value === "seo") {
      // Redirect to AI SEO Writer page when SEO Tools tab is clicked
      navigate("/ai/seo");
      return;
    } else if (value === "integrations") {
      // Redirect to the integrations tab
      navigate("/settings/integrations");
      return;
    }
    
    onTabChange(value);
  };

  return (
    <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
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
