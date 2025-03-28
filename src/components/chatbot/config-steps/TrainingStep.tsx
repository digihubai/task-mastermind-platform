
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, Globe, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TrainingStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Train Your Chatbot</h2>
      <p className="text-muted-foreground">
        Train your chatbot by providing knowledge or connecting data sources.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="border transition-all hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-full">
                <BookOpen size={18} className="text-violet-600 dark:text-violet-400" />
              </div>
              <CardTitle className="text-base font-medium">Knowledge Base</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Add documents, FAQs, or other text-based knowledge</p>
            <Button variant="outline" className="w-full">
              <PlusCircle size={16} className="mr-2" />
              Add Knowledge Source
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border transition-all hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Globe size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-base font-medium">Website Integration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Let the chatbot crawl your website for knowledge</p>
            <Button variant="outline" className="w-full">
              <PlusCircle size={16} className="mr-2" />
              Add Website URL
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border transition-all hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <Database size={18} className="text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-base font-medium">API Connections</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Connect to external APIs for dynamic data</p>
            <Button variant="outline" className="w-full">
              <PlusCircle size={16} className="mr-2" />
              Configure API
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
