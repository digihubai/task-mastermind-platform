
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";

const AISEOWriterPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI SEO Writer</h1>
          <p className="text-muted-foreground mt-1">
            Generate SEO-optimized content for your website
          </p>
        </div>
        
        <Card className="p-6">
          <p>AI SEO Writer functionality will be implemented here.</p>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AISEOWriterPage;
