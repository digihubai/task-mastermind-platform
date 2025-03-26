
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";

const AISEOWriter = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI SEO Writer</h1>
            <p className="text-muted-foreground mt-1">
              Create SEO-optimized content with AI assistance
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New SEO Content</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Search size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Product Landing Page</h3>
                <div className="flex gap-1 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">SEO</span>
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Landing Page</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Optimized for "digital marketing solutions"</p>
            <Button variant="outline" className="w-full">Edit Content</Button>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Search size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Blog Article</h3>
                <div className="flex gap-1 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">SEO</span>
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">Blog</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Optimized for "AI content generation tools"</p>
            <Button variant="outline" className="w-full">Edit Content</Button>
          </Card>
          
          <Card className="p-6 border border-border/40 flex flex-col items-center justify-center text-center h-[200px]">
            <Search size={40} className="text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg">Create SEO Content</h3>
            <p className="text-muted-foreground mt-1">Generate optimized content for search</p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AISEOWriter;
