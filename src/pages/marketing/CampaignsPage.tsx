
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, PlusCircle, Calendar, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CampaignsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Campaigns</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your marketing campaigns
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Campaign</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Target size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Summer Sale</h3>
                <div className="flex gap-1 mt-1">
                  <Badge variant="outline">Active</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700">High Priority</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Ends in 15 days</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart size={14} />
                <span>32 Conversions</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Target size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Product Launch</h3>
                <div className="flex gap-1 mt-1">
                  <Badge variant="outline">Draft</Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">Medium Priority</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Starts in 5 days</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart size={14} />
                <span>Planning</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40 flex flex-col items-center justify-center text-center h-[200px]">
            <Target size={40} className="text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg">Create Campaign</h3>
            <p className="text-muted-foreground mt-1">Set goals and track your marketing efforts</p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CampaignsPage;
