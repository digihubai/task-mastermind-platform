
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, PlusCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">User Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your AI-powered workspace
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <BarChart2 size={18} />
              <span>Analytics</span>
            </Button>
            
            <Button
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} />
              <span>New Project</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <h3 className="font-medium text-lg">Recent Activity</h3>
            <p className="text-muted-foreground mt-2">Your recent actions will appear here</p>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <h3 className="font-medium text-lg">Projects</h3>
            <p className="text-muted-foreground mt-2">Your active projects</p>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <h3 className="font-medium text-lg">AI Usage</h3>
            <p className="text-muted-foreground mt-2">Your AI credits and usage</p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
