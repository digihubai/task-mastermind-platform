
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { FileCode } from "lucide-react";

const APIIntegration = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">API Integration</h1>
          <p className="text-muted-foreground mt-1">
            Manage API integrations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <FileCode size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">API Management</h3>
                <p className="text-xs text-muted-foreground">Configure API connections</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default APIIntegration;
