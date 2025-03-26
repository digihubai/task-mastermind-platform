
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, BarChart2 } from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome to your AI-powered workspace
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
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-3 text-primary">
                <Home size={24} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Projects</p>
                <h3 className="text-3xl font-semibold mt-1">12</h3>
                <p className="text-xs text-green-500 mt-2">
                  +2 from last month
                </p>
              </div>
            </div>
          </Card>
          
          {/* Add more cards and content as needed */}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
