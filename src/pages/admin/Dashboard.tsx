
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { BarChart2, Users, DollarSign, Activity } from "lucide-react";

const AdminDashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of system performance and metrics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-semibold">1,248</h3>
              </div>
            </div>
            <div className="text-xs text-green-500 mt-2">
              +12% from last month
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <h3 className="text-2xl font-semibold">$52,489</h3>
              </div>
            </div>
            <div className="text-xs text-green-500 mt-2">
              +8% from last month
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <BarChart2 size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <h3 className="text-2xl font-semibold">3.2%</h3>
              </div>
            </div>
            <div className="text-xs text-green-500 mt-2">
              +0.5% from last month
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-amber-100 p-2 rounded-full">
                <Activity size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <h3 className="text-2xl font-semibold">876</h3>
              </div>
            </div>
            <div className="text-xs text-green-500 mt-2">
              +15% from last month
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 items-start pb-4 border-b border-border/40 last:border-0 last:pb-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {i % 2 === 0 ? <Users size={18} /> : <Activity size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {i % 2 === 0 ? "New user registered" : "System update completed"}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {i % 2 === 0 ? `User #10${i} signed up for a Pro plan` : "System version 2.3.4 deployed successfully"}
                    </p>
                    <p className="text-muted-foreground text-xs mt-2">{i * 10} minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <h3 className="text-lg font-medium mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border/40">
                <p className="text-sm">API Services</p>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/40">
                <p className="text-sm">Database</p>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/40">
                <p className="text-sm">Authentication</p>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/40">
                <p className="text-sm">File Storage</p>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">AI Services</p>
                <span className="text-xs px-2 py-1 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-full">
                  Partial Outage
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
