
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, PlusCircle, ChevronRight } from "lucide-react";

const Workflow = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Workflow Automation</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage automated workflows
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Workflow</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <RefreshCw size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Lead Nurturing</h3>
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full mt-1 inline-block">Active</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Automatically follow up with new leads and nurture them through the sales pipeline
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
              <Button variant="outline" size="sm" className="flex-1">Metrics</Button>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <RefreshCw size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Support Ticket Assignment</h3>
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full mt-1 inline-block">Active</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Route and assign support tickets based on topic, priority, and agent availability
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
              <Button variant="outline" size="sm" className="flex-1">Metrics</Button>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <RefreshCw size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Content Approval</h3>
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full mt-1 inline-block">Paused</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Automate the content review and approval process for marketing materials
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
              <Button variant="outline" size="sm" className="flex-1">Metrics</Button>
            </div>
          </Card>
        </div>
        
        <Card className="p-6 border border-border/40">
          <h3 className="text-lg font-medium mb-6">Workflow Templates</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Customer Onboarding", steps: 5, category: "Customer Success" },
              { name: "Email Campaign", steps: 3, category: "Marketing" },
              { name: "Invoice Processing", steps: 4, category: "Finance" },
              { name: "Report Generation", steps: 6, category: "Analytics" },
              { name: "Document Approval", steps: 4, category: "Operations" },
              { name: "Event Registration", steps: 7, category: "Marketing" }
            ].map((template, i) => (
              <div key={i} className="p-4 border rounded-md hover:bg-muted/30 transition-colors cursor-pointer flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mb-2">{template.steps} steps</p>
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full mt-auto self-start">
                  {template.category}
                </span>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
            
            <div className="space-y-4">
              {[
                "Lead Nurturing workflow executed for 12 leads",
                "Support Ticket Assignment processed 28 tickets",
                "Content Approval workflow paused by Admin",
                "New workflow template created: Customer Feedback",
                "Lead Nurturing workflow edited"
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <RefreshCw size={14} />
                  </div>
                  <div>
                    <p className="text-sm">{activity}</p>
                    <p className="text-xs text-muted-foreground">
                      {i} hour{i !== 1 ? 's' : ''} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Workflow Metrics</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Total Executions (Today)</p>
                  <p className="text-sm font-medium">246</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Success Rate</p>
                  <p className="text-sm font-medium">94%</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 rounded-full h-2" style={{ width: '94%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Execution Time (Avg)</p>
                  <p className="text-sm font-medium">1.3s</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 rounded-full h-2" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Error Rate</p>
                  <p className="text-sm font-medium">6%</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-500 rounded-full h-2" style={{ width: '6%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Workflow;
