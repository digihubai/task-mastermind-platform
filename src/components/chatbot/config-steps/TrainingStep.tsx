
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const TrainingStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Train</h2>
      <p className="text-muted-foreground">
        Train your chatbot by providing knowledge or connecting data sources.
      </p>
      
      <div className="space-y-4 mt-6">
        <div className="border rounded-md p-4">
          <h3 className="font-medium">Knowledge Base</h3>
          <p className="text-sm text-muted-foreground mb-2">Add documents, FAQs, or other text-based knowledge</p>
          <Button variant="outline" className="w-full">
            <PlusCircle size={16} className="mr-2" />
            Add Knowledge Source
          </Button>
        </div>
        
        <div className="border rounded-md p-4">
          <h3 className="font-medium">Website Integration</h3>
          <p className="text-sm text-muted-foreground mb-2">Let the chatbot crawl your website for knowledge</p>
          <Button variant="outline" className="w-full">
            <PlusCircle size={16} className="mr-2" />
            Add Website URL
          </Button>
        </div>
        
        <div className="border rounded-md p-4">
          <h3 className="font-medium">API Connections</h3>
          <p className="text-sm text-muted-foreground mb-2">Connect to external APIs for dynamic data</p>
          <Button variant="outline" className="w-full">
            <PlusCircle size={16} className="mr-2" />
            Configure API
          </Button>
        </div>
      </div>
    </div>
  );
};
