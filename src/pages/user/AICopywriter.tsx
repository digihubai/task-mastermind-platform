
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AICopywriter = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI Copywriter</h1>
            <p className="text-muted-foreground mt-1">
              Generate marketing copy and content with AI
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Copy</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <PenTool size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Product Description</h3>
                  <p className="text-xs text-muted-foreground">Created 3 days ago</p>
                </div>
              </div>
              <Badge variant="outline">Copy</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              Our revolutionary product transforms how you interact with digital content...
            </p>
            <Button variant="outline" size="sm" className="w-full">Edit</Button>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <PenTool size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email Campaign</h3>
                  <p className="text-xs text-muted-foreground">Created 1 week ago</p>
                </div>
              </div>
              <Badge variant="outline">Email</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              Discover the latest updates we've made to enhance your experience...
            </p>
            <Button variant="outline" size="sm" className="w-full">Edit</Button>
          </Card>
          
          <Card className="p-6 border border-border/40 flex flex-col items-center justify-center text-center h-[200px]">
            <PenTool size={40} className="text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg">Create New Copy</h3>
            <p className="text-muted-foreground mt-1">Generate AI-powered marketing content</p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AICopywriter;
