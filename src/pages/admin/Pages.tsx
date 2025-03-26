
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Pages = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Pages</h1>
          <p className="text-muted-foreground mt-1">
            Manage static pages
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <FileText size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Page Manager</h3>
                <p className="text-xs text-muted-foreground">Create and edit pages</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Pages;
