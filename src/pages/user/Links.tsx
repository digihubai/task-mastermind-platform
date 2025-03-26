
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Globe, PlusCircle, ExternalLink, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Links = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Links</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track custom short links
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>Create New Link</span>
          </Button>
        </div>
        
        <Card className="p-6 border border-border/40">
          <h3 className="text-lg font-medium mb-4">Quick Link Creator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="md:col-span-3">
              <label className="text-sm font-medium mb-1 block">Original URL</label>
              <Input placeholder="https://example.com/your-long-url" />
            </div>
            
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1 block">Custom Path (optional)</label>
              <Input placeholder="custom-name" />
            </div>
            
            <div className="md:col-span-2 flex items-end">
              <Button className="w-full">Create Short Link</Button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border border-border/40">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Your Links</h3>
            <div className="flex gap-2">
              <Input placeholder="Search links..." className="w-60" />
              <Button variant="outline">Filter</Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                name: "Product Launch", 
                short: "digihub.ai/launch", 
                original: "https://digihubai.com/products/enterprise-suite/launch-2023/registration",
                clicks: 1248,
                status: "Active" 
              },
              { 
                name: "Marketing Campaign", 
                short: "digihub.ai/summer", 
                original: "https://digihubai.com/promotions/summer-sale-2023/special-offer?utm_source=email",
                clicks: 865,
                status: "Active" 
              },
              { 
                name: "Support Documentation", 
                short: "digihub.ai/docs", 
                original: "https://help.digihubai.com/documentation/getting-started/quickstart-guide",
                clicks: 326,
                status: "Active" 
              }
            ].map((link, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md">
                <div className="space-y-2 mb-3 md:mb-0">
                  <div className="flex items-center gap-2">
                    <Link size={16} className="text-primary" />
                    <h4 className="font-medium">{link.name}</h4>
                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">{link.status}</Badge>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground">Short URL</p>
                      <p className="text-sm flex items-center gap-1">
                        {link.short}
                        <Copy size={14} className="text-muted-foreground cursor-pointer" />
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Original URL</p>
                      <p className="text-sm truncate max-w-xs">{link.original}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                      <p className="text-sm font-medium">{link.clicks}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ExternalLink size={14} />
                    <span>Open</span>
                  </Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive/10">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6 border border-border/40">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Globe size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium">Domain Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Default Domain</label>
              <select className="w-full p-2 border rounded-md">
                <option>digihub.ai</option>
                <option>digi.ai</option>
                <option>custom domain...</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Custom Domain</label>
              <div className="flex gap-2">
                <Input placeholder="links.yourdomain.com" />
                <Button variant="outline">Setup</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Use your own domain for branded short links
              </p>
            </div>
            
            <div className="pt-2">
              <Button>Save Domain Settings</Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Links;
