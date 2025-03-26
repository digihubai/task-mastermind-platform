
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, BarChart, PlusCircle, Calendar, Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const EmailMarketingPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Email Marketing</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage email campaigns for your audience
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Campaign</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card className="p-6 border border-border/40">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-lg">Recent Campaigns</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Weekly Newsletter</h4>
                      <p className="text-xs text-muted-foreground">Sent 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Users size={12} />
                      <span>8,245 recipients</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 p-2 rounded-full">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Product Launch</h4>
                      <p className="text-xs text-muted-foreground">Scheduled for tomorrow</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">Scheduled</Badge>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Users size={12} />
                      <span>12,650 recipients</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400 p-2 rounded-full">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Special Promotion</h4>
                      <p className="text-xs text-muted-foreground">Draft</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline">Draft</Badge>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Users size={12} />
                      <span>Estimated 15,000 recipients</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border border-border/40">
              <h3 className="font-medium text-lg mb-4">Campaign Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Open Rate</span>
                    <span className="text-sm font-medium">24.8%</span>
                  </div>
                  <Progress value={24.8} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Click Rate</span>
                    <span className="text-sm font-medium">12.3%</span>
                  </div>
                  <Progress value={12.3} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="text-sm font-medium">3.7%</span>
                  </div>
                  <Progress value={3.7} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Unsubscribe Rate</span>
                    <span className="text-sm font-medium">0.8%</span>
                  </div>
                  <Progress value={0.8} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card className="p-6 border border-border/40">
              <h3 className="font-medium text-lg mb-4">Audience Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Subscribers</span>
                  <span className="font-medium">45,782</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Subscribers</span>
                  <span className="font-medium">42,619</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">New This Month</span>
                  <span className="font-medium">+1,245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Unsubscribed</span>
                  <span className="font-medium">-87</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Manage Audience
              </Button>
            </Card>
            
            <Card className="p-6 border border-border/40">
              <h3 className="font-medium text-lg mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between">
                  <span>Create Template</span>
                  <ChevronRight size={16} />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>A/B Testing</span>
                  <ChevronRight size={16} />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>Automation</span>
                  <ChevronRight size={16} />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>Integrate with CRM</span>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EmailMarketingPage;
