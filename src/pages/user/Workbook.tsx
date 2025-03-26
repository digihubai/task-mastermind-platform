
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, PlusCircle, ChevronRight, Search, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Workbook = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Workbook</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your workbooks and notebooks
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workbooks..."
                className="pl-9 w-[250px]"
              />
            </div>
            <Button
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} />
              <span>New Workbook</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <FolderOpen size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">All Workbooks</p>
                <h3 className="text-2xl font-semibold">12</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recent</p>
                <h3 className="text-2xl font-semibold">4</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <h3 className="text-2xl font-semibold">7</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-amber-100 p-2 rounded-full">
                <FolderOpen size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shared</p>
                <h3 className="text-2xl font-semibold">3</h3>
              </div>
            </div>
          </Card>
        </div>
        
        <Card className="p-6 border border-border/40">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Recent Workbooks</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                name: "Marketing Strategy", 
                pages: 12,
                lastModified: "Today at 10:23 AM",
                status: "In Progress" 
              },
              { 
                name: "Product Roadmap", 
                pages: 24,
                lastModified: "Yesterday at 4:15 PM",
                status: "In Review" 
              },
              { 
                name: "Content Calendar", 
                pages: 8,
                lastModified: "2 days ago",
                status: "Completed" 
              },
              { 
                name: "Customer Feedback", 
                pages: 15,
                lastModified: "5 days ago",
                status: "In Progress" 
              }
            ].map((workbook, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FolderOpen size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{workbook.name}</h4>
                    <p className="text-xs text-muted-foreground">{workbook.pages} pages · Last modified {workbook.lastModified}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={
                    workbook.status === "In Progress" ? "bg-blue-50 text-blue-800 border-blue-200" :
                    workbook.status === "In Review" ? "bg-amber-50 text-amber-800 border-amber-200" :
                    "bg-green-50 text-green-800 border-green-200"
                  }>
                    {workbook.status}
                  </Badge>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Workbook Categories</h3>
            
            <div className="space-y-2">
              {[
                { name: "Marketing", count: 4 },
                { name: "Products", count: 3 },
                { name: "Research", count: 2 },
                { name: "Finance", count: 1 },
                { name: "Content", count: 2 }
              ].map((category, i) => (
                <div key={i} className="flex justify-between items-center p-2 border-b last:border-0">
                  <span>{category.name}</span>
                  <Badge variant="secondary">{category.count}</Badge>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Shared With Me</h3>
            
            <div className="space-y-2">
              {[
                { name: "Team Goals", user: "Alex Smith" },
                { name: "Design Brief", user: "Emma Johnson" },
                { name: "Weekly Reports", user: "Michael Chen" }
              ].map((shared, i) => (
                <div key={i} className="flex justify-between items-center p-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{shared.name}</p>
                    <p className="text-xs text-muted-foreground">Shared by {shared.user}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <h3 className="text-lg font-medium mb-4">Templates</h3>
            
            <div className="space-y-2">
              {[
                "Project Plan",
                "Meeting Notes",
                "Research Document",
                "Marketing Brief",
                "Content Calendar"
              ].map((template, i) => (
                <Button key={i} variant="outline" className="w-full justify-start">
                  <span>{template}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Workbook;
