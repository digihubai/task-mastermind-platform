
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, PlusCircle } from "lucide-react";

const AIEditor = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI Editor</h1>
            <p className="text-muted-foreground mt-1">
              Create and edit content with AI assistance
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Document</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Edit size={24} className="text-primary" />
              </div>
              <h3 className="font-medium">Blog Post Draft</h3>
            </div>
            <p className="text-muted-foreground mb-4">Last edited 2 hours ago</p>
            <Button variant="outline" className="w-full">Continue Editing</Button>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Edit size={24} className="text-primary" />
              </div>
              <h3 className="font-medium">Product Description</h3>
            </div>
            <p className="text-muted-foreground mb-4">Last edited 1 day ago</p>
            <Button variant="outline" className="w-full">Continue Editing</Button>
          </Card>
          
          <Card className="p-6 border border-border/40 flex flex-col items-center justify-center text-center h-[200px]">
            <Edit size={40} className="text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg">Create New Document</h3>
            <p className="text-muted-foreground mt-1">Start writing with AI assistance</p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIEditor;
