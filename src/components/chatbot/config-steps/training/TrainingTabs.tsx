
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TrainingTabsProps {
  activeTab: "website" | "pdf" | "text" | "qa";
  onTabChange: (tab: "website" | "pdf" | "text" | "qa") => void;
}

export const TrainingTabs: React.FC<TrainingTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-4 mb-6">
      <TabsTrigger 
        value="website" 
        onClick={() => onTabChange("website")}
        className={activeTab === "website" ? "data-[state=active]" : ""}
      >
        Website
      </TabsTrigger>
      <TabsTrigger 
        value="pdf" 
        onClick={() => onTabChange("pdf")}
        className={activeTab === "pdf" ? "data-[state=active]" : ""}
      >
        PDF
      </TabsTrigger>
      <TabsTrigger 
        value="text" 
        onClick={() => onTabChange("text")}
        className={activeTab === "text" ? "data-[state=active]" : ""}
      >
        Text
      </TabsTrigger>
      <TabsTrigger 
        value="qa" 
        onClick={() => onTabChange("qa")}
        className={activeTab === "qa" ? "data-[state=active]" : ""}
      >
        Q&A
      </TabsTrigger>
    </TabsList>
  );
};
