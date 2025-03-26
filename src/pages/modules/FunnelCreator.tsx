
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool, PlusCircle, ExternalLink, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FunnelCreator = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Funnel Creator</h1>
            <p className="text-muted-foreground mt-1">
              Design and optimize your marketing and sales funnels
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Funnel</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <PenTool size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Lead Generation</h3>
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full mt-1 inline-block">Active</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Conversion Rate</p>
                <p className="font-medium">4.8%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Leads</p>
                <p className="font-medium">246</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pages</p>
                <p className="font-medium">5</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
              <Button variant="outline" size="sm" className="flex-1">Analytics</Button>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <PenTool size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Product Launch</h3>
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full mt-1 inline-block">Active</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Conversion Rate</p>
                <p className="font-medium">6.2%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Sales</p>
                <p className="font-medium">128</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pages</p>
                <p className="font-medium">7</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
              <Button variant="outline" size="sm" className="flex-1">Analytics</Button>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <PenTool size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Webinar Registration</h3>
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full mt-1 inline-block">Draft</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Conversion Rate</p>
                <p className="font-medium">--</p>
              </div>
              <div>
                <p className="text-muted-foreground">Signups</p>
                <p className="font-medium">--</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pages</p>
                <p className="font-medium">3</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
              <Button variant="outline" size="sm" className="flex-1">Publish</Button>
            </div>
          </Card>
        </div>
        
        <Card className="p-6 border border-border/40">
          <h3 className="text-lg font-medium mb-6">Funnel Templates</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Lead Magnet", pages: 3, category: "Lead Generation" },
              { name: "Product Sales", pages: 5, category: "E-commerce" },
              { name: "Webinar Registration", pages: 4, category: "Events" },
              { name: "Free Trial", pages: 6, category: "SaaS" },
              { name: "Email Subscription", pages: 2, category: "Newsletter" },
              { name: "Consultation Booking", pages: 3, category: "Service" }
            ].map((template, i) => (
              <div key={i} className="p-4 border rounded-md hover:bg-muted/30 transition-colors cursor-pointer flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mb-2">{template.pages} pages</p>
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full mt-auto self-start">
                  {template.category}
                </span>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-border/40">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Top Performing Funnels</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "Product Launch", rate: "6.2%", leads: 128 },
                { name: "Lead Generation", rate: "4.8%", leads: 246 },
                { name: "SaaS Demo", rate: "3.9%", leads: 187 },
              ].map((funnel, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-border/40 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <PenTool size={16} />
                    </div>
                    <p className="font-medium">{funnel.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{funnel.rate}</p>
                    <p className="text-xs text-muted-foreground">{funnel.leads} conversions</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Page Analytics</h3>
              <Badge variant="outline">Last 30 days</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Landing Pages</p>
                  <p className="text-sm font-medium">8,542 views</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Offer Pages</p>
                  <p className="text-sm font-medium">3,281 views</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '55%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Checkout Pages</p>
                  <p className="text-sm font-medium">1,432 views</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '35%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Thank You Pages</p>
                  <p className="text-sm font-medium">892 views</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '22%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default FunnelCreator;
