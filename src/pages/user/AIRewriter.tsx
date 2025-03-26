
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, PlusCircle } from "lucide-react";

const AIRewriter = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI Rewriter</h1>
            <p className="text-muted-foreground mt-1">
              Rewrite and improve content with AI
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Rewrite</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <RefreshCw size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Product Description</h3>
                <div className="flex gap-1 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Friendly</span>
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Concise</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              Original: "Our product has many features that users will enjoy..."
            </p>
            <Button variant="outline" className="w-full">View Rewrites</Button>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <RefreshCw size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Email Campaign</h3>
                <div className="flex gap-1 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">Professional</span>
                  <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">Formal</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              Original: "We're reaching out to tell you about our great deal..."
            </p>
            <Button variant="outline" className="w-full">View Rewrites</Button>
          </Card>
          
          <Card className="p-6 border border-border/40 flex flex-col items-center justify-center text-center h-[200px]">
            <RefreshCw size={40} className="text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg">New Rewrite</h3>
            <p className="text-muted-foreground mt-1">Transform your content with AI</p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIRewriter;
